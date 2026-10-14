import type { MenuItem, Site } from '@/lib/api/schemas';

export type SiteInfo = {
  name: string;
  hotline: string | null;
  hotlineHref: string | null;
  whatsappHref: string | null;
  email: string | null;
  address: string | null;
  socials: { name: string; url: string }[];
  noIndex: boolean;
  /** Favicon from the CMS (ad_config "website-icon"), as an /upload path. */
  icon: string | null;
  /** Brand logos from the CMS: full-colour ("website-logo") and white for dark backgrounds ("website-logo-negative"). */
  logo: string | null;
  logoNegative: string | null;
  /** Google Tag Manager container id (ad_config "google-tag-manager-id"), loaded only after cookie consent. */
  gtmId: string | null;
};

const SOCIAL_KEYS = ['facebook', 'instagram', 'youtube', 'tiktok', 'tripadvisor', 'linkedin', 'pinterest', 'twitter'];

/** CMS file values look like "/2026/02/06/logo.png"; served from /upload. */
const uploadPath = (value: string | null | undefined) =>
  value ? `/upload/${value.replace(/^\/?(upload\/)?/, '')}` : null;

const telHref = (phone: string | null | undefined) => {
  const digits = phone?.replace(/[^\d+]/g, '');
  return digits ? `tel:${digits}` : null;
};

/** Normalizes the raw ad_config map into the few values the layout needs. */
export function siteInfo(site: Site): SiteInfo {
  const c = site.config;
  const whatsapp = c['whatsapp']?.replace(/\D/g, '');
  return {
    name: c['website-name'] || 'Green Ruby Cruises',
    hotline: c['hotline'] || null,
    hotlineHref: telHref(c['hotline']),
    whatsappHref: whatsapp ? `https://wa.me/${whatsapp}` : null,
    email: c['email'] || null,
    address: c['address'] || null,
    socials: SOCIAL_KEYS.flatMap((name) => (c[name] ? [{ name, url: c[name] as string }] : [])),
    noIndex: c['block-search-engine'] === 'true' || c['block-search-engine'] === '1',
    icon: uploadPath(c['website-icon']),
    logo: uploadPath(c['website-logo']),
    logoNegative: uploadPath(c['website-logo-negative']),
    gtmId: /^GTM-[A-Z0-9]+$/.test(c['google-tag-manager-id'] ?? '') ? (c['google-tag-manager-id'] as string) : null,
  };
}

export type NavLink = { label: string; href: string; external: boolean; children: NavLink[] };

const ROMAN: Record<string, string> = { I: '1', II: '2', III: '3', IV: '4', V: '5' };

/** CMS menu labels name the ships "Green Ruby I/II"; the rest of the site says "Green Ruby 1/2". */
const arabicNumeral = (label: string) => label.replace(/\s(I{1,3}|IV|V)$/, (_, n: string) => ` ${ROMAN[n]}`);

const isPlaceholder = (url: string | null) => !url || url === '#' || url.startsWith('javascript:');

/** CMS menu -> clean links. Group items without their own URL point at their first child. */
export function navLinks(menu: MenuItem[]): NavLink[] {
  return menu.flatMap((item) => {
    const children = navLinks(item.children);
    const href = isPlaceholder(item.url) ? children[0]?.href : (item.url as string);
    if (!href) return [];
    return [{ label: arabicNumeral(item.name), href, external: item.target === '_blank', children }];
  });
}
