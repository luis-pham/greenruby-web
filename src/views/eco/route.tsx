import type { Metadata } from 'next';
import { getHomepage, getPageSeo, getSite } from '@/lib/api/content';
import { sectionPath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { ECO_HERO_FALLBACK, EcoDashboardView } from './EcoDashboardView';
import { ecoMessages } from './messages';

/** Same photograph as the homepage hero (first CMS homepage banner). */
async function heroImage(locale: Locale): Promise<string> {
  const home = await getHomepage(locale);
  return home.banner[0]?.image ?? ECO_HERO_FALLBACK;
}

export function ecoDashboardRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const [site, image, seo] = await Promise.all([getSite(locale), heroImage(locale), getPageSeo('eco-dashboard', locale)]);
    const m = ecoMessages[locale];
    return pageMetadata({
      locale,
      site: siteInfo(site),
      // Admin "Quản lý cấu hình trang → Báo cáo sinh thái"; messages until the CMS has a value.
      title: seo.title || m.metaTitle,
      description: seo.description || m.metaDescription,
      path: sectionPath(locale, 'ecoDashboard'),
      alternatePath: sectionPath(other, 'ecoDashboard'),
      image,
    });
  }

  async function Page() {
    const [site, image] = await Promise.all([getSite(locale), heroImage(locale)]);
    return <EcoDashboardView heroImage={image} chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other, 'ecoDashboard') }} />;
  }

  return { generateMetadata, Page };
}
