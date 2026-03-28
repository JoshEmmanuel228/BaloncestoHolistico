#!/bin/bash
# start.sh — Optimización Extrema para 512MB RAM en Render

# Puerto que Render asigna (default 10000)
export PORT=${PORT:-10000}

# Limitar memoria de Node.js al mínimo funcional para el Motor Ninja
export NODE_OPTIONS="--max-old-space-size=96"

echo "🐍 Arrancando Backend con Gunicorn en puerto $PORT (Modo Ahorro 512MB)..."

# Arrancar Gunicorn PRIMERO
# Usamos 1 worker y 1 thread para minimizar el footprint de memoria.
# Quitamos --preload para evitar picos de carga inicial.
cd /app/AthenaBall_WebApp
gunicorn app:app \
    --bind "0.0.0.0:$PORT" \
    --workers 1 \
    --threads 1 \
    --timeout 300 \
    --log-level info &

GUNICORN_PID=$!

# Esperar a que Gunicorn esté totalmente estable y pase el Health Check de Render
echo "⏳ Esperando 60 segundos antes de iniciar WhatsApp para evitar picos de RAM..."
sleep 60

# Iniciar Motor Ninja (WhatsApp) con flags de ahorro extremo
echo "🚀 Iniciando Motor Ninja (WhatsApp)..."
(cd /app/AthenaBall_WebApp && node motor-whatsapp.js) &

# Mantener el proceso vivo
wait $GUNICORN_PID
