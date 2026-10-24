import { sectionPath, type Locale } from '@/lib/i18n';

/**
 * Travel Journal articles the guides and the footer link to. Article slugs are explicit CMS fields
 * (app_article.slug), so they don't change when a title is edited; if one is moved to another category
 * or unpublished, update it here (the footer links to these on every page).
 */
const ARTICLES = {
  // Pillar: EN 221 / VI 240.
  luxuryPillar: {
    en: '/blog/eco-sustainability/the-complete-guide-to-eco-friendly-luxury-cruises-in-ha-long-bay-2026.html',
    vi: '/vi/blog/hanh-trinh/kinh-nghiem-chon-du-thuyen-ha-long-cao-cap.html',
  },
  // EN 236 / VI 265.
  bestTime: {
    en: '/blog/travel-tips/best-time-to-visit-halong-bay.html',
    vi: '/vi/blog/hanh-trinh/di-ha-long-mua-nao-dep.html',
  },
  // EN 222 / VI 223.
  bayComparison: {
    en: '/blog/destinations/ha-long-bay-vs-lan-ha-bay-which-cruise.html',
    vi: '/vi/blog/hanh-trinh/nen-chon-du-thuyen-ha-long-hay-lan-ha.html',
  },
} as const;

export type GuideArticle = keyof typeof ARTICLES;

export function guideArticlePath(locale: Locale, article: GuideArticle): string {
  return ARTICLES[article][locale];
}

/** CMS page code (app_page) of each hub an editor can switch off; see Site.hiddenPages. */
export const HIDEABLE_PAGES = { guideFirstTime: 'guide-first-time', guideTransfer: 'guide-transfer', destinations: 'destinations' } as const;

/** False when the section is switched off in the CMS for this language (sections without a switch are always shown). */
export const sectionVisible = (section: string, hiddenPages: readonly string[]) =>
  !(section in HIDEABLE_PAGES && hiddenPages.includes(HIDEABLE_PAGES[section as keyof typeof HIDEABLE_PAGES]));

/** The "Halong Cruise Guide" set, in footer order. Hubs switched off in the CMS are null (render as text or not at all). */
export function guideLinks(locale: Locale, hiddenPages: readonly string[] = []) {
  const hub = (section: keyof typeof HIDEABLE_PAGES) => (sectionVisible(section, hiddenPages) ? sectionPath(locale, section) : null);
  return {
    journal: sectionPath(locale, 'blog'),
    firstTime: hub('guideFirstTime'),
    bestTime: guideArticlePath(locale, 'bestTime'),
    bayComparison: guideArticlePath(locale, 'bayComparison'),
    destinations: hub('destinations'),
    transfer: hub('guideTransfer'),
    luxuryPillar: guideArticlePath(locale, 'luxuryPillar'),
  };
}
