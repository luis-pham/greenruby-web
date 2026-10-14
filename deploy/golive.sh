#!/usr/bin/env bash
# Switch public pages between Next.js (1) and the Laravel Blade site (0). Usage: sudo deploy/golive.sh 1|0
set -euo pipefail
VALUE=${1:?usage: golive.sh 1|0}
TARGET=/etc/nginx/conf.d/greenrubycruises.com.conf
cp "$TARGET" "/root/greenruby-backups/greenrubycruises.com.conf.$(date +%Y%m%d-%H%M%S)"
sed -i -E "s/default [01];   # <- set to 1 to go live/default $VALUE;   # <- set to 1 to go live/" "$TARGET"
nginx -t && systemctl reload nginx && echo "Public pages now served by: $([ "$VALUE" = 1 ] && echo Next.js || echo Laravel)"
