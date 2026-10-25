// Guide pages are long-form editorial content kept in code (like brand facts), one file per language,
// so EN and VI can be edited independently while sharing one structure and one renderer.

/**
 * Inline text: **bold** and [label](target). A target is a site path ("/contact"), an absolute URL,
 * or a key of GuideLinkMap (e.g. "transfer", "itinerary:ha-long:2") resolved at render time.
 */
export type Rich = string;

export type Block =
  | { p: Rich }
  | { h3: string }
  | { ul: Rich[] }
  | { ol: Rich[] }
  | { table: { caption?: string; head: string[]; rows: Rich[][] } }
  | { note: Rich }
  | { checklist: { title: string; items: string[] }[] }
  | { widget: 'boarding-timeline' | 'transfer-selector' | 'itineraries' };

export type GuideSection = { id: string; title: string; blocks: Block[] };

export type GuideContent = {
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  eyebrow: string;
  title: string;
  lead: string;
  /** Short answers shown under the title ("At a glance"). */
  summaryTitle: string;
  summary: [string, Rich][];
  /** First publication (schema.org datePublished); `updated` is the last editorial review. */
  published: string;
  updated: { iso: string; label: string };
  tocTitle: string;
  sections: GuideSection[];
  faqTitle: string;
  faq: { q: string; a: Rich }[];
  related: { title: string; links: { href: string; title: string; body: string }[] };
  estimateNote: string;
  timeline?: { label: string; note: string; tabs: { key: string; label: string; steps: { time: string; title: string; body: string }[] }[] };
  selector?: {
    labels: import('./TransferSelector').SelectorLabels;
    origins: import('./TransferSelector').SelectorOrigin[];
  };
  /** descriptions: optional one-liner per card, keyed "{bay}:{days}" (e.g. "ha-long:2"). */
  itineraries?: { title: string; days: (n: number) => string; view: string; descriptions?: Record<string, string> };
};
