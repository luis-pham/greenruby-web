import type { GuideContent } from './types';

// French version of transfer.en.ts (the English file is the source of truth). DRAFT, PENDING_REVIEW:
// written 2026-11-05 following scratchpad/fr/BRIEF-FR.md; needs native French review.
// Durations, fares and timetables are copied from the English (operators.ts registry, checked 2026-10-27).
// Operator names stay Latin; amounts keep their currency (VND, USD), French formatting (U+00A0 separators).
// REVIEW: (1) "shuttle" section: EN says Green Ruby plans a shared shuttle and private cars; FR says only that a
// private transfer can be arranged on request at extra cost (owner fact: no shared shuttle offer).
// (2) FAQ "transfer included": adds that a private transfer can be arranged on request, at extra cost.
// (3) estimateNote: "until the ships enter service in February 2027" -> "jusqu'aux premiers départs, prévus en
// février 2027" (brief: never "en service"). (4) "US$15" / "US$60–120" written as "15 USD" / "60 à 120 USD".
// Not changed: third-party shared-van pick-up 6 h–6 h 30 (EN, aligned with 10:45 check-in); the brief's
// 7 h 30–8 h pick-up refers to Green Ruby's own transfer and is not stated on this page.

// Independent AI editorial pass 2026-11-05: natural French reviewed; factual and native-human approval remain pending.
const transfer: GuideContent = {
  metaTitle: 'Hanoï – baie d’Halong : transferts et tarifs',
  metaDescription:
    'Rejoindre la baie d’Halong depuis Hanoï, Noi Bai, Ninh Binh ou Tam Coc : comparez les minibus, voitures privées et bus, avec tarifs et horaires d’octobre 2026.',
  breadcrumb: 'De Hanoï à la baie d’Halong',
  eyebrow: 'Guide de voyage',
  title: 'Comment aller de Hanoï à la baie d’Halong : transferts et ports de croisière',
  lead: 'Hanoï, l’aéroport de Noi Bai, Ninh Binh ou les autres aéroports de la région : voici comment rejoindre la baie d’Halong depuis chacun de ces points de départ. Ce guide recense les transporteurs qui publient leurs tarifs et leurs horaires, explique la différence entre les ports de croisière et indique les solutions qui permettent d’arriver à l’heure pour un enregistrement en matinée à Tuan Chau.',
  summaryTitle: 'L’essentiel',
  summary: [
    ['Le plus rapide depuis Hanoï', 'En voiture privée, comptez en général **2,5 à 3 heures** jusqu’à Tuan Chau. Un transporteur affiche **à partir de 2 800 000 VND** pour la privatisation d’un minibus de 9 places.'],
    ['Limousine partagée', 'Comptez environ **250 000 à 360 000 VND par personne**, avec prise en charge à votre hôtel dans le centre de Hanoï. Pour un enregistrement à 10 h 45, choisissez un minibus qui quitte Hanoï vers **7 h** au plus tard.'],
    ['Depuis Ninh Binh ou Tam Coc', 'Prévoyez **3,5 à 4,5 heures**. Aucun service partagé n’arrive de façon fiable à Tuan Chau avant 10 h 45 : dormez à Ha Long la veille ou partez à l’aube en voiture privée.'],
    ['En avion', 'Des limousines partagées relient Noi Bai à Ha Long toutes les heures (**600 000 VND** le siège pour un passager seul). Depuis Cat Bi ou Van Don, réservez un transfert privé.'],
    ['Enregistrement Green Ruby', 'Green Ruby prévoit d’accueillir les passagers de ses deux navires au port international de passagers de Tuan Chau. L’enregistrement est prévu, à titre provisoire, vers 10 h 45.'],
    ['Après la croisière', 'Le débarquement est prévu vers 11 h–11 h 30. Réservez un minibus de retour qui quitte Tuan Chau à 12 h ou plus tard, et évitez les vols trop proches de cet horaire.'],
  ],
  published: '2026-10-24',
  updated: { iso: '2026-10-27', label: 'Mis à jour le 27 octobre 2026' },
  tocTitle: 'Dans ce guide',
  sections: [
    {
      id: 'compare',
      title: 'De Hanoï à la baie d’Halong : les solutions comparées',
      blocks: [
        { p: 'Entre le centre de Hanoï et Tuan Chau, où a lieu l’enregistrement de nombreuses croisières avec nuit à bord, la route compte environ 160 à 180 km. L’essentiel du trajet emprunte des voies express modernes ; ce qui fait la différence, c’est le temps nécessaire pour sortir de Hanoï et les arrêts éventuels pour prendre d’autres passagers.' },
        {
          table: {
            head: ['Solution', 'Porte à porte (estimation)', 'Tarifs publiés (oct. 2026)', 'Idéal pour', 'À savoir'],
            rows: [
              ['Voiture privée', '2,5–3 h', 'À partir de 2 800 000 VND le véhicule de 9 places', 'Familles, petits groupes, enregistrements matinaux, accueil à l’aéroport', 'Vous choisissez l’heure de prise en charge ; comparez le total avec le prix des places individuelles pour votre groupe'],
              ['Limousine partagée (minibus)', '3–3,5 h', '250 000–360 000 VND ou 15 USD par personne', 'Couples et voyageurs seuls', 'Départs à horaires fixes ; prend d’autres passagers en route ; règles de dépose au port variables'],
              ['Car express', '2,5 h depuis la gare routière de My Dinh, plus le trajet pour s’y rendre', 'Environ 160 000 VND par personne', 'Voyageurs disposant de temps et d’un budget limité', 'Part d’une gare routière et non de votre hôtel ; difficile à concilier avec un enregistrement en matinée'],
            ],
          },
        },
        { note: 'Les temps de trajet sont des estimations pour une circulation normale, sans garantie. Prévoyez davantage de temps le vendredi soir, le dimanche après-midi et les jours fériés comme le Têt ou les 30 avril et 1er mai, périodes où les transporteurs peuvent aussi augmenter leurs prix.' },
      ],
    },
    {
      id: 'planner',
      title: 'Préparer votre transfert',
      blocks: [
        { p: 'Indiquez votre point de départ pour afficher les principales solutions, une plage horaire de départ conseillée pour un enregistrement à 10 h 45, les tarifs publiés, les transporteurs dont nous avons consulté les informations et ce qu’il faut prévoir le dernier jour. Ajoutez une marge pour la circulation, les retards et les formalités à l’aéroport.' },
        { widget: 'transfer-selector' },
      ],
    },
    {
      id: 'old-quarter',
      title: 'Du vieux quartier de Hanoï à Tuan Chau : transporteurs et horaires',
      blocks: [
        { p: 'La plupart des voyageurs partent du vieux quartier. En voiture privée, un départ entre 6 h 45 et 7 h 15 environ laisse une marge pour la circulation et une pause avant l’enregistrement de 10 h 45. En minibus partagé, réservez un départ qui **quitte Hanoï vers 7 h au plus tard** : les prises en charge commencent 30 à 60 minutes plus tôt, attendez-vous donc à être récupéré entre 6 h et 6 h 30 environ.' },
        { p: 'Les minibus partagés qui quittent Hanoï à 8 h ou plus tard arrivent à Tuan Chau trop près de l’heure d’enregistrement, voire après. C’est le cas de l’unique départ de 8 h de Cat Ba Express : d’après la durée de trajet publiée par ce transporteur, il arrive vers 10 h 40.' },
        { operators: ['hanoi-halong'], caption: 'Hanoï → Ha Long : transporteurs aux trajets publiés' },
        { p: 'Dans un horaire, « Tuan Chau » peut désigner un café proche du port, l’entrée du port ou le terminal lui-même. Avant de payer, demandez au transporteur de confirmer la dépose au **port international de passagers de Tuan Chau** (Tuan Chau International Passenger Port), et non au port international de croisière d’Ha Long, à Bai Chay. Ha Long Travel Limousine, par exemple, ne fait pas entrer un passager seul dans le port : vous êtes déposé devant l’entrée et terminez à pied. À partir de deux personnes, le véhicule peut entrer moyennant un droit de port de 30 000 VND.' },
      ],
    },
    {
      id: 'shuttle',
      title: 'Limousine partagée (minibus)',
      blocks: [
        { p: 'Ces « limousines » sont des minibus de 9 à 11 places aux sièges inclinables. La plupart prennent les passagers à leur hôtel dans le centre de Hanoï, font une seule pause en route et déposent les voyageurs à des points fixes ou à une adresse à Ha Long. Les transporteurs ci-dessus proposent plusieurs départs par jour : vous pouvez en choisir un adapté à votre heure d’enregistrement.' },
        {
          ul: [
            'Une solution partagée pratique pour une ou deux personnes.',
            'La tournée de prise en charge peut durer 30 minutes ou plus avant que le minibus ne quitte la ville.',
            'Le prix de la place peut varier selon son emplacement : les sièges « VIP » du milieu coûtent généralement plus cher que ceux de l’avant ou de l’arrière.',
            'L’espace pour les bagages est limité : un bagage cabine et une valise moyenne par personne constituent un maximum raisonnable.',
            'Les minibus de retour suivent l’horaire du transporteur ; réservez un départ postérieur au débarquement de la matinée.',
          ],
        },
        { p: 'Les transferts ne sont pas inclus dans les tarifs des croisières Green Ruby. Un transfert privé entre Hanoï et Ha Long peut être organisé sur demande, avec supplément ; Green Ruby ne propose pas de navette partagée. Les horaires et le prix vous seront confirmés avec votre réservation.' },
      ],
    },
    {
      id: 'private-car',
      title: 'Voiture privée',
      blocks: [
        { p: 'La voiture privée offre le plus de souplesse, en particulier pour les familles, les petits groupes et les voyageurs qui arrivent par avion. Le chauffeur vient vous chercher à votre hôtel ou au terminal et vous conduit directement au lieu d’enregistrement de votre croisière.' },
        { p: 'Les tarifs publiés sont rares. Ha Long Travel Limousine affiche la privatisation d’un minibus de 9 ou 10 places à partir de 2 800 000–3 000 000 VND l’aller simple depuis Hanoï, et de 3 000 000–3 200 000 VND depuis l’aéroport de Noi Bai. Comparez le devis du véhicule privé au coût total des places individuelles en minibus partagé avant de choisir.' },
        {
          ul: [
            'Vérifiez la taille du véhicule et sa capacité en bagages avant de réserver.',
            'Demandez si les péages, le stationnement et l’entrée au port sont compris.',
            'Réservez un siège enfant à l’avance si nécessaire.',
            'Communiquez votre numéro de vol au prestataire et renseignez-vous sur sa politique d’attente.',
            'Assurez-vous que le chauffeur connaît l’emplacement exact du terminal de croisière ou du salon d’accueil.',
          ],
        },
        { p: 'Conduire vous-même suppose un permis valable au Vietnam et une place de stationnement près du port pendant toute la croisière : la plupart des voyageurs préfèrent donc un chauffeur.' },
      ],
    },
    {
      id: 'bus',
      title: 'Bus de ligne',
      blocks: [
        { p: 'Des cars relient les gares routières de Hanoï à Ha Long. Kumho Viet Thanh annonce une liaison par autoroute au départ de la gare routière de My Dinh (6 h 30, 9 h 30, 11 h 30, 13 h 30, 15 h 30 et 17 h 30, environ 160 000 VND), avec Tuan Chau parmi ses arrêts à Ha Long, même si son site ne semble pas avoir été mis à jour depuis 2022. D’autres bus s’arrêtent à Bai Chay, d’où il faut encore prendre un taxi jusqu’au port.' },
        { p: 'Même le car de 6 h 30 laisse trop peu de marge pour un enregistrement à 10 h 45, une fois ajoutés le trajet jusqu’à My Dinh et la marche ou le taxi depuis l’arrêt. Le bus convient surtout si vous passez la nuit précédente à Ha Long.' },
      ],
    },
    {
      id: 'airports',
      title: 'Depuis les aéroports',
      blocks: [
        { p: 'Trois aéroports peuvent servir de porte d’entrée vers la baie d’Halong.' },
        {
          table: {
            head: ['Aéroport', 'À prendre en compte'],
            rows: [
              ['Aéroport international de Noi Bai (HAN)', 'Principal aéroport international de Hanoï. Comptez environ 2,5 à 3,5 heures, voire davantage, pour rejoindre Tuan Chau. Les limousines partagées et voitures privées vers Ha Long sont présentées ci-dessous.'],
              ['Aéroport international de Cat Bi (HPH)', 'À Haiphong, à environ 40 km de Tuan Chau par la route. Nous n’avons trouvé aucun service partagé régulier vers Tuan Chau : réservez un transfert privé. Chez les revendeurs, les tarifs annoncés se situent entre 60 et 120 USD par véhicule.'],
              ['Aéroport international de Van Don (VDO)', 'Dans la province de Quang Ninh, à environ 60 à 70 km de Tuan Chau. Les vols sont peu nombreux et les bus de l’aéroport desservent Hon Gai et Bai Chay, pas Tuan Chau. Réservez un transfert privé et faites confirmer la durée du trajet.'],
            ],
          },
        },
        { h3: 'De l’aéroport de Noi Bai à Ha Long : transporteurs' },
        { operators: ['noibai-halong'], caption: 'Aéroport de Noi Bai → Ha Long' },
        { p: '**Peut-on atterrir et embarquer le jour même ?** C’est envisageable avec une arrivée matinale, mais la marge devient faible face aux retards de vol, au contrôle des passeports, à la récupération des bagages et à la circulation. Si vous arrivez à Noi Bai sur un vol international, passer la nuit précédente à Hanoï ou près du terminal de croisière reste en général la solution la plus sereine.' },
      ],
    },
    {
      id: 'ninh-binh',
      title: 'De Ninh Binh et Tam Coc à la baie d’Halong',
      blocks: [
        { p: 'De nombreux circuits associent Ninh Binh et Ha Long. Les minibus empruntent généralement la route nationale 10 en direction de Haiphong, sans passer par Hanoï ; le trajet dure environ 3,5 à 4 heures en voiture privée et 4 à 4,5 heures en minibus partagé. La plupart des transporteurs prennent les passagers à Tam Coc, où logent beaucoup de voyageurs ; l’un d’eux passe aussi dans les hôtels de Trang An, de Bai Dinh et de la ville de Ninh Binh.' },
        { h3: 'Depuis Ninh Binh, peut-on arriver le matin même pour un enregistrement à 10 h 45 ?' },
        { p: 'Pas de façon fiable en minibus partagé. Le premier départ publié par un transporteur est le bus de 6 h 40 de Full Moon Travel au départ de Tam Coc, annoncé à Tuan Chau à 10 h 30 ; une autre page du même site indique toutefois une arrivée à 11 h. Cat Ba Express part de Tam Coc à 7 h sans publier d’heure d’arrivée. Ninh Binh Express Bus commence à 7 h–7 h 30 et met environ 4,5 heures. Des départs plus matinaux apparaissent sur certaines plateformes de réservation, mais leurs transporteurs ne les publient pas : nous ne les retenons donc pas.' },
        {
          ol: [
            '**Passer la nuit précédente à Ha Long** (recommandé). Tuan Chau et Bai Chay disposent d’hôtels ; de Bai Chay, le port est à environ 13 à 14 km. Prenez un minibus l’après-midi depuis Ninh Binh la veille.',
            '**Partir à l’aube en voiture privée.** Quittez Tam Coc vers 5 h 45–6 h 15 pour un enregistrement à 10 h 45.',
            '**Ne prendre un minibus partagé que si l’enregistrement de votre croisière a lieu plus tard dans la journée**, en choisissant une dépose à Tuan Chau plutôt qu’à Bai Chay.',
          ],
        },
        { h3: 'Ninh Binh → Ha Long : transporteurs' },
        { operators: ['ninhbinh-halong'] },
        { p: 'Certains minibus s’arrêtent d’abord à Bai Chay ou dans la ville d’Ha Long. Si le vôtre termine à Bai Chay, prenez un taxi ou un VTC jusqu’à Tuan Chau et comptez 20 à 30 minutes environ.' },
        { h3: 'Après la croisière : de Ha Long à Ninh Binh et Tam Coc' },
        { p: 'Le retour l’après-midi est plus simple. Le minibus de 12 h 30 de Full Moon Travel part de la ville d’Ha Long, passe ensuite par Tuan Chau et arrive à Ninh Binh vers 16 h 30. Cat Ba Express part à 11 h 40, ce qui laisse peu de marge après un débarquement entre 11 h et 11 h 30. Ninh Binh Express Bus assure un départ en milieu de journée, mais ses pages donnent deux horaires différents. Une voiture privée coûte à partir de 1 600 000 VND environ, selon l’annonce d’une agence de voyages.' },
        { operators: ['halong-ninhbinh'] },
      ],
    },
    {
      id: 'booking-tips',
      title: 'Réserver un transfert : conseils pratiques',
      blocks: [
        {
          ul: [
            '**Réservez à l’avance.** Pour un minibus partagé, au moins la veille, et plus tôt le week-end et les jours fériés. Voitures privées et accueils à l’aéroport se réservent avant le départ.',
            '**Pour appeler depuis l’étranger.** Au Vietnam, les numéros de mobile commencent par 0. Depuis un téléphone étranger, supprimez le 0 et composez le +84 : le 097 593 2468 devient le +84 97 593 2468. Les numéros commençant par 1900 ne fonctionnent que depuis le Vietnam.',
            '**Utilisez WhatsApp ou Zalo.** La plupart des transporteurs répondent plus vite par message que par téléphone, et une confirmation écrite est plus facile à montrer à votre hôtel ou à votre chauffeur. Zalo est très répandu au Vietnam.',
            '**Faites confirmer la prise en charge.** Envoyez le nom et l’adresse de votre hôtel, et demandez la plage horaire de passage. Certains transporteurs prennent les passagers à un point fixe à proximité plutôt qu’à la porte : demandez où attendre.',
            '**Faites confirmer le lieu de dépose à Tuan Chau.** Demandez si le véhicule vous dépose au port international de passagers de Tuan Chau (« Do you drop at Tuan Chau International Passenger Port? ») et si un voyageur seul est conduit à l’intérieur du port ou laissé à l’entrée.',
            '**Vérifiez les suppléments.** Droits d’entrée au port, arrêts supplémentaires, prises en charge tardives, attente à l’aéroport et majorations les jours fériés peuvent coûter plus cher. Renseignez-vous avant de payer.',
            '**Bagages volumineux.** Signalez à la réservation les grandes valises, sacs de golf ou poussettes pliantes. Les minibus partagés acceptent en général une valise moyenne et un petit sac par personne.',
            '**Avec de jeunes enfants.** Les minibus partagés ne sont pas équipés de sièges enfants. Demandez-en un pour une voiture privée, et vérifiez si les enfants paient plein tarif : certains transporteurs facturent un siège entier dès 3 ans environ.',
            '**Si le minibus est en retard,** écrivez au transporteur en indiquant le nom de la réservation. Au-delà de 15 à 20 minutes de retard, si vous vous rendez à une croisière, prévenez aussi le service de réservation de la compagnie.',
          ],
        },
      ],
    },
    {
      id: 'ports',
      title: 'Port de Tuan Chau ou port international de croisière d’Ha Long ?',
      blocks: [
        { p: 'Ha Long compte plusieurs ports de passagers, et il arrive que les chauffeurs se trompent. Les deux ports les plus souvent mentionnés dans les réservations se trouvent à des endroits différents :' },
        {
          table: {
            head: ['', 'Port international de passagers de Tuan Chau', 'Port international de croisière d’Ha Long'],
            rows: [
              ['Emplacement', 'Île de Tuan Chau, à l’ouest de Bai Chay, reliée au continent par la route', 'Bai Chay, plus près du centre d’Ha Long'],
              ['Utilisé par', 'De nombreuses croisières avec nuit à bord, dont Green Ruby', 'Bateaux de croisière vietnamiens et paquebots internationaux'],
              ['Distance entre les deux', 'Environ 13 à 14 km par la route', ''],
            ],
          },
        },
        { p: 'Donnez à votre chauffeur le lieu d’enregistrement exact, pas seulement « baie d’Halong ».' },
      ],
    },
    {
      id: 'check-in',
      title: 'Où se fait l’enregistrement Green Ruby',
      blocks: [
        { p: 'Green Ruby prévoit d’accueillir les passagers de ses deux navires au **salon Green Ruby du port international de passagers de Tuan Chau**. [Ouvrir le terminal de départ dans Google Maps](checkin-map). Votre confirmation de réservation précisera le lieu exact et l’heure de présentation.' },
        { p: 'Selon les programmes publiés, l’enregistrement commence vers 10 h 45 et le bateau navette part vers 11 h 45. Les transporteurs présentés sur cette page déposent à Tuan Chau, mais pas forcément au salon Green Ruby : montrez le repère de la carte à votre chauffeur. Le siège social de la compagnie se trouve à une autre adresse : veillez à indiquer au chauffeur le salon d’accueil au port. Au moindre doute, [contactez le service de réservation](contact) avant le départ.' },
      ],
    },
    {
      id: 'ships',
      title: 'Green Ruby 1 et Green Ruby 2 : les différences à l’embarquement',
      blocks: [
        {
          table: {
            head: ['', 'Green Ruby 1', 'Green Ruby 2'],
            rows: [
              ['Baie', 'Baie d’Halong', 'Baie de Lan Ha'],
              ['Enregistrement', 'Salon Green Ruby, Tuan Chau', 'Salon Green Ruby, Tuan Chau'],
              ['Embarquement (prévu)', 'Bateau navette de Tuan Chau jusqu’au navire au mouillage', 'Bateau navette de Tuan Chau jusqu’à l’embarcadère de Gia Luan, sur l’île de Cat Ba (Haiphong), puis montée à bord'],
              ['Retour (prévu)', 'À Tuan Chau, en fin de matinée', 'À Tuan Chau, débarquement vers 11 h'],
            ],
          },
        },
        { p: 'Selon l’organisation prévue par Green Ruby, les deux itinéraires commencent par l’enregistrement à Tuan Chau ; la traversée jusqu’à l’embarcadère de Gia Luan fait partie de l’embarquement sur Green Ruby 2 : vous n’avez donc pas à organiser vous-même votre trajet vers Cat Ba. Vous hésitez entre les deux baies ? Consultez [Baie d’Halong ou baie de Lan Ha](bayComparison).' },
      ],
    },
    {
      id: 'return',
      title: 'Transfert retour et vol après la croisière',
      blocks: [
        { p: 'Les croisières avec nuit à bord regagnent généralement le port en fin de matinée. Selon les programmes provisoires de Green Ruby, le débarquement à Tuan Chau est prévu vers 11 h–11 h 30. Un minibus qui quitte Tuan Chau à 12 h ou plus tard est le choix le plus sûr ; un départ plus tôt laisse peu de marge si le bateau navette a du retard.' },
        { h3: 'De Tuan Chau à Hanoï et à l’aéroport de Noi Bai : transporteurs' },
        { operators: ['halong-hanoi', 'halong-noibai'] },
        { p: 'Le retour vers Hanoï ou l’aéroport de Noi Bai prend environ 2,5 à 3 heures, auxquelles s’ajoutent les arrêts pour déposer les autres passagers. Si vous prenez l’avion le jour même, tenez compte des points suivants :' },
        {
          ul: [
            '**Vols intérieurs au départ de Noi Bai :** prévoyez la totalité du trajet routier et visez une arrivée à l’aéroport au moins deux heures avant le départ.',
            '**Vols internationaux au départ de Noi Bai :** prévoyez au moins trois heures à l’aéroport, plus le temps de route et une marge pour les éventuels retards.',
            '**Vols au départ de Cat Bi ou de Van Don :** nous n’avons pu vérifier aucun service partagé régulier depuis Tuan Chau. Réservez une voiture privée et faites confirmer la durée du trajet ainsi que les conditions d’enregistrement à l’aéroport.',
            '**Pour continuer vers Ninh Binh :** consultez [la partie consacrée à Ninh Binh](#ninh-binh) pour les minibus de l’après-midi, et ne prévoyez pas d’activité juste après votre heure d’arrivée estimée.',
          ],
        },
        { p: 'Les restrictions météorologiques, les changements d’exploitation de la croisière et l’état des routes peuvent tous retarder votre retour.' },
        { note: '**Notre conseil :** si votre vol après la croisière est coûteux, difficile à modifier ou fait partie d’un voyage international, envisagez une nuit supplémentaire avant de prendre l’avion. Les horaires indiqués ici sont des estimations, et non des heures d’arrivée garanties. Vérifiez toujours l’heure de retour prévue de votre croisière et l’organisation de votre transfert avant de réserver la suite de votre voyage.' },
      ],
    },
    {
      id: 'delays',
      title: 'En cas de retard de vol ou de transfert',
      blocks: [
        {
          ol: [
            '**Prévenez immédiatement le service de réservation**, en indiquant votre numéro de vol ou l’heure d’arrivée estimée par le chauffeur. Les coordonnées figurent sur la [page contact](contact).',
            '**Le navire ne pourra pas nécessairement vous attendre.** Les horaires du bateau navette suivent le programme du jour et le règlement du port. La possibilité d’un transfert plus tardif jusqu’au navire dépend des conditions du jour et ne peut être garantie.',
            '**Si vous manquez l’embarquement**, les conditions d’annulation et de modification indiquées dans la [FAQ](faq) s’appliquent. Une assurance voyage couvrant les départs manqués est vivement conseillée.',
            '**Si les autorités suspendent les sorties en mer** en raison d’une tempête, vous serez contacté pour un report ou un remboursement, conformément aux conditions publiées.',
          ],
        },
      ],
    },
  ],
  faqTitle: 'Questions sur les transferts',
  faq: [
    { q: 'Combien de temps faut-il pour aller de Hanoï à la baie d’Halong ?', a: 'Entre le centre de Hanoï et Tuan Chau, comptez en général 2,5 à 3,5 heures de route, selon la circulation, votre point de départ et les éventuels arrêts supplémentaires.' },
    { q: 'Combien coûte une limousine de Hanoï à la baie d’Halong ?', a: 'Lors de notre vérification en octobre 2026, les transporteurs annonçaient des places en minibus partagé à environ 250 000–360 000 VND, ou 15 USD, l’aller simple. La privatisation d’un minibus de 9 places était proposée à partir de 2 800 000 VND. Les prix évoluent : faites-les confirmer à la réservation.' },
    { q: 'Quelle est la meilleure façon d’aller de Hanoï à la baie d’Halong ?', a: 'La voiture privée est pratique pour les familles, les groupes et les voyageurs qui préfèrent un trajet direct. La limousine partagée est une bonne alternative pour les couples et les voyageurs seuls. Pour un enregistrement à 10 h 45, choisissez un minibus qui quitte Hanoï vers 7 h au plus tard.' },
    { q: 'Comment aller de Ninh Binh ou de Tam Coc à la baie d’Halong ?', a: 'Des limousines partagées relient Tam Coc et Ninh Binh à Ha Long, et certaines déposent à Tuan Chau. Elles mettent environ 4 à 4,5 heures et aucune n’arrive de façon fiable avant un enregistrement à 10 h 45 : dormez à Ha Long la veille ou partez vers 6 h en voiture privée.' },
    { q: 'Le transfert est-il inclus dans une croisière Green Ruby ?', a: 'Selon les plans actuels de Green Ruby, les transferts entre Hanoï et Tuan Chau ne sont pas compris dans le tarif standard de la croisière. Un transfert privé peut être organisé sur demande, avec supplément ; faites confirmer les options et les tarifs lors de votre demande de réservation.' },
    { q: 'Quel est l’aéroport le plus proche de la baie d’Halong ?', a: 'L’aéroport de Cat Bi, à Haiphong, se trouve à environ 40 km de Tuan Chau par la route, et celui de Van Don à environ 60 à 70 km ; depuis Noi Bai, il faut compter environ 3 heures de route. Noi Bai offre toutefois bien plus de vols, ainsi que les seules limousines partagées régulières vers Ha Long que nous ayons pu vérifier.' },
    { q: 'Peut-on rejoindre sa croisière directement depuis l’aéroport de Noi Bai ?', a: 'Oui, si votre vol arrive suffisamment tôt pour atteindre le lieu d’enregistrement à l’heure. Les retards de vol, le contrôle des passeports et la récupération des bagages rendent toutefois ces correspondances le jour même risquées. Arriver la veille est en général plus sûr.' },
    { q: 'Comment rejoindre l’aéroport de Hanoï après la croisière ?', a: 'Des limousines partagées relient Ha Long à Noi Bai tout au long de l’après-midi, et une voiture privée peut être réservée à heure fixe. Comptez environ 3 heures de route, plus le temps nécessaire aux formalités à l’aéroport.' },
    { q: 'D’où partent les croisières Green Ruby ?', a: 'Green Ruby prévoit d’accueillir les passagers de ses deux navires au salon Green Ruby du port international de passagers de Tuan Chau. L’organisation de l’embarquement diffère d’un navire à l’autre. Votre confirmation de réservation définitive précisera le lieu exact, l’heure de présentation et les informations de transfert.' },
  ],
  sourcesTitle: 'Sources',
  sources: [
    { title: 'Comité de gestion de la baie d’Halong : itinéraire de visite VHL1 (départs de Tuan Chau ou du port international de croisière d’Ha Long)', url: 'https://halongbay.com.vn/tours/1-hanh-trinh-vhl1-cang-tau-dong-thien-cung-hang-dau-go-hon-cho-da-hang-ba-hang-hon-dinh-huong-hon-trong-mai' },
    { title: 'VietNamNet : Noi Bai recommande d’arriver deux heures avant un vol intérieur et trois heures avant un vol international (en anglais)', url: 'https://vietnamnet.vn/en/125-000-travelers-expected-at-hanoi-airport-as-holiday-rush-begins-2549423.html' },
    { title: 'Tuoi Tre News (20 juillet 2025) : départs des bateaux touristiques interdits en baie d’Halong à l’approche du typhon Wipha (en anglais)', url: 'https://news.tuoitre.vn/ha-long-bay-tourist-boats-banned-from-departing-as-typhoon-wipha-nears-103250720163544717.htm' },
    { title: 'Ha Long Travel Limousine : tarifs et horaires Hanoï–Ha Long ; règles de prise en charge au port de Tuan Chau', url: 'https://xehalong.vn/quy-trinh-don-tra' },
    { title: 'Ha Long Travel Limousine : limousine partagée et privée aéroport de Noi Bai–Ha Long', url: 'https://xehalong.vn/xe-limousine-noi-bai-ha-long-cam-pha/' },
    { title: 'Cat Ba Express : limousine Hanoï–Ha Long (points de dépose à Tuan Chau et Bai Chay)', url: 'https://catbaexpress.com/bus-hanoi-to-halong.html' },
    { title: 'Full Moon Travel : horaires des bus Ninh Binh–Ha Long', url: 'https://fullmoontravelasia.com/ninh-binh-to-halong-bay-by-bus/' },
    { title: 'Ninh Binh Express Bus : horaires et tarifs des limousines Ninh Binh–Ha Long', url: 'https://ninhbinhexpressbus.com/lich-trinh-xe-limousine-ninh-binh-di-ha-long/' },
    { title: 'VinWonders : guide de l’île de Tuan Chau (distances depuis les aéroports de Cat Bi et Van Don)', url: 'https://vinwonders.com/vi/wonderpedia/news/dao-tuan-chau-ha-long/' },
  ],
  related: {
    title: 'Poursuivre vos préparatifs',
    links: [
      { href: 'firstTime', title: 'Première croisière en baie d’Halong ?', body: 'À quoi s’attendre, que mettre dans sa valise et comment se déroule le jour de l’embarquement.' },
      { href: 'itineraries', title: 'Les itinéraires Green Ruby', body: 'Deux baies, en 2 jours et 1 nuit ou 3 jours et 2 nuits.' },
      { href: 'bestTime', title: 'Quand partir en baie d’Halong ?', body: 'Météo, affluence et état de la mer, mois par mois.' },
      { href: 'faq', title: 'Questions fréquentes', body: 'Réservation, paiement, annulation et vie à bord.' },
    ],
  },
  estimateNote: 'Toutes les durées indiquées sur cette page sont des estimations pour des conditions normales, et non des horaires ou des garanties. Les tarifs et horaires des transporteurs sont ceux publiés à la date indiquée sous chaque tableau. Les informations d’enregistrement et d’embarquement reprennent le programme publié par Green Ruby et restent provisoires jusqu’aux premiers départs, prévus en février 2027.',
  selector: {
    labels: {
      title: 'Rejoindre Tuan Chau depuis {origin}',
      origin: 'D’où partez-vous ?',
      road: 'Temps de route jusqu’à Tuan Chau (estimation)',
      hours: 'h',
      minutes: 'min',
      decimal: ',',
      roadUnknown: 'Variable selon l’itinéraire et la circulation. Faites confirmer la durée du trajet par votre prestataire.',
      depart: 'Plage horaire de départ conseillée',
      departShuttle: 'Minibus partagés : réservez un départ qui quitte Hanoï vers 7 h au plus tard ; la prise en charge a souvent lieu vers {from}–{to}.',
      departNote: 'Marge pour la circulation incluse. Prévoyez davantage de temps le week-end et les jours fériés.',
      departUnknown: 'Organisez-vous avec votre prestataire pour arriver à Tuan Chau avant l’enregistrement de 10 h 45, avec de la marge.',
      lastDay: 'Dernier jour : débarquement (provisoire)',
      disembark: 'L’heure de retour peut varier selon la météo et les conditions de navigation.',
      returnBack: 'Arrivée estimée à {origin} : vers {from}–{to}, sans garantie.',
      airportAdvice: 'Prévoyez le temps de route nécessaire pour arriver à l’aéroport au moins 2 heures avant un vol intérieur et 3 heures avant un vol international.',
      table: { mode: 'Solution', time: 'Durée (estimation)', notes: 'Remarques' },
      cost: 'Tarifs publiés (aller simple)',
      costNone: 'Aucun tarif vérifiable. Demandez un devis pour un transfert privé.',
      operators: 'Transporteurs consultés',
      operatorsNone: 'Aucun service partagé régulier vers Tuan Chau que nous ayons pu vérifier. Réservez un transfert privé.',
      returnOperators: 'Retour depuis Tuan Chau :',
      seeTable: 'Comparer les points de prise en charge et de dépose',
      operatorsAnchor: { hanoi: 'old-quarter', noibai: 'airports', ninhbinh: 'ninh-binh' },
      note: 'Simples suggestions, établies pour un enregistrement provisoire à 10 h 45 et un débarquement à 11 h–11 h 30. Ni horaire ni garantie : ajoutez une marge pour la circulation, les retards et les formalités à l’aéroport. Tarifs tels que publiés par les transporteurs ; à confirmer lors de la réservation.',
    },
    origins: [
      {
        key: 'hanoi',
        label: 'Hanoï (vieux quartier)',
        routes: [
          { mode: 'Voiture privée', time: '2,5–3 h', notes: 'Porte à porte ; vous choisissez l’horaire.' },
          { mode: 'Limousine partagée (minibus)', time: '3–3,5 h', notes: 'Prise en charge à l’hôtel dans le centre de Hanoï, une pause. Départs toutes les heures chez certains transporteurs.' },
          { mode: 'Car express', time: '2,5 h + trajet jusqu’à My Dinh', notes: 'Depuis la gare routière de My Dinh. Difficile à concilier avec un enregistrement en matinée.' },
        ],
        tip: 'Loger près du vieux quartier simplifie en général la prise en charge par les minibus.',
      },
      {
        key: 'noibai',
        label: 'Aéroport de Noi Bai (HAN)',
        airport: 'noibai',
        routes: [
          { mode: 'Voiture privée', time: '2,5–3,5 h', notes: 'Accueil réservé à l’avance dans le hall des arrivées ; vérifiez la politique d’attente du prestataire.' },
          { mode: 'Limousine partagée (minibus)', time: 'Environ 3 h', notes: 'Départs toutes les heures depuis l’aéroport chez au moins un transporteur ; en cas de retard de vol, report possible sur un minibus suivant.' },
          { mode: 'Taxi ou VTC', time: '2,5–3,5 h', notes: 'Convenez du prix et du terminal exact avant de partir.' },
        ],
        tip: 'Embarquer le jour de l’arrivée suppose un vol matinal et laisse peu de marge en cas de retard. Passer la nuit précédente à Hanoï est en général plus sûr.',
      },
      {
        key: 'catbi',
        label: 'Aéroport de Cat Bi (HPH)',
        airport: 'catbi',
        routes: [
          { mode: 'Voiture privée', time: 'Variable', notes: 'Environ 40 km par la route. Faites confirmer l’itinéraire et la durée jusqu’à Tuan Chau par votre prestataire.' },
          { mode: 'Taxi ou VTC', time: 'Variable', notes: 'Disponibles à l’aéroport ; précisez le terminal exact.' },
        ],
        tip: 'Pratique pour certaines lignes intérieures ; vérifiez le temps de transfert avant d’opter pour une correspondance le jour même.',
      },
      {
        key: 'vandon',
        label: 'Aéroport de Van Don (VDO)',
        airport: 'vandon',
        routes: [{ mode: 'Voiture privée ou taxi', time: 'Variable', notes: 'Environ 60 à 70 km. Réservez la voiture à l’avance et faites confirmer la durée du trajet.' }],
        tip: 'Vérifiez bien les jours de vol : les liaisons au départ de Van Don sont peu nombreuses.',
      },
      {
        key: 'ninhbinh',
        label: 'Ninh Binh / Tam Coc',
        routes: [
          { mode: 'Voiture privée', time: '3,5–4 h', notes: 'Porte à porte par les voies express.' },
          { mode: 'Limousine partagée (minibus)', time: '4–4,5 h', notes: 'Départs de Tam Coc, avec un arrêt à Tuan Chau pour certains services. Aucun ne permet de garantir une arrivée avant 10 h 45.' },
        ],
        tip: 'Pour un enregistrement en matinée, une nuit à Ha Long la veille est la solution la plus sûre.',
      },
    ],
  },
  itineraries: { title: 'Les itinéraires Green Ruby', days: (n) => `${n} jours et ${n - 1} nuit${n > 2 ? 's' : ''}`, view: 'Voir l’itinéraire' },
};

export default transfer;
