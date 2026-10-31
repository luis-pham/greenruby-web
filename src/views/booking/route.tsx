import type { Metadata } from 'next';
import type { OpenAlternates } from '@/lib/api/contract';
import { getPageSeo, getSite } from '@/lib/api/content';
import { defaultLocale, isLegacyLocale, legacyLocales, locales, sectionPath, type Locale } from '@/lib/i18n';
import { localeOpen } from '@/lib/intl';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { BookingView } from './BookingView';
import { PayView } from './PayView';

/**
 * Language-switcher set of the booking pages (phase 2B): EN, VI and every intl locale whose booking section is open
 * (lib/intl.ts: built, effectively public, served by every instance). undefined while none is, so the EN/VI pages
 * render exactly as before; an intl page then shows only the English booking page. Switcher only: the pages are
 * noindex (no hreflang) and never in a sitemap. The wizard carries the selection across (handoff.ts).
 */
async function bookingAlternates(locale: Locale, suffix: string): Promise<OpenAlternates | undefined> {
  const open: Locale[] = [];
  for (const code of locales) if (!isLegacyLocale(code) && (await localeOpen(code, 'booking'))) open.push(code);
  if (open.length === 0) {
    return isLegacyLocale(locale) ? undefined : { entries: [{ lang: defaultLocale, path: `${sectionPath(defaultLocale, 'booking')}${suffix}` }], xDefault: null };
  }
  const entries = [...legacyLocales, ...open].map((lang) => ({ lang, path: `${sectionPath(lang, 'booking')}${suffix}` }));
  return { entries, xDefault: `${sectionPath(defaultLocale, 'booking')}${suffix}` };
}

/** Builds the page exports for one language; app/(en)/booking, app/(vi)/vi/booking and app/(ja)/ja/booking re-export them. */
export function bookingRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const [site, seo] = await Promise.all([getSite(locale), getPageSeo('booking', locale)]);
    const t = getMessages(locale).booking;
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: seo.title || t.metaTitle,
      description: seo.description || t.metaDescription,
      path: sectionPath(locale, 'booking'),
      alternatePath: sectionPath(other, 'booking'),
      noIndex: true,
    });
  }

  async function Page() {
    const [site, alternates] = await Promise.all([getSite(locale), bookingAlternates(locale, '')]);
    return <BookingView chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other, 'booking'), alternates }} />;
  }

  return { generateMetadata, Page };
}

/** /booking/pay, /vi/booking/pay and /ja/booking/pay: personal payment links, never indexed. */
export function payRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const site = await getSite(locale);
    const t = getMessages(locale).booking;
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: t.pay.metaTitle,
      description: t.pay.heroIntro,
      path: `${sectionPath(locale, 'booking')}/pay`,
      alternatePath: `${sectionPath(other, 'booking')}/pay`,
      noIndex: true,
    });
  }

  async function Page() {
    const [site, alternates] = await Promise.all([getSite(locale), bookingAlternates(locale, '/pay')]);
    return <PayView chrome={{ locale, site, t: getMessages(locale), alternateHref: `${sectionPath(other, 'booking')}/pay`, alternates }} />;
  }

  return { generateMetadata, Page };
}
