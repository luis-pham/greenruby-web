#!/bin/zsh
# Runs a command in cms-develop against a LOCAL database with every outbound integration disabled
# (i18n Phase 0). Process env overrides .env (Laravel's immutable dotenv); make sure bootstrap/cache/config.php
# does not exist, or config:cache would pin the .env values. Never point I18N_DB at a production host.
#   I18N_DB=green_ruby_i18n_prov scripts/i18n/cms/safe-env.sh php artisan content:translations list cabin
# Do not use `php artisan serve` with it: serve filters the environment of its child process.
DB=${I18N_DB:?set I18N_DB to a local clone database}
CMS=${CMS_PATH:-${0:a:h}/../../../../cms-develop}
[ -f "$CMS/bootstrap/cache/config.php" ] && { echo "config is cached; refusing" >&2; exit 2; }
cd "$CMS"
exec env DB_HOST=127.0.0.1 DB_DATABASE=$DB APP_ENV=local MAIL_MAILER=log QUEUE_CONNECTION=sync \
  STRIPE_SECRET= STRIPE_WEBHOOK_SECRET= PAYPAL_CLIENT_ID= PAYPAL_SECRET= PAYPAL_WEBHOOK_ID= \
  SEPAY_MERCHANT_ID= SEPAY_SECRET_KEY= SEPAY_WEBHOOK_SECRET= SEPAY_API_KEY= ANTHROPIC_API_KEY= OPENAI_API_KEY= \
  FRONTEND_REVALIDATE_URL=http://127.0.0.1:9/disabled REVALIDATE_SECRET= "$@"
