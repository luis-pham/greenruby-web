import { z } from 'zod';

const menuItem: z.ZodType<MenuItem, z.ZodTypeDef, unknown> = z.lazy(() =>
  z.object({
    name: z.string(),
    url: z.string().nullable().default(''),
    target: z.string().optional(),
    children: z.array(menuItem).default([]),
  }),
);
export type MenuItem = { name: string; url: string | null; target?: string; children: MenuItem[] };

export const siteSchema = z.object({
  language: z.object({ code: z.string() }),
  languages: z.array(z.object({ code: z.string(), name: z.string(), isDefault: z.boolean() })),
  // ad_config keys with the -{lang} suffix stripped. Values are raw CMS strings; anything else becomes null.
  config: z.record(z.unknown().transform((v) => (typeof v === 'string' ? v : v == null ? null : String(v)))),
  menus: z.object({
    primary: z.array(menuItem).default([]),
    footer: z.array(menuItem).default([]),
  }),
});
export type Site = z.infer<typeof siteSchema>;

export const cabinSummarySchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  summary: z.string().nullable(),
  image: z.string().nullable(),
  view: z.string().nullable(),
  cabinClass: z.string().nullable(),
  capacity: z.number().nullable(),
  area: z.number().nullable(),
  cruise: z.object({ id: z.number(), name: z.string() }).nullable(),
});
export type CabinSummary = z.infer<typeof cabinSummarySchema>;

export const cabinSchema = cabinSummarySchema.extend({
  contentHtml: z.string().nullable(),
  gallery: z.array(z.object({ src: z.string(), alt: z.string().nullable() })),
  overCapacity: z.object({
    adult: z.number(),
    child6to12: z.number(),
    child2to5: z.number(),
    infant: z.number(),
  }),
  discountPercent: z.number().nullable(),
  rooms: z.array(z.object({ title: z.string(), description: z.string().nullable() })),
  amenities: z.array(z.object({ name: z.string(), icon: z.string().nullable() })),
  suitableFor: z.array(z.object({ name: z.string() })),
  pricing: z.object({
    showPublic: z.boolean(),
    currency: z.enum(['USD', 'VND']),
    fromPrice: z.number().nullable(),
    matrix: z.array(z.object({ duration: z.number(), guest: z.number(), price: z.number() })),
  }),
  cruise: z.object({ id: z.number(), name: z.string(), slug: z.string() }),
  otherCabins: z.array(cabinSummarySchema),
  alternate: z.object({ lang: z.enum(['en', 'vi']), id: z.number() }).nullable(),
  updatedAt: z.string().nullable(),
});
export type Cabin = z.infer<typeof cabinSchema>;

export const cabinListSchema = z.object({ items: z.array(cabinSummarySchema) });

const optionalText = z.string().nullable();

export const homepageSchema = z.object({
  seo: z.object({ title: optionalText, description: optionalText }),
  banner: z.array(z.object({ title: optionalText, description: optionalText, image: z.string() })),
  slogan: optionalText,
  cruises: z.array(
    z.object({
      id: z.number(),
      slug: z.string(),
      name: z.string(),
      summary: optionalText,
      image: optionalText,
      cover: optionalText,
      capacity: z.number().nullable(),
      length: z.number().nullable(),
      totalFloor: z.number().nullable().optional(),
      totalCabin: z.number().nullable().optional(),
      starRating: z.number().nullable(),
    }),
  ),
  itineraries: z.array(
    z.object({
      itineraryId: z.number(),
      cruiseId: z.number(),
      slug: z.string(),
      name: z.string(),
      description: optionalText,
      cruiseName: optionalText,
      duration: z.number(),
      bay: z.enum(['ha-long', 'lan-ha']).nullable(),
      image: optionalText,
      destinations: z.array(z.string()),
    }),
  ),
  cabins: z.array(cabinSummarySchema),
  services: z.array(z.object({ id: z.number(), name: z.string(), description: optionalText, image: optionalText })),
  experiences: z.array(
    z.object({ id: z.number(), slug: z.string(), name: z.string(), summary: optionalText, image: optionalText, group: optionalText, duration: optionalText }),
  ),
  sustainability: z.array(z.object({ title: optionalText, description: optionalText, icon: optionalText })),
  awards: z.array(z.object({ title: optionalText, description: optionalText, icon: optionalText })),
  faqs: z.array(z.object({ question: z.string(), answerHtml: z.string() })),
  support: optionalText,
  readyToSail: optionalText,
});
export type Homepage = z.infer<typeof homepageSchema>;

const bay = z.enum(['ha-long', 'lan-ha']).nullable();
const faq = z.object({ question: z.string(), answerHtml: z.string() });
const serviceItem = z.object({ id: z.number(), name: z.string(), description: optionalText, image: optionalText });
const activityItem = z.object({ id: z.number(), slug: z.string(), name: z.string(), summary: optionalText, image: optionalText, duration: optionalText });
const galleryItem = z.object({ src: z.string(), alt: optionalText });

export const itinerarySummarySchema = z.object({
  itineraryId: z.number(),
  cruiseId: z.number(),
  slug: z.string(),
  name: z.string(),
  description: optionalText,
  cruiseName: optionalText,
  cruiseSlug: optionalText,
  duration: z.number(),
  bay,
  image: optionalText,
  destinations: z.array(z.string()),
  startTime: optionalText,
  fromPrice: z.number().nullable(),
  currency: z.enum(['USD', 'VND']),
  nextDeparture: optionalText,
});
export type ItinerarySummary = z.infer<typeof itinerarySummarySchema>;

export const itineraryListSchema = z.object({
  seo: z.object({ title: optionalText, description: optionalText }),
  items: z.array(itinerarySummarySchema),
  pageConfig: z.object({ faqs: z.array(faq).optional() }).passthrough().optional(),
});

export const itinerarySchema = itinerarySummarySchema.extend({
  canonical: z.object({ cruiseId: z.number(), itineraryId: z.number(), slug: z.string() }),
  descriptionHtml: optionalText,
  seo: z.object({ title: optionalText, description: optionalText }),
  cruise: z.object({ id: z.number(), name: z.string(), slug: z.string(), image: optionalText, capacity: z.number().nullable(), length: z.number().nullable() }),
  days: z.array(
    z.object({
      day: z.number(),
      title: optionalText,
      details: z.array(z.object({ time: optionalText, title: z.string(), descriptionHtml: optionalText })),
    }),
  ),
  importantNotes: z.array(z.string()),
  services: z.object({ included: z.array(serviceItem), optional: z.array(serviceItem.extend({ price: z.number().nullable().optional() })) }),
  activities: z.array(activityItem),
  gallery: z.array(galleryItem),
  departures: z.array(z.string()),
  cabins: z.array(cabinSummarySchema),
  faqs: z.array(faq),
  alternate: z.object({ lang: z.enum(['en', 'vi']), cruiseId: z.number(), itineraryId: z.number(), slug: z.string() }).nullable(),
  updatedAt: optionalText,
});
export type Itinerary = z.infer<typeof itinerarySchema>;

export const cruiseSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  summary: optionalText,
  contentHtml: optionalText,
  image: optionalText,
  cover: optionalText,
  bay,
  starRating: z.number().nullable(),
  capacity: z.number().nullable(),
  totalFloor: z.number().nullable(),
  totalCabin: z.number().nullable().optional(),
  length: z.number().nullable(),
  yearBuilt: z.number().nullable(),
  descriptionDesignHtml: optionalText,
  greenTechnology: z.array(z.object({ title: optionalText, description: optionalText, icon: optionalText })),
  amenities: z.array(z.object({ name: z.string(), icon: optionalText })),
  services: z.object({ included: z.array(serviceItem), optional: z.array(serviceItem.extend({ price: z.number().nullable().optional() })) }),
  cabins: z.array(cabinSummarySchema),
  facilities: z.array(z.object({ id: z.number(), name: z.string(), summary: optionalText, image: optionalText, group: optionalText })),
  experiences: z.array(activityItem),
  itineraries: z.array(itinerarySummarySchema),
  gallery: z.array(galleryItem),
  seo: z.object({ title: optionalText, description: optionalText }),
  alternate: z.object({ lang: z.enum(['en', 'vi']), id: z.number(), slug: z.string() }).nullable(),
  updatedAt: optionalText,
});
export type Cruise = z.infer<typeof cruiseSchema>;

export const cruiseListSchema = z.object({
  items: z.array(z.object({ id: z.number(), slug: z.string(), name: z.string() }).passthrough()),
});
