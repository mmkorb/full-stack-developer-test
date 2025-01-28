# Etapa 1: Build da aplicação
FROM node:16-alpine AS build

WORKDIR /app

# Copia os arquivos do package.json e package-lock.json
COPY package.json package-lock.json ./

# Instala as dependências de produção e desenvolvimento
RUN npm install

# Copia o código fonte para dentro do container
COPY . ./

# Compila a aplicação
RUN npm run build

# Etapa 2: Serve a aplicação com http-server
FROM node:16-alpine

WORKDIR /app

# Instala o http-server globalmente
RUN npm install -g http-server

# Copia os arquivos build da etapa anterior
COPY --from=build /app/build ./build

# Expondo a porta 3000 e 5000
EXPOSE 3000 5000

# Comando para rodar o http-server na porta 3000
CMD ["http-server", "build", "-p", "3000", "-c-1"]