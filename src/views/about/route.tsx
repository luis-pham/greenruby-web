import type { Metadata } from 'next';
import { withPreviewBanner } from '@/components/layout/PreviewBanner';
import { sectionPath, type Locale } from '@/lib/i18n';
import { hubAlternates } from '@/lib/intl-hubs';
import { getAboutPageFor, getHomepageIfVisible, getSiteFor, isPreview, previewMetadata } from '@/lib/preview-loaders';
import { pageMetadata } from '@/lib/seo';
import { siteInfo } from '@/lib/site-info';
import { getMessages } from '@/messages';
import { AboutView } from './AboutView';
import { listFleet } from './data';
import { aboutMessages } from './messages';

export function aboutRoute(locale: Locale) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';

  async function generateMetadata(): Promise<Metadata> {
    const [site, data, alternates] = await Promise.all([getSiteFor(locale), getAboutPageFor(locale), hubAlternates('aboutUs')]);
    const m = aboutMessages[locale];
    return previewMetadata(pageMetadata({
      locale,
      site: siteInfo(site),
      title: data.seo.title ?? m.metaTitle,
      description: data.seo.description ?? m.metaDescription,
      path: sectionPath(locale, 'aboutUs'),
      alternatePath: sectionPath(other, 'aboutUs'),
      alternates,
      image: data.config.banner?.[0]?.src,
      noIndex: data.noIndex,
    }));
  }

  async function Page() {
    const [site, data, fleet, homepage, alternates] = await Promise.all([
      getSiteFor(locale),
      getAboutPageFor(locale),
      listFleet(locale),
      getHomepageIfVisible(locale),
      hubAlternates('aboutUs'),
    ]);
    return withPreviewBanner(
      await isPreview(),
      <AboutView
        data={data}
        fleet={fleet}
        // The homepage "awards" are the CMS's vetted credential list (Green Globe in progress, solar-assisted, seawater cooling).
        credentials={homepage?.awards.filter((a) => a.title) ?? []}
        chrome={{ locale, site, t: getMessages(locale), alternateHref: sectionPath(other, 'aboutUs'), alternates }}
      />,
    );
  }

  return { generateMetadata, Page };
}
