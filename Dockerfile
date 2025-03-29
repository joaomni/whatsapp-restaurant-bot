# Usa uma imagem Node.js com suporte a Puppeteer
FROM ghcr.io/puppeteer/puppeteer:latest

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY package.json ./
RUN npm install --omit=dev

COPY . .

# Expõe a porta da API
EXPOSE 3000

# Comando para rodar a API
CMD ["node", "server.js"]