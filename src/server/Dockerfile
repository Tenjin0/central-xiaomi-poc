FROM node:10-stretch


WORKDIR /app

COPY ./src/server /app

RUN npm install --only=production && \
npm cache clean --force

EXPOSE 3001

