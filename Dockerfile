# syntax=docker/dockerfile:1.7
# Production image (Next.js standalone output). Built on the VPS next to the Laravel CMS:
#   docker compose build && docker compose up -d
# The build prerenders pages, so the Laravel Content API must be reachable at build time
# (CONTENT_API_URL build arg; the API key is passed as a BuildKit secret, never baked into the image).

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:22-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG CONTENT_API_URL
ARG SITE_URL=https://greenrubycruises.com
ARG LARAVEL_ORIGIN
ARG NEXT_PUBLIC_MEDIA_ORIGIN=
ENV CONTENT_API_URL=$CONTENT_API_URL SITE_URL=$SITE_URL LARAVEL_ORIGIN=$LARAVEL_ORIGIN NEXT_PUBLIC_MEDIA_ORIGIN=$NEXT_PUBLIC_MEDIA_ORIGIN
RUN --mount=type=secret,id=content_api_key \
    CONTENT_API_KEY="$(cat /run/secrets/content_api_key)" npm run build

FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=3000
RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static
COPY --from=build --chown=app:app /app/public ./public
RUN mkdir -p .next/cache && chown -R app:app .next/cache
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/robots.txt >/dev/null || exit 1
CMD ["node", "server.js"]
