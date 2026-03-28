const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

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

app.post('/send', async (req, res) => {
    if (!isReady) return res.status(503).json({ error: 'WhatsApp no está listo.' });

    try {
        const { number, message } = req.body;
        // Limpiar el número: quitar caracteres no numéricos
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

const PORT = 3002; // Diferente al de Flask (3001)
app.listen(PORT, () => {
    console.log(`\n🥷 Motor Ninja escuchando en el puerto ${PORT}`);
});
