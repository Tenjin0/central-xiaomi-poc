FROM node:latest

WORKDIR /app

COPY ./src /app
COPY ./ecosystem.config.js /app/ecosystem.config.js
COPY ./package.json /app/package.json

RUN npm install -g pm2

RUN npm install --only=production && \
npm cache clean --force

RUN apt-get install -y \
curl

CMD /bin/bash

EXPOSE 3000

