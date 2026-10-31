// Compiled locales (phase 1D-b). en/vi are the legacy site (unprefixed EN, /vi + Vietnamese segments). ja is an
// 'intl' locale: /ja + the English segments (docs/i18n-audit/12 §7). Compiling a locale does not make it public:
// the CMS serves it only once it is effectively public and every web instance lists it in its manifest.
export const locales = ['en', 'vi', 'ja'] as const;
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
};

const intlTagOf = (locale: string): string | undefined => (localeInfo as Partial<Record<string, { intlTag: string }>>)[locale]?.intlTag;

/** Intl tag for dates: English (and anything unknown) keeps en-GB day-month-year, as before; others use their own. */
export const dateFormatTag = (locale: string): string => (locale === 'en' ? 'en-GB' : (intlTagOf(locale) ?? 'en-GB'));

/** Intl tag for amounts: en-US for English (and anything unknown), vi-VN for Vietnamese, as before; others their own. */
export const numberFormatTag = (locale: string): string => intlTagOf(locale) ?? 'en-US';

// English URLs have no prefix; Vietnamese URLs use /vi plus translated segments, matching Laravel's
// FeUtils::getLocalizedFrontendPathSegmentMap(); intl locales use /{code} plus the English segments (PathBuilder).
const segments = {
  cruise: { en: 'cruise', vi: 'du-thuyen', ja: 'cruise' },
  cabin: { en: 'cabin', vi: 'phong-nghi', ja: 'cabin' },
  itinerary: { en: 'itinerary', vi: 'hanh-trinh', ja: 'itinerary' },
  experiences: { en: 'experiences', vi: 'hoat-dong-trai-nghiem', ja: 'experiences' },
  services: { en: 'services', vi: 'dich-vu', ja: 'services' },
  gallery: { en: 'gallery', vi: 'thu-vien', ja: 'gallery' },
  contact: { en: 'contact', vi: 'lien-he', ja: 'contact' },
  aboutUs: { en: 'about-us', vi: 'gioi-thieu', ja: 'about-us' },
  faq: { en: 'faq', vi: 'cau-hoi-thuong-gap', ja: 'faq' },
  blog: { en: 'blog', vi: 'blog', ja: 'blog' },
  // Company news: articles of the CMS category of the same slug (news / tin-tuc), kept out of /blog.
  news: { en: 'news', vi: 'tin-tuc', ja: 'news' },
  booking: { en: 'booking', vi: 'booking', ja: 'booking' },
  privacyPolicy: { en: 'privacy-policy', vi: 'chinh-sach-bao-mat', ja: 'privacy-policy' },
  legal: { en: 'legal', vi: 'phap-ly', ja: 'legal' },
  safetyPolicies: { en: 'safety-policies', vi: 'chinh-sach-an-toan', ja: 'safety-policies' },
  termsAndConditions: { en: 'terms-and-conditions', vi: 'dieu-khoan-dieu-kien', ja: 'terms-and-conditions' },
  paymentMethods: { en: 'payment-methods', vi: 'phuong-thuc-thanh-toan', ja: 'payment-methods' },
  cookiePolicy: { en: 'cookie-policy', vi: 'chinh-sach-cookie', ja: 'cookie-policy' },
  bookingTerms: { en: 'booking-terms-and-conditions', vi: 'dieu-khoan-dat-tour', ja: 'booking-terms-and-conditions' },
  ecoDashboard: { en: 'eco-dashboard', vi: 'bao-cao-sinh-thai', ja: 'eco-dashboard' },
  brandFacts: { en: 'about-us/brand-facts', vi: 'gioi-thieu/thong-tin-thuong-hieu', ja: 'about-us/brand-facts' },
  // Travel guide (Next.js only; Laravel's SitemapController mirrors these paths). `guides` is the hub.
  guides: { en: 'guides', vi: 'cam-nang', ja: 'guides' },
  destinations: { en: 'destinations', vi: 'dia-diem-tham-quan', ja: 'destinations' },
  guideFirstTime: { en: 'guides/first-time-halong-bay-cruise', vi: 'cam-nang/lan-dau-di-du-thuyen-ha-long', ja: 'guides/first-time-halong-bay-cruise' },
  guideTransfer: { en: 'guides/hanoi-to-halong-bay', vi: 'cam-nang/ha-noi-di-ha-long', ja: 'guides/hanoi-to-halong-bay' },
} as const;

export type Section = keyof typeof segments;

/** Every section name (PathBuilder::SEGMENTS). Which of them a locale really serves comes from its route tree (intl-routes.ts). */
export const sections = Object.keys(segments) as Section[];

/** The section whose single-segment path is `segment` in `locale` ('du-thuyen', vi → cruise); null when none. */
export function segmentOf(segment: string, locale: Locale): Section | null {
  return sections.find((section) => segments[section][locale] === segment) ?? null;
}

const prefix = (locale: Locale) => (locale === defaultLocale ? '' : `/${locale}`);

export function homePath(locale: Locale): string {
  return prefix(locale) || '/';
}

/**
 * Sections an intl locale has (its generated route tree, intl-routes.ts): content the CMS publishes per row,
 * (phase 1E-c) the static pages whose CMS page row is their publication (services, gallery, about us, contact), and
 * (phase 2B) the booking wizard and payment-link page (/ja/booking, /ja/booking/pay: noindex, never in a sitemap; the
 * locale books the English inventory in USD, CMS booking.price_list_for_locale).
 */
export const intlSections = ['home', 'cruise', 'cabin', 'itinerary', 'experiences', 'destinations', 'blog', 'news', 'faq', 'services', 'gallery', 'aboutUs', 'contact', 'booking'] as const;

/**
 * en/vi: the section in that language. An intl locale has no route for the other sections (legal, booking terms,
 * guides, brand facts, eco), so its links to them go to English.
 */
export function sectionPath(locale: Locale, section: Section): string {
  const target = isLegacyLocale(locale) || (intlSections as readonly string[]).includes(section) ? locale : defaultLocale;
  return `${prefix(target)}/${segments[section][target]}`;
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
