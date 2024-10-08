FROM node:18.20-alpine

WORKDIR /app-frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm", "start"]
