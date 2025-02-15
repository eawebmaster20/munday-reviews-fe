FROM node:hydrogen
WORKDIR /app

COPY ./dist/out/browser .

EXPOSE 8080

CMD ["http-server", "-p", "8080", "--proxy", "http://localhost:8080?"]
