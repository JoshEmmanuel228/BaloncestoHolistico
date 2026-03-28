# Etapa 1: Build de dependencias (se cachea entre deploys)
FROM python:3.12-slim AS builder

# Instalar dependencias del sistema necesarias para compilar paquetes Python
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /build

# Instalar dependencias Python en un directorio aislado
COPY AthenaBall_WebApp/requirements_render.txt ./
RUN pip install --no-cache-dir --prefix=/install -r requirements_render.txt

# Etapa 2: Imagen final liviana
FROM python:3.12-slim

# Instalar SOLO las dependencias de runtime necesarias
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    procps \
    ca-certificates \
    # Dependencias de Chromium para WhatsApp Puppeteer
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libxshmfence1 \
    libxext6 \
    libxrender1 \
    libglib2.0-0 \
    libfontconfig1 \
    # OpenCV runtime deps
    libgl1-mesa-glx \
    libglib2.0-0 \
    chromium \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Instalar Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Copiar paquetes Python pre-compilados desde la etapa builder
COPY --from=builder /install /usr/local

WORKDIR /app

# Copiar e instalar dependencias Node del Motor Ninja (WhatsApp)
COPY AthenaBall_WebApp/package.json ./AthenaBall_WebApp/
RUN cd AthenaBall_WebApp && npm install --production

# Copiar el código de la aplicación (respeta .dockerignore)
COPY . .

# Variables de entorno
ENV NODE_ENV=production
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
# Forzar PyTorch a no intentar usar CUDA
ENV CUDA_VISIBLE_DEVICES=""
# Limitar threads de OpenMP/MKL para ahorrar memoria
ENV OMP_NUM_THREADS=1
ENV MKL_NUM_THREADS=1

# Hacer ejecutable el script de inicio
RUN chmod +x start.sh

# Solo exponer el puerto que Render necesita detectar
EXPOSE 10000

CMD ["./start.sh"]
