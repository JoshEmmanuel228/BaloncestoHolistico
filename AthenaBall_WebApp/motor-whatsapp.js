const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Aumentar límite para imágenes base64

let currentQR = '';
let isReady = false;

// Configurar el cliente de WhatsApp
const client = new Client({
    authStrategy: new LocalAuth({ clientId: "athenaball-bot" }),
    webVersionCache: { 
        type: 'remote', 
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html' 
    },
    puppeteer: {
        headless: true,
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
            '--js-flags=--max-old-space-size=128'
        ]
    }
});

// Cuando requiere escanear QR
client.on('qr', (qr) => {
    console.log('--- NUEVO QR DETECTADO ---');
    console.log('Escanea el QR para conectar tu WhatsApp:');
    qrcode.generate(qr, { small: true });
    currentQR = qr;
});

// Cuando ya está conectado
client.on('ready', () => {
    console.log('¡SISTEMA NINJA CONECTADO Y LISTO!');
    isReady = true;
    currentQR = '';
});

// Iniciar el cliente
client.initialize();

// Rutas Express
app.get('/status', (req, res) => {
    res.json({ ready: isReady, qr: currentQR });
});

// Nueva ruta para enviar Multimedia
app.post('/send-media', async (req, res) => {
    if (!isReady) return res.status(503).json({ error: 'WhatsApp no está listo.' });

    try {
        const { number, caption, imageData } = req.body;
        const cleanNumber = number.replace(/\D/g, '');
        const chatId = `${cleanNumber}@c.us`; 

        if (!imageData) {
            return res.status(400).json({ error: 'No se proporcionó imagen' });
        }

        // Remover prefijo data:image/...;base64, si existe
        const base64Data = imageData.includes('base64,') 
            ? imageData.split('base64,')[1] 
            : imageData;

        const media = new MessageMedia('image/jpeg', base64Data);
        await client.sendMessage(chatId, media, { caption: caption || '' });
        
        console.log(`📸 Notificación Media enviada a ${cleanNumber}`);
        res.json({ success: true, message: 'Media enviado' });
    } catch (err) {
        console.error('Error enviando media:', err);
        res.status(500).json({ success: false, error: err.toString() });
    }
});

app.post('/send', async (req, res) => {
    if (!isReady) return res.status(503).json({ error: 'WhatsApp no está listo.' });

    try {
        const { number, message } = req.body;
        const cleanNumber = number.replace(/\D/g, '');
        const chatId = `${cleanNumber}@c.us`; 
        
        await client.sendMessage(chatId, message);
        console.log(`✅ Notificación Ninja enviada a ${cleanNumber}`);
        res.json({ success: true, message: 'Notificación enviada' });
    } catch (err) {
        console.error('Error enviando mensaje:', err);
        res.status(500).json({ success: false, error: err.toString() });
    }
});

app.listen(PORT, () => {
    console.log(`\n🥷 Motor Ninja escuchando en el puerto ${PORT}`);
    
    // Heartbeat cada 30 segundos en los logs
    setInterval(() => {
        const uptime = Math.floor(process.uptime());
        console.log(`💓 Heartbeat: Motor Ninja Activo | Uptime: ${uptime}s | Ready: ${isReady}`);
    }, 30000);
});
