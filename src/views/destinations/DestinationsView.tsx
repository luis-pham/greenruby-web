import { PageIntro, SiteFooter, type Chrome } from '@/components/layout';
import { JsonLd } from '@/components/seo/JsonLd';
import { SmartLink, TextLink } from '@/components/ui';
import type { ItinerarySummary } from '@/lib/api/schemas';
import { guideLinks } from '@/lib/guide-links';
import { destinationPath, homePath, itineraryPath, sectionPath } from '@/lib/i18n';
import { absoluteImageUrl, absoluteUrl } from '@/lib/site-url';
import { bays, categories, type DestinationSummary } from './data';
import { DestinationFilter, type CardItem } from './DestinationFilter';
import { DestinationMap } from './DestinationMap';
import { destinationMessages } from './messages';
import s from './destinations.module.css';

/** /destinations: directory of Ha Long Bay and Lan Ha Bay destinations with filters, map and itinerary links. */
export function DestinationsView({ chrome, items, itineraries }: { chrome: Chrome; items: DestinationSummary[]; itineraries: ItinerarySummary[] }) {
  const { locale, t } = chrome;
  const m = destinationMessages[locale];
  const path = sectionPath(locale, 'destinations');
  const guides = guideLinks(locale);

  const cards: CardItem[] = items.map((d) => ({
    slug: d.slug,
    href: destinationPath(locale, d.slug),
    name: d.name,
    summary: d.summary,
    bay: d.bay,
    bayLabel: m.bays[d.bay],
    category: d.category,
    categoryLabel: m.category[d.category],
    image: d.image ? { src: d.image.src, alt: d.image.alt } : null,
    isGreenRubyStop: d.isGreenRubyStop,
  }));
  const points = items.flatMap((d) => (d.coordinates ? [{ ...d.coordinates, name: d.name, href: destinationPath(locale, d.slug), bay: d.bay }] : []));
  const sortedItineraries = [...itineraries].sort((a, b) => (a.bay ?? '').localeCompare(b.bay ?? '') || a.duration - b.duration);
  // Destinations linked to each itinerary in the CMS (admin: Điểm đến → "Hành trình Green Ruby ghé").
  const stopsOf = (itineraryId: number) => items.filter((d) => d.itineraryIds.includes(itineraryId));

  return (
    <>
      <PageIntro
        chrome={chrome}
        currentHref={path}
        crumbs={[
          { label: t.breadcrumb.home, href: homePath(locale) },
          { label: m.breadcrumb, href: path },
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
        <section className={s.bays} aria-label={m.compareBays}>
          <div className="container">
            <div className={s.bayGrid}>
              {bays.map((bay) => (
                <div key={bay} className={s.bayCard}>
                  <span className={s.label}>{m.places(items.filter((d) => d.bay === bay).length)}</span>
                  <h2>{m.bays[bay]}</h2>
                  <p>{m.bayIntro[bay]}</p>
                </div>
              ))}
              <div className={s.bayCompare}>
                <TextLink href={guides.bayComparison}>{m.compareBays}</TextLink>
              </div>
            </div>
          </div>
        </section>

        <section className={s.section} aria-labelledby="directory">
          <div className="container">
            <h2 id="directory" className="sr-only">{m.breadcrumb}</h2>
            <DestinationFilter
              items={cards}
              bays={bays.map((key) => ({ key, label: m.bays[key] }))}
              categories={categories.map((key) => ({ key, label: m.categories[key] }))}
              labels={{
                label: m.filter.label,
                search: m.filter.search,
                searchPlaceholder: m.filter.searchPlaceholder,
                bay: m.filter.bay,
                category: m.filter.category,
                all: m.filter.all,
                results: m.filter.results(2).replace('2', '{n}'),
                resultsOne: m.filter.results(1),
                empty: m.filter.empty,
                reset: m.filter.reset,
                stop: m.stop,
                regional: m.regional,
                readMore: m.readMore,
              }}
            />
            <p className={s.note}>{m.stopNote}</p>
          </div>
        </section>

        {points.length > 0 && (
          <section className={s.section} aria-labelledby="map-title">
            <div className="container">
              <div className={s.sectionHead}>
                <h2 id="map-title">{m.map.title}</h2>
                <p>{m.map.lede}</p>
              </div>
              <DestinationMap points={points} title={m.map.title} attribution={m.map.attribution} listLabel={m.map.listLabel} />
            </div>
          </section>
        )}

        {sortedItineraries.length > 0 && (
          <section className={`${s.section} ${s.sectionTinted}`} aria-labelledby="routes-title">
            <div className="container">
              <div className={s.sectionHead}>
                <h2 id="routes-title">{m.itineraries.title}</h2>
                <p>{m.itineraries.lede}</p>
              </div>
              <div className={s.routes}>
                {sortedItineraries.filter((it) => stopsOf(it.itineraryId).length > 0).map((it) => (
                  <article key={it.itineraryId} className={s.route}>
                    <span className={s.label}>
                      {it.cruiseName} · {it.bay ? m.bays[it.bay as keyof typeof m.bays] : ''} · {m.itineraries.days(it.duration)}
                    </span>
                    <h3>{it.name}</h3>
                    <ul>
                      {stopsOf(it.itineraryId).map((d) => (
                        <li key={d.slug}>
                          <SmartLink href={destinationPath(locale, d.slug)}>{d.name}</SmartLink>
                        </li>
                      ))}
                    </ul>
                    <TextLink href={itineraryPath(locale, it.slug, it.cruiseId, it.itineraryId)}>{m.itineraries.view}</TextLink>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className={s.section} aria-labelledby="plan-title">
          <div className="container">
            <div className={s.sectionHead}>
              <h2 id="plan-title">{m.plan.title}</h2>
            </div>
            <dl className={s.planGrid}>
              {m.plan.items.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className={`${s.section} ${s.guides}`} aria-labelledby="guides-title">
          <div className="container">
            <h2 id="guides-title">{m.guides.title}</h2>
            <ul className={s.guideList}>
              {(
                [
                  [guides.firstTime, m.guides.firstTime],
                  [guides.transfer, m.guides.transfer],
                  [guides.bestTime, m.guides.bestTime],
                ] as const
              ).map(([href, [title, body]]) => (
                <li key={href}>
                  <SmartLink href={href}>
                    <strong>{title}</strong>
                    <span>{body}</span>
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
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
            itemListElement: items.map((d, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: absoluteUrl(destinationPath(locale, d.slug)),
              name: d.name,
              ...(d.image && { image: absoluteImageUrl(d.image.src, 1200) }),
            })),
          },
        }}
      />
      <SiteFooter locale={locale} site={chrome.site} t={t} />
    </>
  );
}
