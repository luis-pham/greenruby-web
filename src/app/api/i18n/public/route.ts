import { locales, type Locale } from '@/lib/i18n';
import { localePublic } from '@/lib/intl';

// Internal (phase 2B): GET /api/i18n/public?locale=ja -> { public: boolean }. Asked by src/proxy.ts (over loopback, as
// /api/canonical) for an unmatched /ja/... URL: the Japanese 404 only while Japanese is effectively public, otherwise
// the English global 404. Nginx sends public /api/* requests to Laravel; the answer is public information anyway.
// Fails closed: an unknown code, or an unreadable CMS registry (lib/intl.ts), answers false.

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get('locale') ?? '';
  const known = (locales as readonly string[]).includes(code);
  return Response.json({ public: known ? await localePublic(code as Locale) : false });
}
