import type { Locale } from '@/lib/i18n';

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
      'The road from Hanoi to the bay should feel like part of the experience, not another detail to manage. Green Ruby can assist with transfer arrangements, whether you prefer a shared limousine or a private journey.',
      'Share your hotel, travel date and group size with our team to discuss the most suitable option.',
    ],
    points: ['Hanoi to the Tuan Chau departure area', 'Shared or private transfer options on request', 'Transfer charges confirmed separately'],
    stamp: ['The journey', 'begins', 'before boarding'],
    cta: 'Arrange your arrival',
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
      ],
      foot: 'Included items can vary with the selected itinerary; please confirm the final inclusions when booking.',
    },
    optional: {
      label: 'Personalised additions',
      title: ['Beautifully arranged,', 'upon request.'],
      items: [
        'Hanoi–Ha Long transfers and private transportation',
        'Selected spa treatments and massage packages',
        'Photography, drone filming and welcome arrangements',
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
    guests: (n: number) => `Up to ${n} guests`,
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
          '<p>Transfers are not part of the standard fare. A shared limousine or private transportation can be arranged at an additional charge.</p>',
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
    title: 'Let the extraordinary feel',
    titleEm: 'effortless.',
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
      'Quãng đường từ Hà Nội ra vịnh nên là một phần của trải nghiệm, chứ không phải thêm một việc phải lo. Green Ruby có thể hỗ trợ sắp xếp xe đưa đón, dù bạn muốn đi limousine ghép hay xe riêng.',
      'Hãy cho chúng tôi biết khách sạn, ngày đi và số người trong đoàn để được tư vấn phương án phù hợp nhất.',
    ],
    points: ['Từ Hà Nội đến khu vực đón khách tại Tuần Châu', 'Xe ghép hoặc xe riêng theo yêu cầu', 'Phí đưa đón được báo riêng'],
    stamp: ['Hành trình', 'bắt đầu', 'trước khi lên tàu'],
    cta: 'Sắp xếp đưa đón',
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
      ],
      foot: 'Các mục bao gồm có thể khác nhau tùy lịch trình; vui lòng xác nhận lại khi đặt chỗ.',
    },
    optional: {
      label: 'Dịch vụ cá nhân hóa',
      title: ['Chu đáo sắp xếp,', 'theo yêu cầu.'],
      items: [
        'Xe đưa đón Hà Nội – Hạ Long và xe riêng',
        'Một số liệu trình spa và gói massage',
        'Chụp ảnh, quay phim bằng drone và chuẩn bị đón tiếp đặc biệt',
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
    guests: (n: number) => `Tối đa ${n} khách`,
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
        answerHtml: '<p>Xe đưa đón không nằm trong giá tiêu chuẩn. Chúng tôi có thể sắp xếp limousine ghép hoặc xe riêng với chi phí bổ sung.</p>',
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
    title: 'Để điều phi thường trở nên',
    titleEm: 'thật nhẹ nhàng.',
    body: 'Hãy kể cho chúng tôi về chuyến đi bạn hình dung. Chúng tôi sẽ giúp bạn chọn dịch vụ và hành trình phù hợp.',
    primary: 'Lên kế hoạch cùng chúng tôi',
    secondary: 'Xem hành trình',
  },
};

export const servicesMessages: Record<Locale, ServicesMessages> = { en, vi };
