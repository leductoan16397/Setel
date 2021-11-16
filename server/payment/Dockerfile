FROM node:16-alpine

RUN mkdir -p /app/payment
WORKDIR /app/payment
ADD package.json yarn.lock /app/payment/
RUN yarn install --pure-lockfile
ADD . /app/payment