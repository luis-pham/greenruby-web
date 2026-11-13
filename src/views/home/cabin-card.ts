import { inLocale, type LegacyCopy, type Locale } from '@/lib/i18n';

// Copy for the homepage suite cards that the CMS does not model.
//
// Tier label: the CMS "cabin class" field currently holds the view ("Ocean View") for most cabins, so the
// homepage uses the editorial tiers below, keyed by the cabin slug (the same in both languages). Cabins not
// listed fall back to the CMS class.
//
// Highlights: the room's view plus features named in that room's own summary. The amenity list in the CMS is
// ship-wide (Wi-Fi, pool…), so it can't tell rooms apart; nothing is shown that the summary doesn't mention.

const TIERS: Record<string, LegacyCopy<string>> = {
  'imperial-suite': { en: 'Signature Suite', vi: 'Suite biểu tượng', ja: 'シグネチャースイート', fr: 'Suite signature', es: 'Suite insignia', de: 'Signature-Suite', ko: '시그니처 스위트' },
  'royal-romance-suite': { en: 'Romance Suite', vi: 'Suite lãng mạn', ja: 'ロマンススイート', fr: 'Suite romantique', es: 'Suite romántica', de: 'Romance-Suite', ko: '로맨스 스위트' },
  'ocean-breeze-premium': { en: 'Premium Cabin', vi: 'Cabin cao cấp', ja: 'プレミアム客室', fr: 'Cabine Premium', es: 'Camarote Premium', de: 'Premium-Kabine', ko: '프리미엄 객실' },
  'serenity-deluxe': { en: 'Deluxe Cabin', vi: 'Cabin Deluxe', ja: 'デラックス客室', fr: 'Cabine Deluxe', es: 'Camarote Deluxe', de: 'Deluxe-Kabine', ko: '디럭스 객실' },
};

// In priority order; the first two found in the summary are shown. Korean alternatives are Hangul only, so they cannot
// change what the other languages match; a plain 샤워 (any shower) is not taken as a separate shower.
const FEATURES: { match: RegExp; label: LegacyCopy<string> }[] = [
  { match: /in-suite dining|private (in-suite )?dining|ăn uống và bar riêng|khu ăn uống|essen in der suite|객실 ?내 ?(다이닝|식사)|인스위트 ?다이닝/i, label: { en: 'In-suite dining', vi: 'Ăn uống riêng tư', ja: '客室でのお食事', fr: 'Repas en suite', es: 'Comidas en la suite', de: 'Essen in der Suite', ko: '객실 내 다이닝' } },
  { match: /jacuzzi|자쿠지/i, label: { en: 'Jacuzzi', vi: 'Bồn Jacuzzi', ja: 'ジャグジー', fr: 'Jacuzzi', es: 'Jacuzzi', de: 'Jacuzzi', ko: '자쿠지' } },
  { match: /[Tt]errace|[Ss]ân hiên|Terrasse|테라스/, /* case-sensitive: German noun "Terrasse" only, not the French "terrasse" (FR unchanged) */ label: { en: 'Private terrace', vi: 'Sân hiên riêng', ja: '専用テラス', fr: 'Terrasse privée', es: 'Terraza privada', de: 'Private Terrasse', ko: '전용 테라스' } },
  { match: /butler|버틀러/i, label: { en: 'Butler service', vi: 'Dịch vụ butler', ja: 'バトラーサービス', fr: 'Service de majordome', es: 'Servicio de mayordomo', de: 'Butler-Service', ko: '버틀러 서비스' } },
  { match: /bathtub|bồn tắm|badewanne|욕조/i, label: { en: 'Bathtub', vi: 'Bồn tắm', ja: 'バスタブ', fr: 'Baignoire', es: 'Bañera', de: 'Badewanne', ko: '욕조' } },
  { match: /separate shower|vòi sen riêng|separate dusche|getrennte dusche|(분리형|독립형?|별도) ?샤워/i, label: { en: 'Separate shower', vi: 'Vòi sen riêng', ja: '独立シャワー', fr: 'Douche séparée', es: 'Ducha independiente', de: 'Separate Dusche', ko: '분리형 샤워' } },
];

type CabinLike = { slug: string; cabinClass: string | null; view: string | null; summary: string | null };

export function cabinTier(cabin: CabinLike, locale: Locale): string | null {
  return (TIERS[cabin.slug] ? inLocale(TIERS[cabin.slug], locale) : null) ?? cabin.cabinClass;
}

export function cabinHighlights(cabin: CabinLike, locale: Locale): string[] {
  const summary = cabin.summary ?? '';
  const features = FEATURES.filter((f) => f.match.test(summary))
    .slice(0, 2)
    .map((f) => inLocale(f.label, locale));
  // A Jacuzzi bath is a bathtub: don't list both.
  const unique = features.includes(inLocale(FEATURES[1].label, locale)) ? features.filter((f) => f !== inLocale(FEATURES[4].label, locale)) : features;
  return [cabin.view, ...unique].filter((x): x is string => Boolean(x));
}
