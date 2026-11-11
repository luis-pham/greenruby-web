import type { GuideContent } from './types';

// German version of first-time.en.ts (the English file is the source of truth). DRAFT, PENDING_REVIEW:
// transcreated 2026-11-11 for one German edition (DE/AT/CH, standard spelling with ß) following
// docs/i18n-audit/de/drafts/BRIEF-DE.md (owner-confirmed facts, 11 Nov 2026); needs native German review.
// Ship, cabin and itinerary names stay Latin; tender = „Beiboot“, day boat = „Tagesausflugsboot“,
// Gia Luan = „Anleger Gia Luan“, lounge = „VIP-Lounge von Green Ruby“. Sie throughout; Green Ruby is never a „Dschunke“.
// Machine time values in timeline steps (time fields) are kept as in the source; prose times 24 h with „Uhr“
// (10:45 Uhr, 7:30–8:00 Uhr). Decimal comma (2,5–3 Stunden). Links to English-only pages get their
// „(auf Englisch)“ mark from the site (lib/section-links.ts), so labels here carry none; external English sources do.
// REVIEW: (1) Lan Ha kayak suspension (local regulations, as of October 2026) added wherever kayaking is listed as
// included or as an activity (inclusions intro + table row, on-board afternoon); "as of October 2026" added to the
// which-bay table cell. Ha Long kayaking (Luon Cave) unchanged.
// REVIEW: (2) Launch wording: "begin sailing in February 2027" / "enter service" rendered as
// „erste Abfahrten für Februar 2027 geplant“ (brief: never "bereits in Betrieb").
// REVIEW: (3) Request-only booking: inclusions note and FAQ arrival answer say bookings are not open yet and guests
// send a „Buchungsanfrage“ with their dates; "before confirming a booking" rendered as "before sending your request".
// REVIEW: (4) Transfers: timeline "If you book a transfer" made explicit as a private transfer on request at extra cost
// (no shared shuttle offered by Green Ruby). Road time kept as the source range 2.5–3 h (brief: about 2.5 h).
// REVIEW: (5) Lounge named "VIP-Lounge von Green Ruby" (brief: Green Ruby VIP lounge in Tuan Chau).
// REVIEW: (6) Seasickness: "often relatively calm" rendered as "usually calmer than the open sea, depending on the
// weather" (brief wording); never "selten".
// REVIEW: (7) Cancellation summary kept as in the source (30+ days full refund, increasing charges, none within 7 days);
// no deposit percentages stated.
// Terms to check: „Sammel-Limousine (Minibus)“ (shared limousine van), „Tintenfischangeln“ (squid fishing), „Tai-Chi“.
const firstTime: GuideContent = {
  metaTitle: 'Erste Kreuzfahrt in der Halong-Bucht: Tipps',
  metaDescription:
    'Ihre erste Kreuzfahrt in der Halong-Bucht: welche Bucht, wie viele Nächte, was inklusive ist, wie der Einschiffungstag abläuft und was Sie einpacken sollten.',
  breadcrumb: 'Erste Kreuzfahrt',
  eyebrow: 'Reiseführer',
  title: 'Ihre erste Kreuzfahrt in der Halong-Bucht: was Sie erwartet',
  lead: 'Sie planen Ihre erste Kreuzfahrt mit Übernachtung in der Halong-Bucht oder der Lan-Ha-Bucht? Dieser Ratgeber hilft Ihnen, den passenden Reiseverlauf zu wählen, zeigt, was Sie an Bord erwartet, und bündelt die praktischen Details, die Sie vor der Abreise klären sollten.',
  summaryTitle: 'Auf einen Blick',
  summary: [
    ['Lohnt es sich?', 'Ja, wenn Sie mindestens eine Nacht an Bord bleiben: Am schönsten ist die Bucht bei Sonnenuntergang und am frühen Morgen, wenn die Tagesausflugsboote fort sind.'],
    ['Wie lange?', '**2 Tage, 1 Nacht** für den ersten Besuch; **3 Tage, 2 Nächte**, um ruhigere Gebiete zu erreichen und das Tempo zu drosseln.'],
    ['Welche Bucht?', 'Die **Halong-Bucht** für die klassischen Höhlen und Aussichtspunkte; die **Lan-Ha-Bucht** für ruhigeres Wasser, Dorfleben auf der Insel Cat Ba und Strände.'],
    ['Anreise', 'Von Hanoi nach Tuan Chau sind es auf der Straße etwa 2,5–3 Stunden (Schätzung). Mehr dazu im [Transfer-Ratgeber](transfer).'],
    ['Einschiffungstag', 'Laut dem veröffentlichten Ablauf von Green Ruby beginnt der Check-in gegen 10:45 Uhr, das Beiboot fährt gegen 11:45 Uhr zum Schiff.'],
  ],
  published: '2026-10-24',
  updated: { iso: '2026-10-26', label: 'Aktualisiert am 26. Oktober 2026' },
  tocTitle: 'In diesem Ratgeber',
  sections: [
    {
      id: 'worth-it',
      title: 'Lohnt sich eine Kreuzfahrt mit Übernachtung in der Halong-Bucht?',
      blocks: [
        { p: 'Die Halong-Bucht ist UNESCO-Weltnaturerbe, ausgezeichnet für ihre außergewöhnliche Kalksteinlandschaft und ihre geologische Bedeutung. 2023 wurde die Welterbestätte um den Cat-Ba-Archipel erweitert, zu dem auch die Lan-Ha-Bucht gehört. Ihr Reiz liegt vor allem in der Weite der Kalksteininseln – am besten vom Wasser aus erlebt, mit genügend Zeit, um die Landschaft auf sich wirken zu lassen.' },
        { p: 'Ein Tagesausflug ab Hanoi ist möglich, doch ein Großteil der Zeit vergeht im Auto: Hin und zurück sind es rund fünf bis sechs Stunden auf der Straße. Eine Kreuzfahrt mit Übernachtung lässt Ihnen Zeit für die Bucht jenseits der Hauptbesuchszeiten – für den Sonnenuntergang, eine Nacht inmitten der Kalksteininseln und die stillen Stunden am frühen Morgen.' },
        { p: 'Weniger geeignet ist eine Kreuzfahrt mit Übernachtung, wenn Sie lieber individuell reisen, lange Strandtage suchen oder einen völlig freien Zeitplan wünschen. Die Aktivitäten folgen einem festen Reiseverlauf und können sich je nach Wetter, Gezeiten und örtlichen Vorschriften ändern.' },
      ],
    },
    {
      id: 'which-bay',
      title: 'Halong-Bucht oder Lan-Ha-Bucht?',
      blocks: [
        { p: 'Beide Buchten teilen dieselbe Karstlandschaft. Der Unterschied liegt darin, was Sie unternehmen und wie belebt es ist. Unser [ausführlicher Vergleich der beiden Buchten](bayComparison) geht ins Detail; kurz gesagt:' },
        {
          table: {
            head: ['', 'Halong-Bucht', 'Lan-Ha-Bucht'],
            rows: [
              ['Charakter', 'Das klassische Kerngebiet der UNESCO-Stätte; stärker befahrene Routen', 'Vor der Insel Cat Ba; weniger Boote, ruhigere Ankerplätze'],
              ['Typische Höhepunkte', '[Sung-Sot-Höhle](destination:sung-sot-cave), [Ti-Top-Insel](destination:ti-top-island), [Luon-Höhle](destination:luon-cave)', '[Sang-Toi-Höhle (Dark & Bright Cave)](destination:dark-bright-cave), [Ao-Ech-Lagune](destination:ao-ech-lagoon), [Dorf Viet Hai](destination:viet-hai-village)'],
              ['Ideal für', 'Erstbesucher, die die berühmten Sehenswürdigkeiten sehen möchten', 'Ein ruhigeres Tempo, Dorfbesuche und Strände (Kajakfahren in der Lan-Ha-Bucht ist aufgrund örtlicher Vorschriften vorübergehend ausgesetzt, Stand Oktober 2026)'],
              ['Schiff von Green Ruby', 'Green Ruby 1', 'Green Ruby 2'],
            ],
          },
        },
        { p: 'Gäste beider Green-Ruby-Schiffe checken in Tuan Chau ein; wer mit Green Ruby 2 reist, fährt anschließend mit dem Beiboot zum Anleger Gia Luan und geht in der Lan-Ha-Bucht an Bord. Alle Stationen finden Sie auf der [Karte der Ausflugsziele](destinations).' },
      ],
    },
    {
      id: 'how-long',
      title: 'Tagestour, 2 Tage, 1 Nacht oder 3 Tage, 2 Nächte',
      blocks: [
        {
          table: {
            head: ['', 'Tagestour', '2 Tage, 1 Nacht', '3 Tage, 2 Nächte'],
            rows: [
              ['Zeit auf dem Wasser', 'Etwa 4–6 Stunden', 'Knapp 24 Stunden', 'Etwa 2 Tage, je nach Reiseverlauf'],
              ['Was Sie sehen', 'Ein Gebiet, meist das belebteste', 'Zwei oder drei Stationen, Sonnenuntergang und Sonnenaufgang', 'Einen zusätzlichen Tag in ruhigeren Teilen der Bucht'],
              ['Tempo', 'Gehetzt', 'Angenehm', 'Entspannt'],
              ['Passend für', 'Sehr knappe Zeitpläne', 'Die meisten Erstbesucher', 'Reisende, die ruhigere Gebiete suchen, Familien mit Zeit'],
            ],
          },
        },
        { p: 'Wenn Sie unsicher sind, wählen Sie 2 Tage, 1 Nacht. Zwei Nächte lohnen sich, wenn Sie weiter hinaus möchten: Im Programm von Green Ruby führt der zweite Tag mit einem Tagesausflugsboot nach [Cua Van](destination:cua-van-floating-village) und zur [Tien-Ong-Höhle](destination:tien-ong-cave) in der Halong-Bucht oder in der Lan-Ha-Bucht zum [Dorf Viet Hai](destination:viet-hai-village) auf der Insel Cat Ba.' },
      ],
    },
    {
      id: 'cabins',
      title: 'Kabinenwahl und Ausstattung an Bord',
      blocks: [
        { p: 'In Ihrer Kabine erholen Sie sich nach einem Tag voller Ausflüge – es lohnt sich also, mehr als nur die Fotos zu vergleichen. Größe, Lage und Ausstattung machen beim Komfort an Bord einen spürbaren Unterschied.' },
        {
          ul: [
            '**Privater Außenbereich:** Ein Balkon oder eine Terrasse erlaubt den Blick auf die Bucht, ohne die Kabine zu verlassen.',
            '**Bettenaufteilung:** Prüfen Sie, ob die Kabine ein Doppelbett oder zwei Einzelbetten hat und ob ein Zustellbett möglich ist.',
            '**Größe und Lage:** Achten Sie auf die Fläche, das Deck und die Nähe zu den Gemeinschaftsbereichen.',
            '**Einrichtungen an Bord:** Sehen Sie sich Sonnendeck, Restaurant, Lounge und Wellnessbereich ebenso an wie die Ausstattung Ihrer Kabine. Auch eine kleinere Kabine kann sehr komfortabel sein, vor allem wenn Sie viel Zeit an Deck verbringen möchten.',
          ],
        },
        { p: 'Für Green Ruby 1 und Green Ruby 2 sind vier Kabinenkategorien geplant: Serenity Deluxe, Ocean Breeze Premium, Royal Romance Suite und Imperial Suite. Die endgültigen Daten und die Ausstattung sollten Sie vor der Buchung anhand der veröffentlichten [Flotteninformationen](/about-us/brand-facts) prüfen.' },
      ],
    },
    {
      id: 'inclusions',
      title: 'Was ist inklusive, was kostet extra?',
      blocks: [
        { p: 'Der Preis einer Kreuzfahrt mit Übernachtung umfasst in der Regel Unterkunft, Mahlzeiten und die geplanten Ausflüge. Transfers, Getränke und zusätzliche Leistungen können extra kosten.' },
        { p: 'Die geplanten Reiseverläufe von Green Ruby umfassen die Mahlzeiten, die Eintrittsgelder für die vorgesehenen Ziele sowie Aktivitäten wie Kajakfahren oder Ausflüge im Bambusboot (Kajakfahren in der Lan-Ha-Bucht ist aufgrund örtlicher Vorschriften vorübergehend ausgesetzt, Stand Oktober 2026). Zusätzliche Leistungen wie Transfers und Spa-Anwendungen werden in der Regel gesondert berechnet:' },
        {
          table: {
            head: ['In der Regel inklusive', 'In der Regel nicht enthalten'],
            rows: [
              ['Alle Mahlzeiten laut Reiseverlauf (Mittagessen, Abendessen, Frühstück, Brunch)', 'Transfers zwischen Hanoi oder dem Flughafen und Tuan Chau'],
              ['Kabine mit eigenem Bad und Klimaanlage', 'Getränke, sofern nicht anders angegeben'],
              ['Eintrittsgelder für die geplanten Besichtigungen', 'Spa-Anwendungen'],
              ['Kajak oder Bambusboot an den vorgesehenen Stationen (Kajakfahren in der Lan-Ha-Bucht vorübergehend ausgesetzt)', 'Trinkgelder für Crew und Guides'],
              ['Kochkurs und Tai-Chi am Morgen; Guide an Bord', 'Reiseversicherung und persönliche Ausgaben'],
              ['Ausflug mit dem Tagesausflugsboot (nur 3 Tage, 2 Nächte)', ''],
            ],
          },
        },
        { p: 'Prüfen Sie vor dem Absenden Ihrer Buchungsanfrage stets die inklusiven und nicht enthaltenen Leistungen sowie die Stornobedingungen des gewählten [Reiseverlaufs](itineraries) und kontrollieren Sie anschließend die Leistungen in Ihrer Buchungsbestätigung. Nach den veröffentlichten Stornobedingungen von Green Ruby (siehe [FAQ](faq)) wird bei einer Stornierung ab 30 Tagen vor Abfahrt der volle Betrag erstattet; danach steigen die Gebühren, je näher die Abfahrt rückt, und bei einer Stornierung innerhalb von 7 Tagen erfolgt keine Erstattung. Die geltenden Bedingungen werden bei der Buchung bestätigt.' },
        { note: 'Die ersten Abfahrten der Green-Ruby-Schiffe sind für Februar 2027 geplant. Buchungen sind noch nicht möglich, Sie können uns aber bereits eine Buchungsanfrage mit Ihren Wunschterminen senden. Preise und Abfahrtstermine werden bei der Buchung bestätigt.' },
      ],
    },
    {
      id: 'before-you-go',
      title: 'Vor der Abreise',
      blocks: [
        {
          ul: [
            '**Reisepass:** Bringen Sie das Original mit. Die Reedereien melden jeden Passagier vor der Einschiffung bei den Hafenbehörden an.',
            '**Visum und Einreise:** Prüfen Sie rechtzeitig die aktuellen Einreisebestimmungen Vietnams für Ihre Staatsangehörigkeit.',
            '**Ernährung und Gesundheit:** Teilen Sie Allergien, besondere Ernährungsformen und gesundheitliche Einschränkungen bei der Buchung mit, nicht erst am Anleger.',
            '**Reiseversicherung:** Empfehlenswert, besonders von Juni bis Oktober, wenn Unwetter Abfahrten verändern können.',
            '**Bezahlen:** Etwas Bargeld in Vietnamesischen Dong ist für kleine Einkäufe an Land praktisch; klären Sie vorab, welche [Zahlungsmethoden](/payment-methods) an Bord akzeptiert werden.',
          ],
        },
      ],
    },
    {
      id: 'getting-there',
      title: 'Von Hanoi zum Kreuzfahrtterminal',
      blocks: [
        { p: 'Tuan Chau liegt über die Autobahn rund 160–180 km vom Zentrum Hanois entfernt. Rechnen Sie mit etwa 2,5 bis 3 Stunden im privaten Wagen und etwas mehr in der Sammel-Limousine (Minibus), die weitere Fahrgäste abholt und eine Pause einlegt. Alle Zeiten sind Schätzungen: Den größten Unterschied machen der Verkehr aus Hanoi heraus und lange Feiertagswochenenden.' },
        { p: 'Transfers sind im Kreuzfahrtpreis nicht enthalten. Auf Anfrage organisiert Green Ruby gegen Aufpreis einen privaten Wagen. Der [Ratgeber „Von Hanoi in die Halong-Bucht“](transfer) vergleicht alle Möglichkeiten, auch bei Ankunft an den Flughäfen Noi Bai, Cat Bi und Van Don.' },
      ],
    },
    {
      id: 'boarding-day',
      title: 'Der Einschiffungstag im Überblick',
      blocks: [
        { p: 'Bei vielen Kreuzfahrten mit Übernachtung checken die Gäste in einer Lounge an Land ein und fahren dann mit einem Beiboot zum Schiff.' },
        { p: 'Green Ruby plant, die Gäste in Tuan Chau zu empfangen; für Green Ruby 1 und Green Ruby 2 ist der Weg zum Schiff unterschiedlich geregelt. Wählen Sie unten ein Schiff, um den geplanten Ablauf des Einschiffungstags zu sehen. Alle Zeiten sind vorläufig und können sich je nach Wetter, betrieblichen Erfordernissen und Anweisungen der Hafenbehörden ändern.' },
        { widget: 'boarding-timeline' },
        { p: '**Die Fahrt mit dem Beiboot.** Die Beiboote sind überdachte Motorboote. Die Crew hilft Ihnen beim Übersteigen, Schwimmwesten liegen bereit, und Ihr Gepäck wird für Sie getragen. Behalten Sie eine kleine Tasche mit Reisepass, Medikamenten und Telefon bei sich.' },
      ],
    },
    {
      id: 'on-board',
      title: 'Was Sie an Bord erwartet',
      blocks: [
        {
          ul: [
            '**Nachmittag:** Sicherheitseinweisung, Mittagessen während der Fahrt, dann der erste Ausflug: eine Höhle oder Lagune per Kajak oder Bambusboot (in der Lan-Ha-Bucht ist Kajakfahren aufgrund örtlicher Vorschriften vorübergehend ausgesetzt, Stand Oktober 2026), manchmal ein Strand.',
            '**Abend:** Sonnenuntergang auf dem Sonnendeck, Kochkurs oder freie Zeit, Abendessen, danach auf Wunsch Tintenfischangeln vom Deck aus.',
            '**Morgen:** Tai-Chi bei Sonnenaufgang, ein leichtes Frühstück und eine letzte Besichtigung, oft eine Höhle, vor dem Brunch und der Rückkehr in den Hafen.',
          ],
        },
        { p: 'Die Schiffe ankern über Nacht in ausgewiesenen Gebieten, die Gäste bleiben an Bord. Die meisten Freizeitaktivitäten sind freiwillig und unterliegen den Sicherheitsvorgaben; sagen Sie der Crew Bescheid, wenn Sie bei einem Halt lieber an Bord bleiben möchten. Mehr zu den geplanten [Erlebnissen an Bord](/experiences).' },
      ],
    },
    {
      id: 'safety',
      title: 'Wetter, Sicherheit, Kinder und Barrierefreiheit',
      blocks: [
        { p: '**Wetter.** Von Oktober bis April ist es kühler und trockener; von Mai bis September heiß und feucht, zugleich ist etwa von Juni bis Oktober Sturmsaison. Bei einer Sturmwarnung können die Behörden kurzfristig alle Fahrten in der Bucht aussetzen. Die Reedereien verschieben dann die Kreuzfahrt oder erstatten den Preis gemäß ihren Bedingungen. Im Winter können Dunst und tiefe Wolken die Sicht einschränken. Die Bedingungen Monat für Monat finden Sie unter [beste Reisezeit](bestTime).' },
        { p: '**Seekrankheit.** Die Buchten sind durch die Inseln geschützt und meist ruhiger als die offene See, je nach Wetter; etwas Bewegung ist dennoch möglich, vor allem bei starkem Wind. Wenn Sie zu Reiseübelkeit neigen, nehmen Sie Ihr gewohntes Mittel mit und fragen Sie die Crew vor dem Ablegen nach den Bedingungen.' },
        { p: '**Kinder.** Familien sind auf den meisten Kreuzfahrten willkommen. Kinder tragen bei allen Aktivitäten auf dem Wasser eine Schwimmweste, kleine Kinder fahren meist mit einem Erwachsenen im Bambusboot statt im Kajak. Prüfen Sie bei der Buchung die Regelungen für Kinder, die Bettenoptionen und die [Sicherheitsrichtlinien](/safety-policies).' },
        { p: '**Barrierefreiheit.** Bei der Einschiffung steigen Sie vom Anleger ins Beiboot und vom Beiboot aufs Schiff, und viele Sehenswürdigkeiten sind nur über Stufen erreichbar: Zur [Sung-Sot-Höhle](destination:sung-sot-cave) und zum Aussichtspunkt auf der [Ti-Top-Insel](destination:ti-top-island) führen lange Treppen. Reisende mit eingeschränkter Mobilität können die Kreuzfahrt meist vom Schiff aus genießen; schildern Sie dem Team Ihre Bedürfnisse vor der Buchung, damit es Sie ehrlich beraten kann.' },
      ],
    },
    {
      id: 'packing',
      title: 'Packliste: was einpacken?',
      blocks: [
        { p: 'Packen Sie lieber eine kleine Reisetasche als einen großen Koffer: Das ist im Beiboot und in der Kabine praktischer.' },
        {
          checklist: [
            { title: 'Dokumente', items: ['Original-Reisepass', 'Buchungsbestätigung', 'Unterlagen zur Reiseversicherung', 'Etwas Bargeld für Extras'] },
            { title: 'Kleidung', items: ['Badekleidung und ein schnell trocknendes Handtuch', 'Bequeme, rutschfeste Schuhe für Höhlen und Treppen', 'Leichte Jacke oder wärmere Schicht (unverzichtbar von November bis März)', 'Hut und Sonnenbrille'] },
            { title: 'Unverzichtbar', items: ['Sonnenschutz und Insektenschutz', 'Persönliche Medikamente, bei Bedarf ein Mittel gegen Seekrankheit', 'Wasserdichter Beutel für das Telefon beim Kajakfahren', 'Powerbank und Ladekabel'] },
          ],
        },
      ],
    },
    {
      id: 'mistakes',
      title: 'Typische Fehler bei der ersten Kreuzfahrt',
      blocks: [
        {
          ol: [
            '**Den Flug zu knapp nach der Kreuzfahrt buchen.** Ausschiffung, Fahrt und Check-in am Flughafen brauchen Zeit. Planen Sie vor jedem Anschlussflug großzügig Puffer ein und klären Sie die voraussichtliche Rückkehrzeit mit Ihrer Reederei.',
            '**Zum falschen Anleger fahren.** Ha Long hat mehr als einen Passagierhafen. Geben Sie Ihrem Fahrer den genauen [Check-in-Ort](checkin-map); Gäste von Green Ruby checken in Tuan Chau ein.',
            '**Den Reisepass im Hotel lassen.** Ohne das Original dürfen Sie unter Umständen nicht an Bord.',
            '**Eine Tagestour wählen, um Zeit zu sparen.** Sie verbringen den Großteil im Fahrzeug und verpassen die Bucht in ihren ruhigsten Stunden.',
            '**Im Winter Badeurlaub erwarten.** Von Dezember bis Februar ist das Wasser kühl und der Himmel oft grau; planen Sie die Landschaft ein, nicht das Sonnenbaden.',
            '**Besondere Ernährungs- oder Mobilitätsbedürfnisse nicht vorab mitteilen.** Vor der Abreise lässt sich darauf viel leichter eingehen.',
          ],
        },
      ],
    },
    {
      id: 'itineraries',
      title: 'Reiseverläufe von Green Ruby',
      blocks: [{ p: 'Geplant sind vier Reiseverläufe, zwei pro Bucht, jeweils als 2 Tage, 1 Nacht oder 3 Tage, 2 Nächte.' }, { widget: 'itineraries' }],
    },
  ],
  faqTitle: 'Häufige Fragen vor der ersten Kreuzfahrt',
  faq: [
    { q: 'Lohnt sich eine Kreuzfahrt in der Halong-Bucht?', a: 'Wenn Sie die Bucht zu verschiedenen Tageszeiten erleben und Zeit zum Entspannen haben möchten, ist eine Kreuzfahrt mit Übernachtung eine Überlegung wert. Bei einem Tagesausflug ab Hanoi verbringen Sie einen Großteil der Zeit auf der Straße.' },
    { q: 'Wie viele Tage braucht man für die Halong-Bucht?', a: 'Für einen ersten Besuch genügen zwei Tage und eine Nacht. Wählen Sie drei Tage und zwei Nächte, um mit dem Tagesausflugsboot ruhigere Gebiete zu erreichen und gemächlicher zu reisen.' },
    { q: 'Was sollte ich für eine Kreuzfahrt in der Halong-Bucht einpacken?', a: 'Ihren Original-Reisepass, Badekleidung, bequeme, rutschfeste Schuhe, von November bis März eine leichte Jacke, Sonnenschutz, Ihre Medikamente und einen wasserdichten Beutel fürs Kajakfahren. Eine kleine Reisetasche ist praktischer als ein Koffer.' },
    { q: 'Werde ich auf einer Kreuzfahrt in der Halong-Bucht seekrank?', a: 'Die geschützten Buchten sind meist ruhiger als die offene See, je nach Wetter; etwas Bewegung ist dennoch möglich, vor allem bei starkem Wind. Wenn Sie empfindlich reagieren, nehmen Sie Ihr gewohntes Mittel mit.' },
    { q: 'Können Kreuzfahrten wegen des Wetters abgesagt werden?', a: 'Ja. Bei Sturmwarnungen, vor allem zwischen Juni und Oktober, können die Behörden die Fahrten kurzfristig aussetzen. Die Reederei verschiebt dann die Kreuzfahrt oder erstattet den Preis gemäß ihren Bedingungen.' },
    { q: 'Wann muss ich vor Ort sein?', a: 'Laut dem veröffentlichten Ablauf von Green Ruby beginnt der Check-in in der VIP-Lounge in Tuan Chau gegen 10:45 Uhr, das Beiboot legt gegen 11:45 Uhr ab. Da die ersten Abfahrten für Februar 2027 geplant sind, bestätigt Ihnen das Reservierungsteam die endgültige Uhrzeit und den Treffpunkt vor der Reise.' },
  ],
  sourcesTitle: 'Quellen',
  sources: [
    { title: 'UNESCO-Welterbezentrum: Ha Long Bay – Cat Ba Archipelago (auf Englisch)', url: 'https://whc.unesco.org/en/list/672' },
    { title: 'Tuoi Tre News (20. Juli 2025): Ausflugsboote in der Halong-Bucht dürfen wegen Taifun Wipha nicht auslaufen (auf Englisch)', url: 'https://news.tuoitre.vn/ha-long-bay-tourist-boats-banned-from-departing-as-typhoon-wipha-nears-103250720163544717.htm' },
  ],
  related: {
    title: 'Weiter planen',
    links: [
      { href: 'transfer', title: 'Von Hanoi in die Halong-Bucht', body: 'Transfers, Häfen und realistische Fahrzeiten.' },
      { href: 'destinations', title: 'Sehenswürdigkeiten der Halong-Bucht', body: 'Höhlen, Inseln und Dörfer mit praktischen Hinweisen.' },
      { href: 'luxuryPillar', title: 'Umweltbewusste Luxuskreuzfahrten in der Halong-Bucht', body: 'Was eine Kreuzfahrt tatsächlich umweltschonender macht und wie Sie Versprechen prüfen.' },
    ],
  },
  estimateNote: 'Fahrzeiten und Dauern auf dieser Seite sind Schätzungen, keine Fahrpläne. Die Reiseverläufe von Green Ruby sind vorläufig, bis zu den ersten Abfahrten, die für Februar 2027 geplant sind.',
  timeline: {
    label: 'Wählen Sie Ihr Schiff',
    note: 'Zeiten aus den veröffentlichten Reiseverläufen von Green Ruby; vorläufig und abhängig vom Wetter und den Anweisungen des Hafens am jeweiligen Tag.',
    tabs: [
      {
        key: 'gr1',
        label: 'Green Ruby 1 · Halong-Bucht',
        steps: [
          { time: '≈ 07:30', title: 'Abfahrt in Hanoi', body: 'Wenn Sie einen privaten Transfer buchen (auf Anfrage, gegen Aufpreis), werden Sie in Hanoi gegen 7:30–8:00 Uhr abgeholt; die Fahrt dauert etwa 2,5–3 Stunden (Schätzung).' },
          { time: '≈ 10:45', title: 'Check-in in Tuan Chau', body: 'VIP-Lounge von Green Ruby in Tuan Chau: Pässe, Gepäckübergabe und ein Begrüßungsgetränk.' },
          { time: '≈ 11:45', title: 'Mit dem Beiboot zum Schiff', body: 'Eine kurze Fahrt zu Green Ruby 1, die in der Halong-Bucht vor Anker liegt.' },
          { time: '≈ 12:30', title: 'Sicherheitseinweisung und Kabinen', body: 'Einweisung im Restaurant, dann Schlüsselübergabe und Zeit zum Ankommen.' },
          { time: '≈ 13:00', title: 'Mittagessen während der Fahrt', body: 'Während des Mittagessens fährt das Schiff hinaus in die Bucht.' },
          { time: '≈ 15:30', title: 'Erster Ausflug', body: 'Luon-Höhle per Kajak oder Bambusboot, gegen 16:30 Uhr dann die Ti-Top-Insel.' },
        ],
      },
      {
        key: 'gr2',
        label: 'Green Ruby 2 · Lan-Ha-Bucht',
        steps: [
          { time: '≈ 07:30', title: 'Abfahrt in Hanoi', body: 'Wenn Sie einen privaten Transfer buchen (auf Anfrage, gegen Aufpreis), werden Sie in Hanoi gegen 7:30–8:00 Uhr abgeholt; die Fahrt dauert etwa 2,5–3 Stunden (Schätzung).' },
          { time: '≈ 10:45', title: 'Check-in in Tuan Chau', body: 'Dieselbe VIP-Lounge von Green Ruby in Tuan Chau wie für die Gäste von Green Ruby 1.' },
          { time: '≈ 11:45', title: 'Mit dem Beiboot zum Anleger Gia Luan', body: 'Das Beiboot bringt Sie zum Anleger Gia Luan auf der Insel Cat Ba (Haiphong), wo Sie in der Lan-Ha-Bucht an Bord der Green Ruby 2 gehen.' },
          { time: '≈ 12:30', title: 'Sicherheitseinweisung und Kabinen', body: 'Einweisung im Restaurant, dann Schlüsselübergabe und Zeit zum Ankommen.' },
          { time: '≈ 13:00', title: 'Mittagessen während der Fahrt', body: 'Mittagessen, während das Schiff in die Lan-Ha-Bucht fährt.' },
          { time: '≈ 15:00–15:30', title: 'Erster Ausflug', body: 'Sang-Toi-Höhle (Dark & Bright Cave) im Bambusboot (Kajakfahren aufgrund örtlicher Vorschriften vorübergehend ausgesetzt, Stand Oktober 2026).' },
        ],
      },
    ],
  },
  itineraries: { title: 'Reiseverläufe von Green Ruby', days: (n) => `${n} Tage, ${n - 1} ${n > 2 ? 'Nächte' : 'Nacht'}`, view: 'Reiseverlauf ansehen' },
};

export default firstTime;
