// Phase 2A scope of the Japanese interface copy. Files listed here are inventoried but not translated; everything
// else that has English copy must have Japanese (checked by src/lib/i18n-copy.test.ts).

/** Not translated in Phase 2A, with the reason. None of these sections has a generated /ja route. */
export const OUT_OF_SCOPE = {
  'src/views/brand-facts/messages.ts': 'Brand facts page: commercial facts deferred to G3; section not routed for ja',
  'src/views/eco/messages.ts': 'Eco dashboard: environmental figures (commercial facts); section not routed for ja',
  'src/views/legal/booking-terms.ts': 'Legal document (booking terms): separate legal approval; section not routed for ja',
  'src/views/legal/messages.ts': 'Legal pages (privacy, terms, safety, payment methods): separate legal approval; not routed for ja',
  'src/views/legal/cookie-policy.ts': 'Legal document (cookie policy): separate legal approval; not routed for ja',
};

/**
 * Translated (2026-11-01, travel guides routed for ja) but checked by their own tests, not by the row inventory:
 * the operator registry keeps hidden rows (listed: false) untranslated, and its notes join shared constants.
 * See src/views/guides/operators.test.ts and the guide content structure checks.
 */
export const OWN_CHECKS = {
  'src/views/guides/operators.ts': 'Travel guides: operator registry (shown rows have ja; hidden rows never render)',
  'src/views/guides/OperatorTable.tsx': 'Travel guides: operator table labels and ja formatting',
  'src/views/guides/hub-messages.ts': 'Travel guides hub copy (en/vi/ja objects)',
  'src/views/topic-headings.ts': 'SEO topic H1s for the experiences, FAQ and services hubs: en and vi only by design; other languages keep their slogan H1',
  'src/views/cabin/rate-notes.ts': 'Cabin page note under rates on request (launch month, voyage inclusions): en and vi only by design',
};

/** Not copy: URL segments, URL paths, locale metadata, components or channel keys. */
export const TECHNICAL = {
  'src/lib/i18n.ts': 'URL segments and locale metadata (ja uses English URL segments by design)',
  'src/lib/guide-links.ts': 'URL paths of guide articles (ja links its own articles once its blog is public)',
  'src/views/blog/paths.ts': 'URL slug of the news category',
  'src/components/layout/LanguageSwitcher.tsx': 'flag components per language',
  'src/components/layout/index.tsx': 'chat channel keys per language (not text)',
  'src/views/services/data.ts': 'CMS FAQ-group slug per language (not text; ja must match the ja FAQ group slug)',
};

/** Review sections (order of the review document). */
export const SECTIONS = [
  '1. Navigation and footer',
  '2. Homepage UI',
  '3. Cruises, itineraries, experiences and destinations',
  '4. Cabins, facilities and services',
  '5. Booking flow',
  '6. Payments and confirmations',
  '7. Forms and validation',
  '8. FAQ, blog, news and supporting pages',
  '9. Error states and system messages',
  '10. SEO metadata and templates',
  '11. CMS configuration content',
  '12. Writing app UI',
  '13. Other discovered strings',
];

const last = (path) => path.split('.').filter((p) => !/^\d+$/.test(p)).pop() ?? '';

export function sectionOf(row) {
  const key = last(row.path);
  if (/^(meta|seo)|Meta(Title|Description)$|^(title|description)Template$|pageSuffix|categoryDescription/i.test(key) || /(^|\.)(meta|seo)(\.|$)/i.test(row.path)) return SECTIONS[9];
  const top = row.path.split('.')[0];
  if (row.file === 'src/messages/en.ts') {
    if (['topbar', 'nav', 'footer', 'cookies', 'chat', 'breadcrumb'].includes(top)) return SECTIONS[0];
    if (top === 'home') return SECTIONS[1];
    if (['cruise', 'itineraries', 'itinerary', 'travel'].includes(top)) return SECTIONS[2];
    if (top === 'cabin') return SECTIONS[3];
    if (top === 'booking') return /pay|deposit|balance|refund|receipt|invoice|confirm|success|paid|amount|total|due|card|bank|transfer|link/i.test(row.path) ? SECTIONS[5] : SECTIONS[4];
    if (top === 'contact') return /error|invalid|required|placeholder|valid|consent|privacy/i.test(row.path) ? SECTIONS[6] : SECTIONS[7];
  }
  if (/not-found/.test(row.file)) return SECTIONS[8];
  if (/\/home\//.test(row.file)) return SECTIONS[1];
  if (/\/(experiences|destinations)\//.test(row.file)) return SECTIONS[2];
  if (/\/(services|cabin)\//.test(row.file) || /cabin-card/.test(row.file)) return SECTIONS[3];
  if (/components\/booking\//.test(row.file)) return /pay|deposit|price|total/i.test(row.path) ? SECTIONS[5] : SECTIONS[4];
  if (/\/(faq|blog|news|about|gallery)\/|journal/.test(row.file)) return SECTIONS[7];
  return SECTIONS[12];
}
