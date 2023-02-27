<<<<<<< HEAD
FROM node:16

WORKDIR /app

ADD package.json /app/package.json

RUN npm install

ADD . /app

EXPOSE 80

CMD ["npm", "run", "start", "prod"]
=======
FROM node:16-alpine as builder

ENV NODE_ENV build

WORKDIR /home/node
COPY . /home/node

RUN npm ci \
    && npm run build \
    && npm prune --production

FROM node:16-alpine
ENV NODE_ENV production

WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/ 
COPY --from=builder /home/node/dist/ /home/node/dist 

CMD ["node", "dist/main.js"]
>>>>>>> 6e2b6b10ebec2598d29163e50775462a54b498fe
