import { PageIntro, SiteFooter, type Chrome } from '@/components/layout';
import { GuideCards, LinkChips, TravelLinksSection, type GuideCard } from '@/components/sections/TravelLinks';
import { JsonLd } from '@/components/seo/JsonLd';
import { TextLink } from '@/components/ui';
import { guideLinks } from '@/lib/guide-links';
import { destinationPath, detailPath, homePath, sectionPath } from '@/lib/i18n';
import { absoluteUrl } from '@/lib/site-url';
import { bays, type DestinationSummary } from '@/views/destinations/data';
import { destinationMessages } from '@/views/destinations/messages';
import { hubMessages } from './hub-messages';
import s from './guide.module.css';

export type HubCruise = { id: number; slug: string; name: string; bay: 'ha-long' | 'lan-ha' | null };
export type HubArticle = { href: string; title: string; category: string | null };

/**
 * /guides, /vi/cam-nang: the travel guide hub. Navigation only: titles and one-line descriptions that lead to
 * the pages owning each topic, built from what is published (CMS destinations and articles, code guides).
 */
export function HubView({
  chrome,
  places,
  cruises,
  articles,
}: {
  chrome: Chrome;
  places: DestinationSummary[];
  cruises: HubCruise[];
  articles: HubArticle[];
}) {
  const { locale, t, site } = chrome;
  const m = hubMessages[locale];
  const dm = destinationMessages[locale];
  const path = sectionPath(locale, 'guides');
  const g = guideLinks(locale, site.hiddenPages);
  const f = t.footer.links;
  const bodies = t.travel.guideBodies;

  const plan: GuideCard[] = [
    ...(g.firstTime ? [{ href: g.firstTime, title: f.firstTimeGuide, body: bodies.firstTimeGuide }] : []),
    ...(g.transfer ? [{ href: g.transfer, title: f.transferGuide, body: bodies.transferGuide }] : []),
    { href: g.bestTime, title: f.bestTime, body: bodies.bestTime },
    { href: g.bayComparison, title: f.bayComparison, body: bodies.bayComparison },
  ];
  const cruiseCards: GuideCard[] = [
    { href: sectionPath(locale, 'itinerary'), title: m.cruises.itineraries[0], body: m.cruises.itineraries[1] },
    ...cruises.map((c) => ({ href: detailPath(locale, 'cruise', c.slug, c.id), title: c.name, body: c.bay ? m.cruises.ship(dm.bays[c.bay]) : null })),
    { href: g.luxuryPillar, title: m.cruises.luxury[0], body: m.cruises.luxury[1] },
  ];
  // Journal articles not already shown above.
  const shown = new Set([...plan, ...cruiseCards].map((c) => c.href));
  const journal = articles.filter((a) => !shown.has(a.href)).slice(0, 6);
  const placesByBay = bays.map((bay) => ({ bay, items: places.filter((d) => d.bay === bay) })).filter((b) => b.items.length > 0);

  const linked = [
    ...plan,
    ...(g.destinations ? [{ href: g.destinations, title: f.destinations }] : []),
    ...places.map((d) => ({ href: destinationPath(locale, d.slug), title: d.name })),
    ...cruiseCards,
    ...journal.map((a) => ({ href: a.href, title: a.title })),
  ];

  return (
    <>
      <PageIntro
        chrome={chrome}
        currentHref={path}
        crumbs={[
          { label: t.breadcrumb.home, href: homePath(locale) },
          { label: t.nav.travelGuide, href: path },
        ]}
        eyebrow={m.eyebrow}
        title={
          <>
            {m.title} <em>{m.titleEm}</em>
          </>
        }
        lead={m.lead}
      />

      <main>
        <TravelLinksSection id="plan" title={m.plan.title} lede={m.plan.lede}>
          <GuideCards items={plan} />
        </TravelLinksSection>

        {g.destinations && (
          <TravelLinksSection id="places" tinted title={m.places.title} lede={m.places.lede} more={{ href: g.destinations, label: m.places.hub }}>
            {placesByBay.map(({ bay, items }) => (
              <div key={bay} className={s.hubGroup}>
                <h3>{dm.bays[bay]}</h3>
                <LinkChips items={items.map((d) => ({ href: destinationPath(locale, d.slug), label: d.name }))} />
              </div>
            ))}
          </TravelLinksSection>
        )}

        <TravelLinksSection id="cruises" title={m.cruises.title} lede={m.cruises.lede}>
          <GuideCards items={cruiseCards} />
        </TravelLinksSection>

        {journal.length > 0 && (
          <TravelLinksSection id="journal" tinted title={m.journal.title} lede={m.journal.lede} more={{ href: g.journal, label: m.journal.all }}>
            <GuideCards items={journal.map((a) => ({ href: a.href, title: a.title, body: a.category }))} />
          </TravelLinksSection>
        )}
        {journal.length === 0 && (
          <p className={`container ${s.hubJournal}`}>
            <TextLink href={g.journal}>{m.journal.all}</TextLink>
          </p>
        )}
      </main>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${m.title} ${m.titleEm}`,
          description: m.metaDescription,
          url: absoluteUrl(path),
          inLanguage: locale,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: linked.map((l, i) => ({ '@type': 'ListItem', position: i + 1, name: l.title, url: absoluteUrl(l.href) })),
          },
        }}
      />
      <SiteFooter locale={locale} site={site} t={t} />
    </>
  );
}
