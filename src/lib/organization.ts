import type { Site } from '@/lib/api/schemas';
import { siteInfo } from '@/lib/site-info';
import { siteUrl } from '@/lib/site-url';

// The organization node, based on the Laravel site's shared/structured-data-organization.blade.php.
// Green Ruby operates its own ships, so it is an Organization + LocalBusiness rather than a TravelAgency
// (a reseller); schema.org has no cruise-line type. LocalBusiness keeps the address/geo eligible for local results.
//
// structured address and coordinates come from Modules/FrontEnd/Config/config.php (not CMS fields),
// everything else from the CMS site config.

export const ORGANIZATION_ID = `${siteUrl}/#organization`;

/** Official Google Maps place of the departure terminal (owner-provided, 2026-10-20). */
export const MAPS_URL = 'https://maps.app.goo.gl/HmWfjFBwB5hXAZsBA';

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Marina, Tuan Chau',
  addressLocality: 'Ha Long',
  addressRegion: 'Quang Ninh',
  addressCountry: 'VN',
};
const GEO = { '@type': 'GeoCoordinates', latitude: 20.916492117326154, longitude: 106.98930708346906 };
const AREA_SERVED = ['Ha Long Bay', 'Lan Ha Bay'];

/** Full Organization/LocalBusiness node (home, contact, about). Other pages reference it by @id. */
export function organizationSchema(site: Site, extra: Record<string, unknown> = {}) {
  const info = siteInfo(site);
  const description = site.config['website-description'];
  const whatsapp = site.config['whatsapp'];
  const contactPoint = [
    ...(info.hotline || info.email
      ? [{ '@type': 'ContactPoint', contactType: 'Customer Service', availableLanguage: ['en', 'vi'], ...(info.hotline && { telephone: info.hotline }), ...(info.email && { email: info.email }) }]
      : []),
    ...(whatsapp ? [{ '@type': 'ContactPoint', contactType: 'WhatsApp Support', telephone: whatsapp }] : []),
  ];
  return {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': ORGANIZATION_ID,
    name: info.name,
    // Registered company behind the brand (owner-confirmed 2026-10-20).
    legalName: 'TPX JOINT STOCK COMPANY',
    taxID: '5702096485',
    url: siteUrl,
    ...(info.logo && { logo: `${siteUrl}${info.logo}` }),
    ...(description && { description }),
    ...(info.hotline && { telephone: info.hotline }),
    ...(info.email && { email: info.email }),
    address: ADDRESS,
    geo: GEO,
    hasMap: MAPS_URL,
    areaServed: AREA_SERVED,
    ...(contactPoint.length > 0 && { contactPoint }),
    ...(info.socials.length > 0 && { sameAs: info.socials.map((x) => x.url) }),
    ...extra,
  };
}

/** Short reference used as author/publisher/provider/brand elsewhere. */
export const organizationRef = (name: string) => ({ '@type': 'Organization', '@id': ORGANIZATION_ID, name, url: siteUrl });
