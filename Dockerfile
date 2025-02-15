FROM node:alpine
WORKDIR /app

COPY ./dist/munday-reviews/browser .

EXPOSE 8080

CMD ["http-server", "-p", "8080", "--proxy", "http://localhost:8080?"]
