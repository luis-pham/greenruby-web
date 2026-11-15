import type { LinkResolver } from '@/views/guides/Rich';
import { guideLinks } from './guide-links.ts';
import type { Locale } from './i18n.ts';
import { sectionHref } from './section-links.ts';

/**
 * Link targets for [label](target) in page copy outside the guides (home, itinerary hub, travel guide hub; SEO pass
 * 2026-11-15). A target is a site path ("/destinations/luon-cave") or one of the keys below. A key whose page is
 * switched off (null) renders the label as plain text. Copy without links renders exactly as before.
 */
export function copyLinks(locale: Locale, site: { hiddenPages?: readonly string[]; publicSections?: readonly string[] }): LinkResolver {
  const g = guideLinks(locale, site.hiddenPages ?? [], site.publicSections);
  const keys: Record<string, string | null> = {
    firstTime: g.firstTime,
    transfer: g.transfer,
    destinations: g.destinations,
    bestTime: g.bestTime,
    bayComparison: g.bayComparison,
    luxuryChoice: g.luxuryChoice,
    itinerary: sectionHref(locale, 'itinerary', site.publicSections),
    experiences: sectionHref(locale, 'experiences', site.publicSections),
  };
  return (target) => (target.startsWith('/') ? target : (keys[target] ?? null));
}
