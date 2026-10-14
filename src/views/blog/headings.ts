export type TocItem = { id: string; text: string; level: 2 | 3 };

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", apos: "'", nbsp: ' ' };

export function htmlToText(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (entity, name: string) => {
      if (ENTITIES[name.toLowerCase()]) return ENTITIES[name.toLowerCase()];
      if (name.startsWith('#x') || name.startsWith('#X')) return String.fromCodePoint(parseInt(name.slice(2), 16));
      if (name.startsWith('#')) return String.fromCodePoint(Number(name.slice(1)));
      return entity;
    })
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

/**
 * Adds an id to every <h2>/<h3> in sanitized CMS HTML (HTMLPurifier strips ids) and returns the
 * table of contents. Runs on the server, so the anchors are in the prerendered HTML.
 */
export function withHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const out = html.replace(/<(h[23])(\s[^>]*)?>([\s\S]*?)<\/\1>/gi, (whole, tag: string, attrs: string | undefined, inner: string) => {
    const text = htmlToText(inner);
    if (!text) return whole;
    const existing = attrs && /\sid\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1];
    let id = existing || slugify(text) || 'section';
    if (!existing) {
      for (let n = 2; used.has(id); n++) id = `${slugify(text) || 'section'}-${n}`;
    }
    used.add(id);
    toc.push({ id, text, level: tag.toLowerCase() === 'h2' ? 2 : 3 });
    return existing ? whole : `<${tag} id="${id}"${attrs ?? ''}>${inner}</${tag}>`;
  });
  return { html: out, toc };
}

/** Rough reading time in minutes (220 words per minute, at least 1). */
export function readingMinutes(html: string | null): number {
  const words = html ? htmlToText(html).split(' ').filter(Boolean).length : 0;
  return Math.max(1, Math.round(words / 220));
}

const mediaOrigin = process.env.NEXT_PUBLIC_MEDIA_ORIGIN ?? '';

/**
 * Final touches on article HTML: CMS images go through the Laravel thumbnail proxy (resized WebP,
 * same as next/image elsewhere) and load lazily; tables get a scroll wrapper for small screens.
 */
export function prepareContent(html: string, tableWrapClass: string): string {
  return html
    .replace(/<img\s([^>]*?)\/?>/gi, (tag, attrs: string) => {
      const withSrc = attrs.replace(/\bsrc\s*=\s*"(\/upload\/[^"?]+)"/i, (_m, path: string) => `src="${mediaOrigin}/thumbnail${path}?w=1520&q=80"`);
      return `<img ${withSrc}${/\bloading=/i.test(withSrc) ? '' : ' loading="lazy"'} decoding="async" />`;
    })
    .replace(/<table\b/gi, `<div class="${tableWrapClass}"><table`)
    .replace(/<\/table>/gi, '</table></div>');
}
