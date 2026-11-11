import type { GuideContent } from './types';

// Spanish version of transfer.en.ts (the English file is the source of truth). DRAFT, PENDING_REVIEW:
// transcreated 2026-11-11 for one neutral Spanish edition (Spain + Latin America) following
// docs/i18n-audit/es/drafts/BRIEF-ES.md; needs native Spanish review.
// Durations, fares and timetables are copied from the English (operators.ts registry, checked 2026-10-27).
// Operator names stay Latin; amounts keep their currency (VND, USD), thousands grouped with U+00A0 (RAE);
// decimal comma (2,5 h); prose times 24 h without a leading zero (7:00, 10:45).
// REVIEW: (1) "shuttle" section: EN says Green Ruby plans a shared shuttle and private cars; ES says only that a
// private transfer can be arranged on request at extra cost (owner fact: no shared shuttle offer).
// (2) FAQ "transfer included": adds that a private transfer can be arranged on request, at extra cost.
// (3) estimateNote: "until the ships enter service in February 2027" -> "hasta las primeras salidas, previstas para
// febrero de 2027" (brief: never "en servicio"). (4) "US$15" / "US$60–120" written as "15 USD" / "60–120 USD".
// (5) private-car: EN "for a group of four or more, that can cost about the same as individual shuttle seats" not kept
// (4 seats x 250 000–360 000 VND is well under 2 800 000 VND); replaced by "compare the quote with the total of
// individual seats", as in the French edition.
// Not changed: third-party shared-van pick-up 6:00–6:30 (EN, aligned with 10:45 check-in); the brief's 7:30–8:00
// pick-up refers to Green Ruby's own private transfer and is not stated on this page. Road ranges kept as in EN
// (2,5–3 h private car) — the brief's "about 2,5 h" falls within them.
// Terms to check: « limusina compartida (minibús) » (shared limousine van), « autobús por autopista » (expressway
// coach), « transporte por aplicación » (ride-hailing), « lancha de enlace » (tender).
const transfer: GuideContent = {
  metaTitle: 'Cómo ir de Hanói a la bahía de Halong',
  metaDescription:
    'De Hanói a la bahía de Halong en limusina compartida, vehículo privado o autobús: empresas, tarifas y horarios de octubre de 2026, y rutas desde Noi Bai.',
  breadcrumb: 'De Hanói a la bahía de Halong',
  eyebrow: 'Guía de viaje',
  title: 'Cómo ir de Hanói a la bahía de Halong: traslados y puertos de crucero',
  lead: 'Hanói, el aeropuerto de Noi Bai, Ninh Binh o los demás aeropuertos de la zona: así se llega a la bahía de Halong desde cada uno de ellos. Esta guía reúne las empresas de transporte que publican tarifas y horarios, explica la diferencia entre los puertos de cruceros e indica qué opciones le permiten llegar a tiempo a un registro por la mañana en Tuan Chau.',
  summaryTitle: 'Respuesta rápida',
  summary: [
    ['Lo más rápido desde Hanói', 'En vehículo privado se tarda normalmente unas **2,5–3 horas** hasta Tuan Chau. Una empresa publica tarifas **desde 2 800 000 VND** por una limusina completa de 9 plazas.'],
    ['Limusina compartida', 'La plaza cuesta unos **250 000–360 000 VND**, con recogida en hoteles del centro de Hanói. Para un registro a las 10:45, elija un minibús que salga de Hanói **hacia las 7:00 como muy tarde**.'],
    ['Desde Ninh Binh o Tam Coc', 'Calcule **3,5–4,5 horas**. Ningún servicio compartido llega a Tuan Chau con garantías antes de las 10:45, así que duerma en Ha Long la noche anterior o salga al amanecer en vehículo privado.'],
    ['Si llega en avión', 'Desde Noi Bai salen limusinas compartidas a Ha Long cada hora (**600 000 VND** la plaza para un pasajero que viaja solo). Desde Cat Bi o Van Don, reserve un traslado privado.'],
    ['Registro de Green Ruby', 'Green Ruby tiene previsto recibir a los huéspedes de sus dos barcos en el puerto internacional de pasajeros de Tuan Chau. El registro está previsto, de forma provisional, hacia las 10:45.'],
    ['Después del crucero', 'El desembarque está previsto hacia las 11:00–11:30. Reserve un minibús de regreso que salga de Tuan Chau a las 12:00 o más tarde, y evite vuelos demasiado próximos a esa hora.'],
  ],
  published: '2026-10-24',
  updated: { iso: '2026-10-27', label: 'Actualizado el 27 de octubre de 2026' },
  tocTitle: 'En esta guía',
  sections: [
    {
      id: 'compare',
      title: 'De Hanói a la bahía de Halong: comparación de opciones',
      blocks: [
        { p: 'Por carretera, del centro de Hanói a Tuan Chau, donde hacen el registro muchos cruceros con noche a bordo, hay unos 160–180 km. Casi todo el trayecto discurre por autopistas modernas; lo que varía es el tiempo que se tarda en salir de Hanói y si el vehículo se detiene para recoger a otros pasajeros.' },
        {
          table: {
            head: ['Opción', 'Puerta a puerta (estimación)', 'Tarifas publicadas (oct. 2026)', 'Ideal para', 'A tener en cuenta'],
            rows: [
              ['Vehículo privado', '2,5–3 h', 'Desde 2 800 000 VND por vehículo de 9 plazas', 'Familias, grupos pequeños, registros temprano, recogidas en el aeropuerto', 'Usted elige la hora de recogida; compare el total con el precio de las plazas para su grupo'],
              ['Limusina compartida (minibús)', '3–3,5 h', '250 000–360 000 VND o 15 USD por plaza', 'Parejas y viajeros solos', 'Salidas a horas fijas; recoge a otros pasajeros por el camino; las normas para dejarle en el puerto varían'],
              ['Autobús por autopista', '2,5 h desde la estación de autobuses de My Dinh, más el trayecto hasta allí', 'Unos 160 000 VND por plaza', 'Viajeros con presupuesto ajustado y tiempo de sobra', 'Sale de una estación de autobuses, no de su hotel; difícil de cuadrar con un registro por la mañana'],
            ],
          },
        },
        { note: 'Los tiempos de viaje son estimaciones con tráfico normal, no garantías. Cuente con más tiempo los viernes por la tarde, los domingos por la tarde y en festivos como el Tet o el 30 de abril y el 1 de mayo, cuando las empresas también pueden subir las tarifas.' },
      ],
    },
    {
      id: 'planner',
      title: 'Planifique su traslado',
      blocks: [
        { p: 'Elija su punto de partida para ver las principales opciones, la franja de salida recomendada para un registro a las 10:45, las tarifas publicadas, las empresas que hemos consultado y lo que conviene prever para el último día. Añada margen para el tráfico, los retrasos y los trámites en el aeropuerto.' },
        { widget: 'transfer-selector' },
      ],
    },
    {
      id: 'old-quarter',
      title: 'Del barrio antiguo de Hanói a Tuan Chau: empresas y horarios',
      blocks: [
        { p: 'La mayoría de los viajeros sale del barrio antiguo. En vehículo privado, salir entre las 6:45 y las 7:15 aproximadamente deja margen para el tráfico y una parada de descanso antes del registro de las 10:45. En minibús compartido, reserve una salida que **deje Hanói hacia las 7:00 como muy tarde**: las recogidas empiezan entre 30 y 60 minutos antes, así que cuente con que le recojan entre las 6:00 y las 6:30, más o menos.' },
        { p: 'Los minibuses compartidos que salen de Hanói a las 8:00 o más tarde llegan a Tuan Chau demasiado cerca de la hora de registro, o después. Es el caso de la única salida de Cat Ba Express, a las 8:00: según la duración que la propia empresa publica, llega hacia las 10:40.' },
        { operators: ['hanoi-halong'], caption: 'Hanói → Ha Long: empresas con rutas publicadas' },
        { p: 'En un horario, “Tuan Chau” puede referirse a una cafetería cerca del puerto, a la entrada del puerto o a la propia terminal. Antes de pagar, pida a la empresa que confirme que le dejará en el **puerto internacional de pasajeros de Tuan Chau** (Tuan Chau International Passenger Port) y no en el puerto internacional de cruceros de Ha Long, en Bai Chay. Ha Long Travel Limousine, por ejemplo, no entra en el puerto con un solo pasajero: le deja frente a la entrada y debe continuar a pie. Con dos o más pasajeros, el vehículo puede entrar pagando una tasa portuaria de 30 000 VND.' },
      ],
    },
    {
      id: 'shuttle',
      title: 'Limusina compartida (minibús)',
      blocks: [
        { p: 'Las llamadas “limusinas” son minibuses de 9 a 11 plazas con asientos reclinables. La mayoría recoge a los pasajeros en hoteles del centro de Hanói, hace una sola parada en el camino y los deja en puntos fijos o en direcciones concretas de Ha Long. Las empresas de la tabla anterior tienen varias salidas al día, así que puede elegir la que mejor encaje con su hora de registro.' },
        {
          ul: [
            'Una opción compartida cómoda para una o dos personas.',
            'La ronda de recogidas puede durar 30 minutos o más antes de que el minibús salga de la ciudad.',
            'El precio puede variar según el asiento: las plazas “VIP” centrales suelen costar más que las delanteras o las traseras.',
            'El espacio para equipaje es limitado: un bulto de mano y una maleta mediana por persona es un máximo razonable.',
            'Los minibuses de regreso siguen el horario de cada empresa; reserve una salida posterior al desembarque de la mañana.',
          ],
        },
        { p: 'Los traslados no están incluidos en las tarifas de los cruceros de Green Ruby. Bajo petición, y con coste adicional, se puede organizar un traslado privado entre Hanói y Ha Long; Green Ruby no ofrece servicio de lanzadera compartida. El horario y el precio se le confirmarán junto con su reserva.' },
      ],
    },
    {
      id: 'private-car',
      title: 'Vehículo privado',
      blocks: [
        { p: 'El vehículo privado es la opción más flexible, sobre todo para familias, grupos pequeños y viajeros que llegan en avión. Le recogen en el hotel o en la terminal y le llevan directamente al punto de registro del crucero.' },
        { p: 'Hay pocas tarifas publicadas. Ha Long Travel Limousine anuncia una limusina completa de 9 o 10 plazas desde 2 800 000–3 000 000 VND por trayecto desde Hanói, y desde 3 000 000–3 200 000 VND desde el aeropuerto de Noi Bai. Antes de decidir, compare ese presupuesto con el total de las plazas individuales en minibús compartido para su grupo.' },
        {
          ul: [
            'Confirme el tamaño del vehículo y la capacidad de equipaje antes de reservar.',
            'Pregunte si los peajes, el aparcamiento y la entrada al puerto están incluidos.',
            'Si lo necesita, solicite con antelación una silla infantil.',
            'Facilite los datos de su vuelo a la empresa de traslados y consulte su política de espera.',
            'Asegúrese de que el conductor conoce la ubicación exacta de la terminal de cruceros o de la sala de registro.',
          ],
        },
        { p: 'Conducir por su cuenta exige un permiso válido en Vietnam y un lugar donde aparcar cerca del puerto durante todo el crucero, por lo que la mayoría de los viajeros prefiere ir con conductor.' },
      ],
    },
    {
      id: 'bus',
      title: 'Autobús de línea',
      blocks: [
        { p: 'Desde las estaciones de autobuses de Hanói salen autocares hacia Ha Long. Kumho Viet Thanh publica un servicio por autopista desde la estación de My Dinh (6:30, 9:30, 11:30, 13:30, 15:30 y 17:30, unos 160 000 VND) con Tuan Chau entre sus paradas en Ha Long, aunque su web no parece actualizada desde 2022. Otros autobuses terminan en Bai Chay, desde donde hay que tomar un taxi hasta el puerto.' },
        { p: 'Incluso el autobús de las 6:30 deja muy poco margen para un registro a las 10:45, una vez sumados el trayecto hasta My Dinh y el paseo o el taxi desde la parada. El autobús es buena opción sobre todo si pasa la noche anterior en Ha Long.' },
      ],
    },
    {
      id: 'airports',
      title: 'Desde los aeropuertos',
      blocks: [
        { p: 'Hay tres aeropuertos a tener en cuenta para llegar a la bahía de Halong.' },
        {
          table: {
            head: ['Aeropuerto', 'Qué tener en cuenta'],
            rows: [
              ['Aeropuerto Internacional de Noi Bai (HAN)', 'El principal aeropuerto internacional de Hanói. Calcule unas 2,5–3,5 horas o más hasta Tuan Chau. Más abajo encontrará las limusinas compartidas y los vehículos privados a Ha Long.'],
              ['Aeropuerto Internacional de Cat Bi (HPH)', 'En Haiphong, a unos 40 km de Tuan Chau por carretera. No hemos encontrado ningún servicio compartido regular a Tuan Chau: reserve un traslado privado. En los portales de reventa, los precios parten de unos 60–120 USD por vehículo.'],
              ['Aeropuerto Internacional de Van Don (VDO)', 'En la provincia de Quang Ninh, a unos 60–70 km de Tuan Chau. Hay pocos vuelos, y los autobuses del aeropuerto van a Hon Gai y Bai Chay, no a Tuan Chau. Reserve un traslado privado y confirme la duración del trayecto.'],
            ],
          },
        },
        { h3: 'Del aeropuerto de Noi Bai a Ha Long: empresas' },
        { operators: ['noibai-halong'], caption: 'Aeropuerto de Noi Bai → Ha Long' },
        { p: '**¿Se puede aterrizar y embarcar en el crucero el mismo día?** Es posible con una llegada temprana, pero deja menos margen ante retrasos del vuelo, el control de inmigración, la recogida del equipaje y el tráfico. Si llega a Noi Bai en un vuelo internacional, pasar la noche anterior en Hanói o cerca de la terminal de cruceros suele ser la opción más tranquila.' },
      ],
    },
    {
      id: 'ninh-binh',
      title: 'De Ninh Binh y Tam Coc a la bahía de Halong',
      blocks: [
        { p: 'Muchos viajes combinan Ninh Binh y Ha Long. Los minibuses suelen tomar la carretera nacional 10 en dirección a Haiphong en lugar de pasar por Hanói, y el trayecto dura unas 3,5–4 horas en vehículo privado y 4–4,5 horas en minibús compartido. La mayoría de las empresas recoge en Tam Coc, donde se alojan muchos viajeros; una de ellas también recoge en hoteles de Trang An, Bai Dinh y la ciudad de Ninh Binh.' },
        { h3: '¿Se puede llegar desde Ninh Binh a un registro a las 10:45 esa misma mañana?' },
        { p: 'En minibús compartido, no con garantías. La primera salida publicada por una empresa es el autobús de Full Moon Travel de las 6:40 desde Tam Coc, con llegada prevista a Tuan Chau a las 10:30, aunque otra página de la misma web indica la llegada a las 11:00. Cat Ba Express sale de Tam Coc a las 7:00 sin publicar hora de llegada. Ninh Binh Express Bus empieza a las 7:00–7:30 y tarda unas 4,5 horas. En algunas plataformas de reserva aparecen salidas más tempranas, pero sus empresas no las publican, así que no las incluimos.' },
        {
          ol: [
            '**Pasar la noche anterior en Ha Long** (recomendado). Tanto Tuan Chau como Bai Chay tienen hoteles; desde Bai Chay hay unos 13–14 km hasta el puerto. Tome un minibús de tarde desde Ninh Binh el día anterior.',
            '**Salir al amanecer en vehículo privado.** Deje Tam Coc hacia las 5:45–6:15 para un registro a las 10:45.',
            '**Tomar un minibús compartido solo si el registro de su crucero es más tarde**, y elegir que le dejen en Tuan Chau y no en Bai Chay.',
          ],
        },
        { h3: 'Ninh Binh → Ha Long: empresas' },
        { operators: ['ninhbinh-halong'] },
        { p: 'Algunos minibuses paran primero en Bai Chay o en la ciudad de Ha Long. Si el suyo termina en Bai Chay, tome un taxi o un vehículo por aplicación hasta Tuan Chau y cuente con unos 20–30 minutos.' },
        { h3: 'Después del crucero: de Ha Long a Ninh Binh y Tam Coc' },
        { p: 'Los regresos por la tarde son más sencillos. El minibús de Full Moon Travel de las 12:30 sale de la ciudad de Ha Long, recoge después en Tuan Chau y llega a Ninh Binh hacia las 16:30. Cat Ba Express sale a las 11:40, algo justo tras un desembarque entre las 11:00 y las 11:30. Ninh Binh Express Bus tiene una salida a mediodía, pero sus páginas indican dos horarios distintos. Un vehículo privado cuesta desde unos 1 600 000 VND, según el anuncio de una agencia de viajes.' },
        { operators: ['halong-ninhbinh'] },
      ],
    },
    {
      id: 'booking-tips',
      title: 'Cómo reservar un traslado: consejos prácticos',
      blocks: [
        {
          ul: [
            '**Reserve con antelación.** Los minibuses compartidos, al menos con un día de antelación, y antes aún los fines de semana y festivos. Los vehículos privados y las recogidas en el aeropuerto conviene reservarlos antes de viajar.',
            '**Si llama desde el extranjero.** Dentro de Vietnam, los números de teléfono móvil empiezan por 0. Desde un teléfono extranjero, quite el 0 y marque +84: el 097 593 2468 pasa a ser el +84 97 593 2468. Los números que empiezan por 1900 solo funcionan desde Vietnam.',
            '**Use WhatsApp o Zalo.** La mayoría de las empresas responde antes por mensaje que por teléfono, y una confirmación por escrito es más fácil de mostrar en el hotel o al conductor. Zalo es muy habitual en Vietnam.',
            '**Confirme la recogida.** Envíe el nombre y la dirección de su hotel y pregunte por la franja de recogida. Algunas empresas recogen en un punto fijo cercano en lugar de en la puerta, así que pregunte dónde esperar.',
            '**Pregunte por Tuan Chau.** Pregunte “Do you drop at Tuan Chau International Passenger Port?” (“¿Me dejan en el puerto internacional de pasajeros de Tuan Chau?”) y si a un viajero solo lo llevan dentro del puerto o lo dejan en la entrada.',
            '**Compruebe los extras.** Las tasas de entrada al puerto, las paradas adicionales, las recogidas a altas horas, la espera en el aeropuerto y los recargos en festivos pueden costar más. Pregunte antes de pagar.',
            '**Equipaje voluminoso.** Avise al reservar si lleva maletas grandes, bolsas de golf o carritos de bebé plegables. Los minibuses compartidos suelen admitir una maleta mediana y un bolso pequeño por persona.',
            '**Si viaja con niños pequeños.** Los minibuses compartidos no llevan sillas infantiles de serie. Pida una para el vehículo privado y compruebe si los niños pagan tarifa completa: algunas empresas cobran la plaza entera desde los 3 años, aproximadamente.',
            '**Si el minibús se retrasa,** escriba a la empresa indicando el nombre de la reserva. Si el retraso supera los 15–20 minutos y se dirige a un crucero, avise también al equipo de reservas del crucero.',
          ],
        },
      ],
    },
    {
      id: 'ports',
      title: '¿Puerto de Tuan Chau o puerto internacional de cruceros de Ha Long?',
      blocks: [
        { p: 'Ha Long tiene más de un puerto de pasajeros, y a veces los conductores dan por hecho el equivocado. Los dos que verá con más frecuencia en una reserva están en lugares distintos:' },
        {
          table: {
            head: ['', 'Puerto internacional de pasajeros de Tuan Chau', 'Puerto internacional de cruceros de Ha Long'],
            rows: [
              ['Ubicación', 'Isla de Tuan Chau, al oeste de Bai Chay, unida al continente por carretera', 'Bai Chay, más cerca del centro de Ha Long'],
              ['Lo utilizan', 'Muchos cruceros con noche a bordo, entre ellos Green Ruby', 'Barcos de crucero nacionales y grandes cruceros internacionales'],
              ['Distancia entre ambos', 'Unos 13–14 km por carretera', ''],
            ],
          },
        },
        { p: 'Indique al conductor el punto de registro exacto, no solo “bahía de Halong”.' },
      ],
    },
    {
      id: 'check-in',
      title: 'Dónde hacen el registro los huéspedes de Green Ruby',
      blocks: [
        { p: 'Green Ruby tiene previsto recibir a los huéspedes de sus dos barcos en la **sala VIP de Green Ruby del puerto internacional de pasajeros de Tuan Chau**. [Abrir la terminal de salida en Google Maps](checkin-map). La confirmación de su reserva indicará la ubicación exacta y la hora de presentación.' },
        { p: 'Según los itinerarios publicados, el registro empieza hacia las 10:45 y la lancha de enlace sale alrededor de las 11:45. Las empresas de transporte de esta página dejan a los pasajeros en Tuan Chau, pero no necesariamente en la sala de Green Ruby: muestre al conductor la ubicación en el mapa. La sede social de la empresa está en otra dirección; no envíe allí a su conductor. Si algo no está claro, [contacte con el equipo de reservas](contact) antes de viajar.' },
      ],
    },
    {
      id: 'ships',
      title: 'Green Ruby 1 y Green Ruby 2: diferencias en el embarque',
      blocks: [
        {
          table: {
            head: ['', 'Green Ruby 1', 'Green Ruby 2'],
            rows: [
              ['Bahía', 'Bahía de Halong', 'Bahía de Lan Ha'],
              ['Registro', 'Sala VIP de Green Ruby, Tuan Chau', 'Sala VIP de Green Ruby, Tuan Chau'],
              ['Embarque (previsto)', 'Lancha de enlace desde Tuan Chau hasta el barco fondeado', 'Lancha de enlace desde Tuan Chau hasta el embarcadero de Gia Luan, en la isla de Cat Ba (Haiphong), y embarque'],
              ['Regreso (previsto)', 'A Tuan Chau, a media mañana', 'A Tuan Chau, con desembarque hacia las 11:00'],
            ],
          },
        },
        { p: 'Según lo previsto por Green Ruby, los dos itinerarios empiezan con el registro en Tuan Chau; la travesía hasta el embarcadero de Gia Luan forma parte del embarque de Green Ruby 2, así que no tiene que organizar por su cuenta el transporte hasta Cat Ba. ¿No sabe qué bahía elegir? Consulte [bahía de Halong o bahía de Lan Ha](bayComparison).' },
      ],
    },
    {
      id: 'return',
      title: 'Traslado de regreso y vuelos posteriores',
      blocks: [
        { p: 'Los cruceros con noche a bordo suelen volver a puerto a media mañana. Según los itinerarios provisionales de Green Ruby, el desembarque en Tuan Chau está previsto hacia las 11:00–11:30. Un minibús que salga de Tuan Chau a las 12:00 o más tarde es la opción más segura; las salidas anteriores dejan poco margen si la lancha de enlace se retrasa.' },
        { h3: 'De Tuan Chau a Hanói y al aeropuerto de Noi Bai: empresas' },
        { operators: ['halong-hanoi', 'halong-noibai'] },
        { p: 'El regreso a Hanói o al aeropuerto de Noi Bai dura unas 2,5–3 horas, más las paradas para dejar a otros pasajeros. Si vuela ese mismo día, tenga en cuenta lo siguiente:' },
        {
          ul: [
            '**Vuelos nacionales desde Noi Bai:** cuente con todo el trayecto por carretera y procure llegar al aeropuerto al menos dos horas antes de la salida.',
            '**Vuelos internacionales desde Noi Bai:** reserve al menos tres horas en el aeropuerto, además del tiempo de carretera y un margen para posibles retrasos.',
            '**Vuelos desde Cat Bi o Van Don:** no hemos podido verificar ningún servicio compartido regular desde Tuan Chau. Reserve un vehículo privado y confirme la duración del trayecto y los requisitos de facturación del aeropuerto.',
            '**Si continúa hacia Ninh Binh:** consulte [el apartado sobre Ninh Binh](#ninh-binh) para los minibuses de la tarde, y evite programar actividades justo después de la hora prevista de llegada.',
          ],
        },
        { p: 'Las restricciones por mal tiempo, los cambios en la operación del crucero y el estado de las carreteras pueden afectar a la hora de regreso.' },
        { note: '**Nuestro consejo:** si su vuelo posterior es caro, difícil de cambiar o forma parte de una conexión internacional, plantéese pasar una noche más antes de volar. Los horarios de esta página son estimaciones, no horas de llegada garantizadas. Confirme siempre la hora prevista de regreso del crucero y los detalles del traslado antes de cerrar el resto del viaje.' },
      ],
    },
    {
      id: 'delays',
      title: 'Si su vuelo o su traslado se retrasa',
      blocks: [
        {
          ol: [
            '**Avise de inmediato al equipo de reservas**, con el número de vuelo o la hora de llegada que calcule el conductor. Encontrará los datos de contacto en la [página de contacto](contact).',
            '**No dé por hecho que el barco le esperará.** Los horarios de la lancha de enlace siguen el programa del día y las normas del puerto. Que pueda organizarse un traslado posterior hasta el barco depende de cada día y no se puede garantizar.',
            '**Si pierde el embarque**, se aplican las condiciones de cancelación y modificación de las [preguntas frecuentes](faq). Conviene contar con un seguro de viaje que cubra la pérdida de la salida.',
            '**Si las autoridades suspenden las salidas** por una tormenta, nos pondremos en contacto con usted para reprogramar el crucero o reembolsarlo según la política publicada.',
          ],
        },
      ],
    },
  ],
  faqTitle: 'Preguntas sobre los traslados',
  faq: [
    { q: '¿Cuánto se tarda en ir de Hanói a la bahía de Halong?', a: 'Por carretera, del centro de Hanói a Tuan Chau se tarda normalmente unas 2,5–3,5 horas, según el tráfico, el punto de partida y las paradas adicionales que haga el vehículo.' },
    { q: '¿Cuánto cuesta una limusina de Hanói a la bahía de Halong?', a: 'Cuando lo comprobamos, en octubre de 2026, las empresas publicaban plazas en limusina compartida a unos 250 000–360 000 VND, o 15 USD, por trayecto. Una limusina completa de 9 plazas se anunciaba desde 2 800 000 VND. Los precios cambian, así que confírmelos al reservar.' },
    { q: '¿Cuál es la mejor forma de ir de Hanói a la bahía de Halong?', a: 'El vehículo privado resulta cómodo para familias, grupos y viajeros que prefieren un trayecto directo. Las limusinas compartidas son una alternativa práctica para parejas y viajeros solos. Para un registro a las 10:45, elija un minibús que salga de Hanói hacia las 7:00 como muy tarde.' },
    { q: '¿Cómo ir de Ninh Binh o Tam Coc a la bahía de Halong?', a: 'Hay limusinas compartidas de Tam Coc y Ninh Binh a Ha Long, y algunas dejan a los pasajeros en Tuan Chau. Tardan unas 4–4,5 horas y ninguna llega con garantías antes de un registro a las 10:45, así que duerma en Ha Long la noche anterior o tome un vehículo privado que salga hacia las 6:00.' },
    { q: '¿El traslado está incluido en un crucero de Green Ruby?', a: 'Según los planes actuales de Green Ruby, los traslados entre Hanói y Tuan Chau se organizan aparte y no están incluidos en la tarifa estándar del crucero. Bajo petición, y con coste adicional, se puede organizar un traslado privado; confirme las opciones y los precios al enviar su solicitud de reserva.' },
    { q: '¿Cuál es el aeropuerto más cercano a la bahía de Halong?', a: 'El aeropuerto de Cat Bi, en Haiphong, está a unos 40 km de Tuan Chau por carretera, y el de Van Don a unos 60–70 km; desde Noi Bai hay unas 3 horas de trayecto. Aun así, Noi Bai tiene muchos más vuelos y las únicas limusinas compartidas regulares a Ha Long que hemos podido verificar.' },
    { q: '¿Puedo ir directamente del aeropuerto de Noi Bai al crucero?', a: 'Sí, siempre que su vuelo llegue con tiempo suficiente para estar en el punto de registro a la hora. Sin embargo, los retrasos de los vuelos, el control de inmigración y la recogida del equipaje hacen arriesgadas estas conexiones en el mismo día. Llegar el día anterior suele ser más seguro.' },
    { q: '¿Cómo ir de la bahía de Halong al aeropuerto de Hanói después del crucero?', a: 'Hay limusinas compartidas de Ha Long a Noi Bai durante toda la tarde, y también puede reservar un vehículo privado a una hora fija. Cuente con unas 3 horas de carretera más el tiempo de facturación que exija su vuelo.' },
    { q: '¿Desde dónde salen los cruceros de Green Ruby?', a: 'Green Ruby tiene previsto recibir a los huéspedes de Green Ruby 1 y Green Ruby 2 en la sala VIP de Green Ruby del puerto internacional de pasajeros de Tuan Chau. El embarque se organiza de forma distinta en cada barco. La confirmación definitiva de su reserva indicará la ubicación exacta, la hora de presentación y las instrucciones de traslado.' },
  ],
  sourcesTitle: 'Fuentes',
  sources: [
    { title: 'Junta de Gestión de la Bahía de Ha Long: ruta turística VHL1 (salidas desde Tuan Chau o desde el puerto internacional de cruceros de Ha Long)', url: 'https://halongbay.com.vn/tours/1-hanh-trinh-vhl1-cang-tau-dong-thien-cung-hang-dau-go-hon-cho-da-hang-ba-hang-hon-dinh-huong-hon-trong-mai' },
    { title: 'VietNamNet: Noi Bai recomienda llegar dos horas antes de los vuelos nacionales y tres horas antes de los internacionales (en inglés)', url: 'https://vietnamnet.vn/en/125-000-travelers-expected-at-hanoi-airport-as-holiday-rush-begins-2549423.html' },
    { title: 'Tuoi Tre News (20 de julio de 2025): prohibida la salida de barcos turísticos en la bahía de Halong ante la llegada del tifón Wipha (en inglés)', url: 'https://news.tuoitre.vn/ha-long-bay-tourist-boats-banned-from-departing-as-typhoon-wipha-nears-103250720163544717.htm' },
    { title: 'Ha Long Travel Limousine: tarifas y horarios Hanói–Ha Long; normas de recogida en el puerto de Tuan Chau', url: 'https://xehalong.vn/quy-trinh-don-tra' },
    { title: 'Ha Long Travel Limousine: limusina compartida y privada aeropuerto de Noi Bai–Ha Long', url: 'https://xehalong.vn/xe-limousine-noi-bai-ha-long-cam-pha/' },
    { title: 'Cat Ba Express: limusina de Hanói a Ha Long (puntos de llegada en Tuan Chau y Bai Chay)', url: 'https://catbaexpress.com/bus-hanoi-to-halong.html' },
    { title: 'Full Moon Travel: horarios de autobús de Ninh Binh a Ha Long', url: 'https://fullmoontravelasia.com/ninh-binh-to-halong-bay-by-bus/' },
    { title: 'Ninh Binh Express Bus: horarios y tarifas de las limusinas Ninh Binh–Ha Long', url: 'https://ninhbinhexpressbus.com/lich-trinh-xe-limousine-ninh-binh-di-ha-long/' },
    { title: 'VinWonders: guía de la isla de Tuan Chau (distancias desde los aeropuertos de Cat Bi y Van Don)', url: 'https://vinwonders.com/vi/wonderpedia/news/dao-tuan-chau-ha-long/' },
  ],
  related: {
    title: 'Siga planificando',
    links: [
      { href: 'firstTime', title: '¿Su primer crucero por la bahía de Halong?', body: 'Qué esperar, qué llevar y cómo es el día de embarque.' },
      { href: 'itineraries', title: 'Itinerarios de Green Ruby', body: 'Dos bahías, en cruceros de 2 días y 1 noche o de 3 días y 2 noches.' },
      { href: 'bestTime', title: 'Cuándo visitar la bahía de Halong', body: 'Clima, afluencia y estado del mar, mes a mes.' },
      { href: 'faq', title: 'Preguntas frecuentes', body: 'Reservas, pagos, cancelaciones y vida a bordo.' },
    ],
  },
  estimateNote: 'Todas las duraciones de esta página son estimaciones para condiciones normales, no horarios ni garantías. Las tarifas y los horarios de las empresas son los publicados en la fecha indicada bajo cada tabla. Los datos de registro y embarque siguen el programa publicado por Green Ruby y son provisionales hasta las primeras salidas, previstas para febrero de 2027.',
  selector: {
    labels: {
      title: 'Cómo llegar a Tuan Chau desde {origin}',
      origin: '¿Desde dónde sale?',
      road: 'Tiempo por carretera hasta Tuan Chau (estimación)',
      hours: 'h',
      minutes: 'min',
      decimal: ',',
      roadUnknown: 'Varía según la ruta y el tráfico. Confirme la duración del trayecto con su empresa de traslados.',
      depart: 'Franja de salida recomendada',
      departShuttle: 'Minibuses compartidos: reserve uno que salga de Hanói hacia las 7:00 como muy tarde; la recogida suele ser hacia las {from}–{to}.',
      departNote: 'Incluye margen para el tráfico. Cuente con más tiempo los fines de semana y festivos.',
      departUnknown: 'Organícese con su empresa de traslados para llegar a Tuan Chau antes del registro de las 10:45, con tiempo de sobra.',
      lastDay: 'Último día: desembarque (provisional)',
      disembark: 'La hora de regreso puede cambiar según el tiempo y la operación.',
      returnBack: 'Llegada estimada a {origin}: hacia las {from}–{to}, sin garantía.',
      airportAdvice: 'Tras todo el trayecto por carretera, procure estar en el aeropuerto al menos 2 horas antes de un vuelo nacional y 3 horas antes de uno internacional.',
      table: { mode: 'Opción', time: 'Tiempo (estimación)', notes: 'Observaciones' },
      cost: 'Tarifas publicadas (por trayecto)',
      costNone: 'No hemos podido verificar tarifas. Pida presupuesto para un traslado privado.',
      operators: 'Empresas consultadas',
      operatorsNone: 'No hemos podido verificar ningún servicio compartido regular a Tuan Chau. Reserve un traslado privado.',
      returnOperators: 'Regreso desde Tuan Chau:',
      seeTable: 'Comparar puntos de recogida y de llegada',
      operatorsAnchor: { hanoi: 'old-quarter', noibai: 'airports', ninhbinh: 'ninh-binh' },
      note: 'Solo son sugerencias, calculadas para un registro provisional a las 10:45 y un desembarque a las 11:00–11:30. No son un horario ni una garantía: añada margen para el tráfico, los retrasos y los trámites del aeropuerto. Tarifas según las publican las empresas; confírmelas al reservar.',
    },
    origins: [
      {
        key: 'hanoi',
        label: 'Hanói (barrio antiguo)',
        routes: [
          { mode: 'Vehículo privado', time: '2,5–3 h', notes: 'Puerta a puerta; usted elige la hora.' },
          { mode: 'Limusina compartida (minibús)', time: '3–3,5 h', notes: 'Recogida en hoteles del centro de Hanói y una parada de descanso. Salidas cada hora con algunas empresas.' },
          { mode: 'Autobús por autopista', time: '2,5 h + trayecto hasta My Dinh', notes: 'Desde la estación de autobuses de My Dinh. Difícil de cuadrar con un registro por la mañana.' },
        ],
        tip: 'Alojarse cerca del barrio antiguo suele facilitar la recogida de los minibuses.',
      },
      {
        key: 'noibai',
        label: 'Aeropuerto de Noi Bai (HAN)',
        airport: 'noibai',
        routes: [
          { mode: 'Vehículo privado', time: '2,5–3,5 h', notes: 'Recogida concertada en llegadas; consulte la política de espera de la empresa.' },
          { mode: 'Limusina compartida (minibús)', time: 'Unas 3 h', notes: 'Salidas cada hora desde el aeropuerto con al menos una empresa; si el vuelo se retrasa, puede pasar a un minibús posterior.' },
          { mode: 'Taxi o vehículo por aplicación', time: '2,5–3,5 h', notes: 'Acuerde el precio y la terminal exacta antes de salir.' },
        ],
        tip: 'Embarcar el mismo día de la llegada exige un vuelo temprano y deja poco margen para retrasos. Pasar la noche anterior en Hanói suele ser más seguro.',
      },
      {
        key: 'catbi',
        label: 'Aeropuerto de Cat Bi (HPH)',
        airport: 'catbi',
        routes: [
          { mode: 'Vehículo privado', time: 'Variable', notes: 'Unos 40 km por carretera. Confirme con la empresa la ruta y la duración del trayecto hasta Tuan Chau.' },
          { mode: 'Taxi o vehículo por aplicación', time: 'Variable', notes: 'Disponibles en el aeropuerto; confirme la terminal exacta.' },
        ],
        tip: 'Práctico para algunas rutas nacionales; compruebe el tiempo de traslado antes de optar por una conexión el mismo día.',
      },
      {
        key: 'vandon',
        label: 'Aeropuerto de Van Don (VDO)',
        airport: 'vandon',
        routes: [{ mode: 'Vehículo privado o taxi', time: 'Variable', notes: 'Unos 60–70 km. Reserve el vehículo con antelación y confirme la duración del trayecto.' }],
        tip: 'Compruebe bien los días de vuelo: en Van Don los horarios son limitados.',
      },
      {
        key: 'ninhbinh',
        label: 'Ninh Binh / Tam Coc',
        routes: [
          { mode: 'Vehículo privado', time: '3,5–4 h', notes: 'Puerta a puerta por autopista.' },
          { mode: 'Limusina compartida (minibús)', time: '4–4,5 h', notes: 'Desde Tam Coc, algunas pasando por Tuan Chau. Ninguna llega con garantías antes de las 10:45.' },
        ],
        tip: 'Para un registro por la mañana, lo más seguro es dormir antes una noche en Ha Long.',
      },
    ],
  },
  itineraries: { title: 'Itinerarios de Green Ruby', days: (n) => `${n} días y ${n - 1} noche${n > 2 ? 's' : ''}`, view: 'Ver itinerario' },
};

export default transfer;
