import type { GuideContent } from './types';

// Durations are estimates (see transfer.ts ROAD_MINUTES). Operators, fares and timetables come from the
// shared registry in operators.ts (checked 2026-10-27, with sources); this file only describes them.
// Check-in point, tender arrangements and the transfer offer come from Green Ruby's published
// itineraries/FAQs and owner-confirmed brand facts; they remain provisional until service starts.
// Edited 2026-10-24 after an editorial review: no fixed flight times or "latest" departure, no published
// durations for Cat Bi / Van Don, airport timing per CAAV guidance (2 h domestic, 3 h international).
// 2026-10-27: operator tables, fares, Ninh Binh and return-trip detail, booking advice; shuttle timing
// aligned with the 10:45 check-in (pick-up about 06:00–06:30, not 07:00–08:00).

const transfer: GuideContent = {
  metaTitle: 'Hanoi to Halong Bay: Limousine, Bus & Transfer Prices',
  metaDescription:
    'Hanoi to Halong Bay by limousine, private car or bus: operators, fares and timetables checked October 2026, plus Noi Bai, Ninh Binh and Tam Coc to Tuan Chau Port.',
  breadcrumb: 'Hanoi to Halong Bay',
  eyebrow: 'Travel Guide',
  title: 'How to Get from Hanoi to Halong Bay: Transfers & Cruise Ports',
  lead: 'Compare the ways to travel from Hanoi, Noi Bai Airport, Ninh Binh and the other nearby airports to Halong Bay. This guide lists operators with published fares and timetables, explains the difference between the cruise ports and shows which options get you to a morning check-in at Tuan Chau on time.',
  summaryTitle: 'Quick answer',
  summary: [
    ['Fastest option from Hanoi', 'A private car usually takes around **2.5–3 hours** to reach Tuan Chau. One operator publishes **from 2,800,000 VND** for a whole 9-seat limousine.'],
    ['Shared limousine', 'Seats cost about **250,000–360,000 VND** with hotel pick-up in central Hanoi. For a 10:45 check-in, take a van that leaves Hanoi by about **07:00**.'],
    ['From Ninh Binh or Tam Coc', 'Allow **3.5–4.5 hours**. No shared service reliably reaches Tuan Chau before 10:45, so stay in Ha Long the night before or take a private car at dawn.'],
    ['Arriving by air', 'Noi Bai has hourly shared limousines to Ha Long (**600,000 VND** per seat for one passenger). From Cat Bi or Van Don, book a private transfer.'],
    ['Green Ruby check-in', 'Both Green Ruby vessels are planned to welcome guests at Tuan Chau International Passenger Port. The provisional check-in time is around 10:45.'],
    ['After your cruise', 'Disembarkation is planned for about 11:00–11:30. Book a return van that leaves Tuan Chau at 12:00 or later, and avoid flights too close to that time.'],
  ],
  published: '2026-10-24',
  updated: { iso: '2026-10-27', label: 'Updated 27 October 2026' },
  tocTitle: 'In this guide',
  sections: [
    {
      id: 'compare',
      title: 'Hanoi to Halong Bay: the options compared',
      blocks: [
        { p: 'The drive from central Hanoi to Tuan Chau, where many overnight cruises check in, is around 160–180 km. Most of the journey follows modern expressways; what varies is how long it takes to leave Hanoi and whether your vehicle stops for other passengers.' },
        {
          table: {
            head: ['Option', 'Door to door (estimate)', 'Published fares (Oct 2026)', 'Best for', 'Keep in mind'],
            rows: [
              ['Private car', '2.5–3 h', 'From 2,800,000 VND per 9-seat vehicle', 'Families, small groups, early check-ins, airport pick-ups', 'You choose the pick-up time; compare the total with seats for your group'],
              ['Shared limousine van', '3–3.5 h', '250,000–360,000 VND or US$15 per seat', 'Couples and solo travellers', 'Fixed departures; collects other guests on the way; port drop-off rules vary'],
              ['Expressway coach', '2.5 h from My Dinh bus station, plus getting there', 'About 160,000 VND per seat', 'Budget travellers with time to spare', 'Leaves from a bus station, not your hotel; hard to time for a morning check-in'],
            ],
          },
        },
        { note: 'Travel times are estimates for normal traffic, not guarantees. Allow more time on Friday evenings, Sunday afternoons and public holidays such as Tet and 30 April–1 May, when operators may also raise fares.' },
      ],
    },
    {
      id: 'planner',
      title: 'Plan your transfer',
      blocks: [
        { p: 'Choose where you are starting from to see the main options, a suggested departure window for a 10:45 check-in, published fares, the operators we checked and what to plan for on the last day. Allow additional time for traffic, delays and airport procedures.' },
        { widget: 'transfer-selector' },
      ],
    },
    {
      id: 'old-quarter',
      title: 'Hanoi Old Quarter to Tuan Chau: operators and times',
      blocks: [
        { p: 'Most visitors start from the Old Quarter. By private car, a departure between about 06:45 and 07:15 leaves a margin for traffic and a rest stop before the 10:45 check-in. With a shared van, book a departure that **leaves Hanoi by about 07:00**: pick-ups start 30–60 minutes before, so expect to be collected between about 06:00 and 06:30.' },
        { p: 'Shared vans that leave Hanoi at 08:00 or later reach Tuan Chau too close to check-in, or after it. That includes Cat Ba Express’s single 08:00 departure: by its own published journey time it arrives around 10:40.' },
        { operators: ['hanoi-halong'], caption: 'Hanoi → Ha Long: operators with published routes' },
        { p: '“Tuan Chau” in a timetable can mean a café near the port, the port gate or the terminal itself. Before you pay, ask the operator to confirm the drop-off at **Tuan Chau International Passenger Port**, not at Ha Long International Cruise Port in Bai Chay. Ha Long Travel Limousine, for example, does not drive a single passenger into the port: you are dropped at the front of the port and walk in. Groups of two or more can be driven inside for a 30,000 VND port fee.' },
      ],
    },
    {
      id: 'shuttle',
      title: 'Shared limousine van',
      blocks: [
        { p: 'Limousine vans are 9- to 11-seat minibuses with reclining seats. Most collect passengers from hotels in central Hanoi, stop once on the way and drop guests at set points or addresses in Ha Long. The operators above run several departures a day, so you can pick one that suits your check-in.' },
        {
          ul: [
            'A convenient shared option for one or two travellers.',
            'Pick-ups can take 30 minutes or more before the van leaves the city.',
            'Seat prices can differ by position: the middle “VIP” seats usually cost more than the front or rear.',
            'Luggage space is limited: a cabin bag plus a medium suitcase per person is a sensible maximum.',
            'Return vans run on the operator’s timetable; book a departure after the morning disembarkation.',
          ],
        },
        { p: 'Transfers are not included in Green Ruby’s cruise fares. Green Ruby plans to offer a shared shuttle and private cars between Hanoi and Ha Long at an additional charge; times and prices will be confirmed with your booking once service begins.' },
      ],
    },
    {
      id: 'private-car',
      title: 'Private car',
      blocks: [
        { p: 'A private car offers the most flexibility, particularly for families, small groups and travellers arriving at an airport. You can arrange pick-up at your hotel or terminal and travel directly to your cruise check-in location.' },
        { p: 'Published prices are scarce. Ha Long Travel Limousine lists a whole 9- or 10-seat limousine from 2,800,000–3,000,000 VND one way from Hanoi, and 3,000,000–3,200,000 VND from Noi Bai Airport. For a group of four or more, that can cost about the same as individual shuttle seats.' },
        {
          ul: [
            'Confirm the vehicle size and luggage capacity before booking.',
            'Ask whether tolls, parking and port entry are included.',
            'Request a child seat in advance if needed.',
            'Share your flight details with the transfer provider and check their waiting-time policy.',
            'Make sure the driver has the exact cruise terminal or lounge location.',
          ],
        },
        { p: 'Driving yourself requires a licence that is valid in Vietnam and parking near the port for the length of the cruise, so most visitors use a driver.' },
      ],
    },
    {
      id: 'bus',
      title: 'Public bus',
      blocks: [
        { p: 'Coaches run from Hanoi’s bus stations to Ha Long. Kumho Viet Thanh publishes an expressway service from My Dinh bus station (06:30, 09:30, 11:30, 13:30, 15:30 and 17:30, about 160,000 VND) with Tuan Chau among its Ha Long stops, although its website appears not to have been updated since 2022. Other buses end at Bai Chay, where you still need a taxi to the port.' },
        { p: 'Even the 06:30 coach leaves too little margin for a 10:45 check-in once you add the trip to My Dinh and the walk or taxi from the stop. A bus works best if you spend the night before in Ha Long.' },
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
              ['Noi Bai International Airport (HAN)', 'Hanoi’s main international airport. Allow approximately 2.5–3.5 hours or more to reach Tuan Chau. Shared limousines and private cars to Ha Long are listed below.'],
              ['Cat Bi International Airport (HPH)', 'In Hai Phong, about 40 km by road from Tuan Chau. We found no scheduled shared service to Tuan Chau; book a private transfer. Reseller listings start at about US$60–120 per vehicle.'],
              ['Van Don International Airport (VDO)', 'In Quang Ninh, about 60–70 km from Tuan Chau. Flight schedules are limited, and the airport buses go to Hon Gai and Bai Chay, not Tuan Chau. Book a private transfer and confirm the journey time.'],
            ],
          },
        },
        { h3: 'Noi Bai Airport to Ha Long: operators' },
        { operators: ['noibai-halong'], caption: 'Noi Bai Airport → Ha Long' },
        { p: '**Can you fly in and board your cruise on the same day?** It may be possible with an early arrival, but it leaves less room for flight delays, immigration, baggage collection and road traffic. If you are arriving internationally at Noi Bai, spending the previous night in Hanoi or near the cruise terminal is generally the more relaxed option.' },
      ],
    },
    {
      id: 'ninh-binh',
      title: 'Ninh Binh and Tam Coc to Halong Bay',
      blocks: [
        { p: 'Many itineraries combine Ninh Binh and Ha Long. Vans usually follow National Road 10 towards Hai Phong rather than going through Hanoi, and the journey takes around 3.5–4 hours by private car and 4–4.5 hours by shared van. Most operators collect from Tam Coc, where many visitors stay; one also picks up at hotels in Trang An, Bai Dinh and Ninh Binh city.' },
        { h3: 'Can you reach a 10:45 check-in from Ninh Binh on the same morning?' },
        { p: 'Not reliably by shared van. The earliest operator-published departure is Full Moon Travel’s 06:40 bus from Tam Coc, timetabled to reach Tuan Chau at 10:30, and another page on the same website shows it arriving at 11:00. Cat Ba Express leaves Tam Coc at 07:00 without publishing an arrival time. Ninh Binh Express Bus starts at 07:00–07:30 and takes about 4.5 hours. Earlier buses appear on some booking platforms, but their operators do not publish them, so we do not list them.' },
        {
          ol: [
            '**Spend the night before in Ha Long** (recommended). Tuan Chau and Bai Chay both have hotels; from Bai Chay it is about 13–14 km to the port. Take an afternoon van from Ninh Binh the day before.',
            '**Take a private car at dawn.** Leave Tam Coc around 05:45–06:15 for a 10:45 check-in.',
            '**Take a shared van only if your cruise checks in later in the day**, and choose a drop-off at Tuan Chau rather than Bai Chay.',
          ],
        },
        { h3: 'Ninh Binh → Ha Long: operators' },
        { operators: ['ninhbinh-halong'] },
        { p: 'Some vans drop at Bai Chay or in Ha Long city first. If yours ends at Bai Chay, take a taxi or ride-hailing car to Tuan Chau and allow about 20–30 minutes.' },
        { h3: 'After the cruise: Ha Long → Ninh Binh and Tam Coc' },
        { p: 'Afternoon returns are easier. Full Moon Travel’s 12:30 van starts in Ha Long city and collects at Tuan Chau afterwards, reaching Ninh Binh around 16:30. Cat Ba Express leaves at 11:40, which is tight after an 11:00–11:30 disembarkation. Ninh Binh Express Bus runs a midday departure, but its pages give two different times. A private car costs from about 1,600,000 VND, according to one travel agent’s listing.' },
        { operators: ['halong-ninhbinh'] },
      ],
    },
    {
      id: 'booking-tips',
      title: 'Booking a transfer: practical tips',
      blocks: [
        {
          ul: [
            '**Book ahead.** Book shared vans at least a day in advance, and earlier at weekends and on holidays. Private cars and airport pick-ups should be booked before you travel.',
            '**Calling from abroad.** Vietnamese mobile numbers start with 0 locally. From a foreign phone, drop the 0 and dial +84: 097 593 2468 becomes +84 97 593 2468. Numbers starting with 1900 only work from inside Vietnam.',
            '**Use WhatsApp or Zalo.** Most operators reply faster by message than by phone, and a written confirmation is easier to show your hotel or driver. Zalo is widely used in Vietnam.',
            '**Confirm the pick-up.** Send your hotel’s name and street address, and ask for the pick-up window. Some operators collect from a nearby fixed point rather than your door, so ask where to wait.',
            '**Ask about Tuan Chau.** Ask “Do you drop at Tuan Chau International Passenger Port?” and whether a single traveller is taken inside the port or left at the gate.',
            '**Check the extras.** Port entry fees, extra stops, late-night pick-ups, airport waiting time and holiday surcharges may cost more. Ask before you pay.',
            '**Large luggage.** Tell the operator about large suitcases, golf bags or folding pushchairs when you book. Shared vans usually allow one medium suitcase and one small bag per person.',
            '**Travelling with young children.** Child seats are not standard in shared vans. Request one for a private car, and check whether children pay full fare: some operators charge a full seat from about age 3.',
            '**If the van is late,** message the operator with your booking name. If it is more than 15–20 minutes late and you are heading for a cruise, also tell the cruise reservations team.',
          ],
        },
      ],
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
        { p: 'On the published itineraries, check-in starts at about 10:45 and the tender leaves around 11:45. The transport operators on this page drop at Tuan Chau, but not necessarily at the Green Ruby lounge: show your driver the map pin. The company’s registered office is a separate address; do not send your driver there. If anything is unclear, [contact the reservations team](contact) before you travel.' },
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
        { p: 'Under Green Ruby’s planned arrangements, both itineraries begin with check-in at Tuan Chau; the crossing to Gia Luan Pier is part of the Green Ruby 2 boarding, so you do not need to arrange transport to Cat Ba yourself. Not sure which bay to choose? See [Ha Long Bay vs Lan Ha Bay](bayComparison).' },
      ],
    },
    {
      id: 'return',
      title: 'Return transfers and onward flights',
      blocks: [
        { p: 'Overnight cruises generally return to port in the late morning. Under Green Ruby’s provisional itineraries, guests are expected to disembark at Tuan Chau at approximately 11:00–11:30. A van that leaves Tuan Chau at 12:00 or later is the safer choice; earlier departures leave little room if the tender is delayed.' },
        { h3: 'Tuan Chau to Hanoi and Noi Bai Airport: operators' },
        { operators: ['halong-hanoi', 'halong-noibai'] },
        { p: 'The journey back to Hanoi or Noi Bai Airport takes around 2.5–3 hours, plus drop-offs. If you are flying on the same day, consider the following:' },
        {
          ul: [
            '**Domestic flights from Noi Bai:** allow time for the full road transfer and aim to arrive at the airport at least two hours before departure.',
            '**International flights from Noi Bai:** allow at least three hours at the airport, plus additional time for the road journey and possible delays.',
            '**Flights from Cat Bi or Van Don:** there is no scheduled shared service from Tuan Chau that we could verify. Book a private car and confirm the journey time and airport check-in requirements.',
            '**Travelling onward to Ninh Binh:** see [the Ninh Binh section](#ninh-binh) for afternoon vans, and avoid scheduling activities immediately after your expected arrival.',
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
    { q: 'How much is a limousine from Hanoi to Halong Bay?', a: 'Operators published shared limousine seats at about 250,000–360,000 VND, or US$15, one way when we checked in October 2026. A whole 9-seat limousine was published from 2,800,000 VND. Prices change, so confirm them when you book.' },
    { q: 'What is the best way to get from Hanoi to Halong Bay?', a: 'A private car is convenient for families, groups and travellers who prefer a direct journey. Shared limousine vans are a practical alternative for couples and solo travellers. For a 10:45 check-in, choose a van that leaves Hanoi by about 07:00.' },
    { q: 'How do I get from Ninh Binh or Tam Coc to Halong Bay?', a: 'Shared limousines run from Tam Coc and Ninh Binh to Ha Long, and some drop at Tuan Chau. They take about 4–4.5 hours, and none reliably arrives before a 10:45 check-in, so spend the night before in Ha Long or take a private car leaving around 06:00.' },
    { q: 'Is the transfer included in a Green Ruby cruise?', a: 'Under Green Ruby’s current plans, transfers between Hanoi and Tuan Chau are arranged separately and are not included in the standard cruise fare. Confirm available options and prices when booking.' },
    { q: 'Which airport is closest to Halong Bay?', a: 'Cat Bi Airport in Hai Phong is about 40 km by road from Tuan Chau and Van Don Airport about 60–70 km; the drive from Noi Bai takes about 3 hours. Noi Bai has far more flights and the only scheduled shared limousines to Ha Long we could verify.' },
    { q: 'Can I go straight from Noi Bai Airport to my cruise?', a: 'Yes, provided your flight arrives early enough and you can reach the check-in location on time. However, flight delays, immigration and baggage collection can make same-day connections risky. Arriving the previous day is generally safer.' },
    { q: 'How do I get from Halong Bay to Hanoi Airport after my cruise?', a: 'Shared limousines run from Ha Long to Noi Bai through the afternoon, and private cars can be booked for a set time. Allow about 3 hours on the road plus the airport check-in time for your flight.' },
    { q: 'Where do Green Ruby cruises depart from?', a: 'Both Green Ruby 1 and Green Ruby 2 are planned to welcome guests at the Green Ruby lounge at Tuan Chau International Passenger Port. Boarding arrangements differ between the two vessels. Your final booking confirmation will provide the exact location, reporting time and transfer instructions.' },
  ],
  sourcesTitle: 'Sources',
  sources: [
    { title: 'Ha Long Bay Management Board: sightseeing route VHL1 (departures from Tuan Chau or Ha Long International Cruise Port)', url: 'https://halongbay.com.vn/tours/1-hanh-trinh-vhl1-cang-tau-dong-thien-cung-hang-dau-go-hon-cho-da-hang-ba-hang-hon-dinh-huong-hon-trong-mai' },
    { title: 'VietNamNet: Noi Bai advises arriving two hours before domestic and three hours before international flights', url: 'https://vietnamnet.vn/en/125-000-travelers-expected-at-hanoi-airport-as-holiday-rush-begins-2549423.html' },
    { title: 'Tuoi Tre News (20 July 2025): Ha Long Bay tourist boats banned from departing as Typhoon Wipha nears', url: 'https://news.tuoitre.vn/ha-long-bay-tourist-boats-banned-from-departing-as-typhoon-wipha-nears-103250720163544717.htm' },
    { title: 'Ha Long Travel Limousine: Hanoi–Ha Long fares and timetable; pick-up rules at Tuan Chau port', url: 'https://xehalong.vn/quy-trinh-don-tra' },
    { title: 'Ha Long Travel Limousine: Noi Bai Airport–Ha Long shared and private limousine', url: 'https://xehalong.vn/xe-limousine-noi-bai-ha-long-cam-pha/' },
    { title: 'Cat Ba Express: Hanoi to Ha Long limousine (drop-off points at Tuan Chau and Bai Chay)', url: 'https://catbaexpress.com/bus-hanoi-to-halong.html' },
    { title: 'Full Moon Travel: Ninh Binh to Ha Long bus timetable', url: 'https://fullmoontravelasia.com/ninh-binh-to-halong-bay-by-bus/' },
    { title: 'Ninh Binh Express Bus: Ninh Binh–Ha Long limousine timetable and fares', url: 'https://ninhbinhexpressbus.com/lich-trinh-xe-limousine-ninh-binh-di-ha-long/' },
    { title: 'VinWonders: Tuan Chau Island guide (distances from Cat Bi and Van Don airports)', url: 'https://vinwonders.com/vi/wonderpedia/news/dao-tuan-chau-ha-long/' },
  ],
  related: {
    title: 'Keep planning',
    links: [
      { href: 'firstTime', title: 'First time on a Halong Bay cruise?', body: 'What to expect, what to pack and how boarding day works.' },
      { href: 'itineraries', title: 'Green Ruby itineraries', body: 'Two bays, 2 days 1 night or 3 days 2 nights.' },
      { href: 'bestTime', title: 'Best time to visit Halong Bay', body: 'Weather, crowds and sea conditions month by month.' },
      { href: 'faq', title: 'Frequently asked questions', body: 'Booking, payment, cancellation and life on board.' },
    ],
  },
  estimateNote: 'All durations on this page are estimates for normal conditions, not schedules or guarantees. Operator fares and timetables are as published on the date shown under each table. Check-in and boarding details follow Green Ruby’s published plan and remain provisional until the ships enter service, expected in February 2027.',
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
      departShuttle: 'Shared vans: book one that leaves Hanoi by about 07:00; pick-up is often around {from}–{to}.',
      departNote: 'Includes a margin for traffic. Allow more at weekends and on public holidays.',
      departUnknown: 'Plan with your transfer provider so you reach Tuan Chau before the 10:45 check-in, with time to spare.',
      lastDay: 'Last day: disembarkation (provisional)',
      disembark: 'Return times can change with the weather and operations.',
      returnBack: 'Estimated arrival back in {origin}: around {from}–{to}, not guaranteed.',
      airportAdvice: 'Aim to be at the airport at least 2 hours before domestic and 3 hours before international flights, after the full road transfer.',
      table: { mode: 'Option', time: 'Time (estimate)', notes: 'Notes' },
      cost: 'Published fares (one way)',
      costNone: 'No fares we could verify. Ask for a private-transfer quote.',
      operators: 'Operators we checked',
      operatorsNone: 'No scheduled shared service to Tuan Chau that we could verify. Book a private transfer.',
      returnOperators: 'Back from Tuan Chau:',
      seeTable: 'Compare pick-up and drop-off points',
      operatorsAnchor: { hanoi: 'old-quarter', noibai: 'airports', ninhbinh: 'ninh-binh' },
      note: 'Suggestions only, for a provisional 10:45 check-in and 11:00–11:30 disembarkation. Not a schedule or a guarantee: allow additional time for traffic, delays and airport procedures. Fares as published by the operators; confirm when booking.',
    },
    origins: [
      {
        key: 'hanoi',
        label: 'Hanoi (Old Quarter)',
        routes: [
          { mode: 'Private car', time: '2.5–3 h', notes: 'Door to door; you choose the time.' },
          { mode: 'Shared limousine van', time: '3–3.5 h', notes: 'Hotel pick-ups in central Hanoi, one rest stop. Hourly departures with some operators.' },
          { mode: 'Expressway coach', time: '2.5 h + transfer to My Dinh', notes: 'From My Dinh bus station. Hard to time for a morning check-in.' },
        ],
        tip: 'Staying near the Old Quarter usually makes shuttle pick-ups simplest.',
      },
      {
        key: 'noibai',
        label: 'Noi Bai Airport (HAN)',
        airport: 'noibai',
        routes: [
          { mode: 'Private car', time: '2.5–3.5 h', notes: 'Pre-arranged pick-up at arrivals; check the provider’s waiting-time policy.' },
          { mode: 'Shared limousine van', time: 'About 3 h', notes: 'Hourly from the airport with at least one operator; a late flight can move to a later van.' },
          { mode: 'Taxi or ride-hailing', time: '2.5–3.5 h', notes: 'Agree the price and the exact terminal before setting off.' },
        ],
        tip: 'A same-day cruise needs an early arrival and leaves little room for delays. Spending the previous night in Hanoi is generally safer.',
      },
      {
        key: 'catbi',
        label: 'Cat Bi Airport (HPH)',
        airport: 'catbi',
        routes: [
          { mode: 'Private car', time: 'Varies', notes: 'About 40 km by road. Confirm the route and journey time to Tuan Chau with your provider.' },
          { mode: 'Taxi or ride-hailing', time: 'Varies', notes: 'Available at the airport; confirm the exact terminal.' },
        ],
        tip: 'Convenient for some domestic routes; check the transfer time before choosing a same-day connection.',
      },
      {
        key: 'vandon',
        label: 'Van Don Airport (VDO)',
        airport: 'vandon',
        routes: [{ mode: 'Private car or taxi', time: 'Varies', notes: 'About 60–70 km. Book the car in advance and confirm the journey time.' }],
        tip: 'Check flight days carefully: schedules at Van Don are limited.',
      },
      {
        key: 'ninhbinh',
        label: 'Ninh Binh / Tam Coc',
        routes: [
          { mode: 'Private car', time: '3.5–4 h', notes: 'Door to door on the expressways.' },
          { mode: 'Shared limousine van', time: '4–4.5 h', notes: 'From Tam Coc, some via Tuan Chau. None reliably arrives before 10:45.' },
        ],
        tip: 'For a morning check-in, a night in Ha Long first is the safer plan.',
      },
    ],
  },
  itineraries: { title: 'Green Ruby itineraries', days: (n) => `${n} days ${n - 1} night${n > 2 ? 's' : ''}`, view: 'View itinerary' },
};

export default transfer;
