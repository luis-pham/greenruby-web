// Compiled locales (phase 1D-b). en/vi are the legacy site (unprefixed EN, /vi + Vietnamese segments). ja is an
// 'intl' locale: /ja + the English segments (docs/i18n-audit/12 §7). Compiling a locale does not make it public:
// the CMS serves it only once it is effectively public and every web instance lists it in its manifest.
export const locales = ['en', 'vi', 'ja', 'fr', 'es', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** The legacy locales (the existing site); everything else is an intl locale. */
export const legacyLocales = ['en', 'vi'] as const;
export type LegacyLocale = (typeof legacyLocales)[number];
export const isLegacyLocale = (locale: string): locale is LegacyLocale => (legacyLocales as readonly string[]).includes(locale);

/** Per-language copy written for the legacy locales; an intl locale may add its own. */
export type LegacyCopy<T> = Record<LegacyLocale, T> & Partial<Record<Locale, T>>;

/**
 * The copy for `locale`, English when an intl locale has none yet. Such a locale is not ready (its dictionary is
 * not marked ready in messages/index.ts), so the manifest keeps it closed and the English text is never public.
 */
export const inLocale = <T>(copy: LegacyCopy<T>, locale: Locale): T => copy[locale] ?? copy.en;

/** `copy` for every compiled locale (see inLocale). */
export const byLocale = <T>(copy: LegacyCopy<T>): Record<Locale, T> =>
  Object.fromEntries(locales.map((l) => [l, inLocale(copy, l)])) as Record<Locale, T>;

export const localeInfo: Record<Locale, { nativeName: string; code: string; hreflang: string; ogLocale: string; intlTag: string }> = {
  en: { nativeName: 'English', code: 'EN', hreflang: 'en', ogLocale: 'en_US', intlTag: 'en-US' },
  vi: { nativeName: 'Tiếng Việt', code: 'VI', hreflang: 'vi', ogLocale: 'vi_VN', intlTag: 'vi-VN' },
  ja: { nativeName: '日本語', code: 'JA', hreflang: 'ja', ogLocale: 'ja_JP', intlTag: 'ja-JP' },
  fr: { nativeName: 'Français', code: 'FR', hreflang: 'fr', ogLocale: 'fr_FR', intlTag: 'fr-FR' },
  // One neutral Spanish edition for Spain and Latin America (no es-ES / es-MX split): hreflang 'es'.
  es: { nativeName: 'Español', code: 'ES', hreflang: 'es', ogLocale: 'es_ES', intlTag: 'es-ES' },
  // One German edition for Germany, Austria and Switzerland (standard spelling with ß): hreflang 'de'.
  de: { nativeName: 'Deutsch', code: 'DE', hreflang: 'de', ogLocale: 'de_DE', intlTag: 'de-DE' },
};

const intlTagOf = (locale: string): string | undefined => (localeInfo as Partial<Record<string, { intlTag: string }>>)[locale]?.intlTag;

/** Intl tag for dates: English (and anything unknown) keeps en-GB day-month-year, as before; others use their own. */
export const dateFormatTag = (locale: string): string => (locale === 'en' ? 'en-GB' : (intlTagOf(locale) ?? 'en-GB'));

/** Intl tag for amounts: en-US for English (and anything unknown), vi-VN for Vietnamese, as before; others their own. */
export const numberFormatTag = (locale: string): string => intlTagOf(locale) ?? 'en-US';

// English URLs have no prefix; Vietnamese URLs use /vi plus translated segments, matching Laravel's
// FeUtils::getLocalizedFrontendPathSegmentMap(); intl locales use /{code} plus the English segments (PathBuilder), so
// the table lists the legacy locales only and a new language needs no row here.
const segments = {
  cruise: { en: 'cruise', vi: 'du-thuyen' },
  cabin: { en: 'cabin', vi: 'phong-nghi' },
  itinerary: { en: 'itinerary', vi: 'hanh-trinh' },
  experiences: { en: 'experiences', vi: 'hoat-dong-trai-nghiem' },
  services: { en: 'services', vi: 'dich-vu' },
  gallery: { en: 'gallery', vi: 'thu-vien' },
  contact: { en: 'contact', vi: 'lien-he' },
  aboutUs: { en: 'about-us', vi: 'gioi-thieu' },
  faq: { en: 'faq', vi: 'cau-hoi-thuong-gap' },
  blog: { en: 'blog', vi: 'blog' },
  // Company news: articles of the CMS category of the same slug (news / tin-tuc), kept out of /blog.
  news: { en: 'news', vi: 'tin-tuc' },
  booking: { en: 'booking', vi: 'booking' },
  privacyPolicy: { en: 'privacy-policy', vi: 'chinh-sach-bao-mat' },
  legal: { en: 'legal', vi: 'phap-ly' },
  safetyPolicies: { en: 'safety-policies', vi: 'chinh-sach-an-toan' },
  termsAndConditions: { en: 'terms-and-conditions', vi: 'dieu-khoan-dieu-kien' },
  paymentMethods: { en: 'payment-methods', vi: 'phuong-thuc-thanh-toan' },
  cookiePolicy: { en: 'cookie-policy', vi: 'chinh-sach-cookie' },
  bookingTerms: { en: 'booking-terms-and-conditions', vi: 'dieu-khoan-dat-tour' },
  ecoDashboard: { en: 'eco-dashboard', vi: 'bao-cao-sinh-thai' },
  brandFacts: { en: 'about-us/brand-facts', vi: 'gioi-thieu/thong-tin-thuong-hieu' },
  // Travel guide (Next.js only; Laravel's SitemapController mirrors these paths). `guides` is the hub.
  guides: { en: 'guides', vi: 'cam-nang' },
  destinations: { en: 'destinations', vi: 'dia-diem-tham-quan' },
  guideFirstTime: { en: 'guides/first-time-halong-bay-cruise', vi: 'cam-nang/lan-dau-di-du-thuyen-ha-long' },
  guideTransfer: { en: 'guides/hanoi-to-halong-bay', vi: 'cam-nang/ha-noi-di-ha-long' },
} as const;

export type Section = keyof typeof segments;

/** A section's path segment in `locale`: its own for en/vi, the English one for every intl locale. */
const segmentIn = (section: Section, locale: Locale): string => segments[section][isLegacyLocale(locale) ? locale : 'en'];

/** Every section name (PathBuilder::SEGMENTS). Which of them a locale really serves comes from its route tree (intl-routes.ts). */
export const sections = Object.keys(segments) as Section[];

/** The section whose single-segment path is `segment` in `locale` ('du-thuyen', vi → cruise); null when none. */
export function segmentOf(segment: string, locale: Locale): Section | null {
  return sections.find((section) => segmentIn(section, locale) === segment) ?? null;
}

const prefix = (locale: Locale) => (locale === defaultLocale ? '' : `/${locale}`);

export function homePath(locale: Locale): string {
  return prefix(locale) || '/';
}

/**
 * Sections an intl locale has (its generated route tree, intl-routes.ts): content the CMS publishes per row,
 * (phase 1E-c) the static pages whose CMS page row is their publication (services, gallery, about us, contact), and
 * (phase 2B) the booking wizard and payment-link page (/ja/booking, /ja/booking/pay: noindex, never in a sitemap; the
 * locale books the English inventory in USD, CMS booking.price_list_for_locale), and (2026-11-01) the travel guide hub
 * with its two guides, whose copy lives in views/guides and whose CMS page rows are their publication.
 */
export const intlSections = ['home', 'cruise', 'cabin', 'itinerary', 'experiences', 'destinations', 'blog', 'news', 'faq', 'services', 'gallery', 'aboutUs', 'contact', 'booking', 'guides'] as const;

/** Pages that belong to an intl section without being one (their routes sit under it): the two travel guides. */
export const intlSubsections: Partial<Record<Section, (typeof intlSections)[number]>> = { guideFirstTime: 'guides', guideTransfer: 'guides' };

/** The intl section a section's page belongs to (itself, or its parent for the travel guides); null when none. */
export const intlSectionOf = (section: Section): (typeof intlSections)[number] | null =>
  (intlSections as readonly string[]).includes(section) ? (section as (typeof intlSections)[number]) : (intlSubsections[section] ?? null);

/**
 * en/vi: the section in that language. An intl locale has no route for the other sections (legal, booking terms,
 * brand facts, eco), so its links to them go to English.
 */
export function sectionPath(locale: Locale, section: Section): string {
  const target = isLegacyLocale(locale) || intlSectionOf(section) ? locale : defaultLocale;
  return `${prefix(target)}/${segmentIn(section, target)}`;
}

export function detailPath(locale: Locale, section: 'cruise' | 'cabin', slug: string, id: number): string {
  return `${sectionPath(locale, section)}/${slug}-${id}.html`;
}

export function itineraryPath(locale: Locale, slug: string, cruiseId: number, itineraryId: number): string {
  return `${sectionPath(locale, 'itinerary')}/${slug}-${cruiseId}-${itineraryId}.html`;
}

/** Destination detail: /destinations/{slug}, /vi/dia-diem-tham-quan/{slug} (slugs are set by editors per language). */
export function destinationPath(locale: Locale, slug: string): string {
  return `${sectionPath(locale, 'destinations')}/${slug}`;
}

export function experiencePath(locale: Locale, slug: string, id: number): string {
  return `${sectionPath(locale, 'experiences')}/${slug}-${id}.html`;
}

/**
 * Paths served by this Next.js app. Everything else is still served by Laravel (Nginx decides),
 * so links to it must be plain <a> elements: next/link would try a client-side navigation to a
 * route this app doesn't have. Extend this list as pages are migrated.
 */
const MIGRATED = [
  /^\/(vi\/?)?$/,
  // Intl locales (phase 1D-b): generated route trees under /{code} (app/(ja)/ja).
  /^\/ja(\/|$)/,
  /^\/cabin\//,
  /^\/vi\/phong-nghi\//,
  /^\/contact$/,
  /^\/vi\/lien-he$/,
  /^\/itinerary(\/|$)/,
  /^\/vi\/hanh-trinh(\/|$)/,
  /^\/cruise\//,
  /^\/vi\/du-thuyen\//,
  /^\/booking(\/pay)?$/,
  /^\/vi\/booking(\/pay)?$/,
  /^\/(legal|safety-policies|terms-and-conditions|privacy-policy|payment-methods|cookie-policy|booking-terms-and-conditions)$/,
  /^\/vi\/(phap-ly|chinh-sach-an-toan|dieu-khoan-dieu-kien|chinh-sach-bao-mat|phuong-thuc-thanh-toan|chinh-sach-cookie|dieu-khoan-dat-tour)$/,
  /^\/(services|about-us|eco-dashboard)$/,
  /^\/vi\/(dich-vu|gioi-thieu|bao-cao-sinh-thai)$/,
  /^\/experiences(\/|$)/,
  /^\/vi\/hoat-dong-trai-nghiem(\/|$)/,
  /^\/(gallery|faq)(\/|$)/,
  /^\/vi\/(thu-vien|cau-hoi-thuong-gap)(\/|$)/,
  /^\/blog(\/|$)/,
  /^\/vi\/blog(\/|$)/,
  /^\/(destinations|guides)(\/|$)/,
  /^\/vi\/(dia-diem-tham-quan|cam-nang)(\/|$)/,
];

export function isMigratedPath(href: string): boolean {
  if (!href.startsWith('/')) return false;
  const path = href.split(/[?#]/)[0];
  return MIGRATED.some((re) => re.test(path));
}

/** Parses "imperial-suite-24.html" -> { slug: "imperial-suite", id: 24 }. */
export function parseDetailFile(file: string): { slug: string; id: number } | null {
  const match = /^(.+)-(\d+)\.html$/.exec(file);
  if (!match) return null;
  return { slug: match[1], id: Number(match[2]) };
}
