'use client';

import { useEffect, useRef } from 'react';
import type { Locale } from '@/lib/i18n';
import { FlagGB, FlagVN } from './Flags';
import s from './layout.module.css';

const LANGUAGES: { locale: Locale; name: string; code: string }[] = [
  { locale: 'en', name: 'English', code: 'EN' },
  { locale: 'vi', name: 'Tiếng Việt', code: 'VI' },
];

const flag = (locale: Locale, uid: string) => (locale === 'en' ? <FlagGB uid={uid} /> : <FlagVN />);

/**
 * Language switcher: the current language's flag + code; opening it lists every language's flag.
 * A <details> element (works without JavaScript); closes on outside click, Escape or picking a language.
 */
export function LanguageSwitcher({ locale, alternateHref, label }: { locale: Locale; alternateHref: string; label: string }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const current = LANGUAGES.find((l) => l.locale === locale) ?? LANGUAGES[0];

  useEffect(() => {
    const close = () => ref.current?.removeAttribute('open');
    const onPointer = (e: PointerEvent) => {
      if (ref.current?.open && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && ref.current?.open) {
        close();
        ref.current.querySelector('summary')?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <details ref={ref} className={s.lang}>
      <summary className={s.langCurrent} aria-label={`${label}: ${current.name}`} title={label}>
        <span className={s.flag}>{flag(current.locale, 'lang-current')}</span>
        <span className={s.langCode}>{current.code}</span>
        <svg className={s.chevron} viewBox="0 0 12 8" aria-hidden="true">
          <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <ul className={s.langMenu}>
        {LANGUAGES.map((l) => (
          <li key={l.locale}>
            {l.locale === locale ? (
              <span className={s.langOption} aria-current="true">
                <span className={s.flag}>{flag(l.locale, `lang-${l.locale}`)}</span>
                {l.name}
                <span className={s.langCheck} aria-hidden="true">✓</span>
              </span>
            ) : (
              <a className={s.langOption} href={alternateHref} hrefLang={l.locale} lang={l.locale}>
                <span className={s.flag}>{flag(l.locale, `lang-${l.locale}`)}</span>
                {l.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    </details>
  );
}
