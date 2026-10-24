import type { GuideContent } from './types';

// Edited 2026-10-24 after an editorial review (softer claims on motion, optional activities, flight timing).
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
  lead: 'Planning your first overnight cruise in Halong Bay or Lan Ha Bay? This guide covers how to choose the right itinerary, what to expect on board, how to prepare for departure and the practical details that can make your trip easier.',
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
        { p: 'Ha Long Bay is a UNESCO World Heritage Site, recognised for its remarkable limestone scenery and geological significance. In 2023, the World Heritage property was expanded to include the Cat Ba Archipelago, which encompasses Lan Ha Bay. Much of its appeal lies in the vast landscape of limestone islands, best appreciated from the water, with time to take in the scenery.' },
        { p: 'A day trip from Hanoi is possible, but much of your time will be spent travelling: roughly five to six hours on the road there and back. An overnight cruise gives you time to enjoy the bay beyond the busiest sightseeing hours, including the chance to watch the sunset, spend the night surrounded by limestone islands and enjoy the quieter early morning hours.' },
        { p: 'An overnight cruise may be less suitable if you prefer independent travel, long beach days or a completely flexible schedule. Activities follow a planned itinerary and may change depending on the weather, tides and local regulations.' },
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
              ['Typical highlights', '[Sung Sot Cave](destination:sung-sot-cave), [Ti Top Island](destination:ti-top-island), [Luon Cave](destination:luon-cave)', '[Dark & Bright Cave](destination:dark-bright-cave), [Ao Ech Lagoon](destination:ao-ech-lagoon), [Viet Hai Village](destination:viet-hai-village)'],
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
              ['Time on the water', 'About 4–6 hours', 'Just under 24 hours', 'About 2 days, depending on the itinerary'],
              ['What you see', 'One area, usually the busiest', 'Two or three stops, sunset and sunrise', 'An additional day exploring quieter parts of the bay'],
              ['Pace', 'Rushed', 'Comfortable', 'Relaxed'],
              ['Suits', 'Very tight schedules', 'Most first-time visitors', 'Travellers who want quieter areas, families with time'],
            ],
          },
        },
        { p: 'If you are unsure, choose 2 days 1 night. A two-night cruise is a better choice if you want to explore further: on Green Ruby’s plan, the second day includes a day-boat excursion to [Cua Van](destination:cua-van-floating-village) and [Tien Ong Cave](destination:tien-ong-cave) in Ha Long Bay, or to [Viet Hai Village](destination:viet-hai-village) on Cat Ba Island in Lan Ha Bay.' },
      ],
    },
    {
      id: 'cabins',
      title: 'Choosing a cabin and what is on board',
      blocks: [
        { p: 'Your cabin is where you will unwind after a day of sightseeing, so it is worth comparing more than just the room photographs. Cabin size, location and amenities can make a noticeable difference to your comfort on board.' },
        {
          ul: [
            '**Private outdoor space:** a balcony or terrace gives you somewhere to enjoy the views without leaving your cabin.',
            '**Bed configuration:** check whether the cabin has a double or twin beds, and whether an extra bed is available.',
            '**Size and location:** consider the cabin’s floor space, deck level and proximity to shared areas.',
            '**Onboard facilities:** look at the sundeck, restaurant, lounge and wellness facilities, as well as the amenities in your cabin. A smaller cabin can still offer a comfortable stay, especially if you plan to spend time on deck.',
          ],
        },
        { p: 'Green Ruby 1 and Green Ruby 2 are planned to feature four cabin categories: Serenity Deluxe, Ocean Breeze Premium, Royal Romance Suite and Imperial Suite. Final specifications and amenities should be confirmed against the published [fleet information](/about-us/brand-facts) before booking.' },
      ],
    },
    {
      id: 'inclusions',
      title: 'What is included, and what costs extra?',
      blocks: [
        { p: 'Overnight cruise fares generally include accommodation, meals and scheduled sightseeing activities. Transfers, drinks and optional services may cost extra.' },
        { p: 'Green Ruby’s planned itineraries include meals, entrance fees for scheduled attractions and activities such as kayaking or bamboo boat excursions. Additional services, including transfers and spa treatments, are generally charged separately:' },
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
        { p: 'Always review the inclusions, exclusions and cancellation terms for your chosen [itinerary](itineraries) before confirming a booking, and check the inclusions listed in your booking confirmation. Under Green Ruby’s published cancellation policy (see the [FAQ](faq)), cancellations 30 days or more before departure are refunded in full, charges then increase as the departure date approaches, and cancellations within 7 days are non-refundable. The terms that apply are confirmed at booking.' },
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
            '**Payment**: a little Vietnamese dong is useful for small purchases ashore; confirm in advance which [payment methods](/payment-methods) are accepted on board.',
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
        { p: 'For many overnight cruises, guests check in at a shoreside lounge before taking a tender boat to the main vessel.' },
        { p: 'Green Ruby plans to welcome guests at Tuan Chau, with different transfer arrangements for Green Ruby 1 and Green Ruby 2. Choose a ship below to see the planned boarding day. All times are provisional and may change depending on weather conditions, operational requirements and instructions from the port authorities.' },
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
        { p: 'Ships anchor in designated overnight areas, and guests remain on board overnight. Most leisure activities are optional, subject to safety requirements; let the crew know if you would rather stay on board at a stop. See the planned [onboard experiences](/experiences).' },
      ],
    },
    {
      id: 'safety',
      title: 'Weather, safety, children and accessibility',
      blocks: [
        { p: '**Weather.** October to April is cooler and drier; May to September is hot and humid and is also the storm season, roughly June to October. When a storm warning is issued, the authorities can suspend all sailings in the bay at short notice. Operators then reschedule or refund under their policy. Mist and low cloud can reduce visibility during winter. See [the best time to visit](bestTime) for month-by-month conditions.' },
        { p: '**Seasickness.** The bays are sheltered by islands and conditions are often relatively calm, although some movement is still possible, especially in strong wind. If you are prone to motion sickness, bring your usual remedy and ask the crew about conditions before departure.' },
        { p: '**Children.** Families are welcome on most cruises. Children wear life jackets for every water activity, and young children usually go in a bamboo boat with an adult rather than a kayak. Check the child policy, bed options and [safety policies](/safety-policies) when booking.' },
        { p: '**Accessibility.** Boarding involves stepping between a pier, a tender and the ship, and many sights involve steps: [Sung Sot Cave](destination:sung-sot-cave) and the [Ti Top](destination:ti-top-island) viewpoint have long stairways. Travellers with limited mobility can usually enjoy the cruise from the ship; tell the team your needs before booking so they can advise honestly.' },
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
            '**Booking a flight too soon after your cruise.** Disembarkation, road transfers and airport check-in all take time. Allow a generous buffer before any onward flight, and confirm the expected return time with your cruise operator.',
            '**Going to the wrong pier.** Ha Long has more than one passenger port. Give your driver the exact [check-in point](checkin-map); Green Ruby guests check in at Tuan Chau.',
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
    { q: 'Is a Halong Bay cruise worth it?', a: 'If you want to see the bay at different times of day and have time to relax, an overnight cruise is worth considering. A day trip from Hanoi spends much of its time on the road.' },
    { q: 'How many days do you need for Halong Bay?', a: 'Two days and one night is enough for a first visit. Choose three days and two nights to reach quieter areas by day boat and to travel at a slower pace.' },
    { q: 'What should I pack for a Halong Bay cruise?', a: 'Your original passport, swimwear, comfortable shoes with grip, a light jacket from November to March, sun protection, any medication and a dry bag for kayaking. A small overnight bag is easier than a suitcase.' },
    { q: 'Will I get seasick on a Halong Bay cruise?', a: 'Conditions in the sheltered bays are often relatively calm, although some movement is still possible, especially in strong wind. If you are sensitive to motion, bring your usual remedy.' },
    { q: 'Can cruises be cancelled because of the weather?', a: 'Yes. During storm warnings, mostly between June and October, the authorities can suspend sailings at short notice. The operator then reschedules or refunds under its policy.' },
    { q: 'What time do I need to arrive?', a: 'On Green Ruby’s published plan, check-in at the Tuan Chau lounge starts at about 10:45 and the tender leaves around 11:45. Confirm the final time and place with the reservations team before departure.' },
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
