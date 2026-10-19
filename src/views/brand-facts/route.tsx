import type { Metadata } from 'next';
import { getHomepage, getSite } from '@/lib/api/content';
import { sectionPath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { BrandFactsView } from './BrandFactsView';
import { brandFactsMessages } from './messages';

export function brandFactsRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const [site, home] = await Promise.all([getSite(locale), getHomepage(locale)]);
    const m = brandFactsMessages[locale];
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: m.metaTitle,
      description: m.metaDescription,
      path: sectionPath(locale, 'brandFacts'),
      alternatePath: sectionPath(other, 'brandFacts'),
      image: home.cruises[0]?.cover ?? home.cruises[0]?.image ?? home.banner[0]?.image ?? null,
    });
  }

  async function Page() {
    const [site, home] = await Promise.all([getSite(locale), getHomepage(locale)]);
    return <BrandFactsView home={home} chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other, 'brandFacts') }} />;
  }

  return { generateMetadata, Page };
}
