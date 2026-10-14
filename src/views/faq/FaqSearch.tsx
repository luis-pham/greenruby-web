'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import s from './faq.module.css';

type Labels = {
  label: string;
  placeholder: string;
  clear: string;
  expandAll: string;
  collapseAll: string;
  emptyTitle: string;
  emptyBody: string;
  reset: string;
};

const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();

/**
 * Search box, result count and expand/collapse controls over the server-rendered Q&As. Every
 * question and answer stays in the HTML; filtering only toggles `hidden`. Accepts Laravel's
 * old `?k=` keyword links by pre-filling the box.
 */
export function FaqSearch({
  labels,
  found,
  total,
  resultsSuffix,
  children,
}: {
  labels: Labels;
  /** Result-count text per count (functions can't be passed to Client Components). */
  found: Record<number, string>;
  total: number;
  resultsSuffix: string;
  children: ReactNode;
}) {
  const list = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [count, setCount] = useState(total);

  const apply = useCallback((value: string) => {
    const root = list.current;
    if (!root) return;
    const terms = normalize(value).split(/\s+/).filter(Boolean);
    let visible = 0;
    root.querySelectorAll<HTMLElement>('[data-faq-group]').forEach((group) => {
      let inGroup = 0;
      group.querySelectorAll('details').forEach((item) => {
        const text = normalize(item.textContent ?? '');
        const match = terms.every((term) => text.includes(term));
        item.hidden = !match;
        if (match) inGroup++;
      });
      group.hidden = inGroup === 0;
      visible += inGroup;
    });
    setCount(visible);
  }, []);

  useEffect(() => {
    // Legacy search links (/faq?k=...) from the Blade site.
    const keyword = new URLSearchParams(window.location.search).get('k');
    if (keyword) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL after hydration
      setQuery(keyword);
      apply(keyword);
    }
  }, [apply]);

  const update = (value: string) => {
    setQuery(value);
    apply(value);
  };

  const toggleAll = (open: boolean) => {
    list.current?.querySelectorAll('details').forEach((item) => {
      if (!item.hidden) item.open = open;
    });
  };

  return (
    <>
      <div className={s.searchRow}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 5 5" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => update(e.target.value)}
          aria-label={labels.label}
          placeholder={labels.placeholder}
          autoComplete="off"
        />
        {query && (
          <button type="button" className={s.searchClear} onClick={() => update('')}>
            {labels.clear} <span aria-hidden="true">✕</span>
          </button>
        )}
      </div>
      <div className={s.resultsRow}>
        <p className={s.resultLabel} role="status" aria-live="polite">
          <strong>{found[count]}</strong>
          {resultsSuffix}
        </p>
        <div className={s.expandActions}>
          <button type="button" onClick={() => toggleAll(true)}>{labels.expandAll}</button>
          <button type="button" onClick={() => toggleAll(false)}>{labels.collapseAll}</button>
        </div>
      </div>
      <div ref={list}>{children}</div>
      {count === 0 && total > 0 && (
        <div className={s.empty}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 5 5" />
          </svg>
          <h3>{labels.emptyTitle}</h3>
          <p>{labels.emptyBody}</p>
          <button type="button" onClick={() => update('')}>{labels.reset}</button>
        </div>
      )}
    </>
  );
}
