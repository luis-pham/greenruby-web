import type { GuideContent } from './types';

// Viết cho người đọc Việt: thêm phương án tự lái, giữ nguyên dữ kiện và mức ước tính như bản EN.

const transfer: GuideContent = {
  metaTitle: 'Hà Nội đi Hạ Long: xe limousine, xe riêng và bến du thuyền',
  metaDescription:
    'Từ Hà Nội đi Hạ Long bằng limousine, xe riêng, tự lái hay xe khách; đi từ sân bay Nội Bài, Cát Bi, Vân Đồn; bến Tuần Châu khác cảng tàu khách quốc tế Hạ Long thế nào.',
  breadcrumb: 'Hà Nội đi Hạ Long',
  eyebrow: 'Cẩm nang du thuyền',
  title: 'Từ Hà Nội đi Hạ Long: phương tiện và bến du thuyền',
  lead: 'Các cách đi thực tế từ Hà Nội, sân bay và Ninh Bình đến bến du thuyền, khác biệt giữa các cảng ở Hạ Long, và cách tính giờ đến bến cũng như giờ bay về.',
  summaryTitle: 'Trả lời nhanh',
  summary: [
    ['Nhanh nhất từ Hà Nội', 'Xe riêng, khoảng **2,5–3 giờ** đến Tuần Châu (ước tính).'],
    ['Tiết kiệm', 'Limousine ghép đón tại khách sạn, khoảng **3–3,5 giờ** kể cả đón khách và dừng nghỉ.'],
    ['Sân bay gần nhất', '**Cát Bi** (Hải Phòng) và **Vân Đồn**, mỗi nơi khoảng 1 giờ; Nội Bài mất 2,5–3 giờ.'],
    ['Check-in Green Ruby', 'Tuần Châu, từ khoảng 10:45. Đi xe riêng nên rời trung tâm Hà Nội trước khoảng **07:15**.'],
    ['Bay về', 'Ngày cuối, chọn chuyến bay từ Nội Bài sau khoảng **16:30** (nội địa) hoặc **18:00** (quốc tế).'],
  ],
  updated: { iso: '2026-10-24', label: 'Cập nhật ngày 24/10/2026' },
  tocTitle: 'Nội dung',
  sections: [
    {
      id: 'so-sanh',
      title: 'So sánh các cách đi từ Hà Nội đến Hạ Long',
      blocks: [
        { p: 'Từ trung tâm Hà Nội đến Tuần Châu, nơi nhiều du thuyền ngủ đêm làm thủ tục, khoảng 160–180 km theo cao tốc. Đường tốt; điều làm thời gian chênh lệch là lúc ra khỏi nội thành và việc xe có phải đón thêm khách hay không.' },
        {
          table: {
            head: ['Phương tiện', 'Thời gian (ước tính)', 'Hợp với', 'Cần lưu ý'],
            rows: [
              ['Xe riêng có tài xế', '2,5–3 giờ', 'Gia đình, nhóm, check-in sớm, đón ở sân bay', 'Chi phí cao nhất; chủ động giờ đón'],
              ['Limousine ghép', '3–3,5 giờ', 'Cặp đôi, khách đi một mình muốn tiết kiệm', 'Giờ chạy cố định; đón nhiều khách trong phố cổ'],
              ['Tự lái', '2,5–3 giờ', 'Khách quen đường, muốn chủ động', 'Cần hỏi trước chỗ gửi xe gần bến trong suốt chuyến đi'],
              ['Xe khách + taxi', '3,5–4,5 giờ', 'Tiết kiệm tối đa, không vội', 'Xe khách về Bãi Cháy rồi taxi ra bến; khó kịp check-in buổi sáng'],
            ],
          },
        },
        { note: 'Thời gian là ước tính khi đường thông thoáng, không phải cam kết. Nên dự phòng thêm vào chiều thứ Sáu, chiều Chủ nhật và các dịp lễ như Tết, 30/4–1/5.' },
      ],
    },
    {
      id: 'tinh-gio',
      title: 'Tính giờ di chuyển',
      blocks: [{ p: 'Chọn nơi xuất phát để xem các phương án phù hợp, giờ muộn nhất nên đi để kịp check-in lúc 10:45 và giờ giấc của ngày cuối.' }, { widget: 'transfer-selector' }],
    },
    {
      id: 'limousine',
      title: 'Xe limousine ghép',
      blocks: [
        { p: 'Limousine là xe 9–11 chỗ, ghế ngả. Xe đón khách tại các khách sạn trong và quanh phố cổ, thường trong khoảng 07:00–08:00, dừng nghỉ một lần giữa đường và trả khách tại bến du thuyền.' },
        { ul: ['Hợp lý về chi phí khi đi một, hai người.', 'Riêng việc đón khách có thể mất từ 30 phút trước khi xe ra khỏi thành phố.', 'Chỗ để hành lý có hạn: mỗi người một túi xách tay và một vali cỡ vừa là hợp lý.', 'Chiều về xe chạy sau giờ tàu cập bến buổi sáng, không chọn được giờ.'] },
        { p: 'Giá du thuyền Green Ruby chưa bao gồm xe đưa đón. Theo kế hoạch đã công bố, sẽ có limousine ghép Hà Nội – Hạ Long, tính phí riêng; giờ chạy và giá được xác nhận khi bạn đặt chỗ.' },
      ],
    },
    {
      id: 'xe-rieng',
      title: 'Xe riêng và tự lái',
      blocks: [
        { p: 'Xe riêng có tài xế đón đúng nơi, đúng giờ bạn muốn, chờ nếu chuyến bay trễ và dừng nghỉ khi cần. Đi từ ba người trở lên, chi phí mỗi người có thể không chênh nhiều so với limousine.' },
        { ul: ['Đi cùng trẻ nhỏ, hãy yêu cầu ghế trẻ em khi đặt xe.', 'Thống nhất trước điểm đón và đúng nhà ga cần đến ở bến.', 'Theo kế hoạch đã công bố, Green Ruby nhận đặt xe riêng theo yêu cầu, tính phí riêng.'] },
        { p: '**Tự lái**: đường cao tốc đến Hạ Long thuận tiện. Điều cần chuẩn bị là chỗ gửi xe gần bến trong một, hai đêm; hãy hỏi đội ngũ đặt chỗ trước ngày đi.' },
      ],
    },
    {
      id: 'xe-khach',
      title: 'Xe khách',
      blocks: [{ p: 'Có xe khách từ các bến xe ở Hà Nội đi Bãi Cháy (Hạ Long); từ đó cần thêm taxi ra bến du thuyền. Đây là cách rẻ nhất nhưng chậm và khó đoán giờ nhất, khó kịp check-in buổi sáng nếu không ngủ lại Hạ Long từ hôm trước. Nhà xe và bến thay đổi thường xuyên, nên kiểm tra lịch chạy hiện tại.' }],
    },
    {
      id: 'pho-co',
      title: 'Từ phố cổ Hà Nội đến Tuần Châu',
      blocks: [{ p: 'Phần lớn du khách xuất phát từ phố cổ. Đi xe riêng lúc 07:00–07:15 thường đến Tuần Châu trước giờ check-in 10:45 và vẫn có thời gian dừng nghỉ. Limousine ghép bắt đầu đón khách sớm hơn, thường từ khoảng 07:00.' }],
    },
    {
      id: 'san-bay',
      title: 'Từ sân bay',
      blocks: [
        {
          table: {
            head: ['Sân bay', 'Đến Tuần Châu (ước tính)', 'Ghi chú'],
            rows: [
              ['Nội Bài (HAN), Hà Nội', '2,5–3 giờ', 'Nhiều chuyến nhất. Muốn lên tàu trong ngày phải hạ cánh rất sớm; ngủ lại Hà Nội một đêm sẽ thoải mái hơn.'],
              ['Cát Bi (HPH), Hải Phòng', 'Khoảng 1 giờ', 'Chủ yếu chuyến nội địa, ví dụ từ TP.HCM, Đà Nẵng; gần nhất nếu muốn lên tàu ngay trong ngày.'],
              ['Vân Đồn (VDO), Quảng Ninh', 'Khoảng 1 giờ', 'Ít chuyến, chủ yếu nội địa; tiện nếu lịch bay phù hợp.'],
            ],
          },
        },
        { p: 'Muốn đi thẳng từ Nội Bài ra tàu trong ngày, bạn cần rời sân bay trước khoảng 07:15, tức là hạ cánh trước khoảng 06:30 với chuyến nội địa, hoặc trước khoảng 06:00 với chuyến quốc tế (thủ tục nhập cảnh và hành lý). Phần lớn du khách bay đến từ hôm trước.' },
      ],
    },
    {
      id: 'ninh-binh',
      title: 'Từ Ninh Bình đi Hạ Long',
      blocks: [{ p: 'Nhiều lịch trình kết hợp Ninh Bình và Hạ Long. Đi xe riêng theo cao tốc mất khoảng 3,5–4 giờ (ước tính). Muốn kịp check-in buổi sáng, bạn cần rời Ninh Bình trước khoảng 06:15, hoặc ngủ lại Hà Nội, Hạ Long từ đêm trước. Một số nhà xe limousine chạy thẳng Ninh Bình – Hạ Long; hãy kiểm tra lịch hiện tại.' }],
    },
    {
      id: 'ben-tau',
      title: 'Cảng Tuần Châu hay cảng tàu khách quốc tế Hạ Long?',
      blocks: [
        { p: 'Hạ Long có nhiều cảng hành khách và tài xế đôi khi đưa nhầm. Hai nơi bạn hay gặp trên xác nhận đặt chỗ:' },
        {
          table: {
            head: ['', 'Cảng tàu khách quốc tế Tuần Châu', 'Cảng tàu khách quốc tế Hạ Long'],
            rows: [
              ['Vị trí', 'Đảo Tuần Châu, phía tây Bãi Cháy, có đường bộ nối vào đất liền', 'Bãi Cháy, gần trung tâm Hạ Long hơn'],
              ['Đơn vị sử dụng', 'Nhiều du thuyền ngủ đêm, trong đó có Green Ruby', 'Tàu biển du lịch quốc tế và một số du thuyền'],
              ['Khoảng cách giữa hai cảng', 'Khoảng 20 phút đường bộ (ước tính)', ''],
            ],
          },
        },
        { p: 'Luôn đưa tài xế đúng tên nhà ga ghi trên xác nhận đặt chỗ, đừng chỉ nói "ra vịnh Hạ Long".' },
      ],
    },
    {
      id: 'check-in',
      title: 'Khách Green Ruby check-in ở đâu',
      blocks: [
        { p: 'Khách của cả hai tàu check-in tại **phòng chờ Green Ruby ở Cảng tàu khách quốc tế Tuần Châu**: số 27, Tòa nhà ga 2, Tuần Châu, Hạ Long, Quảng Ninh. [Mở vị trí bến trên Google Maps](checkin-map).' },
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
              ['Lên tàu', 'Xuồng từ Tuần Châu ra tàu đang neo', 'Xuồng từ Tuần Châu sang bến Gia Luận trên đảo Cát Bà (Hải Phòng), rồi lên tàu'],
              ['Về bến', 'Về Tuần Châu, cuối buổi sáng', 'Về Tuần Châu, rời tàu khoảng 11:00'],
            ],
          },
        },
        { p: 'Xe đưa đón của bạn chỉ cần đến Tuần Châu: đoạn sang bến Gia Luận nằm trong phần đưa khách lên Green Ruby 2.' },
      ],
    },
    {
      id: 'chieu-ve',
      title: 'Chiều về và chuyến bay tiếp theo',
      blocks: [
        { p: 'Tàu về Tuần Châu vào cuối buổi sáng; theo các hành trình đã công bố, khách rời tàu khoảng 11:00–11:30. Đi đường bộ, bạn về đến trung tâm Hà Nội hoặc Nội Bài khoảng 14:00–14:30 (ước tính).' },
        { ul: ['Bay nội địa từ Nội Bài: chọn chuyến sau khoảng 16:30.', 'Bay quốc tế từ Nội Bài: chọn chuyến sau khoảng 18:00.', 'Từ Cát Bi hoặc Vân Đồn: chuyến nội địa sau khoảng 14:40 là khả thi.', 'Đi tiếp Ninh Bình: dự kiến đến nơi khoảng 15:00–15:30.'] },
        { note: 'Các mốc trên đã cộng 30 phút dự phòng vào thời gian đường dài hơn, và tính 1,5 giờ (nội địa) hoặc 3 giờ (quốc tế) làm thủ tục ở sân bay. Đây không phải cam kết; thời tiết có thể làm thay đổi giờ tàu về.' },
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
    { q: 'Từ Hà Nội đi Hạ Long mất bao lâu?', a: 'Đi xe riêng từ trung tâm Hà Nội đến Tuần Châu khoảng 2,5–3 giờ; limousine ghép khoảng 3–3,5 giờ kể cả đón khách và dừng nghỉ. Đây là thời gian ước tính, giờ ra khỏi nội thành ảnh hưởng nhiều nhất.' },
    { q: 'Đi Hạ Long bằng phương tiện gì tiện nhất?', a: 'Với đa số du khách, limousine ghép đón tại khách sạn cân bằng tốt giữa chi phí và sự thoải mái. Gia đình, nhóm đông, cần check-in sớm hoặc đón ở sân bay nên chọn xe riêng.' },
    { q: 'Giá du thuyền Green Ruby có gồm xe đưa đón không?', a: 'Không. Xe đưa đón chưa bao gồm trong giá. Theo kế hoạch đã công bố, có limousine ghép và xe riêng theo yêu cầu, tính phí riêng và xác nhận khi đặt chỗ.' },
    { q: 'Sân bay nào gần Hạ Long nhất?', a: 'Cát Bi (Hải Phòng) và Vân Đồn (Quảng Ninh), mỗi nơi cách Tuần Châu khoảng 1 giờ đường bộ. Nội Bài cách khoảng 2,5–3 giờ nhưng có nhiều chuyến bay hơn hẳn.' },
    { q: 'Tự lái xe đi Hạ Long có tiện không?', a: 'Đường cao tốc thuận tiện, thời gian tương đương xe riêng. Điều cần lo trước là chỗ gửi xe gần bến trong suốt chuyến đi; hãy hỏi đội ngũ đặt chỗ trước ngày đi.' },
    { q: 'Du thuyền Green Ruby xuất phát từ đâu?', a: 'Khách của cả hai tàu check-in tại phòng chờ Green Ruby ở Cảng tàu khách quốc tế Tuần Châu. Khách Green Ruby 1 đi xuồng ra tàu trên vịnh Hạ Long; khách Green Ruby 2 đi xuồng sang bến Gia Luận để lên tàu trên vịnh Lan Hạ.' },
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
      shuttle: 'Limousine ghép',
      road: 'Thời gian đường bộ đến Tuần Châu (ước tính)',
      hours: 'giờ',
      minutes: 'phút',
      decimal: ',',
      leaveBy: 'Rời {origin} trước khoảng',
      leaveByShuttle: 'Limousine ghép: sẵn sàng từ khoảng {time}',
      returnTitle: 'Ngày cuối',
      backBy: 'Dự kiến về đến {origin}',
      flightDomestic: 'Chuyến nội địa sớm nhất nên đặt',
      flightInternational: 'quốc tế từ khoảng {time}',
      table: { mode: 'Phương tiện', time: 'Thời gian (ước tính)', notes: 'Ghi chú' },
      note: 'Ước tính khi đường thông thoáng, đã cộng 30 phút dự phòng, cho giờ check-in 10:45 và giờ rời tàu 11:30. Không phải lịch chạy hay cam kết.',
    },
    origins: [
      {
        key: 'hanoi',
        label: 'Hà Nội (phố cổ)',
        routes: [
          { mode: 'Xe riêng', time: '2,5–3 giờ', notes: 'Đón tận nơi, chủ động giờ.' },
          { mode: 'Limousine ghép', time: '3–3,5 giờ', notes: 'Đón tại khách sạn từ khoảng 07:00, dừng nghỉ một lần.' },
          { mode: 'Tự lái', time: '2,5–3 giờ', notes: 'Hỏi trước chỗ gửi xe gần bến.' },
          { mode: 'Xe khách + taxi', time: '3,5–4,5 giờ', notes: 'Về bến xe Bãi Cháy rồi taxi ra bến. Khó kịp check-in buổi sáng.' },
        ],
        tip: 'Ở gần phố cổ thì limousine đón thuận tiện nhất.',
      },
      {
        key: 'noibai',
        label: 'Sân bay Nội Bài (HAN)',
        airport: 'noibai',
        routes: [
          { mode: 'Xe riêng', time: '2,5–3 giờ', notes: 'Tài xế đón ở sảnh đến, chờ nếu chuyến bay trễ.' },
          { mode: 'Taxi hoặc xe công nghệ', time: '2,5–3 giờ', notes: 'Thống nhất giá và đúng nhà ga ở bến trước khi đi.' },
        ],
        tip: 'Muốn lên tàu trong ngày, cần hạ cánh trước khoảng 06:30 (nội địa) hoặc 06:00 (quốc tế). Nếu không, hãy ngủ lại Hà Nội một đêm.',
      },
      {
        key: 'catbi',
        label: 'Sân bay Cát Bi (HPH)',
        airport: 'catbi',
        routes: [
          { mode: 'Xe riêng', time: 'Khoảng 1 giờ', notes: 'Kết nối sân bay nhanh nhất đến Tuần Châu.' },
          { mode: 'Taxi hoặc xe công nghệ', time: 'Khoảng 1 giờ', notes: 'Có sẵn tại sân bay; xác nhận đúng nhà ga ở bến.' },
        ],
        tip: 'Bay nội địa buổi sáng đến Cát Bi vẫn có thể kịp check-in trong ngày.',
      },
      {
        key: 'vandon',
        label: 'Sân bay Vân Đồn (VDO)',
        airport: 'vandon',
        routes: [{ mode: 'Xe riêng hoặc taxi', time: 'Khoảng 1 giờ', notes: 'Ít chuyến bay; nên đặt xe trước.' }],
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
