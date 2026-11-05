// Static inventory of the website's interface copy (phase 2A). Read-only; parses src/ with the project's typescript.
//
// A "copy node" is any object literal with both `en` and `vi` members (LegacyCopy): inline values, or identifiers
// resolved to a const in the same file (`const en = {…}; byLocale({ en, vi })`), plus the main dictionaries
// src/messages/{en,vi,ja}.ts. Every leaf of the English value becomes one row with the matching vi/ja leaves:
// strings, templates (`${…}` kept verbatim) and functions (source text; parameters checked for ja).
// Also reported: hard-coded copy outside copy nodes (`locale === 'vi' ? 'x' : 'y'`, JSX text, aria-label/alt/
// placeholder/title literals), so nothing English reaches a Japanese page unnoticed.
//
//   node scripts/i18n/copy/extract.mjs [--json out.json]     (prints a summary per file)
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../../..');
const SRC = join(ROOT, 'src');

const walkDir = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    // skip the generated intl route trees ((ja), (fr) …): they only re-export the English shims
    if (statSync(p).isDirectory()) return name === 'node_modules' || /^\((?!en\)|vi\))[a-z]{2}\)$/.test(name) ? [] : walkDir(p);
    return /\.(ts|tsx)$/.test(name) && !/\.test\.ts$/.test(name) && !name.endsWith('.d.ts') ? [p] : [];
  });

const unwrap = (n) => {
  while (n && (ts.isAsExpression(n) || ts.isSatisfiesExpression?.(n) || ts.isParenthesizedExpression(n) || ts.isTypeAssertionExpression?.(n))) n = n.expression;
  return n;
};
const propName = (p) => (p.name && (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name) || ts.isNumericLiteral(p.name)) ? p.name.text : p.name?.getText());

function constsOf(sf) {
  const map = new Map();
  const visit = (n) => {
    if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name) && n.initializer) map.set(n.name.text, n);
    ts.forEachChild(n, visit);
  };
  visit(sf);
  return map;
}

/** Leaves of a copy value: { path, kind, text, params }. */
function leaves(node, consts, path = [], out = [], seen = new Set()) {
  node = unwrap(node);
  if (!node) return out;
  if (ts.isIdentifier(node) && consts.has(node.text) && !seen.has(node.text)) {
    seen.add(node.text);
    return leaves(consts.get(node.text).initializer, consts, path, out, seen);
  }
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) out.push({ path: path.join('.'), kind: 'string', text: node.text });
  else if (ts.isTemplateExpression(node)) out.push({ path: path.join('.'), kind: 'template', text: node.getText().slice(1, -1) });
  else if (ts.isArrowFunction(node) || ts.isFunctionExpression(node))
    out.push({ path: path.join('.'), kind: 'function', text: node.getText(), params: node.parameters.map((p) => p.name.getText()) });
  else if (ts.isObjectLiteralExpression(node)) {
    for (const p of node.properties) {
      if (ts.isPropertyAssignment(p)) leaves(p.initializer, consts, [...path, propName(p)], out, seen);
      else if (ts.isShorthandPropertyAssignment(p)) leaves(p.name, consts, [...path, p.name.text], out, seen);
      else if (ts.isMethodDeclaration(p)) out.push({ path: [...path, propName(p)].join('.'), kind: 'function', text: p.getText(), params: p.parameters.map((x) => x.name.getText()) });
      else if (ts.isSpreadAssignment(p)) out.push({ path: [...path, '...'].join('.'), kind: 'spread', text: p.expression.getText() });
    }
  } else if (ts.isArrayLiteralExpression(node)) node.elements.forEach((e, i) => leaves(e, consts, [...path, String(i)], out, seen));
  else if (ts.isConditionalExpression(node)) out.push({ path: path.join('.'), kind: 'expression', text: node.getText() });
  else if (node.kind === ts.SyntaxKind.NullKeyword) out.push({ path: path.join('.'), kind: 'null', text: null }); // deliberately empty
  // numbers, booleans, references to non-copy values: not copy
  return out;
}

/** The name a copy node is bound to: enclosing variable/property chain. */
function bindingName(node) {
  const names = [];
  for (let n = node.parent; n; n = n.parent) {
    if (ts.isPropertyAssignment(n)) names.unshift(propName(n));
    else if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name)) { names.unshift(n.name.text); break; }
    else if (ts.isFunctionDeclaration(n) && n.name) { names.unshift(n.name.text); break; }
  }
  return names.join('.') || '(anonymous)';
}

const ASCII_WORDS = /[A-Za-z]{3,}/;

function scanFile(file) {
  const rel = relative(ROOT, file);
  const text = readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const consts = constsOf(sf);
  const nodes = [];
  const hardcoded = [];
  const inCopy = new Set();

  const isCopyObject = (n) => ts.isObjectLiteralExpression(n) && ['en', 'vi'].every((k) => n.properties.some((p) => (ts.isPropertyAssignment(p) || ts.isShorthandPropertyAssignment(p)) && propName(p) === k));
  const visit = (n) => {
    if (isCopyObject(n)) {
      const get = (k) => n.properties.find((p) => propName(p) === k);
      const val = (k) => { const p = get(k); return p ? (ts.isShorthandPropertyAssignment(p) ? p.name : p.initializer) : null; };
      nodes.push({ binding: bindingName(n), en: val('en'), vi: val('vi'), ja: val(TARGET), line: sf.getLineAndCharacterOfPosition(n.getStart()).line + 1 });
      for (const k of ['en', 'vi', TARGET]) {
        const v = val(k);
        const target = v && ts.isIdentifier(v) && consts.has(v.text) ? consts.get(v.text).initializer : v;
        if (target) inCopy.add(target);
      }
      inCopy.add(n);
      return;
    }
    // hard-coded locale conditionals with string arms
    if (ts.isConditionalExpression(n) && /locale === '(vi|en)'|lang === '(vi|en)'/.test(n.condition.getText())) {
      const arms = [n.whenTrue, n.whenFalse].map(unwrap);
      if (arms.some((a) => (ts.isStringLiteral(a) || ts.isNoSubstitutionTemplateLiteral(a) || ts.isArrayLiteralExpression(a)) && ASCII_WORDS.test(a.getText())))
        hardcoded.push({ kind: 'locale-conditional', line: sf.getLineAndCharacterOfPosition(n.getStart()).line + 1, text: n.getText().slice(0, 200) });
    }
    if (ts.isJsxText(n) && ASCII_WORDS.test(n.text) && n.text.trim()) hardcoded.push({ kind: 'jsx-text', line: sf.getLineAndCharacterOfPosition(n.getStart()).line + 1, text: n.text.trim().slice(0, 200) });
    if (ts.isJsxAttribute(n) && ['aria-label', 'alt', 'placeholder', 'title', 'aria-description'].includes(n.name.getText()) && n.initializer && ts.isStringLiteral(n.initializer) && ASCII_WORDS.test(n.initializer.text))
      hardcoded.push({ kind: `attr:${n.name.getText()}`, line: sf.getLineAndCharacterOfPosition(n.getStart()).line + 1, text: n.initializer.text });
    ts.forEachChild(n, visit);
  };
  // the main dictionaries are whole files
  const dict = /src\/messages\/([a-z]{2})\.ts$/.exec(file);
  if (!dict) visit(sf);
  else {
    // hard-coded scan still useful? dictionaries are copy by definition
  }
  return { rel, sf, consts, nodes, hardcoded, dict: dict?.[1] };
}

function dictionaryNode() {
  const get = (code) => {
    const file = join(SRC, 'messages', `${code}.ts`);
    try {
      const { sf, consts } = scanFile(file);
      const decl = consts.get(code);
      return decl ? { sf, consts, value: decl.initializer } : null;
    } catch { return null; }
  };
  return { en: get('en'), vi: get('vi'), ja: get(TARGET) };
}

/** The intl locale whose copy fills the `ja*` fields of each row (historical names; default 'ja'). */
let TARGET = 'ja';

export function extract(target = 'ja') {
  TARGET = target;
  const rows = [];
  const hard = [];
  const index = (list) => new Map(list.map((l) => [l.path, l]));
  const push = (file, binding, en, vi, ja) => {
    const viMap = index(vi), jaMap = ja ? index(ja) : null;
    for (const l of en.filter((x) => x.kind !== 'null')) {
      const v = viMap.get(l.path), j = jaMap?.get(l.path);
      rows.push({ id: `${file}#${binding}${l.path ? '.' + l.path : ''}`, file, binding, path: l.path, kind: l.kind, en: l.text, params: l.params ?? null, vi: v?.text ?? null, ja: j?.text ?? null, jaKind: j?.kind ?? null, jaParams: j?.params ?? null, hasJaNode: !!ja });
    }
  };
  // main dictionaries
  const d = dictionaryNode();
  push('src/messages/en.ts', 'messages', leaves(d.en.value, d.en.consts), d.vi ? leaves(d.vi.value, d.vi.consts) : [], d.ja ? leaves(d.ja.value, d.ja.consts) : null);
  for (const file of walkDir(SRC)) {
    if (/src\/messages\/([a-z]{2})\.ts$/.test(file)) continue;
    const { rel, consts, nodes, hardcoded } = scanFile(file);
    for (const h of hardcoded) hard.push({ file: rel, ...h });
    for (const n of nodes) {
      const en = leaves(n.en, consts), vi = leaves(n.vi, consts), ja = n.ja ? leaves(n.ja, consts) : null;
      // a plain string copy ({ en: 'x', vi: 'y' }) has a single leaf with an empty path
      push(rel, n.binding, en, vi, ja);
    }
  }
  return { rows, hardcoded: hard };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { rows, hardcoded } = extract();
  const byFile = new Map();
  for (const r of rows) {
    const f = byFile.get(r.file) ?? { n: 0, chars: 0, ja: 0 };
    f.n++; f.chars += r.en.length; if (r.ja !== null) f.ja++;
    byFile.set(r.file, f);
  }
  for (const [file, f] of [...byFile].sort((a, b) => b[1].n - a[1].n)) console.log(String(f.n).padStart(5), String(f.chars).padStart(7), String(f.ja).padStart(5), file);
  console.log(`rows ${rows.length}, english chars ${rows.reduce((s, r) => s + r.en.length, 0)}, with ja ${rows.filter((r) => r.ja !== null).length}, hard-coded findings ${hardcoded.length}`);
  const out = process.argv.indexOf('--json');
  if (out > 0) writeFileSync(process.argv[out + 1], JSON.stringify({ rows, hardcoded }, null, 1));
}
