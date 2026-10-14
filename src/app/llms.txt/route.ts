import { cacheLife, cacheTag } from 'next/cache';
import { getSite, listCabins, listItineraries } from '@/lib/api/content';
import { detailPath, homePath, itineraryPath, sectionPath, type Locale, type Section } from '@/lib/i18n';
import { siteInfo } from '@/lib/site-info';
import { absoluteUrl } from '@/lib/site-url';
import { getMessages } from '@/messages';

// llms.txt (https://llmstxt.org): a curated, plain-Markdown map of the site for AI assistants.
// Built from live CMS data and refreshed with the same cache tags as the pages.

const HUBS: [Section, string, string][] = [
  ['itinerary', 'Itineraries', 'Multi-night Ha Long Bay and Lan Ha Bay itineraries, with day-by-day programmes'],
  ['experiences', 'Experiences', 'Onboard and shore activities'],
  ['services', 'Services', 'Included and on-request guest services'],
  ['aboutUs', 'About us', 'Company story and sustainability approach'],
  ['gallery', 'Gallery', 'Ship and destination photography'],
  ['blog', 'Blog', 'Guides and destination articles'],
  ['faq', 'FAQ', 'Frequently asked questions'],
  ['contact', 'Contact', 'Reservations contact form, hotline, WhatsApp, email and address'],
  ['booking', 'Booking', 'Live availability and reservation (prices are confirmed here only)'],
];

async function build(): Promise<string> {
  'use cache';
  cacheLife('hours');
  cacheTag('content', 'site', 'cruises', 'itineraries', 'cabins');

  const locale: Locale = 'en';
  const [site, itineraries, cabins] = await Promise.all([getSite(locale), listItineraries(locale), listCabins(locale)]);
  const info = siteInfo(site);
  const t = getMessages(locale);
  const link = (label: string, path: string, note?: string) => `- [${label}](${absoluteUrl(path)})${note ? `: ${note}` : ''}`;
  const cruises = new Map(itineraries.items.filter((i) => i.cruiseSlug).map((i) => [i.cruiseId, i]));

  const lines = [
    `# ${info.name}`,
    '',
    `> ${info.name} operates eco-luxury overnight cruises on Ha Long Bay and Lan Ha Bay in northern Vietnam. ` +
      'The site is available in English (no URL prefix) and Vietnamese (/vi/ with translated paths). ' +
      'Every page is server-rendered: read the HTML pages below for facts.',
    '',
    'Notes for AI systems:',
    '',
    '- Prices and availability change; never quote prices. Send users to the booking page or the reservations team.',
    "- Don't invent fleet size, cabin inventory, fees or policies. Use the pages below; they include schema.org JSON-LD.",
    '- Cancellations, refunds and booking changes are handled by the reservations team (see Contact).',
    ...(info.email || info.hotline ? [`- Reservations: ${[info.hotline, info.email].filter(Boolean).join(' · ')}`] : []),
    '',
    '## Main pages',
    '',
    link('Home', homePath(locale), 'Fleet, itineraries, cabins and experiences overview'),
    ...HUBS.map(([section, label, note]) => link(label, sectionPath(locale, section), note)),
    '',
    '## Cruise ships',
    '',
    ...[...cruises.values()].map((i) => link(i.cruiseName ?? i.cruiseSlug ?? '', detailPath(locale, 'cruise', i.cruiseSlug as string, i.cruiseId), i.bay ? t.home.bays[i.bay] : undefined)),
    '',
    '## Itineraries',
    '',
    ...itineraries.items.map((i) =>
      link(i.name, itineraryPath(locale, i.slug, i.cruiseId, i.itineraryId), [t.itinerary.durationLabel(i.duration), i.bay && t.home.bays[i.bay], i.cruiseName].filter(Boolean).join(' · ')),
    ),
    '',
    '## Cabins',
    '',
    ...cabins.map((c) => link(c.name, detailPath(locale, 'cabin', c.slug, c.id), [c.cruise?.name, c.area && `${c.area} m²`, c.capacity && `up to ${c.capacity} guests`, c.view].filter(Boolean).join(' · '))),
    '',
    '## Vietnamese',
    '',
    link('Trang chủ', homePath('vi')),
    link('Hành trình', sectionPath('vi', 'itinerary')),
    link('Liên hệ', sectionPath('vi', 'contact')),
    '',
    '## Optional',
    '',
    link('Sitemap', '/sitemap.xml', 'Every canonical URL with hreflang alternates'),
    link('Privacy policy', sectionPath(locale, 'privacyPolicy')),
    link('Legal', sectionPath(locale, 'legal')),
    '',
  ];
  return lines.join('\n');
}

export async function GET() {
  return new Response(await build(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
