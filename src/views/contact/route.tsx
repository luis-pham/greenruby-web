import type { Metadata } from 'next';
import { getSite } from '@/lib/api/content';
import { sectionPath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { ContactView } from './ContactView';

export function contactRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const site = await getSite(locale);
    const t = getMessages(locale).contact;
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: t.metaTitle,
      description: t.metaDescription,
      path: sectionPath(locale, 'contact'),
      alternatePath: sectionPath(other, 'contact'),
    });
  }

  async function Page() {
    const site = await getSite(locale);
    return <ContactView chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other, 'contact') }} />;
  }

  return { generateMetadata, Page };
}
