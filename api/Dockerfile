FROM node:10-alpine


WORKDIR /app

COPY . /app

RUN npm install -g pm2

RUN npm install --only=production && \
npm cache clean --force

EXPOSE 3001

CMD ["npm", "run", "start"]
