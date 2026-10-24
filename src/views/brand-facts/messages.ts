import type { Locale } from '@/lib/i18n';

// Copy for /about-us/brand-facts (design: new_website/green-ruby-brand-facts-v1.html). One public reference
// for the brand, company, fleet and status, written for guests, travel partners, press and AI assistants.
// Facts confirmed by the owner on 20 October 2026 (service start February 2027 re-confirmed 25 October);
// vessel and cabin figures come from the CMS.

/** Last review per language (owner rewrites: Vietnamese 24 October, English 25 October 2026). */
export const REVIEWED: Record<Locale, { iso: string; label: string }> = {
  en: { iso: '2026-10-25', label: '25 October 2026' },
  vi: { iso: '2026-10-24', label: '24/10/2026' },
};
export const LEGAL_NAME = 'TPX JOINT STOCK COMPANY';
export const TAX_ID = '5702096485';

type Evidence = 'confirmed' | 'design' | 'estimate' | 'progress' | 'pending';
/** Label, value, evidence status and an optional badge text that overrides the generic status label. */
type FactRow = [string, string, Evidence] | [string, string, Evidence, string];
/** Optional sub-section: an h3, its paragraphs, an optional two-column table and paragraphs after it. */
type Block = { title: string; paras: string[]; table?: { head: [string, string]; rows: [string, string][] }; parasAfter?: string[] };

const en = {
  metaTitle: 'Green Ruby Cruises | Official Company & Fleet Facts',
  metaDescription:
    'Official information about Green Ruby Cruises, its operator TPX Joint Stock Company, Green Ruby 1 and 2, planned routes, launch dates and sustainability.',
  breadcrumbAbout: 'About us',
  breadcrumb: 'Brand facts',
  eyebrow: 'Official company information',
  title: 'Green Ruby Cruises —',
  titleEm: 'Official Brand & Fleet Information',
  lead: "Official information about Green Ruby Cruises, its operating company, two vessels, planned itineraries, guest boarding arrangements and current operating status. This page also provides details of the fleet's environmental systems and certification plans, with clear distinctions between confirmed information, design specifications and estimates.",
  reviewed: 'Last reviewed',
  indexTitle: 'On this page',
  printLabel: 'Print / Save as PDF',
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
    ['Fleet', 'Two sister ships'],
    ['Destinations', 'Ha Long Bay & Lan Ha Bay, Vietnam'],
    ['Expected service start', 'February 2027 (provisional)'],
  ],
  sections: {
    identity: {
      label: 'Company profile',
      title: 'Brand and company',
      lede: 'Green Ruby Cruises is a Vietnamese luxury overnight cruise brand operated by TPX Joint Stock Company.',
      body: [
        'The brand is developing two cruise programmes: Green Ruby 1 for Ha Long Bay and Green Ruby 2 for Lan Ha Bay. Both are designed to combine overnight accommodation with guided excursions, onboard dining and opportunities to explore the natural and cultural heritage of northern Vietnam.',
        'The information below identifies the legal company responsible for the brand and distinguishes it from the Green Ruby Cruises trading name.',
      ] as string[],
      rows: [
        ['Brand name', 'Green Ruby Cruises', 'confirmed'],
        ['Operating company', LEGAL_NAME, 'confirmed'],
        ['Enterprise registration / Tax code', `${TAX_ID} (Vietnam)`, 'confirmed'],
        ['Business', 'Luxury overnight cruises', 'confirmed'],
        ['Planned destinations', 'Ha Long Bay, Quang Ninh; Lan Ha Bay, Hai Phong', 'confirmed'],
        ['Country', 'Vietnam', 'confirmed'],
        ['Official website', 'greenrubycruises.com', 'confirmed'],
      ] as FactRow[],
      note: 'Green Ruby Cruises is the trading brand. TPX Joint Stock Company is the legal operating entity.',
    },
    fleet: {
      label: 'Fleet',
      title: 'Green Ruby 1 and Green Ruby 2',
      lede: 'The Green Ruby fleet comprises two sister ships developed to the same design, with matching cabin categories and a comparable range of onboard facilities.',
      body: ['Each vessel is intended to serve a different cruising area. Green Ruby 1 will explore Ha Long Bay, while Green Ruby 2 will operate itineraries in neighbouring Lan Ha Bay.'] as string[],
      /** Short description in each ship card (empty = none). */
      ships: {
        'ha-long': [
          'Green Ruby 1 is designed for overnight journeys through Ha Long Bay, including planned visits to Sung Sot Cave, Ti Top Island and Luon Cave.',
          'Longer itineraries also include sites such as Cua Van Floating Village and Tien Ong Cave.',
          'The vessel has a published design configuration of 46 cabins across four categories, a length of 121 metres and a stated capacity of 136 guests, subject to final operational verification.',
        ] as string[],
        'lan-ha': [
          'Green Ruby 2 is planned for overnight cruises in Lan Ha Bay, near Cat Ba Island.',
          'Its itineraries include the Dark & Bright Cave area, with longer programmes extending to Viet Hai Village and other authorised destinations around the Cat Ba Archipelago.',
          'Built to the same design as Green Ruby 1, the ship has a published configuration of 46 cabins in four categories, a length of 121 metres and a stated capacity of 136 guests, subject to final operational verification.',
        ] as string[],
      },
      /** Status line in the ship cards (empty = the table's `status`). */
      cardStatus: 'Operating status: Not yet in service. Expected launch: February 2027 (provisional).',
      thSpec: 'Specification',
      rows: {
        bay: 'Planned cruising area',
        length: 'Length',
        cabins: 'Cabins',
        guests: 'Published guest capacity',
        decks: 'Decks',
        built: 'Planned build year',
        categories: 'Cabin categories',
        boarding: 'Boarding arrangements',
        status: 'Operating status',
        /** Extra row with `launch` (empty label = no row). */
        launch: 'Expected service start',
      },
      bays: { 'ha-long': 'Ha Long Bay', 'lan-ha': 'Lan Ha Bay' },
      boarding: { 'ha-long': 'Transfer from Tuan Chau to the vessel in Ha Long Bay', 'lan-ha': 'Transfer from Tuan Chau to Gia Luan, then embarkation in Lan Ha Bay' },
      categories: '4',
      status: 'Pre-launch',
      launch: 'February 2027 (provisional)',
      /** "{name}" is replaced by the ship name. */
      vesselPage: 'Explore {name}',
      /** Paragraphs right under the spec table. */
      afterTable: ['Both ships offer the same four cabin categories: Imperial Suite, Royal Romance Suite, Ocean Breeze Premium and Serenity Deluxe.'] as string[],
      blocks: [
        {
          title: 'Choosing your cruise',
          paras: [
            'The main difference is the destination.',
            'Ha Long Bay is known for its established sightseeing routes, large limestone caves and island viewpoints. Lan Ha Bay, beside Cat Ba Island, offers sheltered waterways, limestone scenery and opportunities to visit places such as Viet Hai Village.',
            'Both bays are part of the UNESCO-listed Ha Long Bay–Cat Ba Archipelago World Heritage Site.',
          ],
        },
      ] as Block[],
      choose: '',
      chooseLink: 'Compare all itineraries',
      note: 'Fleet specifications reflect the published design and development plans. Final technical and operating details will be updated as the vessels complete the required inspections and approvals.',
      footnotes: ['Some vessel and interior images may be architectural renderings rather than photographs of the completed ships.'] as string[],
    },
    itineraries: {
      label: 'Routes',
      title: 'Itineraries',
      lede: 'Green Ruby Cruises has published four planned overnight itineraries: two in Ha Long Bay aboard Green Ruby 1 and two in Lan Ha Bay aboard Green Ruby 2.',
      th: ['Destination', 'Duration', 'Vessel', 'Itinerary'],
      nights: (d: number): string => (d >= 3 ? '3 days / 2 nights' : '2 days / 1 night'),
      body: ['Each programme offers a different length of stay and sightseeing route.'] as string[],
      /** One line under each itinerary, by CMS itinerary id. */
      descriptions: {} as Record<number, string>,
      blocks: [
        {
          title: 'Ha Long Bay itineraries',
          paras: [
            "The 2-day/1-night programme focuses on some of the bay's best-known attractions, including Sung Sot Cave, Luon Cave and Ti Top Island.",
            'The 3-day/2-night itinerary adds time to explore farther into Ha Long Bay, with planned visits to Cua Van Floating Village and Tien Ong Cave.',
          ],
        },
        {
          title: 'Lan Ha Bay itineraries',
          paras: [
            'The 2-day/1-night programme combines an overnight stay with sightseeing in Lan Ha Bay, including the Dark & Bright Cave area.',
            'The 3-day/2-night programme provides an additional day for planned activities around Cat Ba Island, including a visit to Viet Hai Village.',
          ],
        },
      ] as Block[],
      notes: [
        'All itineraries are provisional until regular sailings begin. Stops, excursion options and departure times may change in response to weather, tides, safety requirements and instructions from local authorities.',
        'Water-based activities, including kayaking, are offered only where and when current regulations permit.',
      ] as string[],
    },
    cabins: {
      label: 'Accommodation',
      title: 'Cabin categories',
      lede: 'Green Ruby 1 and Green Ruby 2 share four cabin categories, ranging from Serenity Deluxe to the 120 m² Imperial Suite.',
      th: ['Cabin category', 'Published area', 'Guest capacity', 'View'],
      body: ['The published layouts are designed to offer views of the surrounding bay, with different floor areas and accommodation arrangements.'] as string[],
      notes: [
        'The number of cabins in each category on each vessel has not yet been published.',
        'Cabin dimensions and configurations reflect the current published specifications and may be updated following final fit-out and verification.',
        'For detailed layouts, facilities and booking arrangements, please refer to the individual cabin pages.',
      ] as string[],
    },
    departure: {
      label: 'Guest arrival',
      title: 'Check-in and boarding',
      lede: 'Guests travelling on either Green Ruby vessel are expected to check in at the Green Ruby lounge at Tuan Chau International Passenger Port.',
      body: ["The company's registered business address is separate from its guest check-in location."] as string[],
      place: 'Tuan Chau International Passenger Port',
      address: 'Planned check-in address: No. 27, Terminal Building 2, Tuan Chau International Passenger Port, Tuan Chau, Quang Ninh, Vietnam.',
      addressNote: '',
      points: [] as string[],
      contact: 'Confirm your check-in arrangements',
      map: 'View on Google Maps',
      blocks: [
        {
          title: 'Check-in times',
          paras: [
            'Based on the published itineraries, guests are expected to arrive for check-in from approximately 10:45 AM, with transfer-boat boarding beginning at around 11:45 AM.',
            'These times are indicative. The confirmed reporting time and location will be provided in each booking confirmation.',
          ],
        },
        {
          title: 'Boarding Green Ruby 1',
          paras: ['Guests check in at Tuan Chau before transferring by tender to Green Ruby 1 at an authorised boarding location in Ha Long Bay.'],
        },
        {
          title: 'Boarding Green Ruby 2',
          paras: [
            'Guests check in at Tuan Chau before taking an arranged transfer to the Gia Luan area of Cat Ba Island, where they board Green Ruby 2 for the Lan Ha Bay itinerary.',
            'Guests are not expected to arrange their own journey to Gia Luan unless instructed otherwise by the reservations team.',
            'The final boarding arrangements will be confirmed before departure.',
          ],
        },
        {
          title: 'Transfers from Hanoi',
          paras: [
            'Transfers from Hanoi are planned to be available on request.',
            'The journey typically takes approximately 2.5 hours, depending on the pick-up location and traffic conditions. The published itinerary indicates a pick-up time of around 8:00 AM.',
            'Transfer availability, collection points and any additional charges must be confirmed with the reservations team.',
          ],
        },
      ] as Block[],
      note: '',
    },
    status: {
      label: 'Operating status',
      title: 'Operating and booking status',
      lede: 'Green Ruby 1 and Green Ruby 2 have not yet entered regular passenger service.',
      body: [
        'Their planned itineraries have been published to help guests and travel partners explore the programmes and make enquiries ahead of launch.',
        'The publication of an itinerary does not confirm that a particular departure is operating or available to book.',
      ] as string[],
      cardsTitle: '',
      cards: [
        ['Green Ruby 1 · Ha Long Bay', 'Not yet in service', 'Expected to begin operating from February 2027, subject to final preparations, relevant approvals and confirmation of the departure schedule. This is a provisional launch period, not a confirmed sailing date.'],
        ['Green Ruby 2 · Lan Ha Bay', 'Not yet in service', 'Expected to begin operating from February 2027, subject to final preparations, relevant approvals and confirmation of the departure schedule. This is a provisional launch period, not a confirmed sailing date.'],
      ],
      rows: [] as FactRow[],
      blocks: [
        {
          title: 'Prices and booking enquiries',
          paras: [
            'Published prices: Not yet available. Quotations are provided on request.',
            'Booking enquiries: Guests may submit preferred dates and accommodation requirements through the official website or contact the reservations team directly.',
            'A booking enquiry or quotation does not guarantee availability or confirm a sailing.',
            'A reservation becomes confirmed only when the guest receives an official booking confirmation and the applicable booking conditions have been met.',
          ],
        },
        {
          title: 'Cancellation and refund policy',
          paras: ['The currently published standard cancellation schedule is:'],
          table: {
            head: ['Cancellation before departure', 'Standard terms'],
            rows: [
              ['30 days or more', 'Full refund'],
              ['15–29 days', '50% cancellation charge'],
              ['7–14 days', '75% cancellation charge'],
              ['Less than 7 days', 'No refund'],
              ['No-show', 'No refund'],
            ],
          },
          parasAfter: [
            'These terms are subject to the conditions agreed at the time of booking. Different arrangements may apply to group bookings, promotional offers or reservations made through third-party travel partners.',
            'Cancellations initiated by the operator, changes caused by port-authority restrictions and other exceptional circumstances are handled according to the applicable booking terms and consumer protection requirements.',
            'Guests should review the full cancellation and refund conditions before confirming a reservation.',
          ],
        },
      ] as Block[],
      cta: 'Contact our reservations team',
    },
    sustainability: {
      label: 'Disclosures',
      title: 'Sustainability and certification',
      lede: 'Green Ruby Cruises is developing a range of environmental systems intended to reduce energy demand, manage wastewater and limit single-use plastics during onboard operations.',
      body: [
        'The vessels are not yet in service. Any performance figures published at this stage are design specifications or preliminary estimates, not results measured during actual cruises.',
        'Each item below is identified by its current status.',
      ] as string[],
      rows: [
        ['Green Globe certification', 'Green Ruby Cruises has registered its interest in Green Globe certification and begun discussions regarding the applicable requirements and potential certification scope for its fleet. Assessment arrangements and the proposed scope are still being clarified. Neither Green Ruby Cruises nor its two vessels currently holds Green Globe certification.', 'progress', 'Preparing for certification'],
        ['Rooftop solar power', 'Each vessel is designed to accommodate a rooftop solar power system with an estimated installed capacity of approximately 70 kW. Actual installed capacity and energy generation will be confirmed after completion and commissioning.', 'design'],
        ['Seawater-cooled air conditioning', 'The vessels are designed to use seawater as part of their air-conditioning cooling system, with the aim of improving energy efficiency. Actual energy performance will be evaluated once the systems are operating.', 'design'],
        ['Estimated energy savings', 'The combined solar power and seawater-cooling systems are estimated to reduce onboard energy consumption by approximately 40% under the design assumptions. This figure has not yet been verified using operational measurements. The final result will depend on factors including operating hours, equipment performance, weather conditions and energy demand.', 'estimate', 'Preliminary design estimate'],
        ['Estimated CO₂ reductions', "Each vessel's solar power system is estimated to avoid approximately 60 tonnes of CO₂ emissions per year, based on projected electricity generation and the emissions factors used in the calculation. This is a design-stage projection, not a measured or independently verified emissions reduction.", 'estimate', 'Preliminary design estimate'],
        ['Wastewater treatment', 'Each vessel is designed with an onboard biological wastewater treatment system. The system is intended to collect and treat wastewater within its designed scope before discharge, in accordance with applicable environmental requirements. Treatment performance and compliance will be assessed through the relevant commissioning and operational procedures.', 'design'],
        ['Waste heat recovery', 'Heat recovery systems are designed to reuse waste heat from engines and generators, including for hot water and selected onboard heating or climate-control needs. Actual heat recovery performance will be assessed after commissioning.', 'design'],
        ['Single-use plastics', 'Green Ruby Cruises is developing measures to reduce or replace single-use plastic items in guest services. Implementation details and operational results will be updated as the ships enter service.', 'progress', 'Implementation in progress'],
        ['Hybrid propulsion', 'Green Ruby 1 and Green Ruby 2 are not equipped with hybrid propulsion systems. The planned solar power installations support onboard energy use and should not be described as hybrid propulsion.', 'confirmed', 'Confirmed design information'],
        ['Measured environmental performance', 'Because neither vessel is operating, Green Ruby Cruises does not yet have sufficient operational data to report measured energy savings, actual emissions reductions or verified wastewater-treatment performance. Environmental performance information will be updated when suitable measurements become available, with the relevant calculation methods and limitations explained.', 'pending', 'Not yet available'],
      ] as FactRow[],
      dashboard: 'View our Eco Dashboard — figures, methods and verification status',
    },
    contacts: {
      label: 'Contact',
      title: 'Official contacts and channels',
      lede: 'The contact details below are the official channels published by Green Ruby Cruises.',
      body: ['Guests, travel agents and business partners are encouraged to use these channels for reservations, quotations, business enquiries and verification of company information.'] as string[],
      website: 'Official website',
      email: 'Email',
      hotline: 'Hotline / Zalo',
      address: 'Office',
      social: 'Official social media',
      contactPage: 'Contact page',
      /** Overrides the CMS address in the office row (empty = CMS value). */
      office: 'Green Ruby lounge, No. 27, Terminal Building 2, Tuan Chau International Passenger Port, Quang Ninh, Vietnam',
      /** Paragraphs under the contact cards. */
      after: [
        'Additional platforms and directory listings will be added when their ownership and official status have been verified.',
        "For payment instructions, booking confirmations or changes to reservations, guests should refer to communications issued through Green Ruby Cruises' official channels.",
      ] as string[],
    },
    media: {
      label: 'Press and partners',
      title: 'For media and travel partners',
      lede: 'The following description may be used by travel agents, tour operators, directories and media organisations when introducing Green Ruby Cruises.',
      body: ['Please retain the provisional status of the launch dates and the current certification status when quoting or adapting the information.'] as string[],
      boilerplateLabel: 'Approved brand description',
      boilerplate:
        'Green Ruby Cruises is a Vietnamese luxury overnight cruise brand operated by TPX Joint Stock Company. Its fleet comprises two sister ships: Green Ruby 1, planned for Ha Long Bay, and Green Ruby 2, planned for Lan Ha Bay. Each vessel is designed with 46 cabins across four categories, including the 120 m² Imperial Suite. The ships incorporate planned solar power, seawater-cooled air conditioning, heat recovery and onboard wastewater treatment systems. Green Ruby is preparing for Green Globe certification but is not yet certified. Both vessels are expected to enter service from February 2027, subject to final confirmation.',
      copy: 'Copy description',
      filesTitle: 'Brand assets and documentation',
      files: [
        ['Logo and photography', 'Official logos, approved photographs and other brand materials are available on request. During the pre-launch period, some images may be design renderings. These should not be presented as photographs of completed vessels.'],
        ['Company fact sheet', "This page provides Green Ruby Cruises' publicly available company and fleet information. It may be printed or saved as a PDF for reference."],
        ['Information updates and corrections', 'If you find outdated or inaccurate information, please contact hello@greenrubycruises.com with the details so that the relevant information can be reviewed.'],
      ],
    },
  },
  footerTitle: 'Need to verify information about Green Ruby Cruises?',
  footerCta: 'Contact Green Ruby Cruises',
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
        launch: '',
      },
      bays: { 'ha-long': 'Vịnh Hạ Long', 'lan-ha': 'Vịnh Lan Hạ' },
      boarding: { 'ha-long': 'Xuồng đưa từ Tuần Châu ra tàu trên vịnh Hạ Long', 'lan-ha': 'Xuồng đưa từ Tuần Châu sang bến Gia Luận (Hải Phòng), lên tàu trên vịnh Lan Hạ' },
      categories: '4',
      status: 'Chưa vận hành',
      launch: '',
      vesselPage: 'Xem thông tin tàu',
      afterTable: [],
      blocks: [],
      note: 'Về hình ảnh: Trong giai đoạn chuẩn bị vận hành, một số hình ảnh tàu và không gian nội thất trên website có thể là ảnh phối cảnh thiết kế. Ảnh thực tế sẽ được cập nhật khi có đủ tư liệu.',
      choose: 'Các thông số nêu trên được công bố theo thiết kế và kế hoạch đội tàu. Thông số chính thức sẽ được cập nhật sau khi hoàn tất các thủ tục, kiểm tra và nghiệm thu liên quan.',
      chooseLink: '',
      footnotes: [],
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
      blocks: [],
      notes: ['Các hành trình đang ở giai đoạn chuẩn bị triển khai. Điểm dừng, hoạt động và thời gian tham quan có thể thay đổi theo điều kiện thời tiết, thủy triều, quy định của cơ quan quản lý và kế hoạch vận hành thực tế.'],
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
      body: [],
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
      body: [],
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
      body: [],
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
