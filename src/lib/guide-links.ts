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

/** The "Halong Cruise Guide" set, in footer order. */
export function guideLinks(locale: Locale) {
  return {
    journal: sectionPath(locale, 'blog'),
    firstTime: sectionPath(locale, 'guideFirstTime'),
    bestTime: guideArticlePath(locale, 'bestTime'),
    bayComparison: guideArticlePath(locale, 'bayComparison'),
    destinations: sectionPath(locale, 'destinations'),
    transfer: sectionPath(locale, 'guideTransfer'),
    luxuryPillar: guideArticlePath(locale, 'luxuryPillar'),
  };
}
