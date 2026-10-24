'use client';

import { useId, useState } from 'react';
import { backBy, earliestFlight, leaveBy, ROAD_MINUTES, type Origin } from './transfer';
import s from './guide.module.css';

export type SelectorRoute = { mode: string; time: string; notes: string };
export type SelectorOrigin = { key: Origin; label: string; routes: SelectorRoute[]; tip: string; airport?: 'noibai' | 'catbi' | 'vandon' };
export type SelectorLabels = {
  title: string;
  origin: string;
  shuttle: string;
  road: string;
  hours: string;
  minutes: string;
  decimal: string;
  leaveBy: string;
  leaveByShuttle: string;
  returnTitle: string;
  backBy: string;
  flightDomestic: string;
  flightInternational: string;
  table: { mode: string; time: string; notes: string };
  note: string;
};

const fill = (template: string, values: Record<string, string>) => template.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? '');
/** "2.5–3 hours" (localised decimal) or, under two hours, "50–70 min". */
function duration([a, b]: [number, number], labels: SelectorLabels): string {
  if (b < 120) return `${a}–${b} ${labels.minutes}`;
  const h = (m: number) => String(Math.round((m / 60) * 2) / 2).replace('.', labels.decimal);
  return `${h(a)}–${h(b)} ${labels.hours}`;
}

/** "Where are you starting from?" → realistic options, a leave-by time for check-in, and last-day timings. */
export function TransferSelector({ origins, labels }: { origins: SelectorOrigin[]; labels: SelectorLabels }) {
  const [key, setKey] = useState<Origin>(origins[0].key);
  const id = useId();
  const origin = origins.find((o) => o.key === key) ?? origins[0];
  const hasShuttle = origin.key === 'hanoi';
  return (
    <div className={s.selector}>
      <fieldset className={s.selectorOrigins}>
        <legend>{labels.origin}</legend>
        {origins.map((o) => (
          <label key={o.key} className={s.chip}>
            <input type="radio" name={`${id}-origin`} value={o.key} checked={key === o.key} onChange={() => setKey(o.key)} />
            <span>{o.label}</span>
          </label>
        ))}
      </fieldset>

      <div className={s.selectorResult} aria-live="polite">
        <div className={s.selectorFigures}>
          <div>
            <span>{labels.road}</span>
            <b>{duration(ROAD_MINUTES[origin.key], labels)}</b>
          </div>
          <div>
            <span>{fill(labels.leaveBy, { origin: origin.label })}</span>
            <b>{leaveBy(origin.key)}</b>
            {hasShuttle && <small>{fill(labels.leaveByShuttle, { time: leaveBy(origin.key, true) })}</small>}
          </div>
          <div>
            <span>{labels.returnTitle}</span>
            {origin.airport ? (
              <>
                <b>{earliestFlight(origin.airport, 'domestic')}</b>
                <small>
                  {labels.flightDomestic} · {fill(labels.flightInternational, { time: earliestFlight(origin.airport, 'international') })}
                </small>
              </>
            ) : (
              <>
                <b>{backBy(origin.key)}</b>
                <small>{fill(labels.backBy, { origin: origin.label })}</small>
              </>
            )}
          </div>
        </div>

        <div className={s.tableWrap}>
          <table className={s.table}>
            <caption className="sr-only">{fill(labels.title, { origin: origin.label })}</caption>
            <thead>
              <tr>
                <th scope="col">{labels.table.mode}</th>
                <th scope="col">{labels.table.time}</th>
                <th scope="col">{labels.table.notes}</th>
              </tr>
            </thead>
            <tbody>
              {origin.routes.map((r) => (
                <tr key={r.mode}>
                  <th scope="row">{r.mode}</th>
                  <td>{r.time}</td>
                  <td>{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={s.selectorTip}>{origin.tip}</p>
      </div>
      <p className={s.widgetNote}>{labels.note}</p>
    </div>
  );
}
