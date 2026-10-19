import Image from 'next/image';
import { Booking } from '@/components/booking';
import { JournalLink } from '@/components/journal/JournalLink';
import { PageHero, SiteFooter, type Chrome } from '@/components/layout';
import { organizationRef } from '@/lib/organization';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, cx, Eyebrow, SmartLink, TextLink } from '@/components/ui';
import type { Cruise } from '@/lib/api/schemas';
import { detailPath, experiencePath, homePath, itineraryPath, sectionPath } from '@/lib/i18n';
import { siteInfo } from '@/lib/site-info';
import { absoluteImageUrl, absoluteUrl } from '@/lib/site-url';
import cabinStyles from '@/views/cabin/cabin.module.css';
import { cabinPath } from '@/views/cabin/CabinView';
import { cabinHighlights, cabinTier } from '@/views/home/cabin-card';
import { Carousel } from '@/views/home/Carousel';
import homeStyles from '@/views/home/home.module.css';
import s from './cruise.module.css';

const pad = (n: number) => String(n).padStart(2, '0');

function Head({ eyebrow, title, em, body, id, inverse }: { eyebrow: string; title: string; em: string; body?: string; id: string; inverse?: boolean }) {
  return (
    <div className={s.head}>
      <div>
        <Eyebrow inverse={inverse}>{eyebrow}</Eyebrow>
        <h2 className={s.heading} id={id}>{title} <em>{em}</em></h2>
      </div>
      {body && <p className={s.body}>{body}</p>}
    </div>
  );
}

export function CruiseView({ cruise, index, chrome }: { cruise: Cruise; index: number; chrome: Chrome }) {
  const { locale, t, site } = chrome;
  const c = t.cruise;
  const url = detailPath(locale, 'cruise', cruise.slug, cruise.id);
  const bookingUrl = `${sectionPath(locale, 'booking')}?cruise_id=${cruise.id}`;
  const bayName = cruise.bay ? t.home.bays[cruise.bay] : null;
  const heroImage = cruise.cover ?? cruise.image;
  const areas = cruise.cabins.map((x) => x.area).filter((a): a is number => a != null);
  const facilityPhoto = cruise.facilities.find((f) => f.image)?.image ?? cruise.image;
  const info = siteInfo(site);

  const facts = [
    cruise.length != null && { label: c.length, value: `${cruise.length} m`, caption: c.lengthCaption },
    cruise.capacity != null && { label: c.capacity, value: String(cruise.capacity), caption: c.capacityCaption },
    cruise.totalFloor != null && { label: c.decks, value: String(cruise.totalFloor), caption: c.decksCaption },
    cruise.yearBuilt != null && { label: c.built, value: String(cruise.yearBuilt), caption: c.builtCaption },
  ].filter((f): f is { label: string; value: string; caption: string } => Boolean(f));

  const tabs = [
    { id: 'overview', label: c.tabs.overview, show: true },
    { id: 'suites', label: c.tabs.suites, show: cruise.cabins.length > 0 },
    { id: 'onboard', label: c.tabs.onboard, show: cruise.facilities.length > 0 },
    { id: 'moments', label: c.tabs.moments, show: cruise.experiences.length > 0 },
    { id: 'technology', label: c.tabs.eco, show: cruise.greenTechnology.length > 0 },
    { id: 'journeys', label: c.tabs.journeys, show: cruise.itineraries.length > 0 },
    { id: 'services', label: c.tabs.services, show: cruise.services.included.length + cruise.services.optional.length > 0 },
  ].filter((tab) => tab.show);

  return (
    <>
      <PageHero
        chrome={chrome}
        image={heroImage}
        imageAlt={cruise.name}
        crumbs={[{ label: t.breadcrumb.home, href: homePath(locale) }, { label: cruise.name, href: url }]}
        eyebrow={[`${c.vessel} ${pad(index)}`, bayName].filter(Boolean).join(' · ')}
        title={<>{cruise.name}{cruise.bay && c.titleTag[cruise.bay] && <span className={cabinStyles.titleTag}>{c.titleTag[cruise.bay]}</span>}</>}
        subtitle={cruise.summary}
        actions={
          <>
            {cruise.cabins.length > 0 && <TextLink href="#suites" inverse>{c.exploreSuites}</TextLink>}
            {cruise.itineraries.length > 0 && <TextLink href="#journeys" inverse>{c.discoverJourneys}</TextLink>}
            {cruise.itineraries.length > 0 && (
              <div className={cabinStyles.heroBooking}>
                <Booking locale={locale} site={site} scope={{ cruiseId: cruise.id }} layout="bar" />
              </div>
            )}
          </>
        }
      />

      <main>
        <div className={cx('container', cabinStyles.facts)}>
          {facts.length > 0 && (
            <dl className={cabinStyles.factsInner} aria-label={c.factsLabel}>
              {facts.map((f) => (
                <div key={f.label} className={cabinStyles.fact}>
                  <dt>{f.label}</dt>
                  <dd><span className={cabinStyles.factValue}>{f.value}</span><span className={cabinStyles.factCaption}>{f.caption}</span></dd>
                </div>
              ))}
            </dl>
          )}
          <nav className={cabinStyles.subnav} aria-label={t.cabin.subnavLabel}>
            {tabs.map((tab) => <a key={tab.id} href={`#${tab.id}`}>{tab.label}</a>)}
          </nav>
        </div>

        <section className={s.section} id="overview" aria-labelledby="overview-title">
          <div className={cx('container', s.introGrid)}>
            <div>
              <Eyebrow>{c.introEyebrow(cruise.name)}</Eyebrow>
              <h2 className={s.heading} id="overview-title">{c.introTitle} <em>{c.introTitleEm}</em></h2>
              {cruise.contentHtml ? (
                <div className={s.body} dangerouslySetInnerHTML={{ __html: cruise.contentHtml }} />
              ) : (
                cruise.summary && <p className={s.body}>{cruise.summary}</p>
              )}
              {cruise.descriptionDesignHtml && <div className={s.body} dangerouslySetInnerHTML={{ __html: cruise.descriptionDesignHtml }} />}
              <dl className={s.introQuotes}>
                {cruise.cabins.length > 0 && (
                  <div>
                    <dt>{c.cabinCategories(cruise.cabins.length)}</dt>
                    {areas.length > 0 && <dd>{c.areaRange(Math.min(...areas), Math.max(...areas))}</dd>}
                  </div>
                )}
                {cruise.experiences.length > 0 && (
                  <div><dt>{c.experiencesCount(cruise.experiences.length)}</dt><dd>{c.experiencesCaption}</dd></div>
                )}
              </dl>
            </div>
            <div className={s.introVisual}>
              {cruise.image && <div className={s.introMain}><Image src={cruise.image} alt={cruise.name} fill sizes="(max-width: 900px) 90vw, 50vw" /></div>}
              {cruise.cabins[0]?.image && (
                <div className={s.introSecondary}><Image src={cruise.cabins[0].image} alt={cruise.cabins[0].name} fill sizes="(max-width: 900px) 45vw, 25vw" /></div>
              )}
            </div>
          </div>
        </section>

        {cruise.cabins.length > 0 && (
          <section className={s.section} id="suites" aria-labelledby="suites-title">
            <div className="container">
              <Head id="suites-title" eyebrow={c.suitesEyebrow} title={c.suitesTitle} em={c.suitesTitleEm} body={c.suitesBody} />
              <Carousel label={t.home.suitesCollection} count={cruise.cabins.length} caption={t.home.suitesCollection} previous={t.home.previous} next={t.home.next}>
                {cruise.cabins.map((cabin) => (
                  <article key={cabin.id} className={homeStyles.roomCard}>
                    <div className={homeStyles.roomImg}>
                      {cabin.image && <Image src={cabin.image} alt={cabin.name} fill sizes="(max-width: 600px) 100vw, (max-width: 1160px) 50vw, 33vw" />}
                    </div>
                    {/* Same card as the homepage "Rooms with a different view" carousel. */}
                    <div className={homeStyles.roomContent}>
                      <p className={homeStyles.roomMeta}>
                        <span className={homeStyles.roomTier}>{cabinTier(cabin, locale) ?? cruise.name}</span>
                        {cabin.area != null && <span className={homeStyles.roomArea}>{cabin.area} m²</span>}
                      </p>
                      <h3><SmartLink href={cabinPath(locale, cabin)}>{cabin.name}</SmartLink></h3>
                      <p className={homeStyles.roomHighlights}>{cabinHighlights(cabin, locale).join(' · ')}</p>
                      <p className={homeStyles.roomSummary}>{cabin.summary}</p>
                      <div className={homeStyles.roomCta}>
                        <TextLink href={cabinPath(locale, cabin)}>{t.home.discoverSuite}</TextLink>
                      </div>
                    </div>
                  </article>
                ))}
              </Carousel>
            </div>
          </section>
        )}

        {cruise.facilities.length > 0 && (
          <section className={cx(s.section, s.onboard)} id="onboard" aria-labelledby="onboard-title">
            <div className="container">
              <Head id="onboard-title" eyebrow={c.onboardEyebrow} title={c.onboardTitle} em={c.onboardTitleEm} body={c.onboardBody(cruise.name)} inverse />
              <div className={s.onboardMain}>
                <figure className={s.onboardPhoto}>
                  {facilityPhoto && <Image src={facilityPhoto} alt="" fill sizes="(max-width: 900px) 100vw, 55vw" />}
                  <figcaption>{c.onboardPhoto}</figcaption>
                </figure>
                <ul className={s.facilityGrid}>
                  {cruise.facilities.slice(0, 4).map((f, i) => (
                    <li key={f.id} className={s.facility}>
                      <span>{pad(i + 1)}{f.group ? ` · ${f.group}` : ''}</span>
                      <h3>{f.name}</h3>
                      {f.summary && <p>{f.summary}</p>}
                    </li>
                  ))}
                </ul>
              </div>
              {cruise.amenities.length > 0 && (
                <div className={s.onboardExtra}>
                  <p><strong>{c.alsoOnBoard}:</strong> {cruise.amenities.map((a) => a.name).join(' · ')}</p>
                  {cruise.services.included.length + cruise.services.optional.length > 0 && (
                    <TextLink href="#services" inverse>{c.tabs.services}</TextLink>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {cruise.experiences.length > 0 && (
          <section className={cx(s.section, s.moments)} id="moments" aria-labelledby="moments-title">
            <div className="container">
              <Head id="moments-title" eyebrow={c.momentsEyebrow} title={c.momentsTitle} em={c.momentsTitleEm} body={c.momentsBody} />
              <div className={s.momentsGrid}>
                {cruise.experiences.slice(0, 3).map((e, i) => (
                  <article key={e.id} className={s.moment}>
                    <div className={s.momentImg}>{e.image && <Image src={e.image} alt={e.name} fill sizes="(max-width: 600px) 100vw, 33vw" />}</div>
                    <span className={s.momentIndex}>{pad(i + 1)}{e.duration ? ` / ${/^\d+$/.test(e.duration) ? `${e.duration} min` : e.duration}` : ''}</span>
                    <h3><SmartLink href={experiencePath(locale, e.slug, e.id)}>{e.name}</SmartLink></h3>
                    {e.summary && <p>{e.summary}</p>}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {cruise.greenTechnology.length > 0 && (
          <section className={cx(s.section, s.eco)} id="technology" aria-labelledby="eco-title">
            <div className={cx('container', s.ecoGrid)}>
              <figure className={s.ecoPhoto}>
                {cruise.image && <Image src={cruise.image} alt={cruise.name} fill sizes="(max-width: 900px) 100vw, 50vw" />}
                <figcaption>{c.ecoCaption} / {cruise.name}</figcaption>
              </figure>
              <div>
                <Eyebrow>{c.ecoEyebrow}</Eyebrow>
                <h2 className={s.heading} id="eco-title">{c.ecoTitle} <em>{c.ecoTitleEm}</em></h2>
                <p className={s.body}>{c.ecoBody(cruise.name)}</p>
                <ul className={s.ecoList}>
                  {cruise.greenTechnology.map((g, i) => (
                    <li key={i} className={s.ecoItem}>
                      {g.icon ? <Image src={g.icon} alt="" width={40} height={40} className={s.ecoIcon} /> : <span className={s.ecoNum}>{pad(i + 1)}</span>}
                      <div>
                        {g.title && <h3>{g.title}</h3>}
                        {g.description && <p>{g.description}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
                <p className={s.body}><TextLink href={sectionPath(locale, 'ecoDashboard')}>{t.footer.links.ecoDashboard}</TextLink></p>
                <JournalLink locale={locale} />
              </div>
            </div>
          </section>
        )}

        {cruise.itineraries.length > 0 && (
          <section className={cx(s.section, s.journeys)} id="journeys" aria-labelledby="journeys-title">
            <div className="container">
              <Head
                id="journeys-title"
                eyebrow={c.journeysEyebrow}
                title={c.journeysTitle(bayName ?? cruise.name)}
                em={c.journeysTitleEm}
                body={c.journeysBody(cruise.name)}
              />
              <div className={s.journeyGrid}>
                {cruise.itineraries.map((it, i) => {
                  const itUrl = itineraryPath(locale, it.slug, it.cruiseId, it.itineraryId);
                  return (
                    <article key={`${it.itineraryId}-${it.cruiseId}`} className={s.journey}>
                      <SmartLink href={itUrl} className={s.journeyPhoto} aria-hidden="true" tabIndex={-1}>
                        {it.image && <Image src={it.image} alt={it.name} fill sizes="(max-width: 600px) 100vw, 50vw" />}
                        <span className={s.journeyBadge}>{t.home.duration(it.duration)}</span>
                        <span className={s.journeyNum}>{pad(i + 1)} / {pad(cruise.itineraries.length)}</span>
                      </SmartLink>
                      <div className={s.journeyInfo}>
                        <span className={s.journeyMeta}>{[it.bay && t.home.bays[it.bay], t.itinerary.durationLabel(it.duration)].filter(Boolean).join(' · ')}</span>
                        <h3><SmartLink href={itUrl}>{it.name}</SmartLink></h3>
                        {it.description && <p>{it.description}</p>}
                        {it.destinations.length > 0 && <ul className={s.chips}>{it.destinations.slice(0, 4).map((d) => <li key={d}>{d}</li>)}</ul>}
                        <div className={s.journeyBottom}>
                          <TextLink href={itUrl}>{c.viewItinerary}</TextLink>
                          <small>{c.nightsAboard(it.duration - 1)}</small>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
              <p className={s.journeyNote}>
                <span>{c.journeyNote}</span>
                <TextLink href={sectionPath(locale, 'itinerary')}>{c.allItineraries}</TextLink>
              </p>
            </div>
          </section>
        )}

        {cruise.services.included.length + cruise.services.optional.length > 0 && (
          <section className={cx(s.section, s.services)} id="services" aria-labelledby="services-title">
            <div className={cx('container', s.servicesGrid)}>
              <div className={s.servicesLead}>
                <Eyebrow>{c.servicesEyebrow}</Eyebrow>
                <h2 className={s.heading} id="services-title">{c.servicesTitle} <em>{c.servicesTitleEm}</em></h2>
                <p className={s.body}>{c.servicesBody}</p>
                <TextLink href={sectionPath(locale, 'contact')}>{c.talkToTeam}</TextLink>
              </div>
              <div>
                {cruise.services.included.length > 0 && (
                  <div className={s.serviceBlock}>
                    <h3>{c.included}</h3>
                    <ul>{cruise.services.included.map((x) => <li key={x.id}>{x.name}</li>)}</ul>
                  </div>
                )}
                {cruise.services.optional.length > 0 && (
                  <div className={s.serviceBlock}>
                    <h3>{c.onRequest}</h3>
                    <ul>{cruise.services.optional.map((x) => <li key={x.id}>{x.name}</li>)}</ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        <section className={cabinStyles.cta} aria-labelledby="cta-title">
          {heroImage && <Image src={heroImage} alt="" fill sizes="100vw" className={cabinStyles.ctaImage} />}
          <div className={cabinStyles.ctaInner}>
            <Eyebrow inverse>{c.ctaEyebrow}</Eyebrow>
            <h2 id="cta-title">{c.ctaTitle} <em style={{ color: 'var(--text-inverse-accent)' }}>{c.ctaTitleEm}</em></h2>
            <p>{c.ctaBody}</p>
            <div className={cabinStyles.ctaLinks}>
              <ButtonLink href={bookingUrl}>{c.ctaPrimary}</ButtonLink>
              <ButtonLink href={sectionPath(locale, 'contact')} variant="lightOutline" arrow={false}>{t.cabin.ctaSecondary}</ButtonLink>
            </div>
          </div>
        </section>
        {cruise.itineraries.length > 0 && <Booking locale={locale} site={site} scope={{ cruiseId: cruise.id }} layout="mobile" />}
      </main>

      <SiteFooter {...chrome} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Accommodation',
          '@id': absoluteUrl(url),
          url: absoluteUrl(url),
          name: cruise.name,
          description: cruise.summary ?? undefined,
          ...(heroImage && { image: [cruise.image, cruise.cover].filter((p): p is string => !!p).map((p) => absoluteImageUrl(p)) }),
          numberOfRooms: cruise.cabins.length || undefined,
          ...(cruise.capacity != null && { occupancy: { '@type': 'QuantitativeValue', maxValue: cruise.capacity } }),
          amenityFeature: cruise.amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a.name, value: true })),
          containsPlace: cruise.cabins.map((cabin) => ({ '@type': 'HotelRoom', name: cabin.name, url: absoluteUrl(cabinPath(locale, cabin)) })),
          ...(bayName && { containedInPlace: { '@type': 'Place', name: bayName, address: 'Quảng Ninh, Vietnam' } }),
          ...(cruise.yearBuilt != null && { yearBuilt: cruise.yearBuilt }),
          additionalProperty: [
            cruise.length != null && { '@type': 'PropertyValue', name: 'Length', value: cruise.length, unitCode: 'MTR', unitText: 'm' },
            cruise.totalFloor != null && { '@type': 'PropertyValue', name: 'Decks', value: cruise.totalFloor },
            cruise.totalCabin != null && { '@type': 'PropertyValue', name: 'Cabins', value: cruise.totalCabin },
            cruise.capacity != null && { '@type': 'PropertyValue', name: 'Capacity', value: cruise.capacity, unitText: 'guests' },
            cruise.cabins.length > 0 && { '@type': 'PropertyValue', name: 'Cabin categories', value: cruise.cabins.length },
          ].filter(Boolean),
          // The ship is operated by Green Ruby Cruises (the site-wide organization node).
          brand: organizationRef(info.name),
        }}
      />
    </>
  );
}
