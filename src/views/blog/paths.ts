import { sectionPath, type Locale } from '@/lib/i18n';

// URL shapes kept from Laravel (Modules/FrontEnd/Routes/web.php):
//   /blog, /blog/page-{n}, /blog/{category}, /blog/{category}/page-{n}, /blog/{category}/{slug}.html
//   vi: /vi/blog/..., with trang-{n} instead of page-{n}. Legacy /blog/{slug}-{id}.html -> 301.

const pagePrefix = (locale: Locale) => (locale === 'vi' ? 'trang' : 'page');

/** "page-3" (en) / "trang-3" (vi). */
export function pageSegment(locale: Locale, page: number): string {
  return `${pagePrefix(locale)}-${page}`;
}

export function blogPath(locale: Locale, category?: string | null, page = 1): string {
  const base = category ? `${sectionPath(locale, 'blog')}/${category}` : sectionPath(locale, 'blog');
  return page > 1 ? `${base}/${pageSegment(locale, page)}` : base;
}

export function articlePath(locale: Locale, categorySlug: string, slug: string): string {
  return `${sectionPath(locale, 'blog')}/${categorySlug}/${slug}.html`;
}

/** Keyword search lives on its own noindex route so the listing pages stay fully static. */
export function searchPath(locale: Locale): string {
  return `${sectionPath(locale, 'blog')}/${locale === 'vi' ? 'tim-kiem' : 'search'}`;
}

/** "page-3" (en) / "trang-3" (vi) -> 3. Anything else -> null. */
export function parsePageSegment(locale: Locale, segment: string): number | null {
  const match = new RegExp(`^${pagePrefix(locale)}-(\\d{1,6})$`).exec(segment);
  return match ? Number(match[1]) : null;
}

/** "old-title-123.html" -> 123 (Laravel ignores the slug part of legacy URLs). */
export function parseLegacyFile(segment: string): number | null {
  const match = /^.+-(\d+)\.html$/.exec(segment);
  return match ? Number(match[1]) : null;
}
