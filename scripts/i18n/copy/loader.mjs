// Node module hooks for the copy tools (phase 2A): load the site's .ts/.tsx copy modules outside Next.
// '@/x' -> src/x, extensionless relative imports -> .ts/.tsx/index, 'server-only' and CSS -> empty modules,
// TypeScript/JSX transpiled with the project's own typescript package. Read-only: nothing is written.
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, resolve as resolvePath } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const SRC = resolvePath(dirname(fileURLToPath(import.meta.url)), '../../../src');
const EXTS = ['', '.ts', '.tsx', '/index.ts', '/index.tsx'];
const STUB = 'data:text/javascript,export default {};';

function existing(base) {
  for (const ext of EXTS) if (existsSync(base + ext) && !base.endsWith('/') && (ext || /\.(ts|tsx|js|mjs|json)$/.test(base))) return base + ext;
  return null;
}

export async function resolve(specifier, context, next) {
  if (specifier === 'server-only' || specifier === 'client-only' || /\.(css|scss|svg|png|jpg|webp)$/.test(specifier)) return { url: STUB, shortCircuit: true };
  let base = null;
  if (specifier.startsWith('@/')) base = resolvePath(SRC, specifier.slice(2));
  else if ((specifier.startsWith('./') || specifier.startsWith('../')) && context.parentURL?.startsWith('file:')) base = resolvePath(dirname(fileURLToPath(context.parentURL)), specifier);
  if (base) {
    const file = existing(base);
    if (file) return { url: pathToFileURL(file).href, shortCircuit: true };
  }
  if (/^next\/[a-z-]+$/.test(specifier)) return next(specifier + '.js', context);
  return next(specifier, context);
}

export async function load(url, context, next) {
  if (url.startsWith('file:') && /\.(ts|tsx)$/.test(url) && !url.includes('/node_modules/')) {
    const source = await readFile(fileURLToPath(url), 'utf8');
    const out = ts.transpileModule(source, {
      fileName: fileURLToPath(url),
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, verbatimModuleSyntax: false, isolatedModules: true },
    });
    return { format: 'module', source: out.outputText, shortCircuit: true };
  }
  return next(url, context);
}
