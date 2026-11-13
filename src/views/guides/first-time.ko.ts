import type { GuideContent } from './types';

// Korean version of first-time.en.ts (the English file is the source of truth). DRAFT, PENDING_REVIEW:
// transcreated 2026-11-11 for one Korean edition (South Korea, 표준어 / 한글 맞춤법) following
// docs/i18n-audit/ko/drafts/BRIEF-KO.md (owner-confirmed facts, 11 Nov 2026); needs native Korean review.
// Ship, cabin and itinerary names stay Latin; tender = „텐더 보트“, day boat = „데이 보트“, Gia Luan = „지아루언 선착장“,
// lounge = „Green Ruby VIP 라운지“. Machine time values in timeline steps (time fields) are kept as in the source;
// prose times 24 h without leading zero (10:45, 7:30–8:00); ranges with an en dash, as the shared widgets render them.
// Links to English-only pages get their " (영어)" mark from the site (lib/section-links.ts), so labels here carry none;
// external English sources carry it in their title.
// REVIEW: (1) Lan Ha kayak suspension (local regulations, as of October 2026) added wherever kayaking is listed as
// included or as an activity (inclusions intro + table row, on-board afternoon); "as of October 2026" added to the
// which-bay table cell. Ha Long kayaking (Luon Cave) unchanged.
// REVIEW: (2) Launch wording: "begin sailing in February 2027" / "enter service" rendered as "2027년 2월 첫 운항 예정"
// (brief: never "운항 중").
// REVIEW: (3) Request-only booking: inclusions note and FAQ arrival answer say guests send an enquiry with their dates
// ("예약 문의"); "before confirming a booking" rendered as "before sending your enquiry".
// REVIEW: (4) Transfers: timeline "If you book a transfer" made explicit as a private transfer on request at extra cost
// (no shared shuttle offered by Green Ruby). Road time kept as the source range 2.5–3 h (brief: about 2.5 h).
// REVIEW: (5) Lounge named "Green Ruby VIP 라운지" (brief: Green Ruby VIP lounge in Tuan Chau).
// REVIEW: (6) Seasickness: "often relatively calm" rendered as "usually calmer than the open sea, depending on the
// weather" (brief wording); never "드물다".
// REVIEW: (7) Cancellation summary kept as in the source (30+ days full refund, increasing charges, none within 7 days);
// no deposit percentages stated.
// SEO: primary query "하롱베이 크루즈 처음이라면"; "자유여행" (worth-it), "당일치기" and "여행 코스" (how-long) used once
// where the source covers them. Terms to check: "합승 리무진 밴" (shared limousine van), "오징어 낚시", "태극권" (Tai Chi).
const firstTime: GuideContent = {
  metaTitle: '하롱베이 크루즈 처음이라면: 준비물·일정 안내',
  metaDescription:
    '하롱베이 크루즈가 처음이라면 알아둘 점: 하롱베이와 란하베이 중 어디로 갈지, 몇 박이 좋은지, 포함 사항, 승선일 일정, 준비물과 처음 여행자가 자주 하는 실수까지 정리했습니다.',
  breadcrumb: '첫 크루즈 가이드',
  eyebrow: '여행 가이드',
  title: '하롱베이 크루즈 처음이라면: 준비물부터 승선일 일정까지',
  lead: '하롱베이나 란하베이(Lan Ha Bay)에서 처음으로 선상 1박 크루즈를 계획하고 있나요? 나에게 맞는 일정을 고르는 법, 선상에서 보내는 시간, 출발 전 준비할 것, 그리고 여행을 한결 수월하게 해 줄 실용적인 정보를 이 가이드에 정리했습니다.',
  summaryTitle: '한눈에 보기',
  summary: [
    ['가 볼 만한가요?', '최소 1박을 한다면 그렇습니다. 데이 보트가 떠난 뒤, 해 질 녘과 이른 아침의 바다를 볼 수 있기 때문입니다.'],
    ['며칠이 좋을까요?', '처음이라면 **1박 2일**, 한적한 해역까지 가서 느긋하게 머물고 싶다면 **2박 3일**을 권합니다.'],
    ['하롱베이와 란하베이, 어디로 갈까요?', '대표적인 동굴과 전망대를 보려면 **하롱베이**, 잔잔한 바다와 깟바섬 마을, 해변을 원한다면 **란하베이**입니다.'],
    ['가는 법', '하노이에서 뚜언쩌우(Tuan Chau)까지 차로 약 2.5–3시간(추정)입니다. 자세한 내용은 [하노이에서 하롱베이 가는 법](transfer)을 참고하세요.'],
    ['승선일', 'Green Ruby가 공개한 일정 기준으로 10:45경부터 체크인하고, 11:45경 텐더 보트를 타고 본선으로 갑니다.'],
  ],
  published: '2026-10-24',
  updated: { iso: '2026-10-26', label: '2026년 10월 26일 업데이트' },
  tocTitle: '이 가이드의 내용',
  sections: [
    {
      id: 'worth-it',
      title: '하롱베이 크루즈, 1박을 할 만한 가치가 있을까요?',
      blocks: [
        { p: '하롱베이는 독특한 석회암 경관과 지질학적 가치를 인정받은 유네스코 세계자연유산입니다. 2023년에는 란하베이를 포함한 깟바 군도까지 유산 범위가 넓어졌습니다. 이곳의 매력은 끝없이 펼쳐진 석회암 섬들에 있고, 그 풍경은 물 위에서 시간을 두고 바라볼 때 비로소 제대로 다가옵니다.' },
        { p: '하노이에서 당일치기도 가능하지만, 왕복 약 5–6시간을 길 위에서 보내야 합니다. 선상에서 하룻밤을 묵으면 관광객이 몰리는 시간대가 지난 뒤에도 바다 위에 머물 수 있습니다. 해 지는 풍경을 바라보고, 석회암 섬들 사이에서 밤을 보내고, 고요한 이른 아침을 맞을 수 있습니다.' },
        { p: '반대로 자유여행을 선호하거나, 해변에서 긴 시간을 보내고 싶거나, 일정을 전적으로 자유롭게 짜고 싶다면 1박 크루즈가 잘 맞지 않을 수 있습니다. 액티비티는 정해진 일정에 따라 진행되며 날씨, 조수, 현지 규정에 따라 바뀔 수 있습니다.' },
      ],
    },
    {
      id: 'which-bay',
      title: '하롱베이와 란하베이, 어떻게 다를까요?',
      blocks: [
        { p: '하롱베이와 란하베이는 같은 카르스트 지형에 자리합니다. 차이는 무엇을 하느냐, 그리고 얼마나 붐비느냐에 있습니다. 자세한 내용은 [하롱베이·란하베이 비교 가이드](bayComparison)에서 다루고, 여기서는 핵심만 정리합니다.' },
        {
          table: {
            head: ['', '하롱베이', '란하베이'],
            rows: [
              ['성격', '유네스코 유산 구역의 대표적인 중심부. 붐비는 항로가 많음', '깟바섬 앞바다. 배가 적고 정박지가 한적함'],
              ['대표 방문지', '[승솟 동굴](destination:sung-sot-cave), [티톱섬](destination:ti-top-island), [루온 동굴](destination:luon-cave)', '[다크 앤 브라이트 동굴](destination:dark-bright-cave), [아오엑 라군](destination:ao-ech-lagoon), [비엣하이 마을](destination:viet-hai-village)'],
              ['이런 분께', '유명 명소를 꼭 보고 싶은 첫 방문객', '여유로운 일정, 마을 방문과 해변을 원하는 분(란하베이 카약은 현지 규정에 따라 일시 중단, 2026년 10월 기준)'],
              ['Green Ruby 선박', 'Green Ruby 1', 'Green Ruby 2'],
            ],
          },
        },
        { p: '두 선박 모두 뚜언쩌우에서 체크인합니다. Green Ruby 2 승객은 이어서 텐더 보트를 타고 지아루언 선착장(Gia Luan)으로 건너가 란하베이에서 승선합니다. 모든 방문지는 [여행지 지도](destinations)에서 확인할 수 있습니다.' },
      ],
    },
    {
      id: 'how-long',
      title: '데이 크루즈, 1박 2일, 2박 3일 중 무엇을 고를까요?',
      blocks: [
        {
          table: {
            head: ['', '데이 크루즈', '1박 2일', '2박 3일'],
            rows: [
              ['바다 위에서 보내는 시간', '약 4–6시간', '24시간 조금 못 미침', '일정에 따라 약 2일'],
              ['볼 수 있는 것', '한 구역, 대개 가장 붐비는 곳', '방문지 두세 곳, 일몰과 일출', '한적한 구역을 하루 더 탐방'],
              ['일정의 여유', '빠듯함', '적당함', '여유로움'],
              ['이런 분께', '일정이 매우 빠듯한 여행자', '대부분의 첫 방문객', '한적한 곳을 원하는 여행자, 시간 여유가 있는 가족'],
            ],
          },
        },
        { p: '고민된다면 1박 2일을 고르세요. 더 멀리 둘러보고 싶다면 2박 3일이 낫습니다. Green Ruby의 예정된 여행 코스에서는 둘째 날 데이 보트를 타고 하롱베이의 [끄어반 수상마을](destination:cua-van-floating-village)과 [띠엔옹 동굴](destination:tien-ong-cave)을, 란하베이에서는 깟바섬의 [비엣하이 마을](destination:viet-hai-village)을 찾아갑니다.' },
      ],
    },
    {
      id: 'cabins',
      title: '객실 고르기와 선상 시설',
      blocks: [
        { p: '객실은 하루 일정을 마치고 쉬는 공간이니, 사진만 보고 고르기보다 몇 가지를 더 비교해 보는 것이 좋습니다. 객실 크기와 위치, 편의 시설에 따라 선상에서의 편안함이 눈에 띄게 달라집니다.' },
        {
          ul: [
            '**전용 야외 공간:** 발코니나 테라스가 있으면 객실을 나서지 않고도 풍경을 즐길 수 있습니다.',
            '**침대 구성:** 더블 침대인지 트윈 침대인지, 엑스트라 베드를 놓을 수 있는지 확인하세요.',
            '**크기와 위치:** 객실 면적, 어느 데크에 있는지, 공용 공간과 얼마나 가까운지 살펴보세요.',
            '**선상 시설:** 객실 내 편의 시설과 함께 선데크, 레스토랑, 라운지, 웰니스 시설도 확인하세요. 갑판에서 시간을 많이 보낼 생각이라면 작은 객실로도 충분히 편안하게 지낼 수 있습니다.',
          ],
        },
        { p: 'Green Ruby 1과 Green Ruby 2에는 Serenity Deluxe, Ocean Breeze Premium, Royal Romance Suite, Imperial Suite의 네 가지 객실 등급이 계획되어 있습니다. 최종 사양과 편의 시설은 예약 전에 공개된 [선박 정보](/about-us/brand-facts)에서 확인하시기 바랍니다.' },
      ],
    },
    {
      id: 'inclusions',
      title: '포함 사항과 추가 비용',
      blocks: [
        { p: '선상 1박 이상 크루즈 요금에는 보통 숙박, 식사, 일정에 포함된 관광이 들어갑니다. 차량 이동, 음료, 선택 서비스에는 추가 요금이 붙을 수 있습니다.' },
        { p: 'Green Ruby의 예정된 일정에는 식사, 일정에 포함된 방문지 입장료, 카약이나 대나무 보트 같은 액티비티가 포함됩니다(란하베이 카약은 현지 규정에 따라 일시 중단, 2026년 10월 기준). 차량 이동, 스파 같은 추가 서비스는 대개 별도로 청구되며, 정리하면 다음과 같습니다.' },
        {
          table: {
            head: ['보통 포함', '보통 불포함'],
            rows: [
              ['일정 내 모든 식사(점심, 저녁, 아침, 브런치)', '하노이 또는 공항과 뚜언쩌우 간 차량 이동'],
              ['전용 욕실과 에어컨을 갖춘 객실', '음료(별도 안내가 없는 경우)'],
              ['일정에 포함된 방문지 입장료', '스파 트리트먼트'],
              ['정해진 방문지에서의 카약 또는 대나무 보트(란하베이 카약은 일시 중단)', '승무원과 가이드 팁'],
              ['쿠킹 클래스와 아침 태극권, 선상 가이드', '여행자 보험과 개인 경비'],
              ['데이 보트 투어(2박 3일 일정만)', ''],
            ],
          },
        },
        { p: '예약 문의를 보내기 전에 선택한 [일정](itineraries)의 포함·불포함 사항과 취소 규정을 꼭 확인하고, 예약 확정서에 적힌 포함 사항도 다시 살펴보세요. Green Ruby가 공개한 취소 규정([자주 묻는 질문](faq) 참고)에 따르면 출발 30일 전까지 취소하면 전액 환불되고, 출발일이 다가올수록 수수료가 늘어나며, 출발 7일 미만 전에 취소하거나 노쇼인 경우에는 환불되지 않습니다. 적용되는 조건은 예약 시 확정됩니다.' },
        { note: 'Green Ruby 선박은 2027년 2월 첫 운항 예정입니다. 지금은 원하시는 날짜를 적어 예약 문의를 보내실 수 있습니다. 요금과 출발일은 예약 시 확정됩니다.' },
      ],
    },
    {
      id: 'before-you-go',
      title: '출발 전 준비할 것',
      blocks: [
        {
          ul: [
            '**여권**: 반드시 원본을 지참하세요. 크루즈 운영사는 승선 전에 모든 승객을 항만 당국에 등록합니다.',
            '**비자와 입국**: 국적에 따른 베트남의 최신 입국 규정을 여행 전에 미리 확인하세요.',
            '**식단과 건강**: 알레르기, 식단 제한, 지병은 선착장에서가 아니라 예약할 때 알려 주세요.',
            '**여행자 보험**: 들어 두는 편이 좋습니다. 폭풍으로 운항이 바뀔 수 있는 6월부터 10월까지는 특히 그렇습니다.',
            '**결제**: 육지에서 소소한 물건을 살 때는 베트남 동화가 조금 있으면 편리합니다. 선상에서 쓸 수 있는 [결제 수단](/payment-methods)은 미리 확인하세요.',
          ],
        },
      ],
    },
    {
      id: 'getting-there',
      title: '하노이에서 크루즈 터미널까지',
      blocks: [
        { p: '뚜언쩌우는 하노이 시내에서 고속도로로 약 160–180km 떨어져 있습니다. 개인 차량으로 약 2.5–3시간 걸리고, 합승 리무진 밴은 다른 승객을 태우고 휴게소에도 들르기 때문에 조금 더 걸립니다. 모든 시간은 추정치이며, 하노이를 빠져나가는 교통 상황과 연휴 주말에 따라 가장 크게 달라집니다.' },
        { p: '차량 이동은 크루즈 요금에 포함되지 않습니다. 요청하시면 Green Ruby가 추가 요금으로 개인 차량을 마련할 수 있습니다. 노이바이, 깟비, 반돈 공항 도착편을 포함한 모든 방법은 [하노이에서 하롱베이 가는 법](transfer)에서 비교했습니다.' },
      ],
    },
    {
      id: 'boarding-day',
      title: '승선일, 시간대별로 살펴보기',
      blocks: [
        { p: '많은 1박 크루즈는 육상 라운지에서 체크인한 뒤 텐더 보트를 타고 본선으로 이동합니다.' },
        { p: 'Green Ruby는 뚜언쩌우에서 승객을 맞이할 예정이며, Green Ruby 1과 Green Ruby 2는 본선까지 가는 방식이 다릅니다. 아래에서 선박을 고르면 예정된 승선일 일정을 볼 수 있습니다. 모든 시간은 잠정적이며 날씨, 운항 사정, 항만 당국의 지시에 따라 바뀔 수 있습니다.' },
        { widget: 'boarding-timeline' },
        { p: '**텐더 보트 이동.** 텐더 보트는 지붕이 있는 소형 모터보트입니다. 승무원이 옮겨 타는 것을 도와주고, 구명조끼가 제공되며, 짐은 승무원이 옮겨 줍니다. 여권, 상비약, 휴대폰은 작은 가방에 넣어 직접 지니세요.' },
      ],
    },
    {
      id: 'on-board',
      title: '선상에서는 어떻게 보낼까요?',
      blocks: [
        {
          ul: [
            '**오후**: 안전 브리핑, 항해 중 점심 식사, 그리고 첫 번째 투어. 카약이나 대나무 보트로 동굴이나 라군을 둘러보고(란하베이 카약은 현지 규정에 따라 일시 중단, 2026년 10월 기준), 때로는 해변에도 들릅니다.',
            '**저녁**: 선데크에서 일몰 감상, 쿠킹 클래스나 자유 시간, 저녁 식사, 그리고 원하면 갑판에서 오징어 낚시.',
            '**아침**: 해 뜰 무렵 태극권, 가벼운 아침 식사, 그리고 동굴 등 한 곳을 더 둘러본 뒤 브런치를 들고 항구로 돌아옵니다.',
          ],
        },
        { p: '선박은 지정된 정박 구역에 닻을 내리고, 승객은 밤새 선상에 머뭅니다. 대부분의 레저 활동은 안전 요건 안에서 자유롭게 선택할 수 있으니, 방문지에서 배에 남고 싶다면 승무원에게 말씀해 주세요. 예정된 [선상 경험](/experiences)도 확인해 보세요.' },
      ],
    },
    {
      id: 'safety',
      title: '날씨, 안전, 어린이 동반, 접근성',
      blocks: [
        { p: '**날씨.** 10월부터 4월까지는 비교적 선선하고 건조하며, 5월부터 9월까지는 덥고 습합니다. 대략 6월부터 10월까지는 폭풍 시즌이기도 합니다. 폭풍 경보가 내려지면 당국이 짧은 예고로 만 전체의 운항을 중단할 수 있고, 이때 운영사는 자체 규정에 따라 일정을 바꾸거나 환불합니다. 겨울에는 안개와 낮은 구름 때문에 시야가 흐려질 수 있습니다. 월별 날씨는 [하롱베이 여행 적기](bestTime)에서 확인하세요.' },
        { p: '**뱃멀미.** 하롱베이와 란하베이는 섬들에 둘러싸여 있어 날씨에 따라 다르지만 대개 먼바다보다 잔잔합니다. 다만 바람이 강하면 흔들림이 있을 수 있습니다. 멀미를 잘 하는 편이라면 평소 쓰는 멀미약을 챙기고, 출발 전에 승무원에게 바다 상황을 물어보세요.' },
        { p: '**어린이.** 대부분의 크루즈는 가족 여행객을 환영합니다. 어린이는 모든 수상 활동에서 구명조끼를 착용하며, 어린 자녀는 보통 카약 대신 어른과 함께 대나무 보트를 탑니다. 예약할 때 아동 규정, 침대 옵션, [안전 정책](/safety-policies)을 확인하세요.' },
        { p: '**접근성.** 승선하려면 선착장에서 텐더 보트로, 다시 본선으로 옮겨 타야 하고, 많은 명소에 계단이 있습니다. [승솟 동굴](destination:sung-sot-cave)과 [티톱섬](destination:ti-top-island) 전망대는 긴 계단을 올라야 합니다. 거동이 불편한 여행자도 대개 배 위에서 크루즈를 즐길 수 있으니, 예약 전에 필요한 사항을 알려 주시면 솔직하게 안내해 드립니다.' },
      ],
    },
    {
      id: 'packing',
      title: '준비물 체크리스트',
      blocks: [
        { p: '큰 여행 가방보다 1박용 작은 가방을 챙기세요. 텐더 보트에서도, 객실에서도 훨씬 편합니다.' },
        {
          checklist: [
            { title: '서류', items: ['여권 원본', '예약 확정서', '여행자 보험 정보', '추가 비용에 쓸 현금 약간'] },
            { title: '옷차림', items: ['수영복과 속건 타월', '동굴과 계단에서 미끄러지지 않는 편한 신발', '얇은 겉옷이나 재킷(11월–3월에는 필수)', '모자와 선글라스'] },
            { title: '필수품', items: ['자외선 차단제와 벌레 퇴치제', '개인 상비약, 필요하면 멀미약', '카약용 휴대폰 방수 팩', '보조 배터리와 충전 케이블'] },
          ],
        },
      ],
    },
    {
      id: 'mistakes',
      title: '처음 크루즈 여행자가 자주 하는 실수',
      blocks: [
        {
          ol: [
            '**크루즈 직후로 항공편을 예약하는 것.** 하선, 육로 이동, 공항 체크인에는 모두 시간이 걸립니다. 다음 항공편까지 여유를 넉넉히 두고, 예상 귀항 시간을 크루즈 운영사에 확인하세요.',
            '**엉뚱한 선착장으로 가는 것.** 하롱에는 여객항이 한 곳이 아닙니다. 기사에게 정확한 [체크인 장소](checkin-map)를 알려 주세요. Green Ruby 승객은 뚜언쩌우에서 체크인합니다.',
            '**여권을 호텔에 두고 오는 것.** 원본이 없으면 승선하지 못할 수 있습니다.',
            '**시간을 아끼려고 당일 투어를 고르는 것.** 대부분의 시간을 차 안에서 보내고, 한적한 시간대의 바다는 보지 못합니다.',
            '**겨울에 해변 휴가를 기대하는 것.** 12월부터 2월까지는 수영하기에 쌀쌀하고 흐린 날이 많습니다. 일광욕보다는 풍경 감상에 맞춰 계획하세요.',
            '**식단이나 거동 관련 요청을 미리 알리지 않는 것.** 출발 전에 알려 주셔야 훨씬 수월하게 준비할 수 있습니다.',
          ],
        },
      ],
    },
    {
      id: 'itineraries',
      title: 'Green Ruby 일정',
      blocks: [{ p: '하롱베이와 란하베이에 두 가지씩 모두 네 가지 일정이 예정되어 있으며, 각각 1박 2일 또는 2박 3일 중에서 고를 수 있습니다.' }, { widget: 'itineraries' }],
    },
  ],
  faqTitle: '처음 크루즈를 타는 분들이 자주 묻는 질문',
  faq: [
    { q: '하롱베이 크루즈, 가 볼 만한가요?', a: '하루 중 여러 시간대의 바다 풍경을 보고 여유롭게 쉬고 싶다면 1박 크루즈를 고려해 볼 만합니다. 하노이에서 당일치기로 다녀오면 상당한 시간을 길 위에서 보냅니다.' },
    { q: '하롱베이는 며칠이 적당한가요?', a: '처음이라면 1박 2일로 충분합니다. 데이 보트로 한적한 구역까지 가 보고 느긋하게 여행하고 싶다면 2박 3일을 고르세요.' },
    { q: '하롱베이 크루즈 준비물은 무엇인가요?', a: '여권 원본, 수영복, 미끄러지지 않는 편한 신발, 11월–3월에는 얇은 재킷, 자외선 차단제, 상비약, 카약용 방수 팩을 챙기세요. 여행 가방보다 1박용 작은 가방이 편합니다.' },
    { q: '하롱베이 크루즈에서 뱃멀미를 할까요?', a: '섬으로 둘러싸인 만은 날씨에 따라 다르지만 대개 먼바다보다 잔잔합니다. 다만 바람이 강하면 흔들림이 있을 수 있으니, 멀미에 약하다면 평소 쓰는 약을 챙기세요.' },
    { q: '날씨 때문에 크루즈가 취소될 수도 있나요?', a: '네. 주로 6월부터 10월 사이 폭풍 경보가 내려지면 당국이 짧은 예고로 운항을 중단할 수 있습니다. 이 경우 운영사가 자체 규정에 따라 일정을 바꾸거나 환불합니다.' },
    { q: '몇 시까지 도착해야 하나요?', a: 'Green Ruby가 공개한 일정 기준으로 뚜언쩌우의 Green Ruby VIP 라운지에서 10:45경 체크인이 시작되고, 텐더 보트는 11:45경 출발합니다. 첫 운항이 2027년 2월 예정이므로, 최종 시간과 장소는 출발 전에 예약팀이 확인해 드립니다.' },
  ],
  sourcesTitle: '출처',
  sources: [
    { title: '유네스코 세계유산센터: Ha Long Bay – Cat Ba Archipelago (영어)', url: 'https://whc.unesco.org/en/list/672' },
    { title: 'Tuoi Tre News(2025년 7월 20일): 태풍 위파 접근으로 하롱베이 관광선 출항 금지 (영어)', url: 'https://news.tuoitre.vn/ha-long-bay-tourist-boats-banned-from-departing-as-typhoon-wipha-nears-103250720163544717.htm' },
  ],
  related: {
    title: '이어서 계획하기',
    links: [
      { href: 'transfer', title: '하노이에서 하롱베이 가는 법', body: '차량 이동, 선착장, 현실적인 소요 시간.' },
      { href: 'destinations', title: '하롱베이 가 볼 만한 곳', body: '동굴, 섬, 마을과 실용 정보.' },
      { href: 'luxuryPillar', title: '환경을 생각하는 하롱베이 럭셔리 크루즈', body: '환경 부담을 실제로 줄이는 크루즈의 조건과 그 주장을 확인하는 방법.' },
    ],
  },
  estimateNote: '이 페이지의 이동 시간과 소요 시간은 추정치이며 시간표가 아닙니다. Green Ruby의 일정은 2027년 2월 첫 운항 전까지 잠정적입니다.',
  timeline: {
    label: '선박 선택',
    note: 'Green Ruby가 공개한 일정 기준 시간입니다. 잠정적이며, 당일 날씨와 항만 지시에 따라 바뀔 수 있습니다.',
    tabs: [
      {
        key: 'gr1',
        label: 'Green Ruby 1 · 하롱베이',
        steps: [
          { time: '≈ 07:30', title: '하노이 출발', body: '개인 차량 이동을 요청하신 경우(요청 시, 추가 요금) 하노이에서 7:30–8:00경 픽업하며, 이동에는 약 2.5–3시간(추정)이 걸립니다.' },
          { time: '≈ 10:45', title: '뚜언쩌우 체크인', body: '뚜언쩌우의 Green Ruby VIP 라운지에서 여권 확인, 수하물 전달, 웰컴 드링크.' },
          { time: '≈ 11:45', title: '텐더 보트로 본선까지', body: '하롱베이에 정박한 Green Ruby 1까지 잠시 이동합니다.' },
          { time: '≈ 12:30', title: '안전 브리핑과 객실 안내', body: '레스토랑에서 브리핑을 들은 뒤 객실 키를 받고 짐을 풉니다.' },
          { time: '≈ 13:00', title: '항해 중 점심', body: '점심을 드는 동안 배가 만 안쪽으로 나아갑니다.' },
          { time: '≈ 15:30', title: '첫 번째 투어', body: '카약이나 대나무 보트로 루온 동굴을 둘러본 뒤, 16:30경 티톱섬에 들릅니다.' },
        ],
      },
      {
        key: 'gr2',
        label: 'Green Ruby 2 · 란하베이',
        steps: [
          { time: '≈ 07:30', title: '하노이 출발', body: '개인 차량 이동을 요청하신 경우(요청 시, 추가 요금) 하노이에서 7:30–8:00경 픽업하며, 이동에는 약 2.5–3시간(추정)이 걸립니다.' },
          { time: '≈ 10:45', title: '뚜언쩌우 체크인', body: 'Green Ruby 1 승객과 같은 뚜언쩌우의 Green Ruby VIP 라운지에서 체크인합니다.' },
          { time: '≈ 11:45', title: '텐더 보트로 지아루언 선착장까지', body: '텐더 보트로 깟바섬(하이퐁)의 지아루언 선착장까지 건너간 뒤, 란하베이에서 Green Ruby 2에 승선합니다.' },
          { time: '≈ 12:30', title: '안전 브리핑과 객실 안내', body: '레스토랑에서 브리핑을 들은 뒤 객실 키를 받고 짐을 풉니다.' },
          { time: '≈ 13:00', title: '항해 중 점심', body: '배가 란하베이로 향하는 동안 점심을 듭니다.' },
          { time: '≈ 15:00–15:30', title: '첫 번째 투어', body: '대나무 보트로 다크 앤 브라이트 동굴을 둘러봅니다(카약은 현지 규정에 따라 일시 중단, 2026년 10월 기준).' },
        ],
      },
    ],
  },
  itineraries: { title: 'Green Ruby 일정', days: (n) => `${n - 1}박 ${n}일`, view: '일정 보기' },
};

export default firstTime;
