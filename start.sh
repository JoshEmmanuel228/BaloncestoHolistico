#!/bin/bash
# start.sh

# Asegurarse de que PORT esté definido
export PORT=${PORT:-10000}

echo "🚀 Iniciando Motor Ninja (WhatsApp) en segundo plano..."
cd /app/AthenaBall_WebApp && node motor-whatsapp.js &

echo "🐍 Configurando y arrancando Backend (Flask)..."
cd /app/AthenaBall_WebApp
# Reemplazar localhost por 0.0.0.0 para que sea accesible externamente
sed -i "s/localhost:3001/0.0.0.0:$PORT/g" app.py

# Arrancar Flask
python app.py
