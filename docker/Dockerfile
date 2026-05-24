FROM node:24-alpine AS dev

RUN apk add --no-cache git

WORKDIR /app

FROM nginx:1-alpine AS prod

# The official nginx entrypoint renders /etc/nginx/templates/*.template with envsubst.
COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY dist/ /usr/share/nginx/html
