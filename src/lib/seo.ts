import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import type { SiteInfo } from '@/lib/site-info';
import { absoluteImageUrl, absoluteUrl } from '@/lib/site-url';

/**
 * Title, description, canonical, hreflang, Open Graph and Twitter tags for a page.
 * hreflang is only emitted when the other-language counterpart is known exactly.
 */
export function pageMetadata({
  locale,
  site,
  title,
  description,
  path,
  alternatePath,
  image,
  noIndex,
}: {
  locale: Locale;
  site: SiteInfo;
  title: string;
  description?: string;
  path: string;
  alternatePath?: string;
  image?: string | null;
  noIndex?: boolean;
}): Metadata {
  // CMS SEO titles often already end with the brand ("… | Green Ruby"); don't append it twice.
  const brand = site.name.split(' ').slice(0, 2).join(' ').toLowerCase();
  const fullTitle = title.toLowerCase().includes(brand) ? title : `${title} | ${site.name}`;
  const url = absoluteUrl(path);
  const other: Locale = locale === 'en' ? 'vi' : 'en';
  const languages: Record<string, string> | undefined = alternatePath
    ? {
        [locale]: url,
        [other]: absoluteUrl(alternatePath),
        'x-default': absoluteUrl(locale === 'en' ? path : alternatePath),
      }
    : undefined;
  const images = image ? [{ url: absoluteImageUrl(image, 1200, 630), width: 1200, height: 630 }] : undefined;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: fullTitle,
      description,
      url,
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      images,
    },
    twitter: { card: images ? 'summary_large_image' : 'summary', title: fullTitle, description, images: images?.map((i) => i.url) },
    robots: noIndex || site.noIndex ? { index: false, follow: true } : undefined,
  };
}
