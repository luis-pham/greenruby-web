#!/usr/bin/env bash
# Installs deploy/nginx/greenrubycruises.com.conf on the VPS without touching other sites.
# Usage (on the VPS, from the repo checkout): sudo deploy/install-nginx.sh
# The preview token is generated once and kept in /etc/nginx/greenruby-preview-token (root only).
set -euo pipefail
cd "$(dirname "$0")/.."
TARGET=/etc/nginx/conf.d/greenrubycruises.com.conf
TOKEN_FILE=/etc/nginx/greenruby-preview-token
BACKUP_DIR=/root/greenruby-backups/nginx-$(date +%Y%m%d-%H%M%S)

[ -f "$TOKEN_FILE" ] || { openssl rand -hex 16 > "$TOKEN_FILE"; chmod 600 "$TOKEN_FILE"; }
TOKEN=$(cat "$TOKEN_FILE")

# Keep the current go-live switch value across re-installs.
LIVE=0
if grep -q 'default 1;   # <- set to 1 to go live' "$TARGET" 2>/dev/null; then LIVE=1; fi

mkdir -p "$BACKUP_DIR"
cp "$TARGET" "$BACKUP_DIR/"
sed -e "s/__PREVIEW_TOKEN__/$TOKEN/g" -e "s/default 0;   # <- set to 1 to go live/default $LIVE;   # <- set to 1 to go live/" \
  deploy/nginx/greenrubycruises.com.conf > "$TARGET"

if nginx -t; then
  systemctl reload nginx
  echo "Installed (go-live switch = $LIVE). Backup: $BACKUP_DIR"
else
  cp "$BACKUP_DIR/$(basename "$TARGET")" "$TARGET"
  echo "nginx -t failed: previous config restored, nothing reloaded." >&2
  exit 1
fi
