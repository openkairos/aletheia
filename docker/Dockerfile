FROM node:24-bookworm-slim AS dev

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci \
    && npx playwright install --with-deps chromium \
    && npm cache clean --force

FROM nginx:1-alpine AS prod

# The official nginx entrypoint renders /etc/nginx/templates/*.template with envsubst.
COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY dist/ /usr/share/nginx/html
