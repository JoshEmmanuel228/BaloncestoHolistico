# Etapa 1: Construir Frontend (React/Vite)
FROM node:18-alpine as build-step
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: Backend (Python/Flask)
FROM python:3.9-slim

# Instalar dependencias del sistema necesarias para OpenCV
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
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
COPY --from=build-step /app/dist/index.html ./AthenaBall_WebApp/templates/index.html
COPY --from=build-step /app/dist/assets ./AthenaBall_WebApp/static/assets
COPY --from=build-step /app/dist/*.png ./AthenaBall_WebApp/static/
# Copiar cualquier otro archivo raíz del build si es necesario (manifest, favicon, etc)

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
CMD ["gunicorn", "AthenaBall_WebApp.app:app", "--bind", "0.0.0.0:10000", "--timeout", "120"]
