'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { sectionPath, type Locale } from '@/lib/i18n';
import type { BookingData, BookingOption } from '@/lib/booking-options';
import { bookingMessages, type BookingMessages } from './messages';
import s from './booking.module.css';

type Contact = { zaloHref: string | null; whatsappHref: string | null };
type Props = { locale: Locale; data: BookingData; cabinId?: number; contact: Contact };

const cx = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(' ');
const pad = (n: number) => String(n).padStart(2, '0');
const tag = (locale: Locale) => (locale === 'vi' ? 'vi-VN' : 'en-GB');

function formatMoney(value: number, currency: 'USD' | 'VND', locale: Locale) {
  return new Intl.NumberFormat(locale === 'vi' ? 'vi-VN' : 'en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
}

function formatDay(iso: string, locale: Locale) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(tag(locale), { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(Date.UTC(y, m - 1, d));
}

/** One ship (cruise/cabin pages): "2D1N"; several ships (homepage): "Green Ruby 1 · 2D1N". */
function optionLabel(o: BookingOption, t: BookingMessages, options: BookingOption[]) {
  if (options.length < 2) return o.name;
  const oneShip = options.every((x) => x.cruiseId === o.cruiseId);
  return oneShip ? t.durationShort(o.duration) : `${o.cruiseName ?? o.name} · ${t.durationShort(o.duration)}`;
}

function bookingHref(locale: Locale, o: BookingOption | undefined, cabinId: number | undefined, date: string | null) {
  const q = new URLSearchParams();
  if (o) {
    q.set('cruise_id', String(o.cruiseId));
    q.set('itinerary_id', String(o.itineraryId));
  }
  if (cabinId) q.set('cabin_id', String(cabinId));
  if (date) q.set('start_at', date);
  return `${sectionPath(locale, 'booking')}?${q.toString()}`;
}

/** GTM (loaded after cookie consent) picks this up; harmless when it isn't there. */
function track(o: BookingOption | undefined, date: string | null, cabinId: number | undefined) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer?.push({
    event: 'check_availability',
    cruise_id: o?.cruiseId,
    itinerary_id: o?.itineraryId,
    cabin_id: cabinId,
    departure_date: date ?? undefined,
    value: o?.fromPrice ?? undefined,
    currency: o?.currency,
  });
}

/* ---------- Month calendar showing only departure days ---------- */

function Calendar({ locale, dates, value, onChange, t }: { locale: Locale; dates: string[]; value: string | null; onChange: (d: string) => void; t: BookingMessages }) {
  const months = useMemo(() => [...new Set(dates.map((d) => d.slice(0, 7)))], [dates]);
  const available = useMemo(() => new Set(dates), [dates]);
  const [index, setIndex] = useState(() => Math.max(0, value ? months.indexOf(value.slice(0, 7)) : 0));
  const month = months[Math.min(index, months.length - 1)];
  if (!month) return null;
  const [y, m] = month.split('-').map(Number);
  const offset = (new Date(Date.UTC(y, m - 1, 1)).getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const title = new Intl.DateTimeFormat(tag(locale), { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(Date.UTC(y, m - 1, 1));
  const weekdays = Array.from({ length: 7 }, (_, i) => new Intl.DateTimeFormat(tag(locale), { weekday: 'narrow', timeZone: 'UTC' }).format(Date.UTC(2024, 0, 1 + i)));

  return (
    <div className={s.calendar}>
      <div className={s.calHead}>
        <button type="button" onClick={() => setIndex((i) => i - 1)} disabled={index <= 0} aria-label={t.prevMonth}>‹</button>
        <strong aria-live="polite">{title}</strong>
        <button type="button" onClick={() => setIndex((i) => i + 1)} disabled={index >= months.length - 1} aria-label={t.nextMonth}>›</button>
      </div>
      <div className={s.calGrid} role="grid" aria-label={title}>
        {weekdays.map((w, i) => <span key={i} className={s.calWeekday} aria-hidden="true">{w}</span>)}
        {Array.from({ length: offset }, (_, i) => <span key={`e${i}`} />)}
        {Array.from({ length: days }, (_, i) => {
          const iso = `${month}-${pad(i + 1)}`;
          const open = available.has(iso);
          return (
            <button
              key={iso}
              type="button"
              className={cx(s.calDay, open && s.calOpen, value === iso && s.calSelected)}
              disabled={!open}
              aria-pressed={value === iso}
              aria-label={open ? `${formatDay(iso, locale)} · ${t.available}` : formatDay(iso, locale)}
              onClick={() => onChange(iso)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Shared state ---------- */

function useBooking(data: BookingData) {
  const [optionIndex, setOptionIndex] = useState(0);
  const [date, setDate] = useState<string | null>(null);
  const option = data.options[optionIndex];
  const select = (i: number) => {
    setOptionIndex(i);
    setDate(null);
  };
  return { option, optionIndex, select, date, setDate };
}

function Price({ option, locale, t }: { option?: BookingOption; locale: Locale; t: BookingMessages }) {
  return option?.fromPrice ? (
    <p className={s.price}>
      <span>{t.from}</span> <strong>{formatMoney(option.fromPrice, option.currency, locale)}</strong> <span>{t.perCabin}</span>
    </p>
  ) : (
    <p className={s.price}><strong className={s.priceAsk}>{t.priceOnRequest}</strong></p>
  );
}

function ContactLinks({ contact, t }: { contact: Contact; t: BookingMessages }) {
  if (!contact.zaloHref && !contact.whatsappHref) return null;
  return (
    <p className={s.contact}>
      {t.questions}:{' '}
      {contact.zaloHref && <a href={contact.zaloHref} target="_blank" rel="noopener noreferrer">Zalo</a>}
      {contact.zaloHref && contact.whatsappHref && ' · '}
      {contact.whatsappHref && <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
    </p>
  );
}

/* ---------- Panel: price, voyage, inline calendar, CTA (itinerary & cabin pages, mobile sheet) ---------- */

export function BookingPanel({ locale, data, cabinId, contact }: Props) {
  const t = bookingMessages[locale];
  const { option, optionIndex, select, date, setDate } = useBooking(data);
  const many = data.options.length > 1;
  const hasDates = !!option?.departures.length;
  const href = bookingHref(locale, option, cabinId, date);
  const headingId = useId();

  return (
    <section className={s.panel} aria-labelledby={headingId}>
      <h3 id={headingId} className="sr-only">{t.regionLabel}</h3>
      {data.demo && <span className={s.demo}>{t.demo}</span>}
      <Price option={option} locale={locale} t={t} />
      {many && (
        <div className={s.voyages} role="radiogroup" aria-label={t.voyage}>
          {data.options.map((o, i) => (
            <button key={`${o.cruiseId}-${o.itineraryId}`} type="button" role="radio" aria-checked={i === optionIndex} className={cx(s.voyage, i === optionIndex && s.voyageOn)} onClick={() => select(i)}>
              {optionLabel(o, t, data.options)}
            </button>
          ))}
        </div>
      )}
      {hasDates ? (
        <>
          <Calendar key={`${optionIndex}`} locale={locale} dates={option.departures} value={date} onChange={setDate} t={t} />
          <p className={s.selected}>{date ? <>{t.selected}: <strong>{formatDay(date, locale)}</strong></> : t.chooseDate}</p>
        </>
      ) : (
        <div className={s.soon}>
          <strong>{t.soonTitle}</strong>
          <p>{t.soonBody}</p>
        </div>
      )}
      <a href={href} className={s.cta} onClick={() => track(option, date, cabinId)}>
        {hasDates ? t.check : t.request} <span aria-hidden="true">→</span>
      </a>
      <ul className={s.trust}>
        <li>{t.trustCancel}</li>
        <li>{t.trustPayment}</li>
      </ul>
      <ContactLinks contact={contact} t={t} />
    </section>
  );
}

/* ---------- Bar: voyage select, date popover, CTA (homepage hero, cruise page) ---------- */

export function BookingBar({ locale, data, cabinId }: Omit<Props, 'contact'>) {
  const t = bookingMessages[locale];
  const { option, optionIndex, select, date, setDate } = useBooking(data);
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const hasDates = !!option?.departures.length;
  const ids = { voyage: useId(), date: useId() };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => wrap.current && !wrap.current.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!data.options.length) return null;
  return (
    <div className={s.bar} ref={wrap} role="search" aria-label={t.regionLabel}>
      {data.demo && <span className={s.demo}>{t.demo}</span>}
      <div className={s.barField}>
        <label htmlFor={ids.voyage}>{t.voyage}</label>
        <select id={ids.voyage} value={optionIndex} onChange={(e) => select(Number(e.target.value))}>
          {data.options.map((o, i) => <option key={i} value={i}>{optionLabel(o, t, data.options)}</option>)}
        </select>
      </div>
      <div className={s.barField}>
        <label htmlFor={ids.date}>{t.date}</label>
        <button id={ids.date} type="button" className={s.barDate} aria-expanded={open} disabled={!hasDates} onClick={() => setOpen((v) => !v)}>
          {date ? formatDay(date, locale) : hasDates ? t.chooseDate : t.soonDate}
        </button>
        {open && hasDates && (
          <div className={s.popover}>
            <Calendar key={optionIndex} locale={locale} dates={option.departures} value={date} onChange={(d) => { setDate(d); setOpen(false); }} t={t} />
          </div>
        )}
      </div>
      <div className={s.barPrice}><Price option={option} locale={locale} t={t} /></div>
      <a href={bookingHref(locale, option, cabinId, date)} className={s.cta} onClick={() => track(option, date, cabinId)}>
        {hasDates ? t.check : t.request} <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

/* ---------- Mobile: sticky bottom bar opening the panel in a sheet ---------- */

export function MobileBookingBar(props: Props) {
  const { locale, data } = props;
  const t = bookingMessages[locale];
  const dialog = useRef<HTMLDialogElement>(null);
  const option = data.options[0];

  // Lift the floating chat bubble above the bar while it is on the page.
  useEffect(() => {
    document.documentElement.dataset.bookingBar = '1';
    return () => {
      delete document.documentElement.dataset.bookingBar;
    };
  }, []);

  if (!data.options.length) return null;
  return (
    <>
      <div className={s.mobileBar}>
        <Price option={option} locale={locale} t={t} />
        <button type="button" className={s.cta} onClick={() => dialog.current?.showModal()}>
          {option?.departures.length ? t.checkDates : t.request}
        </button>
      </div>
      <dialog ref={dialog} className={s.sheet} aria-label={t.regionLabel} onClick={(e) => e.target === dialog.current && dialog.current?.close()}>
        <button type="button" className={s.sheetClose} onClick={() => dialog.current?.close()} aria-label={t.close}>×</button>
        <BookingPanel {...props} />
      </dialog>
    </>
  );
}
