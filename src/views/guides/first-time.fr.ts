import type { GuideContent } from './types';

// French version of first-time.en.ts (the English file is the source of truth). DRAFT, PENDING_REVIEW:
// localised 2026-11-05 for travellers from France following scratchpad/fr/BRIEF-FR.md (owner-confirmed facts, Nov 2026);
// needs native French review. Ship, cabin and itinerary names stay Latin; Gia Luan = « embarcadère de Gia Luan ».
// Machine time values in timeline steps (time fields) are kept as in the source; prose times use the French « 10 h 45 ».
// REVIEW: (1) Lan Ha kayak suspension (local regulations, as of October 2026) added wherever kayaking is listed as included or as an activity (inclusions intro + table row, on-board afternoon); "as of October 2026" added to the which-bay table cell.
// REVIEW: (2) Launch wording: "begin sailing in February 2027" / "enter service" rendered as « premiers départs prévus en février 2027 ».
// REVIEW: (3) Request-only booking: inclusions note and FAQ arrival answer now say departures are not open yet and guests send a « demande de réservation » with their dates; "before confirming a booking" softened accordingly.
// REVIEW: (4) Transfers: timeline "If you book a transfer" made explicit as a private transfer on request at extra cost (no shared shuttle offered by Green Ruby).
// REVIEW: (5) Cancellation summary kept as in the source (30+ days full refund, increasing charges, none within 7 days); no deposit percentages stated.
// REVIEW: (6) Terms to check: « bateau d’excursion » (day boat), « bateau navette » (tender), « limousine partagée » (shared limousine van), « pêche au calmar » (squid fishing).

// Independent AI editorial pass 2026-11-05: natural French reviewed; factual and native-human approval remain pending.
const firstTime: GuideContent = {
  metaTitle: 'Première croisière en baie d’Halong : guide',
  metaDescription:
    'Première croisière en baie d’Halong : choisissez votre itinéraire, comparez les durées et les prestations incluses, et préparez votre embarquement.',
  breadcrumb: 'Guide de la première croisière',
  eyebrow: 'Guide de voyage',
  title: 'Première croisière en baie d’Halong : le guide pratique',
  lead: 'Vous préparez votre première croisière avec nuit à bord en baie d’Halong ou en baie de Lan Ha ? Ce guide vous aide à choisir le bon itinéraire, vous explique comment se passe la vie à bord et rassemble les conseils pratiques pour préparer sereinement votre départ.',
  summaryTitle: 'L’essentiel',
  summary: [
    ['Cela vaut-il la peine ?', 'Oui, à condition de passer au moins une nuit à bord : la baie se révèle sous sa plus belle lumière au coucher du soleil et au petit matin, une fois les bateaux d’excursion à la journée repartis.'],
    ['Combien de temps ?', '**2 jours et 1 nuit** pour une première découverte ; **3 jours et 2 nuits** pour rejoindre des secteurs plus calmes et prendre son temps.'],
    ['Quelle baie ?', 'La **baie d’Halong** pour ses grottes et ses points de vue emblématiques ; la **baie de Lan Ha** pour des eaux plus tranquilles, la vie des villages de l’île de Cat Ba et ses plages.'],
    ['Comment s’y rendre', 'Comptez environ 2 h 30 à 3 h de route entre Hanoï et Tuan Chau (estimation). Consultez notre [guide des transferts](transfer).'],
    ['Jour d’embarquement', 'D’après le programme publié par Green Ruby, enregistrement à partir de 10 h 45 environ, puis transfert en bateau navette vers le navire vers 11 h 45.'],
  ],
  published: '2026-10-24',
  updated: { iso: '2026-10-26', label: 'Mis à jour le 26 octobre 2026' },
  tocTitle: 'Dans ce guide',
  sections: [
    {
      id: 'worth-it',
      title: 'Une croisière avec nuit à bord en baie d’Halong vaut-elle le détour ?',
      blocks: [
        { p: 'La baie d’Halong est inscrite au patrimoine mondial de l’UNESCO pour la beauté remarquable de ses paysages calcaires et pour son intérêt géologique. En 2023, le bien a été étendu à l’archipel de Cat Ba, qui comprend la baie de Lan Ha. Ces paysages d’îles calcaires font une grande partie de son attrait. Ils s’apprécient depuis l’eau, en prenant le temps de les contempler.' },
        { p: 'L’aller-retour dans la journée depuis Hanoï est possible, mais une grande partie du temps se passe sur la route : cinq à six heures environ, aller et retour compris. Une croisière avec nuit à bord permet de profiter de la baie en dehors des heures les plus fréquentées : admirer le coucher du soleil, dormir au milieu des îles calcaires et goûter au calme du petit matin.' },
        { p: 'Une croisière avec nuit à bord conviendra peut-être moins si vous préférez voyager en toute indépendance, passer de longues journées à la plage ou garder un programme entièrement libre. Les activités suivent un itinéraire défini et peuvent évoluer selon la météo, les marées et la réglementation locale.' },
      ],
    },
    {
      id: 'which-bay',
      title: 'Baie d’Halong ou baie de Lan Ha ?',
      blocks: [
        { p: 'Les deux baies partagent le même paysage karstique. Ce qui les distingue, ce sont les activités proposées et l’affluence. Notre [comparatif complet des deux baies](bayComparison) entre dans le détail ; en résumé :' },
        {
          table: {
            head: ['', 'Baie d’Halong', 'Baie de Lan Ha'],
            rows: [
              ['Caractère', 'Le cœur historique du site de l’UNESCO ; des parcours plus fréquentés', 'Au large de l’île de Cat Ba ; moins de bateaux, des mouillages plus calmes'],
              ['Incontournables', '[Grotte Sung Sot](destination:sung-sot-cave), [île Ti Top](destination:ti-top-island), [grotte Luon](destination:luon-cave)', '[Grotte Sang Toi (Dark & Bright Cave)](destination:dark-bright-cave), [lagon Ao Ech](destination:ao-ech-lagoon), [village de Viet Hai](destination:viet-hai-village)'],
              ['Idéal pour', 'Une première visite, pour découvrir les sites les plus célèbres', 'Un rythme plus paisible, des visites de villages et des plages (le kayak en baie de Lan Ha est temporairement suspendu en application de la réglementation locale, d’après les informations d’octobre 2026)'],
              ['Navire Green Ruby', 'Green Ruby 1', 'Green Ruby 2'],
            ],
          },
        },
        { p: 'L’enregistrement des passagers des deux navires Green Ruby se fait à Tuan Chau ; ceux de Green Ruby 2 poursuivent ensuite en bateau navette jusqu’à l’embarcadère de Gia Luan, où ils embarquent en baie de Lan Ha. Retrouvez toutes les escales sur la [carte des sites](destinations).' },
      ],
    },
    {
      id: 'how-long',
      title: 'Croisière à la journée, 2 jours et 1 nuit ou 3 jours et 2 nuits',
      blocks: [
        {
          table: {
            head: ['', 'Croisière à la journée', '2 jours et 1 nuit', '3 jours et 2 nuits'],
            rows: [
              ['Temps passé dans la baie', 'Environ 4 à 6 heures', 'Un peu moins de 24 heures', 'Environ 2 jours, selon l’itinéraire'],
              ['Ce que vous voyez', 'Un seul secteur, généralement le plus fréquenté', 'Deux ou trois escales, le coucher et le lever du soleil', 'Une journée supplémentaire pour explorer des coins plus calmes de la baie'],
              ['Rythme', 'Soutenu', 'Confortable', 'Détendu'],
              ['Pour qui', 'Les emplois du temps très serrés', 'La plupart des voyageurs qui découvrent la baie', 'Les voyageurs en quête de secteurs plus calmes, les familles qui ont du temps'],
            ],
          },
        },
        { p: 'En cas d’hésitation, choisissez 2 jours et 1 nuit. Une croisière de deux nuits convient mieux si vous souhaitez aller plus loin : dans le programme de Green Ruby, la deuxième journée comprend une sortie sur un bateau d’excursion vers [Cua Van](destination:cua-van-floating-village) et la [grotte Tien Ong](destination:tien-ong-cave) en baie d’Halong, ou vers le [village de Viet Hai](destination:viet-hai-village), sur l’île de Cat Ba, en baie de Lan Ha.' },
      ],
    },
    {
      id: 'cabins',
      title: 'Choisir sa cabine et découvrir la vie à bord',
      blocks: [
        { p: 'C’est dans votre cabine que vous vous ressourcerez après une journée de visites : mieux vaut donc comparer autre chose que les photos. La surface, l’emplacement et les équipements peuvent faire une vraie différence pour votre confort à bord.' },
        {
          ul: [
            '**Espace extérieur privatif :** un balcon ou une terrasse vous permet de profiter de la vue sans quitter votre cabine.',
            '**Configuration des lits :** vérifiez s’il s’agit d’un lit double ou de lits jumeaux, et si un lit d’appoint est possible.',
            '**Surface et emplacement :** tenez compte de la superficie, du pont et de la proximité des espaces communs.',
            '**Équipements à bord :** regardez le pont soleil, le restaurant, le salon et l’espace bien-être, ainsi que les équipements de votre cabine. Une cabine plus petite peut tout à fait offrir un séjour confortable, surtout si vous comptez passer du temps sur le pont.',
          ],
        },
        { p: 'Quatre catégories de cabines sont prévues sur Green Ruby 1 et Green Ruby 2 : Serenity Deluxe, Ocean Breeze Premium, Royal Romance Suite et Imperial Suite. Les caractéristiques et équipements définitifs sont à vérifier dans les [informations sur la flotte](/about-us/brand-facts) avant toute réservation.' },
      ],
    },
    {
      id: 'inclusions',
      title: 'Ce qui est inclus, et ce qui est en supplément',
      blocks: [
        { p: 'Le tarif d’une croisière avec nuit à bord comprend généralement l’hébergement, les repas et les visites prévues au programme. Les transferts, les boissons et les services optionnels peuvent être facturés en supplément.' },
        { p: 'Les itinéraires prévus par Green Ruby incluent les repas, les droits d’entrée des sites au programme et des activités comme le kayak ou la barque en bambou (le kayak en baie de Lan Ha est temporairement suspendu en application de la réglementation locale, d’après les informations d’octobre 2026). Les services complémentaires, notamment les transferts et les soins au spa, sont en règle générale facturés à part :' },
        {
          table: {
            head: ['Généralement inclus', 'Généralement en supplément'],
            rows: [
              ['Tous les repas prévus à l’itinéraire (déjeuner, dîner, petit-déjeuner, brunch)', 'Les transferts entre Hanoï ou l’aéroport et Tuan Chau'],
              ['Cabine avec salle de bains privative et climatisation', 'Les boissons, sauf mention contraire'],
              ['Droits d’entrée des visites au programme', 'Les soins au spa'],
              ['Kayak ou barque en bambou aux escales prévues (kayak suspendu en baie de Lan Ha)', 'Les pourboires pour l’équipage et les guides'],
              ['Cours de cuisine et tai-chi matinal ; guide à bord', 'L’assurance voyage et les dépenses personnelles'],
              ['Sortie sur un bateau d’excursion (3 jours et 2 nuits uniquement)', ''],
            ],
          },
        },
        { p: 'Avant d’envoyer votre demande de réservation, vérifiez toujours les prestations incluses et exclues ainsi que les conditions d’annulation de l’[itinéraire](itineraries) choisi, puis relisez la confirmation qui vous sera adressée pour vérifier les prestations retenues. Selon la politique d’annulation publiée par Green Ruby (voir la [FAQ](faq)), toute annulation 30 jours ou plus avant le départ est intégralement remboursée ; les frais augmentent ensuite à mesure que le départ approche, et une annulation à moins de 7 jours du départ n’est pas remboursable. Les conditions applicables sont confirmées lors de la réservation.' },
        { note: 'Les premiers départs des navires Green Ruby sont prévus en février 2027. Les réservations ne sont pas encore ouvertes : vous pouvez dès à présent nous adresser une demande de réservation avec vos dates. Tarifs et dates de départ sont confirmés lors de la réservation.' },
      ],
    },
    {
      id: 'before-you-go',
      title: 'Préparer son départ',
      blocks: [
        {
          ul: [
            '**Passeport :** emportez l’original. Les compagnies de croisière enregistrent chaque passager auprès des autorités portuaires avant l’embarquement.',
            '**Visa et entrée sur le territoire :** vérifiez bien à l’avance les conditions d’entrée au Vietnam en vigueur pour votre nationalité.',
            '**Régime alimentaire et santé :** signalez allergies, régimes particuliers et problèmes de santé dès la réservation, et non le jour du départ sur le quai.',
            '**Assurance voyage :** vivement conseillée, surtout de juin à octobre, lorsque les tempêtes peuvent modifier les départs.',
            '**Paiement :** quelques dongs vietnamiens sont utiles pour les petits achats à terre ; renseignez-vous à l’avance sur les [moyens de paiement](/payment-methods) acceptés à bord.',
          ],
        },
      ],
    },
    {
      id: 'getting-there',
      title: 'De Hanoï au terminal de croisière',
      blocks: [
        { p: 'Tuan Chau se trouve à environ 160–180 km du centre de Hanoï par l’autoroute. Comptez environ 2 h 30 à 3 h en voiture privée, un peu plus en limousine partagée (minibus), qui s’arrête pour d’autres passagers et marque une pause. Tous ces temps sont des estimations : la circulation à la sortie de Hanoï et les week-ends fériés font toute la différence.' },
        { p: 'Les transferts ne sont pas compris dans le tarif de la croisière. Green Ruby peut organiser une voiture privée sur demande, en supplément. Notre [guide des transferts de Hanoï à la baie d’Halong](transfer) compare toutes les options, y compris les arrivées aux aéroports de Noi Bai, Cat Bi et Van Don.' },
      ],
    },
    {
      id: 'boarding-day',
      title: 'Le jour de l’embarquement, heure par heure',
      blocks: [
        { p: 'Sur de nombreuses croisières avec nuit à bord, les passagers s’enregistrent dans un salon à terre avant de rejoindre le navire en bateau navette.' },
        { p: 'Green Ruby prévoit d’accueillir ses passagers à Tuan Chau, avec un transfert différent pour Green Ruby 1 et Green Ruby 2. Choisissez un navire ci-dessous pour découvrir le déroulé prévu du jour d’embarquement. Tous les horaires sont provisoires et peuvent changer selon la météo, les contraintes d’exploitation et les consignes des autorités portuaires.' },
        { widget: 'boarding-timeline' },
        { p: '**La traversée en bateau navette.** Les navettes sont des vedettes couvertes. L’équipage vous aide à monter à bord, des gilets de sauvetage sont fournis et vos bagages sont portés pour vous. Gardez avec vous un petit sac contenant votre passeport, vos médicaments et votre téléphone.' },
      ],
    },
    {
      id: 'on-board',
      title: 'La vie à bord',
      blocks: [
        {
          ul: [
            '**L’après-midi :** consignes de sécurité, déjeuner pendant la navigation, puis première excursion : une grotte ou un lagon en kayak ou en barque en bambou (en baie de Lan Ha, kayak temporairement suspendu en application de la réglementation locale, d’après les informations d’octobre 2026), parfois une plage.',
            '**Le soir :** coucher de soleil sur le pont soleil, cours de cuisine ou moment de détente, dîner, puis pêche au calmar depuis le pont pour ceux qui le souhaitent.',
            '**Le matin :** tai-chi au lever du soleil, petit-déjeuner léger et une dernière visite, souvent une grotte, avant le brunch et le retour au port.',
          ],
        },
        { p: 'Chaque soir, les navires mouillent dans les zones désignées, où les passagers passent la nuit à bord. La participation à la plupart des activités de loisirs est facultative et reste soumise aux règles de sécurité ; prévenez l’équipage si vous préférez rester à bord lors d’une escale. Découvrez les [expériences à bord](/experiences) prévues.' },
      ],
    },
    {
      id: 'safety',
      title: 'Météo, sécurité, enfants et accessibilité',
      blocks: [
        { p: '**Météo.** D’octobre à avril, le temps est plus frais et plus sec ; de mai à septembre, il fait chaud et humide, et c’est aussi la saison des tempêtes, en gros de juin à octobre. En cas d’alerte, les autorités peuvent suspendre toutes les sorties en mer dans la baie avec un très court préavis. Les compagnies reportent alors la croisière ou la remboursent selon leurs conditions. En hiver, la brume et les nuages bas peuvent réduire la visibilité. Consultez [la meilleure période pour partir](bestTime) pour connaître les conditions mois par mois.' },
        { p: '**Mal de mer.** Les baies sont abritées par les îles et la mer y est souvent assez calme, même si un léger roulis reste possible, notamment par vent fort. Si vous êtes sujet au mal des transports, emportez votre traitement habituel et renseignez-vous auprès de l’équipage sur les conditions avant le départ.' },
        { p: '**Enfants.** Les familles sont les bienvenues sur la plupart des croisières. Les enfants portent un gilet de sauvetage pour toutes les activités nautiques, et les plus jeunes montent généralement en barque en bambou avec un adulte plutôt qu’en kayak. Renseignez-vous sur les conditions applicables aux enfants, les possibilités de couchage et les [règles de sécurité](/safety-policies) au moment de réserver.' },
        { p: '**Accessibilité.** L’embarquement implique de passer du quai à la navette, puis de la navette au navire, et de nombreux sites comportent des marches : la [grotte Sung Sot](destination:sung-sot-cave) et le point de vue de l’[île Ti Top](destination:ti-top-island) sont accessibles par de longs escaliers. Les voyageurs à mobilité réduite peuvent généralement profiter de la croisière depuis le navire ; faites part de vos besoins à l’équipe avant de réserver afin qu’elle vous conseille en toute transparence.' },
      ],
    },
    {
      id: 'packing',
      title: 'La liste des affaires à emporter',
      blocks: [
        { p: 'Préférez un petit sac pour la nuit à une grande valise : c’est plus pratique dans la navette comme en cabine.' },
        {
          checklist: [
            { title: 'Documents', items: ['Passeport original', 'Confirmation de réservation', 'Coordonnées de l’assurance voyage', 'Un peu d’espèces pour les extras'] },
            { title: 'Vêtements', items: ['Maillot de bain et serviette à séchage rapide', 'Chaussures confortables et antidérapantes pour les grottes et les marches', 'Une petite laine ou une veste légère (indispensable de novembre à mars)', 'Chapeau et lunettes de soleil'] },
            { title: 'Indispensables', items: ['Protection solaire et répulsif anti-moustiques', 'Médicaments personnels et, si besoin, traitement contre le mal de mer', 'Pochette étanche pour votre téléphone en kayak', 'Batterie externe et câble de recharge'] },
          ],
        },
      ],
    },
    {
      id: 'mistakes',
      title: 'Les erreurs fréquentes lors d’une première croisière',
      blocks: [
        {
          ol: [
            '**Réserver un vol trop tôt après la croisière.** Débarquement, route et enregistrement à l’aéroport prennent du temps. Prévoyez une large marge avant tout vol de correspondance et vérifiez l’heure de retour prévue auprès de votre compagnie de croisière.',
            '**Se tromper d’embarcadère.** Halong compte plusieurs ports de passagers. Indiquez à votre chauffeur le [point d’enregistrement](checkin-map) exact ; les passagers Green Ruby s’enregistrent à Tuan Chau.',
            '**Laisser son passeport à l’hôtel.** Sans le document original, vous risquez de ne pas pouvoir embarquer.',
            '**Opter pour l’aller-retour dans la journée pour gagner du temps.** Vous en passez l’essentiel en voiture et manquez la baie à ses heures les plus paisibles.',
            '**S’attendre à des vacances balnéaires en hiver.** De décembre à février, l’eau est fraîche et le ciel souvent gris : venez pour les paysages, pas pour bronzer.',
            '**Ne pas signaler à l’avance ses besoins alimentaires ou ses difficultés de mobilité.** Il est bien plus simple de les anticiper avant le départ.',
          ],
        },
      ],
    },
    {
      id: 'itineraries',
      title: 'Les itinéraires Green Ruby',
      blocks: [{ p: 'Quatre itinéraires sont prévus, deux par baie, chacun en 2 jours et 1 nuit ou en 3 jours et 2 nuits.' }, { widget: 'itineraries' }],
    },
  ],
  faqTitle: 'Les questions que l’on se pose avant une première croisière',
  faq: [
    { q: 'Une croisière en baie d’Halong vaut-elle la peine ?', a: 'Si vous souhaitez voir la baie à différents moments de la journée et prendre le temps de vous détendre, une croisière avec nuit à bord mérite d’être envisagée. Lors d’un aller-retour dans la journée depuis Hanoï, une grande partie du temps se passe sur la route.' },
    { q: 'Combien de jours prévoir pour la baie d’Halong ?', a: 'Deux jours et une nuit suffisent pour une première découverte. Optez pour trois jours et deux nuits si vous voulez rejoindre des secteurs plus calmes en bateau d’excursion et voyager à un rythme plus lent.' },
    { q: 'Que mettre dans sa valise pour une croisière en baie d’Halong ?', a: 'Votre passeport original, un maillot de bain, des chaussures confortables et antidérapantes, une veste légère de novembre à mars, une protection solaire, vos médicaments éventuels et une pochette étanche pour le kayak. Un petit sac pour la nuit est plus pratique qu’une valise.' },
    { q: 'Risque-t-on le mal de mer en baie d’Halong ?', a: 'Dans ces baies abritées, la mer est souvent assez calme, même si un léger roulis reste possible, notamment par vent fort. Si vous êtes sensible au mal des transports, emportez votre traitement habituel.' },
    { q: 'Une croisière peut-elle être annulée à cause de la météo ?', a: 'Oui. En cas d’alerte tempête, surtout entre juin et octobre, les autorités peuvent suspendre les sorties en mer avec un très court préavis. La compagnie reporte alors la croisière ou la rembourse selon ses conditions.' },
    { q: 'À quelle heure faut-il arriver ?', a: 'D’après le programme publié par Green Ruby, l’enregistrement au salon de Tuan Chau commence vers 10 h 45 et la navette part vers 11 h 45. Les premiers départs étant prévus en février 2027, l’heure et le lieu définitifs vous seront confirmés par l’équipe des réservations avant le départ.' },
  ],
  sourcesTitle: 'Sources',
  sources: [
    { title: 'Centre du patrimoine mondial de l’UNESCO : baie d’Ha Long – archipel de Cat Ba', url: 'https://whc.unesco.org/en/list/672' },
    { title: 'Tuoi Tre News (20 juillet 2025) : les bateaux touristiques de la baie d’Halong interdits de départ à l’approche du typhon Wipha (en anglais)', url: 'https://news.tuoitre.vn/ha-long-bay-tourist-boats-banned-from-departing-as-typhoon-wipha-nears-103250720163544717.htm' },
  ],
  related: {
    title: 'Poursuivre vos préparatifs',
    links: [
      { href: 'transfer', title: 'De Hanoï à la baie d’Halong', body: 'Transferts, ports et durées de trajet à prévoir.' },
      { href: 'destinations', title: 'Que voir en baie d’Halong', body: 'Grottes, îles et villages, avec des conseils pratiques.' },
      { href: 'luxuryPillar', title: 'Croisières de luxe écoresponsables en baie d’Halong', body: 'Comment évaluer l’impact environnemental d’une croisière et vérifier les engagements annoncés.' },
    ],
  },
  estimateNote: 'Les temps de trajet et les durées indiqués sur cette page sont des estimations, et non des horaires. Les itinéraires Green Ruby restent provisoires jusqu’aux premiers départs, prévus en février 2027.',
  timeline: {
    label: 'Choisissez votre navire',
    note: 'Horaires issus des itinéraires publiés par Green Ruby ; provisoires et susceptibles de changer le jour même selon la météo et les consignes du port.',
    tabs: [
      {
        key: 'gr1',
        label: 'Green Ruby 1 · Baie d’Halong',
        steps: [
          { time: '≈ 07:30', title: 'Départ de Hanoï', body: 'Si vous réservez un transfert privé (sur demande, en supplément), prise en charge à Hanoï vers 7 h 30–8 h ; comptez environ 2 h 30 à 3 h de route (estimation).' },
          { time: '≈ 10:45', title: 'Enregistrement à Tuan Chau', body: 'Au salon Green Ruby de Tuan Chau : contrôle des passeports, remise des bagages et boisson de bienvenue.' },
          { time: '≈ 11:45', title: 'Navette vers le navire', body: 'Une courte traversée jusqu’à Green Ruby 1, au mouillage en baie d’Halong.' },
          { time: '≈ 12:30', title: 'Consignes de sécurité et installation', body: 'Présentation des consignes au restaurant, puis remise des clés et installation en cabine.' },
          { time: '≈ 13:00', title: 'Déjeuner en navigation', body: 'Le navire s’avance dans la baie pendant le déjeuner.' },
          { time: '≈ 15:30', title: 'Première excursion', body: 'Grotte Luon en kayak ou en barque en bambou, puis île Ti Top vers 16 h 30.' },
        ],
      },
      {
        key: 'gr2',
        label: 'Green Ruby 2 · Baie de Lan Ha',
        steps: [
          { time: '≈ 07:30', title: 'Départ de Hanoï', body: 'Si vous réservez un transfert privé (sur demande, en supplément), prise en charge à Hanoï vers 7 h 30–8 h ; comptez environ 2 h 30 à 3 h de route (estimation).' },
          { time: '≈ 10:45', title: 'Enregistrement à Tuan Chau', body: 'L’enregistrement se fait au salon Green Ruby de Tuan Chau, comme pour Green Ruby 1.' },
          { time: '≈ 11:45', title: 'Navette vers l’embarcadère de Gia Luan', body: 'La navette rejoint l’embarcadère de Gia Luan, sur l’île de Cat Ba (Haiphong), où vous embarquez à bord de Green Ruby 2 en baie de Lan Ha.' },
          { time: '≈ 12:30', title: 'Consignes de sécurité et installation', body: 'Présentation des consignes au restaurant, puis remise des clés et installation en cabine.' },
          { time: '≈ 13:00', title: 'Déjeuner en navigation', body: 'Déjeuner pendant que le navire gagne la baie de Lan Ha.' },
          { time: '≈ 15:00–15:30', title: 'Première excursion', body: 'Grotte Sang Toi (Dark & Bright Cave) en barque en bambou (kayak temporairement suspendu en application de la réglementation locale, d’après les informations d’octobre 2026).' },
        ],
      },
    ],
  },
  itineraries: { title: 'Les itinéraires Green Ruby', days: (n) => `${n} jours et ${n - 1} nuit${n > 2 ? 's' : ''}`, view: 'Voir l’itinéraire' },
};

export default firstTime;
