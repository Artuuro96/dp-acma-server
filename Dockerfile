FROM node:16

ENV NODE_ENV=production

WORKDIR /app

ADD package.json /app/package.json

RUN npm install

ADD . /app

EXPOSE 80

CMD npm run migration:generate

CMD npm run start:prod
