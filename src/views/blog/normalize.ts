// Repairs article HTML written before the editor kept structure. TinyMCE was configured with
// paste_as_text, so text pasted from Google Docs/Word lost its headings and lists: headings became
// bold (or plain) lines inside a <p> separated by <br>, and a list became one <li> with <br>s.
// This only regroups blocks and never changes the wording; well-structured HTML passes through as is.

import { htmlToText } from './headings';

const BR = /<br\s*\/?>/gi;
const HAS_BR = /<br\s*\/?>/i;
const isBlank = (html: string) => htmlToText(html) === '';

/** The text of a segment that is entirely <strong>/<b> (optionally inside a <span>), else null. */
function boldOnly(segment: string): string | null {
  const m = /^\s*(?:<span[^>]*>\s*)?<(strong|b)>([\s\S]*?)<\/\1>\s*(?:<\/span>\s*)?$/i.exec(segment);
  return m && !/<(strong|b)>/i.test(m[2]) ? m[2].trim() : null;
}

/** A short line without closing punctuation, e.g. "Why Green Globe Certification Is the Standard That Matters". */
function looksLikeTitle(segment: string): boolean {
  const text = htmlToText(segment);
  const words = text.split(' ').length;
  return words >= 3 && words <= 16 && text.length <= 110 && !/[.,;:!…]$/.test(text) && !/<a\b|<img\b/i.test(segment);
}

function splitParagraph(attrs: string, inner: string): string {
  const segments = inner.split(BR).filter((s) => !isBlank(s));
  if (segments.length === 0) return '';
  const out: string[] = [];
  segments.forEach((segment, i) => {
    const bold = boldOnly(segment);
    const next = segments[i + 1];
    if (bold && htmlToText(bold).length <= 140) {
      out.push(`<h2>${bold}</h2>`);
    } else if (i === 0 && next && looksLikeTitle(segment) && htmlToText(next).length > 120) {
      // A title line that opens a longer paragraph.
      out.push(`<h2>${segment.trim()}</h2>`);
    } else {
      out.push(`<p${attrs}>${segment.trim()}</p>`);
    }
  });
  return out.join('\n');
}

function splitListItem(attrs: string, inner: string): string {
  if (/<(ul|ol|li)\b/i.test(inner)) return `<li${attrs}>${inner}</li>`;
  const items = inner.split(BR).filter((s) => !isBlank(s));
  return items.map((item) => `<li${attrs}>${item.trim()}</li>`).join('\n');
}

export function normalizeArticleHtml(html: string): string {
  if (!html) return html;
  const hasHeadings = /<h[2-4]\b/i.test(html);
  return (
    html
      // Paragraphs with line breaks: split into headings and paragraphs. In articles that already use real
      // headings this only happens around a bold-only line, so deliberate <br>s (e.g. addresses) stay untouched.
      .replace(/<p(\s[^>]*)?>([\s\S]*?)<\/p>/gi, (whole, attrs: string | undefined, inner: string) => {
        if (/class="[^"]*box-/i.test(attrs ?? '')) return whole; // editor templates keep their layout
        if (isBlank(inner) && !/<(img|iframe|video|audio)\b/i.test(inner)) return '';
        // A bold-only line between <br>s is a lost heading even in articles that also have real ones.
        const lostHeading = HAS_BR.test(inner) && inner.split(BR).some((seg) => boldOnly(seg) !== null);
        if (!lostHeading && (hasHeadings || !HAS_BR.test(inner))) {
          const bold = boldOnly(inner);
          return !hasHeadings && bold && htmlToText(bold).length <= 140 ? `<h2>${bold}</h2>` : whole;
        }
        return splitParagraph(attrs ?? '', inner);
      })
      // A single list item holding several lines separated by <br>.
      .replace(/<li(\s[^>]*)?>([\s\S]*?)<\/li>/gi, (whole, attrs: string | undefined, inner: string) =>
        (inner.match(BR) ?? []).length >= 1 ? splitListItem(attrs ?? '', inner) : whole,
      )
      // The CMS wraps every image in a link to the image file (a lightbox on the Blade site); unwrap it.
      .replace(/<a href="([^"]+)"[^>]*>\s*(<img\b[^>]*\ssrc="\1"[^>]*>)\s*<\/a>/gi, '$2')
      // Bare video iframes (pasted embed code) get the responsive 16:9 wrapper the editor plugin uses.
      .replace(/(<div class="embed-iframe[^"]*">\s*)?(<iframe\b[\s\S]*?<\/iframe>)/gi, (whole, wrapper: string | undefined, iframe: string) =>
        wrapper ? whole : `<div class="embed-iframe iframe-16-9">${iframe}</div>`,
      )
  );
}
