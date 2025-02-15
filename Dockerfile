FROM node:hydrogen
WORKDIR /app

COPY package*.json ./

RUN npm i -g http-server

RUN npm ci

RUN ls

RUN npm run build:prod

RUN ls

COPY ./dist/out/browser .

EXPOSE 8080

CMD ["http-server", "-p", "8080", "--proxy", "http://localhost:8080?"]
