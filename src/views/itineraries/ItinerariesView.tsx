import Image from 'next/image';
import { Booking } from '@/components/booking';
import { PageHero, SiteFooter, type Chrome } from '@/components/layout';
import { FaqList } from '@/components/sections/Faq';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, cx, Eyebrow, SmartLink, TextLink } from '@/components/ui';
import type { ItinerarySummary } from '@/lib/api/schemas';
import { homePath, itineraryPath, sectionPath, type Locale } from '@/lib/i18n';
import { absoluteUrl } from '@/lib/site-url';
import { TripFilter } from './TripFilter';
import s from './itineraries.module.css';

const pad = (n: number) => String(n).padStart(2, '0');

export function formatDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${date}T00:00:00Z`),
  );
}

export function ItinerariesView({
  items,
  faqs,
  chrome,
}: {
  items: ItinerarySummary[];
  faqs: { question: string; answerHtml: string }[];
  chrome: Chrome;
}) {
  const { locale, t } = chrome;
  const l = t.itineraries;
  const bays = [...new Set(items.map((i) => i.bay).filter((b): b is 'ha-long' | 'lan-ha' => b !== null))];
  const durations = [...new Set(items.map((i) => i.duration))].sort((a, b) => a - b);
  const cruises = [...new Set(items.map((i) => i.cruiseName).filter(Boolean))];
  const heroImage = items.find((i) => i.bay === 'ha-long')?.image ?? items[0]?.image ?? null;
  const path = sectionPath(locale, 'itinerary');
  const bookingUrl = sectionPath(locale, 'booking');
  const results = Object.fromEntries(Array.from({ length: items.length + 1 }, (_, n) => [n, l.results(n)]));

  return (
    <>
      <PageHero
        chrome={chrome}
        currentHref={path}
        image={heroImage}
        imageAlt=""
        crumbs={[{ label: t.breadcrumb.home, href: homePath(locale) }, { label: l.breadcrumb, href: path }]}
        eyebrow={l.heroEyebrow}
        title={<>{l.heroTitle} <em>{l.heroTitleEm}</em></>}
        description={l.heroBody}
        actions={
          <>
            <TextLink href="#journeys" inverse>{l.heroPrimary}</TextLink>
            {durations.length > 1 && <TextLink href="#compare" inverse>{l.heroSecondary}</TextLink>}
            <div className={s.heroBooking}>
              <Booking locale={locale} site={chrome.site} scope="all" layout="bar" />
            </div>
          </>
        }
      />

      <main>
        <div className={cx('container', s.rail)}>
          <dl className={s.railInner} aria-label={l.railLabel}>
            <div className={s.railItem}>
              <dt>{l.rail.destinations}</dt>
              <dd>
                <strong className={s.railTitle}>{t.home.glance.destinationsTitle(bays.length)}</strong>
                <span className={s.railSub}>{bays.map((b) => t.home.bays[b]).join(' & ')}</span>
              </dd>
            </div>
            <div className={s.railItem}>
              <dt>{l.rail.collection}</dt>
              <dd>
                <strong className={s.railTitle}>{l.rail.collectionTitle(items.length)}</strong>
                <span className={s.railSub}>{cruises.join(' & ')}</span>
              </dd>
            </div>
            <div className={s.railItem}>
              <dt>{l.rail.time}</dt>
              <dd>
                <strong className={s.railTitle}>{l.rail.timeTitle(durations)}</strong>
                <span className={s.railSub}>{l.rail.timeDetail}</span>
              </dd>
            </div>
          </dl>
        </div>

        <section className={s.section} id="journeys" aria-labelledby="journeys-title">
          <div className="container">
            <div className={s.head}>
              <div>
                <Eyebrow>{l.listEyebrow}</Eyebrow>
                <h2 className={s.heading} id="journeys-title">{l.listTitle} <em>{l.listTitleEm}</em></h2>
              </div>
              <p>{l.listBody}</p>
            </div>
            <TripFilter
              label={l.filterLabel}
              bayLabel={l.filterBay}
              durationLabel={l.filterDuration}
              bays={bays.map((b) => ({ value: b, label: t.home.bays[b] }))}
              durations={durations.map((d) => ({ value: String(d), label: l.shortDuration(d) }))}
              allBaysLabel={l.allBays}
              allLabel={l.all}
              results={results}
              total={items.length}
            >
              {items.map((it, i) => {
                const url = itineraryPath(locale, it.slug, it.cruiseId, it.itineraryId);
                return (
                  <article key={`${it.itineraryId}-${it.cruiseId}`} className={s.trip} data-bay={it.bay ?? ''} data-duration={it.duration}>
                    <SmartLink href={url} className={s.tripPhoto} aria-hidden="true" tabIndex={-1}>
                      {it.image && <Image src={it.image} alt={it.name} fill sizes="(max-width: 600px) 100vw, 50vw" />}
                      {it.bay && <span className={s.tripLocation}>{t.home.bays[it.bay]}</span>}
                      <span className={s.tripNumber}>{pad(i + 1)} / {pad(items.length)}</span>
                      <span className={s.tripDuration}>{t.home.duration(it.duration)}</span>
                    </SmartLink>
                    <div className={s.tripBody}>
                      {it.cruiseName && <span className={s.tripVessel}>{it.cruiseName}</span>}
                      <h3><SmartLink href={url}>{it.name}</SmartLink></h3>
                      {it.description && <p>{it.description}</p>}
                      {it.destinations.length > 0 && (
                        <ul className={s.chips}>
                          {it.destinations.slice(0, 4).map((d) => <li key={d}>{d}</li>)}
                        </ul>
                      )}
                      <div className={s.tripBottom}>
                        <p className={s.tripNote}>
                          <b>{t.home.duration(it.duration)}</b>
                          {it.nextDeparture ? `${l.nextDeparture}: ${formatDate(it.nextDeparture, locale)}` : l.onRequest}
                        </p>
                        <TextLink href={url}>{l.viewItinerary}</TextLink>
                      </div>
                    </div>
                  </article>
                );
              })}
            </TripFilter>
          </div>
        </section>

        {durations.length > 1 && (
          <section className={cx(s.section, s.compare)} id="compare" aria-labelledby="compare-title">
            <div className="container">
              <div className={s.compareTop}>
                <div>
                  <Eyebrow inverse>{l.compareEyebrow}</Eyebrow>
                  <h2 className={s.heading} id="compare-title">{l.compareTitle} <em>{l.compareTitleEm}</em></h2>
                </div>
                <p>{l.compareBody}</p>
              </div>
              <div className={s.compareGrid}>
                {durations.slice(0, 2).map((days, i) => {
                  const copy = l.compare[i];
                  return (
                    <article key={days} className={cx(s.compareCard, i === 1 && s.compareFeatured)}>
                      <span className={s.compareTag}>{copy.tag}</span>
                      <h3>{t.itinerary.durationLabel(days)}</h3>
                      <p>{copy.body}</p>
                      <ul className={s.compareList}>
                        {copy.points.map((point) => <li key={point}>{point}</li>)}
                      </ul>
                    </article>
                  );
                })}
              </div>
              <p className={s.compareFooter}>
                <span>{l.compareFooter}</span>
                <TextLink href="#journeys" inverse>{l.heroPrimary}</TextLink>
              </p>
            </div>
          </section>
        )}

        {bays.length > 0 && (
          <section className={cx(s.section, s.bays)} aria-labelledby="bays-title">
            <div className="container">
              <div className={s.head}>
                <div>
                  <Eyebrow>{l.baysEyebrow}</Eyebrow>
                  <h2 className={s.heading} id="bays-title">{l.baysTitle} <em>{l.baysTitleEm}</em></h2>
                </div>
                <p>{l.baysBody}</p>
              </div>
              <div className={s.bayPair}>
                {bays.map((bay, i) => {
                  const first = items.find((it) => it.bay === bay);
                  const copy = l.bayCopy[bay];
                  return (
                    <article key={bay} className={s.bayCard}>
                      <div className={s.bayPhoto}>
                        {first?.image && <Image src={first.image} alt={t.home.bays[bay]} fill sizes="(max-width: 600px) 100vw, 50vw" />}
                        <span className={s.bayId}>{pad(i + 1)} / {copy.tag}</span>
                      </div>
                      <p className={s.bayMeta}>{[first?.cruiseName, t.home.bays[bay]].filter(Boolean).join(' · ')}</p>
                      <h3>{copy.title}</h3>
                      <p>{copy.body}</p>
                      <TextLink href="#journeys">{l.exploreBay(t.home.bays[bay])}</TextLink>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {faqs.length > 0 && (
          <section className={cx(s.section, s.faq)} aria-labelledby="faq-title">
            <div className={cx('container', s.faqLayout)}>
              <div>
                <Eyebrow>{l.faqEyebrow}</Eyebrow>
                <h2 className={s.heading} id="faq-title">{l.faqTitle} <em>{l.faqTitleEm}</em></h2>
                <p>{l.faqBody}</p>
                <TextLink href={sectionPath(locale, 'faq')}>{l.faqLink}</TextLink>
              </div>
              <FaqList items={faqs} />
            </div>
          </section>
        )}

        <section className={s.cta} aria-labelledby="cta-title">
          {heroImage && <Image src={heroImage} alt="" fill sizes="100vw" className={s.ctaImage} />}
          <div className={s.ctaInner}>
            <Eyebrow inverse>{l.ctaEyebrow}</Eyebrow>
            <h2 id="cta-title">{l.ctaTitle} <em>{l.ctaTitleEm}</em></h2>
            <p>{l.ctaBody}</p>
            <div className={s.ctaLinks}>
              <ButtonLink href={bookingUrl}>{l.ctaPrimary}</ButtonLink>
              <TextLink href={sectionPath(locale, 'contact')} inverse>{l.ctaSecondary}</TextLink>
            </div>
          </div>
        </section>
        <Booking locale={locale} site={chrome.site} scope="all" layout="mobile" />
      </main>

      <SiteFooter {...chrome} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: l.metaTitle,
          itemListElement: items.map((it, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: absoluteUrl(itineraryPath(locale, it.slug, it.cruiseId, it.itineraryId)),
            name: it.name,
          })),
        }}
      />
    </>
  );
}
