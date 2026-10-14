import Image from 'next/image';
import { PageHero, SiteFooter, type Chrome } from '@/components/layout';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink, cx, Eyebrow, SmartLink, TextLink } from '@/components/ui';
import { experiencePath, homePath, sectionPath } from '@/lib/i18n';
import { siteInfo } from '@/lib/site-info';
import { absoluteImageUrl, absoluteUrl } from '@/lib/site-url';
import { categoryKey, galleryPath, placeItems, type Gallery } from './data';
import { GalleryGrid } from './GalleryGrid';
import { galleryMessages } from './messages';
import { VirtualTour } from './VirtualTour';
import s from './gallery.module.css';

const pad = (n: number) => String(n).padStart(2, '0');
const mediaOrigin = process.env.NEXT_PUBLIC_MEDIA_ORIGIN ?? '';

/** Full-size image for the lightbox (and the no-JS link target), resized by Laravel's /thumbnail proxy. */
const largeImage = (src: string) => (/^https?:\/\//.test(src) ? src : `${mediaOrigin}/thumbnail${src}?w=1920&q=85`);
const mediaFile = (src: string) => (/^https?:\/\//.test(src) ? src : `${mediaOrigin}${src}`);

// Photography already used by the CMS homepage banner (the gallery page config has no hero image).
const HERO_IMAGE = '/upload/2026/03/13/banner-home.png';

export function GalleryView({ gallery, chrome }: { gallery: Gallery; chrome: Chrome }) {
  const { locale, t, site } = chrome;
  const g = galleryMessages[locale];
  const info = siteInfo(site);
  const hubPath = sectionPath(locale, 'gallery');
  const { pagination, categories, canonicalCategorySlug: current } = gallery;
  const category = categories.find((c) => c.slug === current) ?? null;
  const key = current ? categoryKey(current) : null;
  const { items: placed, photoTotal } = placeItems(gallery);
  const photos = placed.filter((i) => i.type !== '360');
  const tours = placed.filter((i) => i.type === '360');
  const altOf = (item: (typeof placed)[number]) =>
    item.alt ?? (item.category && item.indexInCategory ? g.photoAlt(item.category.name, item.indexInCategory, item.category.count) : g.photoAltGeneric);
  const pageHref = (page: number) => galleryPath(locale, current, page);
  const bridge = g.bridgeBody(info.name);

  return (
    <>
      <PageHero
        chrome={chrome}
        currentHref={hubPath}
        image={HERO_IMAGE}
        imageAlt=""
        crumbs={[
          { label: t.breadcrumb.home, href: homePath(locale) },
          { label: g.breadcrumb, href: hubPath },
          ...(category ? [{ label: category.name, href: galleryPath(locale, category.slug) }] : []),
        ]}
        eyebrow={g.heroEyebrow}
        title={<>{g.heroTitle} <em>{g.heroTitleEm}</em></>}
        description={g.heroBody}
        actions={
          <>
            <ButtonLink href="#collection">{g.heroPrimary}</ButtonLink>
            {tours.length > 0 && <TextLink href="#virtual" inverse>{g.heroSecondary}</TextLink>}
          </>
        }
      />

      <main>
        <section className={s.bridge} aria-label={g.bridgeLabel}>
          <div className={cx('container', s.bridgeLayout)}>
            <div className={s.bridgeSide}>
              <span className={s.bridgeGlyph} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2.7" y="5.5" width="18.6" height="14" rx="1.5" />
                  <circle cx="9" cy="10" r="1.4" />
                  <path d="m5.5 17 4-4 2.6 2.6 3.5-4.4 3 5.8" />
                </svg>
              </span>
              <p>
                <span className={s.bridgeKicker}>{g.bridgeKicker}</span>
                <span className={s.bridgeTitle}>{g.bridgeTitle}</span>
              </p>
            </div>
            <p className={s.bridgeCopy}>
              {bridge[0]}<strong>{bridge[1]}</strong>{bridge[2]}
            </p>
          </div>
        </section>

        <section className={s.gallery} id="collection" aria-labelledby="collection-title">
          <div className="container">
            <div className={s.head}>
              <div>
                <Eyebrow>{g.listEyebrow}</Eyebrow>
                <h2 className={s.heading} id="collection-title">
                  {category ? category.name : <>{g.listTitle} <em>{g.listTitleEm}</em></>}
                </h2>
              </div>
              <p>{key ? g.categoryCopy[key] : g.listBody}</p>
            </div>

            {categories.length > 1 && (
              <nav className={s.filters} aria-label={g.filterLabel}>
                <span className={s.filterLabel}>{g.browseBy}</span>
                <SmartLink href={hubPath} className={s.filter} aria-current={current ? undefined : 'page'}>{g.all}</SmartLink>
                {categories.map((c) => (
                  <SmartLink
                    key={c.slug}
                    href={galleryPath(locale, c.slug)}
                    className={s.filter}
                    aria-current={c.slug === current ? 'page' : undefined}
                  >
                    {c.name}
                  </SmartLink>
                ))}
              </nav>
            )}

            <div className={s.meta}>
              <p className={s.count}>{g.showing(photos[0]?.photoNumber ?? 0, photos[photos.length - 1]?.photoNumber ?? 0, photoTotal)}</p>
              <p className={s.hint}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5" /></svg>
                {g.viewHint}
              </p>
            </div>

            {photos.length > 0 ? (
              <GalleryGrid
                className={s.grid}
                labels={g.lightbox}
                slides={photos.map((p) => ({ src: largeImage(p.src), alt: altOf(p), caption: p.category?.name ?? '' }))}
              >
                {photos.map((photo, i) => {
                  const alt = altOf(photo);
                  return (
                    <figure key={`${photo.src}-${i}`} className={s.card}>
                      <a href={largeImage(photo.src)} className={s.open} data-slide={i} aria-label={g.enlarge(alt)}>
                        <span className={s.photo}>
                          <Image src={photo.thumbnail} alt={alt} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />
                          <span className={s.zoom} aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5M10.5 8v5M8 10.5h5" /></svg>
                          </span>
                        </span>
                      </a>
                      <figcaption className={s.cardMeta}>
                        <span>{photo.category?.name ?? g.breadcrumb}</span>
                        <span className={s.cardNo}>{pad(photo.photoNumber)} / {pad(photoTotal)}</span>
                      </figcaption>
                    </figure>
                  );
                })}
              </GalleryGrid>
            ) : (
              <p className={s.empty}>{g.empty}</p>
            )}

            {pagination.lastPage > 1 && (
              <div className={s.more}>
                {pagination.page < pagination.lastPage ? (
                  <ButtonLink href={pageHref(pagination.page + 1)} variant="outline" arrow={false}>
                    {g.more} <span aria-hidden="true">↓</span>
                  </ButtonLink>
                ) : (
                  <small>{g.allSeen}</small>
                )}
                <nav className={s.pagination} aria-label={g.paginationLabel}>
                  {pagination.page > 1 && <SmartLink href={pageHref(pagination.page - 1)} rel="prev">← {g.previous}</SmartLink>}
                  {Array.from({ length: pagination.lastPage }, (_, i) => i + 1).map((n) => (
                    <SmartLink key={n} href={pageHref(n)} aria-current={n === pagination.page ? 'page' : undefined}>
                      {pad(n)}
                    </SmartLink>
                  ))}
                  {pagination.page < pagination.lastPage && <SmartLink href={pageHref(pagination.page + 1)} rel="next">{g.next} →</SmartLink>}
                </nav>
              </div>
            )}
          </div>
        </section>

        {tours.length > 0 && (
          <section className={s.virtual} id="virtual" aria-labelledby="virtual-title">
            <VirtualTour labels={g.viewer} tours={tours.map((tour) => ({ src: mediaFile(tour.src) }))} className={cx('container', s.virtualLayout)}>
              <div className={s.posters}>
                {tours.map((tour, i) => (
                  <a key={tour.src} href={mediaFile(tour.src)} className={s.poster} data-tour={i} aria-label={g.virtualOpen(i + 1)}>
                    <Image src={tour.thumbnail} alt="" fill sizes="(max-width: 900px) 100vw, 55vw" />
                    <span className={s.play} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="m7.5 4.5 12 7.5-12 7.5z" /></svg>
                    </span>
                    <span className={s.stamp}>{g.virtualStamp}{tours.length > 1 ? ` · ${pad(i + 1)}` : ''}</span>
                  </a>
                ))}
              </div>
              <div className={s.virtualCopy}>
                <Eyebrow inverse>{g.virtualEyebrow}</Eyebrow>
                <h2 className={s.heading} id="virtual-title">{g.virtualTitle} <em>{g.virtualTitleEm}</em></h2>
                <p>{g.virtualBody}</p>
                <ButtonLink href={mediaFile(tours[0].src)} data-tour={0}>{g.virtualCta}</ButtonLink>
                <div className={s.virtualNote}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" /></svg>
                  <span>{g.virtualNote}</span>
                </div>
              </div>
            </VirtualTour>
          </section>
        )}

        {gallery.featuredExperiences.length > 0 && (
          <section className={s.moments} aria-labelledby="moments-title">
            <div className="container">
              <div className={s.head}>
                <div>
                  <Eyebrow>{g.momentsEyebrow}</Eyebrow>
                  <h2 className={s.heading} id="moments-title">{g.momentsTitle} <em>{g.momentsTitleEm}</em></h2>
                </div>
                <p>{g.momentsBody}</p>
              </div>
              <div className={s.momentGrid}>
                {gallery.featuredExperiences.slice(0, 3).map((exp, i) => {
                  const url = experiencePath(locale, exp.slug, exp.id);
                  const image = exp.cover ?? exp.image;
                  return (
                    <article key={exp.id} className={s.moment}>
                      <SmartLink href={url} className={s.momentVisual} tabIndex={-1} aria-hidden="true">
                        {image && <Image src={image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />}
                      </SmartLink>
                      <span className={s.momentIndex}>{pad(i + 1)} / {exp.group?.name ?? g.momentFallbackTag}</span>
                      <h3><SmartLink href={url}>{exp.name}</SmartLink></h3>
                      {exp.summary && <p>{exp.summary}</p>}
                      <TextLink href={url}>{g.momentLink}</TextLink>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section className={s.closing} aria-labelledby="closing-title">
          <Image src={HERO_IMAGE} alt="" fill sizes="100vw" className={s.closingImage} />
          <Eyebrow inverse>{g.ctaEyebrow}</Eyebrow>
          <h2 className={s.heading} id="closing-title">{g.ctaTitle} <em>{g.ctaTitleEm}</em></h2>
          <p>{g.ctaBody}</p>
          <div className={s.closingActions}>
            <ButtonLink href={sectionPath(locale, 'itinerary')}>{g.ctaPrimary}</ButtonLink>
            <TextLink href={sectionPath(locale, 'booking')} inverse>{g.ctaSecondary}</TextLink>
          </div>
        </section>
      </main>

      <SiteFooter {...chrome} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ImageGallery',
          name: category ? `${category.name} · ${g.schemaName}` : g.schemaName,
          url: absoluteUrl(galleryPath(locale, current, pagination.page)),
          inLanguage: locale,
          image: photos.map((p) => ({
            '@type': 'ImageObject',
            contentUrl: absoluteImageUrl(p.src, 1920),
            thumbnailUrl: absoluteImageUrl(p.thumbnail, 640),
            name: altOf(p),
          })),
        }}
      />
    </>
  );
}
