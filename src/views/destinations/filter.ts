export type FilterState = { bay: string; category: string; query: string };

/** Lowercase, without Vietnamese diacritics (đ -> d), so "hang sung sot" finds "Hang Sửng Sốt". */
export function fold(value: string): string {
  return value.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
}

export function matchesFilter(
  item: { bay: string; category: string; name: string; summary: string | null; categoryLabel: string },
  { bay, category, query }: FilterState,
): boolean {
  if (bay !== 'all' && item.bay !== bay) return false;
  if (category !== 'all' && item.category !== category) return false;
  const words = fold(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const haystack = fold(`${item.name} ${item.summary ?? ''} ${item.categoryLabel}`);
  return words.every((word) => haystack.includes(word));
}
