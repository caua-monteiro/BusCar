FROM node:20-alpine

# Cria diretório da aplicação
WORKDIR /usr/src/app

# Copia os arquivos de configuração do npm
COPY package*.json ./

# Instala todas as dependências (incluindo devDependencies) para rodar o ts-node-dev
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta
EXPOSE 3000

# O comando de execução (para dev)
CMD ["npm", "run", "dev"]
