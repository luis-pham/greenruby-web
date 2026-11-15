import type { Locale } from '@/lib/i18n';
import { keepBayNames } from '../../lib/typography.ts';

// Vietnamese itinerary H1 (SEO pass 2026-11-15, reports/vi-seo-keyword-audit-2026-11.md §6.1-C).
// The CMS name ("2 ngày 1 đêm – Một Thoáng Hạ Long") also derives the itinerary slug, so it is never edited for SEO:
// the page heading is composed here instead, for vi only: "Du thuyền Hạ Long 2 ngày 1 đêm – Một Thoáng Hạ Long".
// Every other language, and a vi itinerary without a bay, keeps the CMS name unchanged.

const VI_BAY: Record<string, string> = { 'ha-long': 'Hạ Long', 'lan-ha': 'Lan Hạ' };

/** A leading "2 ngày 1 đêm –" / "2 Ngày 1 Đêm -" in the CMS name (case and dash style vary between rows). */
const LEADING_DURATION = /^\s*\d+\s+ngày\s+\d+\s+đêm\s*[-–—:]\s*/iu;

export function itineraryHeading(
  locale: Locale,
  it: { name: string; bay: string | null; duration: number },
): string {
  if (locale !== 'vi') return it.name;
  const bay = it.bay ? VI_BAY[it.bay] : undefined;
  if (!bay || !(it.duration > 1)) return it.name;
  const product = it.name.replace(LEADING_DURATION, '').trim();
  // Bay names kept on one line (no "Hạ / Long" break on phones), as on the other vi headings.
  return keepBayNames(`Du thuyền ${bay} ${it.duration} ngày ${it.duration - 1} đêm – ${product || it.name}`);
}
