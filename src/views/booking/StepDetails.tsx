'use client';

import type { Dispatch } from 'react';
import { cx, SmartLink } from '@/components/ui';
import type { Locale } from '@/lib/i18n';
import { durationLabel, fmt, formatDate, guestsText, pricedRooms, selectedAmenities, type T } from './model';
import { PAYMENT_METHODS } from './payment';
import { formatPrice, type Currency } from './pricing';
import { FieldError } from './StepBookingInfo';
import type { Action, Confirmation, State } from './state';
import s from './booking.module.css';

type Props = { t: T; locale: Locale; state: State; dispatch: Dispatch<Action>; currency: Currency };

export function StepGuest({ t, state, dispatch, privacyHref }: Props & { privacyHref: string }) {
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
      </p>
    </section>
  );
}

export function StepConfirmation({ t, state, dispatch }: Props) {
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
    </>
  );
}

export function StepReview({ t, locale, state, currency }: Props) {
  const price = (value: number) => formatPrice(value, currency);
  const rooms = pricedRooms(state, currency);
  const amenities = selectedAmenities(state, currency);
  const total = rooms.reduce((sum, r) => sum + r.unitPrice, 0) + amenities.reduce((sum, a) => sum + a.total, 0);
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
  ];

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
    </div>
  );
}

export function OutcomePanel({
  t,
  outcome,
  checking,
  reference,
  homeHref,
  bookingHref,
}: {
  t: T;
  outcome: 'success' | 'pending' | 'error';
  checking: boolean;
  reference: string | null;
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
