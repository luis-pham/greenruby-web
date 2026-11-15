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
  // No lead under the title (owner 2026-11-15): the overview section below introduces the page.
  lead: '',
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
  // Phase 2 (2026-11-15, EN only): the overnight-cruise planning articles grouped under "Choose your cruise" (they were
  // only reachable through the generic journal list). Paths are the English articles; other languages have none.
  cruisePlanning: [
    ['/blog/travel-tips/how-to-choose-luxury-halong-bay-cruise.html', 'How to choose a luxury cruise', 'Twelve questions to ask before you book: the route, the cabin, what is included and the booking terms.'],
    ['/blog/destinations/halong-bay-2-days-1-night-vs-3-days-2-nights.html', 'One night or two?', 'How a 2 days 1 night cruise compares with 3 days 2 nights, and who each one suits.'],
    ['/blog/travel-tips/halong-bay-day-cruise-vs-overnight.html', 'Day cruise or overnight?', 'What a night on the bay adds, and when a day trip from Hanoi is enough.'],
  ] as [string, string, string][],
  // SEO pass 2026-11-15 (EN only): a short overview of the bay, so the hub answers "what is Ha Long Bay" before it
  // sends readers on. Facts as published in the guides (UNESCO extension 2023, transfer times, seasons); [label](target)
  // links resolve through lib/copy-links.
  overview: {
    title: 'About Ha Long Bay and Lan Ha Bay',
    paragraphs: [
      'Ha Long Bay, on the coast of Quang Ninh province in north-east Vietnam, is a seascape of limestone islands and islets rising from sheltered water. It is a UNESCO World Heritage Site; in 2023 the listing was extended to the Cat Ba Archipelago, which takes in Lan Ha Bay.',
      'Visitors come for the karst scenery, show caves such as [Sung Sot Cave](/destinations/sung-sot-cave), viewpoints like [Ti Top Island](/destinations/ti-top-island), floating villages and quiet lagoons. [Places to visit](destinations) describes each stop and what a visit involves.',
      'Ha Long Bay is the classic core, with the best-known sights close together and busier routes. Lan Ha Bay, off Cat Ba Island, is calmer, with lagoons, small beaches and village life. Our [comparison of the two bays](bayComparison) sets out the differences.',
      'Most travellers see the bay from a boat, and an overnight stay adds the sunset and the early morning on the water after the day boats have gone. Green Ruby’s [overnight itineraries](itinerary) run 2 days 1 night or 3 days 2 nights, from February 2027.',
      'Late October to November usually brings the most settled weather, while summer is warm but is also storm season: see the [weather month by month](bestTime). From Hanoi, the drive to Tuan Chau takes around 2.5–3 hours; the [Hanoi to Halong Bay guide](transfer) compares limousines, private cars and buses.',
    ],
  },
};

export type HubMessages = Omit<typeof en, 'overview' | 'cruisePlanning'> & {
  overview?: { title: string; paragraphs: string[] };
  cruisePlanning?: [href: string, title: string, body: string][];
};

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

const de: HubMessages = {
  metaTitle: 'Reiseführer Halong-Bucht: Planung & Tipps',
  metaDescription: 'Reiseführer für Halong-Bucht und Lan-Ha-Bucht: Sehenswürdigkeiten, Anreise, beste Reisezeit und worauf Sie bei der Wahl Ihrer Kreuzfahrt achten sollten.',
  eyebrow: 'Halong-Bucht · Lan-Ha-Bucht',
  title: 'Reiseführer',
  titleEm: 'Halong-Bucht',
  lead: 'Alle unsere Ratgeber zu den beiden Buchten, geordnet nach dem, was Sie gerade planen. Jede Karte führt zu der Seite, die das Thema ausführlich behandelt.',
  plan: { title: 'Reise planen', lede: 'Wann reisen, wie viele Nächte, welche Bucht und wie Sie zum Hafen kommen.' },
  places: {
    title: 'Sehenswürdigkeiten',
    lede: 'Höhlen, Inseln und Dörfer in den Buchten: wie ein Besuch abläuft und welche Reiseverläufe dort einen Halt vorsehen.',
    hub: 'Alle Sehenswürdigkeiten ansehen',
  },
  cruises: {
    title: 'Kreuzfahrt wählen',
    lede: 'Die beiden Schiffe, die vier Reiseverläufe und was Sie vor der Buchungsanfrage vergleichen sollten.',
    itineraries: ['Alle Reiseverläufe', 'Zwei Buchten, eine oder zwei Nächte: die Programme Tag für Tag im direkten Vergleich.'],
    luxury: ['Der umfassende Ratgeber zu umweltbewussten Luxuskreuzfahrten', 'Was Sie vor der Buchung prüfen sollten: Zertifizierungen, Technik und die beiden Buchten.'],
    ship: (bay: string) => `Das Schiff in der ${bay}: Kabinen, Ausstattung und Reiseverläufe.`,
  },
  journal: { title: 'Aus dem Reisejournal', lede: 'Neue Beiträge zu Reisezeiten, Vergleichen und Nachhaltigkeit.', all: 'Alle Beiträge im Reisejournal' },
};

const ko: HubMessages = {
  metaTitle: '하롱베이 여행 가이드: 명소·교통·크루즈',
  metaDescription: '하롱베이와 란하베이 여행을 준비한다면 여기서 시작하세요. 가볼 만한 곳, 가는 법, 여행 시기, 크루즈 고르는 법을 한곳에 모았습니다.',
  eyebrow: '하롱베이 · 란하베이',
  title: '하롱베이',
  titleEm: '여행 가이드',
  lead: '하롱베이와 란하베이에 관해 저희가 펴낸 가이드를 여행 준비 단계별로 묶었습니다. 카드를 누르면 해당 주제를 자세히 다룬 페이지로 이동합니다.',
  plan: { title: '여행 계획', lede: '언제 갈지, 몇 박을 할지, 하롱베이와 란하베이 중 어디로 갈지, 선착장까지 어떻게 갈지 정리했습니다.' },
  places: {
    title: '가볼 만한 곳',
    lede: '하롱베이와 란하베이의 동굴, 섬, 마을을 소개합니다. 방문은 어떻게 이루어지는지, 어떤 일정에 포함될 예정인지 함께 확인하세요.',
    hub: '가볼 만한 곳 모두 보기',
  },
  cruises: {
    title: '크루즈 고르기',
    lede: '두 척의 선박과 네 가지 일정, 예약 전에 비교해 볼 사항을 정리했습니다.',
    itineraries: ['전체 일정 보기', '하롱베이와 란하베이, 1박 또는 2박: 날짜별 프로그램을 나란히 비교합니다.'],
    luxury: ['친환경 럭셔리 크루즈 종합 가이드', '예약 전에 확인할 점: 인증, 기술, 그리고 하롱베이와 란하베이의 차이.'],
    ship: (bay: string) => `${bay} 운항 선박: 객실, 시설, 일정 안내.`,
  },
  journal: { title: '여행 저널', lede: '여행 시기, 비교 정보, 지속 가능한 여행을 다룬 최근 글입니다.', all: '여행 저널 전체 보기' },
};

export const hubMessages = byLocale<HubMessages>({ en, vi, ja, fr, es, de, ko });
