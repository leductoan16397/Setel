FROM node:16-alpine

RUN mkdir -p /app/order
WORKDIR /app/order
ADD package.json yarn.lock /app/order/
RUN yarn install --pure-lockfile
ADD . /app/order