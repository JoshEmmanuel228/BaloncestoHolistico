# Use a Python base image with Node.js support
FROM python:3.12-slim

# Install system dependencies for Chromium (required for whatsapp-web.js)
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    git \
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

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

WORKDIR /app

# Copy root package files
COPY package.json ./
RUN npm install

# Copy AthenaBall_WebApp files and install dependencies
COPY AthenaBall_WebApp/package.json ./AthenaBall_WebApp/
RUN cd AthenaBall_WebApp && npm install

COPY AthenaBall_WebApp/requirements.txt ./AthenaBall_WebApp/
RUN pip install --no-cache-dir -r AthenaBall_WebApp/requirements.txt

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=10000

# Make start script executable
RUN chmod +x start.sh

# Expose ports
EXPOSE 3000 10000 3002

CMD ["./start.sh"]
