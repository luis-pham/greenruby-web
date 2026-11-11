import type { GuideContent } from './types';

// Spanish version of first-time.en.ts (the English file is the source of truth). DRAFT, PENDING_REVIEW:
// transcreated 2026-11-11 for one neutral Spanish edition (Spain + Latin America) following
// docs/i18n-audit/es/drafts/BRIEF-ES.md (owner-confirmed facts, 11 Nov 2026); needs native Spanish review.
// Ship, cabin and itinerary names stay Latin; tender = « lancha de enlace », day boat = « barco de excursión de día »,
// Gia Luan = « embarcadero de Gia Luan », lounge = « sala VIP de Green Ruby ». Usted throughout.
// Machine time values in timeline steps (time fields) are kept as in the source; prose times use 24 h without a
// leading zero (7:30, 10:45). Decimal comma (2,5–3 h) where a figure is kept.
// REVIEW: (1) Lan Ha kayak suspension (local regulations, as of October 2026) added wherever kayaking is listed as
// included or as an activity (inclusions intro + table row, on-board afternoon); "as of October 2026" added to the
// which-bay table cell. Ha Long kayaking (Luon Cave) unchanged.
// REVIEW: (2) Launch wording: "begin sailing in February 2027" / "enter service" rendered as
// « primeras salidas previstas para febrero de 2027 » (brief: never "en servicio").
// REVIEW: (3) Request-only booking: inclusions note and FAQ arrival answer say bookings are not open yet and guests
// send a « solicitud de reserva » with their dates; "before confirming a booking" rendered as "before sending your request".
// REVIEW: (4) Transfers: timeline "If you book a transfer" made explicit as a private transfer on request at extra cost
// (no shared shuttle offered by Green Ruby). Road time kept as the source range 2.5–3 h (brief: about 2.5 h).
// REVIEW: (5) Cancellation summary kept as in the source (30+ days full refund, increasing charges, none within 7 days);
// no deposit percentages stated.
// REVIEW: (6) Terms to check: « limusina compartida (minibús) » (shared limousine van), « pesca de calamares »
// (squid fishing), « taichí ».
const firstTime: GuideContent = {
  metaTitle: 'Primer crucero por Halong: qué esperar',
  metaDescription:
    '¿Su primer crucero por la bahía de Halong? Qué bahía y cuántas noches elegir, qué incluye, cómo es el día de embarque, qué llevar y los errores más comunes.',
  breadcrumb: 'Guía del primer crucero',
  eyebrow: 'Guía de viaje',
  title: 'Su primer crucero por la bahía de Halong: guía práctica',
  lead: '¿Prepara su primer crucero con noche a bordo por la bahía de Halong o la bahía de Lan Ha? Esta guía le ayuda a elegir el itinerario adecuado, le cuenta qué esperar a bordo y reúne los detalles prácticos que conviene tener resueltos antes de la salida.',
  summaryTitle: 'En resumen',
  summary: [
    ['¿Merece la pena?', 'Sí, siempre que pase al menos una noche a bordo: la bahía luce mejor al atardecer y a primera hora de la mañana, cuando ya se han marchado los barcos de excursión de día.'],
    ['¿Cuánto tiempo?', '**2 días y 1 noche** para una primera visita; **3 días y 2 noches** para llegar a zonas más tranquilas y viajar sin prisas.'],
    ['¿Qué bahía?', 'La **bahía de Halong**, por sus cuevas y miradores clásicos; la **bahía de Lan Ha**, por sus aguas más tranquilas, la vida de las aldeas de la isla de Cat Ba y sus playas.'],
    ['Cómo llegar', 'Desde Hanói hasta Tuan Chau hay unas dos horas y media o tres horas por carretera (estimación). Consulte la [guía de traslados](transfer).'],
    ['Día de embarque', 'Según el programa publicado por Green Ruby, el registro empieza hacia las 10:45 y la lancha de enlace sale hacia el barco alrededor de las 11:45.'],
  ],
  published: '2026-10-24',
  updated: { iso: '2026-10-26', label: 'Actualizado el 26 de octubre de 2026' },
  tocTitle: 'En esta guía',
  sections: [
    {
      id: 'worth-it',
      title: '¿Vale la pena un crucero con noche a bordo por la bahía de Halong?',
      blocks: [
        { p: 'La bahía de Halong es Patrimonio Mundial de la UNESCO, reconocida por su extraordinario paisaje de roca caliza y por su valor geológico. En 2023 el sitio se amplió para incluir el archipiélago de Cat Ba, del que forma parte la bahía de Lan Ha. Buena parte de su atractivo está en ese inmenso conjunto de islas calizas, que se aprecia mejor desde el agua y con tiempo para contemplarlo.' },
        { p: 'Es posible visitarla en una excursión de un día desde Hanói, pero gran parte de la jornada se va en la carretera: entre cinco y seis horas, sumando ida y vuelta. Un crucero con noche a bordo le permite disfrutar de la bahía fuera de las horas de mayor afluencia: ver la puesta de sol, dormir rodeado de islas de piedra caliza y vivir la calma de las primeras horas de la mañana.' },
        { p: 'Quizá no sea la mejor opción si prefiere viajar por su cuenta, pasar días enteros en la playa o mantener un horario totalmente libre. Las actividades siguen un itinerario previsto y pueden cambiar según el tiempo, las mareas y la normativa local.' },
      ],
    },
    {
      id: 'which-bay',
      title: '¿Bahía de Halong o bahía de Lan Ha?',
      blocks: [
        { p: 'Las dos bahías comparten el mismo paisaje kárstico. Lo que cambia es lo que se hace en cada una y cuánta gente hay. Nuestra [comparación completa de las dos bahías](bayComparison) entra en detalle; en pocas palabras:' },
        {
          table: {
            head: ['', 'Bahía de Halong', 'Bahía de Lan Ha'],
            rows: [
              ['Carácter', 'El núcleo clásico del sitio de la UNESCO; rutas más concurridas', 'Frente a la isla de Cat Ba; menos barcos y fondeaderos más tranquilos'],
              ['Visitas destacadas', '[Cueva de Sung Sot](destination:sung-sot-cave), [isla de Ti Top](destination:ti-top-island), [cueva de Luon](destination:luon-cave)', '[Cueva Sang Toi (Dark & Bright)](destination:dark-bright-cave), [laguna de Ao Ech](destination:ao-ech-lagoon), [aldea de Viet Hai](destination:viet-hai-village)'],
              ['Ideal para', 'Quienes visitan la zona por primera vez y quieren ver los lugares más célebres', 'Un ritmo más pausado, visitas a aldeas y playas (el kayak en la bahía de Lan Ha está suspendido temporalmente por la normativa local, según la información de octubre de 2026)'],
              ['Barco de Green Ruby', 'Green Ruby 1', 'Green Ruby 2'],
            ],
          },
        },
        { p: 'Los huéspedes de los dos barcos de Green Ruby hacen el registro en Tuan Chau; quienes viajan en Green Ruby 2 continúan después en lancha de enlace hasta el embarcadero de Gia Luan, donde embarcan en la bahía de Lan Ha. Puede ver todas las paradas en el [mapa de destinos](destinations).' },
      ],
    },
    {
      id: 'how-long',
      title: 'Crucero de un día, de 2 días y 1 noche o de 3 días y 2 noches',
      blocks: [
        {
          table: {
            head: ['', 'Crucero de un día', '2 días y 1 noche', '3 días y 2 noches'],
            rows: [
              ['Tiempo en el agua', 'Unas 4–6 horas', 'Algo menos de 24 horas', 'Unos 2 días, según el itinerario'],
              ['Qué se ve', 'Una sola zona, normalmente la más concurrida', 'Dos o tres paradas, la puesta de sol y el amanecer', 'Un día más para recorrer rincones más tranquilos de la bahía'],
              ['Ritmo', 'Apresurado', 'Cómodo', 'Relajado'],
              ['Para quién', 'Agendas muy ajustadas', 'La mayoría de quienes visitan la bahía por primera vez', 'Viajeros que buscan zonas tranquilas y familias con tiempo'],
            ],
          },
        },
        { p: 'Si duda, elija 2 días y 1 noche. Un crucero de dos noches es mejor opción si quiere ir más allá: en el programa de Green Ruby, el segundo día incluye una excursión en barco de excursión de día a [Cua Van](destination:cua-van-floating-village) y a la [cueva de Tien Ong](destination:tien-ong-cave) en la bahía de Halong, o a la [aldea de Viet Hai](destination:viet-hai-village), en la isla de Cat Ba, en la bahía de Lan Ha.' },
      ],
    },
    {
      id: 'cabins',
      title: 'Cómo elegir camarote y qué hay a bordo',
      blocks: [
        { p: 'En el camarote descansará después de cada jornada de visitas, así que conviene comparar algo más que las fotografías. El tamaño, la ubicación y el equipamiento marcan una diferencia notable en la comodidad a bordo.' },
        {
          ul: [
            '**Espacio exterior privado:** un balcón o una terraza le permite disfrutar de las vistas sin salir del camarote.',
            '**Distribución de las camas:** compruebe si el camarote tiene cama de matrimonio o dos camas individuales, y si es posible añadir una cama supletoria.',
            '**Tamaño y ubicación:** tenga en cuenta la superficie, la cubierta en la que se encuentra y la cercanía a las zonas comunes.',
            '**Instalaciones a bordo:** fíjese en la cubierta solar, el restaurante, el salón y las instalaciones de bienestar, además del equipamiento del camarote. Un camarote más pequeño también puede resultar muy cómodo, sobre todo si piensa pasar tiempo en cubierta.',
          ],
        },
        { p: 'Green Ruby 1 y Green Ruby 2 tendrán previsiblemente cuatro categorías de camarote: Serenity Deluxe, Ocean Breeze Premium, Royal Romance Suite e Imperial Suite. Antes de reservar, conviene comprobar las especificaciones y el equipamiento definitivos en la [información sobre la flota](/about-us/brand-facts).' },
      ],
    },
    {
      id: 'inclusions',
      title: '¿Qué está incluido y qué se paga aparte?',
      blocks: [
        { p: 'La tarifa de un crucero con noche a bordo suele incluir el alojamiento, las comidas y las visitas programadas. Los traslados, las bebidas y los servicios opcionales pueden cobrarse aparte.' },
        { p: 'Los itinerarios previstos de Green Ruby incluyen las comidas, las entradas a los lugares programados y actividades como el kayak o los paseos en barca de bambú (el kayak en la bahía de Lan Ha está suspendido temporalmente por la normativa local, según la información de octubre de 2026). Los servicios adicionales, como los traslados y los tratamientos de spa, se cobran por lo general aparte:' },
        {
          table: {
            head: ['Normalmente incluido', 'Normalmente aparte'],
            rows: [
              ['Todas las comidas del itinerario (almuerzo, cena, desayuno, brunch)', 'Traslados entre Hanói o el aeropuerto y Tuan Chau'],
              ['Camarote con baño privado y aire acondicionado', 'Bebidas, salvo que se indique lo contrario'],
              ['Entradas a las visitas programadas', 'Tratamientos de spa'],
              ['Kayak o barca de bambú en las paradas previstas (kayak suspendido en la bahía de Lan Ha)', 'Propinas para la tripulación y los guías'],
              ['Clase de cocina y taichí por la mañana; guía a bordo', 'Seguro de viaje y gastos personales'],
              ['Excursión en barco de excursión de día (solo 3 días y 2 noches)', ''],
            ],
          },
        },
        { p: 'Antes de enviar su solicitud de reserva, revise siempre qué incluye y qué excluye el [itinerario](itineraries) elegido, así como las condiciones de cancelación, y compruebe después los servicios que figuran en la confirmación. Según la política de cancelación publicada por Green Ruby (consulte las [preguntas frecuentes](faq)), las cancelaciones con 30 días o más de antelación se reembolsan íntegramente; a partir de ahí, los gastos aumentan a medida que se acerca la fecha de salida, y las cancelaciones con menos de 7 días de antelación no son reembolsables. Las condiciones aplicables se confirman al reservar.' },
        { note: 'Las primeras salidas de los barcos de Green Ruby están previstas para febrero de 2027. Las reservas aún no están abiertas: ya puede enviarnos una solicitud de reserva con sus fechas. Las tarifas y las fechas de salida se confirman al reservar.' },
      ],
    },
    {
      id: 'before-you-go',
      title: 'Antes de salir',
      blocks: [
        {
          ul: [
            '**Pasaporte:** lleve el original. Las navieras registran a cada pasajero ante las autoridades portuarias antes del embarque.',
            '**Visado y entrada al país:** consulte con antelación los requisitos de entrada a Vietnam vigentes para su nacionalidad.',
            '**Alimentación y salud:** comunique alergias, dietas y problemas de salud al hacer la reserva, no el mismo día en el muelle.',
            '**Seguro de viaje:** muy recomendable, sobre todo de junio a octubre, cuando las tormentas pueden alterar las salidas.',
            '**Pagos:** algo de dinero en dong vietnamitas resulta útil para pequeñas compras en tierra; confirme con antelación qué [formas de pago](/payment-methods) se aceptan a bordo.',
          ],
        },
      ],
    },
    {
      id: 'getting-there',
      title: 'De Hanói a la terminal de cruceros',
      blocks: [
        { p: 'Tuan Chau está a unos 160–180 km del centro de Hanói por autopista. Calcule unas dos horas y media o tres horas en vehículo privado, y algo más en limusina compartida (minibús), que se detiene para recoger a otros pasajeros y hace una parada de descanso. Todos los tiempos son estimaciones: el tráfico para salir de Hanói y los fines de semana festivos son lo que más influye.' },
        { p: 'Los traslados no están incluidos en la tarifa del crucero. Green Ruby puede organizar un vehículo privado bajo petición, con coste adicional. La [guía de traslados de Hanói a la bahía de Halong](transfer) compara todas las opciones, incluidas las llegadas a los aeropuertos de Noi Bai, Cat Bi y Van Don.' },
      ],
    },
    {
      id: 'boarding-day',
      title: 'El día de embarque, hora a hora',
      blocks: [
        { p: 'En muchos cruceros con noche a bordo, los huéspedes hacen el registro en una sala en tierra y después llegan al barco en una lancha de enlace.' },
        { p: 'Green Ruby tiene previsto recibir a sus huéspedes en Tuan Chau, con un traslado distinto para Green Ruby 1 y para Green Ruby 2. Elija un barco a continuación para ver cómo está previsto el día de embarque. Todos los horarios son provisionales y pueden cambiar según el tiempo, las necesidades operativas y las instrucciones de las autoridades portuarias.' },
        { widget: 'boarding-timeline' },
        { p: '**El trayecto en lancha de enlace.** Las lanchas son embarcaciones a motor cubiertas. La tripulación le ayuda a subir a bordo, se facilitan chalecos salvavidas y el equipaje se lo llevan por usted. Tenga a mano un bolso pequeño con el pasaporte, la medicación y el teléfono.' },
      ],
    },
    {
      id: 'on-board',
      title: 'Qué esperar a bordo',
      blocks: [
        {
          ul: [
            '**Por la tarde:** sesión informativa de seguridad, almuerzo mientras el barco navega y, después, la primera excursión: una cueva o una laguna en kayak o en barca de bambú (en la bahía de Lan Ha el kayak está suspendido temporalmente por la normativa local, según la información de octubre de 2026) y, a veces, una playa.',
            '**Al anochecer:** puesta de sol en la cubierta solar, clase de cocina o tiempo libre, cena y, para quien lo desee, pesca de calamares desde cubierta.',
            '**Por la mañana:** taichí al amanecer, un desayuno ligero y una última visita, a menudo una cueva, antes del brunch y del regreso a puerto.',
          ],
        },
        { p: 'Los barcos fondean en zonas designadas para pasar la noche y los huéspedes duermen a bordo. La mayoría de las actividades de ocio son opcionales y están sujetas a las normas de seguridad; avise a la tripulación si prefiere quedarse a bordo en alguna parada. Consulte las [experiencias a bordo](/experiences) previstas.' },
      ],
    },
    {
      id: 'safety',
      title: 'Clima, seguridad, niños y accesibilidad',
      blocks: [
        { p: '**Clima.** De octubre a abril el tiempo es más fresco y seco; de mayo a septiembre hace calor y humedad, y es también la temporada de tormentas, aproximadamente de junio a octubre. Cuando se emite un aviso de tormenta, las autoridades pueden suspender con muy poca antelación todas las salidas en la bahía. Las navieras reprograman entonces el crucero o lo reembolsan según su política. En invierno, la bruma y las nubes bajas pueden reducir la visibilidad. Consulte [la mejor época para visitar la bahía](bestTime) para ver las condiciones mes a mes.' },
        { p: '**Mareo.** Las bahías están resguardadas por las islas y el agua suele estar relativamente tranquila, aunque puede notarse algo de movimiento, sobre todo con viento fuerte. Si es propenso al mareo, lleve su remedio habitual y pregunte a la tripulación por las condiciones antes de zarpar.' },
        { p: '**Niños.** Las familias son bienvenidas en la mayoría de los cruceros. Los niños llevan chaleco salvavidas en todas las actividades en el agua, y los más pequeños suelen ir en barca de bambú con un adulto en lugar de en kayak. Al reservar, consulte las condiciones para niños, las opciones de cama y las [normas de seguridad](/safety-policies).' },
        { p: '**Accesibilidad.** Para embarcar hay que pasar del muelle a la lancha y de la lancha al barco, y muchas visitas incluyen escalones: la [cueva de Sung Sot](destination:sung-sot-cave) y el mirador de [Ti Top](destination:ti-top-island) tienen largas escaleras. Las personas con movilidad reducida suelen poder disfrutar del crucero desde el barco; comunique sus necesidades al equipo antes de reservar para que pueda orientarle con franqueza.' },
      ],
    },
    {
      id: 'packing',
      title: 'Qué llevar: lista de equipaje',
      blocks: [
        { p: 'Mejor una bolsa de viaje pequeña que una maleta grande: resulta más práctica en la lancha de enlace y en el camarote.' },
        {
          checklist: [
            { title: 'Documentos', items: ['Pasaporte original', 'Confirmación de la reserva', 'Datos del seguro de viaje', 'Algo de efectivo para extras'] },
            { title: 'Ropa', items: ['Traje de baño y toalla de secado rápido', 'Calzado cómodo y antideslizante para cuevas y escalones', 'Una prenda de abrigo ligera o chaqueta (imprescindible de noviembre a marzo)', 'Sombrero y gafas de sol'] },
            { title: 'Imprescindibles', items: ['Protector solar y repelente de insectos', 'Medicación personal y, si lo necesita, remedio contra el mareo', 'Funda impermeable para el teléfono en el kayak', 'Batería externa y cable de carga'] },
          ],
        },
      ],
    },
    {
      id: 'mistakes',
      title: 'Errores frecuentes en un primer crucero',
      blocks: [
        {
          ol: [
            '**Reservar un vuelo demasiado pronto después del crucero.** El desembarque, el traslado por carretera y la facturación en el aeropuerto llevan su tiempo. Deje un amplio margen antes de cualquier vuelo de conexión y confirme con la naviera la hora prevista de regreso.',
            '**Ir al muelle equivocado.** Ha Long tiene más de un puerto de pasajeros. Indique al conductor el [punto de registro](checkin-map) exacto; los huéspedes de Green Ruby hacen el registro en Tuan Chau.',
            '**Dejar el pasaporte en el hotel.** Sin el documento original es posible que no le permitan embarcar.',
            '**Optar por una excursión de un día para ganar tiempo.** Pasará la mayor parte del día en un vehículo y se perderá la bahía en sus horas más tranquilas.',
            '**Esperar unas vacaciones de playa en invierno.** De diciembre a febrero el agua está fría y el cielo suele estar gris; venga por el paisaje, no a tomar el sol.',
            '**No avisar con antelación de necesidades alimentarias o de movilidad.** Es mucho más fácil prepararlo todo antes de la salida.',
          ],
        },
      ],
    },
    {
      id: 'itineraries',
      title: 'Itinerarios de Green Ruby',
      blocks: [{ p: 'Hay cuatro itinerarios previstos, dos por bahía, cada uno en versión de 2 días y 1 noche o de 3 días y 2 noches.' }, { widget: 'itineraries' }],
    },
  ],
  faqTitle: 'Preguntas habituales antes del primer crucero',
  faq: [
    { q: '¿Merece la pena un crucero por la bahía de Halong?', a: 'Si quiere ver la bahía a distintas horas del día y tener tiempo para descansar, vale la pena considerar un crucero con noche a bordo. En una excursión de un día desde Hanói, buena parte del tiempo se pasa en la carretera.' },
    { q: '¿Cuántos días hacen falta para la bahía de Halong?', a: 'Dos días y una noche bastan para una primera visita. Elija tres días y dos noches si quiere llegar a zonas más tranquilas en barco de excursión de día y viajar a un ritmo más pausado.' },
    { q: '¿Qué llevar en un crucero por la bahía de Halong?', a: 'El pasaporte original, traje de baño, calzado cómodo y antideslizante, una chaqueta ligera de noviembre a marzo, protector solar, la medicación que necesite y una funda impermeable para el kayak. Una bolsa de viaje pequeña es más práctica que una maleta.' },
    { q: '¿Me marearé en un crucero por la bahía de Halong?', a: 'En estas bahías resguardadas el agua suele estar relativamente tranquila, aunque puede notarse algo de movimiento, sobre todo con viento fuerte. Si es sensible al movimiento, lleve su remedio habitual.' },
    { q: '¿Se pueden cancelar los cruceros por el mal tiempo?', a: 'Sí. Ante un aviso de tormenta, sobre todo entre junio y octubre, las autoridades pueden suspender las salidas con muy poca antelación. La naviera reprograma entonces el crucero o lo reembolsa según su política.' },
    { q: '¿A qué hora tengo que llegar?', a: 'Según el programa publicado por Green Ruby, el registro en la sala VIP de Tuan Chau empieza hacia las 10:45 y la lancha de enlace sale alrededor de las 11:45. Como las primeras salidas están previstas para febrero de 2027, el equipo de reservas le confirmará la hora y el lugar definitivos antes del viaje.' },
  ],
  sourcesTitle: 'Fuentes',
  sources: [
    { title: 'Centro del Patrimonio Mundial de la UNESCO: bahía de Ha Long – archipiélago de Cat Ba', url: 'https://whc.unesco.org/en/list/672' },
    { title: 'Tuoi Tre News (20 de julio de 2025): prohibida la salida de barcos turísticos en la bahía de Halong ante la llegada del tifón Wipha (en inglés)', url: 'https://news.tuoitre.vn/ha-long-bay-tourist-boats-banned-from-departing-as-typhoon-wipha-nears-103250720163544717.htm' },
  ],
  related: {
    title: 'Siga planificando',
    links: [
      { href: 'transfer', title: 'De Hanói a la bahía de Halong', body: 'Traslados, puertos y tiempos de viaje realistas.' },
      { href: 'destinations', title: 'Qué ver en la bahía de Halong', body: 'Cuevas, islas y aldeas, con notas prácticas.' },
      { href: 'luxuryPillar', title: 'Cruceros de lujo sostenibles en la bahía de Halong', body: 'Qué hace que un crucero tenga de verdad menos impacto y cómo comprobar lo que se anuncia.' },
    ],
  },
  estimateNote: 'Los tiempos de viaje y las duraciones de esta página son estimaciones, no horarios. Los itinerarios de Green Ruby son provisionales hasta las primeras salidas, previstas para febrero de 2027.',
  timeline: {
    label: 'Elija su barco',
    note: 'Horarios tomados de los itinerarios publicados por Green Ruby; provisionales y sujetos al tiempo y a las instrucciones del puerto el mismo día.',
    tabs: [
      {
        key: 'gr1',
        label: 'Green Ruby 1 · Bahía de Halong',
        steps: [
          { time: '≈ 07:30', title: 'Salida de Hanói', body: 'Si reserva un traslado privado (bajo petición, con coste adicional), la recogida en Hanói es hacia las 7:30–8:00; el trayecto dura unas dos horas y media o tres horas (estimación).' },
          { time: '≈ 10:45', title: 'Registro en Tuan Chau', body: 'Sala VIP de Green Ruby en Tuan Chau: control de pasaportes, entrega del equipaje y bebida de bienvenida.' },
          { time: '≈ 11:45', title: 'Lancha de enlace al barco', body: 'Un breve trayecto hasta Green Ruby 1, fondeado en la bahía de Halong.' },
          { time: '≈ 12:30', title: 'Sesión de seguridad y camarotes', body: 'Sesión informativa en el restaurante y, después, entrega de llaves y tiempo para instalarse.' },
          { time: '≈ 13:00', title: 'Almuerzo navegando', body: 'El barco se adentra en la bahía durante el almuerzo.' },
          { time: '≈ 15:30', title: 'Primera excursión', body: 'Cueva de Luon en kayak o en barca de bambú y, hacia las 16:30, isla de Ti Top.' },
        ],
      },
      {
        key: 'gr2',
        label: 'Green Ruby 2 · Bahía de Lan Ha',
        steps: [
          { time: '≈ 07:30', title: 'Salida de Hanói', body: 'Si reserva un traslado privado (bajo petición, con coste adicional), la recogida en Hanói es hacia las 7:30–8:00; el trayecto dura unas dos horas y media o tres horas (estimación).' },
          { time: '≈ 10:45', title: 'Registro en Tuan Chau', body: 'En la misma sala VIP de Green Ruby en Tuan Chau que los huéspedes de Green Ruby 1.' },
          { time: '≈ 11:45', title: 'Lancha de enlace al embarcadero de Gia Luan', body: 'La lancha cruza hasta el embarcadero de Gia Luan, en la isla de Cat Ba (Haiphong), donde embarca en Green Ruby 2, en la bahía de Lan Ha.' },
          { time: '≈ 12:30', title: 'Sesión de seguridad y camarotes', body: 'Sesión informativa en el restaurante y, después, entrega de llaves y tiempo para instalarse.' },
          { time: '≈ 13:00', title: 'Almuerzo navegando', body: 'Almuerzo mientras el barco se adentra en la bahía de Lan Ha.' },
          { time: '≈ 15:00–15:30', title: 'Primera excursión', body: 'Cueva Sang Toi (Dark & Bright) en barca de bambú (el kayak está suspendido temporalmente por la normativa local, según la información de octubre de 2026).' },
        ],
      },
    ],
  },
  itineraries: { title: 'Itinerarios de Green Ruby', days: (n) => `${n} días y ${n - 1} noche${n > 2 ? 's' : ''}`, view: 'Ver itinerario' },
};

export default firstTime;
