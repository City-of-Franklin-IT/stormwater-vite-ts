# syntax=docker/dockerfile:1

# ---- Build stage ----
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json .npmrc* ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Runtime stage ----
FROM nginxinc/nginx-unprivileged:stable-alpine

COPY <<'EOF_NGINX' /etc/nginx/conf.d/default.conf
server {
  listen 6007;
  server_name _;

  # Don't leak the container's internal host/port in redirects behind a proxy
  absolute_redirect off;

  root /usr/share/nginx/html;
  index index.html;

  gzip on;
  gzip_types text/plain text/css application/json application/javascript text/javascript image/svg+xml;

  location = /healthz {
    access_log off;
    default_type text/plain;
    return 200 'ok';
  }

  location = / {
    return 302 /stormwater/;
  }

  # Hashed build assets can be cached aggressively
  location /stormwater/assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    try_files $uri =404;
  }

  # SPA fallback for client-side routes under /stormwater
  location /stormwater/ {
    add_header Cache-Control "no-cache";
    try_files $uri $uri/ /stormwater/index.html;
  }
}
EOF_NGINX

COPY --from=build /app/dist /usr/share/nginx/html/stormwater

EXPOSE 6007
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:6007/healthz || exit 1
