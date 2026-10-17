import type { MenuItem, Site } from '@/lib/api/schemas';

export type SiteInfo = {
  name: string;
  hotline: string | null;
  hotlineHref: string | null;
  whatsappHref: string | null;
  /** Floating chat bubble links: Zalo (ad_config "zalo", else the hotline number) and Messenger (from the Facebook page). */
  zaloHref: string | null;
  messengerHref: string | null;
  /** AI support chat (ad_config "ai-chat-url"); shown as "soon" until set. */
  aiChatHref: string | null;
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

/** "zalo" may be a full link or a phone number; zalo.me takes the local form (0xxxxxxxxx). */
const zaloHref = (value: string | null | undefined) => {
  const v = value?.trim();
  if (!v) return null;
  if (/^https?:\/\//.test(v)) return v;
  const digits = v.replace(/\D/g, '').replace(/^84/, '0');
  return digits ? `https://zalo.me/${digits}` : null;
};

/** https://www.facebook.com/<page> -> https://m.me/<page>; other Facebook URLs (profile.php?id=) are kept as-is. */
const messengerHref = (facebook: string | null | undefined) => {
  if (!facebook) return null;
  const match = facebook.match(/facebook\.com\/([A-Za-z0-9.\-_]+)\/?$/);
  return match && match[1] !== 'profile.php' ? `https://m.me/${match[1]}` : facebook;
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
    zaloHref: zaloHref(c['zalo'] || c['hotline']),
    messengerHref: messengerHref(c['facebook']),
    aiChatHref: /^https?:\/\//.test(c['ai-chat-url'] ?? '') ? (c['ai-chat-url'] as string) : null,
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
