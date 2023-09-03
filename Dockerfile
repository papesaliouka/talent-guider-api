FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm run build

COPY ./dist .

EXPOSE 3000

CMD ["node", "server.js"]
