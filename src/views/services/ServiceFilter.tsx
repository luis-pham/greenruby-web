'use client';

import { useRef, useState, type ReactNode } from 'react';
import s from './services.module.css';

type Option = { value: string; label: string };

/**
 * Group filter. Every card is server-rendered and visible by default; this only toggles the
 * `hidden` attribute on cards whose data-group doesn't match.
 */
export function ServiceFilter({
  label,
  allLabel,
  groups,
  results,
  total,
  children,
}: {
  label: string;
  allLabel: string;
  groups: Option[];
  results: Record<number, string>;
  total: number;
  children: ReactNode;
}) {
  const grid = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState('all');
  const [count, setCount] = useState(total);

  const pick = (value: string) => {
    setCurrent(value);
    let visible = 0;
    grid.current?.querySelectorAll<HTMLElement>('[data-group]').forEach((card) => {
      const show = value === 'all' || card.dataset.group === value;
      card.hidden = !show;
      if (show) visible++;
    });
    setCount(visible);
  };

  return (
    <>
      <div className={s.toolbar}>
        {groups.length > 1 ? (
          <div className={s.filters} role="group" aria-label={label}>
            {[{ value: 'all', label: allLabel }, ...groups].map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={current === option.value}
                className={current === option.value ? `${s.filter} ${s.filterActive}` : s.filter}
                onClick={() => pick(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : (
          <span />
        )}
        <span className={s.results} role="status" aria-live="polite">
          {results[count] ?? results[total]}
        </span>
      </div>
      <div className={s.grid} ref={grid}>
        {children}
      </div>
    </>
  );
}
