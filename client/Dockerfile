FROM node:10-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install -g pm2

RUN npm install --only=production && \
npm cache clean --force

EXPOSE 3000

CMD ["npm", "rebuild", "node-sass"]
CMD ["npm", "run", "start"]
