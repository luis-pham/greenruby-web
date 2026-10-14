'use client';

import { useRef, useState, type ReactNode } from 'react';
import s from './itineraries.module.css';

type Option = { value: string; label: string };

/**
 * Bay/duration filter. Every card is server-rendered and visible by default; this only toggles the
 * `hidden` attribute on cards whose data-bay / data-duration don't match.
 */
export function TripFilter({
  label,
  bayLabel,
  durationLabel,
  bays,
  durations,
  allBaysLabel,
  allLabel,
  results,
  total,
  children,
}: {
  label: string;
  bayLabel: string;
  durationLabel: string;
  bays: Option[];
  durations: Option[];
  allBaysLabel: string;
  allLabel: string;
  results: Record<number, string>;
  total: number;
  children: ReactNode;
}) {
  const grid = useRef<HTMLDivElement>(null);
  const [bay, setBay] = useState('all');
  const [duration, setDuration] = useState('all');
  const [count, setCount] = useState(total);

  const apply = (nextBay: string, nextDuration: string) => {
    setBay(nextBay);
    setDuration(nextDuration);
    let visible = 0;
    grid.current?.querySelectorAll<HTMLElement>('[data-bay]').forEach((card) => {
      const show =
        (nextBay === 'all' || card.dataset.bay === nextBay) && (nextDuration === 'all' || card.dataset.duration === nextDuration);
      card.hidden = !show;
      if (show) visible++;
    });
    setCount(visible);
  };

  return (
    <>
      <div className={s.filterBar} aria-label={label}>
        {bays.length > 1 && (
          <FilterGroup title={bayLabel} options={bays} allText={allBaysLabel} current={bay} onPick={(v) => apply(v, duration)} />
        )}
        {durations.length > 1 && (
          <FilterGroup title={durationLabel} options={durations} allText={allLabel} current={duration} onPick={(v) => apply(bay, v)} />
        )}
      </div>
      <p className={s.results} role="status" aria-live="polite">{results[count] ?? results[total]}</p>
      <div className={s.tripGrid} ref={grid}>
        {children}
      </div>
    </>
  );
}

function FilterGroup({
  title,
  options,
  allText,
  current,
  onPick,
}: {
  title: string;
  options: Option[];
  allText: string;
  current: string;
  onPick: (value: string) => void;
}) {
  return (
    <div className={s.filterGroup} role="group" aria-label={title}>
      <span className={s.filterTitle}>{title}</span>
      {[{ value: 'all', label: allText }, ...options].map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={current === option.value}
          className={current === option.value ? `${s.filterBtn} ${s.filterBtnActive}` : s.filterBtn}
          onClick={() => onPick(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
