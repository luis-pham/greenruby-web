import type { GuideContent } from './types';

// Durations are estimates (see transfer.ts ROAD_MINUTES); no prices, timetables or live traffic are given.
// Check-in point, tender arrangements and the transfer offer come from Green Ruby's published
// itineraries/FAQs and owner-confirmed brand facts; they remain provisional until service starts.
// Edited 2026-10-24 after an editorial review: no fixed flight times or "latest" departure, no published
// durations for Cat Bi / Van Don, airport timing per CAAV guidance (2 h domestic, 3 h international).

const transfer: GuideContent = {
  metaTitle: 'Hanoi to Halong Bay: Transfers, Travel Time & Cruise Ports',
  metaDescription:
    'How to get from Hanoi to Halong Bay by private car, shared limousine or bus, transfers from Noi Bai, Cat Bi and Van Don airports, Tuan Chau vs Ha Long cruise port.',
  breadcrumb: 'Hanoi to Halong Bay',
  eyebrow: 'Halong Cruise Guide',
  title: 'How to Get from Hanoi to Halong Bay: Transfers & Cruise Ports',
  lead: 'Compare the main ways to travel from Hanoi, nearby airports and Ninh Binh to Halong Bay. This guide explains journey times, transport options, the difference between the main cruise ports and what to check before arranging your transfer.',
  summaryTitle: 'Quick answer',
  summary: [
    ['Fastest option from Hanoi', 'A private car usually takes around **2.5–3 hours** to reach Tuan Chau in favourable traffic conditions.'],
    ['Convenient shared option', 'A limousine van offers hotel pick-up in selected areas of Hanoi. Allow approximately **3–3.5 hours**, depending on pick-up arrangements and traffic.'],
    ['Arriving by air', 'Cat Bi Airport in Hai Phong and Van Don Airport in Quang Ninh are alternatives to Hanoi’s Noi Bai Airport. Journey times to Tuan Chau vary by airport, route and traffic.'],
    ['Green Ruby check-in', 'Both Green Ruby vessels are planned to welcome guests at Tuan Chau. The provisional check-in time is around 10:45. Confirm your reporting time and exact location before departure.'],
    ['Flying home after your cruise', 'Avoid booking a flight too close to your scheduled disembarkation. Allow sufficient time for the return transfer, potential delays and airport check-in procedures.'],
  ],
  updated: { iso: '2026-10-24', label: 'Updated 24 October 2026' },
  tocTitle: 'In this guide',
  sections: [
    {
      id: 'compare',
      title: 'Hanoi to Halong Bay: the options compared',
      blocks: [
        { p: 'The drive from central Hanoi to Tuan Chau, where many overnight cruises check in, is around 160–180 km. Most of the journey follows modern expressways; what varies is how long it takes to leave Hanoi and whether your vehicle stops for other passengers.' },
        {
          table: {
            head: ['Option', 'Door to door (estimate)', 'Best for', 'Keep in mind'],
            rows: [
              ['Private car', '2.5–3 h', 'Families, small groups, early check-ins, airport pick-ups', 'Usually the highest price; you choose the pick-up time'],
              ['Shared limousine van', '3–3.5 h', 'Couples and solo travellers', 'Departure times are set by the operator; collects other guests on the way'],
              ['Public bus + taxi', '3.5–4.5 h', 'Travellers with time to spare', 'Bus to Bai Chay, then a taxi to the port; hard to time for a morning check-in'],
            ],
          },
        },
        { note: 'Travel times are estimates for normal traffic, not guarantees. Allow more time on Friday evenings, Sunday afternoons and public holidays such as Tet and 30 April–1 May.' },
      ],
    },
    {
      id: 'planner',
      title: 'Plan your transfer',
      blocks: [{ p: 'Choose where you are starting from to see the main options, a suggested departure window for a 10:45 check-in and what to plan for on the last day. Allow additional time for traffic, delays and airport procedures.' }, { widget: 'transfer-selector' }],
    },
    {
      id: 'shuttle',
      title: 'Shared limousine van',
      blocks: [
        { p: 'Limousine vans are 9- to 11-seat minibuses with reclining seats. They collect passengers from hotels in selected areas of Hanoi, often around the Old Quarter, usually between about 07:00 and 08:00, stop once on the way and drop guests at the cruise terminal.' },
        { ul: ['A convenient shared option for one or two travellers.', 'Pick-ups can take 30 minutes or more before the van leaves the city.', 'Luggage space is limited: a cabin bag plus a medium suitcase per person is a sensible maximum.', 'Return times are generally fixed by the operator, after the morning disembarkation.'] },
        { p: 'Transfers are not included in Green Ruby’s cruise fares. The published plan is a shared limousine shuttle between Hanoi and Ha Long at an additional charge; times and prices will be confirmed with your booking.' },
      ],
    },
    {
      id: 'private-car',
      title: 'Private car',
      blocks: [
        { p: 'A private car offers the most flexibility, particularly for families, small groups and travellers arriving at an airport. You can arrange pick-up at your hotel or terminal and travel directly to your cruise check-in location.' },
        { p: 'For groups, it is worth comparing the total cost of a private car with individual seats on a shared shuttle.' },
        {
          ul: [
            'Confirm the vehicle size and luggage capacity before booking.',
            'Request a child seat in advance if needed.',
            'Share your flight details with the transfer provider and check their waiting-time policy.',
            'Make sure the driver has the exact cruise terminal or lounge location.',
          ],
        },
        { p: 'Green Ruby plans to offer private transfers on request, subject to availability and an additional charge.' },
      ],
    },
    {
      id: 'bus',
      title: 'Public bus',
      blocks: [{ p: 'Long-distance buses run from Hanoi’s bus stations to Bai Chay in Ha Long. From there you still need a taxi to the cruise port. It is usually the slowest and least predictable option, and it is hard to make a morning check-in without staying in Ha Long the night before. Bus companies, stations and fares change, so check current departures locally.' }],
    },
    {
      id: 'old-quarter',
      title: 'Hanoi Old Quarter to Tuan Chau',
      blocks: [
        { p: 'Most visitors start from the Old Quarter. By private car, a suggested departure between about 06:45 and 07:15 leaves a margin for traffic and a rest stop before the 10:45 check-in. Shared vans start collecting guests earlier, so follow the pick-up time the operator gives you.' },
        { p: 'Driving yourself requires a licence that is valid in Vietnam and parking near the port for the length of the cruise, so most visitors use a driver.' },
      ],
    },
    {
      id: 'airports',
      title: 'From the airports',
      blocks: [
        { p: 'There are three airports to consider when travelling to Halong Bay.' },
        {
          table: {
            head: ['Airport', 'Travel considerations'],
            rows: [
              ['Noi Bai International Airport (HAN)', 'Hanoi’s main international airport. Allow approximately 2.5–3.5 hours or more to reach Tuan Chau, depending on traffic and your pick-up arrangements.'],
              ['Cat Bi International Airport (HPH)', 'Located in Hai Phong. Convenient for some domestic routes, but transfer time to Tuan Chau depends on the road route and traffic.'],
              ['Van Don International Airport (VDO)', 'Located in Quang Ninh. A possible alternative when suitable flights are available. Confirm the transfer duration and flight schedule in advance.'],
            ],
          },
        },
        { p: '**Can you fly in and board your cruise on the same day?** It may be possible with an early arrival, but it leaves less room for flight delays, immigration, baggage collection and road traffic.' },
        { p: 'If arriving internationally at Noi Bai, spending the previous night in Hanoi or near the cruise terminal is generally the more relaxed option.' },
      ],
    },
    {
      id: 'ninh-binh',
      title: 'Ninh Binh to Halong Bay',
      blocks: [{ p: 'Many itineraries combine Ninh Binh and Ha Long. The journey takes around 3.5–4 hours by private car on the expressways (estimate). For a morning check-in, a departure around 05:45–06:15 is suggested; spending the night before in Hanoi or Ha Long is more relaxed. Some limousine operators run direct Ninh Binh–Ha Long services; check current schedules locally.' }],
    },
    {
      id: 'ports',
      title: 'Tuan Chau Port or Ha Long International Cruise Port?',
      blocks: [
        { p: 'Ha Long has more than one passenger port, and drivers sometimes assume the wrong one. The two you are most likely to see on a booking are separate locations:' },
        {
          table: {
            head: ['', 'Tuan Chau International Passenger Port', 'Ha Long International Cruise Port'],
            rows: [
              ['Where', 'Tuan Chau Island, west of Bai Chay, linked to the mainland by road', 'Bai Chay, closer to the centre of Ha Long'],
              ['Used by', 'Many overnight cruises, including Green Ruby', 'Domestic cruise boats and international cruise ships'],
              ['Distance between them', 'Around 13–14 km by road', ''],
            ],
          },
        },
        { p: 'Give your driver the exact check-in location, not just “Halong Bay”.' },
      ],
    },
    {
      id: 'check-in',
      title: 'Where Green Ruby guests check in',
      blocks: [
        { p: 'Both Green Ruby vessels are planned to welcome guests at the **Green Ruby lounge at Tuan Chau International Passenger Port**. [Open the departure terminal in Google Maps](checkin-map). Your booking confirmation will give the exact location and reporting time.' },
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
              ['Boarding (planned)', 'Tender from Tuan Chau to the ship at anchor', 'Tender from Tuan Chau to Gia Luan Pier on Cat Ba Island (Hai Phong), then on board'],
              ['Return (planned)', 'To Tuan Chau, late morning', 'To Tuan Chau, disembarking around 11:00'],
            ],
          },
        },
        { p: 'Under Green Ruby’s planned arrangements, both itineraries begin with check-in at Tuan Chau; the crossing to Gia Luan Pier is part of the Green Ruby 2 boarding.' },
      ],
    },
    {
      id: 'return',
      title: 'Return transfers and onward flights',
      blocks: [
        { p: 'Overnight cruises generally return to port in the late morning. Under Green Ruby’s provisional itineraries, guests are expected to disembark at Tuan Chau at approximately 11:00–11:30.' },
        { p: 'The journey back to Hanoi or Noi Bai Airport may take several hours, depending on traffic and the transfer service you choose. If you are flying on the same day, consider the following:' },
        {
          ul: [
            '**Domestic flights from Noi Bai:** allow time for the full road transfer and aim to arrive at the airport at least two hours before departure.',
            '**International flights from Noi Bai:** allow at least three hours at the airport, plus additional time for the road journey and possible delays.',
            '**Flights from Cat Bi or Van Don:** confirm the transfer route, estimated journey time and airport check-in requirements before booking.',
            '**Travelling onward to Ninh Binh:** allow sufficient time for the road journey and avoid scheduling activities immediately after your expected arrival.',
          ],
        },
        { p: 'Weather restrictions, changes to cruise operations and road conditions can all affect your return time.' },
        { note: '**Our advice:** if your onward flight is expensive, difficult to change or part of an international connection, consider staying another night before flying. The times given here are estimates, not guaranteed arrival times. Always confirm your cruise’s expected return time and transfer arrangements before finalising onward travel.' },
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
    { q: 'How long does it take to get from Hanoi to Halong Bay?', a: 'The drive from central Hanoi to Tuan Chau usually takes around 2.5–3.5 hours, depending on traffic, your departure point and whether the vehicle makes additional stops.' },
    { q: 'What is the best way to get from Hanoi to Halong Bay?', a: 'A private car is convenient for families, groups and travellers who prefer a direct journey. Shared limousine vans are a practical alternative for couples and solo travellers, especially when hotel pick-up is available.' },
    { q: 'Is the transfer included in a Green Ruby cruise?', a: 'Under Green Ruby’s current plans, transfers between Hanoi and Tuan Chau are arranged separately and are not included in the standard cruise fare. Confirm available options and prices when booking.' },
    { q: 'Which airport is closest to Halong Bay?', a: 'Cat Bi Airport in Hai Phong and Van Don Airport in Quang Ninh are both alternatives to Noi Bai Airport in Hanoi. The most convenient choice depends on your flight options, cruise departure point and onward transfer.' },
    { q: 'Can I go straight from Noi Bai Airport to my cruise?', a: 'Yes, provided your flight arrives early enough and you can reach the check-in location on time. However, flight delays, immigration and baggage collection can make same-day connections risky. Arriving the previous day is generally safer.' },
    { q: 'Where do Green Ruby cruises depart from?', a: 'Both Green Ruby 1 and Green Ruby 2 are planned to welcome guests at the Green Ruby lounge at Tuan Chau International Passenger Port. Boarding arrangements differ between the two vessels. Your final booking confirmation will provide the exact location, reporting time and transfer instructions.' },
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
      road: 'Road time to Tuan Chau (estimate)',
      hours: 'hours',
      minutes: 'min',
      decimal: '.',
      roadUnknown: 'Varies by route and traffic. Confirm the journey time with your transfer provider.',
      depart: 'Suggested departure window',
      departShuttle: 'Shared vans pick up earlier, often around {from}–{to}; follow the operator’s pick-up time.',
      departNote: 'Includes a margin for traffic. Allow more at weekends and on public holidays.',
      departUnknown: 'Plan with your transfer provider so you reach Tuan Chau before the 10:45 check-in, with time to spare.',
      lastDay: 'Last day: disembarkation (provisional)',
      disembark: 'Return times can change with the weather and operations.',
      returnBack: 'Estimated arrival back in {origin}: around {from}–{to}, not guaranteed.',
      airportAdvice: 'Aim to be at the airport at least 2 hours before domestic and 3 hours before international flights, after the full road transfer.',
      table: { mode: 'Option', time: 'Time (estimate)', notes: 'Notes' },
      note: 'Suggestions only, for a provisional 10:45 check-in and 11:00–11:30 disembarkation. Not a schedule or a guarantee: allow additional time for traffic, delays and airport procedures.',
    },
    origins: [
      {
        key: 'hanoi',
        label: 'Hanoi (Old Quarter)',
        routes: [
          { mode: 'Private car', time: '2.5–3 h', notes: 'Door to door; you choose the time.' },
          { mode: 'Shared limousine van', time: '3–3.5 h', notes: 'Hotel pick-ups in selected areas, usually from about 07:00, one rest stop.' },
          { mode: 'Public bus + taxi', time: '3.5–4.5 h', notes: 'To Bai Chay bus station, then a taxi. Hard to time for a morning check-in.' },
        ],
        tip: 'Staying near the Old Quarter usually makes shuttle pick-ups simplest.',
      },
      {
        key: 'noibai',
        label: 'Noi Bai Airport (HAN)',
        airport: 'noibai',
        routes: [
          { mode: 'Private car', time: '2.5–3.5 h', notes: 'Pre-arranged pick-up at arrivals; check the provider’s waiting-time policy.' },
          { mode: 'Taxi or ride-hailing', time: '2.5–3.5 h', notes: 'Agree the price and the exact terminal before setting off.' },
        ],
        tip: 'A same-day cruise needs an early arrival and leaves little room for delays. Spending the previous night in Hanoi is generally safer.',
      },
      {
        key: 'catbi',
        label: 'Cat Bi Airport (HPH)',
        airport: 'catbi',
        routes: [
          { mode: 'Private car', time: 'Varies', notes: 'Confirm the route and journey time to Tuan Chau with your provider.' },
          { mode: 'Taxi or ride-hailing', time: 'Varies', notes: 'Available at the airport; confirm the exact terminal.' },
        ],
        tip: 'Convenient for some domestic routes; check the transfer time before choosing a same-day connection.',
      },
      {
        key: 'vandon',
        label: 'Van Don Airport (VDO)',
        airport: 'vandon',
        routes: [{ mode: 'Private car or taxi', time: 'Varies', notes: 'Fewer flights; book the car in advance and confirm the journey time.' }],
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
