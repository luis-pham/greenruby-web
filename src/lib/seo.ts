import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import type { SiteInfo } from '@/lib/site-info';
import { absoluteImageUrl, absoluteUrl } from '@/lib/site-url';

export const DEFAULT_SOCIAL_IMAGE = '/assets/frontend/images/logo-social.jpg?v=0.0.1';

/**
 * Title, description, canonical, hreflang, Open Graph and Twitter tags for a page.
 * hreflang is only emitted when the other-language counterpart is known exactly.
 */
/** Search results show ~160 characters; long CMS summaries are cut at a word boundary. */
function clip(text: string | undefined, max = 160): string | undefined {
  const clean = text?.replace(/\s+/g, ' ').trim();
  if (!clean || clean.length <= max) return clean || undefined;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ') > 100 ? cut.lastIndexOf(' ') : cut.length).replace(/[\s,;:.\-–—]+$/, '')}…`;
}

export function pageMetadata({
  locale,
  site,
  title,
  description: rawDescription,
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
  const description = clip(rawDescription);
  // Editor-written titles ("… | Green Ruby") are complete; names like "Green Ruby 1" still get the brand.
  const fullTitle = title.includes('|') || title.toLowerCase().includes(site.name.toLowerCase()) ? title : `${title} | ${site.name}`;
  const url = absoluteUrl(path);
  const other: Locale = locale === 'en' ? 'vi' : 'en';
  const languages: Record<string, string> | undefined = alternatePath
    ? {
        [locale]: url,
        [other]: absoluteUrl(alternatePath),
        'x-default': absoluteUrl(locale === 'en' ? path : alternatePath),
      }
    : // No exact counterpart in the other language: declare the page's own language only (as the Laravel site did).
      { [locale]: url };
  // Pages without their own image share the Laravel site's default social card (frontend.organizationLogoSocial).
  // Social cards are JPEG (fm=jpg): /thumbnail serves WebP by default, which LinkedIn and some chat apps don't preview.
  const images = image
    ? [{ url: `${absoluteImageUrl(image, 1200, 630)}&fm=jpg`, width: 1200, height: 630, alt: fullTitle }]
    : [{ url: absoluteUrl(DEFAULT_SOCIAL_IMAGE), width: 1200, height: 627, alt: fullTitle }];

  // twitter:site / creator from the X profile in the CMS socials (ad_config "twitter").
  const xHandle = site.socials.find((x) => x.name === 'twitter')?.url.match(/(?:x|twitter)\.com\/@?([A-Za-z0-9_]+)/)?.[1];

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
      ...(alternatePath && { alternateLocale: other === 'vi' ? 'vi_VN' : 'en_US' }),
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
      ...(xHandle && { site: `@${xHandle}`, creator: `@${xHandle}` }),
    },
    robots: noIndex || site.noIndex ? { index: false, follow: true } : undefined,
    ...(site.icon && { icons: { icon: site.icon, apple: site.icon } }),
  };
}
