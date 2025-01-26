# Etapa 1: Build da aplicação
FROM node:16 AS build

WORKDIR /app

# Copia os arquivos do package.json e package-lock.json
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o código fonte para dentro do container
COPY . ./

# Compila a aplicação
RUN npm run build

# Copia os arquivos build para o diretório do container
COPY --from=build /app/build /app/build

# Expondo a porta 3000
EXPOSE 3000

# Comando para rodar o http-server
CMD ["http-server", "build", "-p", "3000", "-c-1"]
