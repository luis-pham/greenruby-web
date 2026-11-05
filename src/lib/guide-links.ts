import { isLegacyLocale, type Locale } from './i18n.ts';
import { sectionHref } from './section-links.ts';

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
    // FR 289 (French slug), the translation of EN 221.
    fr: '/fr/blog/ecotourisme/croisiere-ecoresponsable-baie-d-halong.html',
  },
  // EN 236 / VI 265 / JA (2026-11-01).
  bestTime: {
    en: '/blog/travel-tips/best-time-to-visit-halong-bay.html',
    vi: '/vi/blog/hanh-trinh/di-ha-long-mua-nao-dep.html',
    ja: '/ja/blog/travel-tips/best-time-to-visit-halong-bay.html',
    fr: '/fr/blog/conseils-pratiques/quand-partir-en-baie-d-halong.html',
  },
  // EN 222 / VI 223 / JA (2026-11-01).
  bayComparison: {
    en: '/blog/destinations/ha-long-bay-vs-lan-ha-bay-which-cruise.html',
    vi: '/vi/blog/hanh-trinh/nen-chon-du-thuyen-ha-long-hay-lan-ha.html',
    ja: '/ja/blog/destinations-itineraries/ha-long-bay-vs-lan-ha-bay-which-cruise.html',
    fr: '/fr/blog/destinations-et-itineraires/baie-de-lan-ha-ou-baie-d-halong.html',
  },
} as const satisfies Record<string, { en: string; vi: string } & Partial<Record<Locale, string>>>;

export type GuideArticle = keyof typeof ARTICLES;

/**
 * The article in the language. A new language links its own copy only while its blog is public (`publicSections`),
 * otherwise (or without a copy) the English article.
 */
export function guideArticlePath(locale: Locale, article: GuideArticle, publicSections?: readonly string[]): string {
  const paths: { en: string; vi: string } & Partial<Record<Locale, string>> = ARTICLES[article];
  if (isLegacyLocale(locale)) return paths[locale as 'en' | 'vi'];
  const own = (paths as Partial<Record<Locale, string>>)[locale];
  return own && publicSections?.includes('blog') ? own : paths.en;
}

/** CMS page code (app_page) of each hub an editor can switch off; see Site.hiddenPages. */
export const HIDEABLE_PAGES = { guideFirstTime: 'guide-first-time', guideTransfer: 'guide-transfer', destinations: 'destinations' } as const;

/** False when the section is switched off in the CMS for this language (sections without a switch are always shown). */
export const sectionVisible = (section: string, hiddenPages: readonly string[]) =>
  !(section in HIDEABLE_PAGES && hiddenPages.includes(HIDEABLE_PAGES[section as keyof typeof HIDEABLE_PAGES]));

/**
 * The Travel Guide set. Hubs switched off in the CMS are null (render as text or not at all). A new language links
 * to its own hub only when it is public there (`publicSections`, phase 2C), otherwise to the English one.
 */
export function guideLinks(locale: Locale, hiddenPages: readonly string[] = [], publicSections?: readonly string[]) {
  const hub = (section: keyof typeof HIDEABLE_PAGES) => (sectionVisible(section, hiddenPages) ? sectionHref(locale, section, publicSections) : null);
  return {
    hub: sectionHref(locale, 'guides', publicSections),
    journal: sectionHref(locale, 'blog', publicSections),
    firstTime: hub('guideFirstTime'),
    bestTime: guideArticlePath(locale, 'bestTime', publicSections),
    bayComparison: guideArticlePath(locale, 'bayComparison', publicSections),
    destinations: hub('destinations'),
    transfer: hub('guideTransfer'),
    luxuryPillar: guideArticlePath(locale, 'luxuryPillar', publicSections),
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
  publicSections?: readonly string[],
): { key: keyof TravelGuideLabels; label: string; href: string }[] {
  const g = guideLinks(locale, hiddenPages, publicSections);
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
