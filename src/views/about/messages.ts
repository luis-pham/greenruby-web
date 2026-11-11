import { byLocale, type Locale } from '@/lib/i18n';

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
    body: "We believe the best way to experience Vietnam's bays is one that respects their beauty — and helps care for the world around them.",
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
    line1: 'True luxury isn’t having more.',
    line2: 'It’s discovering',
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
    body: 'Chúng tôi tin rằng cách tốt nhất để khám phá các vịnh của Việt Nam là trân trọng vẻ đẹp ấy — và góp phần gìn giữ thế giới quanh mình.',
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
    link: 'Tìm hiểu hai du thuyền',
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

const ja: AboutMessages = {
  metaTitle: 'Green Ruby Cruisesについて',
  metaDescription:
    'Green Rubyのストーリー。心配りの行き届いたラグジュアリー、環境に配慮した船の設計、ハロン湾・ランハ湾とその地域社会とのつながりをご紹介します。',
  breadcrumb: 'Green Rubyについて',
  hero: {
    eyebrow: 'Green Ruby Cruisesのストーリー',
    title: 'ラグジュアリーを、',
    titleEm: '環境への負荷を抑えて',
    body: 'ベトナムの湾をもっとも上質に体験する方法とは、その美しさを尊重し、周りの世界を守ることにも貢献する旅だと私たちは考えています。',
    primary: 'ストーリーを読む',
    secondary: '私たちの取り組み',
  },
  values: {
    label: 'Green Rubyの考え方を形づくるもの',
    items: [
      { icon: 'compass', tag: '理念', title: '心を配るラグジュアリー', body: '余計なものを減らし、水上で過ごす意味のある時間を増やす。' },
      { icon: 'leaf', tag: '環境', title: '湾を敬う', body: '環境への負荷を抑えるために考えられた技術と、日々の選択。' },
      { icon: 'people', tag: '地域', title: 'この土地とともに', body: 'この地域の人々や伝統と、より身近につながること。' },
    ],
  },
  subnav: {
    label: 'このページのセクション',
    story: 'ストーリー',
    approach: '私たちの考え方',
    community: '地域社会',
    collection: '船のご紹介',
    progress: '取り組みの状況',
  },
  story: {
    eyebrow: 'ストーリー',
    title: 'この湾には、',
    titleEm: 'もっとふさわしい旅を',
    lead: 'ゆっくりと過ごし、よく目を凝らし、いつもとは違う旅をしたくなる場所があります。',
    link: '船を見る',
    stamp: ['より丁寧な', '船旅の', 'かたち'],
  },
  statement: {
    index: 'Green Rubyの視点',
    line1: '本当のラグジュアリーとは、より多くを持つことではありません。',
    line2: '大切なものに',
    em: '気づくことです。',
    footer: 'ゆったりと過ごす余白。人とつながる場所。守るべき湾。',
  },
  technology: {
    eyebrow: '意図を込めた設計',
    title: '思慮深い旅の、',
    titleEm: '新しいスタンダード',
    body: '湾を大切にする取り組みは、見えないところから始まります。当社の船は、効率的な設備と、日々の運航における実践的な工夫を組み合わせています。',
    micro: 'テクノロジーとデザイン',
    foot: '設計上の取り組み',
    qualifier:
      '設計上の特徴と環境面の目標は、船の運航方針として想定しているものであり、第三者によって検証された運航実績ではありません。',
  },
  impact: {
    eyebrow: '環境への取り組み',
    wastewater: '排水処理率',
    co2: '年間のCO₂削減量（トン、太陽光発電による推計）',
    solar: '屋上の太陽光パネル',
  },
  community: {
    eyebrow: '船の外へ',
    title: '私たちの故郷、',
    titleEm: '私たちの責任',
    body: 'ある土地を守ることは、そこで暮らす人々を支えることでもあります。',
    link: 'スタッフに相談する',
  },
  collection: {
    eyebrow: '船のご紹介',
    title: (n: number): string => (n === 2 ? '2隻の船。' : '当社の船。'),
    titleEm: 'ひとつの理念',
    body: '異なる海域でも、変わらない心配りを。Green Rubyの各船の個性と、それぞれが向かう場所をご紹介します。',
    vessel: (i: number, bay: string | null) => `船${String(i).padStart(2, '0')}${bay ? ` / ${bay}` : ''}`,
    explore: (name: string) => `${name}を見る`,
  },
  standards: {
    eyebrow: '取り組みの状況を公開',
    title: '信頼は、',
    titleEm: '透明性から生まれます',
    body: 'まだ取得していない認証を取得済みであるかのように示すのではなく、取り組みの過程をお伝えしたいと考えています。現在の状況は次のとおりです。',
    label: '環境認証への取り組み',
    // No Japanese eco article exists; like Vietnamese, Japanese readers get only the brand facts link.
    guide: null,
    facts: '環境に関する各数値の現状',
  },
  cta: {
    eyebrow: '湾のもうひとつの楽しみ方',
    title: '美しい旅を、',
    titleEm: '湾への思いやりとともに',
    body: '壮大な景観、ゆったりとした快適さ、そしてより深いつながりが重なり合う、Green Rubyのクルーズをお選びください。',
    primary: 'クルーズ行程を見る',
    secondary: 'スタッフに相談する',
  },
  honest: {
    solar: '屋上の約70kWの太陽光パネルが、日中の照明、給湯、船内設備の電力の一部をまかないます。海水冷却式の空調と組み合わせ、船内のエネルギー使用量を約40%削減することを目指して設計されています。実際の削減量は運航開始後にご報告します。',
    water: '湾の繊細な海洋環境を守るため、排水は100%、船内で生物処理を行ってから排出します。',
    plastic: '詰め替え式のボトル、大容量タイプのアメニティ、プラスチックを減らした仕入れ先の梱包は、船内の日常運営の計画に含まれています。',
    energy: '排熱回収システムにより、エンジンと発電機の排熱を無駄にせず、給湯と空調に再利用します。',
    local: '食材はできる限り地元の漁師や農家から調達し、乗組員の採用と育成では地元の人材を優先することを目指しています。',
    cleanup: 'お客様にもご参加いただける海岸清掃や、湾の生態系と旅行者が環境負荷を減らす方法についての船内トークを予定しています。',
    culture: '地元の学校での環境学習、若者が海の仕事に就くための道づくり、湾の工芸や伝統を受け継ぐための協力を支援していきたいと考えています。',
  },
};

const fr: AboutMessages = {
  metaTitle: 'À propos de Green Ruby Cruises',
  metaDescription:
    "L’histoire de Green Ruby : un luxe réfléchi, des navires conçus pour réduire leur empreinte et un lien étroit avec la baie d’Halong, la baie de Lan Ha et leurs habitants.",
  breadcrumb: 'À propos',
  hero: {
    eyebrow: "L’histoire de Green Ruby Cruises",
    title: 'Le luxe, avec',
    titleEm: 'une empreinte plus légère.',
    body: "Nous pensons que la plus belle façon de découvrir les baies du Vietnam est celle qui respecte leur beauté et contribue à préserver le monde qui les entoure.",
    primary: 'Découvrir notre histoire',
    secondary: 'Nos engagements',
  },
  values: {
    label: 'Ce qui façonne la philosophie Green Ruby',
    items: [
      { icon: 'compass', tag: 'Philosophie', title: 'Une autre idée du luxe', body: "Moins de distractions, plus d’instants qui comptent sur l’eau." },
      { icon: 'leaf', tag: 'Environnement', title: 'Respecter la baie', body: 'Des technologies et des choix quotidiens pensés pour réduire notre empreinte.' },
      { icon: 'people', tag: 'Communauté', title: 'Ancrés dans le territoire', body: 'Des liens plus étroits avec les habitants et les traditions de la région.' },
    ],
  },
  subnav: {
    label: 'Sections de la page À propos',
    story: 'Notre histoire',
    approach: 'Notre démarche',
    community: 'Communauté locale',
    collection: 'Nos navires',
    progress: 'Où nous en sommes',
  },
  story: {
    eyebrow: 'Notre histoire',
    title: 'La baie mérite',
    titleEm: 'mieux.',
    lead: "Certains lieux nous invitent à ralentir, à regarder de plus près et à voyager autrement.",
    link: 'Découvrir nos navires',
    stamp: ['Une façon', 'plus réfléchie', 'de naviguer'],
  },
  statement: {
    index: 'Le regard Green Ruby',
    line1: "Le vrai luxe, ce n’est pas d’avoir plus.",
    line2: "C’est découvrir",
    em: 'ce qui compte.',
    footer: "De l’air pour respirer. De l’espace pour se retrouver. Une baie qui mérite d’être protégée.",
  },
  technology: {
    eyebrow: 'Une conception réfléchie',
    title: 'Notre démarche pour un',
    titleEm: 'voyage plus responsable.',
    body: "Prendre soin de la baie commence en coulisses. Nos navires associent des équipements efficaces à des choix concrets dans notre fonctionnement au quotidien.",
    micro: 'Technologie et conception',
    foot: 'Objectifs de conception',
    qualifier:
      "Les caractéristiques de conception et les objectifs environnementaux décrivent le fonctionnement prévu de nos navires ; il ne s’agit pas de résultats d’exploitation vérifiés de manière indépendante.",
  },
  impact: {
    eyebrow: 'Notre impact',
    wastewater: 'Eaux usées traitées',
    co2: 'Tonnes de CO₂ évitées par an (solaire, estimation)',
    solar: 'Panneaux solaires en toiture',
  },
  community: {
    eyebrow: 'Au-delà du navire',
    title: 'Notre territoire.',
    titleEm: 'Notre responsabilité.',
    body: "Protéger une destination, c’est aussi s’engager auprès de celles et ceux qui y vivent.",
    link: 'Contacter notre équipe',
  },
  collection: {
    eyebrow: 'Nos navires',
    title: (n: number): string => (n === 2 ? 'Deux navires.' : 'Notre flotte.'),
    titleEm: 'Une même philosophie.',
    body: "Deux baies différentes, la même attention à bord. Découvrez les deux visages de l’expérience Green Ruby et les baies où nos navires vous emmènent.",
    vessel: (i: number, bay: string | null) => `Navire ${String(i).padStart(2, '0')}${bay ? ` / ${bay}` : ''}`,
    explore: (name: string) => `Découvrir ${name}`,
  },
  standards: {
    eyebrow: 'Transparents sur nos progrès',
    title: 'La confiance se construit',
    titleEm: 'dans la transparence.',
    body: "Nous préférons partager notre démarche plutôt que laisser croire qu’une certification a déjà été obtenue. Voici où nous en sommes aujourd’hui.",
    label: 'Démarches de certification environnementale',
    // No French eco article exists; like Vietnamese and Japanese, French readers get only the brand facts link.
    guide: null,
    facts: "Les chiffres environnementaux et leur statut",
  },
  cta: {
    eyebrow: 'Une autre façon de voir la baie',
    title: 'Voyager avec élégance.',
    titleEm: 'Respecter les lieux.',
    body: 'Trouvez la croisière Green Ruby qui réunit paysages grandioses, confort généreux et un lien plus profond avec les lieux.',
    primary: 'Découvrir nos itinéraires',
    secondary: 'Contacter notre équipe',
  },
  honest: {
    solar: "Des panneaux solaires d’environ 70 kW installés en toiture contribuent, le jour, à alimenter l’éclairage, la production d’eau chaude et les équipements de bord. Associés à une climatisation à eau de mer, ils sont conçus pour réduire d’environ 40 % la consommation d’énergie à bord ; les économies mesurées seront publiées une fois les navires en service.",
    water: "100 % des eaux usées font l’objet d’un traitement biologique à bord avant leur rejet, afin de protéger les fragiles habitats marins de la baie.",
    plastic: "Bouteilles réutilisables, produits d’accueil en grand format et emballages fournisseurs allégés en plastique font partie de notre plan pour le fonctionnement quotidien à bord.",
    energy: "Un système récupère la chaleur dégagée par les moteurs et les groupes électrogènes pour la production d’eau chaude et la climatisation.",
    local: "Nous souhaitons nous approvisionner autant que possible auprès des pêcheurs et des agriculteurs locaux, et privilégier les talents de la région pour recruter et former notre équipage.",
    cleanup: "Nous prévoyons des opérations de nettoyage du littoral ouvertes aux passagers, ainsi que des présentations à bord sur l’écosystème de la baie et sur la manière dont les voyageurs peuvent alléger leur impact.",
    culture: "Nous espérons soutenir l’éducation à l’environnement dans les écoles locales, l’accès des jeunes aux métiers de la mer et des collaborations qui font vivre l’artisanat et les traditions de la baie.",
  },
};

const es: AboutMessages = {
  metaTitle: 'Sobre Green Ruby Cruises',
  metaDescription:
    'La historia de Green Ruby: un lujo sereno, barcos diseñados para reducir su huella y un vínculo cercano con la bahía de Halong, la bahía de Lan Ha y su gente.',
  breadcrumb: 'Sobre nosotros',
  hero: {
    eyebrow: 'La historia de Green Ruby Cruises',
    title: 'Lujo con',
    titleEm: 'una huella más ligera.',
    body: 'Creemos que la mejor manera de conocer las bahías de Vietnam es la que respeta su belleza y ayuda a cuidar el entorno que las rodea.',
    primary: 'Conocer nuestra historia',
    secondary: 'Nuestros compromisos',
  },
  values: {
    label: 'Lo que define la filosofía Green Ruby',
    items: [
      { icon: 'compass', tag: 'Filosofía', title: 'Un lujo consciente', body: 'Menos distracciones. Más momentos que importan sobre el agua.' },
      { icon: 'leaf', tag: 'Medio ambiente', title: 'Respetar la bahía', body: 'Tecnología y decisiones diarias pensadas para reducir nuestra huella.' },
      { icon: 'people', tag: 'Comunidad', title: 'Arraigados en el lugar', body: 'Un vínculo más estrecho con la gente y las tradiciones de la región.' },
    ],
  },
  subnav: {
    label: 'Secciones de la página Sobre nosotros',
    story: 'Nuestra historia',
    approach: 'Nuestro enfoque',
    community: 'Comunidad local',
    collection: 'Nuestros barcos',
    progress: 'En qué punto estamos',
  },
  story: {
    eyebrow: 'Nuestra historia',
    title: 'La bahía merece',
    titleEm: 'algo mejor.',
    lead: 'Hay lugares que nos piden ir más despacio, mirar con más atención y viajar de otra manera.',
    link: 'Conocer nuestros barcos',
    stamp: ['Una manera', 'más consciente', 'de navegar'],
  },
  statement: {
    index: 'La mirada Green Ruby',
    line1: 'El verdadero lujo no es tener más.',
    line2: 'Es descubrir',
    em: 'lo que importa.',
    footer: 'Aire para respirar. Espacio para conectar. Una bahía que merece protección.',
  },
  technology: {
    eyebrow: 'Diseñados con intención',
    title: 'Una nueva forma de',
    titleEm: 'viajar con criterio.',
    body: 'Cuidar la bahía empieza por lo que no se ve. Nuestros barcos combinan sistemas eficientes con cambios prácticos en nuestra forma de trabajar cada día.',
    micro: 'Tecnología y diseño',
    foot: 'Compromiso de diseño',
    qualifier:
      'Las características de diseño y los objetivos ambientales describen cómo está previsto que funcionen nuestros barcos; no son resultados de operación verificados de forma independiente.',
  },
  impact: {
    eyebrow: 'Nuestro impacto',
    wastewater: 'Aguas residuales tratadas',
    co2: 'Toneladas de CO₂ evitadas al año (solar, estimación)',
    solar: 'Paneles solares en cubierta',
  },
  community: {
    eyebrow: 'Más allá del barco',
    title: 'Nuestro hogar.',
    titleEm: 'Nuestra responsabilidad.',
    body: 'Proteger un destino también significa apostar por las personas que viven en él.',
    link: 'Hablar con nuestro equipo',
  },
  collection: {
    eyebrow: 'Nuestros barcos',
    title: (n: number): string => (n === 2 ? 'Dos barcos.' : 'Nuestra flota.'),
    titleEm: 'Una misma filosofía.',
    body: 'Aguas distintas, el mismo cuidado. Descubra las dos caras de la experiencia Green Ruby y adónde le llevará cada barco.',
    vessel: (i: number, bay: string | null) => `Barco ${String(i).padStart(2, '0')}${bay ? ` / ${bay}` : ''}`,
    explore: (name: string) => `Descubrir el ${name}`,
  },
  standards: {
    eyebrow: 'Transparencia sobre nuestros avances',
    title: 'La confianza se construye',
    titleEm: 'con transparencia.',
    body: 'Preferimos contar el proceso antes que dar a entender que ya contamos con un certificado. Así están las cosas hoy.',
    label: 'Certificaciones de sostenibilidad',
    // No Spanish eco article exists; like French, Spanish readers get only the brand facts link.
    guide: null,
    facts: 'Estado de cada cifra de sostenibilidad',
  },
  cta: {
    eyebrow: 'Otra manera de ver la bahía',
    title: 'Viajar con belleza.',
    titleEm: 'Partir con respeto.',
    body: 'Encuentre el crucero Green Ruby en el que se unen paisajes extraordinarios, un confort generoso y una conexión más profunda con el lugar.',
    primary: 'Ver nuestros itinerarios',
    secondary: 'Hablar con nuestro equipo',
  },
  honest: {
    solar: 'Unos paneles solares de unos 70 kW en la cubierta superior ayudan, durante el día, a alimentar la iluminación, el agua caliente y los sistemas de a bordo. Junto con el aire acondicionado refrigerado por agua de mar, están diseñados para reducir el consumo de energía a bordo en torno a un 40 %, según las estimaciones de diseño; publicaremos el ahorro medido cuando empecemos a navegar.',
    water: 'El 100 % de las aguas residuales recibe un tratamiento biológico a bordo antes de su vertido, para proteger los delicados hábitats marinos de la bahía.',
    plastic: 'Botellas rellenables, amenities en dispensadores y envases de proveedores con menos plástico forman parte de nuestro plan para el día a día a bordo.',
    energy: 'Un sistema de recuperación del calor residual aprovecha el calor de los motores y generadores para el agua caliente y la climatización, en lugar de desperdiciarlo.',
    local: 'Queremos abastecernos de pescadores y agricultores locales siempre que sea posible, y dar prioridad al talento de la zona al contratar y formar a nuestra tripulación.',
    cleanup: 'Tenemos previstas jornadas de limpieza de la costa abiertas a los huéspedes, junto con charlas a bordo sobre el ecosistema de la bahía y sobre cómo los viajeros pueden reducir su impacto.',
    culture: 'Esperamos apoyar la educación ambiental en las escuelas locales, abrir a los jóvenes el camino hacia las profesiones del mar y colaborar para mantener vivos la artesanía y las tradiciones de la bahía.',
  },
};

const de: AboutMessages = {
  metaTitle: 'Über Green Ruby Cruises',
  metaDescription:
    'Die Geschichte von Green Ruby: leiser Luxus, Schiffe mit kleinerem Fußabdruck und eine enge Verbindung zur Halong-Bucht, zur Lan-Ha-Bucht und ihren Menschen.',
  breadcrumb: 'Über uns',
  hero: {
    eyebrow: 'Die Geschichte von Green Ruby Cruises',
    title: 'Luxus mit',
    titleEm: 'leichterem Fußabdruck.',
    body: 'Wir glauben: Die schönste Art, Vietnams Buchten zu erleben, ist eine, die ihre Schönheit respektiert und hilft, die Umgebung zu schützen.',
    primary: 'Unsere Geschichte',
    secondary: 'Unsere Verpflichtungen',
  },
  values: {
    label: 'Was die Haltung von Green Ruby prägt',
    items: [
      { icon: 'compass', tag: 'Haltung', title: 'Bewusster Luxus', body: 'Weniger Ablenkung. Mehr Momente, die zählen, auf dem Wasser.' },
      { icon: 'leaf', tag: 'Umwelt', title: 'Respekt vor der Bucht', body: 'Technik und tägliche Entscheidungen, die unseren Fußabdruck verringern sollen.' },
      { icon: 'people', tag: 'Gemeinschaft', title: 'Mit der Region verbunden', body: 'Eine engere Verbindung zu den Menschen und Traditionen der Region.' },
    ],
  },
  subnav: {
    label: 'Abschnitte der Seite „Über uns“',
    story: 'Unsere Geschichte',
    approach: 'Unser Ansatz',
    community: 'Gemeinschaft vor Ort',
    collection: 'Unsere Schiffe',
    progress: 'Unser Stand',
  },
  story: {
    eyebrow: 'Unsere Geschichte',
    title: 'Die Bucht verdient',
    titleEm: 'mehr Sorgfalt.',
    lead: 'Manche Orte verlangen, dass wir langsamer werden, genauer hinsehen und anders reisen.',
    link: 'Unsere Schiffe kennenlernen',
    stamp: ['Eine', 'bewusstere Art', 'zu reisen'],
  },
  statement: {
    index: 'Die Sicht von Green Ruby',
    line1: 'Wahrer Luxus heißt nicht, mehr zu haben.',
    line2: 'Sondern zu entdecken,',
    em: 'worauf es ankommt.',
    footer: 'Raum zum Durchatmen. Zeit füreinander. Eine Bucht, die Schutz verdient.',
  },
  technology: {
    eyebrow: 'Mit Bedacht geplant',
    title: 'Ein neuer Maßstab für',
    titleEm: 'bewusstes Reisen.',
    body: 'Der Schutz der Bucht beginnt hinter den Kulissen. Unsere Schiffe verbinden effiziente Systeme mit praktischen Veränderungen im täglichen Betrieb.',
    micro: 'Technik & Design',
    foot: 'Planungsziel',
    qualifier:
      'Ausstattungsmerkmale und Umweltziele beschreiben, wie unsere Schiffe laut Auslegung arbeiten sollen; es handelt sich nicht um unabhängig geprüfte Betriebsergebnisse.',
  },
  impact: {
    eyebrow: 'Unsere Wirkung',
    wastewater: 'Aufbereitetes Abwasser (Auslegung)',
    co2: 'Tonnen CO₂ weniger pro Jahr (Solar, Schätzung)',
    solar: 'Solarmodule auf dem Dach',
  },
  community: {
    eyebrow: 'Über das Schiff hinaus',
    title: 'Unsere Heimat.',
    titleEm: 'Unsere Verantwortung.',
    body: 'Ein Reiseziel zu schützen heißt auch, in die Menschen zu investieren, die dort leben.',
    link: 'Mit unserem Team sprechen',
  },
  collection: {
    eyebrow: 'Unsere Schiffe',
    title: (n: number): string => (n === 2 ? 'Zwei Schiffe.' : 'Unsere Flotte.'),
    titleEm: 'Eine Haltung.',
    body: 'Unterschiedliche Gewässer, dieselbe Sorgfalt. Entdecken Sie die beiden Seiten von Green Ruby und wohin jedes Schiff Sie führt.',
    vessel: (i: number, bay: string | null) => `Schiff ${String(i).padStart(2, '0')}${bay ? ` / ${bay}` : ''}`,
    explore: (name: string) => `${name} entdecken`,
  },
  standards: {
    eyebrow: 'Offen über unseren Stand',
    title: 'Vertrauen entsteht durch',
    titleEm: 'Transparenz.',
    body: 'Wir zeigen lieber den Weg, als den Eindruck zu erwecken, ein Zertifikat sei bereits erteilt. So ist der Stand heute.',
    label: 'Nachhaltigkeitsnachweise',
    // Like French and Spanish: the about page links the eco article only in English, so German readers get only the
    // brand facts link (an English-only page).
    guide: null,
    facts: 'Stand jeder Nachhaltigkeitsangabe (auf Englisch)',
  },
  cta: {
    eyebrow: 'Die Bucht mit anderen Augen sehen',
    title: 'Schön reisen.',
    titleEm: 'Achtsam weiterziehen.',
    body: 'Finden Sie eine Green-Ruby-Kreuzfahrt, die eindrucksvolle Landschaft, großzügigen Komfort und eine tiefere Verbindung zum Ort vereint.',
    primary: 'Reiseverläufe entdecken',
    secondary: 'Mit unserem Team sprechen',
  },
  honest: {
    solar: 'Solarmodule mit rund 70 kW auf dem Oberdeck versorgen tagsüber Beleuchtung, Warmwasserbereitung und Bordsysteme mit. Zusammen mit der meerwassergekühlten Klimaanlage sollen sie den Energieverbrauch an Bord laut Auslegung um etwa 40 % senken; gemessene Einsparungen veröffentlichen wir, sobald wir in Fahrt sind.',
    water: 'Laut Auslegung durchläuft das gesamte Abwasser (100 %) an Bord eine biologische Aufbereitung, bevor es eingeleitet wird, um die empfindlichen Lebensräume der Bucht zu schützen; im Betrieb wird dies noch überprüft.',
    plastic: 'Nachfüllbare Flaschen, Pflegeprodukte in Spendern und Lieferverpackungen mit weniger Kunststoff gehören zu unserem Plan für den Alltag an Bord.',
    energy: 'Ein System zur Abwärmerückgewinnung nutzt die Wärme von Motoren und Generatoren für Warmwasser und Klimatisierung, statt sie ungenutzt zu lassen.',
    local: 'Wir möchten Lebensmittel, wo immer möglich, von Fischern und Landwirten aus der Region beziehen und bei der Einstellung und Ausbildung unserer Crew Menschen aus der Region bevorzugen.',
    cleanup: 'Geplant sind Strandreinigungen, an denen Gäste teilnehmen können, sowie Vorträge an Bord über das Ökosystem der Bucht und darüber, wie Reisende ihren Einfluss verringern können.',
    culture: 'Wir möchten Umweltbildung an Schulen in der Region fördern, jungen Menschen den Weg in maritime Berufe öffnen und Kooperationen unterstützen, die Handwerk und Traditionen der Bucht lebendig halten.',
  },
};

export const aboutMessages = byLocale<AboutMessages>({ en, vi, ja, fr, es, de });

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
