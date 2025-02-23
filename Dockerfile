# Usa uma imagem oficial do Node.js como base
FROM node:18

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos necessários para instalar dependências primeiro
COPY package.json package-lock.json ./

# Instala apenas as dependências de produção
RUN npm install --omit=dev

# Copia todo o código da aplicação para o contêiner
COPY . .

# Garante que o Prisma Client seja gerado corretamente
RUN npx prisma generate

# Compila o TypeScript
RUN npm run build

# Expõe a porta da API
EXPOSE 3001

# Executa as migrations do Prisma antes de iniciar o servidor
CMD npx prisma migrate deploy && npm start