import type { Locale } from '@/lib/i18n';
import type { ArticleSummary } from './data';
import { articlePath } from './paths';

export const pad = (n: number) => String(n).padStart(2, '0');

/** "13 June 2026" / "13 tháng 6, 2026", in the CMS timezone. */
export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(new Date(iso));
}

/** Articles without a category have no public URL (Laravel sends them to /blog), so lists skip them. */
export type LinkedArticle = ArticleSummary & { category: NonNullable<ArticleSummary['category']>; href: string };

export function linked(locale: Locale, articles: ArticleSummary[]): LinkedArticle[] {
  return articles.flatMap((a) => (a.category ? [{ ...a, category: a.category, href: articlePath(locale, a.category.slug, a.slug) }] : []));
}

// Photography already in the CMS media library (also used by the contact page), for the hero,
// topic cards and calls to action when no article image is available.
export const PHOTOS = {
  hero: '/upload/2026/03/13/banner-home.png',
  afterword: '/upload/2026/03/13/2n3d-lh.png',
  topics: ['/upload/2026/03/09/banner-itineraries.png', '/upload/2026/03/13/2n3d-hl-1.png', '/upload/2026/03/13/3n2d-lh.png', '/upload/2026/03/13/2n3d-lh.png', '/upload/2026/03/13/banner-home.png'],
};

export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" width="16" height="16">
      <circle cx="10.8" cy="10.8" r="6.5" />
      <path d="m16 16 5 5" />
    </svg>
  );
}
