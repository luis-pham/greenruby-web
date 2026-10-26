import type { Metadata } from 'next';
import { getSite } from '@/lib/api/content';
import { sectionPath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { bookingTerms, bookingTermsLinked } from './booking-terms';
import { BookingTermsView } from './BookingTermsView';
import { cookiePolicy } from './cookie-policy';
import { CookiePolicyView } from './CookiePolicyView';
import { getLegal, type LegalPageKey } from './data';
import { LegalHubView } from './LegalHubView';
import { LegalPageView } from './LegalPageView';

// All legal URLs (and /cookie-policy) are noindex, follow, as on the Blade site (FeUtils::applyNoIndexFollowMeta).

export function legalHubRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const [site, legal] = await Promise.all([getSite(locale), getLegal(locale)]);
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: legal.seo.title ?? legal.title,
      description: legal.seo.description ?? undefined,
      path: sectionPath(locale, 'legal'),
      alternatePath: sectionPath(other, 'legal'),
      noIndex: true,
    });
  }

  async function Page() {
    const [site, legal] = await Promise.all([getSite(locale), getLegal(locale)]);
    return <LegalHubView legal={legal} chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other, 'legal') }} />;
  }

  return { generateMetadata, Page };
}

export function legalPageRoute(locale: Locale, page: LegalPageKey) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const [site, legal] = await Promise.all([getSite(locale), getLegal(locale)]);
    const data = legal.pages[page];
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: data.seo.title ?? data.title,
      description: data.seo.description ?? undefined,
      path: sectionPath(locale, page),
      alternatePath: sectionPath(other, page),
      noIndex: true,
    });
  }

  async function Page() {
    const [site, legal] = await Promise.all([getSite(locale), getLegal(locale)]);
    return (
      <LegalPageView
        page={page}
        legal={legal}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other, page) }}
      />
    );
  }

  return { generateMetadata, Page };
}

export function cookiePolicyRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const site = await getSite(locale);
    const copy = cookiePolicy[locale];
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: copy.title,
      description: copy.seoDescription,
      path: sectionPath(locale, 'cookiePolicy'),
      alternatePath: sectionPath(other, 'cookiePolicy'),
      noIndex: true,
    });
  }

  async function Page() {
    const [site, legal] = await Promise.all([getSite(locale), getLegal(locale)]);
    return (
      <CookiePolicyView
        legal={legal}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other, 'cookiePolicy') }}
      />
    );
  }

  return { generateMetadata, Page };
}

export function bookingTermsRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const site = await getSite(locale);
    const copy = bookingTerms[locale];
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: copy.seoTitle,
      description: copy.seoDescription,
      path: sectionPath(locale, 'bookingTerms'),
      alternatePath: sectionPath(other, 'bookingTerms'),
      // Indexable only once TPX approves the terms; until then the draft stays out of search (and the sitemap).
      noIndex: !bookingTermsLinked(),
    });
  }

  async function Page() {
    const [site, legal] = await Promise.all([getSite(locale), getLegal(locale)]);
    return (
      <BookingTermsView
        legal={legal}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other, 'bookingTerms') }}
      />
    );
  }

  return { generateMetadata, Page };
}
