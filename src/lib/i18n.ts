export const locales = ['en', 'vi'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// English URLs have no prefix; Vietnamese URLs use /vi plus translated segments,
// matching Laravel's FeUtils::getLocalizedFrontendPathSegmentMap().
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
  booking: { en: 'booking', vi: 'booking' },
  privacyPolicy: { en: 'privacy-policy', vi: 'chinh-sach-bao-mat' },
  legal: { en: 'legal', vi: 'phap-ly' },
  safetyPolicies: { en: 'safety-policies', vi: 'chinh-sach-an-toan' },
  termsAndConditions: { en: 'terms-and-conditions', vi: 'dieu-khoan-dieu-kien' },
  paymentMethods: { en: 'payment-methods', vi: 'phuong-thuc-thanh-toan' },
  cookiePolicy: { en: 'cookie-policy', vi: 'chinh-sach-cookie' },
  ecoDashboard: { en: 'eco-dashboard', vi: 'bao-cao-sinh-thai' },
  brandFacts: { en: 'about-us/brand-facts', vi: 'gioi-thieu/thong-tin-thuong-hieu' },
  // Halong cruise guide (Next.js only; Laravel's SitemapController mirrors these paths).
  destinations: { en: 'destinations', vi: 'dia-diem-tham-quan' },
  guideFirstTime: { en: 'guides/first-time-halong-bay-cruise', vi: 'cam-nang/lan-dau-di-du-thuyen-ha-long' },
  guideTransfer: { en: 'guides/hanoi-to-halong-bay', vi: 'cam-nang/ha-noi-di-ha-long' },
} as const;

export type Section = keyof typeof segments;

const prefix = (locale: Locale) => (locale === defaultLocale ? '' : `/${locale}`);

export function homePath(locale: Locale): string {
  return prefix(locale) || '/';
}

export function sectionPath(locale: Locale, section: Section): string {
  return `${prefix(locale)}/${segments[section][locale]}`;
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
  /^\/cabin\//,
  /^\/vi\/phong-nghi\//,
  /^\/contact$/,
  /^\/vi\/lien-he$/,
  /^\/itinerary(\/|$)/,
  /^\/vi\/hanh-trinh(\/|$)/,
  /^\/cruise\//,
  /^\/vi\/du-thuyen\//,
  /^\/booking$/,
  /^\/vi\/booking$/,
  /^\/(legal|safety-policies|terms-and-conditions|privacy-policy|payment-methods|cookie-policy)$/,
  /^\/vi\/(phap-ly|chinh-sach-an-toan|dieu-khoan-dieu-kien|chinh-sach-bao-mat|phuong-thuc-thanh-toan|chinh-sach-cookie)$/,
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
