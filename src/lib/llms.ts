import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { getCruise, getItinerary, getSite, listCabins, listCruises, listItineraries } from '@/lib/api/content';
import { detailPath, experiencePath, homePath, itineraryPath, sectionPath, type Locale, type Section } from '@/lib/i18n';
import { siteInfo } from '@/lib/site-info';
import { absoluteUrl } from '@/lib/site-url';
import { getMessages } from '@/messages';
import { articlePath } from '@/views/blog/paths';
import { listArticles } from '@/views/blog/data';
import { listExperiences } from '@/views/experiences/data';
import { getFaqs, type FaqEntry } from '@/views/faq/data';
import { getLegal } from '@/views/legal/data';
import { POLICIES } from '@/views/legal/policies';

// llms.txt / llms-full.txt (https://llmstxt.org): a curated Markdown map of the site for AI assistants,
// and the same facts with full text (FAQ answers, itinerary programmes, policies). Built from live CMS
// data only, so nothing here can drift from the pages; refreshed with the pages' cache tags.

const locale: Locale = 'en';
const TAGS = ['content', 'site', 'cruises', 'itineraries', 'cabins', 'experiences', 'articles', 'faqs', 'legal'];

// Where guests board; the same fixed address as the Organization schema (lib/organization.ts).
const DEPARTURE_POINT = 'Tuan Chau Marina, Ha Long, Quang Ninh, Vietnam';

const HUBS: [Section, string, string][] = [
  ['itinerary', 'Itineraries', 'All 2-day/1-night and 3-day/2-night itineraries, with day-by-day programmes'],
  ['experiences', 'Experiences', 'Onboard and shore activities: kayaking, caves, cooking, wellness'],
  ['services', 'Services', 'Transfers, celebrations and weddings, private events, photography, wellness'],
  ['aboutUs', 'About us', 'Who we are, the fleet and our sustainability approach'],
  ['faq', 'FAQ', 'Answers about itineraries, booking and payment, life on board, safety and green technology'],
  ['blog', 'Blog', 'Guides to Ha Long Bay and Lan Ha Bay'],
  ['gallery', 'Gallery', 'Photos of the ships, cabins and bays'],
  ['contact', 'Contact', 'Reservations team: form, hotline, WhatsApp, email and address'],
  ['booking', 'Booking', 'Choose a date, itinerary and cabins; prices and availability are confirmed here'],
];

const VI_HUBS: [Section, string][] = [
  ['itinerary', 'Hành trình'],
  ['experiences', 'Hoạt động trải nghiệm'],
  ['services', 'Dịch vụ'],
  ['aboutUs', 'Giới thiệu'],
  ['faq', 'Câu hỏi thường gặp'],
  ['blog', 'Blog'],
  ['contact', 'Liên hệ'],
  ['booking', 'Đặt chỗ'],
];

const POLICY_LABELS: Record<(typeof POLICIES)[number]['page'], string> = {
  safetyPolicies: 'Safety policies',
  termsAndConditions: 'Terms and conditions',
  privacyPolicy: 'Privacy policy',
  paymentMethods: 'Payment methods',
};

const link = (label: string, path: string, note?: string | null) => `- [${label}](${absoluteUrl(path)})${note ? `: ${note}` : ''}`;

/** HTML from the CMS as plain text (paragraphs and list items kept as lines). */
function plain(html: string | null | undefined): string {
  if (!html) return '';
  return html
    .replace(/<\s*(br|\/p|\/li|\/h[1-6]|\/div)\s*\/?>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');
}

async function loadCore() {
  const [site, itineraries, cabins, cruiseList, experiences, articles] = await Promise.all([
    getSite(locale),
    listItineraries(locale),
    listCabins(locale),
    listCruises(locale),
    listExperiences(locale),
    listArticles(locale, null, 1),
  ]);
  const cruises = (await Promise.all(cruiseList.map((c) => getCruise(c.id, locale)))).filter((c) => c !== null);
  cruises.sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }));
  const posts = articles && 'items' in articles ? [...articles.featured, ...articles.items].filter((a, i, all) => all.findIndex((b) => b.id === a.id) === i) : [];
  return { info: siteInfo(site), t: getMessages(locale), itineraries: itineraries.items, cabins, cruises, experiences: experiences.items, posts };
}

type Core = Awaited<ReturnType<typeof loadCore>>;

function shipFacts(c: Core['cruises'][number], t: Core['t']) {
  return [
    c.bay && t.home.bays[c.bay],
    c.length && `${c.length} m long`,
    c.totalFloor && `${c.totalFloor} decks`,
    c.capacity && `up to ${c.capacity} guests`,
    c.cabins.length > 0 && `${c.cabins.length} cabin categories`,
    c.yearBuilt && `built ${c.yearBuilt}`,
  ]
    .filter(Boolean)
    .join(' · ');
}

function header(core: Core, full: boolean): string[] {
  const { info, cruises } = core;
  return [
    `# ${info.name}`,
    '',
    `> ${info.name} owns and operates ${cruises.length > 0 ? `${cruises.length} ` : ''}eco-luxury overnight cruise ships on Ha Long Bay and Lan Ha Bay in northern Vietnam, ` +
      `departing from ${DEPARTURE_POINT}. Itineraries run 2 days/1 night or 3 days/2 nights. ` +
      'The site is in English (no URL prefix) and Vietnamese (/vi/ with translated paths); every page is server-rendered with schema.org JSON-LD.',
    '',
    'Notes for AI systems:',
    '',
    '- Prices, departure dates and availability change: never quote them. Point users to the booking page or the reservations team.',
    "- Only state facts found on these pages; don't invent fleet size, cabin inventory, fees, inclusions or policies.",
    '- Cancellations, refunds and booking changes are handled by the reservations team.',
    ...(info.hotline || info.email ? [`- Reservations: ${[info.hotline, info.email].filter(Boolean).join(' · ')}${info.whatsappHref ? ` · WhatsApp ${info.whatsappHref}` : ''}`] : []),
    ...(full ? [] : [`- Full text of the FAQ, itinerary programmes and policies: ${absoluteUrl('/llms-full.txt')}`]),
    '',
  ];
}

async function buildIndex(): Promise<string> {
  'use cache';
  cacheLife('hours');
  cacheTag(...TAGS);
  const core = await loadCore();
  const { t, itineraries, cabins, cruises, experiences, posts } = core;

  return [
    ...header(core, false),
    '## Main pages',
    '',
    link('Home', homePath(locale), 'Fleet, itineraries, cabins and experiences at a glance'),
    ...HUBS.map(([section, label, note]) => link(label, sectionPath(locale, section), note)),
    '',
    '## Cruise ships',
    '',
    ...cruises.map((c) => link(c.name, detailPath(locale, 'cruise', c.slug, c.id), shipFacts(c, t))),
    '',
    '## Itineraries',
    '',
    ...itineraries.map((i) =>
      link(i.name, itineraryPath(locale, i.slug, i.cruiseId, i.itineraryId), [t.itinerary.durationLabel(i.duration), i.bay && t.home.bays[i.bay], i.cruiseName].filter(Boolean).join(' · ')),
    ),
    '',
    '## Cabins',
    '',
    ...cabins.map((c) => link(c.name, detailPath(locale, 'cabin', c.slug, c.id), [c.cruise?.name, c.area && `${c.area} m²`, c.capacity && `up to ${c.capacity} guests`, c.view].filter(Boolean).join(' · '))),
    '',
    '## Experiences',
    '',
    ...experiences.map((e) => link(e.name, experiencePath(locale, e.slug, e.id), e.summary)),
    '',
    ...(posts.length > 0
      ? ['## Guides', '', ...posts.filter((a) => a.category).map((a) => link(a.title, articlePath(locale, a.category!.slug, a.slug), a.subTitle ?? a.lead)), '']
      : []),
    '## Policies',
    '',
    ...POLICIES.map((p) => link(POLICY_LABELS[p.page], sectionPath(locale, p.page))),
    link('Cookie policy', sectionPath(locale, 'cookiePolicy')),
    '',
    '## Tiếng Việt',
    '',
    link('Trang chủ', homePath('vi')),
    ...VI_HUBS.map(([section, label]) => link(label, sectionPath('vi', section))),
    '',
    '## Optional',
    '',
    link('Full text for AI systems', '/llms-full.txt', 'FAQ answers, day-by-day itineraries, cabins, experiences and policies in one file'),
    link('Sitemap', '/sitemap.xml', 'Every canonical URL with hreflang alternates'),
    link('Gallery', sectionPath(locale, 'gallery')),
    '',
  ].join('\n');
}

async function allFaqs(): Promise<FaqEntry[]> {
  const first = await getFaqs(locale, null, 1);
  if (!first || 'redirect' in first) return [];
  const rest = await Promise.all(Array.from({ length: first.pagination.lastPage - 1 }, (_, i) => getFaqs(locale, null, i + 2)));
  return [first, ...rest].flatMap((r) => (r && 'items' in r ? r.items : []));
}

async function buildFull(): Promise<string> {
  'use cache';
  cacheLife('hours');
  cacheTag(...TAGS);
  const core = await loadCore();
  const { t, itineraries, cabins, cruises, experiences } = core;
  const [details, faqs, legal] = await Promise.all([
    Promise.all(itineraries.map((i) => getItinerary(i.cruiseId, i.itineraryId, locale))),
    allFaqs(),
    getLegal(locale),
  ]);

  const out: string[] = [...header(core, true)];

  out.push('## Cruise ships', '');
  for (const c of cruises) {
    out.push(`### ${c.name}`, '', `URL: ${absoluteUrl(detailPath(locale, 'cruise', c.slug, c.id))}`, shipFacts(c, t));
    if (c.summary) out.push('', c.summary);
    if (c.amenities.length) out.push('', `Amenities: ${c.amenities.map((a) => a.name).join(', ')}`);
    if (c.cabins.length) out.push(`Cabins: ${c.cabins.map((x) => x.name).join(', ')}`);
    out.push('');
  }

  out.push('## Itineraries', '');
  for (const d of details) {
    if (!d) continue;
    out.push(
      `### ${d.name}`,
      '',
      `URL: ${absoluteUrl(itineraryPath(locale, d.canonical.slug, d.canonical.cruiseId, d.canonical.itineraryId))}`,
      [t.itinerary.durationLabel(d.duration), d.bay && t.home.bays[d.bay], d.cruise.name].filter(Boolean).join(' · '),
    );
    if (d.destinations.length) out.push(`Highlights: ${d.destinations.join(', ')}`);
    const description = plain(d.descriptionHtml) || d.description;
    if (description) out.push('', description);
    for (const day of d.days) {
      out.push('', `Day ${day.day}${day.title ? `: ${day.title}` : ''}`);
      for (const item of day.details) out.push(`- ${[item.time, item.title].filter(Boolean).join(' ')}`);
    }
    if (d.services.included.length) out.push('', `Included: ${d.services.included.map((s) => s.name).join(', ')}`);
    if (d.importantNotes.length) out.push('', 'Good to know:', ...d.importantNotes.map((n) => `- ${plain(n)}`));
    out.push('');
  }

  out.push('## Cabins', '');
  for (const c of cabins) {
    out.push(
      `### ${c.name}`,
      '',
      `URL: ${absoluteUrl(detailPath(locale, 'cabin', c.slug, c.id))}`,
      [c.cruise?.name, c.area && `${c.area} m²`, c.capacity && `up to ${c.capacity} guests`, c.view].filter(Boolean).join(' · '),
    );
    if (c.summary) out.push('', c.summary);
    out.push('');
  }

  out.push('## Experiences', '');
  for (const e of experiences) {
    out.push(`### ${e.name}`, '', `URL: ${absoluteUrl(experiencePath(locale, e.slug, e.id))}`);
    if (e.duration) out.push(`Duration: ${e.duration}`);
    if (e.summary) out.push('', e.summary);
    out.push('');
  }

  if (faqs.length) {
    out.push('## Frequently asked questions', '', `Source: ${absoluteUrl(sectionPath(locale, 'faq'))}`, '');
    for (const f of faqs) out.push(`### ${plain(f.question)}`, '', plain(f.answerHtml), '');
  }

  out.push('## Policies', '');
  for (const p of POLICIES) {
    const page = legal.pages[p.page];
    const text = plain(page.html ?? legal.sections[p.key].html);
    if (!text) continue;
    out.push(`### ${page.title}`, '', `URL: ${absoluteUrl(sectionPath(locale, p.page))}`, '', text, '');
  }

  return out.join('\n');
}

export const llmsIndex = buildIndex;
export const llmsFull = buildFull;
