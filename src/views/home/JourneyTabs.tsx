'use client';

import { useRef, useState, type ReactNode } from 'react';
import s from './home.module.css';

/**
 * Duration filter for the journey cards. All cards are server-rendered (crawlers see every
 * itinerary); the server marks cards outside the default duration `hidden`, and this only toggles it.
 */
export function JourneyTabs({
  label,
  tabs,
  initial,
  children,
}: {
  label: string;
  tabs: { duration: number; label: string }[];
  initial: number;
  children: ReactNode;
}) {
  const [active, setActive] = useState(initial);
  const grid = useRef<HTMLDivElement>(null);

  const select = (duration: number) => {
    setActive(duration);
    grid.current?.querySelectorAll<HTMLElement>('[data-duration]').forEach((card) => {
      card.hidden = Number(card.dataset.duration) !== duration;
    });
  };

  return (
    <>
      {tabs.length > 1 && (
        <div className={s.tabs} role="tablist" aria-label={label}>
          {tabs.map((tab) => (
            <button
              key={tab.duration}
              type="button"
              role="tab"
              aria-selected={tab.duration === active}
              className={tab.duration === active ? `${s.tab} ${s.tabActive}` : s.tab}
              onClick={() => select(tab.duration)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
      <div className={s.journeyGrid} ref={grid}>
        {children}
      </div>
    </>
  );
}
