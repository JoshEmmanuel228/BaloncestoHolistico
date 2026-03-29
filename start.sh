#!/bin/bash
# start.sh — Optimización Extrema para 512MB RAM en Render
# Con supervisión del Motor Ninja y monitoreo de memoria

# Puerto que Render asigna (default 10000)
export PORT=${PORT:-10000}

# Limitar memoria de Node.js al mínimo funcional para el Motor Ninja
export NODE_OPTIONS="--max-old-space-size=150"

# Función para obtener RAM usada (MB)
get_ram() {
    free -m 2>/dev/null | awk '/Mem:/ {print $3}' || echo "?"
}

echo "🐍 Arrancando Backend con Gunicorn en puerto $PORT (Modo Ahorro 512MB)..."
echo "📊 RAM al inicio: $(get_ram)MB"

# Arrancar Gunicorn PRIMERO
cd /app/AthenaBall_WebApp
gunicorn app:app \
    --bind "0.0.0.0:$PORT" \
    --workers 1 \
    --threads 1 \
    --timeout 300 \
    --log-level info &

GUNICORN_PID=$!

# Esperar a que Gunicorn esté estable
echo "⏳ Esperando 45 segundos antes de iniciar WhatsApp..."
sleep 45

echo "📊 RAM antes de WhatsApp: $(get_ram)MB"

# Función para iniciar Motor Ninja con supervisión
start_ninja() {
    echo "🚀 Iniciando Motor Ninja (WhatsApp)..."
    cd /app/AthenaBall_WebApp && node motor-whatsapp.js
}

# Loop de supervisión: reiniciar Motor Ninja si muere
while true; do
    start_ninja &
    NINJA_PID=$!
    echo "🥷 Motor Ninja PID: $NINJA_PID"
    
    # Esperar a que el Motor Ninja termine (muerte)
    wait $NINJA_PID
    EXIT_CODE=$?
    
    # Verificar si Gunicorn sigue vivo
    if ! kill -0 $GUNICORN_PID 2>/dev/null; then
        echo "💀 Gunicorn también murió. Terminando todo."
        exit 1
    fi
    
    echo "⚠️ Motor Ninja murió (exit code: $EXIT_CODE). RAM: $(get_ram)MB"
    echo "🔄 Reiniciando Motor Ninja en 30 segundos..."
    sleep 30
    echo "📊 RAM antes de reinicio: $(get_ram)MB"
done &

# Monitoreo de memoria cada 5 minutos
(
    while true; do
        sleep 300
        RAM=$(get_ram)
        echo "📊 [Monitor] RAM: ${RAM}MB / 512MB"
        if [ "$RAM" != "?" ] && [ "$RAM" -gt 450 ]; then
            echo "⚠️ [Monitor] ALERTA: RAM > 450MB! Riesgo de OOM"
        fi
    done
) &

# Mantener el proceso vivo con Gunicorn
wait $GUNICORN_PID
