
FROM node:16

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
RUN npm i
COPY . .

CMD [ "npm", "start"]