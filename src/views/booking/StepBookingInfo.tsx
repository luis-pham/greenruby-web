'use client';

import Image from 'next/image';
import type { Dispatch } from 'react';
import { cx } from '@/components/ui';
import { detailPath, itineraryPath, type Locale } from '@/lib/i18n';
import { cabinDescription, durationLabel, fmt, formatDate, mediaSrc, pricedRooms, slugify, todayYmd, type T } from './model';
import { formatPrice, GUEST_TYPES, guestLimits, roundPrice, toCabinPricing, type Currency } from './pricing';
import { MAX_AMENITY_QTY, type Action, type State } from './state';
import s from './booking.module.css';

type Props = { t: T; locale: Locale; state: State; dispatch: Dispatch<Action>; currency: Currency; routeImage: string };

export function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p className={s.fieldError} id={id}>
      {message}
    </p>
  ) : null;
}

export function Stepper({
  value,
  max,
  label,
  increaseLabel,
  decreaseLabel,
  onChange,
}: {
  value: number;
  max: number;
  label: string;
  increaseLabel: string;
  decreaseLabel: string;
  onChange: (delta: 1 | -1) => void;
}) {
  return (
    <div className={s.qty} role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(-1)} disabled={value <= 0} aria-label={decreaseLabel}>
        −
      </button>
      <output aria-live="polite">{value}</output>
      <button type="button" onClick={() => onChange(1)} disabled={value >= max} aria-label={increaseLabel}>
        +
      </button>
    </div>
  );
}

export function StepBookingInfo({ t, locale, state, dispatch, currency, routeImage }: Props) {
  const { errors, itinerary } = state;
  const price = (value: number) => formatPrice(value, currency);
  const listed = state.enabledDates.length > 0;
  const dateOptions = listed && state.date && !state.enabledDates.includes(state.date) ? [state.date, ...state.enabledDates] : state.enabledDates;
  const rooms = pricedRooms(state, currency);
  const cabinErrors = Object.entries(errors).filter(([key]) => key === 'cabin' || key.startsWith('cabin_'));

  return (
    <>
      <section className={s.block} aria-labelledby="booking-date-title">
        <div className={s.blockTitle}>
          <h3 id="booking-date-title">
            <span className={s.sectionNumber}>01</span> {t.dateHeading}
          </h3>
        </div>
        <div className={s.dateGrid}>
          <div className={s.field}>
            <label htmlFor="booking-date">
              {t.dateLabel} <span className={s.required} aria-hidden="true">*</span>
            </label>
            {listed ? (
              <select
                id="booking-date"
                value={state.date}
                onChange={(e) => dispatch({ type: 'setDate', date: e.target.value })}
                aria-invalid={errors.date ? true : undefined}
                aria-describedby={cx('booking-date-hint', errors.date && 'booking-date-error')}
              >
                <option value="">{t.datePlaceholder}</option>
                {dateOptions.map((d) => (
                  <option key={d} value={d}>
                    {formatDate(locale, d)}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id="booking-date"
                type="date"
                min={todayYmd()}
                value={state.date}
                onChange={(e) => dispatch({ type: 'setDate', date: e.target.value })}
                aria-invalid={errors.date ? true : undefined}
                aria-describedby={cx('booking-date-hint', errors.date && 'booking-date-error')}
              />
            )}
            <FieldError id="booking-date-error" message={errors.date} />
          </div>
          <div className={s.field}>
            <label htmlFor="booking-duration">{t.durationField}</label>
            <input id="booking-duration" readOnly value={itinerary ? durationLabel(t, itinerary.duration) : '—'} />
          </div>
        </div>
        <p className={s.fieldHint} id="booking-date-hint">
          {listed ? t.dateHintListed : t.dateHintFree}
        </p>
      </section>

      <section className={s.block} aria-labelledby="booking-voyage-title">
        <div className={s.blockTitle}>
          <h3 id="booking-voyage-title">
            <span className={s.sectionNumber}>02</span> {t.voyageHeading}
          </h3>
          {itinerary && (
            <a
              className={s.inlineLink}
              href={itineraryPath(locale, slugify(itinerary.name), itinerary.cruise_id, itinerary.itinerary_id)}
              target="_blank"
              rel="noopener"
            >
              {t.seeDetail} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
        <div className={s.field}>
          <label htmlFor="booking-voyage">
            {t.voyageLabel} <span className={s.required} aria-hidden="true">*</span>
          </label>
          <select
            id="booking-voyage"
            value={itinerary?.id ?? ''}
            disabled={state.itinerariesStatus !== 'ready' || state.itineraries.length === 0}
            onChange={(e) => dispatch({ type: 'selectItinerary', id: e.target.value })}
            aria-invalid={errors.voyage ? true : undefined}
            aria-describedby={cx('booking-voyage-status', errors.voyage && 'booking-voyage-error')}
          >
            <option value="">{state.itinerariesStatus === 'loading' ? t.loading : t.voyagePlaceholder}</option>
            {state.itineraries.map((it) => (
              <option key={it.id} value={it.id}>
                {[it.name, it.cruise_name].filter(Boolean).join(' – ')}
                {it.duration ? ` (${durationLabel(t, it.duration)})` : ''}
              </option>
            ))}
          </select>
          <FieldError id="booking-voyage-error" message={errors.voyage} />
        </div>
        <div id="booking-voyage-status" aria-live="polite">
          {!state.date && <p className={s.fieldHint}>{t.voyageNeedsDate}</p>}
          {state.itinerariesStatus === 'ready' && state.itineraries.length === 0 && <p className={s.note}>{t.voyageEmpty}</p>}
          {state.itinerariesStatus === 'error' && (
            <p className={s.note}>
              {t.loadFailed}{' '}
              <button type="button" className={s.linkButton} onClick={() => dispatch({ type: 'retryItineraries' })}>
                {t.retry}
              </button>
            </p>
          )}
        </div>
        {itinerary ? (
          <div className={s.routeCard}>
            <div className={s.routePhoto}>
              <Image src={routeImage} alt="" fill sizes="130px" />
            </div>
            <div>
              <div className={s.routeMeta}>
                {itinerary.cruise_name && <span>{itinerary.cruise_name}</span>}
                {itinerary.destination && <span>{itinerary.destination.split(',')[0]}</span>}
                {itinerary.duration > 0 && <span>{durationLabel(t, itinerary.duration)}</span>}
              </div>
              <h4 className={s.routeTitle}>{itinerary.name}</h4>
              {state.detail && state.detail.destinations.length > 0 && (
                <p className={s.routeStops}>
                  <span className="sr-only">{t.route}: </span>
                  {state.detail.destinations.join(' → ')}
                </p>
              )}
              {state.detail && state.detail.activities.length > 0 && (
                <ul className={s.chips} aria-label={t.inclusions}>
                  {state.detail.activities.map((a) => (
                    <li key={a.id}>{a.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : null}
      </section>

      <section className={s.block} aria-labelledby="booking-cabins-title">
        <div className={s.blockTitle}>
          <h3 id="booking-cabins-title">
            <span className={s.sectionNumber}>03</span> {t.cabinsHeading}
          </h3>
          {state.cabins.length > 0 && <span className={s.pill}>{fmt(t.cabinCategories, { count: state.cabins.length })}</span>}
        </div>
        {!itinerary && <p className={s.fieldHint}>{t.cabinsNeedVoyage}</p>}
        {state.cabinsStatus === 'loading' && <p className={s.fieldHint}>{t.loading}</p>}
        {state.cabinsStatus === 'error' && <p className={s.note}>{t.loadFailed}</p>}
        {state.cabinsStatus === 'ready' && state.cabins.length === 0 && <p className={s.note}>{t.cabinsEmpty}</p>}
        {state.cabins.length > 0 && (
          <ul className={s.cabins}>
            {state.cabins.map((cabin) => {
              const count = state.rooms.filter((r) => r.cabinId === cabin.id).length;
              const img = mediaSrc(cabin.image_url);
              const fromPrice = cabin.min_price && cabin.min_price > 0 ? cabin.min_price : 0;
              return (
                <li key={cabin.id} className={cx(s.cabCard, count > 0 && s.cabSelected)}>
                  <div className={s.cabVisual}>{img && <Image src={img} alt="" fill sizes="(max-width: 760px) 130px, 170px" />}</div>
                  <div className={s.cabCopy}>
                    <div className={s.cabTop}>{cabinDescription(t, { ...cabin, summary: null })}</div>
                    <h4>{cabin.name}</h4>
                    {cabin.summary && <p>{cabin.summary}</p>}
                    <a className={s.textLink} href={detailPath(locale, 'cabin', slugify(cabin.name), cabin.id)} target="_blank" rel="noopener">
                      {t.viewCabin} <span className="sr-only">: {cabin.name}</span>
                      <span aria-hidden="true"> ↗</span>
                    </a>
                  </div>
                  <div className={s.cabAction}>
                    <div className={s.cabPrice}>
                      {fromPrice > 0 ? (
                        <>
                          {t.priceFrom}
                          <strong>{price(fromPrice)}</strong>
                          {t.perCabin}
                        </>
                      ) : (
                        <strong>{t.priceOnRequest}</strong>
                      )}
                    </div>
                    <button type="button" className={s.btnAdd} onClick={() => dispatch({ type: 'addRoom', cabinId: cabin.id })} aria-label={fmt(t.addCabinNamed, { name: cabin.name })}>
                      + {t.addCabin}
                    </button>
                    {count > 0 && <span className={s.selectedTag}>{fmt(t.selectedCount, { count })}</span>}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className={s.picked} id="booking-in-voyage">
          <h4 className={s.pickedTitle}>{fmt(t.inVoyageHeading, { count: state.rooms.length })}</h4>
          {cabinErrors.length > 0 && (
            <div className={s.fieldError} id="booking-cabin-error">
              {cabinErrors.map(([key, message]) => (
                <p key={key}>{message}</p>
              ))}
            </div>
          )}
          {rooms.length === 0 ? (
            <p className={s.fieldHint}>{t.inVoyageEmpty}</p>
          ) : (
            <ul className={s.pickedList}>
              {rooms.map(({ room, cabin, unitPrice }, i) => {
                const limits = guestLimits(toCabinPricing(cabin, itinerary?.duration));
                const cabinLabel = `${cabin.name} #${i + 1}`;
                return (
                  <li key={room.key} className={cx(s.pickedItem, errors[`cabin_${i}`] && s.pickedInvalid)}>
                    <div className={s.pickedHead}>
                      <div>
                        <strong>
                          {cabin.name} <span className={s.muted}>#{i + 1}</span>
                        </strong>
                        <small>
                          {t.adjustedFare}: <b>{unitPrice > 0 ? price(unitPrice) : t.priceOnRequest}</b>
                        </small>
                      </div>
                      <button type="button" className={s.removeBtn} onClick={() => dispatch({ type: 'removeRoom', key: room.key })} aria-label={fmt(t.removeCabin, { name: cabin.name, n: i + 1 })}>
                        {t.remove} ×
                      </button>
                    </div>
                    <div className={s.guestRow}>
                      {GUEST_TYPES.map((type) => (
                        <div key={type} className={s.guestField}>
                          <span id={`room-${room.key}-${type}`}>
                            {t.guestTypes[type]} <small className={s.muted}>({fmt(t.guestMax, { count: limits[type] })})</small>
                          </span>
                          <Stepper
                            value={room.guests[type]}
                            max={limits[type]}
                            label={`${t.guestTypes[type]}, ${cabinLabel}`}
                            increaseLabel={fmt(t.increase, { label: t.guestTypes[type], cabin: cabinLabel })}
                            decreaseLabel={fmt(t.decrease, { label: t.guestTypes[type], cabin: cabinLabel })}
                            onChange={(delta) => dispatch({ type: 'changeGuests', key: room.key, guest: type, delta })}
                          />
                        </div>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          {rooms.length > 0 && <p className={s.note}>{t.capacityNote}</p>}
        </div>
      </section>

      {state.amenities.length > 0 && (
        <section className={s.block} aria-labelledby="booking-amenities-title">
          <div className={s.blockTitle}>
            <h3 id="booking-amenities-title">
              <span className={s.sectionNumber}>04</span> {t.amenitiesHeading}
            </h3>
            <span className={s.overline}>{t.optional}</span>
          </div>
          <ul className={s.addonList}>
            {state.amenities.map((a) => {
              const qty = state.amenityQty[a.id] ?? 0;
              const img = mediaSrc(a.image_url);
              return (
                <li key={a.id} className={cx(s.addon, qty > 0 && s.addonSelected)}>
                  {img && (
                    <span className={s.addonIcon}>
                      <Image src={img} alt="" width={40} height={40} />
                    </span>
                  )}
                  <div className={s.addonCopy}>
                    <h4 id={`amenity-${a.id}`}>{a.name}</h4>
                    {a.description && <small>{a.description}</small>}
                    <small className={s.addonPrice}>{price(roundPrice(a.price ?? 0, currency))}</small>
                  </div>
                  <Stepper
                    value={qty}
                    max={MAX_AMENITY_QTY}
                    label={`${t.quantity}: ${a.name}`}
                    increaseLabel={fmt(t.increase, { label: t.quantity, cabin: a.name })}
                    decreaseLabel={fmt(t.decrease, { label: t.quantity, cabin: a.name })}
                    onChange={(delta) => dispatch({ type: 'changeAmenity', id: a.id, delta })}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
}
