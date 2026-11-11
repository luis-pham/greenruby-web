import { byLocale } from '@/lib/i18n';

/**
 * Travel guide hub (/guides, /vi/cam-nang): a navigation page over the guides, places and journal. It owns only
 * the broad "travel guide" query (app_seo_owner); every card sends the reader to the page that owns the topic.
 */
const en = {
  metaTitle: 'Ha Long Bay Travel Guide: Places, Planning & Cruises',
  metaDescription: 'Start here: guides to Ha Long Bay and Lan Ha Bay on where to go, how to get there, when to visit and how to choose a cruise.',
  eyebrow: 'Ha Long Bay · Lan Ha Bay',
  title: 'Ha Long Bay',
  titleEm: 'travel guide',
  lead: 'Every guide we publish about the two bays, grouped by what you are planning. Each card leads to the page that answers it in full.',
  plan: { title: 'Plan your trip', lede: 'When to go, how many nights, which bay and how to get to the port.' },
  places: {
    title: 'Places to visit',
    lede: 'Caves, islands and villages in the bays, with what each visit involves and which itineraries plan to stop there.',
    hub: 'See all places to visit',
  },
  cruises: {
    title: 'Choose your cruise',
    lede: 'The two ships, the four itineraries and what to compare before you book.',
    itineraries: ['All itineraries', 'Two bays, one or two nights: day-by-day programmes side by side.'],
    luxury: ['The complete guide to eco-friendly luxury cruises', 'What to check before you book: certifications, technology and the two bays.'],
    ship: (bay: string) => `The ship that sails ${bay}: cabins, facilities and itineraries.`,
  },
  journal: { title: 'From the Travel Journal', lede: 'Recent articles on seasons, comparisons and sustainability.', all: 'All Travel Journal articles' },
};

export type HubMessages = typeof en;

const vi: HubMessages = {
  metaTitle: 'Cẩm nang du lịch Hạ Long & Lan Hạ',
  metaDescription: 'Bắt đầu từ đây: cẩm nang vịnh Hạ Long và Lan Hạ về đi đâu, đi thế nào, mùa nào đẹp và chọn du thuyền ra sao.',
  eyebrow: 'Vịnh Hạ Long · Vịnh Lan Hạ',
  title: 'Cẩm nang du lịch',
  titleEm: 'Hạ Long & Lan Hạ',
  lead: 'Toàn bộ cẩm nang về hai vịnh, xếp theo việc bạn đang chuẩn bị. Mỗi thẻ dẫn tới trang trả lời đầy đủ chủ đề đó.',
  plan: { title: 'Chuẩn bị chuyến đi', lede: 'Đi lúc nào, mấy đêm, vịnh nào và đến bến tàu bằng cách nào.' },
  places: {
    title: 'Địa điểm tham quan',
    lede: 'Hang động, đảo và làng chài trên hai vịnh: mỗi nơi tham quan thế nào và hành trình nào dự kiến ghé.',
    hub: 'Xem tất cả địa điểm tham quan',
  },
  cruises: {
    title: 'Chọn du thuyền',
    lede: 'Hai tàu, bốn hành trình và những điều nên so sánh trước khi đặt.',
    itineraries: ['Tất cả hành trình', 'Hai vịnh, một hoặc hai đêm: lịch trình từng ngày đặt cạnh nhau.'],
    luxury: ['Kinh nghiệm chọn du thuyền Hạ Long cao cấp', 'Những điều cần so sánh trước khi đặt một du thuyền cao cấp.'],
    ship: (bay: string) => `Du thuyền khai thác ${bay}: phòng nghỉ, tiện ích và hành trình.`,
  },
  journal: { title: 'Từ Nhật ký hành trình', lede: 'Bài viết mới về mùa du lịch, so sánh và du lịch xanh.', all: 'Tất cả bài viết' },
};

// DRAFT (2026-11-01): machine-assisted Japanese, not yet reviewed by a native editor.
const ja: HubMessages = {
  metaTitle: 'ハロン湾旅行ガイド：見どころ・旅の計画・クルーズ',
  metaDescription: 'ハロン湾・ランハ湾の旅行ガイド。ハノイからの行き方、天気とベストシーズン、主な観光スポット、はじめてのクルーズの選び方までまとめています。',
  eyebrow: 'ハロン湾・ランハ湾',
  title: 'ハロン湾',
  titleEm: '旅行ガイド',
  lead: '2つの湾について当社が公開しているすべてのガイドを、計画している内容ごとにまとめました。各カードから、そのテーマを詳しく解説するページへ移動できます。',
  plan: { title: '旅の計画', lede: 'いつ行くか、何泊するか、どちらの湾にするか、港までどう行くか。' },
  places: {
    title: '見どころ',
    lede: '湾内の洞窟、島、村。それぞれの訪問の内容と、立ち寄りを予定している行程をご紹介します。',
    hub: '見どころをすべて見る',
  },
  cruises: {
    title: 'クルーズを選ぶ',
    lede: '2隻の船、4種類の行程、ご予約前に比較したいポイント。',
    itineraries: ['すべての行程', '2つの湾、1泊または2泊。日ごとのプログラムを並べて比較できます。'],
    luxury: ['環境に配慮したラグジュアリークルーズ完全ガイド（英語版）', 'ご予約前に確認したいこと：認証、技術、2つの湾。'],
    ship: (bay: string) => `${bay}を航行する船：客室、設備、行程。`,
  },
  journal: { title: '旅のコラムから', lede: '季節、比較記事、環境への取り組みに関する最新の記事。', all: '旅のコラムの記事一覧' },
};

const fr: HubMessages = {
  metaTitle: 'Guide pratique de la baie d’Halong',
  metaDescription: "Nos guides de la baie d’Halong et de la baie de Lan Ha : où aller, comment s’y rendre, quand partir et comment choisir sa croisière.",
  eyebrow: "Baie d’Halong · Baie de Lan Ha",
  title: 'Guide de voyage de la',
  titleEm: 'baie d’Halong',
  lead: "Retrouvez nos guides pour choisir votre croisière, préparer vos déplacements et découvrir les sites des deux baies.",
  plan: { title: 'Préparer votre voyage', lede: "Quand partir, combien de nuits, quelle baie choisir et comment rejoindre le port." },
  places: {
    title: 'Sites à visiter',
    lede: "Grottes, îles et villages des deux baies : le déroulement des visites et les itinéraires qui prévoient d’y faire escale.",
    hub: 'Voir tous les sites à visiter',
  },
  cruises: {
    title: 'Choisir votre croisière',
    lede: 'Les deux navires, les quatre itinéraires et les points à comparer avant de réserver.',
    itineraries: ['Tous les itinéraires', 'Deux baies, une ou deux nuits : les programmes jour par jour, côte à côte.'],
    luxury: ['Le guide complet des croisières de luxe écoresponsables', 'Ce qu’il faut vérifier avant de réserver : certifications, technologies et les deux baies.'],
    ship: (bay: string) => `${bay} : le navire, ses cabines, ses équipements et ses itinéraires.`,
  },
  journal: { title: 'Extraits du carnet de voyage', lede: 'Nos derniers articles sur les saisons, les comparatifs et le tourisme durable.', all: 'Tous les articles du carnet de voyage' },
};

const es: HubMessages = {
  metaTitle: 'Guía de viaje de la bahía de Halong',
  metaDescription: 'Empiece aquí: guías de la bahía de Halong y la bahía de Lan Ha sobre qué ver, cómo llegar, cuándo viajar y cómo elegir su crucero.',
  eyebrow: 'Bahía de Halong · Bahía de Lan Ha',
  title: 'Bahía de Halong',
  titleEm: 'guía de viaje',
  lead: 'Todas nuestras guías sobre las dos bahías, agrupadas según lo que esté planificando. Cada tarjeta le lleva a la página que responde a fondo.',
  plan: { title: 'Planifique su viaje', lede: 'Cuándo ir, cuántas noches, qué bahía elegir y cómo llegar al puerto.' },
  places: {
    title: 'Lugares que visitar',
    lede: 'Cuevas, islas y aldeas de las bahías: en qué consiste cada visita y qué itinerarios tienen prevista una parada allí.',
    hub: 'Ver todos los lugares que visitar',
  },
  cruises: {
    title: 'Elija su crucero',
    lede: 'Los dos barcos, los cuatro itinerarios y lo que conviene comparar antes de reservar.',
    itineraries: ['Todos los itinerarios', 'Dos bahías, una o dos noches: los programas día a día, uno junto a otro.'],
    luxury: ['La guía completa de los cruceros de lujo sostenibles (en inglés)', 'Qué comprobar antes de reservar: certificaciones, tecnología y las dos bahías.'],
    ship: (bay: string) => `${bay}: el barco, sus camarotes, instalaciones e itinerarios.`,
  },
  journal: { title: 'Del cuaderno de viaje', lede: 'Artículos recientes sobre temporadas, comparativas y sostenibilidad.', all: 'Todos los artículos del cuaderno de viaje' },
};

export const hubMessages = byLocale<HubMessages>({ en, vi, ja, fr, es });
