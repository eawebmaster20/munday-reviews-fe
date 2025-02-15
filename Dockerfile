FROM node:alpine
WORKDIR /app

RUN ls

COPY ./dist/munday-reviews/browser .

EXPOSE 8080

CMD ["http-server", "-p", "8080", "--proxy", "http://localhost:8080?"]
