import type { Locale } from '@/lib/i18n';

// Editorial copy for the About page that the CMS has no fields for (design: green-ruby-about-us-v1).
// Sustainability and community wording is phrased as intentions, not results: the CMS card texts still
// carry unverified figures (see cms-develop HonestClaimsSeeder), so `honest` replaces them by topic.

const en = {
  metaTitle: 'About Green Ruby Cruises',
  metaDescription:
    'The Green Ruby story: considered luxury, eco-conscious vessel design and a closer connection with Ha Long Bay, Lan Ha Bay and their communities.',
  breadcrumb: 'About Us',
  hero: {
    eyebrow: 'The story behind Green Ruby Cruises',
    title: 'Luxury with a',
    titleEm: 'lighter footprint.',
    body: "We believe the most exceptional way to experience Vietnam's bays is one that respects their beauty — and helps care for the world around them.",
    primary: 'Discover our story',
    secondary: 'Our commitments',
  },
  values: {
    label: 'What shapes the Green Ruby philosophy',
    items: [
      { icon: 'compass', tag: 'Philosophy', title: 'Conscious luxury', body: 'Fewer distractions. More meaningful moments on the water.' },
      { icon: 'leaf', tag: 'Environment', title: 'Respect the bay', body: 'Technology and daily choices designed to lower our footprint.' },
      { icon: 'people', tag: 'Community', title: 'Rooted in place', body: 'Closer connections with the people and traditions of the region.' },
    ],
  },
  subnav: {
    label: 'About page sections',
    story: 'Our story',
    approach: 'Our approach',
    community: 'Local community',
    collection: 'The collection',
    progress: 'Our progress',
  },
  story: {
    eyebrow: 'Our story',
    title: 'The bay deserves',
    titleEm: 'something better.',
    lead: 'Some places ask us to slow down, look closer, and travel differently.',
    link: 'Meet our vessels',
    stamp: ['A more', 'considered', 'way to sail'],
  },
  statement: {
    index: 'The Green Ruby point of view',
    line1: "True luxury isn't having more.",
    line2: "It's discovering",
    em: 'what matters.',
    footer: 'Room to breathe. Space to connect. A bay worth protecting.',
  },
  technology: {
    eyebrow: 'Designed with intention',
    title: 'A new standard of',
    titleEm: 'thoughtful travel.',
    body: 'Caring for the bay starts behind the scenes. Our vessels combine efficient systems with practical changes to how we operate every day.',
    micro: 'Technology & design',
    foot: 'Design commitment',
    qualifier:
      'Design features and environmental aims describe how our vessels are intended to operate; they are not independently verified operating results.',
  },
  impact: {
    eyebrow: 'Our impact',
    wastewater: 'Wastewater treated',
    co2: 'Tonnes of CO₂ avoided a year (solar, estimate)',
    solar: 'Rooftop solar array',
  },
  community: {
    eyebrow: 'Beyond the vessel',
    title: 'Our home.',
    titleEm: 'Our responsibility.',
    body: 'Protecting a destination also means investing in the people who call it home.',
    link: 'Talk to our team',
  },
  collection: {
    eyebrow: 'Our collection',
    title: (n: number): string => (n === 2 ? 'Two vessels.' : 'Our fleet.'),
    titleEm: 'One philosophy.',
    body: 'Different waters, the same sense of care. Discover the expressions of the Green Ruby experience and where each will take you.',
    vessel: (i: number, bay: string | null) => `Vessel ${String(i).padStart(2, '0')}${bay ? ` / ${bay}` : ''}`,
    explore: (name: string) => `Explore ${name}`,
  },
  standards: {
    eyebrow: 'Open about our progress',
    title: 'Trust is built on',
    titleEm: 'transparency.',
    body: "We would rather share the process than imply a certificate has already been granted. Here's where things stand today.",
    label: 'Sustainability credentials',
    // The eco article exists in English only; Vietnamese readers get the brand facts link.
    guide: 'What makes a cruise genuinely eco-friendly' as string | null,
    facts: 'Status of every sustainability figure',
  },
  cta: {
    eyebrow: 'A different way to see the bay',
    title: 'Travel beautifully.',
    titleEm: 'Leave thoughtfully.',
    body: 'Find a Green Ruby journey where spectacular landscapes, generous comfort and a deeper sense of connection come together.',
    primary: 'Explore our itineraries',
    secondary: 'Talk to our team',
  },
  honest: {
    solar: 'A ~70 kW rooftop solar array helps power lighting, water heating and onboard systems by day. With seawater-cooled air conditioning, it is designed to cut onboard energy use by around 40%; measured savings will be reported once we are sailing.',
    water: '100% of wastewater goes through biological treatment on board before it is discharged, to protect the delicate marine habitats of the bay.',
    plastic: 'Refillable bottles, bulk guest amenities and reduced-plastic supplier packaging are part of our plan for everyday operations on board.',
    energy: 'A heat recovery system reuses waste heat from the engines and generators for water heating and climate control, rather than letting it go to waste.',
    local: 'We aim to source provisions from local fishermen and farmers wherever we can, and to give priority to local talent when recruiting and training our crew.',
    cleanup: "We plan shoreline cleanups that guests can join, alongside onboard talks about the bay's ecosystem and how travellers can lighten their impact.",
    culture: 'We hope to support environmental learning in local schools, pathways into maritime careers for young people, and collaborations that keep the crafts and traditions of the bay alive.',
  },
};

export type AboutMessages = typeof en;

const vi: AboutMessages = {
  metaTitle: 'Giới thiệu du thuyền Green Ruby',
  metaDescription:
    'Câu chuyện Green Ruby: sự sang trọng tinh tế, thiết kế tàu thân thiện môi trường và sự gắn bó với Vịnh Hạ Long, Vịnh Lan Hạ cùng cộng đồng địa phương.',
  breadcrumb: 'Giới thiệu',
  hero: {
    eyebrow: 'Câu chuyện phía sau Green Ruby Cruises',
    title: 'Sang trọng mà',
    titleEm: 'nhẹ nhàng với thiên nhiên.',
    body: 'Chúng tôi tin rằng cách tuyệt vời nhất để khám phá các vịnh của Việt Nam là trân trọng vẻ đẹp ấy — và góp phần gìn giữ thế giới quanh mình.',
    primary: 'Khám phá câu chuyện',
    secondary: 'Cam kết của chúng tôi',
  },
  values: {
    label: 'Những giá trị định hình Green Ruby',
    items: [
      { icon: 'compass', tag: 'Triết lý', title: 'Sang trọng có ý thức', body: 'Bớt xao nhãng. Thêm những khoảnh khắc ý nghĩa trên mặt nước.' },
      { icon: 'leaf', tag: 'Môi trường', title: 'Tôn trọng vịnh', body: 'Công nghệ và lựa chọn hằng ngày hướng tới giảm tác động.' },
      { icon: 'people', tag: 'Cộng đồng', title: 'Gắn bó với nơi chốn', body: 'Kết nối gần hơn với con người và truyền thống của vùng vịnh.' },
    ],
  },
  subnav: {
    label: 'Các phần của trang giới thiệu',
    story: 'Câu chuyện',
    approach: 'Cách chúng tôi làm',
    community: 'Cộng đồng',
    collection: 'Đội tàu',
    progress: 'Tiến trình',
  },
  story: {
    eyebrow: 'Câu chuyện',
    title: 'Vịnh xứng đáng với',
    titleEm: 'điều tốt đẹp hơn.',
    lead: 'Có những nơi khiến ta muốn chậm lại, nhìn kỹ hơn và du lịch theo một cách khác.',
    link: 'Gặp gỡ đội tàu',
    stamp: ['Một cách', 'du ngoạn', 'chậm rãi hơn'],
  },
  statement: {
    index: 'Góc nhìn Green Ruby',
    line1: 'Sang trọng thật sự không phải là có nhiều hơn.',
    line2: 'Mà là tìm ra',
    em: 'điều thực sự quan trọng.',
    footer: 'Khoảng thở. Không gian để kết nối. Một vịnh đáng được bảo vệ.',
  },
  technology: {
    eyebrow: 'Thiết kế có chủ đích',
    title: 'Chuẩn mực mới cho',
    titleEm: 'những chuyến đi tử tế.',
    body: 'Chăm sóc vịnh bắt đầu từ những điều phía sau. Tàu của chúng tôi kết hợp các hệ thống hiệu quả với những thay đổi thiết thực trong vận hành hằng ngày.',
    micro: 'Công nghệ & thiết kế',
    foot: 'Cam kết thiết kế',
    qualifier:
      'Các tính năng thiết kế và mục tiêu môi trường mô tả cách tàu được dự kiến vận hành; đây không phải là kết quả vận hành đã được kiểm chứng độc lập.',
  },
  impact: {
    eyebrow: 'Tác động',
    wastewater: 'Nước thải được xử lý',
    co2: 'Tấn CO₂ giảm mỗi năm (pin mặt trời, ước tính)',
    solar: 'Dàn pin mặt trời trên mái',
  },
  community: {
    eyebrow: 'Vượt ra ngoài con tàu',
    title: 'Ngôi nhà chung.',
    titleEm: 'Trách nhiệm chung.',
    body: 'Bảo vệ một điểm đến cũng là đầu tư cho những người gọi nơi đó là nhà.',
    link: 'Trao đổi với chúng tôi',
  },
  collection: {
    eyebrow: 'Đội tàu',
    title: (n: number) => (n === 2 ? 'Hai con tàu.' : 'Đội tàu của chúng tôi.'),
    titleEm: 'Một triết lý.',
    body: 'Những vùng nước khác nhau, cùng một sự chăm chút. Khám phá từng phiên bản của trải nghiệm Green Ruby và nơi mỗi con tàu sẽ đưa bạn đến.',
    vessel: (i: number, bay: string | null) => `Tàu ${String(i).padStart(2, '0')}${bay ? ` / ${bay}` : ''}`,
    explore: (name: string) => `Khám phá ${name}`,
  },
  standards: {
    eyebrow: 'Minh bạch về tiến trình',
    title: 'Niềm tin đến từ',
    titleEm: 'sự minh bạch.',
    body: 'Chúng tôi muốn chia sẻ quá trình thay vì ngụ ý rằng một chứng nhận đã được cấp. Đây là hiện trạng của chúng tôi.',
    label: 'Chứng nhận bền vững',
    guide: null,
    facts: 'Trạng thái của từng số liệu môi trường',
  },
  cta: {
    eyebrow: 'Một cách khác để ngắm vịnh',
    title: 'Du ngoạn trọn vẹn.',
    titleEm: 'Rời đi nhẹ nhàng.',
    body: 'Tìm một hành trình Green Ruby nơi cảnh quan ngoạn mục, tiện nghi rộng rãi và sự kết nối sâu sắc hội tụ.',
    primary: 'Xem hành trình',
    secondary: 'Trao đổi với chúng tôi',
  },
  honest: {
    solar: 'Dàn pin mặt trời ~70 kW trên mái hỗ trợ cấp điện cho chiếu sáng, đun nước nóng và các hệ thống trên tàu vào ban ngày. Cùng với điều hoà làm mát bằng nước biển, mức giảm điện năng ước tính khoảng 40%; số đo thực tế sẽ được công bố khi tàu vận hành.',
    water: '100% nước thải được xử lý qua hệ thống sinh học trên tàu trước khi xả ra ngoài, để bảo vệ hệ sinh thái biển nhạy cảm của vịnh.',
    plastic: 'Bình nước dùng nhiều lần, đồ dùng phòng tắm dạng chai lớn và bao bì ít nhựa từ nhà cung cấp là một phần trong kế hoạch vận hành hằng ngày trên tàu.',
    energy: 'Hệ thống thu hồi nhiệt tận dụng nhiệt thải từ động cơ và máy phát để đun nước nóng và điều hoà, thay vì để lãng phí.',
    local: 'Chúng tôi hướng tới việc mua thực phẩm từ ngư dân và nông dân địa phương khi có thể, đồng thời ưu tiên tuyển dụng và đào tạo nhân sự tại chỗ.',
    cleanup: 'Chúng tôi dự kiến tổ chức các buổi làm sạch bờ biển để du khách cùng tham gia, cùng những buổi trò chuyện trên tàu về hệ sinh thái của vịnh và cách giảm tác động khi du lịch.',
    culture: 'Chúng tôi mong muốn hỗ trợ giáo dục môi trường tại các trường học địa phương, mở lối vào nghề đi biển cho người trẻ và những hợp tác giúp gìn giữ nghề thủ công cùng truyền thống của vùng vịnh.',
  },
};

export const aboutMessages: Record<Locale, AboutMessages> = { en, vi };

type HonestTopic = keyof AboutMessages['honest'];

// Order matters: "solar power" must match solar before the generic energy rule.
const TOPICS: [HonestTopic, RegExp][] = [
  ['solar', /solar|mặt trời/i],
  ['water', /wastewater|water|nước thải/i],
  ['plastic', /plastic|nhựa/i],
  ['energy', /energy|recycl|năng lượng|tái chế/i],
  ['local', /communit|cộng đồng/i],
  ['cleanup', /clean|education|làm sạch|giáo dục/i],
  ['culture', /cultur|heritage|văn hóa/i],
];

/**
 * Card text for a CMS sustainability/community item. Known topics get the intention-phrased copy above;
 * other items keep their CMS description only if it states no figures (numbers can't be verified here).
 */
export function honestDescription(locale: Locale, title: string | null, cmsDescription: string | null): string | null {
  const topic = title ? TOPICS.find(([, re]) => re.test(title))?.[0] : undefined;
  if (topic) return aboutMessages[locale].honest[topic];
  return cmsDescription && !/\d/.test(cmsDescription) ? cmsDescription : null;
}
