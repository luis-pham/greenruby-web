'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cx } from '@/components/ui';
import type { Locale } from '@/lib/i18n';
import { bookingApi } from './api';
import { fmt, formatAmount, formatDate, type T } from './model';
import { paymentAllowed } from './format';
import { switchTarget } from './handoff';
import { classifyInitFailure, storePaymentAccess, type PaymentMethod, type PaymentPlan, termsLocale } from './payment';
import { dueNow, linkError, parseLinkInfo, type LinkError, type PaymentLinkInfo } from './pay-link';
import s from './booking.module.css';

type Load = { state: 'loading' } | { state: 'error'; error: LinkError } | { state: 'ready'; info: PaymentLinkInfo };

/**
 * /booking/pay?t=…: the guest pays the balance, or accepts the Booking Terms and pays for a booking our
 * team arranged (TPX decisions 3 and 6). Amounts come from the CMS; the gateway return goes back to
 * /booking, which already shows the payment outcome.
 */
export function PayLinkForm({ locale, t, bookingHref, termsHref, privacyHref, termsVersion }: {
  locale: Locale;
  t: T;
  bookingHref: string;
  termsHref: string;
  privacyHref: string;
  termsVersion: string | null;
}) {
  const p = t.pay;
  const token = useSearchParams().get('t') ?? '';
  const [load, setLoad] = useState<Load>(() => (token ? { state: 'loading' } : { state: 'error', error: 'invalid' }));
  const [plan, setPlan] = useState<PaymentPlan>('deposit');
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Language switcher: keep the payment link token on the other language's /booking/pay (handoff.ts).
  useEffect(() => {
    if (!token) return;
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest?.('a[hreflang]') as HTMLAnchorElement | null;
      if (!anchor || !switchTarget(anchor.href, locale, '/pay', window.location.origin)) return;
      anchor.href = `${new URL(anchor.href, window.location.origin).pathname}?t=${encodeURIComponent(token)}`;
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [token, locale]);

  useEffect(() => {
    if (!token) return;
    // Payment guard (CMS booking.payment_locales): en/vi skip the policy call and behave as before.
    const allowed = paymentAllowed(null, locale) ? Promise.resolve(true) : bookingApi.policy().then((policy) => paymentAllowed(policy, locale));
    Promise.all([bookingApi.paymentLink(token), allowed])
      .then(([{ status, data }, canPay]) => {
        if (!canPay) return setLoad({ state: 'error', error: 'unavailable' });
        const info = parseLinkInfo(data);
        if (!info) return setLoad({ state: 'error', error: linkError(status, data) });
        setMethod(info.methods[0] ?? null);
        setPlan(info.plans[0]?.plan ?? 'full');
        setLoad({ state: 'ready', info });
      })
      .catch(() => setLoad({ state: 'error', error: 'generic' }));
  }, [token, locale]);

  if (load.state === 'loading') {
    return <p className={s.loadingPanel} role="status">{p.loading}</p>;
  }
  if (load.state === 'error') {
    return (
      <div className={s.panel}>
        <p className={s.errorBox} role="alert">{p.errors[load.error]}</p>
      </div>
    );
  }

  const { info } = load;
  const b = info.booking;
  const price = (v: number) => formatAmount(v, b.currency, locale);
  const chosen = info.plans.find((x) => x.plan === plan) ?? info.plans[0];

  async function submit() {
    if (!method) return;
    if (info.termsRequired && !accepted) {
      setError(t.errors.termsRequired);
      document.getElementById('pay-terms-accept')?.focus();
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const { ok, data } = await bookingApi.payPaymentLink({
        t: token,
        method,
        ...(info.purpose === 'booking' ? { payment_plan: chosen?.plan ?? 'full' } : {}),
        return_base: window.location.origin + bookingHref,
        ...(info.termsRequired ? { terms: { accepted: true as const, version: termsVersion, locale: termsLocale(locale) } } : {}),
        locale,
      });
      if (ok && data?.success && typeof data.payment_url === 'string') {
        if (typeof data.internal_tx_id === 'string') {
          let storage: Storage | null = null;
          try {
            storage = window.sessionStorage;
          } catch {
            storage = null;
          }
          storePaymentAccess(storage, data.internal_tx_id, typeof data.status_token === 'string' ? data.status_token : null);
        }
        window.location.href = data.payment_url;
        return;
      }
      const failure = classifyInitFailure(data);
      setError(
        failure === 'terms' ? t.errors.termsRequired
          : failure === 'termsUpdated' ? t.errors.termsUpdated
            : failure === 'unavailable' ? t.errors.bookingUnavailable
              : failure === 'paymentLocale' ? p.errors.unavailable
              : data?.code === 'nothing_due' ? p.errors.nothingDue
                : t.errors.paymentFailed,
      );
    } catch {
      setError(t.errors.connection);
    }
    setBusy(false);
  }

  return (
    <form
      className={s.panel}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <div className={s.intro}>
        <span className={s.eyebrowGold}>{fmt(p.reference, { code: b.code })}</span>
        <h2>{info.purpose === 'balance' ? p.titleBalance : p.titleBooking}</h2>
        <p>{info.purpose === 'balance' ? fmt(p.introBalance, { date: formatDate(locale, b.balanceDueDate ?? '') }) : p.introBooking}</p>
      </div>

      <dl className={s.reviewGrid}>
        <div className={s.reviewField}><dt>{t.review.leadGuest}</dt><dd>{b.fullName}</dd></div>
        <div className={s.reviewField}><dt>{t.review.voyage}</dt><dd>{b.voyage || '—'}</dd></div>
        <div className={s.reviewField}><dt>{t.review.departure}</dt><dd>{formatDate(locale, b.departureDate)}</dd></div>
        <div className={s.reviewField}><dt>{p.total}</dt><dd>{price(b.total)}</dd></div>
        {info.purpose === 'balance' && (
          <>
            <div className={s.reviewField}><dt>{p.received}</dt><dd>{price(b.paid)}</dd></div>
            <div className={s.reviewField}><dt>{t.review.balance}</dt><dd>{price(b.balance)}</dd></div>
          </>
        )}
      </dl>

      {info.purpose === 'booking' && info.plans.length > 0 && (
        <fieldset className={s.block}>
          <legend className={s.blockLegend}>{t.planHeading}</legend>
          {info.plans.length > 1 ? (
            <div className={s.choiceGrid}>
              {info.plans.map((x) => (
                <label key={x.plan} className={cx(s.choice, chosen?.plan === x.plan && s.choiceSelected)}>
                  <input type="radio" name="pay-plan" value={x.plan} checked={chosen?.plan === x.plan} onChange={() => setPlan(x.plan)} />
                  <span>
                    <strong>{fmt(t.plans[x.plan].title, { percent: String(Math.round((x.amountDueNow / (b.total || 1)) * 100)) })} · {price(x.amountDueNow)}</strong>
                    <span>{fmt(t.plans[x.plan].subtitle, { date: formatDate(locale, x.balanceDueDate ?? '') })}</span>
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <p className={s.note}>{p.fullOnly}</p>
          )}
        </fieldset>
      )}

      <fieldset className={s.block}>
        <legend className={s.blockLegend}>{t.methodHeading}</legend>
        <div className={s.paymentGrid}>
          {info.methods.map((m) => (
            <label key={m} className={cx(s.payTile, method === m && s.choiceSelected)}>
              <input type="radio" name="pay-method" value={m} checked={method === m} onChange={() => setMethod(m)} />
              <span>
                <strong>{t.methods[m].title}</strong>
                <span>{t.methods[m].hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {info.termsRequired && (
        <div className={s.termsAccept}>
          <input type="checkbox" id="pay-terms-accept" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
          {/* ja: draft acceptance wording (LEGAL_REVIEW_REQUIRED) of the ENGLISH Booking Terms; recorded as 'en'. */}
          <label htmlFor="pay-terms-accept">
            {t.termsAccept}
            {t.wordSep}
            <a href={termsHref} target="_blank" rel="noopener">{t.termsAcceptLink}</a>
            {t.wordSep}
            {t.termsAcceptAnd}
            {t.wordSep}
            <a href={privacyHref} target="_blank" rel="noopener">{t.privacyLink}</a>
            {t.termsAcceptEnd}
          </label>
        </div>
      )}

      <div aria-live="assertive" className={s.liveRegion}>
        {error && <p className={s.errorBox} role="alert">{error}</p>}
      </div>

      <div className={s.controlBar}>
        <span className={s.fieldHint}>{fmt(p.dueNow, { amount: price(dueNow(info, chosen?.plan ?? null)) })}</span>
        <button type="submit" className={s.mainBtn} disabled={busy || !method} aria-busy={busy}>
          {busy ? t.redirecting : p.submit} <span aria-hidden="true">↗︎</span>
        </button>
      </div>
    </form>
  );
}
