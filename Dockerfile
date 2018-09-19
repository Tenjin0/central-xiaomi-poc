FROM keymetrics/pm2:latest

WORKDIR /app

COPY ./src /app
COPY ./package.json /app/package.json

RUN npm install --only=production && \
npm cache clean --force

CMD /bin/bash

EXPOSE 3000

