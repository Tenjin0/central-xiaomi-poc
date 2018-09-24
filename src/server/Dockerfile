FROM keymetrics/pm2:latest-alpine

WORKDIR /app

COPY ./src/server /app

RUN npm install --only=production && \
npm cache clean --force

CMD /bin/bash

EXPOSE 3000

