'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { cx } from '@/components/ui';
import { fmt, formatDate, type SummaryModel, type T } from './model';
import { formatPrice } from './pricing';
import s from './booking.module.css';

export type Contact = { hotline: string | null; hotlineHref: string | null; email: string | null };

/** "At a glance" reservation summary. Sticky on desktop, collapsible on phones. */
export function Summary({ t, locale, model, contact, image }: { t: T; locale: Locale; model: SummaryModel; contact: Contact; image: string }) {
  const [open, setOpen] = useState(false);
  const sm = t.summary;
  const cabinCount = model.cabins.reduce((n, c) => n + c.count, 0);
  const price = (value: number) => formatPrice(value, model.currency);

  return (
    <aside className={s.aside} aria-labelledby="summary-title">
      <div className={cx(s.summaryCard, open && s.summaryOpen)}>
        <div className={s.sumHead}>
          <span className={s.eyebrowGold}>{sm.eyebrow}</span>
          <h2 id="summary-title">{sm.title}</h2>
          <p>{model.voyage ? [model.voyage, model.cruise].filter(Boolean).join(' · ') : sm.noVoyage}</p>
          <button type="button" className={s.sumToggle} aria-expanded={open} aria-controls="summary-details" onClick={() => setOpen(!open)}>
            {open ? sm.hide : sm.show} <span aria-hidden="true">{open ? '⌃' : '⌄'}</span>
          </button>
        </div>
        <div className={s.sumImage}>
          <Image src={image} alt="" fill sizes="375px" />
        </div>
        <div className={s.sumContent} id="summary-details">
          {model.code && (
            <div className={s.sumRow}>
              <span>{t.outcome.reference}</span>
              <strong>{model.code}</strong>
            </div>
          )}
          <div className={s.sumLabel}>
            <span>{sm.voyageDetails}</span>
            {model.duration && <span>{model.duration}</span>}
          </div>
          <dl className={s.sumList}>
            <div className={s.sumRow}>
              <dt>{sm.destination}</dt>
              <dd>{model.destination || '—'}</dd>
            </div>
            <div className={s.sumRow}>
              <dt>{sm.departure}</dt>
              <dd>{model.date ? formatDate(locale, model.date) : t.datePlaceholder}</dd>
            </div>
            <div className={s.sumRow}>
              <dt>{sm.guests}</dt>
              <dd>{model.guestsTotal > 0 ? (model.guestsTotal === 1 ? sm.guestsOne : fmt(sm.guestsMany, { count: model.guestsTotal })) : sm.notSelected}</dd>
            </div>
          </dl>
          <div className={s.sumSeparator} />
          <div className={s.sumLabel}>
            <span>{sm.cabins}</span>
            <span>{cabinCount === 1 ? sm.cabinsOne : fmt(sm.cabinsMany, { count: cabinCount })}</span>
          </div>
          {model.cabins.length ? (
            <ul className={s.sumItems}>
              {model.cabins.map((c) => (
                <li key={c.name}>
                  <div>
                    <strong>{c.count > 1 ? `${c.name} (x${c.count})` : c.name}</strong>
                    {c.guests && <small>{c.guests}</small>}
                  </div>
                  <span>{price(c.total)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={s.sumSub}>{sm.noCabins}</p>
          )}
          <div className={s.sumSeparator} />
          <div className={s.sumLabel}>
            <span>{sm.amenities}</span>
          </div>
          {model.amenities.length ? (
            <ul className={s.sumItems}>
              {model.amenities.map((a) => (
                <li key={a.name}>
                  <div>
                    <strong>{a.name}</strong>
                    <small>
                      {t.quantity}: {a.quantity}
                    </small>
                  </div>
                  <span>{price(a.total)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={s.sumSub}>{sm.noAmenities}</p>
          )}
          <div className={s.sumSeparator} />
          <div className={s.sumLabel}>
            <span>{sm.policies}</span>
          </div>
          <ul className={s.policies}>
            {sm.policyItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={s.sumTotal}>
          <span className={s.overline}>{sm.estimatedTotal}</span>
          <strong aria-live="polite" aria-atomic="true">
            {price(model.total)}
          </strong>
          <p>{sm.totalNote}</p>
        </div>
        {(contact.hotline || contact.email) && (
          <div className={s.sumHelp}>
            <span className={s.helpIcon} aria-hidden="true">♡</span>
            <div>
              <strong>{sm.helpTitle}</strong>
              {contact.hotline && contact.hotlineHref && <a href={contact.hotlineHref}>{contact.hotline}</a>}
              {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
            </div>
          </div>
        )}
      </div>
      <ul className={s.trustline}>
        {sm.trust.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
