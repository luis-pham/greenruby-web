import { Suspense } from 'react';
import { PageIntro, SiteFooter, type Chrome } from '@/components/layout';
import { homePath, sectionPath } from '@/lib/i18n';
import { bookingTermsVersion } from '@/views/legal/booking-terms';
import { PayLinkForm } from './PayLinkForm';
import s from './booking.module.css';

/** /booking/pay: the page a payment link email opens. The form reads the token in the browser. */
export function PayView({ chrome }: { chrome: Chrome }) {
  const { locale, t } = chrome;
  const b = t.booking;
  const bookingHref = sectionPath(locale, 'booking');
  const path = `${bookingHref}/pay`;

  return (
    <>
      <PageIntro
        chrome={chrome}
        currentHref={path}
        crumbs={[{ label: t.breadcrumb.home, href: homePath(locale) }, { label: b.crumb, href: bookingHref }, { label: b.pay.crumb, href: path }]}
        eyebrow={b.heroEyebrow}
        title={<>{b.pay.heroTitle} <em>{b.pay.heroTitleEm}</em></>}
        lead={b.pay.heroIntro}
      />
      <main className={s.main}>
        <div className="container">
          <Suspense fallback={<p className={s.loadingPanel} role="status">{b.pay.loading}</p>}>
            <PayLinkForm
              locale={locale}
              t={b}
              bookingHref={bookingHref}
              termsHref={sectionPath(locale, 'bookingTerms')}
              privacyHref={sectionPath(locale, 'privacyPolicy')}
              termsVersion={bookingTermsVersion()}
            />
          </Suspense>
        </div>
      </main>
      <SiteFooter {...chrome} />
    </>
  );
}
