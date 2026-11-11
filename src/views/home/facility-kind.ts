// Facility name → icon kind for the homepage "Life on board" cards (FacilityIcon.tsx). Plain .ts so tests can import it.

export type Kind = 'dining' | 'bar' | 'entertainment' | 'wellness' | 'pool' | 'cabin' | 'default';

const MATCHERS: [Kind, RegExp][] = [
  ['dining', /restaurant|dining|cuisine|gastronom|kulinar|speise|kuche|\bessen\b|repas|comida|cocina|nha hang|am thuc|bua an|レストラン|ダイニング|料理|食事/],
  ['bar', /\bbar\b|bars|drink|cocktail|coctel|wine|\bvin\b|vino|wein|getrank|boisson|bebida|lounge|do uong|ruou|バー|ドリンク|カクテル|ワイン|ラウンジ/],
  ['entertainment', /entertain|divertissement|entretenimiento|unterhaltung|music|musique|musica|musik|karaoke|cinema|kino|show|spectacle|espectaculo|giai tri|am nhac|エンターテインメント|音楽|ライブ|カラオケ|シアター/],
  ['wellness', /spa|fitness|gym|wellness|bien-etre|bienestar|massage|masaje|yoga|sauna|thu gian|cham soc|スパ|フィットネス|ジム|ウェルネス|マッサージ|ヨガ/],
  ['pool', /pool|swim|piscin|baignade|natation|natacion|schwimm|jacuzzi|whirlpool|be boi|ho boi|プール|ジャグジー/],
  ['cabin', /cabin|kabine|camarote|suite|room|zimmer|chambre|habitacion|phong|giuong|キャビン|スイート|客室|ベッド/],
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
