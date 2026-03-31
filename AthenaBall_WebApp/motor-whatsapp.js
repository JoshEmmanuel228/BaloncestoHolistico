require('dotenv').config({ path: '../.env' }); // Cargar MONGODB_URI del .env si existe en local
const { Client, RemoteAuth } = require('whatsapp-web.js');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const qrcode = require('qrcode-terminal');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

let currentQR = '';
let isReady = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

// La URI de MongoDB de las variables de entorno de Render
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("❌ ERROR FATAL: No hay MONGODB_URI configurado.");
    console.error("ℹ️ Por favor, añade la variable de entorno MONGODB_URI en Render para guardar las sesiones.");
    process.exit(1);
}

// Conexión a MongoDB
mongoose.connect(MONGODB_URI).then(() => {
    console.log('📦 Conectado a MongoDB Atlas. Iniciando Motor Ninja (RemoteAuth)...');
    
    const store = new MongoStore({ mongoose: mongoose });
    
    // Configurar el cliente de WhatsApp
    function createClient() {
        return new Client({
            authStrategy: new RemoteAuth({
                store: store,
                backupSyncIntervalMs: 300000,
                clientId: "athenaball-bot-v2"
            }),
            // Usamos type 'none' para que baje la versión web de WhatsApp actual
            webVersionCache: { 
                type: 'none'
            },
            authTimeoutMs: 180000,
            puppeteer: {
                headless: true,
                executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
                timeout: 0,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-gpu',
                    '--disable-dev-shm-usage',
                    '--disable-extensions',
                    '--disable-background-networking',
                    '--disable-default-apps',
                    '--disable-sync',
                    '--no-first-run',
                    '--single-process',
                    '--no-zygote',
                    '--disable-features=TranslateUI',
                    '--disable-ipc-flooding-protection',
                    '--disable-renderer-backgrounding',
                    '--disable-backgrounding-occluded-windows',
                    '--disable-component-update',
                    '--metrics-recording-only'
                ]
            }
        });
    }

    let client = createClient();
    let qrGenerations = 0;

    function initializeClient() {
        // Evento especial de RemoteAuth cuando la sesión ha sido guardada en Base de Datos
        client.on('remote_session_saved', () => {
             console.log('✅ Sesión de WhatsApp guardada en MONGODB exitosamente. ¡Sobrevivirá a los reinicios de Render!');
        });

        client.on('qr', (qr) => {
            console.log('--- NUEVO QR DETECTADO ---');
            qrcode.generate(qr, { small: true });
            currentQR = qr;
            
            qrGenerations++;
            if (qrGenerations > 5) {
                console.log('⏳ El usuario tardó mucho en escanear. Reiniciando generador de QR...');
                qrGenerations = 0;
                currentQR = '';
                
                client.destroy().catch(() => {}).then(() => {
                    client = createClient();
                    initializeClient();
                    client.initialize();
                });
            }
        });

        client.on('ready', () => {
            console.log('✅ ¡SISTEMA NINJA CONECTADO Y LISTO!');
            isReady = true;
            currentQR = '';
            qrGenerations = 0;
            reconnectAttempts = 0; // Reset al conectar exitosamente
        });

        client.on('authenticated', () => {
            console.log('🔐 WhatsApp autenticado correctamente (Nueva sesión o recuperada desde MongoDB)');
        });

        client.on('auth_failure', (msg) => {
            console.error('❌ ERROR DE AUTENTICACIÓN:', msg);
            isReady = false;
            currentQR = '';
        });

        client.on('disconnected', async (reason) => {
            console.error(`⚠️ WhatsApp DESCONECTADO: ${reason}`);
            isReady = false;
            currentQR = '';
            
            // Auto-reconexión con backoff
            if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                reconnectAttempts++;
                const delay = Math.min(reconnectAttempts * 15, 60);
                console.log(`🔄 Reintentando conexión en ${delay}s (intento ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);
                
                setTimeout(async () => {
                    try {
                        console.log('🔄 Reiniciando cliente WhatsApp para reconectar...');
                        client.destroy().catch(() => {});
                        client = createClient();
                        initializeClient();
                        await client.initialize();
                    } catch (err) {
                        console.error('❌ Error en reconexión:', err.message);
                    }
                }, delay * 1000);
            } else {
                console.error('🛑 Máximo de reconexiones alcanzado. Motor Ninja inactivo. Esperando intervención manual.');
            }
        });

        client.on('change_state', (state) => {
            console.log(`📡 Estado WhatsApp: ${state}`);
        });
    }

    initializeClient();
    client.initialize().catch(err => {
        console.error('❌ Error inicial de WhatsApp:', err.message);
    });

    // --- API Endpoints ---
    app.get('/status', (req, res) => {
        res.json({ 
            ready: isReady, 
            qr: currentQR,
            reconnectAttempts,
            uptime: Math.floor(process.uptime()),
            memoryMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
            authMode: 'MongoDB RemoteAuth (Protegido)'
        });
    });

    app.get('/health', (req, res) => {
        res.json({ alive: true, ready: isReady, uptime: Math.floor(process.uptime()) });
    });

    app.post('/send', async (req, res) => {
        if (!isReady) {
            return res.status(503).json({ 
                error: 'WhatsApp no está listo en la nube.',
                ready: false,
                reconnectAttempts 
            });
        }

        try {
            const { number, message } = req.body;
            
            if (!number || !message) {
                return res.status(400).json({ error: 'Faltan number y/o message' });
            }
            
            const cleanNumber = number.replace(/\D/g, '');
            const chatId = `${cleanNumber}@c.us`; 
            
            await client.sendMessage(chatId, message);
            console.log(`✅ Notificación enviada a ${cleanNumber}`);
            res.json({ success: true, message: 'Notificación enviada' });
        } catch (err) {
            console.error('❌ Error enviando mensaje:', err.message);
            res.status(500).json({ success: false, error: err.toString() });
        }
    });

    // --- Server ---
    const PORT = 3002;
    app.listen(PORT, () => {
        console.log(`\n🥷 Motor Ninja en la Nube escuchando en el puerto ${PORT}`);
        
        setInterval(() => {
            const uptime = Math.floor(process.uptime());
            const memMB = Math.round(process.memoryUsage().rss / 1024 / 1024);
            console.log(`💓 Heartbeat Nube | ${uptime}s | Ready: ${isReady} | RAM: ${memMB}MB | Reconexiones: ${reconnectAttempts}`);
        }, 120000);
    });

}).catch((err) => {
    console.error("❌ ERROR FATAL al conectar a MongoDB:", err.message);
    process.exit(1);
});

// Manejar errores globales sin crashear
process.on('uncaughtException', (err) => {
    console.error('🚨 Error no capturado (Mongo Motor Ninja):', err.message);
});

process.on('unhandledRejection', (reason) => {
    console.error('🚨 Promise rechazada (Mongo Motor Ninja):', reason);
});
