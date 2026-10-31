import { NextResponse, type NextRequest } from 'next/server';
import { intlTreeLocale, UNMATCHED_PATH } from '@/lib/intl-404';

const loopback = (path: string) => `http://127.0.0.1:${process.env.PORT ?? 3000}${path}`;

// Intl URLs (phase 2B, lib/intl-404.ts). While a language is not effectively public (or the answer is unavailable:
// fails closed), EVERY URL of its tree, /ja itself included, is rewritten to a path no route matches: the English
// global 404, exactly what /ja answered before Japanese existed (no Japanese 404 page, no hint of the language). An
// editor's authenticated preview (both draft cookies set by /_draft/enter) is let through; intlRoute decides there.
// While it is public, unmatched /ja/... paths reach the (ja) catch-all: the Japanese 404 (lang="ja"). Status 404 in
// every case. Answers are kept 30 s per language (the CMS registry itself is cached for minutes, lib/api/locales.ts).
// en/vi paths never get here.
const PUBLIC_TTL_MS = 30_000;
const publicCache = new Map<string, { value: boolean; at: number }>();

async function intlPublic(code: string): Promise<boolean> {
  const hit = publicCache.get(code);
  if (hit && Date.now() - hit.at < PUBLIC_TTL_MS) return hit.value;
  try {
    const res = await fetch(loopback(`/api/i18n/public?locale=${encodeURIComponent(code)}`), { signal: AbortSignal.timeout(1500) });
    if (!res.ok) return false;
    const value = ((await res.json()) as { public?: unknown }).public === true;
    publicCache.set(code, { value, at: Date.now() });
    return value;
  } catch {
    return false;
  }
}

// Renamed CMS entities change their slug. The pages 308 old slugs themselves, but when the old URL was
// prerendered that redirect gets cached without a Location header, so redirect here, before rendering.
// Fails open: any error or timeout lets the page handle the request as before.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const tree = intlTreeLocale(pathname);
  if (tree) {
    const preview = request.cookies.has('gr_preview') && request.cookies.has('__prerender_bypass');
    if (preview) return NextResponse.next();
    if (!(await intlPublic(tree))) return NextResponse.rewrite(new URL(UNMATCHED_PATH, request.url));
    return NextResponse.next(); // public: matched pages render, unmatched ones reach the (ja) catch-all
  }
  if (!pathname.endsWith('.html')) return NextResponse.next();
  try {
    const url = loopback(`/api/canonical?path=${encodeURIComponent(pathname)}`);
    const res = await fetch(url, { signal: AbortSignal.timeout(1500) });
    const { canonical } = (await res.json()) as { canonical: string | null };
    if (canonical && canonical !== pathname) {
      // Proxy redirects must be absolute. Behind Nginx, rebuild the public origin from the forwarded headers.
      const proto = request.headers.get('x-forwarded-proto')?.split(',')[0] ?? request.nextUrl.protocol.replace(':', '');
      const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? request.nextUrl.host;
      return NextResponse.redirect(`${proto}://${host}${canonical}${request.nextUrl.search}`, 308);
    }
  } catch {
    // fall through
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/cruise/:file',
    '/cabin/:file',
    '/itinerary/:file',
    '/experiences/:file',
    '/vi/du-thuyen/:file',
    '/vi/phong-nghi/:file',
    '/vi/hanh-trinh/:file',
    '/vi/hoat-dong-trai-nghiem/:file',
    // Intl trees (phase 2B): closed language → English global 404 for every URL (lib/intl-404.ts).
    '/ja',
    '/ja/:path+',
  ],
};
