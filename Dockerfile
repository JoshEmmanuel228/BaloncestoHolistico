# =============================================================
# Etapa 1: Build del Frontend (React/Vite)
# =============================================================
FROM node:20-slim AS frontend-builder

WORKDIR /frontend

# Copiar solo lo necesario para el build del frontend
COPY package.json package-lock.json ./
RUN npm ci --production=false

COPY index.html tsconfig.json tsconfig.node.json vite.config.ts ./
COPY src/ ./src/
COPY public/ ./public/

RUN npm run build

# =============================================================
# Etapa 2: Build de dependencias Python
# =============================================================
FROM python:3.12-slim AS python-builder

RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /build

COPY AthenaBall_WebApp/requirements_render.txt ./
RUN pip install --no-cache-dir --prefix=/install -r requirements_render.txt

# =============================================================
# Etapa 3: Imagen final
# =============================================================
FROM python:3.12-slim

# Dependencias de runtime para Chromium (WhatsApp)
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    procps \
    ca-certificates \
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
    chromium \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Instalar Node.js (necesario para Motor Ninja WhatsApp)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Copiar paquetes Python pre-compilados
COPY --from=python-builder /install /usr/local

WORKDIR /app

# Copiar el frontend ya compilado
COPY --from=frontend-builder /frontend/dist ./dist

# Instalar dependencias Node del Motor Ninja (WhatsApp)
COPY AthenaBall_WebApp/package.json ./AthenaBall_WebApp/
RUN cd AthenaBall_WebApp && npm install --production

# Copiar el código backend
COPY AthenaBall_WebApp/ ./AthenaBall_WebApp/
COPY start.sh ./

# Variables de entorno
ENV NODE_ENV=production
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV CUDA_VISIBLE_DEVICES=""
ENV OMP_NUM_THREADS=1
ENV MKL_NUM_THREADS=1

RUN chmod +x start.sh

EXPOSE 10000

CMD ["./start.sh"]
