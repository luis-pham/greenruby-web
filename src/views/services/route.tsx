import type { Metadata } from 'next';
import { getSite, listCabins } from '@/lib/api/content';
import { sectionPath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { getServiceFaqs, getServicesPage } from './data';
import { servicesMessages } from './messages';
import { ServicesView } from './ServicesView';

export function servicesRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const [site, data] = await Promise.all([getSite(locale), getServicesPage(locale)]);
    const m = servicesMessages[locale];
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: data.seo.title ?? m.metaTitle,
      description: data.seo.description ?? m.metaDescription,
      path: sectionPath(locale, 'services'),
      alternatePath: sectionPath(other, 'services'),
      image: data.items[0]?.image ?? data.page.weddingFeaturedImage,
    });
  }

  async function Page() {
    const [site, data, cmsFaqs, cabins] = await Promise.all([getSite(locale), getServicesPage(locale), getServiceFaqs(locale), listCabins(locale)]);
    return (
      <ServicesView
        data={data}
        cmsFaqs={cmsFaqs}
        cabinIds={cabins.map((c) => c.id)}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other, 'services') }}
      />
    );
  }

  return { generateMetadata, Page };
}
