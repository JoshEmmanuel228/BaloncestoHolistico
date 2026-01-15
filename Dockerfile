# Etapa 1: Construir Frontend (React/Vite)
FROM node:18-alpine as build-step
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY
RUN npm run build

# Etapa 2: Backend (Python/Flask)
FROM python:3.9-slim-bookworm

# Instalar dependencias del sistema necesarias para OpenCV
# 'libgl1' y 'libglib2.0-0' suelen ser suficientes en Bookworm
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar requirements e instalar dependencias de Python
COPY AthenaBall_WebApp/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código del backend
COPY AthenaBall_WebApp ./AthenaBall_WebApp

# Copiar el build de React desde la etapa 1
# Movemos los archivos estáticos a las carpetas que Flask espera
# Flask default: templates/ para HTML, static/ para CSS/JS/IMG
# Copiar el build de React desde la etapa 1
# Copiamos TODO el contenido de dist a static para no perder videos, audios ni JPGs
COPY --from=build-step /app/dist ./AthenaBall_WebApp/static

# Mover index.html a la carpeta templates de Flask
# (y borrarlo de static para no duplicar, aunque no afecta mucho)
RUN mv ./AthenaBall_WebApp/static/index.html ./AthenaBall_WebApp/templates/index.html

# Descargar modelos YOLO si no existen (Ultralytics los descarga automáticamente al usarlos, 
# pero podemos forzar una descarga "dummy" o dejar que el primer request lo haga.
# Para producción, es mejor que se descarguen al construir o iniciar si son pequeños, 
# pero estos son grandes. Render tiene almacenamiento efímero.
# Opción: Dejar que se descarguen en el primer uso (puede dar timeout) o incluirlos en el container.
# Dado que no los subimos a git por tamaño, necesitamos que se descarguen.
# Ultralytics descarga a /root/.config/Ultralytics/ o local. 
# Vamos a dejar que la app los descargue, pero aumentaremos el timeout de gunicorn.

ENV FLASK_APP=AthenaBall_WebApp.app:app

# Exponer el puerto
EXPOSE 10000

# Comando de inicio
CMD ["sh", "-c", "gunicorn AthenaBall_WebApp.app:app --bind 0.0.0.0:${PORT:-10000} --timeout 120"]
