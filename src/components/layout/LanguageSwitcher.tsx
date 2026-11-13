'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { localeInfo, locales, type Locale } from '@/lib/i18n';
import { FlagDE, FlagES, FlagGB, FlagFR, FlagJP, FlagKR, FlagVN } from './Flags';
import s from './layout.module.css';

// Menu order (owner 2026-11-13): the two home languages first, then Latin-script languages alphabetically by their own
// name (Deutsch, Español, Français), then Japanese and Korean. Compiled locales missing here are appended.
const MENU_ORDER: readonly Locale[] = ['en', 'vi', 'de', 'es', 'fr', 'ja', 'ko'];
const LANGUAGES: { locale: Locale; name: string; code: string }[] = [...MENU_ORDER.filter((l) => locales.includes(l)), ...locales.filter((l) => !MENU_ORDER.includes(l))].map(
  (locale) => ({ locale, name: localeInfo[locale].nativeName, code: localeInfo[locale].code }),
);

const FLAGS: Record<Locale, (uid: string) => ReactNode> = {
  en: (uid) => <FlagGB uid={uid} />,
  vi: () => <FlagVN />,
  ja: () => <FlagJP />,
  fr: () => <FlagFR />,
  es: () => <FlagES />,
  de: () => <FlagDE />,
  ko: () => <FlagKR />,
};
const flag = (locale: Locale, uid: string) => FLAGS[locale](uid);

/**
 * Language switcher: the current language's flag + code; opening it lists the current language and every language
 * with a target in `links` (lib/hreflang.ts switcherLinks: an exact translation, or for en/vi the other language's
 * page as before). Languages without one are not listed.
 * A <details> element (works without JavaScript); closes on outside click, Escape or picking a language.
 */
export function LanguageSwitcher({ locale, links, label }: { locale: Locale; links: Partial<Record<Locale, string>>; label: string }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const current = LANGUAGES.find((l) => l.locale === locale) ?? LANGUAGES[0];
  const listed = LANGUAGES.filter((l) => l.locale === locale || links[l.locale]);

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
        {listed.map((l) => (
          <li key={l.locale}>
            {l.locale === locale ? (
              <span className={s.langOption} aria-current="true">
                <span className={s.flag}>{flag(l.locale, `lang-${l.locale}`)}</span>
                {l.name}
                <span className={s.langCheck} aria-hidden="true">✓</span>
              </span>
            ) : (
              <a className={s.langOption} href={links[l.locale]} hrefLang={l.locale} lang={l.locale}>
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
