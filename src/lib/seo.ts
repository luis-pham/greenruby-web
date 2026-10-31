import type { Metadata } from 'next';
import type { OpenAlternates } from '@/lib/api/contract';
import { hreflangPaths, ogAlternates } from '@/lib/hreflang';
import { isLegacyLocale, localeInfo, type Locale } from '@/lib/i18n';
import type { SiteInfo } from '@/lib/site-info';
import { absoluteImageUrl, absoluteUrl } from '@/lib/site-url';

export const DEFAULT_SOCIAL_IMAGE = '/assets/frontend/images/logo-social.jpg?v=0.0.1';

/**
 * Title, description, canonical, hreflang, Open Graph and Twitter tags for a page.
 * hreflang is only emitted when the other-language counterpart is known exactly: the legacy EN/VI `alternatePath`,
 * plus, from phase 1D-b, the open intl members of the page's CMS `alternates` (lib/hreflang.ts).
 */
/** Search results show ~160 characters; long CMS summaries are cut at a word boundary. */
function clip(text: string | undefined, max = 160): string | undefined {
  const clean = text?.replace(/\s+/g, ' ').trim();
  if (!clean || clean.length <= max) return clean || undefined;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ') > 100 ? cut.lastIndexOf(' ') : cut.length).replace(/[\s,;:.\-–—]+$/, '')}…`;
}

/**
 * Editor-written titles with "|" (Japanese: full-width "｜") are complete ("Green Ruby 1 | Luxury…"), except that a
 * short brand suffix ("… | Green Ruby", "… - Green Ruby", "…｜Green Ruby") becomes the full name; titles without one
 * get " | {site name}".
 */
export function brandedTitle(title: string, siteName: string): string {
  const t = title.trim().replace(/\s*[|｜–—-]\s*Green Ruby\s*$/i, ` | ${siteName}`);
  return /[|｜]/.test(t) || t.toLowerCase().includes(siteName.toLowerCase()) ? t : `${t} | ${siteName}`;
}

export function pageMetadata({
  locale,
  site,
  title,
  description: rawDescription,
  path,
  alternatePath,
  alternates,
  image,
  noIndex,
}: {
  locale: Locale;
  site: SiteInfo;
  title: string;
  description?: string;
  path: string;
  alternatePath?: string;
  /** Open members of the page's translation group (lib/intl.ts pageAlternates). */
  alternates?: OpenAlternates;
  image?: string | null;
  noIndex?: boolean;
}): Metadata {
  const description = clip(rawDescription);
  const fullTitle = brandedTitle(title, site.name);
  const url = absoluteUrl(path);
  const paths = hreflangPaths(locale, path, alternatePath, alternates);
  const languages = Object.fromEntries(Object.entries(paths).map(([tag, target]) => [tag, absoluteUrl(target)]));
  const otherLocales = ogAlternates(locale, paths);
  // en/vi pages without an intl member keep the single EN/VI og:locale:alternate exactly as before.
  const alternateLocale = isLegacyLocale(locale) && otherLocales.length <= 1 ? (alternatePath ? otherLocales[0] : undefined) : otherLocales;
  // Pages without their own image share the Laravel site's default social card (frontend.organizationLogoSocial).
  // Social cards are JPEG (fm=jpg): /thumbnail serves WebP by default, which LinkedIn and some chat apps don't preview.
  const images = image
    ? [{ url: `${absoluteImageUrl(image, 1200, 630)}&fm=jpg`, width: 1200, height: 630, alt: fullTitle }]
    : [{ url: absoluteUrl(DEFAULT_SOCIAL_IMAGE), width: 1200, height: 627, alt: fullTitle }];

  // twitter:site / creator from the X profile in the CMS socials (ad_config "twitter").
  const xHandle = site.socials.find((x) => x.name === 'twitter')?.url.match(/(?:x|twitter)\.com\/@?([A-Za-z0-9_]+)/)?.[1];

  // hreflang only links indexable pages: a noindex page (legal, booking, empty blog category) declares none,
  // otherwise its counterpart's hreflang set points at a noindex URL ("noindex return links").
  const indexable = !(noIndex || site.noIndex);

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url, ...(indexable && { languages }) },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: fullTitle,
      description,
      url,
      locale: localeInfo[locale].ogLocale,
      ...(alternateLocale && alternateLocale.length > 0 && { alternateLocale }),
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
