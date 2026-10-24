'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useId, useMemo, useState } from 'react';
import { matchesFilter, type FilterState } from './filter';
import s from './destinations.module.css';

export type CardItem = {
  slug: string;
  href: string;
  name: string;
  summary: string | null;
  bay: string;
  bayLabel: string;
  category: string;
  categoryLabel: string;
  image: { src: string; alt: string } | null;
  isGreenRubyStop: boolean;
};

export type FilterLabels = {
  label: string;
  search: string;
  searchPlaceholder: string;
  bay: string;
  category: string;
  all: string;
  /** "{n} destinations" with {n} replaced. */
  results: string;
  resultsOne: string;
  empty: string;
  reset: string;
  stop: string;
  regional: string;
  readMore: string;
};

/**
 * Search plus bay and type filters over the destination cards. Every card is in the server HTML;
 * filtering only hides cards, and filter state is not put in the URL (no indexable query strings).
 */
export function DestinationFilter({
  items,
  bays,
  categories,
  labels,
}: {
  items: CardItem[];
  bays: { key: string; label: string }[];
  categories: { key: string; label: string }[];
  labels: FilterLabels;
}) {
  const [state, setState] = useState<FilterState>({ bay: 'all', category: 'all', query: '' });
  const searchId = useId();
  const visible = useMemo(() => items.filter((item) => matchesFilter(item, state)), [items, state]);
  const usedCategories = categories.filter((c) => items.some((item) => item.category === c.key));
  const filtered = state.bay !== 'all' || state.category !== 'all' || state.query.trim() !== '';

  const chips = (name: 'bay' | 'category', title: string, options: { key: string; label: string }[]) => (
    <fieldset className={s.chips}>
      <legend>{title}</legend>
      {[{ key: 'all', label: labels.all }, ...options].map((option) => (
        <label key={option.key} className={s.chip}>
          <input type="radio" name={name} value={option.key} checked={state[name] === option.key} onChange={() => setState({ ...state, [name]: option.key })} />
          <span>{option.label}</span>
        </label>
      ))}
    </fieldset>
  );

  return (
    <div>
      <form className={s.filters} role="search" aria-label={labels.label} onSubmit={(e) => e.preventDefault()}>
        <div className={s.search}>
          <label htmlFor={searchId}>{labels.search}</label>
          <input
            id={searchId}
            type="search"
            value={state.query}
            placeholder={labels.searchPlaceholder}
            autoComplete="off"
            onChange={(e) => setState({ ...state, query: e.target.value })}
          />
        </div>
        {chips('bay', labels.bay, bays)}
        {usedCategories.length > 1 && chips('category', labels.category, usedCategories)}
      </form>

      <p className={s.resultCount} aria-live="polite">
        {visible.length === 1 ? labels.resultsOne : labels.results.replace('{n}', String(visible.length))}
        {filtered && (
          <button type="button" className={s.reset} onClick={() => setState({ bay: 'all', category: 'all', query: '' })}>
            {labels.reset}
          </button>
        )}
      </p>

      <ul className={s.cards}>
        {items.map((item) => (
          <li key={item.slug} hidden={!visible.includes(item)}>
            <article className={s.card}>
              <div className={s.cardPhoto}>
                {item.image ? (
                  <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 400px" quality={75} />
                ) : (
                  <span className={s.cardNoPhoto} aria-hidden="true">{item.name.charAt(0)}</span>
                )}
                <span className={s.cardStop} data-stop={item.isGreenRubyStop || undefined}>
                  {item.isGreenRubyStop ? labels.stop : labels.regional}
                </span>
              </div>
              <div className={s.cardBody}>
                <p className={s.cardMeta}>
                  {item.bayLabel} · {item.categoryLabel}
                </p>
                <h3>
                  <Link href={item.href} className={s.cardLink}>{item.name}</Link>
                </h3>
                {item.summary && <p className={s.cardSummary}>{item.summary}</p>}
                <span className={s.cardMore} aria-hidden="true">{labels.readMore} ↗︎</span>
              </div>
            </article>
          </li>
        ))}
      </ul>
      {visible.length === 0 && <p className={s.empty}>{labels.empty}</p>}
    </div>
  );
}
