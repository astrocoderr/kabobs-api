FROM node:latest

WORKDIR /api

COPY package*.json ./

RUN yarn install

COPY . .
COPY ./dist ./dist

CMD ['yarn', 'dev']

