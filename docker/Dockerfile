FROM node:24-alpine AS dev

RUN apk add --no-cache git

WORKDIR /app

FROM nginx:1-alpine AS prod

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html
