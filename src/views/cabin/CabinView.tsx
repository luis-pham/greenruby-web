import Image from 'next/image';
import { PageHero, SiteFooter, type Chrome } from '@/components/layout';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, cx, SectionHeading, SmartLink, TextLink } from '@/components/ui';
import type { Cabin, CabinSummary } from '@/lib/api/schemas';
import { detailPath, homePath, sectionPath, type Locale } from '@/lib/i18n';
import { absoluteImageUrl, absoluteUrl } from '@/lib/site-url';
import s from './cabin.module.css';

export function cabinPath(locale: Locale, cabin: Pick<CabinSummary, 'slug' | 'id'>): string {
  return detailPath(locale, 'cabin', cabin.slug, cabin.id);
}

function formatPrice(value: number, currency: 'USD' | 'VND', locale: Locale) {
  return new Intl.NumberFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

const pad = (n: number) => String(n).padStart(2, '0');

export function CabinView({ cabin, chrome }: { cabin: Cabin; chrome: Chrome }) {
  const { locale, t } = chrome;
  const c = t.cabin;
  const url = cabinPath(locale, cabin);
  const cruiseUrl = detailPath(locale, 'cruise', cabin.cruise.slug, cabin.cruise.id);
  const bookingUrl = `${sectionPath(locale, 'booking')}?cabin_id=${cabin.id}`;
  const contactUrl = sectionPath(locale, 'contact');
  const extra = cabin.overCapacity.adult + cabin.overCapacity.child6to12 + cabin.overCapacity.child2to5 + cabin.overCapacity.infant;
  const { pricing } = cabin;
  const durations = [...new Set(pricing.matrix.map((r) => r.duration))].sort((a, b) => a - b);
  const guests = [...new Set(pricing.matrix.map((r) => r.guest))].sort((a, b) => a - b);
  const priceOf = (d: number, g: number) => pricing.matrix.find((r) => r.duration === d && r.guest === g)?.price;
  // The gallery grid is laid out for at most 6 photos: one large, two stacked, three across.
  const photos = [...(cabin.image ? [{ src: cabin.image, alt: cabin.name }] : []), ...cabin.gallery].slice(0, 6);

  const tabs = [
    { id: 'overview', label: c.tabs.overview, show: true },
    { id: 'space', label: c.tabs.space, show: cabin.rooms.length > 0 },
    { id: 'amenities', label: c.tabs.amenities, show: cabin.amenities.length > 0 },
    { id: 'gallery', label: c.tabs.gallery, show: photos.length > 1 },
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
        title={cabin.name}
        subtitle={cabin.summary}
        actions={
          <>
            <ButtonLink href={bookingUrl}>{c.checkAvailability}</ButtonLink>
            <TextLink href={cruiseUrl} inverse>{`${c.discoverShip} ${cabin.cruise.name}`}</TextLink>
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
                <dd><span className={s.factValue}>{cabin.capacity} {c.guestUnit(cabin.capacity)}</span><span className={s.factCaption}>{c.guestsCaption(extra)}</span></dd>
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
          <div className={cx('container', s.overview)}>
            <div>
              <SectionHeading id="overview-title" eyebrow={c.overviewEyebrow} title={c.overviewHeading(cabin.name)} stacked />
              {cabin.contentHtml ? (
                <div className={s.prose} dangerouslySetInnerHTML={{ __html: cabin.contentHtml }} />
              ) : (
                cabin.summary && <p className={s.lead}>{cabin.summary}</p>
              )}
            </div>
            <aside className={s.glance} aria-labelledby="glance-title">
              <h3 id="glance-title">{c.atAGlance}</h3>
              <dl>
                <div className={s.glanceRow}><dt>{c.glance.ship}</dt><dd><SmartLink href={cruiseUrl}>{cabin.cruise.name}</SmartLink></dd></div>
                {cabin.cabinClass && <div className={s.glanceRow}><dt>{c.glance.category}</dt><dd>{cabin.cabinClass}</dd></div>}
                {cabin.view && <div className={s.glanceRow}><dt>{c.glance.view}</dt><dd>{cabin.view}</dd></div>}
                {cabin.area != null && <div className={s.glanceRow}><dt>{c.glance.area}</dt><dd>{cabin.area} m²</dd></div>}
                {cabin.capacity != null && <div className={s.glanceRow}><dt>{c.glance.occupancy}</dt><dd>{cabin.capacity} {c.guestUnit(cabin.capacity).toLowerCase()}</dd></div>}
                <div className={s.glanceRow}><dt>{c.glance.extraGuests}</dt><dd>{c.extraGuests(cabin.overCapacity)}</dd></div>
                {cabin.suitableFor.length > 0 && (
                  <div className={s.glanceRow}><dt>{c.glance.suitableFor}</dt><dd>{cabin.suitableFor.map((a) => a.name).join(', ')}</dd></div>
                )}
              </dl>
              <ButtonLink href={bookingUrl} variant="dark" className={s.glanceCta}>{c.checkAvailability}</ButtonLink>
            </aside>
          </div>
        </section>

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

        {cabin.amenities.length > 0 && (
          <section className={cx(s.section, s.alt)} id="amenities" aria-labelledby="amenities-title">
            <div className="container">
              <SectionHeading id="amenities-title" eyebrow={c.amenitiesEyebrow} title={c.amenitiesHeading} />
              <ul className={s.amenities}>
                {cabin.amenities.map((amenity) => (
                  <li key={amenity.name} className={s.amenity}>
                    {amenity.icon ? (
                      <Image src={amenity.icon} alt="" width={28} height={28} className={s.amenityIcon} />
                    ) : (
                      <span className={s.amenityDot} aria-hidden="true" />
                    )}
                    {amenity.name}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {photos.length > 1 && (
          <section className={s.section} id="gallery" aria-labelledby="gallery-title">
            <div className="container">
              <SectionHeading id="gallery-title" eyebrow={c.galleryEyebrow} title={c.galleryHeading} />
              <div className={s.gallery}>
                {photos.map((photo, i) => (
                  <figure key={photo.src + i} className={s.galleryItem}>
                    <Image
                      src={photo.src}
                      alt={photo.alt ?? cabin.name}
                      fill
                      sizes={i === 0 ? '(max-width: 600px) 100vw, 66vw' : '(max-width: 600px) 100vw, 33vw'}
                    />
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className={cx(s.section, s.surface)} id="rates" aria-labelledby="rates-title">
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
                </div>
                <ButtonLink href={contactUrl}>{c.requestQuote}</ButtonLink>
              </div>
            )}
          </div>
        </section>

        {cabin.otherCabins.length > 0 && (
          <section className={s.section} id="more" aria-labelledby="more-title">
            <div className="container">
              <SectionHeading id="more-title" eyebrow={c.moreEyebrow} title={c.moreHeading} />
              <div className={s.cards}>
                {cabin.otherCabins.slice(0, 3).map((other) => (
                  <article key={other.id} className={s.card}>
                    <div className={s.cardPhoto}>
                      {other.image && <Image src={other.image} alt={other.name} fill sizes="(max-width: 600px) 100vw, (max-width: 1160px) 50vw, 33vw" />}
                    </div>
                    <div className={s.cardBody}>
                      <div className={s.cardMeta}>
                        <span>{other.view}</span>
                        {other.area != null && <strong>{other.area} m²</strong>}
                      </div>
                      <h3>{other.name}</h3>
                      {other.summary && <p>{other.summary}</p>}
                      <span className={s.cardLink}><TextLink href={cabinPath(locale, other)}>{c.viewCabin}</TextLink></span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className={s.cta} aria-labelledby="cta-title">
          {cabin.image && <Image src={cabin.image} alt="" fill sizes="100vw" className={s.ctaImage} />}
          <div className={s.ctaInner}>
            <SectionHeading id="cta-title" eyebrow={c.ctaEyebrow} title={c.ctaHeading} inverse stacked />
            <p>{c.ctaBody}</p>
            <div className={s.ctaLinks}>
              <ButtonLink href={bookingUrl}>{c.ctaPrimary}</ButtonLink>
              <ButtonLink href={contactUrl} variant="lightOutline" arrow={false}>{c.ctaSecondary}</ButtonLink>
            </div>
          </div>
        </section>
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
          ...(cabin.capacity != null && { occupancy: { '@type': 'QuantitativeValue', maxValue: cabin.capacity + extra } }),
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
