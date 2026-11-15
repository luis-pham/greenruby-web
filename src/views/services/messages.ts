import { byLocale } from '@/lib/i18n';

// Editorial copy for the services page that the CMS has no fields for (design: green-ruby-services-v1).
// CMS content (services, groups, wedding/event blocks, ready-to-sail CTA, FAQs) comes from the Content API.

const pad = (n: number) => String(n).padStart(2, '0');

const en = {
  metaTitle: 'Premium Services & Private Events',
  metaDescription:
    'Transfers, spa treatments, photography, celebrations and private charters on Green Ruby cruises in Ha Long and Lan Ha Bay.',
  breadcrumb: 'Services',
  hero: {
    eyebrow: 'The Green Ruby concierge collection',
    title: 'Every detail,',
    titleEm: 'beautifully considered.',
    body: 'From a seamless arrival to the moments worth celebrating, discover the thoughtful additions that can make your voyage feel entirely your own.',
    primary: 'Explore our services',
    secondary: 'Speak with our team',
    visualLabel: 'The art of personal service',
    visualCaption: 'Made for your moments.',
  },
  collection: {
    heading: 'Our services',
    filterLabel: 'Filter services',
    all: 'All services',
    results: (n: number) => `Showing ${pad(n)} ${n === 1 ? 'service' : 'services'}`,
    included: 'Included',
    optional: 'Optional service',
    price: (price: string) => `From ${price}`,
    enquire: 'Enquire about this service',
    enquireSubject: (name: string) => `Green Ruby service enquiry: ${name}`,
    note: "Availability, pricing and applicable terms are confirmed by Green Ruby's reservations team. Optional services are not included in the standard cruise fare.",
    empty: 'Our team will be happy to talk you through the services available for your voyage.',
  },
  story: {
    eyebrow: 'Before you set sail',
    title: 'A graceful start to',
    titleEm: 'every escape.',
    paragraphs: [
      'The road from Hanoi to the bay should feel like part of the experience, not another detail to manage. Green Ruby can arrange a private transfer between your hotel and the cruise terminal.',
      'Share your hotel, travel date and group size with our team to discuss the most suitable option.',
    ],
    points: ['Hanoi to the Tuan Chau departure area', 'Private transfer on request', 'Transfer charges confirmed separately'],
    stamp: ['The journey', 'begins', 'before boarding'],
    cta: 'Enquire about transfers',
  },
  inclusions: {
    eyebrow: 'Travel with clarity',
    title: 'What belongs to the voyage —',
    titleEm: 'and what is arranged for you.',
    body: 'A simple guide to the difference between regular itinerary inclusions and optional personal services.',
    included: {
      label: 'Standard itinerary inclusions',
      title: ['Already part of', 'the journey.'],
      items: [
        'Your private air-conditioned cabin and the meals specified in the itinerary',
        'Scheduled sightseeing and entrance fees',
        'Standard kayaking, bamboo boat and onboard activities as listed in your itinerary',
        'Drinking water and onboard guest assistance',
        '24-hour reception, daily housekeeping and turndown service',
      ],
      foot: 'Included items can vary with the selected itinerary; please confirm the final inclusions when booking.',
    },
    optional: {
      label: 'Personalised additions',
      title: ['Beautifully arranged,', 'upon request.'],
      items: [
        'Hanoi–Ha Long transfers and private transportation',
        'Selected spa treatments and massage packages',
        'Photography, drone filming, celebration decorations and private dining',
        'Other beverages and personal purchases',
      ],
      foot: 'Optional items, pricing, permissions and availability should be confirmed before booking.',
    },
  },
  celebrations: {
    eyebrow: 'Weddings & celebrations',
    eventsEyebrow: 'Private events',
    eventsTitle: 'Gatherings with',
    eventsTitleEm: 'the bay as backdrop.',
    spaces: 'Spaces for the occasion',
    viewSpace: 'View the space',
    proposal: 'Request a proposal',
    area: (m2: number) => `${m2} m²`,
  },
  process: {
    eyebrow: 'Make it yours',
    title: 'A personal touch is',
    titleEm: 'one conversation away.',
    body: 'Start with the voyage. Tell us the details that matter. Let the reservations team confirm what can be arranged.',
    steps: [
      { tag: 'Discover', title: 'Choose your voyage', body: 'Start with your preferred bay, journey and cabin, whether for a one-night escape or a longer journey.' },
      { tag: 'Personalise', title: 'Share your wishes', body: 'Ask about transfers, wellness treatments, photography or a special welcome.' },
      { tag: 'Confirm', title: 'Travel beautifully', body: 'Review availability and any additional costs with the reservations team before your trip.' },
    ],
  },
  faq: {
    eyebrow: 'Good to know',
    title: 'The thoughtful details,',
    titleEm: 'answered.',
    body: 'Planning something specific? Our team can help clarify the options for your itinerary.',
    link: 'More frequently asked questions',
    items: [
      {
        question: 'Are transfers from Hanoi included in the cruise fare?',
        answerHtml:
          '<p>Transfers are not part of the standard fare. A private transfer can be arranged at an additional charge.</p>',
      },
      {
        question: 'Are spa and massage treatments included?',
        answerHtml:
          '<p>Spa treatments are optional and may incur additional charges. Ask the reservations team about the treatments available on your voyage.</p>',
      },
      {
        question: 'Can I arrange photography or drone filming?',
        answerHtml:
          '<p>Photography and drone filming are optional services. Please confirm availability, timing, local permissions and charges with our team in advance.</p>',
      },
      {
        question: 'Can you help make a celebration special?',
        answerHtml:
          '<p>Yes. Share the occasion and the details you have in mind with the reservations team, and they will check what can be arranged on board.</p>',
      },
    ],
  },
  cta: {
    eyebrow: 'A voyage made for you',
    title: 'Every arrangement for your trip,',
    titleEm: 'handled clearly.',
    body: 'Tell our team how you imagine your time on the bay. We will help you explore the available services and the right journey to pair them with.',
    primary: 'Plan with our team',
    secondary: 'Explore itineraries',
  },
};

export type ServicesMessages = typeof en;

const vi: ServicesMessages = {
  metaTitle: 'Dịch vụ cao cấp & Sự kiện riêng',
  metaDescription:
    'Xe đưa đón, spa, chụp ảnh, tiệc kỷ niệm và thuê trọn tàu trên du thuyền Green Ruby tại Vịnh Hạ Long và Lan Hạ.',
  breadcrumb: 'Dịch vụ',
  hero: {
    eyebrow: 'Bộ sưu tập dịch vụ Green Ruby',
    title: 'Từng chi tiết,',
    titleEm: 'đều được chăm chút.',
    body: 'Từ khoảnh khắc đón bạn lên tàu đến những dịp đáng để ăn mừng, hãy khám phá những dịch vụ tinh tế giúp chuyến đi thực sự mang dấu ấn của riêng bạn.',
    primary: 'Khám phá dịch vụ',
    secondary: 'Trao đổi với chúng tôi',
    visualLabel: 'Nghệ thuật phục vụ tận tâm',
    visualCaption: 'Dành cho những khoảnh khắc của bạn.',
  },
  collection: {
    heading: 'Danh sách dịch vụ',
    filterLabel: 'Lọc dịch vụ',
    all: 'Tất cả dịch vụ',
    results: (n: number) => `Đang hiển thị ${pad(n)} dịch vụ`,
    included: 'Đã bao gồm',
    optional: 'Dịch vụ tùy chọn',
    price: (price: string) => `Từ ${price}`,
    enquire: 'Hỏi về dịch vụ này',
    enquireSubject: (name: string) => `Hỏi về dịch vụ Green Ruby: ${name}`,
    note: 'Tình trạng, giá và điều khoản áp dụng sẽ được bộ phận đặt chỗ của Green Ruby xác nhận. Dịch vụ tùy chọn không bao gồm trong giá du thuyền tiêu chuẩn.',
    empty: 'Đội ngũ của chúng tôi sẵn sàng tư vấn các dịch vụ phù hợp cho chuyến đi của bạn.',
  },
  story: {
    eyebrow: 'Trước giờ khởi hành',
    title: 'Khởi đầu nhẹ nhàng cho',
    titleEm: 'mọi chuyến đi.',
    paragraphs: [
      'Quãng đường từ Hà Nội ra vịnh nên là một phần của trải nghiệm, chứ không phải thêm một việc phải lo. Green Ruby có thể sắp xếp xe riêng đưa đón giữa khách sạn và bến tàu.',
      'Hãy cho chúng tôi biết khách sạn, ngày đi và số người trong đoàn để được tư vấn phương án phù hợp nhất.',
    ],
    points: ['Từ Hà Nội đến khu vực đón khách tại Tuần Châu', 'Xe riêng theo yêu cầu', 'Phí đưa đón được báo riêng'],
    stamp: ['Hành trình', 'bắt đầu', 'trước khi lên tàu'],
    cta: 'Hỏi về dịch vụ đưa đón',
  },
  inclusions: {
    eyebrow: 'Rõ ràng từ đầu',
    title: 'Những gì thuộc về hành trình —',
    titleEm: 'và những gì được sắp xếp riêng.',
    body: 'Hướng dẫn ngắn gọn để phân biệt phần đã bao gồm trong lịch trình và các dịch vụ cá nhân tùy chọn.',
    included: {
      label: 'Bao gồm trong lịch trình',
      title: ['Đã là một phần', 'của hành trình.'],
      items: [
        'Cabin riêng có điều hòa và các bữa ăn theo lịch trình',
        'Các điểm tham quan theo lịch trình và vé vào cửa',
        'Chèo kayak, đò tre và các hoạt động trên tàu như ghi trong lịch trình',
        'Nước uống và đội ngũ hỗ trợ khách trên tàu',
        'Lễ tân 24 giờ, dọn phòng hằng ngày và chuẩn bị phòng buổi tối',
      ],
      foot: 'Các mục bao gồm có thể khác nhau tùy lịch trình; vui lòng xác nhận lại khi đặt chỗ.',
    },
    optional: {
      label: 'Dịch vụ cá nhân hóa',
      title: ['Chu đáo sắp xếp,', 'theo yêu cầu.'],
      items: [
        'Xe đưa đón Hà Nội – Hạ Long và xe riêng',
        'Một số liệu trình spa và gói massage',
        'Chụp ảnh, quay phim bằng drone, trang trí tiệc kỷ niệm và bữa ăn riêng tư',
        'Đồ uống khác và chi tiêu cá nhân',
      ],
      foot: 'Vui lòng xác nhận dịch vụ, giá, giấy phép và tình trạng trước khi đặt.',
    },
  },
  celebrations: {
    eyebrow: 'Tiệc cưới & kỷ niệm',
    eventsEyebrow: 'Sự kiện riêng',
    eventsTitle: 'Những buổi gặp gỡ',
    eventsTitleEm: 'giữa lòng vịnh.',
    spaces: 'Không gian cho dịp đặc biệt',
    viewSpace: 'Xem không gian',
    proposal: 'Yêu cầu báo giá',
    area: (m2: number) => `${m2} m²`,
  },
  process: {
    eyebrow: 'Theo cách của bạn',
    title: 'Dấu ấn riêng chỉ cách',
    titleEm: 'một cuộc trò chuyện.',
    body: 'Bắt đầu từ hành trình. Cho chúng tôi biết những điều bạn quan tâm. Bộ phận đặt chỗ sẽ xác nhận những gì có thể sắp xếp.',
    steps: [
      { tag: 'Khám phá', title: 'Chọn hành trình', body: 'Chọn vịnh, lịch trình và cabin bạn thích, dù là chuyến đi một đêm hay dài ngày hơn.' },
      { tag: 'Cá nhân hóa', title: 'Chia sẻ mong muốn', body: 'Hỏi về xe đưa đón, spa, chụp ảnh hay một màn chào đón đặc biệt.' },
      { tag: 'Xác nhận', title: 'Lên đường thảnh thơi', body: 'Cùng bộ phận đặt chỗ xem lại tình trạng dịch vụ và chi phí phát sinh trước chuyến đi.' },
    ],
  },
  faq: {
    eyebrow: 'Điều cần biết',
    title: 'Những chi tiết nhỏ,',
    titleEm: 'được giải đáp.',
    body: 'Bạn đang lên kế hoạch cho điều gì đó đặc biệt? Đội ngũ của chúng tôi sẽ giúp làm rõ các lựa chọn cho lịch trình của bạn.',
    link: 'Xem thêm câu hỏi thường gặp',
    items: [
      {
        question: 'Giá du thuyền đã bao gồm xe đưa đón từ Hà Nội chưa?',
        answerHtml: '<p>Xe đưa đón không nằm trong giá tiêu chuẩn. Chúng tôi có thể sắp xếp xe riêng với chi phí bổ sung.</p>',
      },
      {
        question: 'Spa và massage có được bao gồm không?',
        answerHtml: '<p>Các liệu trình spa là dịch vụ tùy chọn và có thể phát sinh thêm chi phí. Hãy hỏi bộ phận đặt chỗ về các liệu trình có trên chuyến đi của bạn.</p>',
      },
      {
        question: 'Tôi có thể đặt chụp ảnh hoặc quay phim bằng drone không?',
        answerHtml:
          '<p>Chụp ảnh và quay phim bằng drone là dịch vụ tùy chọn. Vui lòng xác nhận trước với chúng tôi về lịch, giấy phép bay tại địa phương và chi phí.</p>',
      },
      {
        question: 'Green Ruby có thể giúp tôi chuẩn bị một dịp kỷ niệm không?',
        answerHtml: '<p>Có. Hãy chia sẻ dịp đặc biệt và những chi tiết bạn mong muốn với bộ phận đặt chỗ để chúng tôi kiểm tra những gì có thể sắp xếp trên tàu.</p>',
      },
    ],
  },
  cta: {
    eyebrow: 'Hành trình dành riêng cho bạn',
    title: 'Mọi sắp xếp cho chuyến đi,',
    titleEm: 'gọn gàng và rõ ràng.',
    body: 'Hãy kể cho chúng tôi về chuyến đi bạn hình dung. Chúng tôi sẽ giúp bạn chọn dịch vụ và hành trình phù hợp.',
    primary: 'Liên hệ tư vấn',
    secondary: 'Xem hành trình',
  },
};

const ja: ServicesMessages = {
  metaTitle: '上質なサービスとプライベートイベント',
  metaDescription:
    'ハロン湾・ランハ湾のGreen Rubyクルーズで、送迎、スパ、写真撮影、記念日のお祝い、貸切チャーターをご用意します。',
  breadcrumb: 'サービス',
  hero: {
    eyebrow: 'コンシェルジュサービス',
    title: 'ひとつひとつの細部に、',
    titleEm: '丁寧な心配りを',
    body: 'スムーズなご到着から、お祝いしたいひとときまで。船旅をより自分らしいものにする、心配りの行き届いたサービスをご紹介します。',
    primary: 'サービスを見る',
    secondary: 'スタッフに相談する',
    visualLabel: 'お客様一人ひとりへのおもてなし',
    visualCaption: '大切なひとときのために。',
  },
  collection: {
    heading: 'サービス一覧',
    filterLabel: 'サービスを絞り込む',
    all: 'すべてのサービス',
    results: (n: number) => `${pad(n)}件のサービスを表示中`,
    included: '料金に含まれます',
    optional: 'オプションサービス',
    price: (price: string) => `${price}〜`,
    enquire: 'お問い合わせはこちら',
    enquireSubject: (name: string) => `Green Rubyサービスに関するお問い合わせ：${name}`,
    note: '空き状況、料金、適用条件はGreen Rubyの予約担当チームが確認のうえご案内します。オプションサービスは標準のクルーズ料金に含まれません。',
    empty: 'ご旅行に合わせてご利用いただけるサービスについて、スタッフが喜んでご案内します。',
  },
  story: {
    eyebrow: 'ご乗船の前に',
    title: 'どの旅も、',
    titleEm: '心地よい始まりを',
    paragraphs: [
      'ハノイから湾までの道のりも、手配に追われる時間ではなく旅の一部であってほしいと考えています。Green Rubyがホテルとクルーズターミナル間の専用車送迎を手配します。',
      'ご宿泊のホテル、ご旅行日、人数をお知らせいただければ、最適な方法をご提案します。',
    ],
    points: ['ハノイからトゥアンチャウ（Tuan Chau）の出発エリアまで', 'ご希望に応じて専用車で送迎', '送迎料金は別途ご案内'],
    stamp: ['旅は', '乗船の前から', '始まっています'],
    cta: '送迎を相談する',
  },
  inclusions: {
    eyebrow: 'わかりやすいご案内',
    title: 'クルーズに含まれるもの、',
    titleEm: 'ご希望に応じて手配するもの',
    body: '行程に通常含まれる内容と、個別にご依頼いただけるオプションサービスの違いを簡単にご案内します。',
    included: {
      label: '行程に含まれるもの',
      title: ['旅の一部として', 'ご用意しています。'],
      items: [
        '冷房付きの専用客室と、行程に記載のお食事',
        '予定された観光と入場料',
        '行程に記載された通常のカヤック、バンブーボート、船内アクティビティ',
        '飲料水と船内スタッフによるサポート',
        '24時間対応フロント、毎日の客室清掃、ターンダウンサービス',
      ],
      foot: '含まれる内容は選択する行程により異なる場合があります。最終的な内容はご予約時にご確認ください。',
    },
    optional: {
      label: '個別の追加サービス',
      title: ['ご希望に応じて、', '丁寧に手配します。'],
      items: [
        'ハノイ〜ハロン間の送迎と専用車',
        '一部のスパトリートメントとマッサージパッケージ',
        '写真撮影、ドローン撮影、お祝いの装飾、プライベートダイニング',
        'その他のお飲み物と個人的なご購入品',
      ],
      foot: 'オプションの内容、料金、許可、空き状況はご予約前にご確認ください。',
    },
  },
  celebrations: {
    eyebrow: 'ウェディングと記念日',
    eventsEyebrow: 'プライベートイベント',
    eventsTitle: '湾の景色を背景に、',
    eventsTitleEm: '大切な集いを',
    spaces: 'イベントにふさわしい空間',
    viewSpace: '空間を見る',
    proposal: 'プランの提案を依頼',
    area: (m2: number) => `${m2}m²`,
  },
  process: {
    eyebrow: 'お好みに合わせて',
    title: '特別なご要望も、',
    titleEm: 'まずはご相談から',
    body: 'まずはクルーズをお選びください。大切にしたいことをお聞かせいただければ、予約担当チームが手配可能な内容を確認します。',
    steps: [
      { tag: '選ぶ', title: 'クルーズを選ぶ', body: '1泊の小旅行から長めの船旅まで、ご希望の湾、行程、客室をお選びください。' },
      { tag: 'カスタマイズ', title: 'ご希望を伝える', body: '送迎、ウェルネストリートメント、写真撮影、特別なお出迎えなどについてお問い合わせください。' },
      { tag: '確認する', title: '心地よい船旅へ', body: 'ご出発前に、空き状況と追加料金を予約担当チームとご確認ください。' },
    ],
  },
  faq: {
    eyebrow: 'ご案内',
    title: '気になる細かな点に、',
    titleEm: 'お答えします',
    body: '具体的なご予定はありますか？ご旅行の行程に合わせて、スタッフが選択肢をご説明します。',
    link: 'その他のよくあるご質問',
    items: [
      {
        question: 'ハノイからの送迎はクルーズ料金に含まれていますか？',
        answerHtml:
          '<p>送迎は標準料金に含まれていません。専用車での送迎を追加料金で手配できます。</p>',
      },
      {
        question: 'スパやマッサージは料金に含まれていますか？',
        answerHtml:
          '<p>スパトリートメントはオプションで、追加料金がかかる場合があります。ご乗船のクルーズで受けられるトリートメントについては、予約担当チームにお問い合わせください。</p>',
      },
      {
        question: '写真撮影やドローン撮影を手配できますか？',
        answerHtml:
          '<p>写真撮影とドローン撮影はオプションサービスです。空き状況、日時、現地での許可、料金について、事前にスタッフとご確認ください。</p>',
      },
      {
        question: '記念日のお祝いを手伝ってもらえますか？',
        answerHtml:
          '<p>はい。お祝いの内容や思い描いている演出を予約担当チームにお知らせください。船内で手配できる内容を確認します。</p>',
      },
    ],
  },
  cta: {
    eyebrow: 'お客様に合わせた船旅',
    title: '特別な時間を、',
    titleEm: '気負わずに',
    body: '湾でどのように過ごしたいか、スタッフにお聞かせください。ご利用いただけるサービスと、それに合うクルーズ選びをお手伝いします。',
    primary: 'スタッフと計画する',
    secondary: 'クルーズ行程を見る',
  },
};

const fr: ServicesMessages = {
  metaTitle: 'Services haut de gamme et événements privés',
  metaDescription:
    "Transferts, soins au spa, photographie, célébrations et privatisations à bord des croisières Green Ruby en baie d’Halong et en baie de Lan Ha.",
  breadcrumb: 'Services',
  hero: {
    eyebrow: 'Les services de conciergerie Green Ruby',
    title: 'Chaque détail,',
    titleEm: 'pensé avec soin.',
    body: "Transferts, soins au spa et célébrations à bord : notre équipe vous aide à organiser les services adaptés à votre croisière.",
    primary: 'Découvrir nos services',
    secondary: 'Échanger avec notre équipe',
    visualLabel: "L’art du service personnalisé",
    visualCaption: 'Un service adapté à votre séjour.',
  },
  collection: {
    heading: 'Nos services',
    filterLabel: 'Filtrer les services',
    all: 'Tous les services',
    results: (n: number) => `${pad(n)} ${n <= 1 ? 'service affiché' : 'services affichés'}`,
    included: 'Inclus',
    optional: 'Service en option',
    price: (price: string) => `À partir de ${price}`,
    enquire: 'Se renseigner sur ce service',
    enquireSubject: (name: string) => `Demande de renseignements sur un service Green Ruby : ${name}`,
    note: "Les disponibilités, les tarifs et les conditions applicables sont confirmés par l’équipe de réservation de Green Ruby. Les services en option ne sont pas compris dans le tarif standard de la croisière.",
    empty: 'Notre équipe se fera un plaisir de vous présenter les services proposés pour votre croisière.',
  },
  story: {
    eyebrow: 'Avant le départ',
    title: 'Un début en douceur pour',
    titleEm: 'chaque escapade.',
    paragraphs: [
      "Pour rejoindre la baie depuis Hanoï, Green Ruby peut organiser un transfert privé entre votre hôtel et le terminal de croisière.",
      "Indiquez à notre équipe votre hôtel, votre date de voyage et le nombre de voyageurs pour étudier la solution la mieux adaptée.",
    ],
    points: ["De Hanoï à la zone d’embarquement de Tuan Chau", 'Transfert privé sur demande', 'Coût du transfert confirmé séparément'],
    stamp: ['Le voyage', 'commence', "avant l’embarquement"],
    cta: 'Se renseigner sur les transferts',
  },
  inclusions: {
    eyebrow: 'Comprendre votre tarif',
    title: 'Ce que comprend la croisière,',
    titleEm: 'et ce que nous organisons pour vous.',
    body: "Les prestations incluses dans votre itinéraire et les services proposés en supplément.",
    included: {
      label: "Prestations incluses dans l’itinéraire",
      title: ['Déjà compris', 'dans le voyage.'],
      items: [
        "Votre cabine privée climatisée et les repas indiqués dans l’itinéraire",
        "Les visites prévues et les droits d’entrée",
        "Le kayak, la barque en bambou et les activités à bord prévus dans votre itinéraire (le kayak est temporairement suspendu en baie de Lan Ha par la réglementation locale)",
        "L’eau potable et l’assistance aux passagers à bord",
        'Réception 24 h/24, ménage quotidien et service de couverture',
      ],
      foot: "Les prestations incluses peuvent varier selon l’itinéraire choisi ; merci de les confirmer au moment de la réservation.",
    },
    optional: {
      label: 'Prestations en supplément',
      title: ['Organisées avec soin,', 'sur demande.'],
      items: [
        'Transferts Hanoï–Halong et transport privé',
        'Une sélection de soins au spa et de forfaits massage',
        'Photographie, prises de vue par drone, décoration pour une célébration et dîner privé',
        'Autres boissons et achats personnels',
      ],
      foot: 'Les services en option, leurs tarifs, les autorisations nécessaires et les disponibilités sont à confirmer avant la réservation.',
    },
  },
  celebrations: {
    eyebrow: 'Mariages et célébrations',
    eventsEyebrow: 'Événements privés',
    eventsTitle: 'Se réunir avec',
    eventsTitleEm: 'la baie pour décor.',
    spaces: "Des espaces pour l’occasion",
    viewSpace: "Voir l’espace",
    proposal: 'Demander une proposition',
    area: (m2: number) => `${m2} m²`,
  },
  process: {
    eyebrow: 'À votre image',
    title: 'Une touche personnelle,',
    titleEm: "le temps d’une conversation.",
    body: "Choisissez d’abord votre croisière. Dites-nous ce qui compte pour vous. L’équipe de réservation confirmera ce qui peut être organisé.",
    steps: [
      { tag: 'Découvrir', title: 'Choisissez votre croisière', body: "Commencez par la baie, l’itinéraire et la cabine qui vous tentent, pour une escapade d’une nuit ou un voyage plus long." },
      { tag: 'Personnaliser', title: 'Partagez vos envies', body: 'Renseignez-vous sur les transferts, les soins bien-être, la photographie ou un accueil particulier.' },
      { tag: 'Confirmer', title: 'Voyagez en toute sérénité', body: "Vérifiez les disponibilités et les éventuels frais supplémentaires avec l’équipe de réservation avant votre départ." },
    ],
  },
  faq: {
    eyebrow: 'Bon à savoir',
    title: 'Vos questions,',
    titleEm: 'nos réponses.',
    body: "Vous avez un projet précis ? Notre équipe peut vous aider à y voir clair dans les options de votre itinéraire.",
    link: "Toutes les questions fréquentes",
    items: [
      {
        question: 'Les transferts depuis Hanoï sont-ils compris dans le tarif de la croisière ?',
        answerHtml:
          '<p>Les transferts ne font pas partie du tarif standard. Un transfert privé peut être organisé moyennant un supplément.</p>',
      },
      {
        question: 'Les soins au spa et les massages sont-ils inclus ?',
        answerHtml:
          "<p>Les soins au spa sont en option et peuvent entraîner des frais supplémentaires. Renseignez-vous auprès de l’équipe de réservation sur les soins proposés lors de votre croisière.</p>",
      },
      {
        question: 'Puis-je réserver un photographe ou des prises de vue par drone ?',
        answerHtml:
          '<p>La photographie et les prises de vue par drone sont des services en option. Merci de confirmer à l’avance avec notre équipe la disponibilité, les horaires, les autorisations locales et les tarifs.</p>',
      },
      {
        question: "Pouvez-vous organiser une célébration à bord ?",
        answerHtml:
          "<p>Oui. Présentez l’occasion et vos idées à l’équipe de réservation : elle vérifiera ce qui peut être organisé à bord.</p>",
      },
    ],
  },
  cta: {
    eyebrow: 'Une croisière faite pour vous',
    title: 'Que tout semble',
    titleEm: 'simple.',
    body: "Dites à notre équipe comment vous imaginez votre séjour sur la baie. Nous vous aiderons à choisir parmi les services proposés et à trouver la croisière qui s’y prête.",
    primary: 'Préparer votre croisière avec nous',
    secondary: 'Voir les itinéraires',
  },
};

const es: ServicesMessages = {
  metaTitle: 'Servicios premium y eventos privados a bordo',
  metaDescription:
    'Traslados, tratamientos de spa, fotografía, celebraciones y chárteres privados a bordo de los cruceros Green Ruby por la bahía de Halong y la bahía de Lan Ha.',
  breadcrumb: 'Servicios',
  hero: {
    eyebrow: 'Los servicios de conserjería de Green Ruby',
    title: 'Cada detalle,',
    titleEm: 'cuidadosamente pensado.',
    body: 'De una llegada sin complicaciones a los momentos que merecen celebrarse, descubra los servicios que pueden hacer que su crucero sea realmente suyo.',
    primary: 'Ver nuestros servicios',
    secondary: 'Hablar con nuestro equipo',
    visualLabel: 'El arte del servicio personal',
    visualCaption: 'Pensado para sus momentos.',
  },
  collection: {
    heading: 'Nuestros servicios',
    filterLabel: 'Filtrar servicios',
    all: 'Todos los servicios',
    results: (n: number) => `Mostrando ${pad(n)} ${n === 1 ? 'servicio' : 'servicios'}`,
    included: 'Incluido',
    optional: 'Servicio opcional',
    price: (price: string) => `Desde ${price}`,
    enquire: 'Consultar este servicio',
    enquireSubject: (name: string) => `Consulta sobre un servicio de Green Ruby: ${name}`,
    note: 'El equipo de reservas de Green Ruby confirma la disponibilidad, los precios y las condiciones aplicables. Los servicios opcionales no están incluidos en la tarifa estándar del crucero.',
    empty: 'Nuestro equipo le explicará con gusto los servicios disponibles para su crucero.',
  },
  story: {
    eyebrow: 'Antes de zarpar',
    title: 'Un comienzo sereno para',
    titleEm: 'cada escapada.',
    paragraphs: [
      'El trayecto de Hanói a la bahía debería formar parte de la experiencia, no ser un detalle más que gestionar. Green Ruby puede organizar un traslado privado entre su hotel y la terminal de cruceros.',
      'Indique a nuestro equipo su hotel, la fecha de viaje y el número de personas para valorar la opción más adecuada.',
    ],
    points: ['De Hanói a la zona de embarque de Tuan Chau', 'Traslado privado bajo petición', 'El coste del traslado se confirma aparte'],
    stamp: ['El viaje', 'empieza', 'antes del embarque'],
    cta: 'Consultar sobre traslados',
  },
  inclusions: {
    eyebrow: 'Viajar con claridad',
    title: 'Lo que incluye el crucero',
    titleEm: 'y lo que organizamos para usted.',
    body: 'Una guía sencilla para distinguir lo que incluye el itinerario de los servicios personales opcionales.',
    included: {
      label: 'Incluido en el itinerario',
      title: ['Ya forma parte', 'del viaje.'],
      items: [
        'Su camarote privado con aire acondicionado y las comidas indicadas en el itinerario',
        'Las visitas programadas y las entradas',
        'El kayak, la barca de bambú y las actividades a bordo indicadas en su itinerario (el kayak en la bahía de Lan Ha está suspendido temporalmente por la normativa local)',
        'Agua potable y asistencia a los huéspedes a bordo',
        'Recepción 24 horas, limpieza diaria y servicio de cobertura',
      ],
      foot: 'Lo incluido puede variar según el itinerario elegido; confírmelo al hacer la reserva.',
    },
    optional: {
      label: 'Servicios personalizados',
      title: ['Organizados con esmero,', 'bajo petición.'],
      items: [
        'Traslados Hanói–Halong y transporte privado',
        'Una selección de tratamientos de spa y paquetes de masaje',
        'Fotografía, grabación con dron, decoración para celebraciones y cenas privadas',
        'Otras bebidas y compras personales',
      ],
      foot: 'Los servicios opcionales, sus precios, los permisos necesarios y la disponibilidad deben confirmarse antes de reservar.',
    },
  },
  celebrations: {
    eyebrow: 'Bodas y celebraciones',
    eventsEyebrow: 'Eventos privados',
    eventsTitle: 'Reuniones con',
    eventsTitleEm: 'la bahía como escenario.',
    spaces: 'Espacios para la ocasión',
    viewSpace: 'Ver el espacio',
    proposal: 'Solicitar una propuesta',
    area: (m2: number) => `${m2} m²`,
  },
  process: {
    eyebrow: 'A su medida',
    title: 'Un toque personal',
    titleEm: 'está a una conversación.',
    body: 'Empiece por el crucero. Cuéntenos los detalles que le importan. El equipo de reservas le confirmará lo que se puede organizar.',
    steps: [
      { tag: 'Descubrir', title: 'Elija su crucero', body: 'Empiece por la bahía, el itinerario y el camarote que prefiera, ya sea una escapada de una noche o un viaje más largo.' },
      { tag: 'Personalizar', title: 'Cuéntenos sus deseos', body: 'Pregunte por traslados, tratamientos de bienestar, fotografía o una bienvenida especial.' },
      { tag: 'Confirmar', title: 'Viaje con tranquilidad', body: 'Revise con el equipo de reservas la disponibilidad y los posibles costes adicionales antes del viaje.' },
    ],
  },
  faq: {
    eyebrow: 'Conviene saber',
    title: 'Los detalles,',
    titleEm: 'resueltos.',
    body: '¿Tiene algo concreto en mente? Nuestro equipo le ayudará a aclarar las opciones de su itinerario.',
    link: 'Más preguntas frecuentes',
    items: [
      {
        question: '¿Los traslados desde Hanói están incluidos en la tarifa del crucero?',
        answerHtml:
          '<p>Los traslados no forman parte de la tarifa estándar. Se puede organizar un traslado privado con un coste adicional.</p>',
      },
      {
        question: '¿Los tratamientos de spa y los masajes están incluidos?',
        answerHtml:
          '<p>Los tratamientos de spa son opcionales y pueden tener un coste adicional. Consulte al equipo de reservas qué tratamientos estarán disponibles en su crucero.</p>',
      },
      {
        question: '¿Puedo contratar fotografía o grabación con dron?',
        answerHtml:
          '<p>La fotografía y la grabación con dron son servicios opcionales. Confirme con antelación con nuestro equipo la disponibilidad, el horario, los permisos locales y el precio.</p>',
      },
      {
        question: '¿Pueden ayudarme a preparar una celebración especial?',
        answerHtml:
          '<p>Sí. Cuéntele al equipo de reservas la ocasión y lo que tiene en mente, y comprobará qué se puede organizar a bordo.</p>',
      },
    ],
  },
  cta: {
    eyebrow: 'Un crucero hecho para usted',
    title: 'Que lo extraordinario resulte',
    titleEm: 'sencillo.',
    body: 'Cuéntenos cómo imagina su estancia en la bahía. Le ayudaremos a conocer los servicios disponibles y el crucero que mejor encaja con ellos.',
    primary: 'Planificar con nuestro equipo',
    secondary: 'Ver los itinerarios',
  },
};

const de: ServicesMessages = {
  metaTitle: 'Zusatzleistungen & private Events',
  metaDescription:
    'Transfers, Spa-Behandlungen, Fotografie, Feiern und private Charter an Bord der Green-Ruby-Kreuzfahrten in der Halong-Bucht und der Lan-Ha-Bucht.',
  breadcrumb: 'Services',
  hero: {
    eyebrow: 'Die Concierge-Leistungen von Green Ruby',
    title: 'Jedes Detail,',
    titleEm: 'sorgfältig bedacht.',
    body: 'Von der entspannten Anreise bis zu den Momenten, die gefeiert werden wollen: Zusatzleistungen, mit denen Ihre Reise ganz zu Ihrer eigenen wird.',
    primary: 'Unsere Services entdecken',
    secondary: 'Mit unserem Team sprechen',
    visualLabel: 'Die Kunst des persönlichen Service',
    visualCaption: 'Für Ihre Momente gemacht.',
  },
  collection: {
    heading: 'Unsere Services',
    filterLabel: 'Services filtern',
    all: 'Alle Services',
    results: (n: number) => `${pad(n)} ${n === 1 ? 'Service' : 'Services'} angezeigt`,
    included: 'Inklusive',
    optional: 'Optionale Leistung',
    price: (price: string) => `Ab ${price}`,
    enquire: 'Diese Leistung anfragen',
    enquireSubject: (name: string) => `Anfrage zu einer Green-Ruby-Leistung: ${name}`,
    note: 'Verfügbarkeit, Preise und geltende Bedingungen bestätigt das Reservierungsteam von Green Ruby. Optionale Leistungen sind im regulären Reisepreis nicht enthalten.',
    empty: 'Unser Team erläutert Ihnen gern, welche Services für Ihre Reise verfügbar sind.',
  },
  story: {
    eyebrow: 'Vor dem Ablegen',
    title: 'Ein entspannter Auftakt',
    titleEm: 'für jede Auszeit.',
    paragraphs: [
      'Die Fahrt von Hanoi in die Bucht sollte Teil des Erlebnisses sein und nicht ein weiteres Detail, um das Sie sich kümmern müssen. Green Ruby kann einen privaten Transfer zwischen Ihrem Hotel und dem Kreuzfahrtterminal organisieren.',
      'Nennen Sie unserem Team Ihr Hotel, Ihr Reisedatum und die Größe Ihrer Gruppe, damit wir die passende Lösung besprechen können.',
    ],
    points: ['Von Hanoi zum Abfahrtsbereich Tuan Chau', 'Privater Transfer auf Anfrage', 'Transferkosten werden gesondert bestätigt'],
    stamp: ['Die Reise', 'beginnt', 'vor dem Einschiffen'],
    cta: 'Transfer anfragen',
  },
  inclusions: {
    eyebrow: 'Klar informiert reisen',
    title: 'Was zur Reise gehört',
    titleEm: 'und was wir für Sie organisieren.',
    body: 'Eine einfache Übersicht über inklusive Leistungen des Reiseverlaufs und optionale persönliche Services.',
    included: {
      label: 'Inklusive Leistungen des Reiseverlaufs',
      title: ['Bereits Teil', 'der Reise.'],
      items: [
        'Ihre eigene klimatisierte Kabine und die im Reiseverlauf genannten Mahlzeiten',
        'Geplante Besichtigungen und Eintrittsgelder',
        'Kajak, Bambusboot und Aktivitäten an Bord laut Reiseverlauf (Kajakfahren in der Lan-Ha-Bucht ist aufgrund örtlicher Vorschriften vorübergehend ausgesetzt)',
        'Trinkwasser und Betreuung der Gäste an Bord',
        'Rezeption rund um die Uhr, tägliche Zimmerreinigung und Abendservice',
      ],
      foot: 'Die inklusiven Leistungen können je nach Reiseverlauf variieren; bitte lassen Sie sie sich bei der Buchung bestätigen.',
    },
    optional: {
      label: 'Persönliche Extras',
      title: ['Sorgfältig organisiert,', 'auf Anfrage.'],
      items: [
        'Transfers Hanoi–Halong und private Beförderung',
        'Ausgewählte Spa-Behandlungen und Massagepakete',
        'Fotografie, Drohnenaufnahmen, Dekoration für Feiern und private Dinner',
        'Weitere Getränke und persönliche Einkäufe',
      ],
      foot: 'Optionale Leistungen, Preise, Genehmigungen und Verfügbarkeit sollten vor der Buchung bestätigt werden.',
    },
  },
  celebrations: {
    eyebrow: 'Hochzeiten & Feiern',
    eventsEyebrow: 'Private Events',
    eventsTitle: 'Zusammenkünfte',
    eventsTitleEm: 'vor der Kulisse der Bucht.',
    spaces: 'Räume für den Anlass',
    viewSpace: 'Raum ansehen',
    proposal: 'Angebot anfragen',
    area: (m2: number) => `${m2} m²`,
  },
  process: {
    eyebrow: 'Ganz nach Ihren Wünschen',
    title: 'Eine persönliche Note',
    titleEm: 'beginnt mit einem Gespräch.',
    body: 'Wählen Sie zuerst die Reise. Nennen Sie uns die Details, die Ihnen wichtig sind. Das Reservierungsteam bestätigt, was sich organisieren lässt.',
    steps: [
      { tag: 'Entdecken', title: 'Reise wählen', body: 'Beginnen Sie mit Ihrer bevorzugten Bucht, dem Reiseverlauf und der Kabine – ob eine Nacht oder eine längere Reise.' },
      { tag: 'Gestalten', title: 'Wünsche mitteilen', body: 'Fragen Sie nach Transfers, Wellness-Behandlungen, Fotografie oder einem besonderen Empfang.' },
      { tag: 'Bestätigen', title: 'Entspannt reisen', body: 'Klären Sie Verfügbarkeit und mögliche Zusatzkosten vor der Reise mit dem Reservierungsteam.' },
    ],
  },
  faq: {
    eyebrow: 'Gut zu wissen',
    title: 'Die Details,',
    titleEm: 'beantwortet.',
    body: 'Haben Sie etwas Bestimmtes vor? Unser Team klärt gern die Möglichkeiten für Ihren Reiseverlauf.',
    link: 'Weitere häufige Fragen',
    items: [
      {
        question: 'Sind Transfers ab Hanoi im Reisepreis enthalten?',
        answerHtml:
          '<p>Transfers gehören nicht zum regulären Reisepreis. Ein privater Transfer kann gegen Aufpreis organisiert werden.</p>',
      },
      {
        question: 'Sind Spa- und Massagebehandlungen inklusive?',
        answerHtml:
          '<p>Spa-Behandlungen sind optional und können zusätzlich kosten. Fragen Sie das Reservierungsteam, welche Behandlungen auf Ihrer Reise angeboten werden.</p>',
      },
      {
        question: 'Kann ich Fotografie oder Drohnenaufnahmen buchen?',
        answerHtml:
          '<p>Fotografie und Drohnenaufnahmen sind optionale Leistungen. Bitte klären Sie Verfügbarkeit, Zeitpunkt, örtliche Genehmigungen und Kosten vorab mit unserem Team.</p>',
      },
      {
        question: 'Können Sie helfen, einen Anlass besonders zu gestalten?',
        answerHtml:
          '<p>Ja. Nennen Sie dem Reservierungsteam den Anlass und Ihre Vorstellungen; es prüft, was sich an Bord organisieren lässt.</p>',
      },
    ],
  },
  cta: {
    eyebrow: 'Eine Reise nach Ihren Wünschen',
    title: 'Das Besondere,',
    titleEm: 'ganz mühelos.',
    body: 'Erzählen Sie unserem Team, wie Sie sich Ihre Zeit in der Bucht vorstellen. Wir zeigen Ihnen die verfügbaren Services und die passende Reise dazu.',
    primary: 'Mit unserem Team planen',
    secondary: 'Reiseverläufe ansehen',
  },
};

const ko: ServicesMessages = {
  metaTitle: '하롱베이 크루즈 부가 서비스 · 프라이빗 행사',
  metaDescription:
    '하롱베이와 란하베이를 운항하는 Green Ruby 크루즈의 픽업·샌딩, 스파 트리트먼트, 사진 촬영, 기념일 준비, 프라이빗 전세 서비스를 소개합니다.',
  breadcrumb: '서비스',
  hero: {
    eyebrow: 'Green Ruby 컨시어지 서비스',
    title: '모든 디테일을',
    titleEm: '세심하게.',
    body: '편안한 도착부터 축하하고 싶은 순간까지, 여행을 온전히 나만의 것으로 만들어 줄 부가 서비스를 만나 보세요.',
    primary: '서비스 둘러보기',
    secondary: '팀에 문의하기',
    visualLabel: '1:1 맞춤 서비스',
    visualCaption: '당신의 순간을 위해.',
  },
  collection: {
    heading: '서비스 안내',
    filterLabel: '서비스 필터',
    all: '전체 서비스',
    results: (n: number) => `서비스 ${pad(n)}개`,
    included: '포함',
    optional: '선택 서비스',
    price: (price: string) => `${price}부터`,
    enquire: '이 서비스 문의하기',
    enquireSubject: (name: string) => `Green Ruby 서비스 문의: ${name}`,
    note: '이용 가능 여부, 요금, 적용 조건은 Green Ruby 예약팀이 확인해 드립니다. 선택 서비스는 기본 크루즈 요금에 포함되지 않습니다.',
    empty: '여행에 이용할 수 있는 서비스는 저희 팀이 자세히 안내해 드립니다.',
  },
  story: {
    eyebrow: '출항 전에',
    title: '여유로운 출발이',
    titleEm: '여행의 시작입니다.',
    paragraphs: [
      '하노이에서 선착장까지 가는 길도 여행의 일부여야 합니다. 신경 쓸 일이 하나 더 늘어서는 안 됩니다. Green Ruby는 호텔과 크루즈 터미널 사이의 전용 차량 이동을 준비해 드릴 수 있습니다.',
      '호텔, 여행 날짜, 인원을 알려 주시면 가장 알맞은 방법을 함께 상의하겠습니다.',
    ],
    points: ['하노이에서 뚜언쩌우 출항 지역까지', '요청 시 전용 차량 이동', '차량 요금은 별도 안내'],
    stamp: ['여행은', '승선 전부터', '시작됩니다'],
    cta: '픽업 서비스 문의하기',
  },
  inclusions: {
    eyebrow: '명확한 안내',
    title: '여행에 포함된 것,',
    titleEm: '그리고 따로 준비해 드리는 것.',
    body: '일정에 기본으로 포함된 사항과 선택형 맞춤 서비스의 차이를 한눈에 정리했습니다.',
    included: {
      label: '일정 기본 포함 사항',
      title: ['이미 여행에', '포함되어 있습니다.'],
      items: [
        '에어컨이 갖춰진 전용 객실과 일정에 명시된 식사',
        '예정된 관광 일정과 입장료',
        '일정에 안내된 카약, 대나무 보트, 선상 액티비티(란하베이 카약은 현지 규정에 따라 일시 중단)',
        '식수와 선상 고객 지원',
        '24시간 리셉션, 매일 객실 청소, 턴다운 서비스',
      ],
      foot: '포함 사항은 선택한 일정에 따라 다를 수 있으니 예약 시 최종 포함 사항을 확인해 주세요.',
    },
    optional: {
      label: '맞춤 추가 서비스',
      title: ['요청하시면', '세심하게 준비합니다.'],
      items: [
        '하노이–하롱 이동 및 전용 차량',
        '엄선한 스파 트리트먼트와 마사지 패키지',
        '사진 촬영, 드론 촬영, 기념일 장식, 프라이빗 다이닝',
        '그 밖의 음료와 개인 구매 품목',
      ],
      foot: '선택 서비스의 내용, 요금, 허가 여부, 이용 가능 여부는 예약 전에 확인해 주세요.',
    },
  },
  celebrations: {
    eyebrow: '웨딩 · 기념일',
    eventsEyebrow: '프라이빗 행사',
    eventsTitle: '바다를 배경으로 한',
    eventsTitleEm: '특별한 모임.',
    spaces: '행사 공간',
    viewSpace: '공간 보기',
    proposal: '제안서 요청하기',
    area: (m2: number) => `${m2}m²`,
  },
  process: {
    eyebrow: '나만의 여행으로',
    title: '맞춤 준비는',
    titleEm: '한 번의 상담으로 시작됩니다.',
    body: '먼저 일정을 고르세요. 중요하게 여기는 점을 알려 주세요. 준비할 수 있는 사항은 예약팀이 확인해 드립니다.',
    steps: [
      { tag: '찾기', title: '일정 고르기', body: '1박의 짧은 휴식이든 더 긴 여정이든, 원하는 목적지와 일정, 객실부터 정하세요.' },
      { tag: '맞춤', title: '원하는 사항 알려 주기', body: '이동 수단, 웰니스 트리트먼트, 사진 촬영, 특별한 환영 준비 등을 문의하세요.' },
      { tag: '확인', title: '편안하게 떠나기', body: '여행 전에 예약팀과 이용 가능 여부와 추가 비용을 확인하세요.' },
    ],
  },
  faq: {
    eyebrow: '알아 두면 좋은 정보',
    title: '세세한 궁금증에',
    titleEm: '답합니다.',
    body: '특별히 계획하는 일이 있으신가요? 일정에 맞는 선택지를 저희 팀이 안내해 드립니다.',
    link: '자주 묻는 질문 더 보기',
    items: [
      {
        question: '하노이 픽업·샌딩은 크루즈 요금에 포함되나요?',
        answerHtml:
          '<p>이동 서비스는 기본 요금에 포함되지 않습니다. 전용 차량 이동은 추가 요금으로 준비해 드릴 수 있습니다.</p>',
      },
      {
        question: '스파와 마사지는 포함되나요?',
        answerHtml:
          '<p>스파 트리트먼트는 선택 서비스이며 추가 요금이 있을 수 있습니다. 여행 중 이용할 수 있는 트리트먼트는 예약팀에 문의해 주세요.</p>',
      },
      {
        question: '사진 촬영이나 드론 촬영을 요청할 수 있나요?',
        answerHtml:
          '<p>사진 촬영과 드론 촬영은 선택 서비스입니다. 이용 가능 여부, 시간, 현지 허가, 요금을 미리 저희 팀과 확인해 주세요.</p>',
      },
      {
        question: '기념일을 특별하게 준비할 수 있나요?',
        answerHtml:
          '<p>네. 어떤 기념일인지, 생각하시는 내용을 예약팀에 알려 주시면 선상에서 준비할 수 있는 사항을 확인해 드립니다.</p>',
      },
    ],
  },
  cta: {
    eyebrow: '나를 위한 여행',
    title: '특별한 여행을',
    titleEm: '편안하게.',
    body: '바다 위에서 보내고 싶은 시간을 저희 팀에 들려주세요. 이용할 수 있는 서비스와 그에 맞는 일정을 함께 찾아 드리겠습니다.',
    primary: '팀과 함께 계획하기',
    secondary: '일정 보기',
  },
};

export const servicesMessages = byLocale<ServicesMessages>({ en, vi, ja, fr, es, de, ko });
