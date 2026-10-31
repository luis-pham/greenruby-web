import { isLegacyLocale, locales } from './i18n.ts';

// Intl 404s (phase 2B). Each intl tree has a catch-all, app/(code)/code/[...missing] (scripts/i18n/routes-generate.mjs),
// that renders the language's own 404 for URLs no page of the tree serves. src/proxy.ts lets requests into a tree only
// while the language is effectively public (or for an editor's authenticated preview); otherwise every URL of the tree
// is rewritten to a path no route matches, so it gets exactly the English global 404 /ja answered before Japanese
// existed (no hint that the language exists).

export const CATCH_ALL = '[...missing]';

/** A path no route matches: rewriting to it serves app/global-not-found.tsx (status 404). */
export const UNMATCHED_PATH = '/_gr-unmatched-404';

/** The intl locale of any path of an intl tree, its home included ('/ja', '/ja/…' → 'ja'); null for en/vi paths. */
export const intlTreeLocale = (pathname: string): string | null =>
  locales.find((l) => !isLegacyLocale(l) && (pathname === `/${l}` || pathname.startsWith(`/${l}/`))) ?? null;
