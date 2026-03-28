#!/bin/bash
# start.sh — Script de inicio para Render

# Puerto que Render asigna (default 10000)
export PORT=${PORT:-10000}

echo "🚀 Iniciando Motor Ninja (WhatsApp) en segundo plano..."
cd /app/AthenaBall_WebApp && node motor-whatsapp.js &

echo "🐍 Arrancando Backend con Gunicorn en puerto $PORT..."
cd /app/AthenaBall_WebApp

# Gunicorn: 
#   --bind 0.0.0.0:$PORT  → escucha en el puerto correcto para Render
#   --workers 1           → un solo worker para minimizar memoria
#   --threads 2           → maneja concurrencia con threads (menos RAM que procesos)
#   --timeout 300         → timeout largo para análisis ML
#   --preload             → carga la app una vez, comparte memoria entre threads
exec gunicorn app:app \
    --bind "0.0.0.0:$PORT" \
    --workers 1 \
    --threads 2 \
    --timeout 300 \
    --preload \
    --log-level info
