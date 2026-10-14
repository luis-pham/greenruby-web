'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import s from './experiences.module.css';

type Option = { value: string; label: string };

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Onboard/outdoor filter plus "view all". Every card is server-rendered and visible in the HTML;
 * after hydration this only toggles the `hidden` attribute on cards (data-tab) to show the
 * current tab and, until expanded, the first `limit` matches.
 */
export function ExperienceFilter({
  label,
  exploreBy,
  allLabel,
  options,
  showing,
  of,
  showMore,
  showLess,
  limit,
  total,
  children,
}: {
  label: string;
  exploreBy: string;
  allLabel: string;
  options: Option[];
  showing: string;
  of: string;
  showMore: string;
  showLess: string;
  limit: number;
  total: number;
  children: ReactNode;
}) {
  const grid = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const [counts, setCounts] = useState({ visible: total, eligible: total });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let eligible = 0;
    let visible = 0;
    grid.current?.querySelectorAll<HTMLElement>('[data-tab]').forEach((card) => {
      const match = active === 'all' || card.dataset.tab === active;
      const show = match && (expanded || eligible < limit);
      if (match) eligible++;
      if (show) visible++;
      card.hidden = !show;
    });
    // Syncing state with the DOM we just updated (the cards are server-rendered children).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCounts({ visible, eligible });
    setHydrated(true);
  }, [active, expanded, limit]);

  const pick = (value: string) => {
    setActive(value);
    setExpanded(false);
  };

  return (
    <>
      <div className={s.filterRow}>
        {options.length > 0 && (
          <div className={s.filterLeft} role="group" aria-label={label}>
            <span className={s.filterLabel}>{exploreBy}</span>
            {[{ value: 'all', label: allLabel }, ...options].map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={active === option.value}
                className={active === option.value ? `${s.filter} ${s.filterActive}` : s.filter}
                onClick={() => pick(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
        <p className={s.filterCount} role="status" aria-live="polite">
          {showing} <strong>{pad(counts.visible)}</strong> {of} <strong>{pad(counts.eligible)}</strong>
        </p>
      </div>
      <div className={s.collectionGrid} ref={grid}>
        {children}
      </div>
      {hydrated && counts.eligible > limit && (
        <button type="button" className={s.showMore} aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
          {expanded ? showLess : showMore} <span aria-hidden="true">{expanded ? '↑' : '↓'}</span>
        </button>
      )}
    </>
  );
}
