const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({ clientId: "athenaball-bot-v2" }),
    webVersionCache: { type: 'none' },
    puppeteer: {
        headless: false, // VERLO FUNCIONAR LOCALMENTE EVITA CRASHES
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
    console.log("ESCANEA ESTE QR PARA CREAR LA SESIÓN");
});

client.on('ready', () => {
    console.log("✅ SESIÓN CREADA LOCALMENTE. AHORA PODEMOS COMPRIMIRLA.");
    process.exit(0);
});

client.initialize();
