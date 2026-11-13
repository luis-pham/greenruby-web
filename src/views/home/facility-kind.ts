// Facility name → icon kind for the homepage "Life on board" cards (FacilityIcon.tsx). Plain .ts so tests can import it.

export type Kind = 'dining' | 'bar' | 'entertainment' | 'wellness' | 'pool' | 'cabin' | 'default';

// Korean words are Hangul only (fold() keeps Hangul: NFD splits a syllable into jamo, which the accent strip leaves
// alone, and NFC joins it again), so they cannot change what the other languages match. 바 and 풀 count only as a
// word on their own or at the end of one (스카이 바, 와인바, 인피니티 풀), never inside 바다 (sea) or 풀코스.
const MATCHERS: [Kind, RegExp][] = [
  ['dining', /restaurant|dining|cuisine|gastronom|kulinar|speise|kuche|\bessen\b|repas|comida|cocina|nha hang|am thuc|bua an|レストラン|ダイニング|料理|食事|레스토랑|다이닝|식당|요리/],
  ['bar', /\bbar\b|bars|drink|cocktail|coctel|wine|\bvin\b|vino|wein|getrank|boisson|bebida|lounge|do uong|ruou|バー|ドリンク|カクテル|ワイン|ラウンジ|바(?![가-힣])|라운지|칵테일|와인|음료/],
  ['entertainment', /entertain|divertissement|entretenimiento|unterhaltung|music|musique|musica|musik|karaoke|cinema|kino|show|spectacle|espectaculo|giai tri|am nhac|エンターテインメント|音楽|ライブ|カラオケ|シアター|엔터테인먼트|공연|노래방|가라오케|음악|라이브|영화|시네마/],
  ['wellness', /spa|fitness|gym|wellness|bien-etre|bienestar|massage|masaje|yoga|sauna|thu gian|cham soc|スパ|フィットネス|ジム|ウェルネス|マッサージ|ヨガ|스파|피트니스|마사지|웰니스|요가|사우나|헬스/],
  ['pool', /pool|swim|piscin|baignade|natation|natacion|schwimm|jacuzzi|whirlpool|be boi|ho boi|プール|ジャグジー|수영장|풀(?![가-힣])|풀사이드|자쿠지/],
  ['cabin', /cabin|kabine|camarote|suite|room|zimmer|chambre|habitacion|phong|giuong|キャビン|スイート|客室|ベッド|객실|스위트|캐빈|선실|침실/],
];

const fold = (text: string) =>
  text
    .toLowerCase()
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .normalize('NFC'); // NFD splits kana voicing marks (ド → ト + ゙); put them back

export function facilityKind(name: string): Kind {
  const key = fold(name);
  return MATCHERS.find(([, re]) => re.test(key))?.[0] ?? 'default';
}
