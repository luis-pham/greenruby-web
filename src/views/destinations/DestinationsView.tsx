import { PageIntro, SiteFooter, type Chrome } from '@/components/layout';
import { JsonLd } from '@/components/seo/JsonLd';
import { SmartLink, TextLink } from '@/components/ui';
import type { ItinerarySummary } from '@/lib/api/schemas';
import { guideLinks } from '@/lib/guide-links';
import { destinationPath, detailPath, homePath, itineraryPath, sectionPath } from '@/lib/i18n';
import { absoluteImageUrl, absoluteUrl } from '@/lib/site-url';
import { bays, categories, type DestinationSummary } from './data';
import { DestinationFilter, type CardItem } from './DestinationFilter';
import { DestinationMap } from './DestinationMap';
import { caveVisit, destinationMessages, otherPlaces } from './messages';
import s from './destinations.module.css';

type CruiseLink = { id: number; slug: string; name: string };

/**
 * /destinations: things to do in Ha Long Bay and Lan Ha Bay. Green Ruby stops (CMS destinations linked to an
 * itinerary) are kept apart from other places to explore, which are never presented as cruise stops.
 */
export function DestinationsView({ chrome, items, itineraries, cruises }: { chrome: Chrome; items: DestinationSummary[]; itineraries: ItinerarySummary[]; cruises: CruiseLink[] }) {
  const { locale, t } = chrome;
  const m = destinationMessages[locale];
  const path = sectionPath(locale, 'destinations');
  const guides = guideLinks(locale, chrome.site.hiddenPages);

  const toCard = (d: DestinationSummary): CardItem => ({
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
  });
  const stops = items.filter((d) => d.isGreenRubyStop);
  // CMS destinations without an itinerary, then the hub-only places that have no page of their own.
  const otherItems = items.filter((d) => !d.isGreenRubyStop);
  const extra = otherPlaces[locale];
  const points = items.flatMap((d) => (d.coordinates ? [{ ...d.coordinates, name: d.name, href: destinationPath(locale, d.slug), bay: d.bay }] : []));
  const sortedItineraries = [...itineraries].sort((a, b) => (a.bay ?? '').localeCompare(b.bay ?? '') || a.duration - b.duration);
  // Destinations linked to each itinerary in the CMS (admin: Điểm đến → "Hành trình Green Ruby ghé").
  const stopsOf = (itineraryId: number) => items.filter((d) => d.itineraryIds.includes(itineraryId));
  const itinerariesOf = (d: DestinationSummary) => sortedItineraries.filter((it) => d.itineraryIds.includes(it.itineraryId));
  const caves = items.filter((d) => d.category === 'cave');
  const groups = (['cave', 'island', 'village', 'lagoon'] as const).map((key) => ({ key, places: items.filter((d) => d.category === key) }));
  const filterLabels = {
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
  };

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

        <section className={s.section} aria-labelledby="todo-title">
          <div className="container">
            <div className={s.sectionHead}>
              <h2 id="todo-title">{m.thingsToDo.title}</h2>
              <p>{m.thingsToDo.lede}</p>
            </div>
            <div className={s.todoGrid}>
              {groups.map(({ key, places }) => {
                const [title, body] = m.thingsToDo.groups[key];
                return (
                  <article key={key} className={s.todo}>
                    <h3>{title}</h3>
                    <p>{body}</p>
                    {places.length > 0 && (
                      <ul>
                        {places.map((d) => (
                          <li key={d.slug}>
                            <SmartLink href={destinationPath(locale, d.slug)}>{d.name}</SmartLink>
                          </li>
                        ))}
                      </ul>
                    )}
                    {key === 'cave' && <TextLink href="#caves">{m.thingsToDo.cavesLink}</TextLink>}
                    {key === 'lagoon' && <p className={s.todoNote}>{m.thingsToDo.kayakNote}</p>}
                  </article>
                );
              })}
              <article className={s.todo}>
                <h3>{m.thingsToDo.onboard[0]}</h3>
                <p>{m.thingsToDo.onboard[1]}</p>
                <TextLink href={sectionPath(locale, 'experiences')}>{m.thingsToDo.onboardLink}</TextLink>
              </article>
            </div>
          </div>
        </section>

        <section className={`${s.section} ${s.sectionTinted}`} aria-labelledby="stops-title">
          <div className="container">
            <div className={s.sectionHead}>
              <h2 id="stops-title">{m.stops.title}</h2>
              <p>{m.stops.lede}</p>
            </div>
            <DestinationFilter
              items={stops.map(toCard)}
              bays={bays.map((key) => ({ key, label: m.bays[key] }))}
              categories={categories.map((key) => ({ key, label: m.categories[key] }))}
              labels={filterLabels}
            />
            <p className={s.note}>{m.stopNote}</p>
          </div>
        </section>

        {(otherItems.length > 0 || extra.length > 0) && (
          <section className={s.section} aria-labelledby="others-title">
            <div className="container">
              <div className={s.sectionHead}>
                <h2 id="others-title">{m.others.title}</h2>
                <p>{m.others.lede}</p>
              </div>
              {otherItems.length > 0 && (
                <DestinationFilter
                  items={otherItems.map(toCard)}
                  bays={bays.map((key) => ({ key, label: m.bays[key] }))}
                  categories={categories.map((key) => ({ key, label: m.categories[key] }))}
                  labels={filterLabels}
                />
              )}
              <div className={s.others}>
                {extra.map((p) => (
                  <article key={p.key} id={p.key} className={s.other}>
                    <span className={s.otherTag}>{m.others.notStop}</span>
                    <span className={s.label}>
                      {m.bays[p.bay]} · {m.category[p.category]}
                    </span>
                    <h3>{p.name}</h3>
                    <p>{p.summary}</p>
                    <p className={s.otherRoute}>{m.others.route}</p>
                    <p className={s.otherSources}>
                      {m.others.source}:{' '}
                      {p.sources.map((src, i) => (
                        <span key={src.url}>
                          {i > 0 && ' · '}
                          <a href={src.url} target="_blank" rel="noopener noreferrer">
                            {src.title}
                          </a>
                        </span>
                      ))}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {caves.length + extra.filter((p) => p.category === 'cave').length > 0 && (
          <section id="caves" className={s.section} aria-labelledby="caves-title">
            <div className="container">
              <div className={s.sectionHead}>
                <h2 id="caves-title">{m.caves.title}</h2>
                <p>{m.caves.lede}</p>
              </div>
              <div className={s.tableWrap}>
                <table className={s.table}>
                  <thead>
                    <tr>
                      <th scope="col">{m.caves.cave}</th>
                      <th scope="col">{m.caves.bay}</th>
                      <th scope="col">{m.caves.visit}</th>
                      <th scope="col">{m.caves.greenRuby}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {caves.map((d) => (
                      <tr key={d.slug}>
                        <th scope="row">
                          <SmartLink href={destinationPath(locale, d.slug)}>{d.name}</SmartLink>
                        </th>
                        <td>{m.bays[d.bay]}</td>
                        <td>{caveVisit[locale][d.slug] ?? '—'}</td>
                        <td>
                          {itinerariesOf(d).length > 0
                            ? itinerariesOf(d).map((it, i) => (
                                <span key={it.itineraryId}>
                                  {i > 0 && ', '}
                                  <SmartLink href={itineraryPath(locale, it.slug, it.cruiseId, it.itineraryId)}>{it.name}</SmartLink>
                                </span>
                              ))
                            : m.caves.none}
                        </td>
                      </tr>
                    ))}
                    {extra
                      .filter((p) => p.category === 'cave')
                      .map((p) => (
                        <tr key={p.key}>
                          <th scope="row">
                            <a href={`#${p.key}`}>{p.name}</a>
                          </th>
                          <td>{m.bays[p.bay]}</td>
                          <td>{p.visit}</td>
                          <td>{m.caves.none}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

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
              {cruises.length > 0 && (
                <p className={s.note}>
                  {m.cruises.lede}{' '}
                  {cruises.map((c, i) => (
                    <span key={c.id}>
                      {i > 0 && ' · '}
                      <SmartLink href={detailPath(locale, 'cruise', c.slug, c.id)}>{c.name}</SmartLink>
                    </span>
                  ))}
                </p>
              )}
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
              )
                .filter((g): g is [string, (typeof g)[1]] => g[0] !== null)
                .map(([href, [title, body]]) => (
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
            itemListElement: [
              ...items.map((d) => ({
                '@type': 'TouristAttraction',
                name: d.name,
                url: absoluteUrl(destinationPath(locale, d.slug)),
                ...(d.summary && { description: d.summary }),
                ...(d.image && { image: absoluteImageUrl(d.image.src, 1200) }),
                ...(d.coordinates && { geo: { '@type': 'GeoCoordinates', latitude: d.coordinates.lat, longitude: d.coordinates.lng } }),
              })),
              ...extra.map((p) => ({
                '@type': 'TouristAttraction',
                name: p.name,
                url: absoluteUrl(`${path}#${p.key}`),
                description: p.summary,
              })),
            ].map((item, i) => ({ '@type': 'ListItem', position: i + 1, item })),
          },
        }}
      />
      <SiteFooter locale={locale} site={chrome.site} t={t} />
    </>
  );
}
