const { Client, LocalAuth } = require('whatsapp-web.js');
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

// Configurar el cliente de WhatsApp
function createClient() {
    return new Client({
        authStrategy: new LocalAuth({ clientId: "athenaball-bot-v2" }),
        // Usamos type 'none' para que baje la versión web de WhatsApp actual viva,
        // esto evita que el celular tire error de "Revisa tu conexión" por usar
        // un HTML anticuado que WhatsApp ya no soporta para nuevas vinculaciones.
        webVersionCache: { 
            type: 'none'
        },
        authTimeoutMs: 180000,
        puppeteer: {
            headless: true,
            executablePath: '/usr/bin/chromium',
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

function initializeClient() {
    client.on('qr', (qr) => {
        console.log('--- NUEVO QR DETECTADO ---');
        qrcode.generate(qr, { small: true });
        currentQR = qr;
    });

    client.on('ready', () => {
        console.log('✅ ¡SISTEMA NINJA CONECTADO Y LISTO!');
        isReady = true;
        currentQR = '';
        reconnectAttempts = 0; // Reset al conectar exitosamente
    });

    client.on('authenticated', () => {
        console.log('🔐 WhatsApp autenticado correctamente');
    });

    client.on('auth_failure', (msg) => {
        console.error('❌ ERROR DE AUTENTICACIÓN:', msg);
        isReady = false;
        currentQR = '';
        // No intentar reconectar en auth_failure, requiere nuevo QR
    });

    client.on('disconnected', async (reason) => {
        console.error(`⚠️ WhatsApp DESCONECTADO: ${reason}`);
        isReady = false;
        currentQR = '';
        
        // Auto-reconexión con backoff
        if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
            reconnectAttempts++;
            const delay = Math.min(reconnectAttempts * 15, 60); // 15s, 30s, 45s, 60s, 60s
            console.log(`🔄 Reintentando conexión en ${delay}s (intento ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);
            
            setTimeout(async () => {
                try {
                    console.log('🔄 Reiniciando cliente WhatsApp...');
                    client.destroy().catch(() => {});
                    client = createClient();
                    initializeClient();
                    await client.initialize();
                } catch (err) {
                    console.error('❌ Error en reconexión:', err.message);
                }
            }, delay * 1000);
        } else {
            console.error('🛑 Máximo de reconexiones alcanzado. Motor Ninja inactivo.');
            console.error('   → Reinicia el servicio manualmente o espera el próximo deploy.');
        }
    });

    // Manejar errores inesperados sin crashear
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
        memoryMB: Math.round(process.memoryUsage().rss / 1024 / 1024)
    });
});

app.get('/health', (req, res) => {
    // Health check endpoint para monitoreo
    res.json({ alive: true, ready: isReady, uptime: Math.floor(process.uptime()) });
});

app.post('/send', async (req, res) => {
    if (!isReady) {
        return res.status(503).json({ 
            error: 'WhatsApp no está listo.',
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
    console.log(`\n🥷 Motor Ninja escuchando en el puerto ${PORT}`);
    
    // Heartbeat cada 2 minutos (menos frecuente para ahorrar logs)
    setInterval(() => {
        const uptime = Math.floor(process.uptime());
        const memMB = Math.round(process.memoryUsage().rss / 1024 / 1024);
        console.log(`💓 Heartbeat | ${uptime}s | Ready: ${isReady} | RAM: ${memMB}MB | Reconexiones: ${reconnectAttempts}`);
    }, 120000);
});

// Manejar errores globales sin crashear
process.on('uncaughtException', (err) => {
    console.error('🚨 Error no capturado (Motor Ninja sigue vivo):', err.message);
});

process.on('unhandledRejection', (reason) => {
    console.error('🚨 Promise rechazada (Motor Ninja sigue vivo):', reason);
});
