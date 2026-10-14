import type { Metadata } from 'next';
import { getHomepage, getSite } from '@/lib/api/content';
import { sectionPath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { AboutView } from './AboutView';
import { getAboutPage, listFleet } from './data';
import { aboutMessages } from './messages';

export function aboutRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const [site, data] = await Promise.all([getSite(locale), getAboutPage(locale)]);
    const m = aboutMessages[locale];
    return pageMetadata({
      locale,
      site: siteInfo(site),
      title: data.seo.title ?? m.metaTitle,
      description: data.seo.description ?? m.metaDescription,
      path: sectionPath(locale, 'aboutUs'),
      alternatePath: sectionPath(other, 'aboutUs'),
      image: data.config.banner?.[0]?.src,
      noIndex: data.noIndex,
    });
  }

  async function Page() {
    const [site, data, fleet, homepage] = await Promise.all([getSite(locale), getAboutPage(locale), listFleet(locale), getHomepage(locale)]);
    return (
      <AboutView
        data={data}
        fleet={fleet}
        // The homepage "awards" are the CMS's vetted credential list (Green Globe in progress, solar-assisted, seawater cooling).
        credentials={homepage.awards.filter((a) => a.title)}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other, 'aboutUs') }}
      />
    );
  }

  return { generateMetadata, Page };
}
