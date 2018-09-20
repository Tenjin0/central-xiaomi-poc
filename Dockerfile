FROM keymetrics/pm2:latest-alpine

WORKDIR /app

COPY ./src /app
COPY package.json /app/package.json
COPY ecosystem.config.js /app/ecosystem.config.js

RUN npm install --only=production && \
npm cache clean --force

CMD /bin/bash

EXPOSE 3000

