import type { GuideContent } from './types';

// Viết cho người đọc Việt: thêm phương án tự lái, giữ nguyên dữ kiện và mức ước tính như bản EN.
// 2026-10-24: đồng bộ với bản EN đã biên tập (không nêu giờ bay cố định, không nêu thời gian Cát Bi/Vân Đồn).
// 2026-10-24: đồng bộ với bản EN đã biên tập (không nêu giờ bay cố định, không nêu thời gian Cát Bi/Vân Đồn).

const transfer: GuideContent = {
  metaTitle: 'Hà Nội đi Hạ Long: xe limousine, xe riêng và bến du thuyền',
  metaDescription:
    'Từ Hà Nội đi Hạ Long bằng limousine, xe riêng, tự lái hay xe khách; đi từ sân bay Nội Bài, Cát Bi, Vân Đồn; bến Tuần Châu khác cảng tàu khách quốc tế Hạ Long thế nào.',
  breadcrumb: 'Hà Nội đi Hạ Long',
  eyebrow: 'Cẩm nang',
  title: 'Từ Hà Nội đi Hạ Long: phương tiện và bến du thuyền',
  lead: 'So sánh các cách đi từ Hà Nội, các sân bay lân cận và Ninh Bình đến bến du thuyền Hạ Long: thời gian di chuyển, phương tiện, khác biệt giữa các cảng và những điều cần kiểm tra trước khi đặt xe.',
  summaryTitle: 'Trả lời nhanh',
  summary: [
    ['Nhanh nhất từ Hà Nội', 'Xe riêng, khoảng **2,5–3 giờ** đến Tuần Châu (ước tính).'],
    ['Đi ghép tiện lợi', 'Limousine ghép đón tại khách sạn ở một số khu vực của Hà Nội, khoảng **3–3,5 giờ** tùy điểm đón và giao thông.'],
    ['Đi máy bay', 'Ngoài Nội Bài, có thể bay đến **Cát Bi** (Hải Phòng) hoặc **Vân Đồn** (Quảng Ninh). Thời gian đến Tuần Châu tùy sân bay, tuyến đường và giao thông.'],
    ['Check-in Green Ruby', 'Theo kế hoạch, cả hai tàu đón khách tại Tuần Châu, giờ check-in dự kiến khoảng 10:45. Hãy xác nhận giờ và địa điểm chính xác trước ngày đi.'],
    ['Bay về sau chuyến đi', 'Đừng đặt chuyến bay quá sát giờ rời tàu. Hãy dành đủ thời gian cho đường về, các tình huống chậm trễ và thủ tục sân bay.'],
  ],
  published: '2026-10-24',
  updated: { iso: '2026-10-24', label: 'Cập nhật ngày 24/10/2026' },
  tocTitle: 'Nội dung',
  sections: [
    {
      id: 'so-sanh',
      title: 'So sánh các cách đi từ Hà Nội đến Hạ Long',
      blocks: [
        { p: 'Từ trung tâm Hà Nội đến Tuần Châu, nơi nhiều du thuyền ngủ đêm làm thủ tục, khoảng 160–180 km theo cao tốc. Phần lớn quãng đường đi trên cao tốc; điều làm thời gian chênh lệch là lúc ra khỏi nội thành và việc xe có phải đón thêm khách hay không.' },
        {
          table: {
            head: ['Phương tiện', 'Thời gian (ước tính)', 'Hợp với', 'Cần lưu ý'],
            rows: [
              ['Xe riêng có tài xế', '2,5–3 giờ', 'Gia đình, nhóm nhỏ, check-in sớm, đón ở sân bay', 'Thường có chi phí cao nhất; chủ động giờ đón'],
              ['Limousine ghép', '3–3,5 giờ', 'Cặp đôi, khách đi một mình', 'Giờ chạy do nhà xe quy định; đón thêm khách dọc đường'],
              ['Tự lái', '2,5–3 giờ', 'Khách quen đường, muốn chủ động', 'Cần hỏi trước chỗ gửi xe gần bến trong suốt chuyến đi'],
              ['Xe khách + taxi', '3,5–4,5 giờ', 'Người không vội', 'Xe khách về Bãi Cháy rồi taxi ra bến; khó căn giờ check-in buổi sáng'],
            ],
          },
        },
        { note: 'Thời gian là ước tính khi đường thông thoáng, không phải cam kết. Nên dự phòng thêm vào chiều thứ Sáu, chiều Chủ nhật và các dịp lễ như Tết, 30/4–1/5.' },
      ],
    },
    {
      id: 'tinh-gio',
      title: 'Tính giờ di chuyển',
      blocks: [{ p: 'Chọn nơi xuất phát để xem các phương án chính, khung giờ gợi ý nên xuất phát cho giờ check-in 10:45 và những điều cần tính cho ngày cuối. Hãy dự phòng thêm thời gian cho giao thông, chậm trễ và thủ tục sân bay.' }, { widget: 'transfer-selector' }],
    },
    {
      id: 'limousine',
      title: 'Xe limousine ghép',
      blocks: [
        { p: 'Limousine là xe 9–11 chỗ, ghế ngả. Xe đón khách tại khách sạn ở một số khu vực của Hà Nội, thường quanh phố cổ, thường trong khoảng 07:00–08:00, dừng nghỉ một lần giữa đường và trả khách tại bến du thuyền.' },
        { ul: ['Lựa chọn đi ghép tiện lợi khi đi một, hai người.', 'Riêng việc đón khách có thể mất từ 30 phút trước khi xe ra khỏi thành phố.', 'Chỗ để hành lý có hạn: mỗi người một túi xách tay và một vali cỡ vừa là hợp lý.', 'Giờ xe chiều về thường do nhà xe quy định, sau giờ tàu cập bến buổi sáng.'] },
        { p: 'Giá du thuyền Green Ruby chưa bao gồm xe đưa đón. Theo kế hoạch đã công bố, sẽ có limousine ghép Hà Nội – Hạ Long, tính phí riêng; giờ chạy và giá được xác nhận khi bạn đặt chỗ.' },
      ],
    },
    {
      id: 'xe-rieng',
      title: 'Xe riêng và tự lái',
      blocks: [
        { p: 'Xe riêng linh hoạt nhất, đặc biệt với gia đình, nhóm nhỏ và khách đến từ sân bay: đón tại khách sạn hoặc nhà ga rồi đi thẳng đến điểm check-in. Đi theo nhóm, nên so sánh tổng chi phí xe riêng với tiền vé limousine ghép của cả nhóm.' },
        { ul: ['Xác nhận loại xe và chỗ để hành lý trước khi đặt.', 'Đi cùng trẻ nhỏ, hãy yêu cầu ghế trẻ em từ trước.', 'Gửi thông tin chuyến bay cho nhà xe và hỏi rõ chính sách chờ khi chuyến bay trễ.', 'Bảo đảm tài xế có đúng địa chỉ nhà ga hoặc phòng chờ ở bến.', 'Theo kế hoạch, Green Ruby nhận đặt xe riêng theo yêu cầu, tùy tình trạng xe và tính phí riêng.'] },
        { p: '**Tự lái**: đường cao tốc đến Hạ Long thuận tiện. Điều cần chuẩn bị là chỗ gửi xe gần bến trong một, hai đêm; hãy hỏi đội ngũ đặt chỗ trước ngày đi.' },
      ],
    },
    {
      id: 'xe-khach',
      title: 'Xe khách',
      blocks: [{ p: 'Có xe khách từ các bến xe ở Hà Nội đi Bãi Cháy (Hạ Long); từ đó cần thêm taxi ra bến du thuyền. Đây thường là cách chậm và khó đoán giờ nhất, khó kịp check-in buổi sáng nếu không ngủ lại Hạ Long từ hôm trước. Nhà xe, bến và giá vé thay đổi thường xuyên, nên kiểm tra lịch chạy hiện tại.' }],
    },
    {
      id: 'pho-co',
      title: 'Từ phố cổ Hà Nội đến Tuần Châu',
      blocks: [{ p: 'Phần lớn du khách xuất phát từ phố cổ. Đi xe riêng, khung giờ gợi ý là xuất phát khoảng 06:45–07:15 để có thời gian dự phòng cho giao thông và dừng nghỉ trước giờ check-in 10:45. Limousine ghép đón khách sớm hơn; hãy theo giờ đón nhà xe thông báo.' }],
    },
    {
      id: 'san-bay',
      title: 'Từ sân bay',
      blocks: [
        { p: 'Có ba sân bay có thể cân nhắc khi đi Hạ Long.' },
        {
          table: {
            head: ['Sân bay', 'Lưu ý khi di chuyển'],
            rows: [
              ['Sân bay quốc tế Nội Bài (HAN)', 'Sân bay quốc tế chính của Hà Nội. Dành khoảng 2,5–3,5 giờ hoặc hơn để đến Tuần Châu, tùy giao thông và cách đón.'],
              ['Sân bay quốc tế Cát Bi (HPH)', 'Ở Hải Phòng, tiện cho một số đường bay nội địa; thời gian đến Tuần Châu tùy tuyến đường và giao thông.'],
              ['Sân bay quốc tế Vân Đồn (VDO)', 'Ở Quảng Ninh, là lựa chọn khi có chuyến bay phù hợp. Hãy xác nhận trước thời gian di chuyển và lịch bay.'],
            ],
          },
        },
        { p: '**Có thể bay đến và lên tàu ngay trong ngày không?** Có thể, nếu chuyến bay đến sớm, nhưng sẽ ít thời gian dự phòng cho chuyến bay trễ, thủ tục, nhận hành lý và giao thông. Ngủ lại Hà Nội hoặc gần bến từ đêm trước thường thong thả hơn.' },
      ],
    },
    {
      id: 'ninh-binh',
      title: 'Từ Ninh Bình đi Hạ Long',
      blocks: [{ p: 'Nhiều lịch trình kết hợp Ninh Bình và Hạ Long. Đi xe riêng theo cao tốc mất khoảng 3,5–4 giờ (ước tính). Để kịp check-in buổi sáng, khung giờ gợi ý là xuất phát khoảng 05:45–06:15; ngủ lại Hà Nội hoặc Hạ Long từ đêm trước sẽ thong thả hơn. Một số nhà xe limousine chạy thẳng Ninh Bình – Hạ Long; hãy kiểm tra lịch hiện tại.' }],
    },
    {
      id: 'ben-tau',
      title: 'Cảng Tuần Châu hay cảng tàu khách quốc tế Hạ Long?',
      blocks: [
        { p: 'Hạ Long có nhiều cảng hành khách và tài xế đôi khi đưa nhầm. Hai cảng bạn hay gặp trên xác nhận đặt chỗ là hai địa điểm riêng biệt:' },
        {
          table: {
            head: ['', 'Cảng tàu khách quốc tế Tuần Châu', 'Cảng tàu khách quốc tế Hạ Long'],
            rows: [
              ['Vị trí', 'Đảo Tuần Châu, phía tây Bãi Cháy, có đường bộ nối vào đất liền', 'Bãi Cháy, gần trung tâm Hạ Long hơn'],
              ['Đơn vị sử dụng', 'Nhiều du thuyền ngủ đêm, trong đó có Green Ruby', 'Du thuyền nội địa và tàu biển du lịch quốc tế'],
              ['Khoảng cách giữa hai cảng', 'Khoảng 13–14 km đường bộ', ''],
            ],
          },
        },
        { p: 'Hãy đưa tài xế đúng địa điểm check-in, đừng chỉ nói "ra vịnh Hạ Long".' },
      ],
    },
    {
      id: 'check-in',
      title: 'Khách Green Ruby check-in ở đâu',
      blocks: [
        { p: 'Theo kế hoạch, cả hai tàu Green Ruby đón khách tại **phòng chờ Green Ruby ở Cảng tàu khách quốc tế Tuần Châu**. [Mở vị trí bến trên Google Maps](checkin-map). Xác nhận đặt chỗ sẽ ghi rõ địa điểm và giờ có mặt.' },
        { p: 'Theo các hành trình đã công bố, check-in bắt đầu khoảng 10:45 và xuồng ra tàu khoảng 11:45. Trụ sở pháp lý của công ty là một địa chỉ khác, đừng chỉ tài xế đến đó. Có gì chưa rõ, hãy [liên hệ bộ phận đặt chỗ](contact) trước ngày đi.' },
      ],
    },
    {
      id: 'hai-tau',
      title: 'Green Ruby 1 và Green Ruby 2 lên tàu khác nhau thế nào',
      blocks: [
        {
          table: {
            head: ['', 'Green Ruby 1', 'Green Ruby 2'],
            rows: [
              ['Vịnh', 'Vịnh Hạ Long', 'Vịnh Lan Hạ'],
              ['Check-in', 'Phòng chờ Green Ruby, Tuần Châu', 'Phòng chờ Green Ruby, Tuần Châu'],
              ['Lên tàu (dự kiến)', 'Xuồng từ Tuần Châu ra tàu đang neo', 'Xuồng từ Tuần Châu sang bến Gia Luận trên đảo Cát Bà (Hải Phòng), rồi lên tàu'],
              ['Về bến (dự kiến)', 'Về Tuần Châu, cuối buổi sáng', 'Về Tuần Châu, rời tàu khoảng 11:00'],
            ],
          },
        },
        { p: 'Theo kế hoạch của Green Ruby, cả hai hành trình đều bắt đầu bằng check-in tại Tuần Châu; đoạn sang bến Gia Luận nằm trong phần đưa khách lên Green Ruby 2.' },
      ],
    },
    {
      id: 'chieu-ve',
      title: 'Chiều về và chuyến bay tiếp theo',
      blocks: [
        { p: 'Du thuyền nghỉ đêm thường về bến vào cuối buổi sáng. Theo các hành trình dự kiến của Green Ruby, khách rời tàu tại Tuần Châu khoảng 11:00–11:30.' },
        { p: 'Đường về Hà Nội hoặc sân bay Nội Bài có thể mất vài giờ, tùy giao thông và phương tiện. Nếu bay trong cùng ngày, hãy lưu ý:' },
        {
          ul: [
            '**Bay nội địa từ Nội Bài:** tính đủ thời gian đường bộ và có mặt ở sân bay ít nhất 2 giờ trước giờ bay.',
            '**Bay quốc tế từ Nội Bài:** có mặt ở sân bay ít nhất 3 giờ trước giờ bay, cộng thêm thời gian đường bộ và dự phòng chậm trễ.',
            '**Bay từ Cát Bi hoặc Vân Đồn:** xác nhận trước tuyến đường, thời gian di chuyển và yêu cầu làm thủ tục của sân bay.',
            '**Đi tiếp Ninh Bình:** dành đủ thời gian cho đường bộ, đừng xếp hoạt động ngay sau giờ dự kiến đến nơi.',
          ],
        },
        { p: 'Thời tiết, thay đổi trong vận hành tàu và tình trạng đường sá đều có thể ảnh hưởng đến giờ về.' },
        { note: '**Lời khuyên:** nếu chuyến bay tiếp theo đắt, khó đổi hoặc là chặng nối chuyến quốc tế, hãy cân nhắc ở thêm một đêm trước khi bay. Thời gian trên trang là ước tính, không phải giờ đến được bảo đảm; luôn xác nhận giờ tàu về và lịch xe trước khi chốt các chặng tiếp theo.' },
      ],
    },
    {
      id: 'tre-gio',
      title: 'Nếu chuyến bay hoặc xe bị trễ',
      blocks: [
        {
          ol: [
            '**Báo ngay cho bộ phận đặt chỗ**, kèm số hiệu chuyến bay hoặc giờ dự kiến tài xế đến bến. Thông tin liên hệ ở [trang liên hệ](contact).',
            '**Đừng mặc định tàu sẽ chờ.** Giờ xuồng ra tàu theo lịch trong ngày và quy định của cảng. Có sắp xếp được chuyến xuồng muộn hơn hay không tùy từng ngày và không thể đảm bảo.',
            '**Nếu lỡ tàu**, áp dụng điều kiện hủy và thay đổi trong [câu hỏi thường gặp](faq). Nên có bảo hiểm du lịch chi trả cho trường hợp lỡ chuyến.',
            '**Nếu cơ quan chức năng dừng tàu** vì bão, bạn sẽ được liên hệ để đổi lịch hoặc hoàn tiền theo chính sách đã công bố.',
          ],
        },
      ],
    },
  ],
  faqTitle: 'Câu hỏi về di chuyển',
  faq: [
    { q: 'Từ Hà Nội đi Hạ Long mất bao lâu?', a: 'Từ trung tâm Hà Nội đến Tuần Châu thường mất khoảng 2,5–3,5 giờ, tùy giao thông, điểm xuất phát và việc xe có dừng đón thêm khách hay không.' },
    { q: 'Đi Hạ Long bằng phương tiện gì tiện nhất?', a: 'Xe riêng tiện cho gia đình, nhóm và người muốn đi thẳng. Limousine ghép là lựa chọn thực tế cho cặp đôi và khách đi một mình, nhất là khi có đón tại khách sạn.' },
    { q: 'Giá du thuyền Green Ruby có gồm xe đưa đón không?', a: 'Theo kế hoạch hiện tại, xe đưa đón giữa Hà Nội và Tuần Châu được đặt riêng, không bao gồm trong giá du thuyền tiêu chuẩn. Hãy xác nhận phương án và giá khi đặt chỗ.' },
    { q: 'Sân bay nào gần Hạ Long nhất?', a: 'Cát Bi (Hải Phòng) và Vân Đồn (Quảng Ninh) đều là lựa chọn thay cho Nội Bài (Hà Nội). Sân bay thuận tiện nhất tùy vào lịch bay, điểm khởi hành của du thuyền và phương tiện di chuyển tiếp theo.' },
    { q: 'Tự lái xe đi Hạ Long có tiện không?', a: 'Đường cao tốc thuận tiện, thời gian tương đương xe riêng. Điều cần lo trước là chỗ gửi xe gần bến trong suốt chuyến đi; hãy hỏi đội ngũ đặt chỗ trước ngày đi.' },
    { q: 'Du thuyền Green Ruby xuất phát từ đâu?', a: 'Theo kế hoạch, cả Green Ruby 1 và Green Ruby 2 đón khách tại phòng chờ Green Ruby ở Cảng tàu khách quốc tế Tuần Châu; cách lên tàu của hai tàu khác nhau. Xác nhận đặt chỗ sẽ ghi rõ địa điểm, giờ có mặt và hướng dẫn di chuyển.' },
  ],
  related: {
    title: 'Chuẩn bị tiếp',
    links: [
      { href: 'firstTime', title: 'Lần đầu đi du thuyền Hạ Long?', body: 'Cần biết gì, mang gì và ngày lên tàu diễn ra thế nào.' },
      { href: 'itineraries', title: 'Các hành trình Green Ruby', body: 'Hai vịnh, 2 ngày 1 đêm hoặc 3 ngày 2 đêm.' },
      { href: 'faq', title: 'Câu hỏi thường gặp', body: 'Đặt chỗ, thanh toán, hủy và sinh hoạt trên tàu.' },
    ],
  },
  estimateNote: 'Mọi thời gian trên trang này là ước tính trong điều kiện bình thường, không phải lịch chạy hay cam kết. Thông tin check-in và lên tàu theo kế hoạch Green Ruby đã công bố, có thể điều chỉnh trước khi tàu chính thức hoạt động, dự kiến từ tháng 2/2027.',
  selector: {
    labels: {
      title: 'Các cách đến Tuần Châu từ {origin}',
      origin: 'Bạn xuất phát từ đâu?',
      road: 'Thời gian đường bộ đến Tuần Châu (ước tính)',
      hours: 'giờ',
      minutes: 'phút',
      decimal: ',',
      roadUnknown: 'Tùy tuyến đường và giao thông. Hãy hỏi nhà xe thời gian di chuyển.',
      depart: 'Khung giờ gợi ý nên xuất phát',
      departShuttle: 'Limousine ghép thường đón sớm hơn, khoảng {from}–{to}; hãy theo giờ đón nhà xe thông báo.',
      departNote: 'Đã gồm thời gian dự phòng cho giao thông. Cuối tuần và dịp lễ nên đi sớm hơn.',
      departUnknown: 'Thống nhất với nhà xe để đến Tuần Châu trước giờ check-in 10:45, có thời gian dự phòng.',
      lastDay: 'Ngày cuối: giờ rời tàu (dự kiến)',
      disembark: 'Giờ về có thể thay đổi theo thời tiết và vận hành.',
      returnBack: 'Dự kiến về đến {origin} khoảng {from}–{to}, không bảo đảm.',
      airportAdvice: 'Nên có mặt ở sân bay ít nhất 2 giờ trước chuyến nội địa và 3 giờ trước chuyến quốc tế, sau khi tính đủ thời gian đường bộ.',
      table: { mode: 'Phương tiện', time: 'Thời gian (ước tính)', notes: 'Ghi chú' },
      note: 'Chỉ là gợi ý, tính theo giờ check-in dự kiến 10:45 và giờ rời tàu 11:00–11:30. Không phải lịch chạy hay cam kết: hãy dự phòng thêm cho giao thông, chậm trễ và thủ tục sân bay.',
    },
    origins: [
      {
        key: 'hanoi',
        label: 'Hà Nội (phố cổ)',
        routes: [
          { mode: 'Xe riêng', time: '2,5–3 giờ', notes: 'Đón tận nơi, chủ động giờ.' },
          { mode: 'Limousine ghép', time: '3–3,5 giờ', notes: 'Đón tại khách sạn ở một số khu vực, thường từ khoảng 07:00, dừng nghỉ một lần.' },
          { mode: 'Tự lái', time: '2,5–3 giờ', notes: 'Hỏi trước chỗ gửi xe gần bến.' },
          { mode: 'Xe khách + taxi', time: '3,5–4,5 giờ', notes: 'Về bến xe Bãi Cháy rồi taxi ra bến. Khó căn giờ check-in buổi sáng.' },
        ],
        tip: 'Ở gần phố cổ thường thuận tiện nhất cho limousine đón.',
      },
      {
        key: 'noibai',
        label: 'Sân bay Nội Bài (HAN)',
        airport: 'noibai',
        routes: [
          { mode: 'Xe riêng', time: '2,5–3,5 giờ', notes: 'Đặt trước, tài xế đón ở sảnh đến; hỏi rõ chính sách chờ khi chuyến bay trễ.' },
          { mode: 'Taxi hoặc xe công nghệ', time: '2,5–3,5 giờ', notes: 'Thống nhất giá và đúng nhà ga ở bến trước khi đi.' },
        ],
        tip: 'Lên tàu ngay trong ngày cần chuyến bay đến sớm và ít chỗ dự phòng. Ngủ lại Hà Nội từ đêm trước thường an toàn hơn.',
      },
      {
        key: 'catbi',
        label: 'Sân bay Cát Bi (HPH)',
        airport: 'catbi',
        routes: [
          { mode: 'Xe riêng', time: 'Tùy tuyến', notes: 'Hỏi nhà xe tuyến đường và thời gian đến Tuần Châu.' },
          { mode: 'Taxi hoặc xe công nghệ', time: 'Tùy tuyến', notes: 'Có sẵn tại sân bay; xác nhận đúng nhà ga ở bến.' },
        ],
        tip: 'Tiện cho một số đường bay nội địa; hãy kiểm tra thời gian di chuyển trước khi chọn bay đến và lên tàu trong ngày.',
      },
      {
        key: 'vandon',
        label: 'Sân bay Vân Đồn (VDO)',
        airport: 'vandon',
        routes: [{ mode: 'Xe riêng hoặc taxi', time: 'Tùy tuyến', notes: 'Ít chuyến bay; nên đặt xe trước và hỏi rõ thời gian di chuyển.' }],
        tip: 'Kiểm tra kỹ ngày bay: lịch bay ở Vân Đồn khá thưa.',
      },
      {
        key: 'ninhbinh',
        label: 'Ninh Bình',
        routes: [
          { mode: 'Xe riêng', time: '3,5–4 giờ', notes: 'Đón tận nơi, đi theo cao tốc.' },
          { mode: 'Limousine', time: '4–4,5 giờ', notes: 'Một số nhà xe chạy thẳng; kiểm tra lịch hiện tại.' },
        ],
        tip: 'Đi từ Ninh Bình lúc tờ mờ sáng khá mệt; ngủ lại Hà Nội hoặc Hạ Long trước một đêm sẽ thong thả hơn.',
      },
    ],
  },
  itineraries: { title: 'Các hành trình Green Ruby', days: (n) => `${n} ngày ${n - 1} đêm`, view: 'Xem hành trình' },
};

export default transfer;
