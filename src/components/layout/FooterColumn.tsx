'use client';

import { useState, type ReactNode } from 'react';
import s from './layout.module.css';

/**
 * One footer menu. On phones the heading is a disclosure button (accordion); from 601px up the list
 * is always shown under a plain heading. Links are always in the HTML for crawlers.
 */
export function FooterColumn({ id, title, toggleLabel, children }: { id: string; title: string; toggleLabel: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className={s.footerCol} aria-label={title} data-open={open || undefined}>
      <h2>
        {/* Only one of the two is displayed (CSS), so assistive tech sees a button only where it does something. */}
        <span className={s.footerColTitle}>{title}</span>
        <button type="button" className={s.footerToggle} aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
          {title}
          <span className={s.footerToggleIcon} aria-hidden="true" />
          <span className="sr-only">{toggleLabel}</span>
        </button>
      </h2>
      <div id={id} className={s.footerColBody}>
        {children}
      </div>
    </nav>
  );
}
