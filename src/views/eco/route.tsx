import type { Metadata } from 'next';
import { getSite } from '@/lib/api/content';
import { sectionPath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { ECO_HERO_IMAGE, EcoDashboardView } from './EcoDashboardView';
import { ecoMessages } from './messages';

export function ecoDashboardRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const site = await getSite(locale);
    const m = ecoMessages[locale];
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: m.metaTitle,
      description: m.metaDescription,
      path: sectionPath(locale, 'ecoDashboard'),
      alternatePath: sectionPath(other, 'ecoDashboard'),
      image: ECO_HERO_IMAGE,
    });
  }

  async function Page() {
    const site = await getSite(locale);
    return <EcoDashboardView chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other, 'ecoDashboard') }} />;
  }

  return { generateMetadata, Page };
}
