# build environment
FROM node:16-alpine as build
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn install --pure-lockfile
COPY . .
RUN yarn run build

# production environment
FROM nginx:stable-alpine
EXPOSE 80
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]