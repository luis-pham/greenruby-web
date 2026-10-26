import { Suspense } from 'react';
import { PageIntro, SiteFooter, type Chrome } from '@/components/layout';
import { homePath, sectionPath } from '@/lib/i18n';
import { siteInfo } from '@/lib/site-info';
import { bookingTermsLinked, bookingTermsVersion } from '@/views/legal/booking-terms';
import { BookingWizard } from './BookingWizard';
import { StepsBar } from './StepsBar';
import s from './booking.module.css';

// Photography already used by the CMS (homepage banner); shown in the wizard's summary.
const HERO_IMAGE = '/upload/2026/06/08/green-ruby-cruises-halong-bay-1.jpg';

/**
 * Booking page. The page intro, footer and the wizard's loading state are prerendered; the wizard itself
 * renders in the browser because it depends on the query string (prefill and payment return).
 */
export function BookingView({ chrome }: { chrome: Chrome }) {
  const { locale, t, site } = chrome;
  const b = t.booking;
  const info = siteInfo(site);
  const path = sectionPath(locale, 'booking');

  return (
    <>
      <PageIntro
        chrome={chrome}
        currentHref={path}
        crumbs={[{ label: t.breadcrumb.home, href: homePath(locale) }, { label: b.crumb, href: path }]}
        eyebrow={b.heroEyebrow}
        title={<>{b.heroTitle} <em>{b.heroTitleEm}</em></>}
        lead={b.heroIntro}
      />

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
          terms={{ href: sectionPath(locale, 'bookingTerms'), published: bookingTermsLinked(), version: bookingTermsVersion() }}
          image={HERO_IMAGE}
        />
      </Suspense>

      <SiteFooter {...chrome} />
    </>
  );
}
