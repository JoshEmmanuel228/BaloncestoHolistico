#!/bin/bash

# Start Motor Ninja (Node.js) in the background
echo "🚀 Iniciando Motor Ninja (WhatsApp)..."
cd AthenaBall_WebApp && node motor-whatsapp.js &

# Start Backend (Flask) in the foreground
echo "🐍 Iniciando Backend (Flask)..."
cd .. && sed -i "s/localhost:3001/0.0.0.0:$PORT/g" AthenaBall_WebApp/app.py
cd AthenaBall_WebApp && python app.py
