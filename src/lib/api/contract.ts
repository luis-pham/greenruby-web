import { z } from 'zod';
import { isLegacyLocale, locales, type LegacyLocale, type Locale } from '../i18n.ts';

// Fields the Content API adds for the multilingual foundation (docs/i18n-audit/12 §11, phase 1D-a). All of them are
// optional so old and new CMS payloads both parse, and none of them changes what EN/VI pages render: they are
// parsed and typed here, and only later phases read them.

/** A BCP 47-shaped tag from the CMS registry ("en", "vi", "ja", "zh-Hant"). Shape only: not a language this site serves. */
export const localeCode = z.string().regex(/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/);

/** True only for the languages this build serves (the compiled `locales`), never for a code the CMS merely knows. */
export const isLocale = (code: string): code is Locale => (locales as readonly string[]).includes(code);

/**
 * The legacy single EN/VI counterpart (`alternate`). A counterpart in any other language, compiled or not, is
 * dropped (null: no alternate) instead of failing the page, so a CMS that already knows more languages can never
 * break or extend EN/VI pages through this field; other languages come only from `alternates`.
 */
export function legacyAlternate<Shape extends z.ZodRawShape>(shape: Shape) {
  type Alternate = z.output<z.ZodObject<Shape>> & { lang: LegacyLocale };
  return z
    .object({ lang: z.string(), ...shape })
    .nullable()
    .transform((value): Alternate | null => {
      const alternate = value as (z.output<z.ZodObject<Shape>> & { lang: string }) | null;
      return alternate && isLegacyLocale(alternate.lang) ? (alternate as Alternate) : null;
    });
}

/** A member of the page's translation group, or the group's x-default (TranslationResolver). */
const alternateEntry = z.object({ lang: z.union([localeCode, z.literal('x-default')]), path: z.string().startsWith('/') });
export type AlternateEntry = z.infer<typeof alternateEntry>;

/**
 * Every published counterpart of a page (12 §5.3), in any registry language. A malformed entry is dropped rather
 * than failing the page. Parsed only: rendering must go through `servedAlternates`.
 */
export const alternates = z
  .array(alternateEntry.nullable().catch(null))
  .transform((entries) => entries.filter((entry): entry is AlternateEntry => entry !== null))
  .optional()
  .catch(undefined);

/** The alternates in languages this build compiles; languages it does not have (zh-Hant…) and x-default are left out. */
export const servedAlternates = (entries: AlternateEntry[] | undefined): (AlternateEntry & { lang: Locale })[] =>
  (entries ?? []).filter((entry): entry is AlternateEntry & { lang: Locale } => isLocale(entry.lang));

/** The hreflang set a page may render: members in open languages, and x-default when it points at one of them. */
export type OpenAlternates = { entries: (AlternateEntry & { lang: Locale })[]; xDefault: string | null };

/**
 * Narrows `alternates` to the languages `open` accepts (compiled, effectively public, section served: lib/intl.ts).
 * Compiling a language never adds it: a member is kept only when the CMS listed it and `open` allows it.
 */
export function openAlternates(entries: AlternateEntry[] | undefined, open: (locale: Locale) => boolean): OpenAlternates {
  const kept = servedAlternates(entries).filter((entry) => open(entry.lang));
  const xDefault = (entries ?? []).find((entry) => entry.lang === 'x-default')?.path ?? null;
  return { entries: kept, xDefault: xDefault !== null && kept.some((entry) => entry.path === xDefault) ? xDefault : null };
}

/** True when `entries` name a member in a language other than en/vi: only then can a page's hreflang or switcher change. */
export const hasIntlMember = (entries: AlternateEntry[] | undefined) =>
  servedAlternates(entries).some((entry) => !isLegacyLocale(entry.lang));

/** Whether the row is public in this language (12 §4). Informational until phase 1C; absent on older CMS versions.
 *  Like the other additive fields, a malformed value is ignored (undefined) instead of failing the page. */
export const publication = z.object({ visible: z.boolean() }).optional().catch(undefined);

const inventoryId = z.number().int().positive().nullable();

/**
 * The price-list rows a booking from this page uses (phase 1A, owner decision D): the page's own rows for en/vi,
 * the linked English rows for a language without its own price list; null when there is none.
 */
export const cabinBooking = z.object({ cabinId: inventoryId }).optional().catch(undefined);
export const itineraryBooking = z.object({ itineraryId: inventoryId, cruiseId: inventoryId }).optional().catch(undefined);

/** Fields shared by every detail payload. */
export const multilingualFields = { alternates, publication };

/**
 * GET /api/v1/content/locales (phase 1B). Read by later phases (1D-b) to generate routes and the switcher; parsed
 * strictly in tests and CI so a contract change fails there, not on a public page.
 */
export const localesSchema = z.object({
  default: localeCode.nullable(),
  locales: z.array(
    z.object({
      code: localeCode,
      hreflang: z.string(),
      nativeName: z.string(),
      englishName: z.string().nullable(),
      urlPrefix: z.string().nullable(),
      routeStyle: z.enum(['legacy', 'intl']),
      ogLocale: z.string().nullable(),
      intlTag: z.string().nullable(),
      direction: z.enum(['ltr', 'rtl']),
      isDefault: z.boolean(),
      priceList: localeCode.nullable(),
      xDefaultPriority: z.number().int().nullable(),
      status: z.enum(['disabled', 'editing', 'public']),
      effectivePublic: z.boolean(),
      /** Phase 1D-b: sections every web instance serves (intl languages); null = all (en/vi); absent on older CMS. */
      sections: z.array(z.string()).nullable().optional(),
    }),
  ),
});
export type LocalesResponse = z.infer<typeof localesSchema>;
