'use client';

import { useState, type ReactNode } from 'react';
import type { EcoMessages, Metric } from './messages';
import s from './eco.module.css';

/** Vessel switch + the three figures. Server-rendered with Green Ruby 1 selected. */
export function ShipSnapshot({ m }: { m: EcoMessages['snapshot'] }) {
  const [index, setIndex] = useState(0);
  const ship = m.ships[index];
  return (
    <>
      <div className={s.switches} role="group" aria-label={m.shipsLabel}>
        {m.ships.map((x, i) => (
          <button key={x.label} type="button" aria-pressed={i === index} onClick={() => setIndex(i)}>
            {x.label}
          </button>
        ))}
      </div>
      <div className={s.snapshot}>
        <div className={s.primaryStat} aria-live="polite">
          <div className={s.statHead}>
            <span className={s.micro}>{m.primaryLabel}</span>
            <span className={s.pill}>○ {m.pill}</span>
          </div>
          <div className={s.statNumber}>—</div>
          <div className={s.statUnit}>{m.unit}</div>
          <p className={s.statDesc}>{ship.desc}</p>
          <div className={s.statFoot}>
            <span>{ship.meta}</span>
            <strong>{m.notMeasured}</strong>
          </div>
        </div>
        <div className={s.sideStats}>
          <div className={`${s.sideCard} ${s.sideCardGold}`}>
            <span className={s.micro}>{m.solarLabel}</span>
            <div className={s.sideNumber}>{ship.solar}</div>
            <p>{ship.solarDesc}</p>
            <span className={s.warn}>{m.solarWarn}</span>
          </div>
          <div className={s.sideCard}>
            <span className={s.micro}>{m.coolingLabel}</span>
            <div className={s.sideNumber}>{ship.cooling}</div>
            <p>{ship.coolingDesc}</p>
            <span className={s.warn}>{m.coolingWarn}</span>
          </div>
        </div>
      </div>
    </>
  );
}

const METRICS: Metric[] = ['fuel', 'solar', 'cooling'];

/** Dataset switch + the empty-state chart (no validated series exists yet), with `aside` beside the chart. */
export function MetricPanel({ m, aside }: { m: EcoMessages['reporting']; aside: ReactNode }) {
  const [metric, setMetric] = useState<Metric>('fuel');
  return (
    <>
      <div className={`${s.switches} ${s.switchesDark}`} role="group" aria-label={m.metricsLabel}>
        {METRICS.map((k) => (
          <button key={k} type="button" aria-pressed={k === metric} onClick={() => setMetric(k)}>
            {m.metrics[k].label}
          </button>
        ))}
      </div>
      <div className={s.dataGrid}>
        <div className={s.emptyChart}>
          <div className={s.chartNav}>
            <span className={s.micro}>{m.metrics[metric].title}</span>
            <span className={s.chip}>{m.planned}</span>
          </div>
          <div className={s.chartArea} aria-live="polite">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
              <path d="M6 44h44M11 9v35m8-6V26m10 12V17m10 21V9m9 29V23" strokeDasharray="3 5" />
              <path d="M12 34l12-8 11 3 10-13" className={s.chartLine} strokeWidth="2.4" />
              <circle cx="45" cy="16" r="3" className={s.chartDot} stroke="none" />
            </svg>
            <strong>{m.empty}</strong>
            <p>{m.metrics[metric].desc}</p>
          </div>
          <div className={s.chartFoot}>{m.chartFoot}</div>
        </div>
        {aside}
      </div>
    </>
  );
}
