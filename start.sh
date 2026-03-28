#!/bin/bash
# start.sh — Script de inicio para Render

# Puerto que Render asigna (default 10000)
export PORT=${PORT:-10000}

# Limitar memoria de Node.js para el Motor Ninja
export NODE_OPTIONS="--max-old-space-size=128"

echo "🐍 Arrancando Backend con Gunicorn en puerto $PORT..."

# Arrancar Gunicorn PRIMERO para pasar el health check de Render
cd /app/AthenaBall_WebApp
gunicorn app:app \
    --bind "0.0.0.0:$PORT" \
    --workers 1 \
    --threads 2 \
    --timeout 300 \
    --preload \
    --log-level info &

GUNICORN_PID=$!

# Esperar a que Gunicorn esté listo
echo "⏳ Esperando a que Gunicorn arranque..."
sleep 5

# Iniciar Motor Ninja (WhatsApp) con retraso para reducir pico de memoria
echo "🚀 Iniciando Motor Ninja (WhatsApp) en 30 segundos..."
(sleep 30 && cd /app/AthenaBall_WebApp && echo "🥷 Arrancando Motor Ninja ahora..." && node motor-whatsapp.js) &

# Esperar a que Gunicorn termine (mantener container vivo)
wait $GUNICORN_PID
