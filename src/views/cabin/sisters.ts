import { byLocale } from '@/lib/i18n';
import type { CabinSummary } from '@/lib/api/schemas';

/** The same cabin type on every ship (same CMS slug in this language), ordered by ship name (Green Ruby 1, 2). */
export function sisterCabins(cabin: Pick<CabinSummary, 'slug'>, all: readonly CabinSummary[]): CabinSummary[] {
  return all
    .filter((c) => c.slug === cabin.slug && c.cruise)
    .sort((a, b) => (a.cruise?.name ?? '').localeCompare(b.cruise?.name ?? '', 'en', { numeric: true }));
}

/** Copy for the ship choice on cabin pages and the homepage suite collection. */
export const SHIP_SWITCH = byLocale<{ onBoth: string; choose: string }>({
  en: { onBoth: 'This suite category is on both ships', choose: 'Choose a ship' },
  vi: { onBoth: 'Hạng phòng này có trên cả hai du thuyền', choose: 'Chọn du thuyền' },
  ja: { onBoth: 'この客室タイプは2隻どちらにもございます', choose: '船を選択' },
  fr: { onBoth: 'Cette catégorie existe sur nos deux bateaux', choose: 'Choisir un bateau' },
  es: { onBoth: 'Esta categoría está disponible en los dos barcos', choose: 'Elegir un barco' },
  de: { onBoth: 'Diese Suitenkategorie gibt es auf beiden Schiffen', choose: 'Schiff wählen' },
  ko: { onBoth: '이 객실 유형은 두 선박 모두에서 이용하실 수 있습니다', choose: '선박 선택' },
});
