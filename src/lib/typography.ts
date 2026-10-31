import type { Locale } from './i18n.ts';

// Locale-aware joins for copy the views assemble from parts (phase 2B). Japanese is written without spaces between
// words, so the half-width space English and Vietnamese put between the parts is dropped there. Every helper returns
// exactly the previous English/Vietnamese text (the same single ' ' / ': '), so their rendered output is unchanged.

/** Languages written without spaces between words. */
const UNSPACED: ReadonlySet<string> = new Set(['ja']);

/**
 * The space between parts a view joins: split headings `{title}{wordSpace(locale)}<em>{titleEm}</em>`, statement
 * lines, a number and its unit (`3 Guests` / `3名`). ' ' for en/vi (exactly the JSX space it replaces), '' for ja.
 * Render it as its own child, where the JSX space was, so the en/vi React tree (HTML and RSC payload) stays the same.
 */
export const wordSpace = (locale: Locale): ' ' | '' => (UNSPACED.has(locale) ? '' : ' ');

/** `Next departure: 15 Feb 2027` / `次回の出発日：2027年2月15日` (full-width colon, no space, as in the glossary). */
export const labelled = (label: string, value: string, locale: Locale): string => `${label}${UNSPACED.has(locale) ? '：' : ': '}${value}`;

/**
 * Splits copy at a `{name}` placeholder, so a language can place an element (a link) mid-sentence:
 * '詳しくは{link}をご覧ください。' → ['詳しくは', 'をご覧ください。']. null when the copy has no placeholder
 * (the caller then renders its existing English/Vietnamese layout unchanged).
 */
export function splitAt(text: string, name: string): [before: string, after: string] | null {
  const token = `{${name}}`;
  const at = text.indexOf(token);
  return at === -1 ? null : [text.slice(0, at), text.slice(at + token.length)];
}
