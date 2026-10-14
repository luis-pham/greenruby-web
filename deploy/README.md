# Deploying on the VPS

The site runs next to the existing Laravel CMS on the same host:

| Piece | Where | Port (127.0.0.1) |
|---|---|---|
| Laravel CMS + Content API (`green-ruby-cms`) | `/home/amisofts/greenrubycruises.com` | 8082 |
| Next.js (`green-ruby-web`, this repo) | `/home/amisofts/greenruby-web` | 3130 |
| MySQL (`mysql`) | shared container, network `green-ruby-private` | — |
| Nginx | `/etc/nginx/conf.d/greenrubycruises.com.conf` (from `deploy/nginx/`) | 80/443 |

Both containers join the external Docker network `green-ruby-private`, so Next reaches Laravel at
`http://green-ruby-cms` and Laravel calls `http://green-ruby-web:3000/api/revalidate`.

## First install

```sh
cd /home/amisofts && git clone https://github.com/luis-pham/greenruby-web.git && cd greenruby-web
mkdir -p secrets && grep '^CONTENT_API_KEY=' ../greenrubycruises.com/.env | cut -d= -f2- > secrets/content_api_key && chmod 600 secrets/content_api_key
cat > .env.production <<ENV
CONTENT_API_URL=http://green-ruby-cms
CONTENT_API_KEY=$(cat secrets/content_api_key)
REVALIDATE_SECRET=$(grep '^FRONTEND_REVALIDATE_SECRET=' ../greenrubycruises.com/.env | cut -d= -f2-)
SITE_URL=https://greenrubycruises.com
NEXT_PUBLIC_MEDIA_ORIGIN=
ENV
chmod 600 .env.production
docker compose build && docker compose up -d
sudo deploy/install-nginx.sh
```

The Laravel `.env` needs `CONTENT_API_KEY`, `FRONTEND_REVALIDATE_URL=http://green-ruby-web:3000/api/revalidate`
and `FRONTEND_REVALIDATE_SECRET`.

## Update

```sh
cd /home/amisofts/greenruby-web && git pull && docker compose build && docker compose up -d
```

The build prerenders pages from the Laravel API on `127.0.0.1:8082`, so Laravel must be running.

## Preview and go-live

- Preview (only you see Next): open `https://greenrubycruises.com/__preview?t=<token>`; the token is in
  `/etc/nginx/greenruby-preview-token`. Leave preview with `/__preview?off=1`.
- Go live: `sudo deploy/golive.sh 1`. Roll back to the Laravel Blade pages instantly: `sudo deploy/golive.sh 0`.
- Rolling back the Next container: `docker compose up -d` with the previous image tag, or just `golive.sh 0`.
