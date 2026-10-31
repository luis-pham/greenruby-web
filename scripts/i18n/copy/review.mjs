// Builds the Phase 2A English–Japanese review package from the code and the drafts (read-only on the code).
//   node scripts/i18n/copy/review.mjs
// Inputs:  src/** (via extract.mjs), docs/i18n-audit/phase-2a/notes/*.json (review flags and notes),
//          docs/i18n-audit/phase-2a/cms/cms-config-{source,ja-draft}.json, docs/i18n-audit/phase-2a/writing-app.json
// Outputs: docs/i18n-audit/phase-2a/japanese-ui-review.{md,csv}, docs/i18n-audit/phase-2a/qa.json
// Every row of the dataset is written; nothing is sampled. Status defaults to PENDING_REVIEW; APPROVED is never set here.
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extract } from './extract.mjs';
import { OUT_OF_SCOPE, SECTIONS, TECHNICAL, sectionOf } from './scope.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../../..');
const DOCS = join(ROOT, 'docs/i18n-audit/phase-2a');
const STATUSES = ['PENDING_REVIEW', 'NEEDS_CONTEXT', 'LEGAL_REVIEW_REQUIRED', 'COMMERCIAL_REVIEW_REQUIRED', 'APPROVED', 'REJECTED'];

const readJson = (p, fallback) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : fallback);
const notes = Object.assign({}, ...readdirSync(join(DOCS, 'notes')).filter((f) => f.endsWith('.json')).map((f) => readJson(join(DOCS, 'notes', f), {})));

// ---------------------------------------------------------------- QA checks (automatic, per row)
const KATAKANA = /[゠-ヿ]/g;
const JAPANESE = /[぀-ヿ一-鿿]/;
const ALLOWED_LATIN = /Green Ruby( Cruises| 1| 2)?|Imperial Suite|Royal Romance Suite|Ocean Breeze Premium|Serenity Deluxe|Green Globe|GSTC|HALCERT|Starlink|Zalo|WhatsApp|Messenger|Wi-Fi|USD|US\$|VND|E-Brochure|Tuan Chau|Gia Luan|Lan Ha|Ha Long|Cookie|SNS|Instagram|Facebook|YouTube|TikTok|Google|PayPal|Stripe|Visa|Mastercard|JCB|AMEX|SePay|VietQR|QR|PDF|FAQ|SEO|TPX|JOINT STOCK COMPANY|Bleisure|VR|360°|ID|OK|AM|PM|kW|CO₂|m²|km|kg|cm|GMT\+7|ICT|UNESCO|Tai Chi|Spa|Wellness|Halal|Michelin|Instagram|LinkedIn|email|e-mail|e\.g\./g;
const vars = (s) => (s.match(/\$\{[^}]+\}/g) ?? []).map((v) => v.replace(/\s+/g, '')).sort();

function qa(row) {
  const issues = [];
  if (row.jaKind === 'null') { issues.push('intentionally empty (as in vi)'); return issues; }
  if (row.ja === null || row.ja === undefined || row.ja === '') { issues.push('missing'); return issues; }
  if (row.kind === 'function') {
    if (row.jaKind && row.jaKind !== 'function') issues.push('not a function');
    if (JSON.stringify((row.params ?? []).slice(0, row.jaParams?.length ?? 0)) !== JSON.stringify(row.jaParams)) issues.push(`parameters ${JSON.stringify(row.jaParams)} ≠ ${JSON.stringify(row.params)}`);
    // A parameter the English interpolates must still be used by the Japanese (a plural-only parameter may go, as in vi).
    const names = (row.params ?? []).map((p) => p.replace(/[:=].*$/, '').trim());
    const shown = new Set((row.en.match(/\$\{[^}]+\}/g) ?? []).flatMap((v) => v.match(/[A-Za-z_$][\w$]*/g) ?? []));
    const body = row.ja.slice(row.ja.indexOf('=>') + 2);
    const missing = names.filter((p) => shown.has(p) && !new RegExp(`\\b${p}\\b`).test(body));
    if (missing.length) issues.push(`interpolated parameter dropped in ja: ${missing.join(', ')}`);
  }
  if (row.kind === 'template' && JSON.stringify(vars(row.en)) !== JSON.stringify(vars(row.ja))) issues.push(`interpolation ${vars(row.ja).join(' ')} ≠ ${vars(row.en).join(' ')}`);
  const text = row.kind === 'function' ? row.ja.slice(row.ja.indexOf('=>') + 2) : row.ja;
  const stripped = text.replace(/\$\{[^}]+\}/g, '').replace(ALLOWED_LATIN, '');
  if (JAPANESE.test(row.en) === false && /[A-Za-z]{4,}/.test(row.en) && row.ja === row.en) issues.push('identical to English');
  else if (/[A-Za-z]{4,}(\s+[A-Za-z]{3,}){1,}/.test(stripped)) issues.push('English words left');
  if (/[!](?!\=)/.test(text) && !/!/.test(row.en)) issues.push('exclamation mark');
  if (/[a-zぁ-んァ-ヶ一-龠][,.](\s|$)/.test(text.replace(/\$\{[^}]+\}/g, '')) && JAPANESE.test(text)) issues.push('ASCII punctuation after Japanese');
  const kana = (text.match(KATAKANA) ?? []).length, jp = (text.match(/[぀-ヿ一-鿿]/g) ?? []).length;
  if (jp >= 8 && kana / jp > 0.6) issues.push(`katakana-heavy (${Math.round((100 * kana) / jp)}%)`);
  const key = row.path.split('.').pop() ?? '';
  // Display width in full-width units: CJK and full-width forms count 1, half-width (Latin, digits) 0.5.
  const len = Math.ceil([...text.replace(/\$\{[^}]+\}/g, '')].reduce((w, c) => w + (/[\u1100-\u115F\u2E80-\uA4CF\uAC00-\uD7A3\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFF60\uFFE0-\uFFE6]/.test(c) ? 1 : 0.5), 0));
  if (/metaTitle|seoTitle|seo_title/i.test(key + row.field) && len > 32) issues.push(`SEO title ${len} full-width units (>32)`);
  if (/metaDescription|seoDescription|seo_description/i.test(key + row.field) && len > 120) issues.push(`SEO description ${len} full-width units (>120)`);
  if (/(button|cta|Cta|Button|submit|book|enquire|primary|secondary)$/i.test(key) && row.kind === 'string' && len > 12) issues.push(`button label ${len} full-width units (>12)`);
  return issues;
}

// ---------------------------------------------------------------- web rows
const { rows: all, hardcoded } = extract();
const webRows = [];
const skipped = { outOfScope: [], technical: [] };
for (const r of all) {
  if (OUT_OF_SCOPE[r.file]) { skipped.outOfScope.push(r); continue; }
  if (TECHNICAL[r.file] || r.kind === 'spread') { skipped.technical.push(r); continue; }
  const note = notes[r.id] ?? {};
  const status = STATUSES.includes(note.status) ? note.status : 'PENDING_REVIEW';
  webRows.push({ ...r, source: 'web', location: `greenruby-web/${r.file} → ${r.binding}${r.path ? '.' + r.path : ''}`, section: sectionOf(r), status: status === 'APPROVED' ? 'PENDING_REVIEW' : status, risk: note.risk ?? '', note: note.note ?? '', field: '' });
}

// ---------------------------------------------------------------- CMS rows
const cmsSource = readJson(join(DOCS, 'cms/cms-config-source.json'), { rows: [] });
const cmsDraft = new Map(readJson(join(DOCS, 'cms/cms-config-ja-draft.json'), { rows: [] }).rows.map((r) => [r.id, r]));
const cmsRows = [];
const cmsExcluded = [];
for (const r of cmsSource.rows) {
  if (r.scope !== 'in') { cmsExcluded.push(r); continue; }
  const d = cmsDraft.get(r.id) ?? {};
  cmsRows.push({
    id: r.id, source: 'cms', section: SECTIONS[10], location: `CMS ${r.table}#${r.row_id}.${r.field}${r.json_path ? ' ' + r.json_path : ''}`, kind: 'string', path: r.field, field: r.field,
    en: r.en, ja: d.ja ?? null, status: STATUSES.includes(d.status) && d.status !== 'APPROVED' ? d.status : 'PENDING_REVIEW', risk: d.risk ?? '', note: d.note ?? '',
  });
}

// ---------------------------------------------------------------- writing app rows (audit of locale controls)
const writing = readJson(join(DOCS, 'writing-app.json'), { rows: [] }).rows.map((r) => ({ ...r, source: 'write', section: SECTIONS[11], kind: 'string', path: r.id }));

// ---------------------------------------------------------------- hard-coded findings (other discovered strings)
const other = hardcoded.map((h, i) => ({
  id: `HARD-${String(i + 1).padStart(3, '0')}`, source: 'web', section: SECTIONS[12], location: `greenruby-web/${h.file}:${h.line} (${h.kind})`, kind: 'finding', path: '',
  en: h.text, ja: null, status: 'NEEDS_CONTEXT', risk: 'hard-coded', note: '',
}));
const otherNotes = readJson(join(DOCS, 'notes/_hardcoded.json'), {});
for (const o of other) {
  const n = otherNotes[`${o.location}`] ?? otherNotes[o.en];
  if (n) Object.assign(o, { status: n.status ?? o.status, risk: n.risk ?? o.risk, note: n.note ?? '', ja: n.ja ?? null });
}

const dataset = [...webRows, ...cmsRows, ...writing, ...other];
for (const r of dataset) r.qa = r.kind === 'finding' ? [] : qa(r);

// ---------------------------------------------------------------- stable display ids per section
const prefix = { 0: 'NAV', 1: 'HOME', 2: 'CRUISE', 3: 'CABIN', 4: 'BOOK', 5: 'PAY', 6: 'FORM', 7: 'PAGE', 8: 'ERR', 9: 'SEO', 10: 'CMS', 11: 'WRITE', 12: 'OTHER' };
const ordered = SECTIONS.flatMap((s, i) => dataset.filter((r) => r.section === s).map((r, j) => ({ ...r, displayId: r.kind === 'finding' ? r.id : `${prefix[i]}-${String(j + 1).padStart(3, '0')}` })));

// ---------------------------------------------------------------- outputs
const oneLine = (s) => (s ?? '').replace(/\r?\n/g, ' ⏎ ');
const md = (s) => oneLine(s).replace(/\|/g, '\\|');
const context = (r) => [r.kind === 'function' ? 'function (parameters kept)' : r.kind === 'template' ? 'template with variables' : '', r.note, r.qa?.length ? `QA: ${r.qa.join('; ')}` : ''].filter(Boolean).join(' — ');

let out = `# Japanese UI review — English ↔ Japanese (Phase 2A)\n\nGenerated by \`scripts/i18n/copy/review.mjs\` from the code and the drafts. **Every row of the dataset is listed** (${ordered.length} rows). Statuses are proposals; nothing is approved. No row has had native-speaker review.\n\nColumns: ID · Location (repository/file → key, or CMS table#row.field) · English original · Proposed Japanese · Context / meaning (notes, function/template, automatic QA findings) · Status · Risk.\n\n`;
for (const s of SECTIONS) {
  const rows = ordered.filter((r) => r.section === s);
  out += `## ${s}\n\n${rows.length} rows.\n\n`;
  if (!rows.length) { out += '_No rows._\n\n'; continue; }
  out += '| ID | Location | English original | Proposed Japanese | Context / meaning | Status | Risk |\n|---|---|---|---|---|---|---|\n';
  for (const r of rows) out += `| ${r.displayId} | ${md(r.location)} | ${md(r.en)} | ${md(r.ja ?? '—')} | ${md(context(r))} | ${r.status} | ${md(r.risk)} |\n`;
  out += '\n';
}
writeFileSync(join(DOCS, 'japanese-ui-review.md'), out);

const csvCell = (s) => `"${String(s ?? '').replace(/"/g, '""')}"`;
const header = ['ID', 'Stable key', 'Section', 'Source', 'Location', 'Kind', 'English original', 'Proposed Japanese', 'Context / meaning', 'QA findings', 'Status', 'Risk'];
const csv = [header, ...ordered.map((r) => [r.displayId, r.id, r.section, r.source, r.location, r.kind, r.en, r.ja ?? '', r.note, (r.qa ?? []).join('; '), r.status, r.risk])].map((l) => l.map(csvCell).join(',')).join('\r\n');
writeFileSync(join(DOCS, 'japanese-ui-review.csv'), '﻿' + csv + '\r\n');

// ---------------------------------------------------------------- coverage numbers (for the coverage report)
const count = (list, f) => list.filter(f).length;
const stat = {
  generatedAt: new Date().toISOString(),
  web: {
    englishStringsFound: all.length,
    englishChars: all.reduce((s, r) => s + r.en.length, 0),
    inScope: webRows.length,
    inScopeChars: webRows.reduce((s, r) => s + r.en.length, 0),
    translated: count(webRows, (r) => r.ja !== null),
    missing: webRows.filter((r) => r.ja === null).map((r) => r.id),
    outOfScope: Object.entries(OUT_OF_SCOPE).map(([file, reason]) => ({ file, reason, strings: count(skipped.outOfScope, (r) => r.file === file), chars: skipped.outOfScope.filter((r) => r.file === file).reduce((s, r) => s + r.en.length, 0) })),
    technical: Object.entries(TECHNICAL).map(([file, reason]) => ({ file, reason, strings: count(skipped.technical, (r) => r.file === file) })),
    hardcodedFindings: other.length,
  },
  cms: { found: cmsSource.rows.length, inScope: cmsRows.length, translated: count(cmsRows, (r) => r.ja), excluded: cmsExcluded.length, excludedByReason: cmsExcluded.reduce((m, r) => ((m[r.reason.replace(/\(\d+ characters\)/, '').trim()] = (m[r.reason.replace(/\(\d+ characters\)/, '').trim()] ?? 0) + 1), m), {}), sourceDatabase: cmsSource.source_database },
  writingApp: { rows: writing.length, translated: count(writing, (r) => r.ja) },
  status: Object.fromEntries(STATUSES.map((s) => [s, count(ordered, (r) => r.status === s)])),
  statusBySource: Object.fromEntries(['web', 'cms', 'write'].map((src) => [src, Object.fromEntries(STATUSES.map((s) => [s, count(ordered, (r) => r.source === src && r.status === s)]))])),
  qa: { rowsWithFindings: count(ordered, (r) => r.qa?.length), byType: ordered.flatMap((r) => (r.qa ?? []).map((q) => q.replace(/\s*\(.*|\s\d+.*| \[.*|: .*/, ''))).reduce((m, q) => ((m[q] = (m[q] ?? 0) + 1), m), {}) },
  sections: Object.fromEntries(SECTIONS.map((s) => [s, count(ordered, (r) => r.section === s)])),
};
writeFileSync(join(DOCS, 'qa.json'), JSON.stringify({ stat, findings: ordered.filter((r) => r.qa?.length).map((r) => ({ id: r.displayId, key: r.id, en: r.en, ja: r.ja, qa: r.qa })) }, null, 1));
console.log(JSON.stringify(stat, null, 1));
