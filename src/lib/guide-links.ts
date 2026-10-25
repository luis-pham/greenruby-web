import { sectionPath, type Locale } from './i18n.ts';

/**
 * Travel Journal articles the guides and the footer link to. Article slugs are explicit CMS fields
 * (app_article.slug), so they don't change when a title is edited; if one is moved to another category
 * or unpublished, update it here (the footer links to these on every page).
 */
const ARTICLES = {
  // Not a translation pair: EN 221 is the eco-luxury guide, VI 240 the "choosing a luxury cruise" guide.
  // Each language labels the link after its own target (first-time.en.ts / first-time.vi.ts).
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

/** The Travel Guide set. Hubs switched off in the CMS are null (render as text or not at all). */
export function guideLinks(locale: Locale, hiddenPages: readonly string[] = []) {
  const hub = (section: keyof typeof HIDEABLE_PAGES) => (sectionVisible(section, hiddenPages) ? sectionPath(locale, section) : null);
  return {
    hub: sectionPath(locale, 'guides'),
    journal: sectionPath(locale, 'blog'),
    firstTime: hub('guideFirstTime'),
    bestTime: guideArticlePath(locale, 'bestTime'),
    bayComparison: guideArticlePath(locale, 'bayComparison'),
    destinations: hub('destinations'),
    transfer: hub('guideTransfer'),
    luxuryPillar: guideArticlePath(locale, 'luxuryPillar'),
  };
}

export type TravelGuideLabels = {
  destinations: string;
  firstTimeGuide: string;
  transferGuide: string;
  bestTime: string;
  bayComparison: string;
  travelJournal: string;
};

/**
 * The Travel Guide menu (header dropdown, footer column, guides hub), in one order everywhere: places,
 * the two planning guides, the two guide articles, the journal. Hubs switched off in the CMS are left out.
 */
export function travelGuideLinks(
  locale: Locale,
  labels: TravelGuideLabels,
  hiddenPages: readonly string[] = [],
): { key: keyof TravelGuideLabels; label: string; href: string }[] {
  const g = guideLinks(locale, hiddenPages);
  const hrefs: Record<keyof TravelGuideLabels, string | null> = {
    destinations: g.destinations,
    firstTimeGuide: g.firstTime,
    transferGuide: g.transfer,
    bestTime: g.bestTime,
    bayComparison: g.bayComparison,
    travelJournal: g.journal,
  };
  return (Object.keys(hrefs) as (keyof TravelGuideLabels)[]).flatMap((key) => {
    const href = hrefs[key];
    return href ? [{ key, label: labels[key], href }] : [];
  });
}
