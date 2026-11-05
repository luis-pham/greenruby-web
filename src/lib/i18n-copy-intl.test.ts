// Interface copy of every other intl locale with a dictionary (fr …), held to the same rules as Japanese
// (i18n-copy.test.ts): every in-scope English string has a translation with the same parameters and interpolations,
// and out-of-scope sections stay untranslated. A locale without src/messages/<code>.ts is not ready and is skipped.
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { describe, it } from 'node:test';
import { isLegacyLocale, locales } from './i18n.ts';

const tool = (name: string) => import(new URL(`../../scripts/i18n/copy/${name}`, import.meta.url).href);
const { extract } = await tool('extract.mjs');
const scope = await tool('scope.mjs');
const OUT_OF_SCOPE: Record<string, string> = scope.OUT_OF_SCOPE;
const TECHNICAL: Record<string, string> = scope.TECHNICAL;
const OWN_CHECKS: Record<string, string> = scope.OWN_CHECKS;

type Row = { id: string; file: string; kind: string; en: string; ja: string | null; params: string[] | null; jaParams: string[] | null; jaKind: string | null };
const vars = (s: string) => (s.match(/\$\{[^}]+\}/g) ?? []).map((v) => v.replace(/\s+/g, '')).sort();
const shown = (src: string) => new Set((src.match(/\$\{[^}]+\}/g) ?? []).flatMap((v) => v.match(/[A-Za-z_$][\w$]*/g) ?? []));

const targets = locales.filter((l) => !isLegacyLocale(l) && l !== 'ja' && existsSync(new URL(`../messages/${l}.ts`, import.meta.url)));

for (const code of targets) {
  // extract() reports the target locale's copy in the historical ja* fields
  const { rows } = extract(code) as { rows: Row[] };
  const inScope = rows.filter((r) => !OUT_OF_SCOPE[r.file] && !TECHNICAL[r.file] && !OWN_CHECKS[r.file] && r.kind !== 'spread');

  describe(`${code} interface copy`, () => {
    it('covers every in-scope English string', () => {
      const missing = inScope.filter((r) => r.ja === null && r.jaKind !== 'null').map((r) => r.id);
      assert.deepEqual(missing, [], `${missing.length} strings without ${code}`);
      assert.ok(inScope.length > 1000, 'the inventory found the site copy');
    });

    it('keeps function parameters and interpolated variables', () => {
      for (const r of inScope) {
        if (r.kind === 'function') {
          assert.equal(r.jaKind, 'function', `${r.id} must stay a function`);
          assert.deepEqual(r.jaParams, (r.params ?? []).slice(0, r.jaParams?.length ?? 0), `${r.id} parameters`);
          const body = (r.ja ?? '').slice((r.ja ?? '').indexOf('=>') + 2);
          const lost = [...shown(r.en)].filter((v) => (r.params ?? []).some((p) => p.split(/[:=]/)[0].trim() === v) && !new RegExp(`\\b${v}\\b`).test(body));
          assert.deepEqual(lost, [], `${r.id} interpolated parameters`);
        }
        if (r.kind === 'template') assert.deepEqual(vars(r.ja ?? ''), vars(r.en), `${r.id} interpolations`);
      }
    });

    it('adds nothing to out-of-scope sections (legal, brand facts, eco)', () => {
      assert.deepEqual(rows.filter((r) => OUT_OF_SCOPE[r.file] && r.ja !== null).map((r) => r.id), []);
    });

    it(`has a main ${code} dictionary covering every key of en.ts`, () => {
      assert.equal(rows.filter((r) => r.file === 'src/messages/en.ts' && r.ja === null).length, 0);
    });
  });
}
