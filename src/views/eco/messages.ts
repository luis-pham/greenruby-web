import type { Locale } from '@/lib/i18n';

// Copy for /eco-dashboard (new_website/green-ruby-eco-dashboard-v1.html). Not a CMS page: the figures are
// deliberately labelled as design estimates until measured, verified data exists, so they live with the copy.

type Metric = 'fuel' | 'solar' | 'cooling';
type Ship = {
  label: string;
  meta: string;
  solar: string;
  cooling: string;
  desc: string;
  solarDesc: string;
  coolingDesc: string;
};

const en = {
  metaTitle: 'Eco Impact Dashboard | Green Ruby Cruises',
  metaDescription:
    "Explore Green Ruby Cruises' environmental goals, projected carbon savings and transparent journey toward measured lower-impact cruising.",
  breadcrumb: 'Eco Dashboard',
  hero: {
    kicker: 'The Green Ruby environmental impact dashboard',
    title: 'A lighter footprint.',
    titleEm: 'A brighter horizon.',
    body: 'Extraordinary journeys deserve extraordinary care. Discover the technology behind our sustainability ambitions, and follow our progress as design estimates become measured results.',
    primary: 'Explore our impact',
    secondary: 'How we measure',
    mark: 'Conscious luxury · Open reporting',
  },
  status: {
    label: 'Prototype reporting status:',
    body: 'no validated operating dataset is connected to this page yet.',
    link: 'Understand our figures',
  },
  snapshot: {
    eyebrow: '01 — The impact snapshot',
    title: 'Every meaningful number',
    titleEm: 'begins with evidence.',
    lede: 'A clear separation between projected benefits and actual emissions is at the heart of our reporting.',
    shipsLabel: 'Select vessel',
    primaryLabel: 'Measured CO₂ avoided',
    pill: 'Awaiting verification',
    unit: 'tCO₂ / year',
    notMeasured: 'Not yet measured',
    solarLabel: 'Solar-assisted power',
    solarWarn: 'Design estimate · not verified operating data',
    coolingLabel: 'Seawater cooling',
    coolingWarn: 'Cooling-specific target · not ship-wide CO₂',
    ships: [
      {
        label: 'Green Ruby 1',
        meta: 'Green Ruby 1 · Ha Long Bay',
        solar: '~25%',
        cooling: '~40%',
        desc: 'Actual carbon savings will appear here when engineering data, a documented baseline and reporting period are available.',
        solarDesc: 'Previously published estimate of onboard power supplied by solar during daylight hours.',
        coolingDesc: 'Proposed reduction in cooling-system energy versus a conventional cooling reference.',
      },
      {
        label: 'Green Ruby 2',
        meta: 'Green Ruby 2 · Lan Ha Bay',
        solar: '—',
        cooling: '—',
        desc: 'Green Ruby 2 has no separately validated annual emissions or design-target dataset for public reporting.',
        solarDesc: 'A vessel-specific solar estimate has not been confirmed for publication.',
        coolingDesc: 'A vessel-specific cooling target has not been confirmed for publication.',
      },
    ] satisfies Ship[],
    whyTitle: 'Why not show a running CO₂ counter?',
    whyBody:
      'An animated savings figure would imply that we have measured emissions already. Our reporting instead distinguishes design forecasts, measured emissions and reductions against a documented baseline. Historical public estimates, including an approximate 60 tCO₂/year solar figure in an older About Us version, are held for revalidation and are not reported here as achieved impact.',
  },
  technology: {
    eyebrow: '02 — Designed for a difference',
    title: 'Technology with',
    titleEm: 'purpose.',
    lede: 'Three engineering approaches to using less fuel and less energy. Each will be assessed on its own merits, without double counting carbon reductions.',
    items: [
      {
        kicker: '01 / Sunlight',
        title: 'Solar-Assisted Power',
        body: 'Daytime rooftop generation is designed to supply onboard electrical loads and reduce generator demand. Our future reporting will show solar kWh, generator fuel and the resulting emissions estimate.',
        tag: 'Track · kWh solar generated',
      },
      {
        kicker: '02 / The sea',
        title: 'Seawater Cooling',
        body: 'Cooling efficiency is designed to improve through seawater-assisted technology. Any energy reduction must be compared with an equivalent conventional cooling system — not with the whole vessel.',
        tag: 'Track · cooling kWh saved',
      },
      {
        kicker: '03 / Circular energy',
        title: 'Heat Recovery & Reuse',
        body: 'Waste heat from propulsion and generators can support onboard hot-water and comfort systems. Savings will be measured separately and checked for overlap with other systems.',
        tag: 'Track · recovered heat kWh',
      },
    ],
    foot: 'Engineering features describe intended operations, not independently assured performance.',
    footLink: 'Our sustainability philosophy',
  },
  reporting: {
    eyebrow: '03 — From intention to instruments',
    title: 'The numbers we',
    titleEm: 'intend to publish.',
    lede: 'When operational evidence is available, visitors will be able to compare voyages, months and vessels without confusing forecasts with actual performance.',
    metricsLabel: 'Select environmental dataset',
    metrics: {
      fuel: { label: 'Fuel & CO₂', title: 'Fuel consumption & emissions', desc: 'Voyage fuel logs and fuel-specific emission factors will be used to calculate actual combustion emissions.' },
      solar: { label: 'Solar energy', title: 'Rooftop solar production', desc: 'Inverter readings in kWh will show energy generated and the estimated fuel displaced, once documented.' },
      cooling: { label: 'Cooling efficiency', title: 'Cooling energy performance', desc: 'Measured cooling electricity will be compared with a documented reference cooling scenario.' },
    } satisfies Record<Metric, { label: string; title: string; desc: string }>,
    planned: 'Monthly reporting · planned',
    empty: 'No validated series yet',
    chartFoot: 'Actual measurements will replace this empty-state chart only after quality review.',
    sourcesKicker: 'Data sources',
    sourcesTitle: "What we'll measure aboard.",
    sources: [
      ['Marine fuel consumption', 'Fuel logs'],
      ['Solar production', 'Inverter meter'],
      ['Cooling system electricity', 'Energy meter'],
      ['Generator electricity', 'Generator meter'],
      ['Voyage distance & guests', 'Trip manifest'],
    ] as [string, string][],
    sourcesNote: 'These are proposed data feeds for the dashboard, not claims that sensors or a public telemetry feed are currently connected.',
  },
  beyond: {
    eyebrow: '04 — Beyond carbon',
    title: 'Protecting more',
    titleEm: 'than the atmosphere.',
    lede: 'The environmental health of the bay is about water, materials and people, too. These indicators are tracked separately from greenhouse gases.',
    items: [
      { title: 'Water stewardship', body: 'Biological wastewater treatment is designed to protect marine habitats. Future reporting will focus on treatment volumes and applicable quality checks.', status: 'Reporting planned' },
      { title: 'Less single-use plastic', body: 'Refillable bottles, bulk amenities and supplier packaging initiatives aim to reduce disposable materials across each voyage.', status: 'Measurement method to be defined' },
      { title: 'The communities of the bay', body: 'Local sourcing, skills development and community participation form a wider commitment to responsible tourism.', status: 'Programme in development' },
    ],
  },
  method: {
    eyebrow: '05 — Our reporting principles',
    title: 'Open about',
    titleEm: 'the numbers.',
    lede: 'A beautiful dashboard is only useful when every figure can be understood, challenged and improved.',
    intro:
      'We intend to document the measurement period, reporting boundary, reference scenario and calculation method behind every climate-related figure before describing it as an achieved reduction.',
    items: [
      {
        q: 'Actual emissions vs. avoided emissions',
        a: "Actual direct fuel-combustion emissions are calculated from recorded fuel use and a fuel-specific emissions factor. Avoided emissions are a separate estimate against a justified baseline. They should never be subtracted from the vessel's gross emissions inventory or described as carbon removal.",
      },
      {
        q: 'How the baseline will be established',
        a: 'We will compare like-for-like energy services over a defined period: equivalent route, weather and vessel load where relevant. Solar generation, cooling and recovered heat must not count the same saved fuel more than once. Assumptions and exclusions should be disclosed.',
      },
      {
        q: 'What gets checked before publication',
        a: 'Operational meters and fuel logs should be reviewed for completeness; the emission factor must match the actual fuel. Vessel occupancy, voyage distance and timeframes will be kept with the measurements. Verified status will only be used when the level and provider of verification are explicitly documented.',
      },
      {
        q: 'Targets, forecasts and certifications',
        a: 'Projected technologies and potential savings are planning estimates. Actual outcomes are published only when monitored. Green Globe is currently listed as in progress; it should not be presented as an earned certification.',
      },
    ],
    noteTitle: 'Methodology note · prototype',
    note: 'Reference framework: GHG Protocol principles for separately reporting avoided emissions. This page is a proposed reporting design, not a third-party assurance statement or real-time emissions feed.',
  },
  cta: {
    kicker: 'The future of thoughtful travel',
    title: 'Discover the bay.',
    titleEm: 'Help care for it.',
    body: "Explore Green Ruby's voyages and the evolving commitments behind a more considered way to travel.",
    button: 'Explore our journeys',
  },
};

export type EcoMessages = typeof en;

const vi: EcoMessages = {
  metaTitle: 'Báo cáo tác động môi trường | Green Ruby Cruises',
  metaDescription:
    'Mục tiêu môi trường, mức giảm carbon dự kiến và hành trình minh bạch của Green Ruby Cruises hướng tới du thuyền ít tác động, được đo lường thực tế.',
  breadcrumb: 'Báo cáo sinh thái',
  hero: {
    kicker: 'Bảng theo dõi tác động môi trường Green Ruby',
    title: 'Dấu chân nhẹ hơn.',
    titleEm: 'Chân trời tươi sáng hơn.',
    body: 'Những hành trình đặc biệt xứng đáng được chăm chút đặc biệt. Khám phá công nghệ đứng sau các mục tiêu bền vững của chúng tôi, và theo dõi tiến trình khi các ước tính thiết kế trở thành kết quả đo lường thực tế.',
    primary: 'Khám phá tác động',
    secondary: 'Cách chúng tôi đo lường',
    mark: 'Sang trọng có trách nhiệm · Báo cáo minh bạch',
  },
  status: {
    label: 'Trạng thái báo cáo (thử nghiệm):',
    body: 'trang này chưa được kết nối với bộ dữ liệu vận hành đã kiểm chứng.',
    link: 'Hiểu về các số liệu',
  },
  snapshot: {
    eyebrow: '01 — Tổng quan tác động',
    title: 'Mỗi con số có ý nghĩa',
    titleEm: 'đều bắt đầu từ bằng chứng.',
    lede: 'Tách bạch rõ ràng giữa lợi ích dự kiến và lượng phát thải thực tế là cốt lõi trong cách chúng tôi báo cáo.',
    shipsLabel: 'Chọn tàu',
    primaryLabel: 'Lượng CO₂ tránh được (đo thực tế)',
    pill: 'Đang chờ kiểm chứng',
    unit: 'tCO₂ / năm',
    notMeasured: 'Chưa được đo',
    solarLabel: 'Năng lượng mặt trời hỗ trợ',
    solarWarn: 'Ước tính thiết kế · chưa phải dữ liệu vận hành đã kiểm chứng',
    coolingLabel: 'Làm mát bằng nước biển',
    coolingWarn: 'Mục tiêu riêng cho hệ thống làm mát · không phải CO₂ toàn tàu',
    ships: [
      {
        label: 'Green Ruby 1',
        meta: 'Green Ruby 1 · Vịnh Hạ Long',
        solar: '~25%',
        cooling: '~40%',
        desc: 'Lượng carbon tiết kiệm thực tế sẽ hiển thị tại đây khi có dữ liệu kỹ thuật, đường cơ sở được ghi nhận và kỳ báo cáo.',
        solarDesc: 'Ước tính đã công bố trước đây về tỷ lệ điện trên tàu do năng lượng mặt trời cung cấp vào ban ngày.',
        coolingDesc: 'Mức giảm năng lượng dự kiến của hệ thống làm mát so với một hệ thống làm mát thông thường tương đương.',
      },
      {
        label: 'Green Ruby 2',
        meta: 'Green Ruby 2 · Vịnh Lan Hạ',
        solar: '—',
        cooling: '—',
        desc: 'Green Ruby 2 chưa có bộ dữ liệu phát thải hằng năm hay mục tiêu thiết kế được kiểm chứng riêng để công bố.',
        solarDesc: 'Ước tính năng lượng mặt trời riêng cho tàu này chưa được xác nhận để công bố.',
        coolingDesc: 'Mục tiêu làm mát riêng cho tàu này chưa được xác nhận để công bố.',
      },
    ],
    whyTitle: 'Vì sao không hiển thị bộ đếm CO₂ chạy liên tục?',
    whyBody:
      'Một con số tiết kiệm chạy liên tục sẽ ngụ ý rằng chúng tôi đã đo được lượng phát thải. Thay vào đó, báo cáo của chúng tôi phân biệt dự báo thiết kế, phát thải đo được và mức giảm so với đường cơ sở được ghi nhận. Các ước tính công khai trước đây, bao gồm con số khoảng 60 tCO₂/năm từ năng lượng mặt trời trong phiên bản cũ của trang Giới thiệu, đang được đánh giá lại và không được báo cáo ở đây như kết quả đã đạt được.',
  },
  technology: {
    eyebrow: '02 — Thiết kế để tạo khác biệt',
    title: 'Công nghệ',
    titleEm: 'có mục đích.',
    lede: 'Ba giải pháp kỹ thuật nhằm dùng ít nhiên liệu và năng lượng hơn. Mỗi giải pháp sẽ được đánh giá riêng, không tính trùng mức giảm carbon.',
    items: [
      {
        kicker: '01 / Ánh nắng',
        title: 'Năng lượng mặt trời hỗ trợ',
        body: 'Hệ thống điện mặt trời trên mái được thiết kế để cấp điện cho các phụ tải trên tàu vào ban ngày và giảm tải cho máy phát. Báo cáo sắp tới sẽ thể hiện số kWh điện mặt trời, nhiên liệu máy phát và ước tính phát thải tương ứng.',
        tag: 'Theo dõi · kWh điện mặt trời',
      },
      {
        kicker: '02 / Biển cả',
        title: 'Làm mát bằng nước biển',
        body: 'Hiệu suất làm mát được thiết kế để cải thiện nhờ công nghệ hỗ trợ bằng nước biển. Mọi mức giảm năng lượng phải được so với một hệ thống làm mát thông thường tương đương — không phải với toàn bộ con tàu.',
        tag: 'Theo dõi · kWh làm mát tiết kiệm',
      },
      {
        kicker: '03 / Năng lượng tuần hoàn',
        title: 'Thu hồi & tái sử dụng nhiệt',
        body: 'Nhiệt thải từ động cơ đẩy và máy phát có thể hỗ trợ hệ thống nước nóng và tiện nghi trên tàu. Mức tiết kiệm sẽ được đo riêng và kiểm tra để tránh trùng lặp với các hệ thống khác.',
        tag: 'Theo dõi · kWh nhiệt thu hồi',
      },
    ],
    foot: 'Các tính năng kỹ thuật mô tả cách vận hành dự kiến, chưa phải hiệu suất được kiểm chứng độc lập.',
    footLink: 'Triết lý bền vững của chúng tôi',
  },
  reporting: {
    eyebrow: '03 — Từ ý định đến công cụ đo',
    title: 'Những con số',
    titleEm: 'chúng tôi sẽ công bố.',
    lede: 'Khi có bằng chứng vận hành, du khách có thể so sánh giữa các chuyến đi, các tháng và các tàu mà không nhầm lẫn giữa dự báo và hiệu suất thực tế.',
    metricsLabel: 'Chọn bộ dữ liệu môi trường',
    metrics: {
      fuel: { label: 'Nhiên liệu & CO₂', title: 'Tiêu thụ nhiên liệu & phát thải', desc: 'Nhật ký nhiên liệu từng chuyến và hệ số phát thải theo loại nhiên liệu sẽ được dùng để tính lượng phát thải thực tế.' },
      solar: { label: 'Năng lượng mặt trời', title: 'Sản lượng điện mặt trời trên mái', desc: 'Số đo kWh từ biến tần sẽ cho thấy điện năng tạo ra và lượng nhiên liệu ước tính được thay thế, khi đã được ghi nhận.' },
      cooling: { label: 'Hiệu suất làm mát', title: 'Hiệu suất năng lượng làm mát', desc: 'Điện năng làm mát đo được sẽ được so sánh với một kịch bản làm mát tham chiếu đã ghi nhận.' },
    },
    planned: 'Báo cáo hằng tháng · dự kiến',
    empty: 'Chưa có chuỗi dữ liệu kiểm chứng',
    chartFoot: 'Số liệu thực tế chỉ thay thế biểu đồ trống này sau khi đã được rà soát chất lượng.',
    sourcesKicker: 'Nguồn dữ liệu',
    sourcesTitle: 'Những gì chúng tôi sẽ đo trên tàu.',
    sources: [
      ['Tiêu thụ nhiên liệu tàu', 'Nhật ký nhiên liệu'],
      ['Sản lượng điện mặt trời', 'Đồng hồ biến tần'],
      ['Điện năng hệ thống làm mát', 'Đồng hồ điện năng'],
      ['Điện năng máy phát', 'Đồng hồ máy phát'],
      ['Quãng đường & số khách', 'Danh sách chuyến đi'],
    ],
    sourcesNote: 'Đây là các nguồn dữ liệu dự kiến cho bảng theo dõi, không có nghĩa là cảm biến hay luồng dữ liệu công khai đã được kết nối.',
  },
  beyond: {
    eyebrow: '04 — Không chỉ là carbon',
    title: 'Bảo vệ nhiều hơn',
    titleEm: 'bầu khí quyển.',
    lede: 'Sức khỏe môi trường của vịnh còn là nước, vật liệu và con người. Các chỉ số này được theo dõi riêng với khí nhà kính.',
    items: [
      { title: 'Bảo vệ nguồn nước', body: 'Hệ thống xử lý nước thải sinh học được thiết kế để bảo vệ môi trường sống dưới biển. Báo cáo sắp tới sẽ tập trung vào lượng nước được xử lý và các kiểm tra chất lượng liên quan.', status: 'Dự kiến báo cáo' },
      { title: 'Giảm nhựa dùng một lần', body: 'Bình nước dùng lại, tiện nghi đóng chai lớn và các sáng kiến bao bì cùng nhà cung cấp nhằm giảm vật liệu dùng một lần trên mỗi chuyến đi.', status: 'Phương pháp đo đang được xác định' },
      { title: 'Cộng đồng quanh vịnh', body: 'Ưu tiên nguồn cung địa phương, phát triển kỹ năng và sự tham gia của cộng đồng là một phần trong cam kết du lịch có trách nhiệm.', status: 'Chương trình đang phát triển' },
    ],
  },
  method: {
    eyebrow: '05 — Nguyên tắc báo cáo',
    title: 'Minh bạch về',
    titleEm: 'các con số.',
    lede: 'Một bảng theo dõi đẹp chỉ hữu ích khi mọi con số đều có thể được hiểu, chất vấn và cải thiện.',
    intro:
      'Chúng tôi sẽ ghi nhận kỳ đo, phạm vi báo cáo, kịch bản tham chiếu và phương pháp tính đằng sau mỗi con số liên quan đến khí hậu trước khi mô tả nó là mức giảm đã đạt được.',
    items: [
      {
        q: 'Phát thải thực tế và phát thải tránh được',
        a: 'Phát thải trực tiếp từ đốt nhiên liệu được tính từ lượng nhiên liệu ghi nhận và hệ số phát thải theo loại nhiên liệu. Phát thải tránh được là một ước tính riêng so với đường cơ sở hợp lý. Con số này không bao giờ được trừ vào tổng phát thải của tàu hay mô tả như việc loại bỏ carbon.',
      },
      {
        q: 'Cách xác lập đường cơ sở',
        a: 'Chúng tôi sẽ so sánh các dịch vụ năng lượng tương đương trong một khoảng thời gian xác định: cùng tuyến, điều kiện thời tiết và tải của tàu khi phù hợp. Điện mặt trời, làm mát và nhiệt thu hồi không được tính cùng một lượng nhiên liệu tiết kiệm nhiều lần. Các giả định và loại trừ cần được công bố.',
      },
      {
        q: 'Những gì được kiểm tra trước khi công bố',
        a: 'Đồng hồ vận hành và nhật ký nhiên liệu cần được rà soát tính đầy đủ; hệ số phát thải phải khớp với loại nhiên liệu thực tế. Công suất khách, quãng đường và thời gian sẽ được lưu cùng số đo. Trạng thái "đã kiểm chứng" chỉ được dùng khi cấp độ và đơn vị kiểm chứng được ghi rõ.',
      },
      {
        q: 'Mục tiêu, dự báo và chứng nhận',
        a: 'Các công nghệ dự kiến và mức tiết kiệm tiềm năng là ước tính để lập kế hoạch. Kết quả thực tế chỉ được công bố khi đã được theo dõi. Chứng nhận Green Globe hiện đang trong quá trình thực hiện và không được trình bày như một chứng nhận đã đạt.',
      },
    ],
    noteTitle: 'Ghi chú phương pháp · thử nghiệm',
    note: 'Khung tham chiếu: nguyên tắc của GHG Protocol về báo cáo riêng phát thải tránh được. Trang này là thiết kế báo cáo đề xuất, không phải tuyên bố đảm bảo của bên thứ ba hay luồng dữ liệu phát thải thời gian thực.',
  },
  cta: {
    kicker: 'Tương lai của du lịch tinh tế',
    title: 'Khám phá vịnh.',
    titleEm: 'Cùng chăm sóc vịnh.',
    body: 'Khám phá các hành trình của Green Ruby và những cam kết không ngừng phát triển cho một cách du lịch tinh tế hơn.',
    button: 'Khám phá hành trình',
  },
};

export const ecoMessages: Record<Locale, EcoMessages> = { en, vi };
export type { Metric };
