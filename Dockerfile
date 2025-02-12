
FROM node:hydrogen as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm ci
COPY ./ /app/
# Add RUN node set-env.js later for environment setup 
RUN npm run build:prod

