// Splits the CMS legal HTML into an intro and titled clauses so the policy pages can show an
// "On this page" index. The input is already sanitized by the CMS (safe_html allow-list); this only
// regroups top-level blocks and never changes the wording.
//
// A clause heading is an <h1>-<h6>, a paragraph line that is entirely bold ("<strong>Your rights</strong>"),
// or a short numbered line ("2. Service Usage"). Editors often put numbered headings after a <br> inside
// the previous paragraph, so paragraphs are split on <br> before the lines are classified.

export type Clause = { id: string; number: string; title: string; html: string };
export type StructuredPolicy = { introHtml: string; clauses: Clause[] };

const VOID_TAGS = new Set(['br', 'hr', 'img', 'col', 'wbr']);
const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'" };

function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+\d*);/gi, (match, code: string) => {
    if (code[0] === '#') {
      const n = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : match;
    }
    return ENTITIES[code.toLowerCase()] ?? match;
  });
}

const textOf = (html: string) => decodeEntities(html.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();

/** Top-level blocks of an HTML fragment, depth-aware so nested lists and divs stay whole. */
function topLevelBlocks(html: string): { tag: string; outer: string; inner: string }[] {
  const blocks: { tag: string; outer: string; inner: string }[] = [];
  const tagRe = /<(\/?)([a-z][a-z0-9]*)\b[^>]*?(\/?)>/gi;
  let depth = 0;
  let start = 0;
  let openTag = '';
  let innerStart = 0;
  let last = 0;
  let match: RegExpExecArray | null;

  const pushText = (text: string) => {
    if (text.trim()) blocks.push({ tag: 'p', outer: `<p>${text.trim()}</p>`, inner: text.trim() });
  };

  while ((match = tagRe.exec(html))) {
    const [full, closing, rawName, selfClosing] = match;
    const name = rawName.toLowerCase();
    const isVoid = VOID_TAGS.has(name) || selfClosing === '/';
    if (depth === 0) {
      if (closing) continue; // stray closing tag
      pushText(html.slice(last, match.index));
      if (isVoid) {
        if (name !== 'br') blocks.push({ tag: name, outer: full, inner: '' });
        last = match.index + full.length;
        continue;
      }
      depth = 1;
      start = match.index;
      openTag = name;
      innerStart = match.index + full.length;
      continue;
    }
    if (isVoid) continue;
    if (closing) {
      depth -= 1;
      if (depth === 0) {
        const end = match.index + full.length;
        blocks.push({ tag: openTag, outer: html.slice(start, end), inner: html.slice(innerStart, match.index) });
        last = end;
      }
    } else {
      depth += 1;
    }
  }
  if (depth > 0) blocks.push({ tag: openTag, outer: html.slice(start), inner: html.slice(innerStart) });
  else pushText(html.slice(last));
  return blocks;
}

const NUMBERED = /^(\d{1,2})[.)]\s+(.+)$/;

/** Returns the heading parts when a paragraph line reads as a clause title. */
function asHeading(line: string): { number: string | null; title: string } | null {
  const trimmed = line.trim();
  const text = textOf(trimmed);
  if (!text || text.length > 90) return null;
  const bold = /^<(strong|b)>[\s\S]*<\/\1>:?$/i.test(trimmed) && !/<\/(strong|b)>[\s\S]*<(strong|b)>/i.test(trimmed);
  const numbered = NUMBERED.exec(text);
  const plainNumbered = numbered && !/<[^>]+>/.test(trimmed.replace(/<\/?(strong|b|em|i)>/gi, '')) && !/[.;!?]$/.test(text) && text.split(' ').length <= 12;
  if (!bold && !plainNumbered) return null;
  const clean = text.replace(/:$/, '');
  const n = NUMBERED.exec(clean);
  return n ? { number: n[1], title: n[2] } : { number: null, title: clean };
}

type Token = { kind: 'heading'; number: string | null; title: string } | { kind: 'html'; html: string };

function tokenize(html: string): Token[] {
  const tokens: Token[] = [];
  for (const block of topLevelBlocks(html)) {
    if (/^h[1-6]$/.test(block.tag)) {
      const title = textOf(block.inner);
      if (title) {
        const n = NUMBERED.exec(title);
        tokens.push({ kind: 'heading', number: n?.[1] ?? null, title: n?.[2] ?? title });
      }
      continue;
    }
    if (block.tag !== 'p') {
      tokens.push({ kind: 'html', html: block.outer });
      continue;
    }
    const lines = block.inner.split(/<br\s*\/?>/i);
    let buffer: string[] = [];
    const flush = () => {
      const kept = buffer.map((l) => l.trim()).filter(Boolean);
      if (kept.length) tokens.push({ kind: 'html', html: `<p>${kept.join('<br />')}</p>` });
      buffer = [];
    };
    for (const line of lines) {
      const heading = asHeading(line);
      if (heading) {
        flush();
        tokens.push({ kind: 'heading', ...heading });
      } else {
        buffer.push(line);
      }
    }
    flush();
  }
  return tokens;
}

/** ASCII slug for anchors; Vietnamese diacritics are folded ("Đặt chỗ" -> "dat-cho"). */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

/**
 * Groups policy HTML into an intro and clauses. With fewer than two headings the whole text is
 * returned as the intro, since a one-entry index would add nothing.
 */
export function structurePolicy(html: string, idPrefix = ''): StructuredPolicy {
  const tokens = tokenize(html);
  const headingCount = tokens.filter((t) => t.kind === 'heading').length;
  if (headingCount < 2) return { introHtml: html, clauses: [] };

  const intro: string[] = [];
  const clauses: Clause[] = [];
  const used = new Set<string>();
  for (const token of tokens) {
    if (token.kind === 'heading') {
      const base = [idPrefix, slugify(token.title) || 'section'].filter(Boolean).join('-');
      let id = base;
      for (let i = 2; used.has(id); i++) id = `${base}-${i}`;
      used.add(id);
      clauses.push({ id, number: String(clauses.length + 1).padStart(2, '0'), title: token.title, html: '' });
    } else if (clauses.length) {
      clauses[clauses.length - 1].html += token.html;
    } else {
      intro.push(token.html);
    }
  }
  return { introHtml: intro.join(''), clauses };
}
