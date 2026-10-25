import type { Locale } from '@/lib/i18n';
import type { Bay, Category } from './data';

const en = {
  metaTitle: 'Things to Do in Ha Long Bay: Caves, Islands & Villages',
  metaDescription:
    'Caves, islands, beaches and fishing villages in Ha Long Bay and Lan Ha Bay: where Green Ruby cruises plan to stop, and other places to explore.',
  breadcrumb: 'Destinations',
  breadcrumbGuide: 'Halong Cruise Guide',
  eyebrow: 'Halong Cruise Guide',
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
    back: 'All destinations',
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
  breadcrumbGuide: 'Cẩm nang du thuyền',
  eyebrow: 'Cẩm nang du thuyền',
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
    back: 'Tất cả điểm đến',
    ctaTitle: 'Xem toàn bộ hành trình',
    ctaBody: 'Giờ giấc, bữa ăn, phòng nghỉ và dịch vụ bao gồm trên hành trình dự kiến ghé nơi này.',
  },
};

export const destinationMessages: Record<Locale, DestinationMessages> = { en, vi };

/**
 * How each cave is visited, by destination slug of each language (for the hub's cave table). Taken from the
 * destination pages' facts; update with them.
 */
export const caveVisit: Record<Locale, Record<string, string>> = {
  en: {
    'sung-sot-cave': 'On foot, with steps and uneven paths; about 45–60 minutes',
    'luon-cave': 'By kayak or bamboo boat through a water-level tunnel',
    'tien-ong-cave': 'On foot after a short walk; archaeological displays',
    'dark-bright-cave': 'By rowing boat (kayaking suspended in Lan Ha Bay)',
  },
  vi: {
    'hang-sung-sot': 'Đi bộ, nhiều bậc và lối đi không bằng phẳng; khoảng 45–60 phút',
    'hang-luon': 'Đi kayak hoặc đò nan qua lối hang sát mặt nước',
    'hang-tien-ong': 'Đi bộ một đoạn ngắn; có trưng bày khảo cổ',
    'hang-sang-toi': 'Đi thuyền chèo (kayak trên vịnh Lan Hạ đang tạm dừng)',
  },
};

/**
 * Places worth knowing that are not Green Ruby stops and have no page of their own (no thin pages): shown on the
 * hub only, each with an official source. Both are on Ha Long Bay sightseeing route VHL1, not on a Green Ruby route.
 */
export type OtherPlace = { key: string; name: string; bay: Bay; category: Category; summary: string; visit: string; sources: { title: string; url: string }[] };

const VHL1 = 'https://halongbay.com.vn/tours/1-hanh-trinh-vhl1-cang-tau-dong-thien-cung-hang-dau-go-hon-cho-da-hang-ba-hang-hon-dinh-huong-hon-trong-mai';
const QN = 'https://www.quangninh.gov.vn/Sites/en-us/Trang/ChiTietBVGioiThieu.aspx?bvid=138';

export const otherPlaces: Record<Locale, OtherPlace[]> = {
  en: [
    {
      key: 'thien-cung',
      name: 'Thien Cung Cave',
      bay: 'ha-long',
      category: 'cave',
      summary: 'The “Heavenly Palace” cave on Dau Go Island, at the western edge of the World Heritage area: about 20 m above sea level, with a floor of around 3,000 m² and bright white stalactites and stalagmites.',
      visit: 'On foot, about 20 m above sea level',
      sources: [{ title: 'Ha Long Bay Management Board: route VHL1', url: VHL1 }],
    },
    {
      key: 'dau-go',
      name: 'Dau Go Cave',
      bay: 'ha-long',
      category: 'cave',
      summary: 'Also on Dau Go Island and one of the first caves discovered in Ha Long Bay. Its three large chambers hold many stalactites and stalagmites; French visitors in the late 19th century called it the Grotte des Merveilles. The name means “wooden stakes”.',
      visit: 'On foot, through three chambers',
      sources: [
        { title: 'Ha Long Bay Management Board: route VHL1', url: VHL1 },
        { title: 'Quang Ninh Provincial Portal: tourism resources', url: QN },
      ],
    },
  ],
  vi: [
    {
      key: 'thien-cung',
      name: 'Động Thiên Cung',
      bay: 'ha-long',
      category: 'cave',
      summary: '“Cung điện trên trời” nằm trên đảo Đầu Gỗ, điểm cực tây của khu di sản: ở độ cao khoảng 20 m so với mực nước biển, diện tích nền khoảng 3.000 m², hệ thống nhũ đá trắng sáng.',
      visit: 'Đi bộ, ở độ cao khoảng 20 m',
      sources: [{ title: 'Ban Quản lý vịnh Hạ Long: hành trình VHL1', url: VHL1 }],
    },
    {
      key: 'dau-go',
      name: 'Hang Đầu Gỗ',
      bay: 'ha-long',
      category: 'cave',
      summary: 'Cũng trên đảo Đầu Gỗ, là một trong những hang được phát hiện sớm nhất trên vịnh Hạ Long và từng đón Chủ tịch Hồ Chí Minh đến thăm. Hang có ba ngăn lớn với nhiều nhũ đá; du khách Pháp cuối thế kỷ 19 gọi là Grotte des Merveilles.',
      visit: 'Đi bộ qua ba ngăn hang',
      sources: [
        { title: 'Ban Quản lý vịnh Hạ Long: hành trình VHL1', url: VHL1 },
        { title: 'Cổng thông tin tỉnh Quảng Ninh: tài nguyên du lịch', url: QN },
      ],
    },
  ],
};
