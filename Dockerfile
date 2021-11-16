FROM node:14-alpine

RUN mkdir -p /app/gateway
WORKDIR /app/gateway
ADD package.json yarn.lock /app/gateway/
RUN yarn install --pure-lockfile
ADD . /app/gateway