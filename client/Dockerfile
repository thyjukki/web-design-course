
FROM node:16 as base

WORKDIR /home/node/app

COPY package*.json ./
RUN npm i

CMD [ "npm", "start"]


FROM base as production
# tänne productionjutut

COPY ./src /home/node/app/src
COPY ./public /home/node/app/public
COPY ./webpack.config.js /home/node/app/webpack.config.js

RUN npm run build

EXPOSE 3456
CMD [ "npm", "start"]
