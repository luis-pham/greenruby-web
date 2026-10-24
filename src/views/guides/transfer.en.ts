import type { GuideContent } from './types';

// Durations are estimates (see transfer.ts ROAD_MINUTES); no prices, timetables or live traffic are given.
// Check-in point, tender arrangements and the transfer offer come from Green Ruby's published
// itineraries/FAQs and owner-confirmed brand facts; they remain provisional until service starts.

const transfer: GuideContent = {
  metaTitle: 'How to Get from Hanoi to Halong Bay: Transfers & Cruise Ports',
  metaDescription:
    'Hanoi to Halong Bay by shared limousine, private car or bus, plus Noi Bai, Cat Bi and Van Don airport transfers, Tuan Chau vs Ha Long cruise port and what to do if you are late.',
  breadcrumb: 'Hanoi to Halong Bay',
  eyebrow: 'Halong Cruise Guide',
  title: 'How to Get from Hanoi to Halong Bay: Transfers & Cruise Ports',
  lead: 'Realistic options from Hanoi, the airports and Ninh Binh to the cruise terminal, the difference between Ha Long’s ports, and how to time your arrival and your flight home.',
  summaryTitle: 'Quick answer',
  summary: [
    ['Fastest from Hanoi', 'Private car, about **2.5–3 hours** to Tuan Chau (estimate).'],
    ['Best value', 'Shared limousine van with hotel pick-up, about **3–3.5 hours** including pick-ups and a rest stop.'],
    ['Closest airports', '**Cat Bi** (Hai Phong) and **Van Don**, each about an hour by road; Noi Bai is 2.5–3 hours.'],
    ['Green Ruby check-in', 'Tuan Chau, from about 10:45. Leave central Hanoi by about **07:15** in a private car.'],
    ['Flying home', 'On the last day, book Noi Bai departures after about **16:30** (domestic) or **18:00** (international).'],
  ],
  updated: { iso: '2026-10-24', label: 'Updated 24 October 2026' },
  tocTitle: 'In this guide',
  sections: [
    {
      id: 'compare',
      title: 'Hanoi to Halong Bay: the options compared',
      blocks: [
        { p: 'The drive from central Hanoi to Tuan Chau, where many overnight cruises check in, is around 160–180 km on expressways. The road is good; what varies is how long it takes to get out of Hanoi and whether your vehicle stops for other passengers.' },
        {
          table: {
            head: ['Option', 'Door to door (estimate)', 'Best for', 'Keep in mind'],
            rows: [
              ['Private car', '2.5–3 h', 'Families, groups, early check-ins, airport pick-ups', 'Highest price; you choose the pick-up time'],
              ['Shared limousine van', '3–3.5 h', 'Couples and solo travellers on a budget', 'Fixed departure times; collects other guests in the Old Quarter'],
              ['Public bus + taxi', '3.5–4.5 h', 'Very tight budgets with time to spare', 'Bus to Bai Chay, then a taxi to the port; risky for a morning check-in'],
            ],
          },
        },
        { note: 'Travel times are estimates for normal traffic, not guarantees. Allow more time on Friday evenings, Sunday afternoons and public holidays such as Tet and 30 April–1 May.' },
      ],
    },
    {
      id: 'planner',
      title: 'Plan your transfer',
      blocks: [{ p: 'Choose where you are starting from to see realistic options, the latest time to leave for a 10:45 check-in, and timings for the last day.' }, { widget: 'transfer-selector' }],
    },
    {
      id: 'shuttle',
      title: 'Shared limousine van',
      blocks: [
        { p: 'Limousine vans are 9- to 11-seat minibuses with reclining seats. They collect passengers from hotels in and around the Old Quarter, usually between about 07:00 and 08:00, stop once on the way and drop guests at the cruise terminal.' },
        { ul: ['Good value for one or two travellers.', 'Pick-ups can take 30 minutes or more before the van leaves the city.', 'Luggage space is limited: a cabin bag plus a medium suitcase per person is a sensible maximum.', 'Return vans leave the terminal after the morning disembarkation, so you cannot choose your time.'] },
        { p: 'Transfers are not included in Green Ruby’s cruise fares. The published plan is a shared limousine shuttle between Hanoi and Ha Long at an additional charge; times and prices will be confirmed with your booking.' },
      ],
    },
    {
      id: 'private-car',
      title: 'Private car',
      blocks: [
        { p: 'A private car with driver picks you up exactly where and when you want, waits if your flight is late, and lets you stop when you need to. For three or more travellers the cost per person can approach that of the shuttle.' },
        { ul: ['Ask for a child seat when booking if you travel with young children; it is not standard in Vietnam.', 'Agree the pick-up point and the exact drop-off at the terminal in advance.', 'Green Ruby’s published plan is to arrange private transfers on request, at extra cost.'] },
      ],
    },
    {
      id: 'bus',
      title: 'Public bus',
      blocks: [{ p: 'Long-distance buses run from Hanoi’s bus stations to Bai Chay in Ha Long. From there you still need a taxi to the cruise port. It is the cheapest option but the slowest and the least predictable, and it is hard to make a morning check-in without staying in Ha Long the night before. Bus companies and stations change, so check current departures locally.' }],
    },
    {
      id: 'old-quarter',
      title: 'Hanoi Old Quarter to Tuan Chau',
      blocks: [
        { p: 'Most visitors start from the Old Quarter. By private car, leaving at 07:00–07:15 normally gets you to Tuan Chau before the 10:45 check-in, with time for a rest stop. Shared vans start collecting guests earlier, typically from about 07:00.' },
        { p: 'Driving yourself requires a licence that is valid in Vietnam and parking near the port for the length of the cruise, so most visitors use a driver.' },
      ],
    },
    {
      id: 'airports',
      title: 'From the airports',
      blocks: [
        {
          table: {
            head: ['Airport', 'To Tuan Chau (estimate)', 'Notes'],
            rows: [
              ['Noi Bai International (HAN), Hanoi', '2.5–3 h', 'Most international arrivals. A same-day cruise needs an early landing; staying the night in Hanoi is easier.'],
              ['Cat Bi International (HPH), Hai Phong', 'About 1 h', 'Mainly domestic flights, for example from Ho Chi Minh City and Da Nang; the closest airport for a same-day check-in.'],
              ['Van Don International (VDO), Quang Ninh', 'About 1 h', 'Fewer flights, mostly domestic; useful if a schedule fits.'],
            ],
          },
        },
        { p: 'For a same-day cruise from Noi Bai, the plane needs to land early enough to leave the airport by about 07:15, which in practice means an arrival before about 06:00 for international flights (immigration and bags) or before about 06:30 for domestic flights. Most travellers fly in the day before.' },
      ],
    },
    {
      id: 'ninh-binh',
      title: 'Ninh Binh to Halong Bay',
      blocks: [{ p: 'Many itineraries combine Ninh Binh and Ha Long. The two are not on the same road, so the journey takes around 3.5–4 hours by private car on the expressways (estimate). To make a morning check-in, leave Ninh Binh by about 06:15, or spend the night before in Hanoi or Ha Long. Some limousine operators run direct Ninh Binh–Ha Long services; check current schedules locally.' }],
    },
    {
      id: 'ports',
      title: 'Tuan Chau Port or Ha Long International Cruise Port?',
      blocks: [
        { p: 'Ha Long has more than one passenger port, and drivers sometimes assume the wrong one. The two you are most likely to see on a booking:' },
        {
          table: {
            head: ['', 'Tuan Chau International Passenger Port', 'Ha Long International Cruise Port'],
            rows: [
              ['Where', 'Tuan Chau Island, west of Bai Chay, linked to the mainland by road', 'Bai Chay, closer to the centre of Ha Long'],
              ['Used by', 'Many overnight cruises, including Green Ruby', 'Ocean cruise ships and some overnight boats'],
              ['Distance between them', 'Around 20 minutes by road (estimate)', ''],
            ],
          },
        },
        { p: 'Always give the driver the exact terminal named on your confirmation, not just “Halong Bay”.' },
      ],
    },
    {
      id: 'check-in',
      title: 'Where Green Ruby guests check in',
      blocks: [
        { p: 'Guests of both ships check in at the **Green Ruby lounge at Tuan Chau International Passenger Port**: No. 27, Terminal Building 2, Tuan Chau, Ha Long, Quang Ninh. [Open the departure terminal in Google Maps](checkin-map).' },
        { p: 'On the published itineraries, check-in starts at about 10:45 and the tender leaves around 11:45. The company’s registered office is a separate address; do not send your driver there. If anything is unclear, [contact the reservations team](contact) before you travel.' },
      ],
    },
    {
      id: 'ships',
      title: 'Green Ruby 1 and Green Ruby 2: boarding differences',
      blocks: [
        {
          table: {
            head: ['', 'Green Ruby 1', 'Green Ruby 2'],
            rows: [
              ['Bay', 'Ha Long Bay', 'Lan Ha Bay'],
              ['Check-in', 'Green Ruby lounge, Tuan Chau', 'Green Ruby lounge, Tuan Chau'],
              ['Boarding', 'Tender from Tuan Chau to the ship at anchor', 'Tender from Tuan Chau to Gia Luan Pier on Cat Ba Island (Hai Phong), then on board'],
              ['Return', 'To Tuan Chau, late morning', 'To Tuan Chau, disembarking around 11:00'],
            ],
          },
        },
        { p: 'Your transfer only ever needs to reach Tuan Chau: the crossing to Gia Luan Pier is part of the Green Ruby 2 boarding.' },
      ],
    },
    {
      id: 'return',
      title: 'Return transfers and onward flights',
      blocks: [
        { p: 'Ships return to Tuan Chau in the late morning; on the published itineraries guests disembark between about 11:00 and 11:30. By road, that puts you back in central Hanoi at around 14:00–14:30 and at Noi Bai at a similar time (estimates).' },
        { ul: ['Domestic flights from Noi Bai: book after about 16:30.', 'International flights from Noi Bai: book after about 18:00.', 'Cat Bi or Van Don: domestic flights after about 14:40 are realistic.', 'Continuing to Ninh Binh: expect to arrive around 15:00–15:30.'] },
        { note: 'These suggestions add a 30-minute buffer to the longer road estimate and allow 1.5 hours (domestic) or 3 hours (international) at the airport. They are not guarantees; weather can change the ship’s return time.' },
      ],
    },
    {
      id: 'delays',
      title: 'If your flight or transfer is delayed',
      blocks: [
        {
          ol: [
            '**Tell the reservations team straight away**, with your flight number or the driver’s estimated arrival. Contact details are on the [contact page](contact).',
            '**Do not assume the ship will wait.** Tender times follow the day’s schedule and port rules. Whether a later transfer to the ship can be arranged depends on the day and cannot be guaranteed.',
            '**If you miss boarding**, the cancellation and amendment terms in the [FAQ](faq) apply. Travel insurance that covers missed departures is worth having.',
            '**If the authorities suspend sailings** because of a storm, you will be contacted about rescheduling or a refund under the published policy.',
          ],
        },
      ],
    },
  ],
  faqTitle: 'Transfer questions',
  faq: [
    { q: 'How long does it take to get from Hanoi to Halong Bay?', a: 'Around 2.5 to 3 hours by private car from central Hanoi to Tuan Chau, and about 3 to 3.5 hours by shared limousine van including pick-ups and a stop. These are estimates; traffic leaving Hanoi makes the biggest difference.' },
    { q: 'What is the best way to get from Hanoi to Halong Bay?', a: 'For most visitors, a shared limousine van with hotel pick-up is the best balance of cost and comfort. Choose a private car for families, groups, early check-ins or airport pick-ups.' },
    { q: 'Is the transfer included in a Green Ruby cruise?', a: 'No. Transfers are not included in the fare. The published plan is a shared limousine shuttle and private cars on request, at extra cost, confirmed with your booking.' },
    { q: 'Which airport is closest to Halong Bay?', a: 'Cat Bi (Hai Phong) and Van Don (Quang Ninh) are each about an hour by road from Tuan Chau. Noi Bai in Hanoi is about 2.5 to 3 hours away but has far more international flights.' },
    { q: 'Can I go straight from Noi Bai Airport to my cruise?', a: 'Only with an early arrival: you need to leave the airport by about 07:15 for a 10:45 check-in. Most travellers arriving on international flights spend the first night in Hanoi.' },
    { q: 'Where do Green Ruby cruises depart from?', a: 'Both ships check guests in at the Green Ruby lounge at Tuan Chau International Passenger Port. Green Ruby 1 guests take a tender to the ship in Ha Long Bay; Green Ruby 2 guests take a tender to Gia Luan Pier to board on Lan Ha Bay.' },
  ],
  related: {
    title: 'Keep planning',
    links: [
      { href: 'firstTime', title: 'First time on a Halong Bay cruise?', body: 'What to expect, what to pack and how boarding day works.' },
      { href: 'itineraries', title: 'Green Ruby itineraries', body: 'Two bays, 2 days 1 night or 3 days 2 nights.' },
      { href: 'faq', title: 'Frequently asked questions', body: 'Booking, payment, cancellation and life on board.' },
    ],
  },
  estimateNote: 'All durations on this page are estimates for normal conditions, not schedules or guarantees. Check-in and boarding details follow Green Ruby’s published plan and remain provisional until the ships enter service, expected in February 2027.',
  selector: {
    labels: {
      title: 'Ways to reach Tuan Chau from {origin}',
      origin: 'Where are you starting from?',
      shuttle: 'Shared limousine van',
      road: 'Road time to Tuan Chau (estimate)',
      hours: 'hours',
      minutes: 'min',
      decimal: '.',
      leaveBy: 'Leave {origin} by about',
      leaveByShuttle: 'Shared van: be ready from about {time}',
      returnTitle: 'Last day',
      backBy: 'Estimated arrival back in {origin}',
      flightDomestic: 'Earliest domestic flight',
      flightInternational: 'international from about {time}',
      table: { mode: 'Option', time: 'Time (estimate)', notes: 'Notes' },
      note: 'Estimates for normal traffic with a 30-minute buffer, for a 10:45 check-in and an 11:30 disembarkation. Not a schedule or a guarantee.',
    },
    origins: [
      {
        key: 'hanoi',
        label: 'Hanoi (Old Quarter)',
        routes: [
          { mode: 'Private car', time: '2.5–3 h', notes: 'Door to door; you choose the time.' },
          { mode: 'Shared limousine van', time: '3–3.5 h', notes: 'Hotel pick-ups from about 07:00, one rest stop.' },
          { mode: 'Public bus + taxi', time: '3.5–4.5 h', notes: 'To Bai Chay bus station, then a taxi. Not ideal for a morning check-in.' },
        ],
        tip: 'Staying near the Old Quarter makes shuttle pick-ups simplest.',
      },
      {
        key: 'noibai',
        label: 'Noi Bai Airport (HAN)',
        airport: 'noibai',
        routes: [
          { mode: 'Private car', time: '2.5–3 h', notes: 'Driver meets you at arrivals; waits if the flight is late.' },
          { mode: 'Taxi or ride-hailing', time: '2.5–3 h', notes: 'Agree the price and the exact terminal before setting off.' },
        ],
        tip: 'For a same-day cruise, land before about 06:00 (international) or 06:30 (domestic). Otherwise, spend the first night in Hanoi.',
      },
      {
        key: 'catbi',
        label: 'Cat Bi Airport (HPH)',
        airport: 'catbi',
        routes: [
          { mode: 'Private car', time: 'About 1 h', notes: 'The quickest airport connection to Tuan Chau.' },
          { mode: 'Taxi or ride-hailing', time: 'About 1 h', notes: 'Available at the airport; confirm the exact terminal.' },
        ],
        tip: 'A morning domestic flight into Cat Bi can work for a same-day check-in.',
      },
      {
        key: 'vandon',
        label: 'Van Don Airport (VDO)',
        airport: 'vandon',
        routes: [{ mode: 'Private car or taxi', time: 'About 1 h', notes: 'Fewer flights; book the car in advance.' }],
        tip: 'Check flight days carefully: schedules at Van Don are limited.',
      },
      {
        key: 'ninhbinh',
        label: 'Ninh Binh',
        routes: [
          { mode: 'Private car', time: '3.5–4 h', notes: 'Door to door on the expressways.' },
          { mode: 'Limousine service', time: '4–4.5 h', notes: 'Some operators run direct services; check locally.' },
        ],
        tip: 'Leaving Ninh Binh at dawn is tiring; a night in Hanoi or Ha Long first is more relaxed.',
      },
    ],
  },
  itineraries: { title: 'Green Ruby itineraries', days: (n) => `${n} days ${n - 1} night${n > 2 ? 's' : ''}`, view: 'View itinerary' },
};

export default transfer;
