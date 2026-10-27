'use client';

import { useId, useState, type ReactNode } from 'react';
import { departureWindow, DISEMBARK, returnWindow, ROAD_MINUTES, type Origin } from './transfer';
import s from './guide.module.css';

export type SelectorRoute = { mode: string; time: string; notes: string };
export type SelectorOrigin = { key: Origin; label: string; routes: SelectorRoute[]; tip: string; airport?: 'noibai' | 'catbi' | 'vandon' };
export type SelectorLabels = {
  title: string;
  origin: string;
  road: string;
  hours: string;
  minutes: string;
  decimal: string;
  /** Shown instead of a duration where none is published (Cat Bi, Van Don). */
  roadUnknown: string;
  depart: string;
  /** "{from}–{to}" for shared vans (Hanoi only). */
  departShuttle: string;
  departNote: string;
  departUnknown: string;
  lastDay: string;
  disembark: string;
  /** "{origin}", "{from}", "{to}". */
  returnBack: string;
  airportAdvice: string;
  table: { mode: string; time: string; notes: string };
  /** Published fares and checked operators (SelectorPanel). */
  cost: string;
  costNone: string;
  operators: string;
  operatorsNone: string;
  returnOperators: string;
  seeTable: string;
  /** Section id of the operator table for each origin. */
  operatorsAnchor: Partial<Record<Origin, string>>;
  note: string;
};

const fill = (template: string, values: Record<string, string>) => template.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? '');

/** "2.5–3 hours" (localised decimal) or, under two hours, "50–70 min". */
function duration([a, b]: [number, number], labels: SelectorLabels): string {
  if (b < 120) return `${a}–${b} ${labels.minutes}`;
  const h = (m: number) => String(Math.round((m / 60) * 2) / 2).replace('.', labels.decimal);
  return `${h(a)}–${h(b)} ${labels.hours}`;
}

/**
 * "Where are you starting from?" → options, a suggested departure window, fares, operators and last-day
 * guidance (estimates only). Every origin's panel is in the server HTML; the radios only toggle `hidden`.
 */
export function TransferSelector({ origins, labels, panels = {} }: { origins: SelectorOrigin[]; labels: SelectorLabels; panels?: Partial<Record<Origin, ReactNode>> }) {
  const [key, setKey] = useState<Origin>(origins[0].key);
  const id = useId();
  return (
    <div className={s.selector}>
      <fieldset className={s.selectorOrigins}>
        <legend>{labels.origin}</legend>
        {origins.map((o) => (
          <label key={o.key} className={s.chip}>
            <input type="radio" name={`${id}-origin`} value={o.key} checked={key === o.key} onChange={() => setKey(o.key)} aria-controls={`${id}-${o.key}`} />
            <span>{o.label}</span>
          </label>
        ))}
      </fieldset>

      {origins.map((origin) => {
        const road = ROAD_MINUTES[origin.key];
        const leave = departureWindow(origin.key);
        const shuttle = origin.key === 'hanoi' ? departureWindow(origin.key, true) : null;
        const back = returnWindow(origin.key);
        return (
          <div key={origin.key} id={`${id}-${origin.key}`} className={s.selectorResult} aria-live="polite" hidden={origin.key !== key}>
            <h3 className="sr-only">{fill(labels.title, { origin: origin.label })}</h3>
            <div className={s.selectorFigures}>
              <div>
                <span>{labels.road}</span>
                {road ? <b>{duration(road, labels)}</b> : <small>{labels.roadUnknown}</small>}
              </div>
              <div>
                <span>{labels.depart}</span>
                {leave ? (
                  <>
                    <b>
                      {leave[0]}–{leave[1]}
                    </b>
                    <small>{shuttle ? fill(labels.departShuttle, { from: shuttle[0], to: shuttle[1] }) : labels.departNote}</small>
                  </>
                ) : (
                  <small>{labels.departUnknown}</small>
                )}
              </div>
              <div>
                <span>{labels.lastDay}</span>
                <b>
                  {DISEMBARK[0]}–{DISEMBARK[1]}
                </b>
                <small>
                  {labels.disembark}
                  {back && !origin.airport && <> {fill(labels.returnBack, { origin: origin.label, from: back[0], to: back[1] })}</>}
                  {origin.airport && <> {labels.airportAdvice}</>}
                </small>
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
            {panels[origin.key]}
            <p className={s.selectorTip}>{origin.tip}</p>
          </div>
        );
      })}
      <p className={s.widgetNote}>{labels.note}</p>
    </div>
  );
}
