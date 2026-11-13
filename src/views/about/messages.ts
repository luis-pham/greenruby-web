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

const ko: AboutMessages = {
  metaTitle: 'Green Ruby Cruises 소개',
  metaDescription:
    'Green Ruby 이야기: 절제된 럭셔리, 환경을 고려해 설계한 선박, 그리고 하롱베이·란하베이와 그 지역 공동체와의 더 깊은 관계를 소개합니다.',
  breadcrumb: '회사 소개',
  hero: {
    eyebrow: 'Green Ruby Cruises 이야기',
    title: '럭셔리는 그대로,',
    titleEm: '흔적은 가볍게.',
    body: '베트남의 바다를 품격 있게 경험하는 방법은 그 아름다움을 존중하고, 주변 환경을 함께 돌보는 여행이라고 믿습니다.',
    primary: 'Green Ruby 이야기',
    secondary: '우리의 약속',
  },
  values: {
    label: 'Green Ruby의 철학을 이루는 것',
    items: [
      { icon: 'compass', tag: '철학', title: '의식 있는 럭셔리', body: '방해 요소는 줄이고, 물 위에서의 의미 있는 순간은 늘립니다.' },
      { icon: 'leaf', tag: '환경', title: '바다를 존중합니다', body: '환경 부담을 줄이도록 설계한 기술과 일상의 선택.' },
      { icon: 'people', tag: '지역 공동체', title: '지역과 함께', body: '이 지역의 사람들, 전통과 더 가까이 연결됩니다.' },
    ],
  },
  subnav: {
    label: '회사 소개 페이지 목차',
    story: 'Green Ruby 이야기',
    approach: '우리의 방식',
    community: '지역 공동체',
    collection: '선박 소개',
    progress: '진행 현황',
  },
  story: {
    eyebrow: 'Green Ruby 이야기',
    title: '이 바다에는',
    titleEm: '더 나은 방식이 필요합니다.',
    lead: '어떤 곳은 걸음을 늦추고, 더 가까이 들여다보고, 다르게 여행하기를 청합니다.',
    link: '선박 소개 보기',
    stamp: ['더 신중하게', '바다를', '여행하는 법'],
  },
  statement: {
    index: 'Green Ruby의 관점',
    line1: '진정한 럭셔리는 더 많이 갖는 것이 아닙니다.',
    line2: '정말 중요한 것을',
    em: '발견하는 일입니다.',
    footer: '숨 쉴 여유. 서로 이어지는 시간. 지켜야 할 바다.',
  },
  technology: {
    eyebrow: '의도를 담은 설계',
    title: '사려 깊은 여행의',
    titleEm: '새로운 기준.',
    body: '바다를 돌보는 일은 보이지 않는 곳에서 시작됩니다. Green Ruby의 선박은 효율적인 설비와 일상 운영의 실질적인 변화를 함께 갖추었습니다.',
    micro: '기술과 설계',
    foot: '설계 목표',
    qualifier:
      '설계 특징과 환경 목표는 선박이 운항하도록 계획된 방식을 설명한 것으로, 독립적으로 검증된 운항 결과가 아닙니다.',
  },
  impact: {
    eyebrow: '환경 영향',
    wastewater: '폐수 처리율(설계 사양)',
    co2: '연간 CO₂ 감축량(톤, 태양광, 추정치)',
    solar: '상부 태양광 발전 설비',
  },
  community: {
    eyebrow: '선박 너머로',
    title: '우리의 터전.',
    titleEm: '우리의 책임.',
    body: '여행지를 지킨다는 것은 그곳을 삶의 터전으로 삼은 사람들에게 투자하는 일이기도 합니다.',
    link: '팀에 문의하기',
  },
  collection: {
    eyebrow: '선박 소개',
    title: (n: number): string => (n === 2 ? '두 척의 선박.' : 'Green Ruby 선단.'),
    titleEm: '하나의 철학.',
    body: '서로 다른 바다, 같은 마음가짐. Green Ruby가 펼치는 두 가지 여정과 각 선박이 향하는 곳을 만나 보세요.',
    vessel: (i: number, bay: string | null) => `선박 ${String(i).padStart(2, '0')}${bay ? ` / ${bay}` : ''}`,
    explore: (name: string) => `${name} 보기`,
  },
  standards: {
    eyebrow: '진행 상황을 투명하게',
    title: '신뢰는',
    titleEm: '투명함에서 시작됩니다.',
    body: '이미 인증을 받은 것처럼 말하기보다 준비 과정을 그대로 공유하겠습니다. 현재 진행 상황은 다음과 같습니다.',
    label: '지속 가능성 관련 현황',
    // Like German, French and Spanish: the about page links the eco article only in English, so Korean readers get
    // only the brand facts link (an English-only page).
    guide: null,
    facts: '지속 가능성 수치별 현황 (영어)',
  },
  cta: {
    eyebrow: '바다를 바라보는 다른 시선',
    title: '아름답게 여행하고,',
    titleEm: '사려 깊게 떠나세요.',
    body: '빼어난 풍경, 넉넉한 편안함, 그리고 그곳과의 깊은 교감이 어우러진 Green Ruby의 여정을 찾아보세요.',
    primary: '일정 보기',
    secondary: '팀에 문의하기',
  },
  honest: {
    solar: '상부 갑판의 약 70kW 태양광 발전 설비(설계 사양)가 낮 동안 조명, 온수, 선내 설비에 전력을 보탭니다. 해수 냉각 방식의 에어컨과 함께 선내 에너지 사용량을 약 40% 줄이도록 설계했으며(설계 단계 추정치), 실제 절감량은 운항을 시작한 뒤 측정해 공개하겠습니다.',
    water: '설계상 선내 폐수 100%는 배출 전에 생물학적 폐수 처리 시스템을 거치도록 되어 있어, 만의 섬세한 해양 생태계를 보호합니다. 실제 운항에서 검증할 예정입니다.',
    plastic: '리필용 병, 대용량 디스펜서 어메니티, 플라스틱을 줄인 납품 포장은 선상 일상 운영 계획의 일부입니다. 일회용 플라스틱은 단계적으로 줄여 나갑니다.',
    energy: '폐열 회수 시스템이 엔진과 발전기에서 나오는 열을 버리지 않고 온수와 냉난방에 다시 활용합니다.',
    local: '가능한 한 지역 어민과 농민에게서 식재료를 조달하고, 승무원 채용과 교육에서 지역 인재를 우선하려 합니다.',
    cleanup: '고객이 함께할 수 있는 해안 정화 활동과, 이 바다의 생태계 및 여행자가 환경 부담을 줄이는 방법에 관한 선상 강연을 계획하고 있습니다.',
    culture: '지역 학교의 환경 교육, 청년들의 해양 분야 진로, 그리고 이 지역의 공예와 전통을 이어 가는 협력을 지원하고자 합니다.',
  },
};

export const aboutMessages = byLocale<AboutMessages>({ en, vi, ja, fr, es, de, ko });

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
