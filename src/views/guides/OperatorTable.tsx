import { byLocale, dateFormatTag, inLocale, isLegacyLocale, numberFormatTag, type Locale } from '@/lib/i18n';
import { colonSep, labelled, wordSpace } from '@/lib/typography';
import { fareRanges, listedServices, operatorById, TRANSPORT_CHECKED, type FareRange, type Operator, type RouteId, type Service } from './operators';
import s from './guide.module.css';

const LABEL_COPY = {
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
  ja: {
    operator: '運行会社',
    vehicle: '車両',
    fare: '料金',
    pickup: '乗車場所',
    dropoff: '降車場所',
    booking: '予約',
    departures: '出発時刻',
    duration: '所要時間',
    luggage: '荷物',
    perSeat: '／席',
    perVehicle: '／台',
    // Placed after the amount for ja ("1,600,000 VND〜／台"), see fareText.
    from: '〜',
    askFare: '運行会社に確認',
    website: 'ウェブサイト',
    bookOn: 'Vexereで予約',
    whatsapp: 'WhatsApp',
    zalo: 'Zalo',
    domestic: 'ベトナム国内のみ',
    status: { confirmed: '運行会社のウェブサイト', indicative: '予約前に要確認', agentOnly: '予約サイトのみ' },
    types: { 'shared-limousine': '乗り合いリムジン', bus: '長距離バス', 'private-car': '専用車' },
    checked: (date: string) => `料金と時刻は各社が公表している情報で、${date}に確認したものです。運行会社は予告なく変更することがあるため、ご予約時にご確認ください。これらの会社はGreen Rubyの提携先ではありません。`,
  },
  fr: {
    operator: 'Transporteur',
    vehicle: 'Véhicule',
    fare: 'Tarif',
    pickup: 'Prise en charge',
    dropoff: 'Dépose',
    booking: 'Réservation',
    departures: 'Départs',
    duration: 'Durée',
    luggage: 'Bagages',
    perSeat: 'par place',
    perVehicle: 'par véhicule',
    from: 'à partir de',
    askFare: 'À confirmer auprès du transporteur',
    website: 'Site web',
    bookOn: 'Réserver sur Vexere',
    whatsapp: 'WhatsApp',
    zalo: 'Zalo',
    domestic: 'depuis le Vietnam uniquement',
    status: { confirmed: 'Site du transporteur', indicative: 'À vérifier avant de réserver', agentOnly: 'Plateforme de réservation uniquement' },
    types: { 'shared-limousine': 'Limousine partagée', bus: 'Autocar', 'private-car': 'Voiture privée' },
    checked: (date: string) => `Tarifs et horaires tels que publiés, vérifiés le ${date}. Les transporteurs peuvent les modifier sans préavis : confirmez-les au moment de réserver. Ces compagnies ne sont pas des partenaires de Green Ruby.`,
  },
  es: {
    operator: 'Empresa',
    vehicle: 'Vehículo',
    fare: 'Tarifa',
    pickup: 'Recogida',
    dropoff: 'Destino',
    booking: 'Reserva',
    departures: 'Salidas',
    duration: 'Duración',
    luggage: 'Equipaje',
    perSeat: 'por plaza',
    perVehicle: 'por vehículo',
    from: 'desde',
    askFare: 'Consultar con la empresa',
    website: 'Sitio web',
    bookOn: 'Reservar en Vexere',
    whatsapp: 'WhatsApp',
    zalo: 'Zalo',
    domestic: 'solo desde Vietnam',
    status: { confirmed: 'Sitio web de la empresa', indicative: 'Comprobar antes de reservar', agentOnly: 'Solo en plataforma de reservas' },
    types: { 'shared-limousine': 'Limusina compartida', bus: 'Autocar', 'private-car': 'Coche privado' },
    checked: (date: string) => `Tarifas y horarios según la información publicada, comprobados el ${date}. Las empresas pueden cambiarlos sin previo aviso, así que confírmelos al reservar. Estas compañías no son socias de Green Ruby.`,
  },
  de: {
    operator: 'Anbieter',
    vehicle: 'Fahrzeug',
    fare: 'Preis',
    pickup: 'Abholung',
    dropoff: 'Ankunft',
    booking: 'Buchung',
    departures: 'Abfahrten',
    duration: 'Fahrzeit',
    luggage: 'Gepäck',
    perSeat: 'pro Sitzplatz',
    perVehicle: 'pro Fahrzeug',
    from: 'ab',
    askFare: 'Beim Anbieter erfragen',
    website: 'Website',
    bookOn: 'Über Vexere buchen',
    whatsapp: 'WhatsApp',
    zalo: 'Zalo',
    domestic: 'nur aus Vietnam erreichbar',
    status: { confirmed: 'Website des Anbieters', indicative: 'Vor der Buchung prüfen', agentOnly: 'Nur über Buchungsplattform' },
    types: { 'shared-limousine': 'Sammel-Limousine', bus: 'Reisebus', 'private-car': 'Privatwagen' },
    checked: (date: string) => `Preise und Zeiten laut Veröffentlichung der Anbieter, geprüft am ${date}. Die Anbieter ändern sie ohne Ankündigung; bitte bei der Buchung bestätigen lassen. Diese Unternehmen sind keine Partner von Green Ruby.`,
  },
} as const;
const LABELS = byLocale<(typeof LABEL_COPY)[keyof typeof LABEL_COPY]>(LABEL_COPY);

export function checkedDate(locale: Locale, iso = TRANSPORT_CHECKED): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (locale === 'vi') return `${d}/${m}/${y}`;
  // English keeps en-GB; an intl locale writes the date its own way (ja 2026年10月27日, fr 27 octobre 2026).
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(dateFormatTag(locale), { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

// en/vi as before (1,000 / 1.000); an intl locale groups digits its own way (ja 1,000, fr 1 000).
// Spanish groups thousands with a space, as the RAE recommends (10 000; four digits stay 1000), not es-ES's '.'.
const digits = (n: number, locale: Locale) =>
  isLegacyLocale(locale)
    ? n.toLocaleString('en-US').replace(/,/g, locale === 'vi' ? '.' : ',')
    : locale === 'es'
      ? n.toLocaleString(numberFormatTag(locale)).replace(/\./g, '\u00a0')
      : n.toLocaleString(numberFormatTag(locale));

/** Unspaced languages (ja) write ranges with a wave dash: "260,000〜360,000 VND" (glossary §2). */
const rangeDash = (locale: Locale) => (wordSpace(locale) ? '–' : '〜');

/** One amount or a range in the local style: "260,000–360,000 VND", "US$60–120"; VI "260.000–360.000đ", "60–120 USD"; JA "260,000〜360,000 VND". */
function money(min: number, max: number, currency: 'VND' | 'USD', locale: Locale): string {
  const amount = min === max ? digits(min, locale) : `${digits(min, locale)}${rangeDash(locale)}${digits(max, locale)}`;
  if (currency === 'USD') return locale === 'vi' ? `${amount} USD` : `US$${amount}`;
  return locale === 'vi' ? `${amount}đ` : `${amount} VND`;
}

/**
 * "260,000–360,000 VND per seat", "from 1,600,000 VND per vehicle", "US$15 per seat" (VI: "260.000–360.000đ/ghế";
 * JA: "260,000〜360,000 VND／席", "1,600,000 VND〜／台": the "from" mark follows the amount and no space precedes the unit).
 */
export function fareText(r: Omit<FareRange, 'transportType'>, locale: Locale): string {
  const t = LABELS[locale];
  const unit = r.unit === 'seat' ? t.perSeat : t.perVehicle;
  const amount = money(r.min, r.open ? r.min : r.max, r.currency, locale);
  if (!wordSpace(locale)) return `${amount}${r.open ? t.from : ''}${unit}`;
  const sep = locale === 'vi' ? '' : ' ';
  return `${r.open ? `${t.from} ` : ''}${amount}${sep}${unit}`;
}

export const routeFares = (route: RouteId, locale: Locale) => fareRanges(route).map((r) => labelled(LABELS[locale].types[r.transportType], fareText(r, locale), locale));

/** Inline punctuation: en/vi keep the exact JSX text nodes they had (': ', ' (', ')', '.'); ja uses full-width forms. */
const punct = (locale: Locale) =>
  wordSpace(locale) ? { colon: colonSep(locale), open: ' (', close: ')', stop: '.' } : { colon: '：', open: '（', close: '）', stop: '。' };

const ext = { target: '_blank', rel: 'nofollow noopener noreferrer' } as const;

/** Phone, WhatsApp and Zalo links; 1900 numbers are shown as Vietnam-only. */
export function OperatorContacts({ operator, locale }: { operator: Operator; locale: Locale }) {
  const t = LABELS[locale];
  const pn = punct(locale);
  return (
    <>
      {operator.phones.map((p) => (
        <span key={p.display} className={s.opContact}>
          {p.e164 ? <a href={`tel:+${p.e164}`}>{p.display}</a> : <a href={`tel:${p.display.replace(/\s/g, '')}`}>{p.display}</a>}
          {!p.e164 && (
            <small>
              {pn.open}
              {t.domestic}
              {pn.close}
            </small>
          )}
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
  const p = punct(locale);
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
          {rows.map((row, i) => {
            const op = operatorById(row.operatorId)!;
            const fare =
              row.fareMin === null
                ? t.askFare
                : fareText({ min: row.fareMin, max: row.fareMax ?? row.fareMin, currency: row.fareCurrency, unit: row.fareUnit, open: row.fareMax === null }, locale);
            // One tbody per operator: the main row plus a full-width notes row (a card on phones).
            return (
              <tbody key={`${row.operatorId}-${row.routeId}-${row.transportType}-${i}`}>
                <tr>
                  <th scope="row">
                    <strong>{op.operatorName}</strong>
                    <small className={s.opStatus}>{statusLabel(row, locale)}</small>
                    {row.departureTimes && (
                      <small>
                        {t.departures}
                        {p.colon}
                        {inLocale(row.departureTimes, locale)}
                      </small>
                    )}
                    {row.estimatedDuration && (
                      <small>
                        {t.duration}
                        {p.colon}
                        {inLocale(row.estimatedDuration, locale)}
                      </small>
                    )}
                  </th>
                  <td data-label={t.vehicle}>{inLocale(row.vehicle, locale)}</td>
                  <td data-label={t.fare}>{fare}</td>
                  <td data-label={t.pickup}>{inLocale(row.pickupLocations, locale)}</td>
                  <td data-label={t.dropoff}>{inLocale(row.dropoffLocations, locale)}</td>
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
                {(row.note || row.luggage) && (
                  <tr className={s.opNotes}>
                    <td colSpan={6}>
                      {(row.note && inLocale(row.note, locale))}
                      {row.luggage && (
                        <>
                          {row.note && wordSpace(locale)}
                          {t.luggage}
                          {p.colon}
                          {inLocale(row.luggage, locale)}
                          {p.stop}
                        </>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            );
          })}
        </table>
      </div>
      <p className={s.opChecked}>{t.checked(checkedDate(locale))}</p>
    </>
  );
}
