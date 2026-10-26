'use client';

import type { Dispatch } from 'react';
import { cx, SmartLink } from '@/components/ui';
import type { Locale } from '@/lib/i18n';
import { durationLabel, fmt, formatDate, guestsText, pricedRooms, selectedAmenities, type T } from './model';
import type { ServerBooking } from './api';
import { dateBefore, effectivePlan, PAYMENT_METHODS, planOptions, splitAmount, type PaymentPlan } from './payment';
import { formatPrice, type Currency } from './pricing';
import { FieldError } from './StepBookingInfo';
import type { Action, Confirmation, State } from './state';
import s from './booking.module.css';

type Props = { t: T; locale: Locale; state: State; dispatch: Dispatch<Action>; currency: Currency };

/** Estimated total shown to the guest (the server recomputes it). */
function estimatedTotal(state: State, currency: Currency): number {
  return pricedRooms(state, currency).reduce((sum, r) => sum + r.unitPrice, 0) + selectedAmenities(state, currency).reduce((sum, a) => sum + a.total, 0);
}

/** Deposit or full payment, once the server offers deposits; null while it does not. */
function planView(state: State, currency: Currency) {
  const options = planOptions(state.policy, state.date);
  const plan = effectivePlan(options, state.paymentPlan);
  if (!options || !plan || !state.policy) return null;
  const percent = state.policy.depositPercent;
  const total = estimatedTotal(state, currency);
  const balanceDue = dateBefore(state.date, state.policy.balanceDaysBefore);
  return { options, plan, percent, balanceDue, days: state.policy.depositMinDays, ...splitAmount(total, currency, plan, percent) };
}

export function StepGuest({ t, state, dispatch, privacyHref, termsHref }: Props & { privacyHref: string; termsHref?: string }) {
  const { errors } = state;
  const field = (
    name: 'fullName' | 'email' | 'phone',
    label: string,
    props: { type?: string; autoComplete: string; placeholder: string; maxLength: number; inputMode?: 'tel' | 'email' },
    wide = false,
  ) => (
    <div className={cx(s.field, wide && s.wide)}>
      <label htmlFor={`guest-${name}`}>
        {label} <span className={s.required} aria-hidden="true">*</span>
      </label>
      <input
        id={`guest-${name}`}
        name={name}
        {...props}
        required
        value={state.guest[name]}
        onChange={(e) => dispatch({ type: 'setGuestField', field: name, value: e.target.value })}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? `guest-${name}-error` : undefined}
      />
      <FieldError id={`guest-${name}-error`} message={errors[name]} />
    </div>
  );

  return (
    <section className={s.block} aria-labelledby="booking-guest-title">
      <div className={s.blockTitle}>
        <h3 id="booking-guest-title">
          <span className={s.sectionNumber}>01</span> {t.leadGuest}
        </h3>
      </div>
      <div className={s.guestGrid}>
        {field('fullName', t.fullName, { autoComplete: 'name', placeholder: t.fullNamePlaceholder, maxLength: 100 }, true)}
        {field('email', t.email, { type: 'email', autoComplete: 'email', placeholder: t.emailPlaceholder, maxLength: 100, inputMode: 'email' })}
        {field('phone', t.phone, { type: 'tel', autoComplete: 'tel', placeholder: t.phonePlaceholder, maxLength: 20, inputMode: 'tel' })}
      </div>
      <p className={s.fieldHint}>
        {t.privacyNote} <SmartLink href={privacyHref}>{t.privacyLink}</SmartLink>.
        {termsHref && (
          <>
            {' '}
            {t.termsNote} <SmartLink href={termsHref}>{t.termsLink}</SmartLink>.
          </>
        )}
      </p>
    </section>
  );
}

export function StepConfirmation({ t, locale, state, dispatch, currency }: Props) {
  const pv = planView(state, currency);
  const choice = (value: Confirmation) => (
    <label className={cx(s.choice, state.confirmation === value && s.choiceSelected)}>
      <input type="radio" name="confirmation" value={value} checked={state.confirmation === value} onChange={() => dispatch({ type: 'setConfirmation', value })} />
      <span>
        <strong>{t.confirmation[value].title}</strong>
        <span>{t.confirmation[value].subtitle}</span>
      </span>
    </label>
  );

  return (
    <>
      <fieldset className={s.block}>
        <legend className={s.blockLegend}>
          <span className={s.sectionNumber}>01</span> {t.confirmationHeading}
        </legend>
        <div className={s.choiceGrid}>
          {choice('direct')}
          {choice('inquiry')}
        </div>
        {state.confirmation === 'inquiry' && <p className={s.note}>{t.inquiryNotice}</p>}
      </fieldset>

      {state.confirmation === 'direct' && (
        <fieldset className={s.block}>
          <legend className={s.blockLegend}>
            <span className={s.sectionNumber}>02</span> {t.methodHeading}
          </legend>
          <p className={s.fieldHint} id="booking-currency-notice">
            {t.currencyNotice}
          </p>
          <div className={s.paymentGrid}>
            {PAYMENT_METHODS.map((method) => (
              <label key={method} className={cx(s.payTile, state.method === method && s.choiceSelected)}>
                <input
                  type="radio"
                  name="payment-method"
                  value={method}
                  checked={state.method === method}
                  onChange={() => dispatch({ type: 'setMethod', value: method })}
                  aria-describedby="booking-currency-notice"
                />
                <span>
                  <strong>{t.methods[method].title}</strong>
                  <span>{t.methods[method].hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {state.confirmation === 'direct' && pv && (
        <fieldset className={s.block}>
          <legend className={s.blockLegend}>
            <span className={s.sectionNumber}>03</span> {t.planHeading}
          </legend>
          {pv.options.length > 1 ? (
            <div className={s.choiceGrid}>
              {pv.options.map((value: PaymentPlan) => (
                <label key={value} className={cx(s.choice, pv.plan === value && s.choiceSelected)}>
                  <input type="radio" name="payment-plan" value={value} checked={pv.plan === value} onChange={() => dispatch({ type: 'setPlan', value })} />
                  <span>
                    <strong>{fmt(t.plans[value].title, { percent: String(pv.percent) })}</strong>
                    <span>{fmt(t.plans[value].subtitle, { date: formatDate(locale, pv.balanceDue) })}</span>
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <p className={s.note}>{fmt(t.planFullOnly, { days: String(pv.days) })}</p>
          )}
        </fieldset>
      )}
    </>
  );
}

export function StepReview({ t, locale, state, dispatch, currency, termsHref, privacyHref }: Props & { termsHref: string; privacyHref: string }) {
  const price = (value: number) => formatPrice(value, currency);
  const rooms = pricedRooms(state, currency);
  const amenities = selectedAmenities(state, currency);
  const total = estimatedTotal(state, currency);
  const pv = state.confirmation === 'direct' ? planView(state, currency) : null;
  const it = state.itinerary;
  const rows: [string, string][] = [
    [t.review.voyage, it ? [it.name, it.cruise_name, durationLabel(t, it.duration)].filter(Boolean).join(' · ') : '—'],
    [t.review.departure, formatDate(locale, state.date) || '—'],
    [t.review.cabins, rooms.map(({ cabin, room, unitPrice }) => `${cabin.name} (${guestsText(t, room.guests)}) – ${price(unitPrice)}`).join('; ') || '—'],
    [t.review.amenities, amenities.map((a) => `${a.amenity.name} × ${a.quantity} – ${price(a.total)}`).join('; ') || t.none],
    [t.review.leadGuest, state.guest.fullName.trim()],
    [t.review.contact, [state.guest.email.trim(), state.guest.phone.trim()].filter(Boolean).join(' · ')],
    [
      t.review.confirmation,
      state.confirmation === 'inquiry' ? t.confirmation.inquiry.title : `${t.confirmation.direct.title} · ${t.methods[state.method].title}`,
    ],
    [t.review.total, price(total)],
    ...(pv?.plan === 'deposit'
      ? ([
          [t.review.dueNow, price(pv.dueNow)],
          [t.review.balance, fmt(t.balanceBy, { amount: price(pv.balance), date: formatDate(locale, pv.balanceDue) })],
        ] as [string, string][])
      : []),
  ];
  const termsError = state.errors.terms;

  return (
    <div className={s.finish}>
      <div className={s.finishEmblem} aria-hidden="true">
        ✓
      </div>
      <span className={s.eyebrowGold}>{t.reviewEyebrow}</span>
      <h3>{t.reviewHeading}</h3>
      <dl className={s.reviewGrid}>
        {rows.map(([label, value]) => (
          <div key={label} className={s.reviewField}>
            <dt>{label}</dt>
            <dd>{value || '—'}</dd>
          </div>
        ))}
      </dl>
      <p className={s.note}>{state.confirmation === 'inquiry' ? t.reviewNoteInquiry : fmt(t.reviewNotePayment, { method: t.methods[state.method].title })}</p>
      {state.policy?.termsRequired && (
        <div className={s.termsAccept}>
          <input
            type="checkbox"
            id="booking-terms-accept"
            checked={state.termsAccepted}
            onChange={(e) => dispatch({ type: 'setTermsAccepted', value: e.target.checked })}
            aria-invalid={termsError ? true : undefined}
            aria-describedby={termsError ? 'booking-terms-error' : undefined}
          />
          <label htmlFor="booking-terms-accept">
            {t.termsAccept}{' '}
            <a href={termsHref} target="_blank" rel="noopener">
              {t.termsAcceptLink}
            </a>{' '}
            {t.termsAcceptAnd}{' '}
            <a href={privacyHref} target="_blank" rel="noopener">
              {t.privacyLink}
            </a>
            .
          </label>
          {termsError && (
            <p id="booking-terms-error" className={s.termsError}>
              {termsError}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function OutcomePanel({
  t,
  outcome,
  checking,
  reference,
  booking,
  locale,
  homeHref,
  bookingHref,
}: {
  t: T;
  outcome: 'success' | 'pending' | 'error';
  checking: boolean;
  reference: string | null;
  booking: ServerBooking | null;
  locale: Locale;
  homeHref: string;
  bookingHref: string;
}) {
  const o = t.outcome;
  const title = outcome === 'success' ? o.successTitle : outcome === 'pending' ? o.pendingTitle : o.failedTitle;
  const message = outcome === 'success' ? o.successMessage : outcome === 'pending' ? o.pendingMessage : o.failedMessage;
  return (
    <section className={cx(s.finish, s.outcome, outcome === 'error' && s.outcomeError)} aria-labelledby="booking-step-title" aria-busy={checking}>
      <div className={s.finishEmblem} aria-hidden="true">
        {outcome === 'success' ? '✓' : outcome === 'pending' ? '⧗' : '!'}
      </div>
      <h2 id="booking-step-title" tabIndex={-1} className={s.outcomeTitle}>
        {title}
      </h2>
      <div role="status" aria-live="polite">
        <p>{checking ? o.checking : message}</p>
        {reference && (
          <p>
            {o.reference}: <strong>{reference}</strong>
          </p>
        )}
        {!checking && outcome === 'success' && booking?.payment_plan === 'deposit' && (booking.balance_amount ?? 0) > 0 && booking.balance_due_date && (
          <p>
            {fmt(o.depositReceived, {
              amount: formatPrice(booking.balance_amount ?? 0, booking.currency === 'vnd' ? 'vnd' : 'usd'),
              date: formatDate(locale, booking.balance_due_date),
            })}
          </p>
        )}
      </div>
      <div className={s.lastActions}>
        <SmartLink href={homeHref} className={s.mainBtn}>
          {o.backHome}
        </SmartLink>
        <a href={bookingHref} className={s.ghostBtn}>
          {o.startOver}
        </a>
      </div>
    </section>
  );
}
