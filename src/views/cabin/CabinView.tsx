import Image from 'next/image';
import { Booking } from '@/components/booking';
import { inventoryCabinId } from '@/lib/booking-options';
import { linkLabel, sectionHref } from '@/lib/section-links';
import { PageHero, SiteFooter, type Chrome } from '@/components/layout';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, cx, SectionHeading, SmartLink, TextLink } from '@/components/ui';
import type { Cabin, CabinSummary, Cruise } from '@/lib/api/schemas';
import { LinkChips } from '@/components/sections/TravelLinks';
import { guideLinks } from '@/lib/guide-links';
import { detailPath, homePath, isLegacyLocale, itineraryPath, numberFormatTag, sectionPath, type Locale } from '@/lib/i18n';
import { absoluteImageUrl, absoluteUrl } from '@/lib/site-url';
import { wordSpace } from '@/lib/typography';
import { cabinHighlights, cabinTier } from '@/views/home/cabin-card';
import { Carousel } from '@/views/home/Carousel';
import homeStyles from '@/views/home/home.module.css';
import { CabinGallery } from './CabinGallery';
import { rateNotes } from './rate-notes';
import { SHIP_SWITCH } from './sisters';

import s from './cabin.module.css';

/** Number + guest unit: Korean attaches the counter noun to the digits ("4명"); other languages keep wordSpace. */
const unitSpace = (locale: Locale) => (locale === 'ko' ? '' : wordSpace(locale));

export function cabinPath(locale: Locale, cabin: Pick<CabinSummary, 'slug' | 'id'>): string {
  return detailPath(locale, 'cabin', cabin.slug, cabin.id);
}

function formatPrice(value: number, currency: 'USD' | 'VND', locale: Locale) {
  return new Intl.NumberFormat(numberFormatTag(locale), {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

const pad = (n: number) => String(n).padStart(2, '0');

export function CabinView({
  cabin,
  cruise,
  chrome,
  places = [],
  ships = [],
}: {
  cabin: Cabin;
  cruise: Cruise | null;
  chrome: Chrome;
  /** Published destinations on this ship's itineraries. */
  places?: { href: string; label: string }[];
  /** This suite on each ship (same slug), when it is on more than one. */
  ships?: { id: number; name: string; bay: 'ha-long' | 'lan-ha' | null; href: string; current: boolean }[];
}) {
  const { locale, t } = chrome;
  const c = t.cabin;
  const bay = cruise?.bay ?? null;
  const bayName = bay ? t.home.bays[bay] : null;
  const voyages = cruise?.itineraries ?? [];
  const guides = guideLinks(locale, chrome.site.hiddenPages, chrome.site.publicSections);
  const url = cabinPath(locale, cabin);
  const cruiseUrl = detailPath(locale, 'cruise', cabin.cruise.slug, cabin.cruise.id);
  // A new language books the linked English cabin (inventoryCabinId); en/vi: the page's own id, as before.
  const bookCabin = inventoryCabinId(locale, cabin);
  // en/vi also name the ship, so the wizard can open this cabin's voyages even when the cabin suggestion is unavailable
  // (a new language's ship ids are not the inventory's).
  const bookingQuery = new URLSearchParams();
  if (isLegacyLocale(locale)) bookingQuery.set('cruise_id', String(cabin.cruise.id));
  if (bookCabin) bookingQuery.set('cabin_id', String(bookCabin));
  const bookingUrl = `${sectionHref(locale, 'booking', chrome.site.publicSections)}${bookingQuery.size ? `?${bookingQuery}` : ''}`;
  const notes = rateNotes(locale);
  const contactUrl = sectionHref(locale, 'contact', chrome.site.publicSections);
  const extra = cabin.overCapacity.adult + cabin.overCapacity.child6to12 + cabin.overCapacity.child2to5 + cabin.overCapacity.infant;
  // Maximum combinations from the CMS ("3 adults, or 2 adults + 2 children"); null while the cabin uses overCapacity.
  const occupancy = cabin.occupancyLimits.length > 0 ? c.occupancy(cabin.occupancyLimits) : null;
  const maxGuests = occupancy ? Math.max(...cabin.occupancyLimits.map((l) => l.adults + l.children)) : (cabin.capacity ?? 0) + extra;
  const { pricing } = cabin;
  const durations = [...new Set(pricing.matrix.map((r) => r.duration))].sort((a, b) => a - b);
  const guests = [...new Set(pricing.matrix.map((r) => r.guest))].sort((a, b) => a - b);
  const priceOf = (d: number, g: number) => pricing.matrix.find((r) => r.duration === d && r.guest === g)?.price;
  // Gallery viewer: the cover and every gallery photo. With a full gallery (6+ photos) the first gallery photo closes
  // the page (CTA) instead of repeating the cover; smaller galleries keep the cover behind the CTA.
  const photos = [...(cabin.image ? [{ src: cabin.image, alt: cabin.name }] : []), ...cabin.gallery];
  const ctaImage = cabin.gallery.length >= 6 ? cabin.gallery[0].src : cabin.image;

  const hasAside = cabin.amenities.length > 0 || cabin.suitableFor.length > 0;

  const tabs = [
    { id: 'overview', label: c.tabs.overview, show: true },
    { id: 'voyages', label: t.cruise.tabs.journeys, show: voyages.length > 0 },
    { id: 'space', label: c.tabs.space, show: cabin.rooms.length > 0 },
    { id: 'rates', label: c.tabs.rates, show: true },
    { id: 'more', label: c.tabs.more, show: cabin.otherCabins.length > 0 },
  ].filter((tab) => tab.show);

  return (
    <>
      <PageHero
        chrome={chrome}
        image={cabin.image}
        imageAlt={cabin.name}
        crumbs={[
          { label: t.breadcrumb.home, href: homePath(locale) },
          { label: cabin.cruise.name, href: cruiseUrl },
          { label: cabin.name, href: url },
        ]}
        eyebrow={[cabin.cabinClass, cabin.cruise.name].filter(Boolean).join(' · ') || c.eyebrowFallback}
        titleSize="detail"
        title={<>{cabin.name}{' '}<span className={s.titleTag}>{c.titleTag(cabin.cruise.name, bayName)}</span></>}
        subtitle={cabin.summary}
        actions={
          <>
            {ships.length > 1 && (
              <nav className={s.shipSwitch} aria-label={SHIP_SWITCH[locale].onBoth}>
                <span className={s.shipSwitchLabel}>{SHIP_SWITCH[locale].onBoth}</span>
                <div className={s.shipSwitchOptions}>
                  {ships.map((ship) => (
                    <SmartLink
                      key={ship.id}
                      href={ship.href}
                      className={cx(s.shipOption, ship.current && s.shipOptionCurrent)}
                      aria-current={ship.current ? 'page' : undefined}
                    >
                      <strong>{ship.name}</strong>
                      {ship.bay && <span>{t.home.bays[ship.bay]}</span>}
                    </SmartLink>
                  ))}
                </div>
              </nav>
            )}
            <TextLink href={cruiseUrl} inverse>{c.discoverShip(cabin.cruise.name)}</TextLink>
            <div className={s.heroBooking}>
              <Booking locale={locale} site={chrome.site} scope={{ cruiseId: cabin.cruise.id }} cabinId={inventoryCabinId(locale, cabin)} layout="bar" />
            </div>
          </>
        }
      />

      <main>
        <div className={cx('container', s.facts)}>
          <dl className={s.factsInner} aria-label={c.factsLabel}>
            {cabin.area != null && (
              <div className={s.fact}>
                <dt>{c.area}</dt>
                <dd><span className={s.factValue}>{cabin.area} m²</span><span className={s.factCaption}>{c.areaCaption}</span></dd>
              </div>
            )}
            {cabin.capacity != null && (
              <div className={s.fact}>
                <dt>{c.guests}</dt>
                <dd><span className={s.factValue}>{cabin.capacity}{unitSpace(locale)}{c.guestUnit(cabin.capacity)}</span><span className={s.factCaption}>{occupancy ? c.occupancyCaption(occupancy) : c.guestsCaption(extra)}</span></dd>
              </div>
            )}
            {cabin.view && (
              <div className={s.fact}>
                <dt>{c.view}</dt>
                <dd><span className={s.factValue}>{cabin.view}</span><span className={s.factCaption}>{c.viewCaption}</span></dd>
              </div>
            )}
            {cabin.cabinClass && (
              <div className={s.fact}>
                <dt>{c.category}</dt>
                <dd><span className={s.factValue}>{cabin.cabinClass}</span><span className={s.factCaption}>{c.categoryCaption}</span></dd>
              </div>
            )}
          </dl>
          <nav className={s.subnav} aria-label={c.subnavLabel}>
            {tabs.map((tab) => <a key={tab.id} href={`#${tab.id}`}>{tab.label}</a>)}
          </nav>
        </div>

        <section className={s.section} id="overview" aria-labelledby="overview-title">
          {/* Cabin redesign 2026-11-15: photos beside the story, the comforts on the right. The facts bar above already
              carries area, guests, view and category, so the old "At a glance" box (which repeated them) is gone. */}
          <div className={cx('container', s.overview, !hasAside && s.overviewSingle)}>
            <div className={s.overviewMain}>
              <SectionHeading id="overview-title" eyebrow={c.overviewEyebrow} title={c.overviewHeading(cabin.name)} stacked />
              {cabin.contentHtml ? (
                <div className={s.prose} dangerouslySetInnerHTML={{ __html: cabin.contentHtml }} />
              ) : (
                // No description yet: the summary, set like every other cabin's description (not as a serif lead).
                cabin.summary && <div className={s.prose}><p>{cabin.summary}</p></div>
              )}
              {photos.length > 1 && (
                <div className={s.overviewGallery} id="gallery">
                  <h3 className="sr-only">{c.galleryHeading}</h3>
                  <CabinGallery photos={photos} name={cabin.name} ship={cabin.cruise.name} locale={locale} />
                </div>
              )}
            </div>
            {hasAside && (
              <aside className={s.comforts} id="amenities" aria-labelledby="amenities-title">
                <span className={s.comfortsEyebrow}>{c.amenitiesEyebrow}</span>
                <h3 id="amenities-title">{c.amenitiesHeading}</h3>
                {cabin.suitableFor.length > 0 && (
                  <p className={s.comfortsFor}>
                    <span>{c.glance.suitableFor}</span> {cabin.suitableFor.map((a) => a.name).join(', ')}
                  </p>
                )}
                {cabin.amenities.length > 0 && (
                  <ul className={s.comfortsList}>
                    {cabin.amenities.map((amenity) => (
                      <li key={amenity.name}>
                        {amenity.icon ? (
                          <Image src={amenity.icon} alt="" width={22} height={22} className={s.amenityIcon} />
                        ) : (
                          <span className={s.amenityDot} aria-hidden="true" />
                        )}
                        {amenity.name}
                      </li>
                    ))}
                  </ul>
                )}
              </aside>
            )}
          </div>
        </section>

        {voyages.length > 0 && (
          <section className={cx(s.section, s.alt)} id="voyages" aria-labelledby="voyages-title">
            <div className="container">
              <SectionHeading
                id="voyages-title"
                eyebrow={c.voyagesEyebrow}
                title={c.voyagesHeading(cabin.cruise.name)}
                description={bay && c.bayIntro[bay] ? c.bayIntro[bay](cabin.name, cabin.cruise.name) : undefined}
              />
              <ul className={s.voyageGrid}>
                {voyages.map((v) => (
                  <li key={`${v.cruiseId}-${v.itineraryId}`} className={s.voyageCard}>
                    {v.image && (
                      <div className={s.voyageImage}>
                        <Image src={v.image} alt={`${v.name} – ${cabin.cruise.name}`} fill sizes="(max-width: 700px) 100vw, 50vw" />
                      </div>
                    )}
                    <div className={s.voyageBody}>
                      <p className={s.voyageMeta}>{[bayName, t.itinerary.durationLabel(v.duration)].filter(Boolean).join(' · ')}</p>
                      <h3><SmartLink href={itineraryPath(locale, v.slug, v.cruiseId, v.itineraryId)}>{v.name}</SmartLink></h3>
                      {v.destinations.length > 0 && <p className={s.voyageRoute}>{v.destinations.join(' · ')}</p>}
                      <TextLink href={itineraryPath(locale, v.slug, v.cruiseId, v.itineraryId)}>{c.voyageCta}</TextLink>
                    </div>
                  </li>
                ))}
              </ul>

              {bay && c.boarding.byBay[bay] && (
                // What really differs between the GR1 and GR2 copy of a cabin: ship, bay, boarding route, places.
                <div className={s.boarding}>
                  <h3>{c.boarding.title(cabin.cruise.name)}</h3>
                  <dl>
                    <div><dt>{c.boarding.ship}</dt><dd><SmartLink href={cruiseUrl}>{cabin.cruise.name}</SmartLink></dd></div>
                    <div><dt>{c.boarding.bay}</dt><dd>{bayName}</dd></div>
                    <div><dt>{c.boarding.checkIn}</dt><dd>{c.boarding.byBay[bay].checkIn}</dd></div>
                    <div><dt>{c.boarding.board}</dt><dd>{c.boarding.byBay[bay].board}</dd></div>
                    <div><dt>{c.boarding.back}</dt><dd>{c.boarding.byBay[bay].back}</dd></div>
                  </dl>
                  {places.length > 0 && (
                    <div className={s.boardingPlaces}>
                      <p>{c.boarding.places}</p>
                      <LinkChips items={places} />
                    </div>
                  )}
                  <p className={s.boardingNote}>{c.boarding.note}</p>
                  <p className={s.boardingLinks}>
                    {guides.transfer && <TextLink href={`${guides.transfer}#${locale === 'vi' ? 'hai-tau' : 'ships'}`}>{c.boarding.howTo}</TextLink>}
                    <TextLink href={`${sectionPath(locale, 'brandFacts')}`}>{linkLabel(locale, sectionPath(locale, 'brandFacts'), c.boarding.compare)}</TextLink>
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {cabin.rooms.length > 0 && (
          <section className={cx(s.section, s.surface)} id="space" aria-labelledby="space-title">
            <div className="container">
              <SectionHeading id="space-title" eyebrow={c.spaceEyebrow} title={c.spaceHeading} description={c.spaceIntro} />
              <ol className={s.rooms}>
                {cabin.rooms.map((room, i) => (
                  <li key={i} className={s.room}>
                    <span className={s.roomNum} aria-hidden="true">{pad(i + 1)}</span>
                    <div>
                      <h3>{room.title}</h3>
                      {room.description && <p>{room.description}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        <section className={s.section} id="rates" aria-labelledby="rates-title">
          <div className="container">
            <SectionHeading id="rates-title" eyebrow={c.ratesEyebrow} title={pricing.showPublic ? c.ratesHeading : c.onRequestHeading} />
            {pricing.showPublic && pricing.matrix.length > 0 ? (
              <div className={s.ratesWrap}>
                <table className={s.rates}>
                  <caption>{c.ratesCaption(pricing.currency)}</caption>
                  <thead>
                    <tr>
                      <th scope="col">{c.ratesTrip}</th>
                      {guests.map((g) => <th key={g} scope="col">{c.ratesGuests(g)}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {durations.map((d) => (
                      <tr key={d}>
                        <th scope="row">{c.ratesNights(d)}</th>
                        {guests.map((g) => {
                          const price = priceOf(d, g);
                          return <td key={g}>{price ? formatPrice(price, pricing.currency, locale) : '—'}</td>;
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className={s.onRequest}>
                <div>
                  <h3>{cabin.name}</h3>
                  <p>{c.onRequestBody}</p>
                  {notes && <p>{notes.launch}</p>}
                  {notes && voyages.length > 0 && (
                    <p className={s.rateInclusions}>
                      {notes.inclusions}{' '}
                      {voyages.map((v, i) => (
                        <span key={`${v.cruiseId}-${v.itineraryId}`}>
                          {i > 0 && ' · '}
                          <SmartLink href={`${itineraryPath(locale, v.slug, v.cruiseId, v.itineraryId)}#inclusions`}>{v.name}</SmartLink>
                        </span>
                      ))}
                    </p>
                  )}
                </div>
                {/* The reservation request with this cabin chosen: the shortest path to a quote for real dates. */}
                <ButtonLink href={bookingUrl}>{c.requestQuote}</ButtonLink>
              </div>
            )}
          </div>
        </section>

        {cabin.otherCabins.length > 0 && (
          <section className={s.section} id="more" aria-labelledby="more-title">
            <div className="container">
              <SectionHeading id="more-title" eyebrow={t.cruise.suitesEyebrow} title={c.moreHeading} />
              {/* Same cards and carousel as "The suite collection" on the ship pages and the homepage. */}
              <Carousel label={t.home.suitesCollection} count={cabin.otherCabins.length} caption={t.home.suitesCollection} previous={t.home.previous} next={t.home.next}>
                {cabin.otherCabins.map((other) => (
                  <article key={other.id} className={homeStyles.roomCard}>
                    <div className={`${homeStyles.roomImg} ${s.moreImg}`}>
                      {other.image && <Image src={other.image} alt={other.name} fill sizes="(max-width: 600px) 100vw, (max-width: 1160px) 50vw, 33vw" />}
                    </div>
                    <div className={homeStyles.roomContent}>
                      <p className={homeStyles.roomMeta}>
                        <span className={homeStyles.roomTier}>{cabinTier(other, locale) ?? cabin.cruise.name}</span>
                        {other.area != null && <span className={homeStyles.roomArea}>{other.area} m²</span>}
                      </p>
                      <h3><SmartLink href={cabinPath(locale, other)}>{other.name}</SmartLink></h3>
                      <p className={homeStyles.roomHighlights}>{cabinHighlights(other, locale).join(' · ')}</p>
                      {other.summary && <p className={homeStyles.roomSummary}>{other.summary}</p>}
                      <div className={homeStyles.roomCta}>
                        <TextLink href={cabinPath(locale, other)}>{t.home.discoverSuite}</TextLink>
                      </div>
                    </div>
                  </article>
                ))}
              </Carousel>
            </div>
          </section>
        )}

        <section className={s.cta} aria-labelledby="cta-title">
          {ctaImage && <Image src={ctaImage} alt="" fill sizes="100vw" className={s.ctaImage} />}
          <div className={s.ctaInner}>
            <SectionHeading id="cta-title" eyebrow={c.ctaEyebrow} title={c.ctaHeading} inverse stacked />
            <p>{c.ctaBody}</p>
            <div className={s.ctaLinks}>
              <ButtonLink href={bookingUrl}>{c.ctaPrimary}</ButtonLink>
              <ButtonLink href={contactUrl} variant="lightOutline" arrow={false}>{c.ctaSecondary}</ButtonLink>
            </div>
          </div>
        </section>
        <Booking locale={locale} site={chrome.site} scope={{ cruiseId: cabin.cruise.id }} cabinId={inventoryCabinId(locale, cabin)} layout="mobile" />
      </main>

      <SiteFooter {...chrome} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'HotelRoom',
          '@id': absoluteUrl(url),
          url: absoluteUrl(url),
          name: cabin.name,
          description: cabin.summary ?? undefined,
          image: photos.map((p) => absoluteImageUrl(p.src)),
          ...(cabin.area != null && { floorSize: { '@type': 'QuantitativeValue', value: cabin.area, unitCode: 'MTK' } }),
          ...(cabin.capacity != null && { occupancy: { '@type': 'QuantitativeValue', maxValue: maxGuests } }),
          amenityFeature: cabin.amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a.name, value: true })),
          containedInPlace: { '@type': 'Accommodation', name: cabin.cruise.name, url: absoluteUrl(cruiseUrl) },
          ...(pricing.showPublic &&
            pricing.fromPrice != null && {
              offers: {
                '@type': 'Offer',
                priceCurrency: pricing.currency,
                price: pricing.fromPrice,
                url: absoluteUrl(bookingUrl),
                availability: 'https://schema.org/InStock',
              },
            }),
        }}
      />
    </>
  );
}
