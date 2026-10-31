// Phase 2A: assembles src/messages/ja.ts from the per-section drafts src/messages/ja.part*.ts (each
// `export const jaPartN = { …sections } satisfies Pick<Messages, …>`), in the key order of src/messages/en.ts.
// Refuses unless every top-level section of en.ts is present exactly once. The part files are left for removal.
//   node scripts/i18n/copy/assemble-ja.mjs
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '../../../src/messages');
const parse = (file) => ts.createSourceFile(file, readFileSync(join(DIR, file), 'utf8'), ts.ScriptTarget.Latest, true);
const objectOf = (sf, name) => {
  let found = null;
  const visit = (n) => {
    if (ts.isVariableDeclaration(n) && n.name.getText() === name) {
      let init = n.initializer;
      while (init && (ts.isSatisfiesExpression(init) || ts.isAsExpression(init) || ts.isParenthesizedExpression(init))) init = init.expression;
      found = init;
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
  if (!found || !ts.isObjectLiteralExpression(found)) throw new Error(`${name}: object literal not found`);
  return found;
};

const order = objectOf(parse('en.ts'), 'en').properties.map((p) => p.name.getText());
const sections = new Map();
for (const file of readdirSync(DIR).filter((f) => /^ja\.part\d+\.ts$/.test(f)).sort()) {
  const sf = parse(file);
  const name = `jaPart${file.match(/\d+/)[0]}`;
  for (const p of objectOf(sf, name).properties) {
    const key = p.name.getText();
    if (sections.has(key)) throw new Error(`section ${key} defined twice`);
    sections.set(key, p.getText(sf));
  }
}
const missing = order.filter((k) => !sections.has(k));
const extra = [...sections.keys()].filter((k) => !order.includes(k));
if (missing.length || extra.length) throw new Error(`missing sections: ${missing.join(', ') || '-'}; unknown sections: ${extra.join(', ') || '-'}`);

const body = order.map((k) => '  ' + sections.get(k).replace(/\n/g, '\n')).join(',\n');
const out = `import type { Messages } from './en';

// Japanese interface dictionary (phase 2A). DRAFT, PENDING_REVIEW: every string still needs native review
// (docs/i18n-audit/phase-2a/japanese-ui-review.md). Having this file makes the web build report Japanese as
// "dictionary present"; Japanese stays unpublished until the CMS registry makes it public (I18N flags, G4).
const ja: Messages = {
${body},
};

export default ja;
`;
writeFileSync(join(DIR, 'ja.ts'), out);
console.log(`ja.ts written: ${order.length} sections from ${[...sections.keys()].length} drafted sections`);
