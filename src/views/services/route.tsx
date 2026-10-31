import type { Metadata } from 'next';
import { withPreviewBanner } from '@/components/layout/PreviewBanner';
import { listCabins } from '@/lib/api/content';
import { sectionPath, type Locale } from '@/lib/i18n';
import { hubAlternates } from '@/lib/intl-hubs';
import { getServicesPageFor, getSiteFor, isPreview, previewMetadata } from '@/lib/preview-loaders';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { getServiceFaqs } from './data';
import { servicesMessages } from './messages';
import { ServicesView } from './ServicesView';

export function servicesRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const [site, data, alternates] = await Promise.all([getSiteFor(locale), getServicesPageFor(locale), hubAlternates('services')]);
    const m = servicesMessages[locale];
    return previewMetadata(pageMetadata({
      locale,
      site: siteInfo(site),
      title: data.seo.title ?? m.metaTitle,
      description: data.seo.description ?? m.metaDescription,
      path: sectionPath(locale, 'services'),
      alternatePath: sectionPath(other, 'services'),
      alternates,
      image: data.items[0]?.image ?? data.page.weddingFeaturedImage,
    }));
  }

  async function Page() {
    const [site, data, cmsFaqs, cabins, alternates] = await Promise.all([
      getSiteFor(locale),
      getServicesPageFor(locale),
      getServiceFaqs(locale),
      listCabins(locale),
      hubAlternates('services'),
    ]);
    return withPreviewBanner(
      await isPreview(),
      <ServicesView
        data={data}
        cmsFaqs={cmsFaqs}
        cabinIds={cabins.map((c) => c.id)}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other, 'services'), alternates }}
      />,
    );
  }

  return { generateMetadata, Page };
}
