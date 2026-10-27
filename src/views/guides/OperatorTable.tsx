import type { Locale } from '@/lib/i18n';
import { fareRanges, listedServices, operatorById, TRANSPORT_CHECKED, type FareRange, type Operator, type RouteId, type Service } from './operators';
import s from './guide.module.css';

const LABELS = {
  en: {
    operator: 'Operator',
    vehicle: 'Vehicle',
    fare: 'Fare',
    pickup: 'Pick-up',
    dropoff: 'Drop-off',
    booking: 'Booking',
    departures: 'Departures',
    duration: 'Time',
    luggage: 'Luggage',
    perSeat: 'per seat',
    perVehicle: 'per vehicle',
    from: 'from',
    askFare: 'Confirm with operator',
    website: 'Website',
    bookOn: 'Book on Vexere',
    whatsapp: 'WhatsApp',
    zalo: 'Zalo',
    domestic: 'Vietnam only',
    status: { confirmed: 'Operator website', indicative: 'Check before booking', agentOnly: 'Booking platform only' },
    types: { 'shared-limousine': 'Shared limousine', bus: 'Coach', 'private-car': 'Private car' },
    checked: (date: string) => `Fares and times as published, checked on ${date}. Operators change them without notice, so confirm when you book. These companies are not Green Ruby partners.`,
  },
  vi: {
    operator: 'Nhà xe',
    vehicle: 'Loại xe',
    fare: 'Giá vé',
    pickup: 'Điểm đón',
    dropoff: 'Điểm trả',
    booking: 'Đặt vé',
    departures: 'Giờ chạy',
    duration: 'Thời gian',
    luggage: 'Hành lý',
    perSeat: '/ghế',
    perVehicle: '/xe',
    from: 'từ',
    askFare: 'Hỏi nhà xe',
    website: 'Website',
    bookOn: 'Đặt trên Vexere',
    whatsapp: 'WhatsApp',
    zalo: 'Zalo',
    domestic: 'chỉ gọi trong nước',
    status: { confirmed: 'Theo website nhà xe', indicative: 'Cần xác nhận lại', agentOnly: 'Chỉ có trên nền tảng đặt vé' },
    types: { 'shared-limousine': 'Limousine ghép', bus: 'Xe khách', 'private-car': 'Xe riêng' },
    checked: (date: string) => `Giá và giờ chạy theo công bố, kiểm tra ngày ${date}. Nhà xe có thể thay đổi mà không báo trước, hãy xác nhận khi đặt. Các nhà xe này không phải đối tác của Green Ruby.`,
  },
} as const;

export function checkedDate(locale: Locale, iso = TRANSPORT_CHECKED): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (locale === 'vi') return `${d}/${m}/${y}`;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

const digits = (n: number, locale: Locale) => n.toLocaleString('en-US').replace(/,/g, locale === 'vi' ? '.' : ',');

/** One amount or a range in the local style: "260,000–360,000 VND", "US$60–120"; VI "260.000–360.000đ", "60–120 USD". */
function money(min: number, max: number, currency: 'VND' | 'USD', locale: Locale): string {
  const amount = min === max ? digits(min, locale) : `${digits(min, locale)}–${digits(max, locale)}`;
  if (currency === 'USD') return locale === 'vi' ? `${amount} USD` : `US$${amount}`;
  return locale === 'vi' ? `${amount}đ` : `${amount} VND`;
}

/** "260,000–360,000 VND per seat", "from 1,600,000 VND per vehicle", "US$15 per seat" (VI: "260.000–360.000đ/ghế"). */
export function fareText(r: Omit<FareRange, 'transportType'>, locale: Locale): string {
  const t = LABELS[locale];
  const unit = r.unit === 'seat' ? t.perSeat : t.perVehicle;
  const sep = locale === 'vi' ? '' : ' ';
  return `${r.open ? `${t.from} ` : ''}${money(r.min, r.open ? r.min : r.max, r.currency, locale)}${sep}${unit}`;
}

export const routeFares = (route: RouteId, locale: Locale) => fareRanges(route).map((r) => `${LABELS[locale].types[r.transportType]}: ${fareText(r, locale)}`);

const ext = { target: '_blank', rel: 'nofollow noopener noreferrer' } as const;

/** Phone, WhatsApp and Zalo links; 1900 numbers are shown as Vietnam-only. */
export function OperatorContacts({ operator, locale }: { operator: Operator; locale: Locale }) {
  const t = LABELS[locale];
  return (
    <>
      {operator.phones.map((p) => (
        <span key={p.display} className={s.opContact}>
          {p.e164 ? <a href={`tel:+${p.e164}`}>{p.display}</a> : <a href={`tel:${p.display.replace(/\s/g, '')}`}>{p.display}</a>}
          {!p.e164 && <small> ({t.domestic})</small>}
          {p.whatsapp && p.e164 && (
            <>
              {' · '}
              <a href={`https://wa.me/${p.e164}`} {...ext}>
                {t.whatsapp}
              </a>
            </>
          )}
          {p.zalo && p.e164 && (
            <>
              {' · '}
              <a href={`https://zalo.me/0${p.e164.slice(2)}`} {...ext}>
                {t.zalo}
              </a>
            </>
          )}
        </span>
      ))}
    </>
  );
}

function statusLabel(service: Service, locale: Locale) {
  const t = LABELS[locale].status;
  if (service.sourceType === 'agent') return t.agentOnly;
  return service.verificationStatus === 'confirmed' ? t.confirmed : t.indicative;
}

/**
 * Operators for the given routes (one shared registry, filtered by route). On narrow screens each row
 * becomes a card: cells carry their column name in data-label.
 */
export function OperatorTable({ routes, locale, caption }: { routes: readonly RouteId[]; locale: Locale; caption?: string }) {
  const t = LABELS[locale];
  const rows = listedServices(routes);
  if (rows.length === 0) return null;
  return (
    <>
      <div className={s.tableWrap}>
        <table className={`${s.table} ${s.opTable}`}>
          {caption && <caption>{caption}</caption>}
          <thead>
            <tr>
              <th scope="col">{t.operator}</th>
              <th scope="col">{t.vehicle}</th>
              <th scope="col">{t.fare}</th>
              <th scope="col">{t.pickup}</th>
              <th scope="col">{t.dropoff}</th>
              <th scope="col">{t.booking}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const op = operatorById(row.operatorId)!;
              const fare =
                row.fareMin === null
                  ? t.askFare
                  : fareText({ min: row.fareMin, max: row.fareMax ?? row.fareMin, currency: row.fareCurrency, unit: row.fareUnit, open: row.fareMax === null }, locale);
              return (
                <tr key={`${row.operatorId}-${row.routeId}-${row.transportType}-${i}`}>
                  <th scope="row">
                    <strong>{op.operatorName}</strong>
                    <small className={s.opStatus}>{statusLabel(row, locale)}</small>
                    {row.departureTimes && (
                      <small>
                        {t.departures}: {row.departureTimes[locale]}
                      </small>
                    )}
                    {row.estimatedDuration && (
                      <small>
                        {t.duration}: {row.estimatedDuration[locale]}
                      </small>
                    )}
                  </th>
                  <td data-label={t.vehicle}>{row.vehicle[locale]}</td>
                  <td data-label={t.fare}>{fare}</td>
                  <td data-label={t.pickup}>{row.pickupLocations[locale]}</td>
                  <td data-label={t.dropoff}>
                    {row.dropoffLocations[locale]}
                    {row.note && <small>{row.note[locale]}</small>}
                    {row.luggage && (
                      <small>
                        {t.luggage}: {row.luggage[locale]}
                      </small>
                    )}
                  </td>
                  <td data-label={t.booking}>
                    {row.bookingUrl && (
                      <span className={s.opContact}>
                        <a href={row.bookingUrl} {...ext}>
                          {row.sourceType === 'agent' && row.bookingUrl.includes('vexere.com') ? t.bookOn : t.website}
                        </a>
                      </span>
                    )}
                    <OperatorContacts operator={op} locale={locale} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className={s.opChecked}>{t.checked(checkedDate(locale))}</p>
    </>
  );
}
