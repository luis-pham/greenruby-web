'use client';

import { useState } from 'react';
import s from './guide.module.css';

export type TimelineStep = { time: string; title: string; body: string };
export type TimelineTab = { key: string; label: string; steps: TimelineStep[] };

/**
 * Boarding-day timeline with one tab per ship. Both tabs are in the server HTML (inactive ones are
 * hidden), so the full schedule is crawlable; tabs follow the WAI-ARIA tabs pattern.
 */
export function BoardingTimeline({ tabs, label, note }: { tabs: TimelineTab[]; label: string; note: string }) {
  const [active, setActive] = useState(tabs[0]?.key);
  const focusTab = (index: number) => {
    const tab = tabs[(index + tabs.length) % tabs.length];
    setActive(tab.key);
    document.getElementById(`timeline-tab-${tab.key}`)?.focus();
  };
  return (
    <div className={s.timeline}>
      <div role="tablist" aria-label={label} className={s.tabs}>
        {tabs.map((tab, i) => (
          <button
            key={tab.key}
            id={`timeline-tab-${tab.key}`}
            type="button"
            role="tab"
            aria-selected={active === tab.key}
            aria-controls={`timeline-panel-${tab.key}`}
            tabIndex={active === tab.key ? 0 : -1}
            className={s.tab}
            onClick={() => setActive(tab.key)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') focusTab(i + 1);
              if (e.key === 'ArrowLeft') focusTab(i - 1);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div key={tab.key} id={`timeline-panel-${tab.key}`} role="tabpanel" aria-labelledby={`timeline-tab-${tab.key}`} hidden={active !== tab.key}>
          <ol className={s.steps}>
            {tab.steps.map((step) => (
              <li key={step.time + step.title}>
                <span className={s.stepTime}>{step.time}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
      <p className={s.widgetNote}>{note}</p>
    </div>
  );
}
