# Usa uma imagem mínima com Node.js
FROM node:20-slim

# Defina o diretório de trabalho
WORKDIR /src

# Copie o package.json e o package-lock.json
COPY package*.json ./
COPY src ./src

# Instala dependências sem chamar scripts desnecessários
RUN npm install --omit=dev

# Instala pacotes necessários para o Venom Bot rodar
RUN apt-get update && apt-get install -y \
  chromium \
  libatk-bridge2.0-0 \
  libnspr4 \
  libnss3 \
  libxss1 \
  libxkbcommon0 \
  libxcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxrandr2 \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  xdg-utils \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copie o restante do código da aplicação
COPY . .

# Garante que o Chromium esteja acessível ao Venom Bot
ENV CHROME_BIN="/usr/bin/chromium"

# Usa um usuário não-root para segurança
USER root

# Exponha a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
