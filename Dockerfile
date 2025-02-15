FROM node:alpine
WORKDIR /app

RUN npm i -g http-server

COPY ./dist/munday-reviews/browser .

EXPOSE 8080

CMD ["http-server", "-p", "8080", "--proxy", "http://localhost:8080?"]
