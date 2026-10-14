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
};

const SOCIAL_KEYS = ['facebook', 'instagram', 'youtube', 'tiktok', 'tripadvisor', 'linkedin', 'pinterest', 'twitter'];

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
  };
}

export type NavLink = { label: string; href: string; external: boolean; children: NavLink[] };

const isPlaceholder = (url: string | null) => !url || url === '#' || url.startsWith('javascript:');

/** CMS menu -> clean links. Group items without their own URL point at their first child. */
export function navLinks(menu: MenuItem[]): NavLink[] {
  return menu.flatMap((item) => {
    const children = navLinks(item.children);
    const href = isPlaceholder(item.url) ? children[0]?.href : (item.url as string);
    if (!href) return [];
    return [{ label: item.name, href, external: item.target === '_blank', children }];
  });
}
