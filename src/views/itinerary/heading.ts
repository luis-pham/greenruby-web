import type { Locale } from '@/lib/i18n';
import { keepBayNames } from '../../lib/typography.ts';

// Vietnamese itinerary H1 (SEO pass 2026-11-15, reports/vi-seo-keyword-audit-2026-11.md §6.1-C).
// The CMS name ("2 ngày 1 đêm – Một Thoáng Hạ Long") also derives the itinerary slug, so it is never edited for SEO:
// the page heading is composed here instead, for vi only: "Du thuyền Hạ Long 2 ngày 1 đêm – Một Thoáng Hạ Long".
// English gets its own composition (englishHeading); every other language, and an itinerary without a bay, keeps
// the CMS name unchanged.

const VI_BAY: Record<string, string> = { 'ha-long': 'Hạ Long', 'lan-ha': 'Lan Hạ' };

/** A leading "2 ngày 1 đêm –" / "2 Ngày 1 Đêm -" in the CMS name (case and dash style vary between rows). */
const LEADING_DURATION = /^\s*\d+\s+ngày\s+\d+\s+đêm\s*[-–—:]\s*/iu;

const EN_BAY: Record<string, string> = { 'ha-long': 'Ha Long Bay', 'lan-ha': 'Lan Ha Bay' };

/** English CMS names read "The Halong Escape - 2 Days 1 Night": the product name before the dash. */
const EN_PRODUCT = /^(.+?)\s+[-–—]\s+\d+\s+days?\b.*$/i;

/**
 * English itinerary H1 (SEO pass 2026-11-15, reports/en-seo-keyword-onpage-audit-2026-11.md Part 5), composed the same
 * way as the Vietnamese one: "The Halong Escape: Ha Long Bay Cruise, 2 Days 1 Night". The CMS name is not edited.
 */
function englishHeading(it: { name: string; bay: string | null; duration: number }): string {
  const bay = it.bay ? EN_BAY[it.bay] : undefined;
  const m = EN_PRODUCT.exec(it.name.trim());
  if (!bay || !m || !(it.duration > 1)) return it.name;
  const nights = it.duration - 1;
  // No-break spaces keep "Ha Long Bay Cruise," and "2 Days 1 Night" whole: lines break after the colon or the comma.
  const keep = (s: string) => s.replace(/ /g, '\u00a0');
  return `${m[1]}: ${keep(`${bay} Cruise,`)} ${keep(`${it.duration} Days ${nights} Night${nights === 1 ? '' : 's'}`)}`;
}

export function itineraryHeading(
  locale: Locale,
  it: { name: string; bay: string | null; duration: number },
): string {
  if (locale === 'en') return englishHeading(it);
  if (locale !== 'vi') return it.name;
  const bay = it.bay ? VI_BAY[it.bay] : undefined;
  if (!bay || !(it.duration > 1)) return it.name;
  const product = it.name.replace(LEADING_DURATION, '').trim();
  // Bay names kept on one line (no "Hạ / Long" break on phones), as on the other vi headings.
  // Lines may only break between the three parts ("Du thuyền Hạ Long" / "2 ngày 1 đêm –" / "Một Thoáng Hạ Long"):
  // no-break spaces inside the duration (dash included) and inside a short product name.
  const nights = `${it.duration} ngày ${it.duration - 1} đêm –`.replace(/ /g, '\u00a0');
  const name = product || it.name;
  const tail = name.length <= 20 ? name.replace(/ /g, '\u00a0') : name;
  return keepBayNames(`Du thuyền ${bay} ${nights} ${tail}`);
}
