import type { Locale } from '@/lib/i18n';

// Copy for the homepage suite cards that the CMS does not model.
//
// Tier label: the CMS "cabin class" field currently holds the view ("Ocean View") for most cabins, so the
// homepage uses the editorial tiers below, keyed by the cabin slug (the same in both languages). Cabins not
// listed fall back to the CMS class.
//
// Highlights: the room's view plus features named in that room's own summary. The amenity list in the CMS is
// ship-wide (Wi-Fi, pool…), so it can't tell rooms apart; nothing is shown that the summary doesn't mention.

const TIERS: Record<string, Record<Locale, string>> = {
  'imperial-suite': { en: 'Signature Suite', vi: 'Suite biểu tượng' },
  'royal-romance-suite': { en: 'Romance Suite', vi: 'Suite lãng mạn' },
  'ocean-breeze-premium': { en: 'Premium Cabin', vi: 'Cabin cao cấp' },
  'serenity-deluxe': { en: 'Deluxe Cabin', vi: 'Cabin Deluxe' },
};

// In priority order; the first two found in the summary are shown.
const FEATURES: { match: RegExp; label: Record<Locale, string> }[] = [
  { match: /in-suite dining|private (in-suite )?dining|ăn uống và bar riêng|khu ăn uống/i, label: { en: 'In-suite dining', vi: 'Ăn uống riêng tư' } },
  { match: /jacuzzi/i, label: { en: 'Jacuzzi', vi: 'Bồn Jacuzzi' } },
  { match: /terrace|sân hiên/i, label: { en: 'Private terrace', vi: 'Sân hiên riêng' } },
  { match: /butler/i, label: { en: 'Butler service', vi: 'Dịch vụ butler' } },
  { match: /bathtub|bồn tắm/i, label: { en: 'Bathtub', vi: 'Bồn tắm' } },
  { match: /separate shower|vòi sen riêng/i, label: { en: 'Separate shower', vi: 'Vòi sen riêng' } },
];

type CabinLike = { slug: string; cabinClass: string | null; view: string | null; summary: string | null };

export function cabinTier(cabin: CabinLike, locale: Locale): string | null {
  return TIERS[cabin.slug]?.[locale] ?? cabin.cabinClass;
}

export function cabinHighlights(cabin: CabinLike, locale: Locale): string[] {
  const summary = cabin.summary ?? '';
  const features = FEATURES.filter((f) => f.match.test(summary))
    .slice(0, 2)
    .map((f) => f.label[locale]);
  // A Jacuzzi bath is a bathtub: don't list both.
  const unique = features.includes(FEATURES[1].label[locale]) ? features.filter((f) => f !== FEATURES[4].label[locale]) : features;
  return [cabin.view, ...unique].filter((x): x is string => Boolean(x));
}
