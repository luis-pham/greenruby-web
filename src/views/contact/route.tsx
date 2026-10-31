import type { Metadata } from 'next';
import { withPreviewBanner } from '@/components/layout/PreviewBanner';
import { getPageSeo } from '@/lib/api/content';
import { sectionPath, type Locale } from '@/lib/i18n';
import { hubAlternates } from '@/lib/intl-hubs';
import { getSiteFor, isPreview, previewMetadata } from '@/lib/preview-loaders';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { ContactView } from './ContactView';

export function contactRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const [site, seo, alternates] = await Promise.all([getSiteFor(locale), getPageSeo('contact', locale), hubAlternates('contact')]);
    const t = getMessages(locale).contact;
    return previewMetadata(pageMetadata({
      locale,
      site: siteInfo(site),
      title: seo.title || t.metaTitle,
      description: seo.description || t.metaDescription,
      path: sectionPath(locale, 'contact'),
      alternatePath: sectionPath(other, 'contact'),
      alternates,
    }));
  }

  async function Page() {
    const [site, alternates] = await Promise.all([getSiteFor(locale), hubAlternates('contact')]);
    return withPreviewBanner(await isPreview(), <ContactView chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other, 'contact'), alternates }} />);
  }

  return { generateMetadata, Page };
}
