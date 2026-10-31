import { byLocale } from '../../lib/i18n.ts';
import type { Bay, Category } from './data';

const en = {
  metaTitle: 'Things to Do in Ha Long Bay: Caves, Islands & Villages',
  metaDescription:
    'Caves, islands, beaches and fishing villages in Ha Long Bay and Lan Ha Bay: where Green Ruby cruises plan to stop, and other places to explore.',
  breadcrumb: 'Places to Visit',
  breadcrumbGuide: 'Travel Guide',
  eyebrow: 'Travel Guide',
  title: 'Things to do in',
  titleEm: 'Ha Long Bay & Lan Ha Bay',
  lead: 'Caves, islands, beaches and fishing villages across the two bays: what each visit involves, which places are on Green Ruby’s planned routes, and which you would visit another way.',
  bays: { 'ha-long': 'Ha Long Bay', 'lan-ha': 'Lan Ha Bay' } satisfies Record<Bay, string>,
  bayIntro: {
    'ha-long': 'The classic bay of the UNESCO site: large show caves and island viewpoints, busier routes. Sailed by Green Ruby 1.',
    'lan-ha': 'South of Ha Long, off Cat Ba Island: quieter water, kayaking lagoons and village visits. Sailed by Green Ruby 2.',
  } satisfies Record<Bay, string>,
  categories: { cave: 'Caves', island: 'Islands & beaches', village: 'Villages', lagoon: 'Lagoons & kayaking', other: 'Other' } satisfies Record<Category, string>,
  category: { cave: 'Cave', island: 'Island', village: 'Village', lagoon: 'Lagoon', other: 'Place' } satisfies Record<Category, string>,
  places: (n: number) => (n === 1 ? '1 place' : `${n} places`),
  compareBays: 'Compare the two bays',
  filter: {
    label: 'Filter destinations',
    search: 'Search destinations',
    searchPlaceholder: 'Search by name, e.g. cave',
    bay: 'Bay',
    category: 'Type',
    all: 'All',
    results: (n: number) => (n === 1 ? '1 destination' : `${n} destinations`),
    empty: 'No destination matches these filters.',
    reset: 'Clear filters',
  },
  stop: 'Planned Green Ruby stop',
  regional: 'Regional attraction',
  thingsToDo: {
    title: 'What there is to do',
    lede: 'The main kinds of visit in the two bays. Each place has its own guide with access, timing and conditions.',
    groups: {
      cave: ['Caves', 'Walk-through show caves with steps, and low water-level passages you go through by kayak or small boat.'],
      island: ['Islands & beaches', 'Island viewpoints reached by steps, and small beaches where swimming is allowed only when conditions permit.'],
      village: ['Fishing villages & local life', 'A former floating village whose residents moved ashore in 2014, and a farming village on Cat Ba Island reached by boat and bicycle or electric cart.'],
      lagoon: ['Lagoons, kayaks & small boats', 'Sheltered water among the islets, seen by kayak, bamboo boat or rowing boat depending on the bay and local rules.'],
    } as Record<Exclude<Category, 'other'>, [string, string]>,
    cavesLink: 'Compare the caves',
    kayakNote: 'Kayaking in Lan Ha Bay is temporarily suspended under local regulations (status as of October 2026), so Lan Ha stops are seen by boat. In Ha Long Bay, Luon Cave is visited by kayak or bamboo boat.',
    onboard: ['Activities on board', 'Cooking, morning exercise and other activities on the ship itself are described on the Experiences page.'],
    onboardLink: 'See onboard experiences',
  },
  stops: {
    title: 'Green Ruby cruise stops',
    lede: 'Places on Green Ruby’s published itineraries. Planned stops, not guaranteed: weather, tides and local rules decide on the day.',
  },
  others: {
    title: 'Other places to explore',
    lede: 'Well-known places in the bays that are not on a Green Ruby itinerary. Green Ruby cruises do not stop here; you can visit them separately on Ha Long Bay day sightseeing boats.',
    notStop: 'Not a Green Ruby stop',
    source: 'Source',
    route: 'Visited on Ha Long Bay sightseeing route VHL1 (from Tuan Chau or Ha Long International Cruise Port)',
  },
  caves: {
    title: 'Caves of Ha Long Bay and Lan Ha Bay',
    lede: 'How each cave is visited and whether it is on a Green Ruby itinerary.',
    cave: 'Cave',
    bay: 'Bay',
    visit: 'How you visit',
    greenRuby: 'On Green Ruby',
    none: 'Not a Green Ruby stop',
  },
  cruises: { title: 'The ships', lede: 'Green Ruby 1 sails Ha Long Bay, Green Ruby 2 sails Lan Ha Bay.' },
  stopNote: 'Green Ruby stops are taken from the published itineraries, which remain provisional until sailings begin (expected February 2027). Other regional attractions are not part of a Green Ruby route.',
  readMore: 'Read the guide',
  map: {
    title: 'Map of the bays',
    lede: 'Destinations with a verified position. Positions are approximate and for orientation only.',
    attribution: '© OpenStreetMap contributors',
    listLabel: 'Destinations on the map',
  },
  itineraries: {
    title: 'Which cruise visits what',
    lede: 'Planned stops on each Green Ruby itinerary. Times and stops can change with weather and tides.',
    days: (n: number) => `${n} days ${n - 1} night${n > 2 ? 's' : ''}`,
    view: 'View itinerary',
  },
  plan: {
    title: 'Before you go',
    items: [
      ['Weather decides', 'Every visit depends on boats being allowed to sail. During storm warnings, mostly June to October, sailings can be suspended at short notice.'],
      ['Tides matter', 'Low cave passages such as Luon and Dark & Bright are passable only at suitable tides, so your guide may change the order of the day.'],
      ['Steps and balance', 'Show caves and viewpoints involve many steps; kayaks and rowing boats need some balance. Each guide lists accessibility notes.'],
    ] as [string, string][],
  },
  guides: {
    title: 'Plan the rest of your trip',
    firstTime: ['First time on a Halong Bay cruise?', 'What to expect, what to pack and how boarding day works.'],
    transfer: ['Hanoi to Halong Bay', 'Transfers, ports and realistic travel times.'],
    bestTime: ['Best time to visit', 'Weather month by month and storm season.'],
  },
  detail: {
    facts: 'Quick facts',
    plan: 'On Green Ruby’s plan',
    planNone: 'This place is not on a Green Ruby itinerary. It is listed as a regional attraction you may visit independently or with other operators.',
    planNote: 'Planned stops from the published itineraries; provisional until sailings begin, expected February 2027.',
    mapsLink: 'Open in Google Maps',
    faq: 'Questions visitors ask',
    sources: 'Sources',
    photo: 'Photo',
    checked: 'Information checked',
    related: 'Nearby and similar',
    back: 'All places to visit',
    ctaTitle: 'See the full itinerary',
    ctaBody: 'Times, meals, cabins and what is included on the cruise that plans to stop here.',
  },
};

export type DestinationMessages = typeof en;

const vi: DestinationMessages = {
  metaTitle: 'Địa điểm tham quan Hạ Long & Lan Hạ: hang, đảo, làng chài',
  metaDescription:
    'Hang động, đảo, bãi tắm, làng chài trên vịnh Hạ Long và Lan Hạ: nơi du thuyền Green Ruby dự kiến ghé và những nơi khác bạn có thể tự khám phá.',
  breadcrumb: 'Địa điểm tham quan',
  breadcrumbGuide: 'Cẩm nang',
  eyebrow: 'Cẩm nang',
  title: 'Địa điểm tham quan',
  titleEm: 'vịnh Hạ Long & Lan Hạ',
  lead: 'Hang động, đảo, bãi tắm và làng chài trên hai vịnh: mỗi nơi tham quan thế nào, nơi nào nằm trong hành trình dự kiến của Green Ruby và nơi nào bạn cần đi theo cách khác.',
  bays: { 'ha-long': 'Vịnh Hạ Long', 'lan-ha': 'Vịnh Lan Hạ' },
  bayIntro: {
    'ha-long': 'Vùng lõi di sản UNESCO: hang động lớn, đảo có điểm ngắm cảnh, tuyến tàu đông hơn. Green Ruby 1 khai thác vịnh này.',
    'lan-ha': 'Phía nam Hạ Long, ngoài khơi đảo Cát Bà: mặt nước yên tĩnh, áng chèo kayak và làng quê. Green Ruby 2 khai thác vịnh này.',
  },
  categories: { cave: 'Hang động', island: 'Đảo & bãi biển', village: 'Làng chài & làng quê', lagoon: 'Áng & chèo kayak', other: 'Khác' },
  category: { cave: 'Hang động', island: 'Đảo', village: 'Làng', lagoon: 'Áng nước', other: 'Địa điểm' },
  places: (n: number) => `${n} điểm đến`,
  compareBays: 'So sánh hai vịnh',
  filter: {
    label: 'Lọc điểm đến',
    search: 'Tìm điểm đến',
    searchPlaceholder: 'Nhập tên, ví dụ: hang',
    bay: 'Vịnh',
    category: 'Loại hình',
    all: 'Tất cả',
    results: (n: number) => `${n} điểm đến`,
    empty: 'Không có điểm đến nào khớp với bộ lọc.',
    reset: 'Xóa bộ lọc',
  },
  stop: 'Green Ruby dự kiến ghé',
  regional: 'Điểm tham quan trong vùng',
  thingsToDo: {
    title: 'Có gì để trải nghiệm',
    lede: 'Các kiểu tham quan chính trên hai vịnh. Mỗi địa điểm có trang riêng với cách đi, thời gian và điều kiện.',
    groups: {
      cave: ['Hang động', 'Hang lớn đi bộ tham quan, phải leo bậc; và những lối hang sát mặt nước đi qua bằng kayak hoặc thuyền nhỏ.'],
      island: ['Đảo & bãi tắm', 'Đảo có điểm ngắm cảnh phải leo bậc, và bãi tắm nhỏ chỉ được tắm khi điều kiện cho phép.'],
      village: ['Làng chài & đời sống địa phương', 'Làng chài nổi cũ, cư dân đã lên bờ định cư từ năm 2014; và làng quê trên đảo Cát Bà, đến bằng tàu rồi đi xe đạp hoặc xe điện.'],
      lagoon: ['Áng nước, kayak & thuyền nhỏ', 'Vùng nước kín gió giữa các đảo đá, tham quan bằng kayak, đò nan hoặc thuyền chèo tùy vịnh và quy định địa phương.'],
    },
    cavesLink: 'So sánh các hang',
    kayakNote: 'Chèo kayak trên vịnh Lan Hạ đang tạm dừng theo quy định địa phương (cập nhật tháng 10/2026), các điểm ở Lan Hạ tham quan bằng thuyền. Trên vịnh Hạ Long, hang Luồn tham quan bằng kayak hoặc đò nan.',
    onboard: ['Hoạt động trên tàu', 'Lớp nấu ăn, tập buổi sáng và các hoạt động khác ngay trên du thuyền có ở trang Hoạt động trải nghiệm.'],
    onboardLink: 'Xem hoạt động trên tàu',
  },
  stops: {
    title: 'Điểm ghé của du thuyền Green Ruby',
    lede: 'Các địa điểm trong hành trình Green Ruby đã công bố. Đây là điểm dự kiến, không cam kết: thời tiết, thủy triều và quy định địa phương quyết định trong ngày.',
  },
  others: {
    title: 'Những nơi khác để khám phá',
    lede: 'Các điểm nổi tiếng trên vịnh không nằm trong hành trình Green Ruby. Du thuyền Green Ruby không ghé những nơi này; bạn có thể đi riêng bằng tàu tham quan vịnh Hạ Long trong ngày.',
    notStop: 'Green Ruby không ghé',
    source: 'Nguồn',
    route: 'Tham quan theo tuyến VHL1 của vịnh Hạ Long (xuất phát từ cảng tàu khách quốc tế Tuần Châu hoặc Hạ Long)',
  },
  caves: {
    title: 'Hang động vịnh Hạ Long và Lan Hạ',
    lede: 'Mỗi hang tham quan bằng cách nào và có nằm trong hành trình Green Ruby không.',
    cave: 'Hang',
    bay: 'Vịnh',
    visit: 'Cách tham quan',
    greenRuby: 'Hành trình Green Ruby',
    none: 'Green Ruby không ghé',
  },
  cruises: { title: 'Du thuyền', lede: 'Green Ruby 1 khai thác vịnh Hạ Long, Green Ruby 2 khai thác vịnh Lan Hạ.' },
  stopNote: 'Điểm ghé của Green Ruby lấy theo các hành trình đã công bố, có thể điều chỉnh trước khi tàu chính thức hoạt động (dự kiến tháng 2/2027). Các điểm tham quan khác trong vùng không thuộc hành trình Green Ruby.',
  readMore: 'Xem chi tiết',
  map: {
    title: 'Bản đồ hai vịnh',
    lede: 'Các điểm đến đã được kiểm chứng vị trí. Vị trí mang tính tương đối, chỉ để định hướng.',
    attribution: '© Những người đóng góp OpenStreetMap',
    listLabel: 'Các điểm trên bản đồ',
  },
  itineraries: {
    title: 'Hành trình nào ghé đâu',
    lede: 'Các điểm dừng dự kiến trong từng hành trình Green Ruby. Giờ giấc và điểm ghé có thể thay đổi theo thời tiết và thủy triều.',
    days: (n: number) => `${n} ngày ${n - 1} đêm`,
    view: 'Xem hành trình',
  },
  plan: {
    title: 'Trước khi đi',
    items: [
      ['Thời tiết quyết định', 'Mọi chuyến tham quan đều phụ thuộc việc tàu có được ra vịnh. Khi có cảnh báo bão, thường từ tháng 6 đến tháng 10, tàu có thể bị tạm dừng đột xuất.'],
      ['Thủy triều quan trọng', 'Những lối hang thấp như hang Luồn hay hang Sáng Tối chỉ đi qua được khi con nước phù hợp, nên hướng dẫn viên có thể đổi thứ tự trong ngày.'],
      ['Leo bậc và giữ thăng bằng', 'Hang lớn và điểm ngắm cảnh phải leo nhiều bậc; đi kayak, đò nan cần giữ thăng bằng. Mỗi trang điểm đến đều có lưu ý về khả năng tiếp cận.'],
    ],
  },
  guides: {
    title: 'Chuẩn bị cho chuyến đi',
    firstTime: ['Lần đầu đi du thuyền Hạ Long?', 'Cần biết gì, mang gì và ngày lên tàu diễn ra thế nào.'],
    transfer: ['Từ Hà Nội đi Hạ Long', 'Phương tiện, bến tàu và thời gian di chuyển thực tế.'],
    bestTime: ['Thời điểm đẹp nhất', 'Thời tiết từng tháng và mùa bão.'],
  },
  detail: {
    facts: 'Thông tin nhanh',
    plan: 'Trong hành trình Green Ruby',
    planNone: 'Địa điểm này không nằm trong hành trình Green Ruby. Đây là điểm tham quan trong vùng, bạn có thể tự đến hoặc đi cùng đơn vị khác.',
    planNote: 'Điểm ghé theo các hành trình đã công bố; có thể điều chỉnh trước khi tàu chính thức hoạt động, dự kiến tháng 2/2027.',
    mapsLink: 'Mở trên Google Maps',
    faq: 'Câu hỏi thường gặp',
    sources: 'Nguồn tham khảo',
    photo: 'Ảnh',
    checked: 'Thông tin được kiểm tra ngày',
    related: 'Điểm đến gần và tương tự',
    back: 'Tất cả địa điểm tham quan',
    ctaTitle: 'Xem toàn bộ hành trình',
    ctaBody: 'Giờ giấc, bữa ăn, phòng nghỉ và dịch vụ bao gồm trên hành trình dự kiến ghé nơi này.',
  },
};

const ja: DestinationMessages = {
  metaTitle: 'ハロン湾の観光スポット：洞窟・島・村',
  metaDescription:
    'ハロン湾・ランハ湾の洞窟、島、ビーチ、漁村。Green Rubyのクルーズが立ち寄る予定の場所と、そのほかの見どころをご紹介します。',
  breadcrumb: '観光スポット',
  breadcrumbGuide: '旅行ガイド',
  eyebrow: '旅行ガイド',
  title: 'ハロン湾・ランハ湾の',
  titleEm: '観光スポット',
  lead: '2つの湾に点在する洞窟、島、ビーチ、漁村について、それぞれの訪れ方、Green Rubyの予定航路に含まれる場所、別の方法で訪れる場所をご案内します。',
  bays: { 'ha-long': 'ハロン湾', 'lan-ha': 'ランハ湾' },
  bayIntro: {
    'ha-long': 'ユネスコ世界遺産の中心となる湾。大きな観光洞窟や島の展望台があり、航路は比較的混み合います。Green Ruby 1が運航します。',
    'lan-ha': 'ハロン湾の南、カットバ島の沖合に広がる湾。穏やかな水面、カヤックで巡るラグーン、村の訪問が特徴です。Green Ruby 2が運航します。',
  },
  categories: { cave: '洞窟', island: '島・ビーチ', village: '村', lagoon: 'ラグーン・カヤック', other: 'その他' },
  category: { cave: '洞窟', island: '島', village: '村', lagoon: 'ラグーン', other: 'スポット' },
  places: (n: number) => `${n}か所`,
  compareBays: '2つの湾を比較',
  filter: {
    label: '観光スポットを絞り込む',
    search: '観光スポットを検索',
    searchPlaceholder: '名前で検索（例：洞窟）',
    bay: '湾',
    category: '種類',
    all: 'すべて',
    results: (n: number) => `${n}か所`,
    empty: '条件に合う観光スポットはありません。',
    reset: '条件をクリア',
  },
  stop: 'Green Ruby立ち寄り予定',
  regional: '周辺の観光スポット',
  thingsToDo: {
    title: '湾での楽しみ方',
    lede: '2つの湾での主な観光のスタイルです。各スポットのガイドで、アクセス、所要時間、条件をご案内しています。',
    groups: {
      cave: ['洞窟', '階段を歩いて見学する観光洞窟と、カヤックや小舟でくぐり抜ける、水面近くの低い洞窟があります。'],
      island: ['島・ビーチ', '階段を上って訪れる島の展望台と、条件が整った場合にのみ遊泳できる小さなビーチがあります。'],
      village: ['漁村と地元の暮らし', '2014年に住民が陸へ移り住んだかつての水上村と、船と自転車または電気カートで訪れるカットバ島の農村があります。'],
      lagoon: ['ラグーン・カヤック・小舟', '小島に囲まれた穏やかな水域を、湾や現地の規則に応じて、カヤック、竹舟、手漕ぎボートで巡ります。'],
    },
    cavesLink: '洞窟を比較する',
    kayakNote: 'ランハ湾でのカヤックは、現地の規則により一時中止されています（2026年10月時点）。そのため、ランハ湾の立ち寄り先は船から見学します。ハロン湾のルオン洞窟は、カヤックまたは竹舟で訪れます。',
    onboard: ['船上のアクティビティ', '料理、朝のエクササイズなど、船上で楽しめるアクティビティは「体験」ページでご紹介しています。'],
    onboardLink: '船上の体験を見る',
  },
  stops: {
    title: 'Green Rubyクルーズの立ち寄り先',
    lede: 'Green Rubyが公開している行程に含まれる場所です。あくまで予定であり、確約するものではありません。当日の天候、潮の満ち引き、現地の規則によって決まります。',
  },
  others: {
    title: 'そのほかの見どころ',
    lede: 'Green Rubyの行程には含まれない、湾内の有名なスポットです。Green Rubyのクルーズはこれらの場所には立ち寄りません。ハロン湾の日帰り観光船で、別途訪れることができます。',
    notStop: 'Green Rubyは立ち寄りません',
    source: '出典',
    route: 'ハロン湾観光ルートVHL1で訪れることができます。出発はトゥアンチャウ（Tuan Chau）またはHa Long International Cruise Portです。',
  },
  caves: {
    title: 'ハロン湾・ランハ湾の洞窟',
    lede: '各洞窟の訪れ方と、Green Rubyの行程に含まれるかどうかをまとめました。',
    cave: '洞窟',
    bay: '湾',
    visit: '見学方法',
    greenRuby: 'Green Rubyの行程',
    none: 'Green Rubyは立ち寄りません',
  },
  cruises: { title: 'Green Rubyの船', lede: 'Green Ruby 1はハロン湾、Green Ruby 2はランハ湾を運航します。' },
  stopNote: 'Green Rubyの立ち寄り先は公開済みの行程に基づきますが、運航開始（2027年2月予定）までは暫定です。そのほかの周辺観光スポットは、Green Rubyのルートには含まれません。',
  readMore: 'ガイドを読む',
  map: {
    title: '湾の地図',
    lede: '位置を確認済みの観光スポットです。位置はおおよそのもので、目安としてご利用ください。',
    attribution: '© OpenStreetMap contributors',
    listLabel: '地図上の観光スポット',
  },
  itineraries: {
    title: 'クルーズごとの立ち寄り先',
    lede: 'Green Rubyの各行程で予定している立ち寄り先です。時間や立ち寄り先は、天候や潮の満ち引きによって変わる場合があります。',
    days: (n: number) => `${n - 1}泊${n}日`,
    view: '行程を見る',
  },
  plan: {
    title: 'ご出発の前に',
    items: [
      ['天候しだい', 'すべての見学は、船の出航が許可されることが前提です。暴風警報が出た場合（主に6月〜10月）、直前に運航が中止されることがあります。'],
      ['潮の満ち引き', 'ルオン洞窟やDark & Bright Caveのような低い洞窟の通路は、潮位が適しているときにしか通れないため、ガイドが1日の順番を変更することがあります。'],
      ['階段とバランス', '観光洞窟や展望台には多くの階段があり、カヤックや手漕ぎボートにはある程度のバランス感覚が必要です。バリアフリーに関する注意点は、各ガイドに記載しています。'],
    ],
  },
  guides: {
    title: '旅の準備',
    firstTime: ['初めてのハロン湾クルーズですか？', '旅の流れ、持ち物、乗船日の過ごし方をご案内します。'],
    transfer: ['ハノイからハロン湾へ', '送迎、港、実際にかかる移動時間について。'],
    bestTime: ['おすすめの時期', '月ごとの天候と台風シーズン。'],
  },
  detail: {
    facts: '基本情報',
    plan: 'Green Rubyの予定',
    planNone: 'この場所はGreen Rubyの行程には含まれません。個人で、またはほかの会社のツアーで訪れることができる周辺の観光スポットとして掲載しています。',
    planNote: '公開済みの行程に基づく立ち寄り予定です。運航開始（2027年2月予定）までは暫定です。',
    mapsLink: 'Google マップで開く',
    faq: 'よくあるご質問',
    sources: '出典',
    photo: '写真',
    checked: '情報確認日',
    related: '周辺・類似のスポット',
    back: 'すべての観光スポット',
    ctaTitle: '行程の詳細を見る',
    ctaBody: 'ここに立ち寄る予定のクルーズについて、時間、食事、客室、料金に含まれるものをご覧いただけます。',
  },
};

export const destinationMessages = byLocale<DestinationMessages>({ en, vi, ja });

/**
 * How each cave is visited, by destination slug of each language (for the hub's cave table). Taken from the
 * destination pages' facts; update with them.
 */
export const caveVisit = byLocale<Record<string, string>>({
  en: {
    'sung-sot-cave': 'On foot, with steps and uneven paths; about 45–60 minutes',
    'luon-cave': 'By kayak or bamboo boat through a water-level tunnel',
    'tien-ong-cave': 'On foot after a short walk; archaeological displays',
    'dark-bright-cave': 'By rowing boat (kayaking suspended in Lan Ha Bay)',
    'thien-cung-cave': 'On foot, steps up to an entrance about 20 m above sea level; about 30–60 minutes',
    'dau-go-cave': 'On foot, about 90 steep steps; daylight in the first of three chambers; about 30–60 minutes',
  },
  vi: {
    'hang-sung-sot': 'Đi bộ, nhiều bậc và lối đi không bằng phẳng; khoảng 45–60 phút',
    'hang-luon': 'Đi kayak hoặc đò nan qua lối hang sát mặt nước',
    'hang-tien-ong': 'Đi bộ một đoạn ngắn; có trưng bày khảo cổ',
    'hang-sang-toi': 'Đi thuyền chèo (kayak trên vịnh Lan Hạ đang tạm dừng)',
    'dong-thien-cung': 'Đi bộ, leo bậc lên cửa động cao khoảng 20 m; khoảng 30 – 60 phút',
    'hang-dau-go': 'Đi bộ, khoảng 90 bậc đá dốc; ngăn đầu có ánh sáng tự nhiên; khoảng 30 – 60 phút',
  },
  ja: {
    'sung-sot-cave': '徒歩で見学。階段や足場の悪い道があります。所要約45〜60分',
    'luon-cave': 'カヤックまたは竹舟で、水面近くのトンネルをくぐります',
    'tien-ong-cave': '短い距離を歩いて入洞。考古学の展示があります',
    'dark-bright-cave': '手漕ぎボートで見学（ランハ湾のカヤックは現在中止）',
    'thien-cung-cave': '徒歩で見学。海抜約20mの入口まで階段を上ります。所要約30〜60分',
    'dau-go-cave': '徒歩で見学。約90段の急な階段があり、3つの空間のうち最初の空間には外光が入ります。所要約30〜60分',
  },
});

/**
 * Places worth knowing that are not Green Ruby stops and have no page of their own (no thin pages): shown on the
 * hub only, each with an official source. Empty since 2026-10-27: Thien Cung and Dau Go moved to CMS destination
 * pages without an itinerary, which the hub lists under "other places" automatically.
 */
export type OtherPlace = { key: string; name: string; bay: Bay; category: Category; summary: string; visit: string; sources: { title: string; url: string }[] };


export const otherPlaces = byLocale<OtherPlace[]>({ en: [], vi: [], ja: [] });
