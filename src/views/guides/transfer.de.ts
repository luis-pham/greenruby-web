import type { GuideContent } from './types';

// German version of transfer.en.ts (the English file is the source of truth). DRAFT, PENDING_REVIEW:
// transcreated 2026-11-11 for one German edition (DE/AT/CH, standard spelling with ß) following
// docs/i18n-audit/de/drafts/BRIEF-DE.md (owner-confirmed facts, 11 Nov 2026); needs native German review.
// Durations, fares and timetables are copied from the English (operators.ts registry, checked 2026-10-27).
// Operator names stay Latin; amounts keep their currency (VND, USD), German grouping (2.800.000 VND); decimal comma
// (2,5 h); prose times 24 h with „Uhr“ (7:00 Uhr, 10:45 Uhr). Links to English-only pages get their „(auf Englisch)“
// mark from the site (lib/section-links.ts); external English sources carry it in their title here.
// REVIEW: (1) "shuttle" section: EN says Green Ruby plans a shared shuttle and private cars; DE says only that a
// private transfer can be arranged on request at extra cost (owner fact: no shared shuttle offer).
// (2) FAQ "transfer included": adds that a private transfer can be arranged on request, at extra cost.
// (3) estimateNote: "until the ships enter service in February 2027" -> "bis zu den ersten Abfahrten, die für Februar
// 2027 geplant sind" (brief: never "bereits in Betrieb"). (4) "US$15" / "US$60–120" written as "15 USD" / "60–120 USD".
// (5) private-car: EN "for a group of four or more, that can cost about the same as individual shuttle seats" not kept
// (4 seats x 250,000–360,000 VND is well under 2,800,000 VND); replaced by "compare the quote with the total of the
// individual seats for your group", as in the French and Spanish editions.
// (6) "Green Ruby lounge" -> „VIP-Lounge von Green Ruby“ (brief: Green Ruby VIP lounge in Tuan Chau).
// Not changed: third-party shared-van pick-up 6:00–6:30 (EN, aligned with 10:45 check-in); the brief's 7:30–8:00
// pick-up refers to Green Ruby's own private transfer and is not stated on this page. Road ranges kept as in EN
// (2,5–3 h private car) — the brief's "about 2,5 h" falls within them.
// SEO: primary query „Hanoi nach Halong-Bucht“; „auf eigene Faust“ used once in the lead.
// Terms to check: „Sammel-Limousine (Minibus)“ (shared limousine van), „Fernbus über die Autobahn“ (expressway coach),
// „Fahrdienst-App“ (ride-hailing), „Beiboot“ (tender).
const transfer: GuideContent = {
  metaTitle: 'Hanoi nach Halong-Bucht: Transfer & Preise',
  metaDescription:
    'Von Hanoi in die Halong-Bucht per Sammel-Limousine, Privatwagen oder Bus: Anbieter, Preise und Fahrpläne (Stand Oktober 2026), dazu Noi Bai und Ninh Binh.',
  breadcrumb: 'Von Hanoi in die Halong-Bucht',
  eyebrow: 'Reiseführer',
  title: 'Von Hanoi in die Halong-Bucht: Anreise, Transfer und Häfen',
  lead: 'So kommen Sie von Hanoi, vom Flughafen Noi Bai, aus Ninh Binh und von den übrigen Flughäfen der Region in die Halong-Bucht – auch auf eigene Faust. Dieser Ratgeber nennt Anbieter mit veröffentlichten Preisen und Fahrplänen, erklärt den Unterschied zwischen den Kreuzfahrthäfen und zeigt, mit welchen Verbindungen Sie einen Check-in am Vormittag in Tuan Chau pünktlich erreichen.',
  summaryTitle: 'Kurz und knapp',
  summary: [
    ['Am schnellsten ab Hanoi', 'Mit dem Privatwagen brauchen Sie bis Tuan Chau meist etwa **2,5–3 Stunden**. Ein Anbieter nennt **ab 2.800.000 VND** für eine komplette 9-sitzige Limousine.'],
    ['Sammel-Limousine', 'Ein Platz kostet etwa **250.000–360.000 VND**, mit Abholung am Hotel im Zentrum Hanois. Für einen Check-in um 10:45 Uhr wählen Sie einen Minibus, der Hanoi **bis etwa 7:00 Uhr** verlässt.'],
    ['Ab Ninh Binh oder Tam Coc', 'Rechnen Sie mit **3,5–4,5 Stunden**. Kein Sammelangebot erreicht Tuan Chau verlässlich vor 10:45 Uhr – übernachten Sie also am Vorabend in Ha Long oder fahren Sie im Morgengrauen mit dem Privatwagen.'],
    ['Anreise per Flugzeug', 'Ab Noi Bai fahren stündlich Sammel-Limousinen nach Ha Long (**600.000 VND** pro Platz für Alleinreisende). Ab Cat Bi oder Van Don buchen Sie einen privaten Transfer.'],
    ['Check-in bei Green Ruby', 'Green Ruby plant, die Gäste beider Schiffe am Internationalen Passagierhafen Tuan Chau zu empfangen. Der Check-in ist vorläufig für etwa 10:45 Uhr vorgesehen.'],
    ['Nach der Kreuzfahrt', 'Die Ausschiffung ist für etwa 11:00–11:30 Uhr geplant. Buchen Sie einen Minibus für die Rückfahrt, der Tuan Chau um 12:00 Uhr oder später verlässt, und meiden Sie Flüge, die zu knapp danach starten.'],
  ],
  published: '2026-10-24',
  updated: { iso: '2026-10-27', label: 'Aktualisiert am 27. Oktober 2026' },
  tocTitle: 'In diesem Ratgeber',
  sections: [
    {
      id: 'compare',
      title: 'Von Hanoi in die Halong-Bucht: die Möglichkeiten im Vergleich',
      blocks: [
        { p: 'Vom Zentrum Hanois nach Tuan Chau, wo viele Kreuzfahrten mit Übernachtung einchecken, sind es auf der Straße rund 160–180 km. Den größten Teil der Strecke legen Sie auf modernen Autobahnen zurück; unterschiedlich ist vor allem, wie lange es dauert, aus Hanoi herauszukommen, und ob Ihr Fahrzeug für weitere Fahrgäste hält.' },
        {
          table: {
            head: ['Möglichkeit', 'Von Tür zu Tür (Schätzung)', 'Veröffentlichte Preise (Okt. 2026)', 'Ideal für', 'Gut zu wissen'],
            rows: [
              ['Privatwagen', '2,5–3 h', 'Ab 2.800.000 VND pro Fahrzeug mit 9 Sitzen', 'Familien, kleine Gruppen, frühe Check-ins, Abholung am Flughafen', 'Sie bestimmen die Abholzeit; vergleichen Sie den Gesamtpreis mit den Einzelplätzen für Ihre Gruppe'],
              ['Sammel-Limousine (Minibus)', '3–3,5 h', '250.000–360.000 VND oder 15 USD pro Platz', 'Paare und Alleinreisende', 'Feste Abfahrtszeiten; holt unterwegs weitere Gäste ab; die Regeln für das Absetzen am Hafen sind unterschiedlich'],
              ['Fernbus über die Autobahn', '2,5 h ab dem Busbahnhof My Dinh, zuzüglich Anfahrt dorthin', 'Etwa 160.000 VND pro Platz', 'Preisbewusste Reisende mit genügend Zeit', 'Fährt am Busbahnhof ab, nicht an Ihrem Hotel; schwer mit einem Check-in am Vormittag abzustimmen'],
            ],
          },
        },
        { note: 'Die Fahrzeiten sind Schätzungen bei normalem Verkehr, keine Garantien. Planen Sie freitagabends, sonntagnachmittags und an Feiertagen wie Tet und vom 30. April bis 1. Mai mehr Zeit ein – dann erhöhen manche Anbieter auch ihre Preise.' },
      ],
    },
    {
      id: 'planner',
      title: 'Ihren Transfer planen',
      blocks: [
        { p: 'Wählen Sie Ihren Ausgangsort: Sie sehen die wichtigsten Möglichkeiten, ein empfohlenes Abfahrtsfenster für den Check-in um 10:45 Uhr, veröffentlichte Preise, die von uns geprüften Anbieter und was Sie für den letzten Tag einplanen sollten. Rechnen Sie zusätzliche Zeit für Verkehr, Verspätungen und Abläufe am Flughafen ein.' },
        { widget: 'transfer-selector' },
      ],
    },
    {
      id: 'old-quarter',
      title: 'Von der Altstadt Hanois nach Tuan Chau: Anbieter und Zeiten',
      blocks: [
        { p: 'Die meisten Reisenden starten in der Altstadt. Mit dem Privatwagen bleibt bei einer Abfahrt zwischen etwa 6:45 und 7:15 Uhr genug Spielraum für Verkehr und eine Pause vor dem Check-in um 10:45 Uhr. Mit dem Sammel-Minibus buchen Sie eine Fahrt, die **Hanoi bis etwa 7:00 Uhr verlässt**: Die Abholung beginnt 30–60 Minuten vorher, Sie werden also zwischen etwa 6:00 und 6:30 Uhr abgeholt.' },
        { p: 'Sammel-Minibusse, die Hanoi um 8:00 Uhr oder später verlassen, erreichen Tuan Chau zu knapp vor dem Check-in oder erst danach. Das gilt auch für die einzige Abfahrt von Cat Ba Express um 8:00 Uhr: Nach der eigenen veröffentlichten Fahrzeit kommt sie gegen 10:40 Uhr an.' },
        { operators: ['hanoi-halong'], caption: 'Hanoi → Ha Long: Anbieter mit veröffentlichten Verbindungen' },
        { p: '„Tuan Chau“ im Fahrplan kann ein Café in Hafennähe, das Hafentor oder das Terminal selbst bedeuten. Lassen Sie sich vor dem Bezahlen bestätigen, dass Sie am **Internationalen Passagierhafen Tuan Chau** abgesetzt werden und nicht am Internationalen Kreuzfahrthafen Ha Long in Bai Chay. Ha Long Travel Limousine etwa fährt einzelne Fahrgäste nicht in den Hafen: Sie werden vor dem Hafen abgesetzt und gehen zu Fuß hinein. Gruppen ab zwei Personen können gegen eine Hafengebühr von 30.000 VND hineingefahren werden.' },
      ],
    },
    {
      id: 'shuttle',
      title: 'Sammel-Limousine (Minibus)',
      blocks: [
        { p: 'Die Limousinen sind Minibusse mit 9 bis 11 Liegesitzen. Die meisten holen die Fahrgäste an Hotels im Zentrum Hanois ab, halten unterwegs einmal und setzen die Gäste an festen Punkten oder Adressen in Ha Long ab. Die oben genannten Anbieter fahren mehrmals täglich, sodass Sie eine Abfahrt passend zu Ihrem Check-in wählen können.' },
        {
          ul: [
            'Eine bequeme Sammeloption für ein oder zwei Reisende.',
            'Die Abholrunde kann 30 Minuten oder länger dauern, bevor der Minibus die Stadt verlässt.',
            'Die Preise hängen vom Platz ab: Die mittleren „VIP“-Sitze kosten meist mehr als die vorderen oder hinteren.',
            'Der Gepäckraum ist begrenzt: Handgepäck plus ein mittelgroßer Koffer pro Person ist ein sinnvolles Maximum.',
            'Rückfahrten richten sich nach dem Fahrplan des Anbieters; buchen Sie eine Abfahrt nach der Ausschiffung am Vormittag.',
          ],
        },
        { p: 'Transfers sind in den Kreuzfahrtpreisen von Green Ruby nicht enthalten. Auf Anfrage und gegen Aufpreis lässt sich ein privater Transfer zwischen Hanoi und Ha Long organisieren; einen Sammel-Shuttle bietet Green Ruby nicht an. Zeit und Preis werden Ihnen mit Ihrer Buchung bestätigt.' },
      ],
    },
    {
      id: 'private-car',
      title: 'Privatwagen',
      blocks: [
        { p: 'Ein Privatwagen bietet die größte Flexibilität, besonders für Familien, kleine Gruppen und Reisende, die an einem Flughafen ankommen. Sie werden am Hotel oder Terminal abgeholt und fahren direkt zum Check-in Ihrer Kreuzfahrt.' },
        { p: 'Veröffentlichte Preise sind selten. Ha Long Travel Limousine nennt für eine komplette Limousine mit 9 oder 10 Sitzen ab 2.800.000–3.000.000 VND pro Strecke ab Hanoi und 3.000.000–3.200.000 VND ab dem Flughafen Noi Bai. Vergleichen Sie dieses Angebot vor der Entscheidung mit der Summe der Einzelplätze im Sammel-Minibus für Ihre Gruppe.' },
        {
          ul: [
            'Klären Sie vor der Buchung Fahrzeuggröße und Gepäckkapazität.',
            'Fragen Sie, ob Maut, Parken und Hafeneinfahrt inbegriffen sind.',
            'Bestellen Sie bei Bedarf rechtzeitig einen Kindersitz.',
            'Geben Sie dem Transferanbieter Ihre Flugdaten und klären Sie, wie lange gewartet wird.',
            'Vergewissern Sie sich, dass der Fahrer die genaue Adresse des Kreuzfahrtterminals oder der Lounge hat.',
          ],
        },
        { p: 'Wer selbst fahren möchte, braucht einen in Vietnam gültigen Führerschein und für die Dauer der Kreuzfahrt einen Parkplatz in Hafennähe – die meisten Reisenden nehmen daher einen Fahrer.' },
      ],
    },
    {
      id: 'bus',
      title: 'Öffentlicher Bus',
      blocks: [
        { p: 'Von den Busbahnhöfen Hanois fahren Fernbusse nach Ha Long. Kumho Viet Thanh nennt eine Autobahnverbindung ab dem Busbahnhof My Dinh (6:30, 9:30, 11:30, 13:30, 15:30 und 17:30 Uhr, etwa 160.000 VND) mit Tuan Chau unter den Haltestellen in Ha Long; die Website scheint allerdings seit 2022 nicht mehr aktualisiert worden zu sein. Andere Busse enden in Bai Chay, von wo Sie noch ein Taxi zum Hafen brauchen.' },
        { p: 'Selbst der Bus um 6:30 Uhr lässt für einen Check-in um 10:45 Uhr zu wenig Spielraum, wenn man die Fahrt zum Busbahnhof My Dinh und den Fußweg oder das Taxi ab der Haltestelle hinzurechnet. Der Bus eignet sich am besten, wenn Sie die Nacht davor in Ha Long verbringen.' },
      ],
    },
    {
      id: 'airports',
      title: 'Ab den Flughäfen',
      blocks: [
        { p: 'Für die Anreise in die Halong-Bucht kommen drei Flughäfen infrage.' },
        {
          table: {
            head: ['Flughafen', 'Was Sie beachten sollten'],
            rows: [
              ['Internationaler Flughafen Noi Bai (HAN)', 'Hanois wichtigster internationaler Flughafen. Rechnen Sie mit etwa 2,5–3,5 Stunden oder mehr bis Tuan Chau. Sammel-Limousinen und Privatwagen nach Ha Long sind unten aufgeführt.'],
              ['Internationaler Flughafen Cat Bi (HPH)', 'In Haiphong, etwa 40 km Straße bis Tuan Chau. Eine regelmäßige Sammelverbindung nach Tuan Chau haben wir nicht gefunden; buchen Sie einen privaten Transfer. Wiederverkäufer bieten ihn ab etwa 60–120 USD pro Fahrzeug an.'],
              ['Internationaler Flughafen Van Don (VDO)', 'In der Provinz Quang Ninh, etwa 60–70 km von Tuan Chau. Es gibt nur wenige Flüge, und die Flughafenbusse fahren nach Hon Gai und Bai Chay, nicht nach Tuan Chau. Buchen Sie einen privaten Transfer und lassen Sie sich die Fahrzeit bestätigen.'],
            ],
          },
        },
        { h3: 'Vom Flughafen Noi Bai nach Ha Long: Anbieter' },
        { operators: ['noibai-halong'], caption: 'Flughafen Noi Bai → Ha Long' },
        { p: '**Ankommen und am selben Tag an Bord gehen?** Mit einer frühen Ankunft kann es klappen, doch dann bleibt wenig Spielraum für Flugverspätungen, Einreise, Gepäckausgabe und Verkehr. Wenn Sie international in Noi Bai landen, ist eine Übernachtung in Hanoi oder in der Nähe des Kreuzfahrtterminals in der Regel die entspanntere Wahl.' },
      ],
    },
    {
      id: 'ninh-binh',
      title: 'Von Ninh Binh und Tam Coc in die Halong-Bucht',
      blocks: [
        { p: 'Viele Reiserouten verbinden Ninh Binh und Ha Long. Die Minibusse fahren meist über die Nationalstraße 10 Richtung Haiphong statt durch Hanoi; mit dem Privatwagen dauert die Fahrt etwa 3,5–4 Stunden, im Sammel-Minibus 4–4,5 Stunden. Die meisten Anbieter holen in Tam Coc ab, wo viele Reisende übernachten; einer holt auch an Hotels in Trang An, Bai Dinh und der Stadt Ninh Binh ab.' },
        { h3: 'Ist ein Check-in um 10:45 Uhr am selben Morgen ab Ninh Binh machbar?' },
        { p: 'Mit dem Sammel-Minibus nicht verlässlich. Die früheste vom Anbieter veröffentlichte Abfahrt ist der Bus von Full Moon Travel um 6:40 Uhr ab Tam Coc, laut Fahrplan um 10:30 Uhr in Tuan Chau – eine andere Seite derselben Website nennt allerdings 11:00 Uhr als Ankunft. Cat Ba Express fährt um 7:00 Uhr in Tam Coc ab, ohne eine Ankunftszeit zu nennen. Ninh Binh Express Bus startet um 7:00–7:30 Uhr und braucht etwa 4,5 Stunden. Frühere Busse tauchen auf manchen Buchungsportalen auf, werden aber von den Anbietern selbst nicht veröffentlicht; deshalb führen wir sie nicht auf.' },
        {
          ol: [
            '**Übernachten Sie am Vorabend in Ha Long** (empfohlen). In Tuan Chau und Bai Chay gibt es Hotels; von Bai Chay sind es etwa 13–14 km bis zum Hafen. Nehmen Sie am Vortag einen Minibus am Nachmittag ab Ninh Binh.',
            '**Fahren Sie im Morgengrauen mit dem Privatwagen.** Brechen Sie für einen Check-in um 10:45 Uhr gegen 5:45–6:15 Uhr in Tam Coc auf.',
            '**Nehmen Sie einen Sammel-Minibus nur, wenn Ihre Kreuzfahrt später am Tag eincheckt**, und wählen Sie Tuan Chau statt Bai Chay als Ziel.',
          ],
        },
        { h3: 'Ninh Binh → Ha Long: Anbieter' },
        { operators: ['ninhbinh-halong'] },
        { p: 'Manche Minibusse halten zuerst in Bai Chay oder in der Stadt Ha Long. Endet Ihr Minibus in Bai Chay, nehmen Sie ein Taxi oder einen Wagen über eine Fahrdienst-App nach Tuan Chau und rechnen Sie mit etwa 20–30 Minuten.' },
        { h3: 'Nach der Kreuzfahrt: Ha Long → Ninh Binh und Tam Coc' },
        { p: 'Die Rückfahrt am Nachmittag ist einfacher. Der Minibus von Full Moon Travel um 12:30 Uhr startet in der Stadt Ha Long, holt danach in Tuan Chau ab und erreicht Ninh Binh gegen 16:30 Uhr. Cat Ba Express fährt um 11:40 Uhr – knapp nach einer Ausschiffung um 11:00–11:30 Uhr. Ninh Binh Express Bus bietet eine Abfahrt um die Mittagszeit an, seine Seiten nennen jedoch zwei verschiedene Uhrzeiten. Ein Privatwagen kostet laut dem Angebot eines Reisebüros ab etwa 1.600.000 VND.' },
        { operators: ['halong-ninhbinh'] },
      ],
    },
    {
      id: 'booking-tips',
      title: 'Transfer buchen: praktische Tipps',
      blocks: [
        {
          ul: [
            '**Rechtzeitig buchen.** Sammel-Minibusse mindestens einen Tag vorher buchen, an Wochenenden und Feiertagen früher. Privatwagen und Flughafenabholungen sollten vor der Reise gebucht sein.',
            '**Anrufe aus dem Ausland.** Vietnamesische Mobilnummern beginnen im Inland mit 0. Von einem ausländischen Telefon lassen Sie die 0 weg und wählen +84: Aus 097 593 2468 wird +84 97 593 2468. Nummern mit 1900 am Anfang funktionieren nur innerhalb Vietnams.',
            '**WhatsApp oder Zalo nutzen.** Die meisten Anbieter antworten per Nachricht schneller als am Telefon, und eine schriftliche Bestätigung lässt sich Hotel oder Fahrer leichter zeigen. Zalo ist in Vietnam weit verbreitet.',
            '**Abholung bestätigen lassen.** Senden Sie Namen und Adresse Ihres Hotels und fragen Sie nach dem Abholzeitfenster. Manche Anbieter holen an einem festen Punkt in der Nähe statt an Ihrer Tür ab – fragen Sie, wo Sie warten sollen.',
            '**Nach Tuan Chau fragen.** Fragen Sie: „Do you drop at Tuan Chau International Passenger Port?“ – und ob Alleinreisende in den Hafen gefahren oder am Tor abgesetzt werden.',
            '**Extras prüfen.** Hafengebühren, zusätzliche Halte, Abholung spät nachts, Wartezeit am Flughafen und Feiertagszuschläge können extra kosten. Fragen Sie vor dem Bezahlen.',
            '**Großes Gepäck.** Melden Sie große Koffer, Golftaschen oder zusammenklappbare Kinderwagen bei der Buchung an. In Sammel-Minibussen sind meist ein mittelgroßer Koffer und eine kleine Tasche pro Person erlaubt.',
            '**Mit kleinen Kindern unterwegs.** Kindersitze sind in Sammel-Minibussen nicht üblich. Bestellen Sie einen für den Privatwagen und fragen Sie, ob Kinder den vollen Preis zahlen: Manche Anbieter berechnen ab etwa 3 Jahren einen vollen Platz.',
            '**Wenn der Minibus Verspätung hat,** schreiben Sie dem Anbieter mit dem Namen Ihrer Buchung. Bei mehr als 15–20 Minuten Verspätung und einer anstehenden Kreuzfahrt informieren Sie auch das Reservierungsteam der Reederei.',
          ],
        },
      ],
    },
    {
      id: 'ports',
      title: 'Hafen Tuan Chau oder Internationaler Kreuzfahrthafen Ha Long?',
      blocks: [
        { p: 'Ha Long hat mehr als einen Passagierhafen, und Fahrer steuern manchmal den falschen an. Die beiden, die Sie am ehesten in einer Buchung finden, liegen an verschiedenen Orten:' },
        {
          table: {
            head: ['', 'Internationaler Passagierhafen Tuan Chau', 'Internationaler Kreuzfahrthafen Ha Long'],
            rows: [
              ['Lage', 'Insel Tuan Chau, westlich von Bai Chay, per Straße mit dem Festland verbunden', 'Bai Chay, näher am Zentrum von Ha Long'],
              ['Genutzt von', 'Vielen Kreuzfahrten mit Übernachtung, darunter Green Ruby', 'Inländischen Kreuzfahrtbooten und internationalen Kreuzfahrtschiffen'],
              ['Entfernung zwischen beiden', 'Etwa 13–14 km auf der Straße', ''],
            ],
          },
        },
        { p: 'Geben Sie Ihrem Fahrer den genauen Check-in-Ort, nicht nur „Halong Bay“.' },
      ],
    },
    {
      id: 'check-in',
      title: 'Wo Gäste von Green Ruby einchecken',
      blocks: [
        { p: 'Green Ruby plant, die Gäste beider Schiffe in der **VIP-Lounge von Green Ruby am Internationalen Passagierhafen Tuan Chau** zu empfangen. [Abfahrtsterminal in Google Maps öffnen](checkin-map). Ihre Buchungsbestätigung nennt den genauen Ort und die Meldezeit.' },
        { p: 'Laut den veröffentlichten Reiseverläufen beginnt der Check-in gegen 10:45 Uhr, das Beiboot legt gegen 11:45 Uhr ab. Die Transportanbieter auf dieser Seite setzen in Tuan Chau ab, aber nicht unbedingt an der Lounge von Green Ruby: Zeigen Sie Ihrem Fahrer die Kartenmarkierung. Der eingetragene Firmensitz ist eine andere Adresse – schicken Sie Ihren Fahrer nicht dorthin. Wenn etwas unklar ist, [kontaktieren Sie das Reservierungsteam](contact) vor der Reise.' },
      ],
    },
    {
      id: 'ships',
      title: 'Green Ruby 1 und Green Ruby 2: Unterschiede bei der Einschiffung',
      blocks: [
        {
          table: {
            head: ['', 'Green Ruby 1', 'Green Ruby 2'],
            rows: [
              ['Bucht', 'Halong-Bucht', 'Lan-Ha-Bucht'],
              ['Check-in', 'VIP-Lounge von Green Ruby, Tuan Chau', 'VIP-Lounge von Green Ruby, Tuan Chau'],
              ['Einschiffung (geplant)', 'Mit dem Beiboot von Tuan Chau zum Schiff vor Anker', 'Mit dem Beiboot von Tuan Chau zum Anleger Gia Luan auf der Insel Cat Ba (Haiphong), dann an Bord'],
              ['Rückkehr (geplant)', 'Nach Tuan Chau, am späten Vormittag', 'Nach Tuan Chau, Ausschiffung gegen 11:00 Uhr'],
            ],
          },
        },
        { p: 'Nach den geplanten Abläufen von Green Ruby beginnen beide Reiseverläufe mit dem Check-in in Tuan Chau; die Überfahrt zum Anleger Gia Luan gehört zur Einschiffung auf Green Ruby 2, Sie müssen die Anreise nach Cat Ba also nicht selbst organisieren. Noch unentschieden, welche Bucht? Lesen Sie [Halong-Bucht oder Lan-Ha-Bucht](bayComparison).' },
      ],
    },
    {
      id: 'return',
      title: 'Rücktransfer und Anschlussflüge',
      blocks: [
        { p: 'Kreuzfahrten mit Übernachtung kehren in der Regel am späten Vormittag in den Hafen zurück. Nach den vorläufigen Reiseverläufen von Green Ruby ist die Ausschiffung in Tuan Chau gegen 11:00–11:30 Uhr vorgesehen. Ein Minibus, der Tuan Chau um 12:00 Uhr oder später verlässt, ist die sicherere Wahl; frühere Abfahrten lassen wenig Spielraum, falls sich das Beiboot verspätet.' },
        { h3: 'Von Tuan Chau nach Hanoi und zum Flughafen Noi Bai: Anbieter' },
        { operators: ['halong-hanoi', 'halong-noibai'] },
        { p: 'Die Rückfahrt nach Hanoi oder zum Flughafen Noi Bai dauert etwa 2,5–3 Stunden, zuzüglich der Zwischenhalte. Wenn Sie am selben Tag fliegen, beachten Sie Folgendes:' },
        {
          ul: [
            '**Inlandsflüge ab Noi Bai:** Planen Sie die gesamte Fahrzeit ein und seien Sie mindestens zwei Stunden vor Abflug am Flughafen.',
            '**Internationale Flüge ab Noi Bai:** Planen Sie mindestens drei Stunden am Flughafen ein, dazu die Fahrt und mögliche Verzögerungen.',
            '**Flüge ab Cat Bi oder Van Don:** Eine regelmäßige Sammelverbindung ab Tuan Chau konnten wir nicht bestätigen. Buchen Sie einen Privatwagen und klären Sie Fahrzeit und Check-in-Vorgaben des Flughafens.',
            '**Weiterreise nach Ninh Binh:** Nachmittags-Minibusse finden Sie im [Abschnitt zu Ninh Binh](#ninh-binh); planen Sie direkt nach der voraussichtlichen Ankunft keine Aktivitäten ein.',
          ],
        },
        { p: 'Wetterbedingte Einschränkungen, Änderungen im Kreuzfahrtbetrieb und die Straßenverhältnisse können Ihre Rückkehrzeit beeinflussen.' },
        { note: '**Unser Rat:** Ist Ihr Anschlussflug teuer, schwer umzubuchen oder Teil einer internationalen Verbindung, sollten Sie vor dem Flug eine weitere Nacht einplanen. Die Zeiten auf dieser Seite sind Schätzungen, keine garantierten Ankunftszeiten. Klären Sie immer die voraussichtliche Rückkehrzeit Ihrer Kreuzfahrt und den Transfer, bevor Sie die Weiterreise festlegen.' },
      ],
    },
    {
      id: 'delays',
      title: 'Wenn Flug oder Transfer sich verspäten',
      blocks: [
        {
          ol: [
            '**Informieren Sie sofort das Reservierungsteam**, mit Ihrer Flugnummer oder der voraussichtlichen Ankunftszeit des Fahrers. Die Kontaktdaten finden Sie auf der [Kontaktseite](contact).',
            '**Gehen Sie nicht davon aus, dass das Schiff wartet.** Die Zeiten der Beiboote richten sich nach dem Tagesablauf und den Hafenvorschriften. Ob ein späterer Transfer zum Schiff möglich ist, hängt vom Tag ab und kann nicht garantiert werden.',
            '**Wenn Sie die Einschiffung verpassen**, gelten die Storno- und Änderungsbedingungen in den [FAQ](faq). Eine Reiseversicherung, die verpasste Abfahrten abdeckt, ist empfehlenswert.',
            '**Wenn die Behörden die Fahrten** wegen eines Sturms aussetzen, werden Sie wegen einer Verschiebung oder Erstattung gemäß den veröffentlichten Bedingungen kontaktiert.',
          ],
        },
      ],
    },
  ],
  faqTitle: 'Fragen zum Transfer',
  faq: [
    { q: 'Wie lange dauert die Fahrt von Hanoi in die Halong-Bucht?', a: 'Vom Zentrum Hanois nach Tuan Chau brauchen Sie meist etwa 2,5–3,5 Stunden, je nach Verkehr, Abfahrtsort und zusätzlichen Halten des Fahrzeugs.' },
    { q: 'Was kostet eine Limousine von Hanoi in die Halong-Bucht?', a: 'Bei unserer Prüfung im Oktober 2026 nannten die Anbieter für einen Platz in der Sammel-Limousine etwa 250.000–360.000 VND oder 15 USD pro Strecke. Eine komplette 9-sitzige Limousine gab es ab 2.800.000 VND. Die Preise ändern sich; lassen Sie sie bei der Buchung bestätigen.' },
    { q: 'Wie kommt man am besten von Hanoi in die Halong-Bucht?', a: 'Ein Privatwagen ist bequem für Familien, Gruppen und alle, die direkt fahren möchten. Sammel-Limousinen sind eine praktische Alternative für Paare und Alleinreisende. Für einen Check-in um 10:45 Uhr wählen Sie einen Minibus, der Hanoi bis etwa 7:00 Uhr verlässt.' },
    { q: 'Wie komme ich von Ninh Binh oder Tam Coc in die Halong-Bucht?', a: 'Sammel-Limousinen fahren von Tam Coc und Ninh Binh nach Ha Long, manche setzen in Tuan Chau ab. Sie brauchen etwa 4–4,5 Stunden, und keine erreicht verlässlich einen Check-in um 10:45 Uhr. Übernachten Sie daher am Vorabend in Ha Long oder nehmen Sie einen Privatwagen mit Abfahrt gegen 6:00 Uhr.' },
    { q: 'Ist der Transfer bei einer Kreuzfahrt mit Green Ruby inklusive?', a: 'Nach den aktuellen Plänen von Green Ruby werden Transfers zwischen Hanoi und Tuan Chau separat organisiert und sind im regulären Kreuzfahrtpreis nicht enthalten. Auf Anfrage und gegen Aufpreis lässt sich ein privater Transfer organisieren; klären Sie Möglichkeiten und Preise mit Ihrer Buchungsanfrage.' },
    { q: 'Welcher Flughafen liegt der Halong-Bucht am nächsten?', a: 'Der Flughafen Cat Bi in Haiphong liegt etwa 40 km Straße von Tuan Chau entfernt, der Flughafen Van Don etwa 60–70 km; ab Noi Bai fahren Sie etwa 3 Stunden. Noi Bai hat jedoch weit mehr Flüge und als einziger Flughafen regelmäßige Sammel-Limousinen nach Ha Long, die wir bestätigen konnten.' },
    { q: 'Kann ich vom Flughafen Noi Bai direkt zu meiner Kreuzfahrt fahren?', a: 'Ja, wenn Ihr Flug früh genug landet und Sie den Check-in-Ort rechtzeitig erreichen. Flugverspätungen, Einreise und Gepäckausgabe machen Anschlüsse am selben Tag jedoch riskant. Die Anreise am Vortag ist in der Regel sicherer.' },
    { q: 'Wie komme ich nach der Kreuzfahrt von der Halong-Bucht zum Flughafen Hanoi?', a: 'Sammel-Limousinen fahren den ganzen Nachmittag von Ha Long nach Noi Bai, Privatwagen lassen sich für eine feste Uhrzeit buchen. Rechnen Sie mit etwa 3 Stunden Fahrt plus der Check-in-Zeit für Ihren Flug.' },
    { q: 'Wo legen die Kreuzfahrten von Green Ruby ab?', a: 'Green Ruby plant, die Gäste von Green Ruby 1 und Green Ruby 2 in der VIP-Lounge von Green Ruby am Internationalen Passagierhafen Tuan Chau zu empfangen. Die Einschiffung unterscheidet sich zwischen den beiden Schiffen. Ihre endgültige Buchungsbestätigung nennt den genauen Ort, die Meldezeit und die Hinweise zur Anreise.' },
  ],
  sourcesTitle: 'Quellen',
  sources: [
    { title: 'Verwaltung der Halong-Bucht: Besichtigungsroute VHL1 (Abfahrten ab Tuan Chau oder dem Internationalen Kreuzfahrthafen Ha Long)', url: 'https://halongbay.com.vn/tours/1-hanh-trinh-vhl1-cang-tau-dong-thien-cung-hang-dau-go-hon-cho-da-hang-ba-hang-hon-dinh-huong-hon-trong-mai' },
    { title: 'VietNamNet: Noi Bai empfiehlt, zwei Stunden vor Inlands- und drei Stunden vor Auslandsflügen da zu sein (auf Englisch)', url: 'https://vietnamnet.vn/en/125-000-travelers-expected-at-hanoi-airport-as-holiday-rush-begins-2549423.html' },
    { title: 'Tuoi Tre News (20. Juli 2025): Ausflugsboote in der Halong-Bucht dürfen wegen Taifun Wipha nicht auslaufen (auf Englisch)', url: 'https://news.tuoitre.vn/ha-long-bay-tourist-boats-banned-from-departing-as-typhoon-wipha-nears-103250720163544717.htm' },
    { title: 'Ha Long Travel Limousine: Preise und Fahrplan Hanoi–Ha Long; Abholregeln am Hafen Tuan Chau', url: 'https://xehalong.vn/quy-trinh-don-tra' },
    { title: 'Ha Long Travel Limousine: Sammel- und Privat-Limousine Flughafen Noi Bai–Ha Long', url: 'https://xehalong.vn/xe-limousine-noi-bai-ha-long-cam-pha/' },
    { title: 'Cat Ba Express: Limousine Hanoi–Ha Long (Ausstiegspunkte in Tuan Chau und Bai Chay)', url: 'https://catbaexpress.com/bus-hanoi-to-halong.html' },
    { title: 'Full Moon Travel: Busfahrplan Ninh Binh–Ha Long', url: 'https://fullmoontravelasia.com/ninh-binh-to-halong-bay-by-bus/' },
    { title: 'Ninh Binh Express Bus: Fahrplan und Preise der Limousine Ninh Binh–Ha Long', url: 'https://ninhbinhexpressbus.com/lich-trinh-xe-limousine-ninh-binh-di-ha-long/' },
    { title: 'VinWonders: Ratgeber zur Insel Tuan Chau (Entfernungen von den Flughäfen Cat Bi und Van Don)', url: 'https://vinwonders.com/vi/wonderpedia/news/dao-tuan-chau-ha-long/' },
  ],
  related: {
    title: 'Weiter planen',
    links: [
      { href: 'firstTime', title: 'Erste Kreuzfahrt in der Halong-Bucht?', body: 'Was Sie erwartet, was Sie einpacken und wie der Einschiffungstag abläuft.' },
      { href: 'itineraries', title: 'Reiseverläufe von Green Ruby', body: 'Zwei Buchten, 2 Tage, 1 Nacht oder 3 Tage, 2 Nächte.' },
      { href: 'bestTime', title: 'Beste Reisezeit für die Halong-Bucht', body: 'Wetter, Andrang und Seegang Monat für Monat.' },
      { href: 'faq', title: 'Häufige Fragen', body: 'Buchung, Zahlung, Stornierung und Leben an Bord.' },
    ],
  },
  estimateNote: 'Alle Zeitangaben auf dieser Seite sind Schätzungen für normale Bedingungen, keine Fahrpläne oder Garantien. Preise und Fahrpläne der Anbieter entsprechen dem Stand, der unter der jeweiligen Tabelle angegeben ist. Check-in und Einschiffung folgen dem veröffentlichten Plan von Green Ruby und bleiben vorläufig bis zu den ersten Abfahrten, die für Februar 2027 geplant sind.',
  selector: {
    labels: {
      title: 'Nach Tuan Chau ab {origin}',
      origin: 'Wo starten Sie?',
      road: 'Fahrzeit bis Tuan Chau (Schätzung)',
      hours: 'Stunden',
      minutes: 'Min.',
      decimal: ',',
      roadUnknown: 'Hängt von Strecke und Verkehr ab. Lassen Sie sich die Fahrzeit von Ihrem Transferanbieter bestätigen.',
      depart: 'Empfohlenes Abfahrtsfenster',
      departShuttle: 'Sammel-Minibusse: Buchen Sie einen, der Hanoi bis etwa 7:00 Uhr verlässt; abgeholt wird oft gegen {from}–{to} Uhr.',
      departNote: 'Mit Spielraum für den Verkehr. An Wochenenden und Feiertagen mehr Zeit einplanen.',
      departUnknown: 'Planen Sie mit Ihrem Transferanbieter so, dass Sie Tuan Chau mit ausreichend Puffer vor dem Check-in um 10:45 Uhr erreichen.',
      lastDay: 'Letzter Tag: Ausschiffung (vorläufig)',
      disembark: 'Die Rückkehrzeiten können sich je nach Wetter und Betrieb ändern.',
      returnBack: 'Geschätzte Ankunft am Ausgangsort ({origin}): gegen {from}–{to} Uhr, ohne Gewähr.',
      airportAdvice: 'Seien Sie nach der gesamten Fahrt mindestens 2 Stunden vor Inlands- und 3 Stunden vor Auslandsflügen am Flughafen.',
      table: { mode: 'Möglichkeit', time: 'Dauer (Schätzung)', notes: 'Hinweise' },
      cost: 'Veröffentlichte Preise (einfache Fahrt)',
      costNone: 'Keine Preise, die wir bestätigen konnten. Fragen Sie nach einem Angebot für einen privaten Transfer.',
      operators: 'Von uns geprüfte Anbieter',
      operatorsNone: 'Keine regelmäßige Sammelverbindung nach Tuan Chau, die wir bestätigen konnten. Buchen Sie einen privaten Transfer.',
      returnOperators: 'Zurück ab Tuan Chau:',
      seeTable: 'Abhol- und Ausstiegspunkte vergleichen',
      operatorsAnchor: { hanoi: 'old-quarter', noibai: 'airports', ninhbinh: 'ninh-binh' },
      note: 'Nur Vorschläge, berechnet für einen vorläufigen Check-in um 10:45 Uhr und eine Ausschiffung um 11:00–11:30 Uhr. Kein Fahrplan und keine Garantie: Planen Sie zusätzliche Zeit für Verkehr, Verspätungen und Abläufe am Flughafen ein. Preise wie von den Anbietern veröffentlicht; bei der Buchung bestätigen lassen.',
    },
    origins: [
      {
        key: 'hanoi',
        label: 'Hanoi (Altstadt)',
        routes: [
          { mode: 'Privatwagen', time: '2,5–3 h', notes: 'Von Tür zu Tür; Sie bestimmen die Uhrzeit.' },
          { mode: 'Sammel-Limousine (Minibus)', time: '3–3,5 h', notes: 'Abholung an Hotels im Zentrum Hanois, eine Pause. Bei manchen Anbietern stündliche Abfahrten.' },
          { mode: 'Fernbus über die Autobahn', time: '2,5 h + Fahrt nach My Dinh', notes: 'Ab dem Busbahnhof My Dinh. Schwer mit einem Check-in am Vormittag abzustimmen.' },
        ],
        tip: 'Eine Unterkunft nahe der Altstadt macht die Abholung durch Sammel-Minibusse meist am einfachsten.',
      },
      {
        key: 'noibai',
        label: 'Flughafen Noi Bai (HAN)',
        airport: 'noibai',
        routes: [
          { mode: 'Privatwagen', time: '2,5–3,5 h', notes: 'Vorab vereinbarte Abholung in der Ankunftshalle; klären Sie, wie lange der Anbieter wartet.' },
          { mode: 'Sammel-Limousine (Minibus)', time: 'Etwa 3 h', notes: 'Bei mindestens einem Anbieter stündlich ab dem Flughafen; bei später Landung ist ein Wechsel auf einen späteren Minibus möglich.' },
          { mode: 'Taxi oder Fahrdienst-App', time: '2,5–3,5 h', notes: 'Preis und genaues Terminal vor der Abfahrt vereinbaren.' },
        ],
        tip: 'Eine Kreuzfahrt am Ankunftstag erfordert eine frühe Landung und lässt wenig Spielraum für Verspätungen. Eine Übernachtung in Hanoi ist in der Regel sicherer.',
      },
      {
        key: 'catbi',
        label: 'Flughafen Cat Bi (HPH)',
        airport: 'catbi',
        routes: [
          { mode: 'Privatwagen', time: 'Unterschiedlich', notes: 'Etwa 40 km Straße. Strecke und Fahrzeit nach Tuan Chau mit dem Anbieter klären.' },
          { mode: 'Taxi oder Fahrdienst-App', time: 'Unterschiedlich', notes: 'Am Flughafen verfügbar; genaues Terminal bestätigen.' },
        ],
        tip: 'Praktisch für manche Inlandsverbindungen; prüfen Sie die Transferzeit, bevor Sie einen Anschluss am selben Tag wählen.',
      },
      {
        key: 'vandon',
        label: 'Flughafen Van Don (VDO)',
        airport: 'vandon',
        routes: [{ mode: 'Privatwagen oder Taxi', time: 'Unterschiedlich', notes: 'Etwa 60–70 km. Wagen vorab buchen und Fahrzeit bestätigen lassen.' }],
        tip: 'Prüfen Sie die Flugtage genau: In Van Don gibt es nur wenige Verbindungen.',
      },
      {
        key: 'ninhbinh',
        label: 'Ninh Binh / Tam Coc',
        routes: [
          { mode: 'Privatwagen', time: '3,5–4 h', notes: 'Von Tür zu Tür über die Autobahnen.' },
          { mode: 'Sammel-Limousine (Minibus)', time: '4–4,5 h', notes: 'Ab Tam Coc, teils über Tuan Chau. Keine erreicht verlässlich die Ankunft vor 10:45 Uhr.' },
        ],
        tip: 'Für einen Check-in am Vormittag ist eine Übernachtung in Ha Long vorab der sicherere Plan.',
      },
    ],
  },
  itineraries: { title: 'Reiseverläufe von Green Ruby', days: (n) => `${n} Tage, ${n - 1} ${n > 2 ? 'Nächte' : 'Nacht'}`, view: 'Reiseverlauf ansehen' },
};

export default transfer;
