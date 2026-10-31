import { locales, type Locale } from './i18n.ts';
import { hasRouteTree, routeKey, routeSections } from './intl-routes.ts';

// What this build can serve (docs/i18n-audit/08 §3, phase 1B). The CMS pulls it from every web instance and treats a
// new language as public only when all of them list it as ready; en/vi never depend on it.
export const MANIFEST_SCHEMA = 1;

export type FrontendManifest = {
  schema: number;
  buildId: string;
  /** sections: route families this build serves for the locale ('home' + `segments` keys of src/lib/i18n.ts). */
  locales: { code: string; routes: boolean; dictionary: boolean; sections: string[] }[];
};

export type BuildFacts = {
  /** Page route keys of the running build ('/(ja)/ja/cruise/[file]'): its app-paths manifest, else the generated registry. */
  routes: readonly string[];
  /** Whether the locale has its own dictionary (src/messages/index.ts hasDictionary). */
  dictionary: (locale: Locale) => boolean;
};

/**
 * Ready = the locale's route tree exists in the build AND it has its own dictionary. `sections` (phase 1C-5) are the
 * section families whose routes the tree really contains (intl-routes.ts), so a language can only appear in
 * sitemaps/hreflang for sections the deployed build serves. Nothing here is read from configuration alone: a locale
 * without a tree, a partial tree or a missing dictionary is reported as such and the CMS keeps it closed.
 */
export function frontendManifest(buildId: string, build: BuildFacts): FrontendManifest {
  return {
    schema: MANIFEST_SCHEMA,
    buildId,
    locales: locales.map((code) => {
      const routes = hasRouteTree(build.routes, code);
      return { code, routes, dictionary: build.dictionary(code), sections: routes ? routeSections(build.routes, code) : [] };
    }),
  };
}

/** Route keys from a Next build's .next/server/app-paths-manifest.json ('/(en)/cruise/[file]/page' → '/(en)/cruise/[file]'). */
export const routesFromAppPaths = (manifest: Record<string, unknown>): string[] =>
  Object.keys(manifest).map(routeKey).filter((key): key is string => key !== null);
