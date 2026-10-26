import type { Metadata } from 'next';
import { getPageSeo, getSite } from '@/lib/api/content';
import { sectionPath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { BookingView } from './BookingView';
import { PayView } from './PayView';

/** Builds the page exports for one language; app/(en)/booking and app/(vi)/vi/booking re-export them. */
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
    const site = await getSite(locale);
    return <BookingView chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other, 'booking') }} />;
  }

  return { generateMetadata, Page };
}

/** /booking/pay and /vi/booking/pay: personal payment links, never indexed. */
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
    const site = await getSite(locale);
    return <PayView chrome={{ locale, site, t: getMessages(locale), alternateHref: `${sectionPath(other, 'booking')}/pay` }} />;
  }

  return { generateMetadata, Page };
}
