import Image from 'next/image';
import { Suspense } from 'react';
import { Breadcrumb, SiteFooter, SiteNav, Topbar, type Chrome } from '@/components/layout';
import { cx, Eyebrow } from '@/components/ui';
import { homePath, sectionPath } from '@/lib/i18n';
import { siteInfo } from '@/lib/site-info';
import { BookingWizard } from './BookingWizard';
import { StepsBar } from './StepsBar';
import s from './booking.module.css';

// Photography already used by the CMS (homepage banner).
const HERO_IMAGE = '/upload/2026/06/08/green-ruby-cruises-halong-bay-1.jpg';

/**
 * Booking page. The hero, footer and the wizard's loading state are prerendered; the wizard itself
 * renders in the browser because it depends on the query string (prefill and payment return).
 */
export function BookingView({ chrome }: { chrome: Chrome }) {
  const { locale, t, site } = chrome;
  const b = t.booking;
  const info = siteInfo(site);
  const path = sectionPath(locale, 'booking');

  return (
    <>
      <Topbar site={site} t={t} />
      <header className={s.hero}>
        <div className="container">
          <SiteNav {...chrome} currentHref={path} />
        </div>
        <div className={cx('container', s.heroLayout)}>
          <div className={s.heroCopy}>
            <Breadcrumb label={t.breadcrumb.label} items={[{ label: t.breadcrumb.home, href: homePath(locale) }, { label: b.crumb, href: path }]} />
            <Eyebrow inverse>{b.heroEyebrow}</Eyebrow>
            <h1>
              {b.heroTitle} <em>{b.heroTitleEm}</em>
            </h1>
            <p>{b.heroIntro}</p>
          </div>
          <div className={s.heroImage}>
            <Image src={HERO_IMAGE} alt="" fill preload sizes="(max-width: 760px) 100vw, 50vw" quality={85} />
            <span className={s.heroCaption}>
              <span aria-hidden="true" />
              {b.heroCaption}
            </span>
          </div>
        </div>
      </header>

      <Suspense
        fallback={
          <>
            <StepsBar t={b} step={1} />
            <main className={s.main}>
              <div className="container">
                <p className={s.loadingPanel} role="status">
                  {b.loadingWizard}
                </p>
              </div>
            </main>
          </>
        }
      >
        <BookingWizard
          locale={locale}
          t={b}
          contact={{ hotline: info.hotline, hotlineHref: info.hotlineHref, email: info.email }}
          homeHref={homePath(locale)}
          bookingHref={path}
          privacyHref={sectionPath(locale, 'privacyPolicy')}
          image={HERO_IMAGE}
        />
      </Suspense>

      <SiteFooter {...chrome} />
    </>
  );
}
