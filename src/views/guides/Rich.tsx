import { Fragment, type ReactNode } from 'react';
import { SmartLink } from '@/components/ui';

export type LinkResolver = (target: string) => string | null;

const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Renders **bold** and [label](target) in guide copy. Unknown link targets render as plain text. */
export function RichText({ text, resolve }: { text: string; resolve: LinkResolver }): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(TOKEN)) {
    const at = match.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    if (match[1] !== undefined) {
      out.push(<strong key={at}>{match[1]}</strong>);
    } else {
      const href = resolve(match[3]);
      out.push(
        href ? (
          <SmartLink key={at} href={href} {...(/^https?:/.test(href) ? { target: '_blank', rel: 'noopener' } : {})}>
            {match[2]}
          </SmartLink>
        ) : (
          <Fragment key={at}>{match[2]}</Fragment>
        ),
      );
    }
    last = at + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** Plain-text version (for JSON-LD). */
export function plainText(text: string): string {
  return text.replace(TOKEN, (_, bold, label) => bold ?? label);
}
