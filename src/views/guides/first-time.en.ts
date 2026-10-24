import type { GuideContent } from './types';

// Facts used here: Green Ruby's published itineraries and FAQs (check-in ~10:45 at the Tuan Chau lounge,
// tender ~11:45, GR2 via Gia Luan Pier, inclusions, cancellation policy), brand facts (both ships planned,
// service expected February 2027, provisional), UNESCO listing. Travel times are estimates.

const firstTime: GuideContent = {
  metaTitle: 'First Time on a Halong Bay Cruise? A Practical Guide',
  metaDescription:
    'Is a Halong Bay cruise worth it, which bay and how many nights, what is included, how boarding day works, what to pack and the mistakes first-timers make.',
  breadcrumb: 'First-time cruise guide',
  eyebrow: 'Halong Cruise Guide',
  title: 'First Time on a Halong Bay Cruise? A Practical Guide',
  lead: 'What actually happens on an overnight cruise in Ha Long Bay or Lan Ha Bay, how to choose, and how to avoid the small planning mistakes that make the first day stressful.',
  summaryTitle: 'At a glance',
  summary: [
    ['Worth it?', 'Yes, if you stay at least one night: the bay is at its best at sunset and early morning, after the day boats leave.'],
    ['How long?', '**2 days 1 night** for a first visit; **3 days 2 nights** to reach quieter areas and slow down.'],
    ['Which bay?', '**Ha Long Bay** for the classic caves and viewpoints; **Lan Ha Bay** for quieter water and kayaking.'],
    ['Getting there', 'Around 2.5–3 hours by road from Hanoi to Tuan Chau (estimate). See the [transfer guide](transfer).'],
    ['Boarding day', 'Check-in from about 10:45, tender to the ship around 11:45 on Green Ruby’s published plan.'],
  ],
  updated: { iso: '2026-10-24', label: 'Updated 24 October 2026' },
  tocTitle: 'In this guide',
  sections: [
    {
      id: 'worth-it',
      title: 'Is an overnight Halong Bay cruise worth it?',
      blocks: [
        { p: 'Ha Long Bay is a UNESCO World Heritage Site, listed for its scenery and its geology, and since 2023 the listing also covers the Cat Ba Archipelago around Lan Ha Bay. The scale is the point: thousands of limestone islands, most of them uninhabited, best seen slowly from the water.' },
        { p: 'A day trip from Hanoi is possible, but most of that day is spent on the road: roughly five to six hours there and back for three or four hours on the water. An overnight cruise turns the journey into part of the trip. You see the bay in the late-afternoon light, wake up at anchor, and visit caves or lagoons early, before the day boats arrive.' },
        { p: 'An overnight cruise is less suited to travellers who want long beach days, nightlife or complete freedom over the schedule. Days on board follow a programme set around tides, weather and the bay’s navigation rules.' },
      ],
    },
    {
      id: 'which-bay',
      title: 'Ha Long Bay or Lan Ha Bay?',
      blocks: [
        { p: 'Both bays share the same karst landscape. The difference is in what you do and how busy it feels. Our [full comparison of the two bays](bayComparison) goes into more detail; in short:' },
        {
          table: {
            head: ['', 'Ha Long Bay', 'Lan Ha Bay'],
            rows: [
              ['Character', 'The classic core of the UNESCO site; busier routes', 'Off Cat Ba Island; fewer boats, quieter anchorages'],
              ['Typical highlights', '[Sung Sot Cave](destination:sung-sot-cave), [Ti Top Island](destination:titop-island), [Luon Cave](destination:luon-cave)', '[Dark & Bright Cave](destination:dark-and-bright-cave), [Ao Ech Lagoon](destination:ao-ech-lagoon), [Viet Hai Village](destination:viet-hai-village)'],
              ['Best for', 'First-timers who want the famous sights', 'Kayaking, swimming and a calmer pace'],
              ['Green Ruby ship', 'Green Ruby 1', 'Green Ruby 2'],
            ],
          },
        },
        { p: 'Both Green Ruby ships check guests in at Tuan Chau; Green Ruby 2 guests then continue by tender to Gia Luan Pier to board on Lan Ha Bay. See every stop on the [destinations map](destinations).' },
      ],
    },
    {
      id: 'how-long',
      title: 'Day cruise, 2 days 1 night or 3 days 2 nights',
      blocks: [
        {
          table: {
            head: ['', 'Day cruise', '2 days 1 night', '3 days 2 nights'],
            rows: [
              ['Time on the water', 'About 4–6 hours', 'About 24 hours', 'About 48 hours'],
              ['What you see', 'One area, usually the busiest', 'Two or three stops, sunset and sunrise', 'A full day further out by day boat'],
              ['Pace', 'Rushed', 'Comfortable', 'Relaxed'],
              ['Suits', 'Very tight schedules', 'Most first-time visitors', 'Travellers who want quieter areas, families with time'],
            ],
          },
        },
        { p: 'If you are unsure, choose 2 days 1 night. The second night is worth it when you want the day-boat excursion: on Green Ruby’s plan it goes to [Cua Van](destination:cua-van-floating-village) and [Tien Ong Cave](destination:tien-ong-cave) in Ha Long Bay, or to [Viet Hai Village](destination:viet-hai-village) on Cat Ba Island in Lan Ha Bay.' },
      ],
    },
    {
      id: 'cabins',
      title: 'Choosing a cabin and what is on board',
      blocks: [
        { p: 'Cabin choice matters more on a one-night cruise than you might expect, because you will spend the evening and early morning in it. Things worth comparing:' },
        {
          ul: [
            '**Outdoor space**: a private balcony or terrace lets you watch sunrise without going up to the sundeck.',
            '**Bed set-up**: check double or twin beds and whether a third bed or a child can be added.',
            '**Size and deck**: higher decks have wider views; lower decks can feel more stable.',
            '**Shared facilities**: sundeck, restaurant, bar and spa are shared by all guests, so a smaller cabin need not mean a smaller trip.',
          ],
        },
        { p: 'Green Ruby 1 and Green Ruby 2 are planned as identical sister ships with the same four cabin categories: Imperial Suite, Royal Romance Suite, Ocean Breeze Premium and Serenity Deluxe. Specifications are from the ships’ design; see the [fleet facts](/about-us/brand-facts) for the current status.' },
      ],
    },
    {
      id: 'inclusions',
      title: 'What is included, and what costs extra',
      blocks: [
        { p: 'Cruise fares in the bay usually include more than a hotel night but rarely everything. On Green Ruby’s published itineraries:' },
        {
          table: {
            head: ['Usually included', 'Usually extra'],
            rows: [
              ['All meals on the itinerary (lunch, dinner, breakfast, brunch)', 'Transfers between Hanoi or the airport and Tuan Chau'],
              ['Cabin with private bathroom and air conditioning', 'Drinks, unless stated otherwise'],
              ['Entrance fees for the scheduled visits', 'Spa treatments'],
              ['Kayaking or bamboo boat at the scheduled stops', 'Tips for crew and guides'],
              ['Cooking class and morning Tai Chi; guide on board', 'Travel insurance and personal expenses'],
              ['Day-boat excursion (3 days 2 nights only)', ''],
            ],
          },
        },
        { p: 'Check the list on the [itinerary](itineraries) you book; it is the reference. Cancellation terms are published in the [FAQ](faq): full refund 30 days or more before departure, then a sliding charge, and no refund within 7 days.' },
        { note: 'Green Ruby’s ships are planned to enter service in February 2027 (provisional). Fares and departure dates are confirmed at booking.' },
      ],
    },
    {
      id: 'before-you-go',
      title: 'Preparing for departure',
      blocks: [
        {
          ul: [
            '**Passport**: bring the original. Cruise operators register every passenger with the port authorities before boarding.',
            '**Visa and entry**: check Vietnam’s current entry rules for your nationality well ahead of travel.',
            '**Dietary needs and health**: tell the team about allergies, diets and medical conditions when you book, not at the pier.',
            '**Travel insurance**: worth having, especially from June to October, when storms can change sailings.',
            '**Cash**: a little Vietnamese dong or US dollars is useful for small purchases ashore; cards are accepted on board for extras.',
          ],
        },
      ],
    },
    {
      id: 'getting-there',
      title: 'Getting from Hanoi to the cruise terminal',
      blocks: [
        { p: 'Tuan Chau is around 160–180 km from central Hanoi by expressway. Allow around 2.5 to 3 hours by private car and a little more by shared limousine van, which stops for other passengers and a rest break. All times are estimates: traffic out of Hanoi and holiday weekends make the biggest difference.' },
        { p: 'Transfers are not included in the cruise fare. Green Ruby’s published plan is to offer a shared limousine shuttle and private cars on request at extra cost. The [Hanoi to Halong Bay transfer guide](transfer) compares every option, including arrivals at Noi Bai, Cat Bi and Van Don airports.' },
      ],
    },
    {
      id: 'boarding-day',
      title: 'Boarding day, hour by hour',
      blocks: [
        { p: 'Large cruise ships cannot berth at the passenger terminal, so guests check in ashore and are taken out by a small tender boat. This timeline follows Green Ruby’s published itineraries.' },
        { widget: 'boarding-timeline' },
        { p: '**The tender ride.** Tenders are covered motor launches. Crew help you step across, life jackets are provided, and luggage is carried for you. Keep a small bag with your passport, medication and phone with you.' },
      ],
    },
    {
      id: 'on-board',
      title: 'What to expect on board',
      blocks: [
        {
          ul: [
            '**Afternoon**: a safety briefing, lunch while the ship sails, then the first excursion: a cave or lagoon by kayak or bamboo boat, sometimes a beach.',
            '**Evening**: sunset on the sundeck, a cooking class or quiet time, dinner, then optional squid fishing from the deck.',
            '**Morning**: Tai Chi at sunrise, a light breakfast and one more visit, often a cave, before brunch and the return to port.',
          ],
        },
        { p: 'Ships anchor in designated overnight areas; there is no going ashore at night. Everything on the programme is optional: you can stay on board at any stop.' },
      ],
    },
    {
      id: 'safety',
      title: 'Weather, safety, children and accessibility',
      blocks: [
        { p: '**Weather.** October to April is cooler and drier; May to September is hot and humid and is also the storm season, roughly June to October. When a storm warning is issued, the authorities can suspend all sailings in the bay at short notice. Operators then reschedule or refund under their policy. Winter can bring mist and low cloud, which softens the views. See [the best time to visit](bestTime) for month-by-month conditions.' },
        { p: '**Seasickness.** The bays are sheltered by islands and the water is usually calm, so most people feel little or no motion. If you are prone to motion sickness, bring your usual remedy for the tender ride.' },
        { p: '**Children.** Families are welcome on most cruises. Children wear life jackets for every water activity, and young children usually go in a bamboo boat with an adult rather than a kayak. Check the child policy and bed options when booking.' },
        { p: '**Accessibility.** Boarding involves stepping between a pier, a tender and the ship, and many sights involve steps: [Sung Sot Cave](destination:sung-sot-cave) and the [Ti Top](destination:titop-island) viewpoint have long stairways. Travellers with limited mobility can usually enjoy the cruise from the ship; tell the team your needs before booking so they can advise honestly.' },
      ],
    },
    {
      id: 'packing',
      title: 'Packing checklist',
      blocks: [
        { p: 'Pack a small overnight bag rather than a large suitcase: it is easier on the tender and in the cabin.' },
        {
          checklist: [
            { title: 'Documents', items: ['Original passport', 'Booking confirmation', 'Travel insurance details', 'Some cash for extras'] },
            { title: 'Clothing', items: ['Swimwear and a quick-dry towel', 'Comfortable shoes with grip for caves and steps', 'Light layer or jacket (essential November to March)', 'Hat and sunglasses'] },
            { title: 'Essentials', items: ['Sun protection and insect repellent', 'Personal medication and seasickness remedy if needed', 'Dry bag for your phone on kayaks', 'Power bank and charging cable'] },
          ],
        },
      ],
    },
    {
      id: 'mistakes',
      title: 'Common first-time mistakes',
      blocks: [
        {
          ol: [
            '**Booking an early flight on the last day.** Ships return late morning and the drive back takes hours. From Noi Bai, a domestic flight after about 16:30 is a realistic minimum (estimate).',
            '**Going to the wrong pier.** Ha Long has more than one passenger port. Give your driver the exact check-in point; Green Ruby guests check in at Tuan Chau.',
            '**Leaving the passport at the hotel.** Without the original document you may not be allowed to board.',
            '**Choosing a day trip to save time.** You spend most of it in a vehicle and miss the bay at its quietest.',
            '**Expecting a beach holiday in winter.** From December to February swimming is chilly and skies are often grey; plan for scenery, not sunbathing.',
            '**Not telling the team about dietary or mobility needs in advance.** It is much easier to plan for them before departure.',
          ],
        },
      ],
    },
    {
      id: 'itineraries',
      title: 'Green Ruby itineraries',
      blocks: [{ p: 'Four itineraries are planned, two per bay, each as 2 days 1 night or 3 days 2 nights.' }, { widget: 'itineraries' }],
    },
  ],
  faqTitle: 'Questions first-time cruisers ask',
  faq: [
    { q: 'Is a Halong Bay cruise worth it?', a: 'For most visitors, yes, as long as you stay overnight. A day trip spends most of its time on the road; one night on board gives you sunset, sunrise and quieter visits.' },
    { q: 'How many days do you need for Halong Bay?', a: 'Two days and one night is enough for a first visit. Choose three days and two nights to reach quieter areas by day boat and to travel at a slower pace.' },
    { q: 'What should I pack for a Halong Bay cruise?', a: 'Your original passport, swimwear, comfortable shoes with grip, a light jacket from November to March, sun protection, any medication and a dry bag for kayaking. A small overnight bag is easier than a suitcase.' },
    { q: 'Will I get seasick on a Halong Bay cruise?', a: 'Rarely. The bays are sheltered by islands and the water is usually calm. If you are sensitive to motion, bring your usual remedy for the tender ride.' },
    { q: 'Can cruises be cancelled because of the weather?', a: 'Yes. During storm warnings, mostly between June and October, the authorities can suspend sailings at short notice. The operator then reschedules or refunds under its policy.' },
    { q: 'What time do I need to arrive?', a: 'On Green Ruby’s published plan, check-in at the Tuan Chau lounge starts at about 10:45 and the tender leaves around 11:45. From Hanoi, that means leaving by about 07:15 in a private car (estimate).' },
  ],
  related: {
    title: 'Keep planning',
    links: [
      { href: 'transfer', title: 'Hanoi to Halong Bay', body: 'Transfers, ports and realistic travel times.' },
      { href: 'destinations', title: 'Ha Long Bay attractions', body: 'Caves, islands and villages with practical notes.' },
      { href: 'luxuryPillar', title: 'Luxury cruises in Ha Long Bay', body: 'What sets a premium cruise apart, in depth.' },
    ],
  },
  estimateNote: 'Travel times and durations on this page are estimates, not schedules. Green Ruby’s itineraries are provisional until the ships enter service, expected in February 2027.',
  timeline: {
    label: 'Choose your ship',
    note: 'Times from Green Ruby’s published itineraries; provisional, and subject to weather and port instructions on the day.',
    tabs: [
      {
        key: 'gr1',
        label: 'Green Ruby 1 · Ha Long Bay',
        steps: [
          { time: '≈ 08:00', title: 'Leave Hanoi', body: 'Pick-up in Hanoi if you book a transfer; the drive takes about 2.5–3 hours (estimate).' },
          { time: '≈ 10:45', title: 'Check in at Tuan Chau', body: 'Green Ruby lounge at Tuan Chau: passports, luggage handover and a welcome drink.' },
          { time: '≈ 11:45', title: 'Tender to the ship', body: 'A short ride out to Green Ruby 1, anchored in Ha Long Bay.' },
          { time: '≈ 12:30', title: 'Safety briefing and cabins', body: 'Briefing in the restaurant, then keys and time to settle in.' },
          { time: '≈ 13:00', title: 'Lunch while sailing', body: 'The ship heads into the bay during lunch.' },
          { time: '≈ 15:30', title: 'First excursion', body: 'Luon Cave by kayak or bamboo boat, then Ti Top Island around 16:30.' },
        ],
      },
      {
        key: 'gr2',
        label: 'Green Ruby 2 · Lan Ha Bay',
        steps: [
          { time: '≈ 08:00', title: 'Leave Hanoi', body: 'Pick-up in Hanoi if you book a transfer; the drive takes about 2.5–3 hours (estimate).' },
          { time: '≈ 10:45', title: 'Check in at Tuan Chau', body: 'Same Green Ruby lounge at Tuan Chau as Green Ruby 1 guests.' },
          { time: '≈ 11:45', title: 'Tender to Gia Luan Pier', body: 'The tender crosses to Gia Luan Pier on Cat Ba Island (Hai Phong), where you board Green Ruby 2 on Lan Ha Bay.' },
          { time: '≈ 12:30', title: 'Safety briefing and cabins', body: 'Briefing in the restaurant, then keys and time to settle in.' },
          { time: '≈ 13:00', title: 'Lunch while sailing', body: 'Lunch as the ship heads into Lan Ha Bay.' },
          { time: '≈ 15:00–15:30', title: 'First excursion', body: 'Dark & Bright Cave by kayak or bamboo boat.' },
        ],
      },
    ],
  },
  itineraries: { title: 'Green Ruby itineraries', days: (n) => `${n} days ${n - 1} night${n > 2 ? 's' : ''}`, view: 'View itinerary' },
};

export default firstTime;
