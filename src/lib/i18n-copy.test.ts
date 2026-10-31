// Japanese interface copy (phase 2A): every in-scope English string has a Japanese draft with the same parameters
// and interpolations; out-of-scope sections stay untranslated (they have no /ja route). Static, via the inventory tool.
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

// The tooling lives outside src (scripts/i18n/copy); loaded by URL so the app's type check does not depend on it.
const tool = (name: string) => import(new URL(`../../scripts/i18n/copy/${name}`, import.meta.url).href);
const { extract } = await tool('extract.mjs');
const scope = await tool('scope.mjs');

type Row = { id: string; file: string; kind: string; en: string; ja: string | null; params: string[] | null; jaParams: string[] | null; jaKind: string | null };
const { rows } = extract() as { rows: Row[] };
const OUT_OF_SCOPE: Record<string, string> = scope.OUT_OF_SCOPE;
const TECHNICAL: Record<string, string> = scope.TECHNICAL;
const inScope = rows.filter((r) => !OUT_OF_SCOPE[r.file] && !TECHNICAL[r.file] && r.kind !== 'spread');
const vars = (s: string) => (s.match(/\$\{[^}]+\}/g) ?? []).map((v) => v.replace(/\s+/g, '')).sort();
/** Identifiers interpolated by a function's template literals (what the reader actually sees). */
const shown = (src: string) => new Set((src.match(/\$\{[^}]+\}/g) ?? []).flatMap((v) => v.match(/[A-Za-z_$][\w$]*/g) ?? []));

describe('Japanese interface copy', () => {
  it('covers every in-scope English string', () => {
    // ja: null mirrors a deliberate null in vi (e.g. a link that exists only in English)
    const missing = inScope.filter((r) => r.ja === null && r.jaKind !== 'null').map((r) => r.id);
    assert.deepEqual(missing, [], `${missing.length} strings without Japanese`);
    assert.ok(inScope.length > 1000, 'the inventory found the site copy');
  });

  it('keeps function parameters and interpolated variables', () => {
    for (const r of inScope) {
      if (r.kind === 'function') {
        assert.equal(r.jaKind, 'function', `${r.id} must stay a function`);
        // Fewer parameters are fine when a parameter only chose a plural form (as in vi); order must match.
        assert.deepEqual(r.jaParams, (r.params ?? []).slice(0, r.jaParams?.length ?? 0), `${r.id} parameters`);
        const body = (r.ja ?? '').slice((r.ja ?? '').indexOf('=>') + 2);
        const lost = [...shown(r.en)].filter((v) => (r.params ?? []).some((p) => p.split(/[:=]/)[0].trim() === v) && !new RegExp(`\\b${v}\\b`).test(body));
        assert.deepEqual(lost, [], `${r.id} interpolated parameters`);
      }
      if (r.kind === 'template') assert.deepEqual(vars(r.ja ?? ''), vars(r.en), `${r.id} interpolations`);
    }
  });

  it('adds no Japanese to out-of-scope sections (legal, guides, brand facts, eco)', () => {
    const partial = rows.filter((r) => OUT_OF_SCOPE[r.file] && r.ja !== null).map((r) => r.id);
    assert.deepEqual(partial, []);
  });

  it('has a main Japanese dictionary', () => {
    assert.ok(rows.some((r) => r.file === 'src/messages/en.ts'));
    const dict = rows.filter((r) => r.file === 'src/messages/en.ts');
    assert.equal(dict.filter((r) => r.ja === null).length, 0, 'src/messages/ja.ts covers every key of en.ts');
  });
});
