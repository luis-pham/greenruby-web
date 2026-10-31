import 'server-only';
import type { ComponentType } from 'react';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { localeOpen } from '@/lib/intl';
import { HUB_CONTENT } from '@/lib/intl-hubs';
import { routeSections, type IntlSection } from '@/lib/intl-routes';
import { previewSession } from '@/lib/preview';
import { appRoutes } from '@/lib/routes.generated';

// Wraps a shared route factory for a generated intl route (app/(ja)/ja/…, scripts/i18n/routes-generate.mjs).
// Every export checks the gate (lib/intl.ts) before it loads anything, so a closed locale renders the 404 page
// without fetching content: nothing reaches the HTML, the metadata or the RSC payload.

type Options = {
  locale: Locale;
  section: IntlSection;
  /** A hub route: public only while it lists something (the same rule as its intl sitemap entry, lib/intl-hubs.ts). */
  hub: boolean;
  /** Params prerendered while the route is closed or has no items (an empty list fails a Cache Components build). */
  placeholder?: Record<string, string | string[]>;
};

/** Request-time gate: public rules, or an authenticated preview (pages and metadata, never generateStaticParams). */
async function open(options: Options): Promise<boolean> {
  // Authenticated preview (1E-d; hubs and static pages since the 1E hardening): the route renders when this build has
  // it, even before the language is public; the CMS then answers only the previewed entity or page (other drafts stay
  // hidden), uncached.
  if ((await previewSession()) && routeSections(appRoutes, options.locale).includes(options.section)) return true;
  return openPublic(options);
}

/** The public rule only: no request APIs, so it also runs at build time (generateStaticParams). */
async function openPublic({ locale, section, hub }: Options): Promise<boolean> {
  if (!(await localeOpen(locale, section))) return false;
  const content = HUB_CONTENT[section];
  return !hub || !content || content(locale);
}

type Route = {
  generateStaticParams?: () => Promise<Record<string, unknown>[]>;
  generateMetadata?: (props: never) => Promise<unknown>;
  [component: string]: unknown;
};

/** The factory's exports, each closed (404, no data) unless the locale and section are open. */
export function intlRoute<R extends Route>(options: Options, route: R): R {
  const gated: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(route)) {
    if (typeof value !== 'function') {
      gated[name] = value;
    } else if (name === 'generateStaticParams') {
      const inner = value as NonNullable<Route['generateStaticParams']>;
      gated[name] = async () => {
        const params = (await openPublic(options)) ? await inner() : [];
        return params.length > 0 ? params : [options.placeholder ?? {}];
      };
    } else if (name === 'generateMetadata') {
      const inner = value as (props: unknown) => Promise<unknown>;
      gated[name] = async (props: unknown) => ((await open(options)) ? inner(props) : {});
    } else {
      const Inner = value as ComponentType<Record<string, unknown>>;
      const Gated = async (props: Record<string, unknown>) => {
        if (!(await open(options))) notFound();
        return <Inner {...props} />;
      };
      Gated.displayName = `Intl(${name})`;
      gated[name] = Gated;
    }
  }
  return gated as R;
}
