#!/usr/bin/env node
// Compares two capture.mjs runs field by field. Exit 0 = identical, 1 = differences, 2 = usage error.
//   node scripts/i18n/compare.mjs <baselineDir> <candidateDir> [--ignore field1,field2]
// --ignore is only for documented, reviewed exceptions (15-release-checklist.md §1, G4 column); never to make
// an unexplained difference pass.
import { readJson, parseArgs } from './lib.mjs';

const args = parseArgs(process.argv.slice(2));
const [a, b] = args._;
if (!a || !b) {
  console.error('usage: compare.mjs <baselineDir> <candidateDir> [--ignore f1,f2]');
  process.exit(2);
}
const ignore = new Set(String(args.ignore ?? '').split(',').filter(Boolean));
const [left, right] = await Promise.all([readJson(`${a}/urls.json`), readJson(`${b}/urls.json`)]);
const index = (rows) => new Map(rows.map((r) => [r.path, r]));
const L = index(left);
const R = index(right);

const diffs = [];
for (const path of [...new Set([...L.keys(), ...R.keys()])].sort()) {
  const x = L.get(path);
  const y = R.get(path);
  if (!x || !y) {
    diffs.push({ path, field: '(url)', baseline: x ? 'present' : 'missing', candidate: y ? 'present' : 'missing' });
    continue;
  }
  for (const field of [...new Set([...Object.keys(x), ...Object.keys(y)])]) {
    if (ignore.has(field)) continue;
    const u = JSON.stringify(x[field] ?? null);
    const v = JSON.stringify(y[field] ?? null);
    if (u !== v) diffs.push({ path, field, baseline: x[field] ?? null, candidate: y[field] ?? null });
  }
}

const byField = diffs.reduce((m, d) => ({ ...m, [d.field]: (m[d.field] ?? 0) + 1 }), {});
console.log(`compared ${L.size} vs ${R.size} URLs: ${diffs.length} differences`, byField);
for (const d of diffs.slice(0, Number(args.show ?? 50))) console.log(JSON.stringify(d));
process.exit(diffs.length ? 1 : 0);
