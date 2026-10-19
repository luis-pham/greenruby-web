import Image from 'next/image';
import { Booking } from '@/components/booking';
import { PageHero, SiteFooter, type Chrome } from '@/components/layout';
import { FaqList } from '@/components/sections/Faq';
import { organizationRef } from '@/lib/organization';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, cx, Eyebrow, SmartLink, TextLink } from '@/components/ui';
import type { Itinerary } from '@/lib/api/schemas';
import { detailPath, experiencePath, homePath, itineraryPath, sectionPath } from '@/lib/i18n';
import { siteInfo } from '@/lib/site-info';
import { absoluteImageUrl, absoluteUrl } from '@/lib/site-url';
import { cabinPath } from '@/views/cabin/CabinView';
import { formatDate } from '@/views/itineraries/ItinerariesView';
import s from './itinerary.module.css';

const pad = (n: number) => String(n).padStart(2, '0');
const plain = (html: string | null) => (html ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

export function ItineraryView({ itinerary: it, chrome }: { itinerary: Itinerary; chrome: Chrome }) {
  const { locale, t, site } = chrome;
  const d = t.itinerary;
  const url = itineraryPath(locale, it.slug, it.cruiseId, it.itineraryId);
  const cruiseUrl = detailPath(locale, 'cruise', it.cruise.slug, it.cruise.id);
  const bookingUrl = `${sectionPath(locale, 'booking')}?cruise_id=${it.cruiseId}&itinerary_id=${it.itineraryId}`;
  const bayName = it.bay ? t.home.bays[it.bay] : null;
  const photos = [it.image, ...it.gallery.map((g) => g.src), ...it.activities.map((a) => a.image)].filter((p): p is string => !!p);
  const photoAt = (i: number) => (photos.length ? photos[i % photos.length] : null);
  const highlights = it.activities.slice(0, 3);
  const info = siteInfo(site);

  return (
    <>
      <PageHero
        chrome={chrome}
        image={it.image ?? it.cruise.image}
        imageAlt={it.name}
        crumbs={[
          { label: t.breadcrumb.home, href: homePath(locale) },
          { label: t.itineraries.breadcrumb, href: sectionPath(locale, 'itinerary') },
          { label: it.name, href: url },
        ]}
        eyebrow={[bayName, it.cruise.name, d.durationLabel(it.duration)].filter(Boolean).join(' · ')}
        title={it.name}
        description={it.description}
        actions={
          <>
            <TextLink href="#schedule" inverse>{d.exploreDays(it.duration)}</TextLink>
            <div className={s.heroBooking}>
              <Booking locale={locale} site={site} scope={{ itinerary: { cruiseId: it.cruiseId, itineraryId: it.itineraryId } }} layout="bar" />
            </div>
          </>
        }
      />

      <main>
        <div className={cx('container', s.info)}>
          <dl className={s.infoStrip} aria-label={d.infoLabel}>
            <div className={s.infoItem}>
              <dt>{d.vessel}</dt>
              <dd><strong>{it.cruise.name}</strong>{bayName && <small>{bayName}</small>}</dd>
            </div>
            <div className={s.infoItem}>
              <dt>{d.duration}</dt>
              <dd><strong>{d.durationLabel(it.duration)}</strong>{it.startTime && <small>{it.startTime}</small>}</dd>
            </div>
            <div className={s.infoItem}>
              <dt>{d.destination}</dt>
              <dd><strong>{bayName ?? it.destinations[0]}</strong>{it.destinations.length > 0 && <small>{it.destinations.slice(0, 3).join(' · ')}</small>}</dd>
            </div>
            <div className={s.infoItem}>
              <dt>{d.departures}</dt>
              <dd>
                <strong>{it.departures[0] ? formatDate(it.departures[0], locale) : t.itineraries.onRequest}</strong>
                {it.departures.length > 0 && <small>{d.departuresCount(it.departures.length)}</small>}
              </dd>
            </div>
          </dl>
        </div>

        <section className={s.intro} id="overview" aria-labelledby="overview-title">
          <div className={cx('container', s.introGrid)}>
            <div>
              <Eyebrow>{d.introEyebrow}</Eyebrow>
              <h2 className={s.heading} id="overview-title">{d.introTitle} <em>{d.introTitleEm}</em></h2>
              {it.descriptionHtml ? (
                <div className={s.body} dangerouslySetInnerHTML={{ __html: it.descriptionHtml }} />
              ) : (
                it.description && <p className={s.body}>{it.description}</p>
              )}
              <p className={s.introDecor}>{pad(it.duration)} <small>{d.daysToRemember}</small></p>
            </div>
            <aside className={s.quoteCard}>
              <span>{it.name}</span>
              <h2>{d.quoteTitle}</h2>
              <i aria-hidden="true" />
              <p>{d.quoteBody(it.duration)}</p>
            </aside>
          </div>
        </section>

        {highlights.length > 0 && (
          <section className={s.highlights} aria-labelledby="highlights-title">
            <div className="container">
              <div className={s.head}>
                <div>
                  <Eyebrow>{d.highlightsEyebrow}</Eyebrow>
                  <h2 className={s.heading} id="highlights-title">{d.highlightsTitle} <em>{d.highlightsTitleEm}</em></h2>
                </div>
                <p className={s.body}>{d.highlightsBody}</p>
              </div>
              <div className={s.highlightGrid}>
                {highlights.map((a, i) => (
                  <article key={a.id} className={s.highlightCard}>
                    <div className={s.highlightMedia}>
                      {a.image && <Image src={a.image} alt={a.name} fill sizes="(max-width: 600px) 100vw, 33vw" />}
                    </div>
                    <span className={s.highlightNum}>{pad(i + 1)}{a.duration ? ` / ${/^\d+$/.test(a.duration) ? `${a.duration} min` : a.duration}` : ''}</span>
                    <h3><SmartLink href={experiencePath(locale, a.slug, a.id)}>{a.name}</SmartLink></h3>
                    {a.summary && <p>{a.summary}</p>}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {it.days.length > 0 && (
          <section className={s.schedule} id="schedule" aria-labelledby="schedule-title">
            <div className="container">
              <div className={s.scheduleHead}>
                <Eyebrow>{d.scheduleEyebrow(it.duration)}</Eyebrow>
                <h2 className={s.heading} id="schedule-title">{d.scheduleTitle} <em>{d.scheduleTitleEm}</em></h2>
                <p className={s.body}>{d.scheduleBody}</p>
              </div>
              <div className={s.scheduleGrid}>
                <aside className={s.side}>
                  <p className={s.sideLabel}>{d.exploreByDay}</p>
                  <nav className={s.dayNav} aria-label={d.dayNavLabel}>
                    {it.days.map((day) => (
                      <a key={day.day} href={`#day-${day.day}`}>
                        <span>{pad(day.day)}</span>
                        <small>{day.title ?? d.day(day.day)}</small>
                      </a>
                    ))}
                  </nav>
                  <div className={s.sideBooking}>
                    <Booking locale={locale} site={site} scope={{ itinerary: { cruiseId: it.cruiseId, itineraryId: it.itineraryId } }} layout="panel" />
                  </div>
                </aside>
                <div>
                  {it.days.map((day, i) => (
                    <section key={day.day} className={s.daySection} id={`day-${day.day}`} aria-labelledby={`day-${day.day}-title`}>
                      <div className={s.dayHeading}>
                        <div className={s.dayText}>
                          <p className={s.dayLabel}><span>{pad(day.day)}</span> / {pad(it.days.length)}</p>
                          <h3 id={`day-${day.day}-title`}>{day.title ?? d.day(day.day)}</h3>
                        </div>
                        <div className={s.dayImage}>
                          {photoAt(i + 1) && <Image src={photoAt(i + 1) as string} alt={`${day.title ?? d.day(day.day)} – ${it.name}`} fill sizes="(max-width: 600px) 100vw, 30vw" />}
                        </div>
                      </div>
                      <ol className={s.timeline}>
                        {day.details.map((event, j) => (
                          <li key={j} className={s.event}>
                            <span className={s.eventTime}>{event.time}</span>
                            <span className={s.eventDot} aria-hidden="true" />
                            <div className={s.eventCopy}>
                              <h4>{event.title}</h4>
                              {event.descriptionHtml && <div className={s.body} dangerouslySetInnerHTML={{ __html: event.descriptionHtml }} />}
                            </div>
                          </li>
                        ))}
                      </ol>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {(it.services.included.length > 0 || it.services.optional.length > 0 || it.importantNotes.length > 0) && (
          <section className={s.inclusions} id="inclusions" aria-labelledby="inclusions-title">
            <div className="container">
              <Eyebrow inverse>{d.inclusionsEyebrow}</Eyebrow>
              <h2 className={s.heading} id="inclusions-title">{d.inclusionsTitle} <em>{d.inclusionsTitleEm}</em></h2>
              <div className={s.inclusionsGrid}>
                {it.services.included.length > 0 && (
                  <div className={s.box}>
                    <h3><span className={s.symbol} aria-hidden="true">✓</span>{d.included}</h3>
                    <ul>{it.services.included.map((x) => <li key={x.id}>{x.name}</li>)}</ul>
                  </div>
                )}
                {it.services.optional.length > 0 && (
                  <div className={cx(s.box, s.boxMuted)}>
                    <h3><span className={s.symbol} aria-hidden="true">+</span>{d.notIncluded}</h3>
                    <ul>{it.services.optional.map((x) => <li key={x.id}>{x.name}</li>)}</ul>
                  </div>
                )}
              </div>
              {it.importantNotes.length > 0 && (
                <div className={s.important}>
                  <h3>{d.beforeYouSail}</h3>
                  <ul>{it.importantNotes.map((note) => <li key={note}>{note}</li>)}</ul>
                </div>
              )}
              {it.departures.length > 0 && (
                <div className={s.important}>
                  <h3>{d.departuresTitle}</h3>
                  <ul className={s.departures}>
                    {it.departures.slice(0, 12).map((date) => <li key={date}><time dateTime={date}>{formatDate(date, locale)}</time></li>)}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        <section className={s.ship} id="ship" aria-labelledby="ship-title">
          <div className={cx('container', s.shipGrid)}>
            <figure className={s.shipImage}>
              {(it.cabins[0]?.image ?? it.cruise.image) && (
                <Image src={(it.cabins[0]?.image ?? it.cruise.image) as string} alt={it.cabins[0]?.name ?? it.cruise.name} fill sizes="(max-width: 900px) 100vw, 50vw" />
              )}
            </figure>
            <div>
              <Eyebrow>{d.shipEyebrow}</Eyebrow>
              <h2 className={s.heading} id="ship-title">{d.shipTitle} <em>{d.shipTitleEm}</em></h2>
              <p className={s.body}>{d.shipBody(it.cruise.name)}</p>
              <dl className={s.shipSpecs}>
                {it.cruise.length != null && <div><dt>{t.home.vesselLength}</dt><dd>{it.cruise.length} m</dd></div>}
                {it.cruise.capacity != null && <div><dt>{t.home.guestCapacity}</dt><dd>{it.cruise.capacity}</dd></div>}
                <div><dt>{d.cabinsOnBoard}</dt><dd>{it.cabins.length}</dd></div>
              </dl>
              {it.cabins.length > 0 && (
                <>
                  <p className={s.cabinLinksLabel}>{d.cabinsOnBoard}</p>
                  <ul className={s.cabinLinks}>
                    {it.cabins.map((cabin) => <li key={cabin.id}><SmartLink href={cabinPath(locale, cabin)}>{cabin.name}</SmartLink></li>)}
                  </ul>
                </>
              )}
              <ButtonLink href={cruiseUrl} variant="dark">{d.discover(it.cruise.name)}</ButtonLink>
            </div>
          </div>
        </section>

        {it.faqs.length > 0 && (
          <section className={s.faq} aria-labelledby="faq-title">
            <div className={cx('container', s.faqLayout)}>
              <div>
                <Eyebrow>{d.faqEyebrow}</Eyebrow>
                <h2 className={s.heading} id="faq-title">{d.faqTitle} <em>{d.faqTitleEm}</em></h2>
                <p className={s.body}>{t.itineraries.faqBody}</p>
                <TextLink href={sectionPath(locale, 'faq')}>{d.faqLink}</TextLink>
              </div>
              <FaqList items={it.faqs} />
            </div>
          </section>
        )}

        <section className={s.cta} aria-labelledby="cta-title">
          {photoAt(0) && <Image src={photoAt(0) as string} alt="" fill sizes="100vw" className={s.ctaImage} />}
          <div className={s.ctaInner}>
            <Eyebrow inverse>{d.ctaEyebrow}</Eyebrow>
            <h2 className={s.heading} id="cta-title">{d.ctaTitle} <em>{d.ctaTitleEm}</em></h2>
            <p>{d.ctaBody}</p>
            <div className={s.ctaLinks}>
              <ButtonLink href={bookingUrl}>{d.checkAvailability}</ButtonLink>
              <ButtonLink href={sectionPath(locale, 'contact')} variant="lightOutline" arrow={false}>{d.enquire}</ButtonLink>
            </div>
          </div>
        </section>
        <Booking locale={locale} site={site} scope={{ itinerary: { cruiseId: it.cruiseId, itineraryId: it.itineraryId } }} layout="mobile" />
      </main>

      <SiteFooter {...chrome} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'TouristTrip',
          '@id': absoluteUrl(url),
          url: absoluteUrl(url),
          name: it.name,
          description: it.description ?? plain(it.descriptionHtml),
          inLanguage: locale,
          ...(photos[0] && { image: photos.slice(0, 4).map((p) => absoluteImageUrl(p)) }),
          touristType: ['Leisure', 'Cruise'],
          provider: organizationRef(info.name),
          itinerary: {
            '@type': 'ItemList',
            numberOfItems: it.days.length,
            itemListElement: it.days.map((day) => ({
              '@type': 'ListItem',
              position: day.day,
              item: {
                '@type': 'TouristAttraction',
                name: `${d.day(day.day)}${day.title ? `: ${day.title}` : ''}`,
                description: day.details.map((e) => [e.time, e.title].filter(Boolean).join(' ')).join('; '),
              },
            })),
          },
          ...(it.departures.length > 0 && {
            subjectOf: it.departures.slice(0, 10).map((date) => ({
              '@type': 'Event',
              name: `${it.name} (${formatDate(date, locale)})`,
              startDate: date,
              eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
              location: { '@type': 'Place', name: bayName ?? it.destinations[0] ?? 'Ha Long Bay', address: 'Quảng Ninh, Vietnam' },
              url: absoluteUrl(bookingUrl),
            })),
          }),
          ...(it.fromPrice != null && {
            offers: { '@type': 'Offer', price: it.fromPrice, priceCurrency: it.currency, url: absoluteUrl(bookingUrl), availability: 'https://schema.org/InStock' },
          }),
        }}
      />
    </>
  );
}
