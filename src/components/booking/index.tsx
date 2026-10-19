import type { Site } from '@/lib/api/schemas';
import { bookingForAll, bookingForCruise, bookingForItinerary } from '@/lib/booking-options';
import type { Locale } from '@/lib/i18n';
import { siteInfo } from '@/lib/site-info';
import { BookingBar, BookingPanel, MobileBookingBar } from './BookingWidget';

type Scope = { itinerary: { cruiseId: number; itineraryId: number } } | { cruiseId: number } | 'all';

async function load(scope: Scope, locale: Locale) {
  if (scope === 'all') return bookingForAll(locale);
  if ('itinerary' in scope) return bookingForItinerary(scope.itinerary.cruiseId, scope.itinerary.itineraryId, locale);
  return bookingForCruise(scope.cruiseId, locale);
}

/**
 * Departure calendar + "from" price + CTA into the booking wizard (prefilled with ship, voyage,
 * cabin and date). Data comes from the cached Content API readers; with no scheduled departures it
 * turns into a "request your dates" form entry. "mobile" is the bottom bar + sheet shown under 900px;
 * render it outside containers that are hidden on mobile.
 */
export async function Booking({
  locale,
  site,
  scope,
  cabinId,
  layout,
}: {
  locale: Locale;
  site: Site;
  scope: Scope;
  cabinId?: number;
  layout: 'panel' | 'bar' | 'mobile';
}) {
  const data = await load(scope, locale);
  const info = siteInfo(site);
  const props = { locale, data, cabinId, contact: { zaloHref: info.zaloHref, whatsappHref: info.whatsappHref } };
  if (layout === 'bar') return <BookingBar locale={locale} data={data} cabinId={cabinId} />;
  return layout === 'mobile' ? <MobileBookingBar {...props} /> : <BookingPanel {...props} />;
}
