import type { Locale } from '@/lib/i18n';

// Copy for /about-us/brand-facts (design: new_website/green-ruby-brand-facts-v1.html). One public reference
// for the brand, company, fleet and status, written for guests, travel partners, press and AI assistants.
// Facts confirmed by the owner on 20 October 2026; vessel and cabin figures come from the CMS.

/** Last review per language (the Vietnamese copy was rewritten on 24 October 2026). */
export const REVIEWED: Record<Locale, { iso: string; label: string }> = {
  en: { iso: '2026-10-20', label: '20 October 2026' },
  vi: { iso: '2026-10-24', label: '24/10/2026' },
};
export const LEGAL_NAME = 'TPX JOINT STOCK COMPANY';
export const TAX_ID = '5702096485';

type Evidence = 'confirmed' | 'design' | 'estimate' | 'progress' | 'pending';
/** Label, value, evidence status and an optional badge text that overrides the generic status label. */
type FactRow = [string, string, Evidence] | [string, string, Evidence, string];
/** Optional sub-section: an h3 and its paragraphs. */
type Block = { title: string; paras: string[] };

const en = {
  metaTitle: 'Green Ruby Cruises: Company & Fleet Facts',
  metaDescription:
    'Official facts about Green Ruby Cruises: operating company TPX Joint Stock Company, two 46-cabin sister ships on Ha Long Bay and Lan Ha Bay, routes, check-in, status and sustainability.',
  breadcrumbAbout: 'About us',
  breadcrumb: 'Brand facts',
  eyebrow: 'Official company information',
  title: 'Green Ruby Cruises:',
  titleEm: 'company & fleet facts.',
  lead: 'One public reference for the Green Ruby brand, the company behind it, its two ships, routes, guest check-in, operating status and sustainability disclosures.',
  reviewed: 'Last reviewed',
  indexTitle: 'On this page',
  printLabel: 'Print / save PDF',
  copyLink: 'Copy link',
  copied: 'Copied',
  evidence: {
    confirmed: 'Confirmed',
    design: 'Design specification',
    estimate: 'Design estimate',
    progress: 'In progress',
    pending: 'To be confirmed',
  } satisfies Record<Evidence, string>,
  stats: [
    ['Operating company', LEGAL_NAME],
    ['Fleet', '2 sister ships'],
    ['Bays', 'Ha Long & Lan Ha'],
    ['Expected service start', 'February 2027 (provisional)'],
  ],
  sections: {
    identity: {
      label: 'Company profile',
      title: 'Brand and company',
      lede: 'Green Ruby Cruises is the brand; TPX Joint Stock Company is the Vietnamese company that operates it.',
      rows: [
        ['Brand name', 'Green Ruby Cruises', 'confirmed'],
        ['Operating company', LEGAL_NAME, 'confirmed'],
        ['Enterprise registration and tax code', `${TAX_ID} (Vietnam)`, 'confirmed'],
        ['Business', 'Overnight luxury cruises on Ha Long Bay and Lan Ha Bay', 'confirmed'],
        ['Country', 'Vietnam (Quang Ninh and Hai Phong)', 'confirmed'],
        ['Official website', 'greenrubycruises.com', 'confirmed'],
      ] as FactRow[],
      body: [] as string[],
      note: '',
    },
    fleet: {
      label: 'Fleet',
      title: 'Green Ruby 1 vs Green Ruby 2',
      lede: 'The two ships are sister ships built to the same design, with the same four cabin categories and onboard spaces. The difference is the bay each one sails.',
      body: [] as string[],
      /** Short description in each ship card (empty = none). */
      ships: { 'ha-long': [] as string[], 'lan-ha': [] as string[] },
      /** Status line in the ship cards (empty = the table's `status`). */
      cardStatus: '',
      thSpec: 'Specification',
      rows: {
        bay: 'Sails',
        length: 'Length',
        cabins: 'Cabins',
        guests: 'Guest capacity',
        decks: 'Decks',
        built: 'Year built',
        categories: 'Cabin categories',
        boarding: 'Boarding',
        status: 'Service start',
      },
      bays: { 'ha-long': 'Ha Long Bay', 'lan-ha': 'Lan Ha Bay' },
      boarding: { 'ha-long': 'Tender from Tuan Chau to the ship on Ha Long Bay', 'lan-ha': 'Tender from Tuan Chau to Gia Luan Pier (Hai Phong), then on board on Lan Ha Bay' },
      categories: 'Imperial Suite, Royal Romance Suite, Ocean Breeze Premium, Serenity Deluxe',
      status: 'Expected February 2027 (provisional)',
      vesselPage: 'Ship page',
      note: 'Images on the website may be design renderings until the ships are in service.',
      choose: 'Choosing between them is choosing the bay: Ha Long Bay for the famous caves and viewpoints, Lan Ha Bay for quieter water, kayaking and fewer boats.',
      chooseLink: 'Compare the itineraries',
    },
    itineraries: {
      label: 'Routes',
      title: 'Itineraries',
      lede: 'Four overnight itineraries, two on each bay. Stops can change for weather and port-authority instructions.',
      th: ['Bay', 'Duration', 'Ship', 'Itinerary'],
      nights: (d: number): string => (d >= 3 ? '3 days / 2 nights' : '2 days / 1 night'),
      body: [] as string[],
      /** One line under each itinerary, by CMS itinerary id. */
      descriptions: {} as Record<number, string>,
      note: '',
    },
    cabins: {
      label: 'Accommodation',
      title: 'Cabin categories',
      lede: 'The same four categories on both ships. The number of cabins in each category per ship has not been published yet.',
      th: ['Category', 'Area', 'Guests', 'View'],
      body: [] as string[],
      notes: [] as string[],
    },
    departure: {
      label: 'Guest arrival',
      title: 'Check-in and boarding',
      lede: 'Guests of both ships check in at the Green Ruby lounge at Tuan Chau, Ha Long. The legal address of the company is separate from the check-in point.',
      place: 'Tuan Chau International Passenger Port',
      address: 'No. 27, Terminal Building 2, Tuan Chau International Passenger Port, Tuan Chau, Ha Long, Quang Ninh, Vietnam',
      addressNote: 'Exact terminal and reporting time are confirmed in each booking confirmation.',
      points: [
        'Check-in from about 10:45; tender boarding at about 11:45 (per the published itineraries).',
        'Green Ruby 1: tender from Tuan Chau to the ship on Ha Long Bay.',
        'Green Ruby 2: tender from Tuan Chau to Gia Luan Pier (Hai Phong) to board on Lan Ha Bay.',
        'Transfers from Hanoi (about 2.5 hours, pick-up around 08:00) are available on request.',
      ],
      contact: 'Confirm your check-in point',
      map: 'Open in Google Maps',
      blocks: [] as Block[],
      note: '',
    },
    status: {
      label: 'Operating status',
      title: 'Service and booking status',
      lede: 'Published itineraries do not by themselves mean that departures are operating.',
      cards: [
        ['Green Ruby 1 · Ha Long Bay', 'Not yet in service', 'Expected to enter service in February 2027. This is a provisional date, not an official one.'],
        ['Green Ruby 2 · Lan Ha Bay', 'Not yet in service', 'Expected to enter service in February 2027. This is a provisional date, not an official one.'],
      ],
      rows: [
        ['Prices', 'Not yet published; quoted on request', 'pending'],
        ['Booking requests', 'Accepted through the website and reservations team; a request or quote does not confirm a departure', 'confirmed'],
        ['Cancellation policy', 'Full refund 30+ days before departure; 50% charge 15–29 days; 75% charge 7–14 days; no refund under 7 days or no-show', 'confirmed'],
      ] as FactRow[],
      body: [] as string[],
      cardsTitle: '',
      blocks: [] as Block[],
      cta: 'Booking enquiries',
    },
    sustainability: {
      label: 'Disclosures',
      title: 'Sustainability and certification',
      lede: 'Each statement carries its status. Design figures will be replaced by measured data once the ships are operating.',
      rows: [
        ['Green Globe', 'Certification in progress. Green Ruby is not certified yet', 'progress'],
        ['Rooftop solar array', 'About 70 kW on each ship', 'design'],
        ['Air conditioning', 'Cooled with seawater', 'design'],
        ['Energy use', 'Around 40% less onboard energy from solar and seawater cooling combined', 'estimate'],
        ['CO₂ from solar', 'About 60 tonnes avoided per ship per year', 'estimate'],
        ['Wastewater', '100% biologically treated on board before discharge', 'design'],
        ['Heat recovery', 'Waste heat from engines and generators reused for hot water and climate control', 'design'],
        ['Single-use plastics', 'Being removed from guest service', 'progress'],
        ['Hybrid propulsion', 'Not used on Green Ruby ships', 'confirmed'],
        ['Measured emissions', 'Not yet available', 'pending'],
      ] as FactRow[],
      body: [] as string[],
      dashboard: 'Eco dashboard: method and status of each figure',
    },
    contacts: {
      label: 'Contact',
      title: 'Official contacts and channels',
      lede: 'Only these channels speak for Green Ruby Cruises. Other listings are added here once their ownership is verified.',
      website: 'Website',
      email: 'Email',
      hotline: 'Hotline / Zalo',
      address: 'Office',
      social: 'Social media',
      contactPage: 'Contact page',
      /** Overrides the CMS address in the office row (empty = CMS value). */
      office: '',
      /** Paragraphs under the contact cards. */
      after: [] as string[],
    },
    media: {
      label: 'Press and partners',
      title: 'Brand description',
      lede: 'Approved wording for travel partners, listings and the press. Please keep the status of dates and certification as written.',
      boilerplateLabel: 'Approved description (about 90 words)',
      boilerplate:
        'Green Ruby Cruises is a Vietnamese luxury overnight cruise brand operated by TPX Joint Stock Company. Its two sister ships, Green Ruby 1 on Ha Long Bay and Green Ruby 2 on the quieter Lan Ha Bay, each have 46 cabins in four categories, from Serenity Deluxe to a 120 m² Imperial Suite. The ships are designed with a rooftop solar array, seawater-cooled air conditioning, heat recovery and on-board treatment of all wastewater. Green Globe certification is in progress. Both ships are expected to enter service in February 2027.',
      copy: 'Copy description',
      filesTitle: '',
      files: [
        ['Logo and photos', 'Available on request from the reservations team'],
        ['Fact sheet', 'Print this page or save it as PDF'],
        ['Corrections', 'Report an inaccurate detail by email'],
      ],
    },
  },
  footerTitle: 'Need to verify a detail about Green Ruby?',
  footerCta: 'Contact the team',
};

type Messages = typeof en;

const vi: Messages = {
  metaTitle: 'Thông Tin Doanh Nghiệp & Đội Tàu | Green Ruby Cruises',
  metaDescription:
    'Thông tin chính thức về Green Ruby Cruises: doanh nghiệp vận hành Công ty Cổ phần TPX, hai du thuyền 46 phòng trên vịnh Hạ Long và vịnh Lan Hạ, hành trình, điểm làm thủ tục, tình trạng vận hành và phát triển bền vững.',
  breadcrumbAbout: 'Giới thiệu',
  breadcrumb: 'Thông tin thương hiệu',
  eyebrow: 'Thông tin chính thức về doanh nghiệp và đội tàu',
  title: 'Thông tin thương hiệu',
  titleEm: 'Green Ruby Cruises',
  lead: 'Trang này tổng hợp thông tin chính thức về Green Ruby Cruises, đơn vị vận hành, hai du thuyền Green Ruby 1 và Green Ruby 2, các hành trình, địa điểm đón khách và tình trạng hoạt động. Những công bố về công nghệ môi trường và chứng nhận cũng được cập nhật tại đây để khách hàng, đối tác và báo chí thuận tiện tra cứu.',
  reviewed: 'Cập nhật lần cuối',
  indexTitle: 'Trong trang này',
  printLabel: 'In / lưu PDF',
  copyLink: 'Sao chép link',
  copied: 'Đã sao chép',
  evidence: {
    confirmed: 'Đã xác nhận',
    design: 'Thông số thiết kế',
    estimate: 'Ước tính thiết kế',
    progress: 'Đang triển khai',
    pending: 'Chờ xác nhận',
  },
  stats: [
    ['Doanh nghiệp vận hành', 'Công ty Cổ phần TPX'],
    ['Đội tàu', 'Green Ruby 1 và Green Ruby 2'],
    ['Khu vực hoạt động dự kiến', 'Vịnh Hạ Long và vịnh Lan Hạ'],
    ['Thời điểm vận hành dự kiến', 'Từ tháng 2/2027, chưa xác nhận chính thức'],
  ],
  sections: {
    identity: {
      label: 'Hồ sơ doanh nghiệp',
      title: 'Thương hiệu và doanh nghiệp',
      lede: 'Green Ruby Cruises là thương hiệu du thuyền nghỉ đêm cao cấp tại Việt Nam, do Công ty Cổ phần TPX (TPX JOINT STOCK COMPANY) quản lý và vận hành.',
      body: [
        'Thương hiệu phát triển hai dòng hành trình trên vịnh Hạ Long và vịnh Lan Hạ, kết hợp dịch vụ lưu trú trên du thuyền với các hoạt động tham quan, khám phá cảnh quan và văn hóa địa phương.',
        'Thông tin dưới đây được công bố để khách hàng, đại lý du lịch, đối tác và các đơn vị truyền thông có thể xác minh chính xác doanh nghiệp đứng sau thương hiệu Green Ruby Cruises.',
      ],
      rows: [
        ['Tên thương hiệu', 'Green Ruby Cruises', 'confirmed'],
        ['Doanh nghiệp vận hành', 'Công ty Cổ phần TPX', 'confirmed'],
        ['Tên tiếng Anh', LEGAL_NAME, 'confirmed'],
        ['Mã số doanh nghiệp / mã số thuế', TAX_ID, 'confirmed'],
        ['Lĩnh vực hoạt động', 'Dịch vụ du thuyền nghỉ đêm cao cấp', 'confirmed'],
        ['Khu vực khai thác dự kiến', 'Vịnh Hạ Long, Quảng Ninh và vịnh Lan Hạ, Hải Phòng', 'confirmed'],
        ['Quốc gia', 'Việt Nam', 'confirmed'],
        ['Website chính thức', 'greenrubycruises.com', 'confirmed'],
      ],
      note: 'Thông tin doanh nghiệp được công bố theo hồ sơ của đơn vị vận hành. Green Ruby Cruises là tên thương hiệu, không phải tên pháp nhân độc lập.',
    },
    fleet: {
      label: 'Đội tàu',
      title: 'Đội tàu Green Ruby Cruises',
      lede: 'Đội tàu Green Ruby Cruises gồm Green Ruby 1 và Green Ruby 2, được phát triển theo cùng một thiết kế, với bốn hạng phòng và hệ thống tiện ích tương đương.',
      body: ['Mỗi tàu phục vụ một khu vực riêng: Green Ruby 1 dành cho các hành trình trên vịnh Hạ Long, trong khi Green Ruby 2 được xây dựng cho các chuyến khám phá vịnh Lan Hạ.'],
      ships: {
        'ha-long': [
          'Green Ruby 1 dự kiến phục vụ các hành trình nghỉ đêm trên vịnh Hạ Long, kết hợp tham quan những địa điểm nổi tiếng như hang Sửng Sốt, đảo Ti Tốp, Hang Luồn và các điểm đến nằm sâu hơn trong vịnh.',
          'Theo cấu hình đang công bố, tàu có 46 phòng nghỉ thuộc bốn hạng phòng, chiều dài thiết kế 121 m và sức chứa dự kiến 136 người.',
        ],
        'lan-ha': [
          'Green Ruby 2 dự kiến phục vụ các hành trình nghỉ đêm trên vịnh Lan Hạ, với những điểm tham quan như Hang Sáng – Tối, làng Việt Hải và các khu vực được phép tiếp cận trong quần đảo Cát Bà.',
          'Tàu được phát triển theo cùng thiết kế với Green Ruby 1, có 46 phòng nghỉ thuộc bốn hạng phòng, chiều dài thiết kế 121 m và sức chứa dự kiến 136 người.',
        ],
      },
      cardStatus: 'Tình trạng: Đang chuẩn bị vận hành. Dự kiến bắt đầu từ tháng 2/2027, thời điểm chính thức chưa được xác nhận.',
      thSpec: 'Thông số',
      rows: {
        bay: 'Khu vực khai thác',
        length: 'Chiều dài thiết kế',
        cabins: 'Số phòng dự kiến',
        guests: 'Sức chứa công bố',
        decks: 'Số tầng',
        built: 'Năm đóng theo kế hoạch',
        categories: 'Số hạng phòng',
        boarding: '',
        status: 'Tình trạng',
      },
      bays: { 'ha-long': 'Vịnh Hạ Long', 'lan-ha': 'Vịnh Lan Hạ' },
      boarding: { 'ha-long': 'Xuồng đưa từ Tuần Châu ra tàu trên vịnh Hạ Long', 'lan-ha': 'Xuồng đưa từ Tuần Châu sang bến Gia Luận (Hải Phòng), lên tàu trên vịnh Lan Hạ' },
      categories: '4',
      status: 'Chưa vận hành',
      vesselPage: 'Xem thông tin tàu',
      note: 'Về hình ảnh: Trong giai đoạn chuẩn bị vận hành, một số hình ảnh tàu và không gian nội thất trên website có thể là ảnh phối cảnh thiết kế. Ảnh thực tế sẽ được cập nhật khi có đủ tư liệu.',
      choose: 'Các thông số nêu trên được công bố theo thiết kế và kế hoạch đội tàu. Thông số chính thức sẽ được cập nhật sau khi hoàn tất các thủ tục, kiểm tra và nghiệm thu liên quan.',
      chooseLink: '',
    },
    itineraries: {
      label: 'Tuyến',
      title: 'Các hành trình',
      lede: 'Green Ruby Cruises hiện giới thiệu bốn chương trình nghỉ đêm, gồm hai hành trình trên vịnh Hạ Long và hai hành trình trên vịnh Lan Hạ.',
      th: ['Vịnh', 'Thời lượng', 'Tàu', 'Hành trình'],
      nights: (d: number) => (d >= 3 ? '3 ngày 2 đêm' : '2 ngày 1 đêm'),
      body: ['Mỗi chương trình có lịch tham quan và thời gian lưu trú riêng, giúp du khách lựa chọn chuyến đi phù hợp với quỹ thời gian và sở thích.'],
      descriptions: {
        9: 'Hành trình nghỉ đêm ngắn ngày, kết hợp tham quan các điểm nổi bật trên vịnh Hạ Long.',
        8: 'Hành trình dài hơn, có thêm thời gian khám phá làng chài Cửa Vạn, Hang Tiên Ông và những khu vực khác trên vịnh.',
        5: 'Chương trình nghỉ đêm trên vịnh Lan Hạ, kết hợp ngắm cảnh và các hoạt động tham quan phù hợp với điều kiện tại điểm đến.',
        7: 'Hành trình có thêm một ngày khám phá, dự kiến bao gồm làng Việt Hải trên đảo Cát Bà và các địa điểm khác trong khu vực vịnh Lan Hạ.',
      },
      note: 'Các hành trình đang ở giai đoạn chuẩn bị triển khai. Điểm dừng, hoạt động và thời gian tham quan có thể thay đổi theo điều kiện thời tiết, thủy triều, quy định của cơ quan quản lý và kế hoạch vận hành thực tế.',
    },
    cabins: {
      label: 'Phòng nghỉ',
      title: 'Hạng phòng trên du thuyền',
      lede: 'Green Ruby 1 và Green Ruby 2 được thiết kế với cùng bốn hạng phòng, từ Serenity Deluxe đến Imperial Suite.',
      th: ['Hạng phòng', 'Diện tích thiết kế', 'Số khách tiêu chuẩn'],
      body: ['Các phòng đều được định hướng thiết kế với tầm nhìn ra cảnh quan vịnh, kết hợp không gian nghỉ ngơi riêng tư và những tiện nghi phù hợp với hành trình lưu trú qua đêm.'],
      notes: [
        'Số lượng phòng cụ thể của từng hạng trên mỗi tàu chưa được công bố.',
        'Diện tích, cấu hình và trang thiết bị cuối cùng sẽ được cập nhật theo hồ sơ hoàn thiện của từng tàu.',
      ],
    },
    departure: {
      label: 'Đón khách',
      title: 'Địa điểm làm thủ tục và lên tàu',
      lede: 'Theo phương án đón khách dự kiến, hành khách của cả Green Ruby 1 và Green Ruby 2 sẽ làm thủ tục tại phòng chờ Green Ruby thuộc Cảng tàu khách quốc tế Tuần Châu.',
      place: 'Địa điểm dự kiến',
      address: 'Số 27, Nhà ga số 2, Cảng tàu khách quốc tế Tuần Châu, Quảng Ninh, Việt Nam.',
      addressNote: '',
      points: [],
      contact: 'Xác nhận địa điểm làm thủ tục',
      map: 'Mở vị trí trên Google Maps',
      blocks: [
        {
          title: 'Thời gian làm thủ tục',
          paras: [
            'Theo các hành trình đang công bố, khách dự kiến có mặt làm thủ tục từ khoảng 10:45 và bắt đầu di chuyển ra tàu vào khoảng 11:45.',
            'Thời gian chính thức sẽ được xác nhận trong thông tin đặt chỗ của từng chuyến.',
          ],
        },
        {
          title: 'Phương án lên tàu',
          paras: [
            'Green Ruby 1 – Vịnh Hạ Long: Khách làm thủ tục tại Tuần Châu, sau đó sử dụng phương tiện chuyển tải theo hướng dẫn để lên Green Ruby 1 tại vị trí được phép trên vịnh Hạ Long.',
            'Green Ruby 2 – Vịnh Lan Hạ: Khách dự kiến làm thủ tục tại Tuần Châu trước khi được đưa sang khu vực Gia Luận, Cát Bà để lên Green Ruby 2.',
            'Phương tiện và địa điểm lên tàu cuối cùng sẽ được xác nhận trước ngày khởi hành.',
          ],
        },
        {
          title: 'Dịch vụ đưa đón từ Hà Nội',
          paras: [
            'Green Ruby dự kiến cung cấp dịch vụ đưa đón từ Hà Nội theo yêu cầu. Thời gian di chuyển tham khảo khoảng 2,5 giờ, tùy vị trí đón và tình hình giao thông.',
            'Khách có nhu cầu sử dụng dịch vụ nên liên hệ bộ phận đặt chỗ để được xác nhận lịch đón và chi phí.',
          ],
        },
      ],
      note: 'Địa chỉ đăng ký của doanh nghiệp và địa điểm làm thủ tục lên tàu là hai thông tin riêng biệt.',
    },
    status: {
      label: 'Tình trạng',
      title: 'Tình trạng vận hành và đặt chỗ',
      lede: 'Green Ruby 1 và Green Ruby 2 hiện chưa chính thức đi vào hoạt động.',
      body: ['Các hành trình đã được công bố để khách hàng và đối tác tìm hiểu, lên kế hoạch du lịch và gửi yêu cầu đặt chỗ trước thời điểm khai thác.'],
      cardsTitle: 'Tình trạng từng tàu',
      cards: [
        ['Green Ruby 1 · Vịnh Hạ Long', 'Chưa vận hành', 'Dự kiến bắt đầu từ tháng 2/2027, chưa xác nhận ngày khởi hành chính thức.'],
        ['Green Ruby 2 · Vịnh Lan Hạ', 'Chưa vận hành', 'Dự kiến bắt đầu từ tháng 2/2027, chưa xác nhận ngày khởi hành chính thức.'],
      ],
      rows: [],
      blocks: [
        {
          title: 'Giá và yêu cầu đặt chỗ',
          paras: [
            'Giá hành trình hiện được cung cấp theo yêu cầu của khách hàng và đối tác.',
            'Khách có thể gửi thông tin chuyến đi qua website hoặc liên hệ trực tiếp với bộ phận đặt chỗ Green Ruby Cruises.',
            'Việc gửi yêu cầu, nhận báo giá hoặc trao đổi về ngày đi không đồng nghĩa với việc chuyến đi đã được xác nhận. Đặt chỗ chỉ có hiệu lực theo các điều kiện nêu trong xác nhận chính thức của Green Ruby.',
          ],
        },
        {
          title: 'Chính sách thay đổi và hủy chuyến',
          paras: [
            'Điều kiện thay đổi, hủy và hoàn tiền được áp dụng theo chính sách công bố cho từng loại đặt chỗ và các điều khoản đã thống nhất tại thời điểm xác nhận.',
            'Trường hợp chuyến đi không thể thực hiện do thời tiết, yêu cầu của cơ quan quản lý hoặc nguyên nhân từ phía đơn vị vận hành sẽ được xử lý theo điều kiện đặt chỗ áp dụng.',
            'Khách hàng nên kiểm tra chính sách hủy, hoàn tiền và thời hạn thanh toán trước khi xác nhận đặt chỗ.',
          ],
        },
      ],
      cta: 'Liên hệ bộ phận đặt chỗ',
    },
    sustainability: {
      label: 'Công bố',
      title: 'Phát triển bền vững và chứng nhận',
      lede: 'Green Ruby Cruises định hướng áp dụng các giải pháp tiết kiệm năng lượng, quản lý nước thải và giảm vật dụng nhựa dùng một lần trong hoạt động du thuyền.',
      body: ['Các giải pháp này đang được triển khai theo thiết kế và kế hoạch chuẩn bị vận hành. Những số liệu về hiệu quả năng lượng và phát thải hiện là ước tính, chưa phải kết quả đo được từ hoạt động thực tế.'],
      rows: [
        ['Green Globe', 'Green Ruby Cruises đã đăng ký tìm hiểu và chuẩn bị tham gia quy trình chứng nhận Green Globe cho hoạt động du thuyền. Các yêu cầu đánh giá, phạm vi áp dụng và kế hoạch triển khai đang được làm rõ với tổ chức chứng nhận. Green Ruby Cruises hiện chưa được cấp chứng nhận Green Globe.', 'progress', 'Đang chuẩn bị chứng nhận'],
        ['Hệ thống điện mặt trời', 'Theo thiết kế, mỗi tàu dự kiến lắp đặt hệ thống pin mặt trời trên mái với công suất khoảng 70 kW.', 'design'],
        ['Hệ thống điều hòa làm mát bằng nước biển', 'Hai tàu được thiết kế sử dụng giải pháp làm mát bằng nước biển nhằm hỗ trợ nâng cao hiệu quả sử dụng năng lượng của hệ thống điều hòa.', 'design'],
        ['Mức tiết kiệm điện năng', 'Các giải pháp điện mặt trời và làm mát bằng nước biển được ước tính có thể giúp giảm khoảng 40% điện năng tiêu thụ theo phương án tính toán thiết kế. Con số này chưa được kiểm chứng bằng dữ liệu vận hành thực tế.', 'estimate'],
        ['Giảm phát thải CO₂', 'Hệ thống điện mặt trời được ước tính có thể giúp giảm khoảng 60 tấn CO₂ mỗi tàu mỗi năm, dựa trên giả định về sản lượng điện và hệ số phát thải. Đây chưa phải lượng phát thải đã được đo lường hoặc xác minh độc lập.', 'estimate'],
        ['Hệ thống xử lý nước thải', 'Theo thiết kế, nước thải phát sinh trên tàu sẽ được thu gom và xử lý bằng hệ thống sinh học trước khi xả theo các yêu cầu kỹ thuật, môi trường áp dụng. Mục tiêu thiết kế là xử lý toàn bộ nước thải thuộc phạm vi hệ thống.', 'design'],
        ['Hệ thống thu hồi nhiệt', 'Các tàu được thiết kế tận dụng nhiệt thải từ động cơ và máy phát điện để hỗ trợ cung cấp nước nóng và phục vụ một số nhu cầu kỹ thuật trên tàu.', 'design'],
        ['Giảm sử dụng nhựa dùng một lần', 'Green Ruby đang xây dựng phương án hạn chế và thay thế các vật dụng nhựa dùng một lần trong dịch vụ dành cho khách.', 'progress'],
        ['Hệ thống động lực', 'Green Ruby 1 và Green Ruby 2 không sử dụng hệ thống động lực hybrid.', 'confirmed', 'Thông tin thiết kế đã xác nhận'],
        ['Dữ liệu môi trường thực tế', 'Do hai tàu chưa đi vào khai thác, hiện chưa có dữ liệu vận hành đủ để công bố kết quả đo thực tế về mức tiêu thụ năng lượng, lượng phát thải hoặc hiệu quả của các hệ thống môi trường. Những số liệu này sẽ được cập nhật khi có dữ liệu vận hành và phương pháp đo lường phù hợp.', 'pending'],
      ],
      dashboard: 'Tham khảo Báo cáo sinh thái Green Ruby Cruises',
    },
    contacts: {
      label: 'Liên hệ',
      title: 'Kênh liên hệ chính thức',
      lede: 'Khách hàng, đại lý du lịch và các đối tác có thể liên hệ Green Ruby Cruises qua những kênh chính thức dưới đây.',
      website: 'Website',
      email: 'Email',
      hotline: 'Hotline / Zalo',
      address: 'Văn phòng liên hệ',
      social: 'Mạng xã hội',
      contactPage: 'Trang liên hệ',
      office: 'Nhà chờ Green Ruby, Số 27, Nhà ga số 2, Cảng tàu khách quốc tế Tuần Châu, Quảng Ninh, Việt Nam',
      after: [
        'Các tài khoản mạng xã hội chính thức của Green Ruby Cruises được liên kết từ website. Những kênh mới chỉ được bổ sung sau khi quyền quản lý và thông tin tài khoản được xác minh.',
        'Để kiểm tra báo giá, xác nhận đặt chỗ hoặc thông tin thanh toán, khách hàng nên sử dụng website và các kênh liên hệ chính thức nêu trên.',
      ],
    },
    media: {
      label: 'Báo chí và đối tác',
      title: 'Thông tin dành cho báo chí và đối tác',
      lede: 'Phần dưới đây cung cấp đoạn giới thiệu ngắn về Green Ruby Cruises để các đơn vị truyền thông, đại lý du lịch và đối tác tham khảo khi giới thiệu thương hiệu.',
      boilerplateLabel: 'Mô tả thương hiệu chính thức',
      boilerplate: [
        'Green Ruby Cruises là thương hiệu du thuyền nghỉ đêm cao cấp tại Việt Nam, do Công ty Cổ phần TPX vận hành. Đội tàu gồm Green Ruby 1 phục vụ tuyến vịnh Hạ Long và Green Ruby 2 phục vụ tuyến vịnh Lan Hạ, mỗi tàu dự kiến có 46 phòng nghỉ thuộc bốn hạng phòng.',
        'Hai tàu được thiết kế với các giải pháp tiết kiệm năng lượng, bao gồm điện mặt trời, hệ thống điều hòa làm mát bằng nước biển và thu hồi nhiệt. Green Ruby hiện đang chuẩn bị tham gia quy trình chứng nhận Green Globe và chưa được cấp chứng nhận.',
        'Các hành trình dự kiến bắt đầu từ tháng 2/2027, tùy tiến độ hoàn thiện và các điều kiện vận hành chính thức.',
      ].join('\n\n'),
      copy: 'Sao chép mô tả',
      filesTitle: 'Tài liệu và thông tin xác minh',
      files: [
        ['Logo và hình ảnh thương hiệu', 'Đối tác và các đơn vị truyền thông có thể liên hệ Green Ruby để nhận logo, hình ảnh và tài liệu giới thiệu phù hợp với mục đích sử dụng.'],
        ['Hồ sơ thông tin doanh nghiệp', 'Thông tin trên trang này có thể được sử dụng làm tài liệu tham khảo công khai. Các nội dung đang ở trạng thái dự kiến hoặc chưa được xác minh cần được giữ nguyên chú thích khi trích dẫn.'],
        ['Đề nghị đính chính', 'Nếu phát hiện thông tin chưa chính xác, vui lòng gửi nội dung cần kiểm tra đến hello@greenrubycruises.com.'],
      ],
    },
  },
  footerTitle: 'Cần xác minh thông tin về Green Ruby Cruises?',
  footerCta: 'Liên hệ đội ngũ Green Ruby Cruises',
};

export const brandFactsMessages: Record<Locale, Messages> = { en, vi };
export type { Block, Evidence, FactRow };
