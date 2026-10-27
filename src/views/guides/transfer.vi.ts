import type { GuideContent } from './types';

// Viết cho người đọc Việt: thêm phương án tự lái, giữ nguyên dữ kiện và mức ước tính như bản EN.
// 2026-10-24: đồng bộ với bản EN đã biên tập (không nêu giờ bay cố định, không nêu thời gian Cát Bi/Vân Đồn).
// 2026-10-27: thêm bảng nhà xe (dữ liệu chung trong operators.ts), giá vé, Ninh Bình, chiều về, mẹo đặt xe;
// sửa giờ đón limousine cho khớp giờ check-in 10:45 (đón khoảng 06:00–06:30, không phải 07:00–08:00).

const transfer: GuideContent = {
  metaTitle: 'Hà Nội đi Hạ Long: xe limousine, giá vé và bến du thuyền',
  metaDescription:
    'Từ Hà Nội đi Hạ Long bằng limousine, xe riêng hay xe khách: nhà xe, giá vé, giờ chạy cập nhật tháng 10/2026; từ Nội Bài, Ninh Bình, Tam Cốc đến cảng Tuần Châu.',
  breadcrumb: 'Hà Nội đi Hạ Long',
  eyebrow: 'Cẩm nang',
  title: 'Từ Hà Nội đi Hạ Long: phương tiện và bến du thuyền',
  lead: 'So sánh các cách đi từ Hà Nội, sân bay Nội Bài, Ninh Bình và các sân bay lân cận đến bến du thuyền Hạ Long: nhà xe có công bố giá và giờ chạy, khác biệt giữa các cảng, và phương án nào kịp giờ check-in buổi sáng ở Tuần Châu.',
  summaryTitle: 'Trả lời nhanh',
  summary: [
    ['Nhanh nhất từ Hà Nội', 'Xe riêng, khoảng **2,5–3 giờ** đến Tuần Châu (ước tính). Một nhà xe công bố bao xe limousine 9 chỗ **từ 2.800.000đ**.'],
    ['Limousine ghép', 'Khoảng **250.000–360.000đ/ghế**, đón tại khách sạn ở trung tâm Hà Nội. Để kịp check-in 10:45, chọn chuyến rời Hà Nội trước khoảng **07:00**.'],
    ['Từ Ninh Bình, Tam Cốc', 'Mất **3,5–4,5 giờ**. Không có xe ghép nào chắc chắn đến Tuần Châu trước 10:45; nên ngủ lại Hạ Long từ tối hôm trước hoặc đi xe riêng từ sáng sớm.'],
    ['Đi máy bay', 'Từ Nội Bài có limousine ghép đi Hạ Long mỗi giờ (**600.000đ/ghế** cho 1 khách). Từ Cát Bi hoặc Vân Đồn, nên đặt xe riêng.'],
    ['Check-in Green Ruby', 'Theo kế hoạch, cả hai tàu đón khách tại Cảng tàu khách quốc tế Tuần Châu, giờ check-in dự kiến khoảng 10:45.'],
    ['Sau chuyến đi', 'Giờ rời tàu dự kiến khoảng 11:00–11:30. Nên đặt xe về rời Tuần Châu từ 12:00 trở đi và đừng đặt chuyến bay quá sát giờ này.'],
  ],
  published: '2026-10-24',
  updated: { iso: '2026-10-27', label: 'Cập nhật ngày 27/10/2026' },
  tocTitle: 'Nội dung',
  sections: [
    {
      id: 'so-sanh',
      title: 'So sánh các cách đi từ Hà Nội đến Hạ Long',
      blocks: [
        { p: 'Từ trung tâm Hà Nội đến Tuần Châu, nơi nhiều du thuyền ngủ đêm làm thủ tục, khoảng 160–180 km. Phần lớn quãng đường đi trên cao tốc; điều làm thời gian chênh lệch là lúc ra khỏi nội thành và việc xe có phải đón thêm khách hay không.' },
        {
          table: {
            head: ['Phương tiện', 'Thời gian (ước tính)', 'Giá công bố (10/2026)', 'Hợp với', 'Cần lưu ý'],
            rows: [
              ['Xe riêng có tài xế', '2,5–3 giờ', 'Từ 2.800.000đ/xe 9 chỗ', 'Gia đình, nhóm nhỏ, check-in sớm, đón ở sân bay', 'Chủ động giờ đón; đi nhóm nên so với tổng tiền vé ghép'],
              ['Limousine ghép', '3–3,5 giờ', '250.000–360.000đ hoặc 15 USD/ghế', 'Cặp đôi, khách đi một mình', 'Giờ chạy cố định; đón thêm khách dọc đường; mỗi nhà xe có quy định riêng khi vào cảng'],
              ['Tự lái', '2,5–3 giờ', 'Phí cao tốc, xăng, gửi xe', 'Khách quen đường, muốn chủ động', 'Cần hỏi trước chỗ gửi xe gần bến trong suốt chuyến đi'],
              ['Xe khách cao tốc', '2,5 giờ từ bến Mỹ Đình, chưa tính đường ra bến', 'Khoảng 160.000đ/ghế', 'Người muốn tiết kiệm, không vội', 'Đi từ bến xe, không đón tại khách sạn; khó căn giờ check-in buổi sáng'],
            ],
          },
        },
        { note: 'Thời gian là ước tính khi đường thông thoáng, không phải cam kết. Nên dự phòng thêm vào chiều thứ Sáu, chiều Chủ nhật và các dịp lễ như Tết, 30/4–1/5; nhà xe cũng có thể tăng giá vào những dịp này.' },
      ],
    },
    {
      id: 'tinh-gio',
      title: 'Tính giờ di chuyển',
      blocks: [
        { p: 'Chọn nơi xuất phát để xem các phương án chính, khung giờ gợi ý cho giờ check-in 10:45, giá vé đã công bố, các nhà xe đã kiểm tra và những điều cần tính cho ngày cuối. Hãy dự phòng thêm thời gian cho giao thông, chậm trễ và thủ tục sân bay.' },
        { widget: 'transfer-selector' },
      ],
    },
    {
      id: 'pho-co',
      title: 'Từ phố cổ Hà Nội đến Tuần Châu: nhà xe và giờ chạy',
      blocks: [
        { p: 'Phần lớn du khách xuất phát từ phố cổ. Đi xe riêng, khung giờ gợi ý là khoảng 06:45–07:15 để có thời gian dự phòng cho giao thông và dừng nghỉ trước giờ check-in 10:45. Đi limousine ghép, hãy đặt chuyến **rời Hà Nội trước khoảng 07:00**: xe bắt đầu đón trước giờ chạy 30–60 phút, nên bạn sẽ được đón trong khoảng 06:00–06:30.' },
        { p: 'Các chuyến xe ghép rời Hà Nội từ 08:00 trở đi đến Tuần Châu quá sát hoặc sau giờ check-in. Chuyến 08:00 duy nhất của Cat Ba Express, theo thời gian nhà xe công bố, đến khoảng 10:40.' },
        { operators: ['hanoi-halong'], caption: 'Hà Nội → Hạ Long: nhà xe có công bố tuyến' },
        { p: '“Tuần Châu” trên lịch chạy có thể là quán cà phê gần cảng, cổng cảng hoặc chính nhà ga. Trước khi trả tiền, hãy hỏi nhà xe có trả tại **Cảng tàu khách quốc tế Tuần Châu** không (không phải cảng tàu khách quốc tế Hạ Long ở Bãi Cháy). Ví dụ, Hạ Long Travel Limousine không chở khách đi một mình vào trong cảng: khách xuống trước cổng và đi bộ vào; nhóm từ 2 người được chở vào trong, phụ phí vào cảng 30.000đ.' },
      ],
    },
    {
      id: 'limousine',
      title: 'Xe limousine ghép',
      blocks: [
        { p: 'Limousine là xe 9–11 chỗ, ghế ngả. Phần lớn nhà xe đón khách tại khách sạn ở trung tâm Hà Nội, dừng nghỉ một lần giữa đường và trả khách tại điểm cố định hoặc địa chỉ ở Hạ Long. Các nhà xe ở bảng trên chạy nhiều chuyến mỗi ngày, nên có thể chọn chuyến hợp với giờ check-in.' },
        {
          ul: [
            'Lựa chọn đi ghép tiện lợi khi đi một, hai người.',
            'Riêng việc đón khách có thể mất từ 30 phút trước khi xe ra khỏi thành phố.',
            'Giá ghế có thể khác nhau theo vị trí: ghế giữa “VIP” thường đắt hơn ghế đầu và ghế cuối.',
            'Chỗ để hành lý có hạn: mỗi người một túi xách tay và một vali cỡ vừa là hợp lý.',
            'Xe chiều về chạy theo lịch của nhà xe; hãy đặt chuyến sau giờ rời tàu buổi sáng.',
          ],
        },
        { p: 'Giá du thuyền Green Ruby chưa bao gồm xe đưa đón. Theo kế hoạch, Green Ruby sẽ có xe ghép và xe riêng Hà Nội – Hạ Long, tính phí riêng; giờ chạy và giá được xác nhận khi bạn đặt chỗ, sau khi tàu bắt đầu hoạt động.' },
      ],
    },
    {
      id: 'xe-rieng',
      title: 'Xe riêng và tự lái',
      blocks: [
        { p: 'Xe riêng linh hoạt nhất, đặc biệt với gia đình, nhóm nhỏ và khách đến từ sân bay: đón tại khách sạn hoặc nhà ga rồi đi thẳng đến điểm check-in.' },
        { p: 'Ít nhà xe công bố giá xe riêng. Hạ Long Travel Limousine ghi giá bao xe limousine 9 hoặc 10 chỗ từ 2.800.000–3.000.000đ một chiều từ Hà Nội, và 3.000.000–3.200.000đ từ sân bay Nội Bài. Đi từ 4 người trở lên, mức này có thể tương đương tổng tiền vé ghép.' },
        {
          ul: [
            'Xác nhận loại xe và chỗ để hành lý trước khi đặt.',
            'Hỏi rõ giá đã gồm phí cao tốc, gửi xe và phí vào cảng chưa.',
            'Đi cùng trẻ nhỏ, hãy yêu cầu ghế trẻ em từ trước.',
            'Gửi thông tin chuyến bay cho nhà xe và hỏi rõ chính sách chờ khi chuyến bay trễ.',
            'Bảo đảm tài xế có đúng địa chỉ nhà ga hoặc phòng chờ ở bến.',
          ],
        },
        { p: '**Tự lái**: đường cao tốc đến Hạ Long thuận tiện. Điều cần chuẩn bị là chỗ gửi xe gần bến trong một, hai đêm; hãy hỏi đội ngũ đặt chỗ trước ngày đi.' },
      ],
    },
    {
      id: 'xe-khach',
      title: 'Xe khách',
      blocks: [
        { p: 'Có xe khách từ các bến xe ở Hà Nội đi Hạ Long. Kumho Việt Thanh công bố tuyến cao tốc từ bến xe Mỹ Đình (06:30, 09:30, 11:30, 13:30, 15:30, 17:30; khoảng 160.000đ), danh sách điểm dừng ở Hạ Long có Tuần Châu, tuy website có vẻ không cập nhật từ năm 2022. Các tuyến khác dừng ở Bãi Cháy, từ đó cần thêm taxi ra bến.' },
        { p: 'Kể cả chuyến 06:30 cũng khó kịp check-in 10:45 khi tính thêm đường ra bến Mỹ Đình và đoạn từ điểm dừng vào cảng. Xe khách hợp hơn nếu bạn ngủ lại Hạ Long từ tối hôm trước.' },
      ],
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
              ['Sân bay quốc tế Nội Bài (HAN)', 'Sân bay quốc tế chính của Hà Nội. Dành khoảng 2,5–3,5 giờ hoặc hơn để đến Tuần Châu. Limousine ghép và xe riêng đi Hạ Long ở bảng dưới.'],
              ['Sân bay quốc tế Cát Bi (HPH)', 'Ở Hải Phòng, cách Tuần Châu khoảng 40 km đường bộ. Chưa tìm thấy xe ghép chạy theo lịch đến Tuần Châu; nên đặt xe riêng. Giá trên các trang đại lý từ khoảng 60–120 USD/xe.'],
              ['Sân bay quốc tế Vân Đồn (VDO)', 'Ở Quảng Ninh, cách Tuần Châu khoảng 60–70 km. Ít chuyến bay; xe buýt sân bay đi Hòn Gai và Bãi Cháy, không đến Tuần Châu. Nên đặt xe riêng và hỏi rõ thời gian di chuyển.'],
            ],
          },
        },
        { h3: 'Từ sân bay Nội Bài đi Hạ Long: nhà xe' },
        { operators: ['noibai-halong'], caption: 'Sân bay Nội Bài → Hạ Long' },
        { p: '**Có thể bay đến và lên tàu ngay trong ngày không?** Có thể, nếu chuyến bay đến sớm, nhưng sẽ ít thời gian dự phòng cho chuyến bay trễ, thủ tục, nhận hành lý và giao thông. Ngủ lại Hà Nội hoặc gần bến từ đêm trước thường thong thả hơn.' },
      ],
    },
    {
      id: 'ninh-binh',
      title: 'Từ Ninh Bình, Tam Cốc đi Hạ Long',
      blocks: [
        { p: 'Nhiều lịch trình kết hợp Ninh Bình và Hạ Long. Xe thường đi quốc lộ 10 hướng Hải Phòng, không qua Hà Nội, mất khoảng 3,5–4 giờ đi xe riêng và 4–4,5 giờ đi xe ghép. Phần lớn nhà xe đón ở Tam Cốc, nơi nhiều du khách lưu trú; có nhà xe đón cả ở khách sạn tại Tràng An, Bái Đính và thành phố Ninh Bình.' },
        { h3: 'Đi từ Ninh Bình buổi sáng có kịp check-in 10:45 không?' },
        { p: 'Đi xe ghép thì không chắc chắn. Chuyến sớm nhất do chính nhà xe công bố là xe 06:40 của Full Moon Travel từ Tam Cốc, theo lịch đến Tuần Châu 10:30, nhưng một trang khác trên cùng website ghi 11:00. Cat Ba Express rời Tam Cốc lúc 07:00, không công bố giờ đến. Ninh Bình Express Bus chạy từ 07:00–07:30 và mất khoảng 4,5 giờ. Một số nền tảng đặt vé có chuyến sớm hơn, nhưng nhà xe không tự công bố nên chúng tôi không đưa vào.' },
        {
          ol: [
            '**Ngủ lại Hạ Long từ tối hôm trước** (nên chọn). Tuần Châu và Bãi Cháy đều có khách sạn; từ Bãi Cháy đến cảng khoảng 13–14 km. Đi xe chiều từ Ninh Bình hôm trước.',
            '**Đi xe riêng từ sáng sớm.** Rời Tam Cốc khoảng 05:45–06:15 để kịp check-in 10:45.',
            '**Chỉ đi xe ghép nếu du thuyền của bạn check-in muộn hơn trong ngày**, và chọn điểm trả ở Tuần Châu thay vì Bãi Cháy.',
          ],
        },
        { h3: 'Ninh Bình → Hạ Long: nhà xe' },
        { operators: ['ninhbinh-halong'] },
        { p: 'Một số xe trả ở Bãi Cháy hoặc trung tâm Hạ Long trước. Nếu xe chỉ đến Bãi Cháy, đi taxi hoặc xe công nghệ ra Tuần Châu, dự trù khoảng 20–30 phút.' },
        { h3: 'Sau chuyến đi: Hạ Long → Ninh Bình, Tam Cốc' },
        { p: 'Chiều về dễ hơn. Xe 12:30 của Full Moon Travel xuất phát từ trung tâm Hạ Long rồi đón ở Tuần Châu, đến Ninh Bình khoảng 16:30. Cat Ba Express chạy lúc 11:40, khá sát nếu rời tàu lúc 11:00–11:30. Ninh Bình Express Bus có chuyến trưa nhưng các trang của nhà xe ghi hai giờ khác nhau. Xe riêng từ khoảng 1.600.000đ theo giá một đại lý du lịch công bố.' },
        { operators: ['halong-ninhbinh'] },
      ],
    },
    {
      id: 'meo-dat-xe',
      title: 'Kinh nghiệm đặt xe',
      blocks: [
        {
          ul: [
            '**Đặt trước.** Xe ghép nên đặt trước ít nhất một ngày, cuối tuần và dịp lễ nên đặt sớm hơn. Xe riêng và xe đón sân bay nên đặt trước chuyến đi.',
            '**Nhắn Zalo hoặc WhatsApp.** Phần lớn nhà xe trả lời tin nhắn nhanh hơn điện thoại, và có xác nhận bằng chữ để đưa khách sạn hoặc tài xế xem.',
            '**Xác nhận điểm đón.** Gửi tên và địa chỉ khách sạn, hỏi khung giờ đón. Có nhà xe đón ở điểm cố định gần đó thay vì tận cửa, nên hỏi rõ chỗ đứng chờ.',
            '**Hỏi rõ về Tuần Châu.** Hỏi “Xe có trả tại Cảng tàu khách quốc tế Tuần Châu không?” và đi một mình thì được chở vào trong cảng hay xuống ở cổng.',
            '**Hỏi các khoản phụ phí.** Phí vào cảng, đón thêm điểm, đón đêm khuya, phí chờ ở sân bay và phụ thu dịp lễ có thể tính thêm. Hỏi trước khi trả tiền.',
            '**Hành lý lớn.** Báo trước nếu có vali lớn, túi gậy golf hoặc xe đẩy em bé. Xe ghép thường cho mỗi khách 1 vali cỡ vừa và 1 túi nhỏ.',
            '**Đi cùng trẻ nhỏ.** Xe ghép thường không có ghế trẻ em; đi xe riêng hãy yêu cầu trước. Hỏi trẻ em có tính vé đủ không: có nhà xe tính đủ một ghế từ khoảng 3 tuổi.',
            '**Nếu xe đến muộn,** nhắn nhà xe kèm tên người đặt. Nếu trễ quá 15–20 phút mà bạn đang đi lên tàu, báo luôn cho bộ phận đặt chỗ của du thuyền.',
          ],
        },
      ],
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
        { p: 'Theo các hành trình đã công bố, check-in bắt đầu khoảng 10:45 và xuồng ra tàu khoảng 11:45. Các nhà xe trên trang này trả khách ở Tuần Châu nhưng không nhất thiết đến tận phòng chờ Green Ruby: hãy gửi tài xế vị trí trên bản đồ. Trụ sở pháp lý của công ty là một địa chỉ khác, đừng chỉ tài xế đến đó. Có gì chưa rõ, hãy [liên hệ bộ phận đặt chỗ](contact) trước ngày đi.' },
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
        { p: 'Theo kế hoạch của Green Ruby, cả hai hành trình đều bắt đầu bằng check-in tại Tuần Châu; đoạn sang bến Gia Luận nằm trong phần đưa khách lên Green Ruby 2, bạn không cần tự lo xe ra Cát Bà. Chưa biết chọn vịnh nào? Xem [nên chọn vịnh Hạ Long hay Lan Hạ](bayComparison).' },
      ],
    },
    {
      id: 'chieu-ve',
      title: 'Chiều về và chuyến bay tiếp theo',
      blocks: [
        { p: 'Du thuyền nghỉ đêm thường về bến vào cuối buổi sáng. Theo các hành trình dự kiến của Green Ruby, khách rời tàu tại Tuần Châu khoảng 11:00–11:30. Nên chọn xe rời Tuần Châu từ 12:00 trở đi; chuyến sớm hơn ít chỗ dự phòng nếu xuồng về trễ.' },
        { h3: 'Từ Tuần Châu về Hà Nội và sân bay Nội Bài: nhà xe' },
        { operators: ['halong-hanoi', 'halong-noibai'] },
        { p: 'Đường về Hà Nội hoặc sân bay Nội Bài mất khoảng 2,5–3 giờ, chưa tính thời gian trả khách. Nếu bay trong cùng ngày, hãy lưu ý:' },
        {
          ul: [
            '**Bay nội địa từ Nội Bài:** tính đủ thời gian đường bộ và có mặt ở sân bay ít nhất 2 giờ trước giờ bay.',
            '**Bay quốc tế từ Nội Bài:** có mặt ở sân bay ít nhất 3 giờ trước giờ bay, cộng thêm thời gian đường bộ và dự phòng chậm trễ.',
            '**Bay từ Cát Bi hoặc Vân Đồn:** chưa tìm thấy xe ghép chạy theo lịch từ Tuần Châu; hãy đặt xe riêng và xác nhận thời gian di chuyển, yêu cầu làm thủ tục của sân bay.',
            '**Đi tiếp Ninh Bình:** xem các chuyến chiều ở [phần Ninh Bình](#ninh-binh), đừng xếp hoạt động ngay sau giờ dự kiến đến nơi.',
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
    { q: 'Xe limousine Hà Nội đi Hạ Long giá bao nhiêu?', a: 'Khi chúng tôi kiểm tra vào tháng 10/2026, các nhà xe công bố giá limousine ghép khoảng 250.000–360.000đ hoặc 15 USD một chiều mỗi ghế; bao xe limousine 9 chỗ từ 2.800.000đ. Giá có thể thay đổi, hãy hỏi lại khi đặt.' },
    { q: 'Đi Hạ Long bằng phương tiện gì tiện nhất?', a: 'Xe riêng tiện cho gia đình, nhóm và người muốn đi thẳng. Limousine ghép là lựa chọn thực tế cho cặp đôi và khách đi một mình. Để kịp check-in 10:45, chọn xe rời Hà Nội trước khoảng 07:00.' },
    { q: 'Từ Ninh Bình, Tam Cốc đi Hạ Long thế nào?', a: 'Có limousine ghép từ Tam Cốc và Ninh Bình đi Hạ Long, một số trả ở Tuần Châu. Xe mất khoảng 4–4,5 giờ và không có chuyến nào chắc chắn đến trước giờ check-in 10:45, nên ngủ lại Hạ Long từ tối hôm trước hoặc đi xe riêng từ khoảng 06:00.' },
    { q: 'Giá du thuyền Green Ruby có gồm xe đưa đón không?', a: 'Theo kế hoạch hiện tại, xe đưa đón giữa Hà Nội và Tuần Châu được đặt riêng, không bao gồm trong giá du thuyền tiêu chuẩn. Hãy xác nhận phương án và giá khi đặt chỗ.' },
    { q: 'Sân bay nào gần Hạ Long nhất?', a: 'Sân bay Cát Bi (Hải Phòng) cách Tuần Châu khoảng 40 km đường bộ, sân bay Vân Đồn khoảng 60–70 km; từ Nội Bài đi mất khoảng 3 giờ. Nội Bài có nhiều chuyến bay hơn hẳn và là nơi duy nhất có limousine ghép đi Hạ Long theo lịch mà chúng tôi xác minh được.' },
    { q: 'Tự lái xe đi Hạ Long có tiện không?', a: 'Đường cao tốc thuận tiện, thời gian tương đương xe riêng. Điều cần lo trước là chỗ gửi xe gần bến trong suốt chuyến đi; hãy hỏi đội ngũ đặt chỗ trước ngày đi.' },
    { q: 'Từ Hạ Long ra sân bay Nội Bài sau chuyến du thuyền thế nào?', a: 'Có limousine ghép từ Hạ Long ra Nội Bài suốt buổi chiều, hoặc đặt xe riêng theo giờ. Dự trù khoảng 3 giờ đường bộ cộng thời gian làm thủ tục cho chuyến bay.' },
    { q: 'Du thuyền Green Ruby xuất phát từ đâu?', a: 'Theo kế hoạch, cả Green Ruby 1 và Green Ruby 2 đón khách tại phòng chờ Green Ruby ở Cảng tàu khách quốc tế Tuần Châu; cách lên tàu của hai tàu khác nhau. Xác nhận đặt chỗ sẽ ghi rõ địa điểm, giờ có mặt và hướng dẫn di chuyển.' },
  ],
  sourcesTitle: 'Nguồn tham khảo',
  sources: [
    { title: 'Ban Quản lý vịnh Hạ Long: hành trình VHL1 (xuất phát từ Cảng tàu khách quốc tế Tuần Châu hoặc Hạ Long)', url: 'https://halongbay.com.vn/tours/1-hanh-trinh-vhl1-cang-tau-dong-thien-cung-hang-dau-go-hon-cho-da-hang-ba-hang-hon-dinh-huong-hon-trong-mai' },
    { title: 'VietnamPlus/TTXVN (22/4/2022): Cảng Nội Bài khuyến nghị có mặt trước giờ bay 2 giờ (nội địa), 3 giờ (quốc tế)', url: 'https://www.vietnamplus.vn/luu-y-hanh-khach-qua-san-bay-noi-bai-dip-cao-diem-nghi-le-post786190.vnp' },
    { title: 'Báo VTC News (20/7/2025): Tạm dừng tất cả tour du lịch trên vịnh Hạ Long trước giờ bão Wipha đổ bộ', url: 'https://vtcnews.vn/tam-dung-tat-ca-tour-du-lich-tren-vinh-ha-long-truoc-gio-bao-wipha-do-bo-ar955340.html' },
    { title: 'Hạ Long Travel Limousine: quy trình đón trả, quy định vào cảng Tuần Châu', url: 'https://xehalong.vn/quy-trinh-don-tra' },
    { title: 'Hạ Long Travel Limousine: xe limousine Nội Bài – Hạ Long (ghép và bao xe)', url: 'https://xehalong.vn/xe-limousine-noi-bai-ha-long-cam-pha/' },
    { title: 'Cat Ba Express: limousine Hà Nội – Hạ Long (điểm trả ở Tuần Châu và Bãi Cháy)', url: 'https://catbaexpress.com/bus-hanoi-to-halong.html' },
    { title: 'Full Moon Travel: lịch xe Ninh Bình – Hạ Long', url: 'https://fullmoontravelasia.com/ninh-binh-to-halong-bay-by-bus/' },
    { title: 'Ninh Bình Express Bus: lịch trình và giá xe limousine Ninh Bình – Hạ Long', url: 'https://ninhbinhexpressbus.com/lich-trinh-xe-limousine-ninh-binh-di-ha-long/' },
    { title: 'VinWonders: cẩm nang đảo Tuần Châu (khoảng cách từ sân bay Cát Bi và Vân Đồn)', url: 'https://vinwonders.com/vi/wonderpedia/news/dao-tuan-chau-ha-long/' },
  ],
  related: {
    title: 'Chuẩn bị tiếp',
    links: [
      { href: 'firstTime', title: 'Lần đầu đi du thuyền Hạ Long?', body: 'Cần biết gì, mang gì và ngày lên tàu diễn ra thế nào.' },
      { href: 'itineraries', title: 'Các hành trình Green Ruby', body: 'Hai vịnh, 2 ngày 1 đêm hoặc 3 ngày 2 đêm.' },
      { href: 'bestTime', title: 'Đi Hạ Long mùa nào đẹp', body: 'Thời tiết, lượng khách và điều kiện biển theo từng tháng.' },
      { href: 'faq', title: 'Câu hỏi thường gặp', body: 'Đặt chỗ, thanh toán, hủy và sinh hoạt trên tàu.' },
    ],
  },
  estimateNote: 'Mọi thời gian trên trang này là ước tính trong điều kiện bình thường, không phải lịch chạy hay cam kết. Giá và giờ chạy của nhà xe theo công bố vào ngày ghi dưới mỗi bảng. Thông tin check-in và lên tàu theo kế hoạch Green Ruby đã công bố, có thể điều chỉnh trước khi tàu chính thức hoạt động, dự kiến từ tháng 2/2027.',
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
      departShuttle: 'Limousine ghép: chọn chuyến rời Hà Nội trước khoảng 07:00; xe thường đón khoảng {from}–{to}.',
      departNote: 'Đã gồm thời gian dự phòng cho giao thông. Cuối tuần và dịp lễ nên đi sớm hơn.',
      departUnknown: 'Thống nhất với nhà xe để đến Tuần Châu trước giờ check-in 10:45, có thời gian dự phòng.',
      lastDay: 'Ngày cuối: giờ rời tàu (dự kiến)',
      disembark: 'Giờ về có thể thay đổi theo thời tiết và vận hành.',
      returnBack: 'Dự kiến về đến {origin} khoảng {from}–{to}, không bảo đảm.',
      airportAdvice: 'Nên có mặt ở sân bay ít nhất 2 giờ trước chuyến nội địa và 3 giờ trước chuyến quốc tế, sau khi tính đủ thời gian đường bộ.',
      table: { mode: 'Phương tiện', time: 'Thời gian (ước tính)', notes: 'Ghi chú' },
      cost: 'Giá công bố (một chiều)',
      costNone: 'Chưa có giá xác minh được. Hãy hỏi giá xe riêng.',
      operators: 'Nhà xe đã kiểm tra',
      operatorsNone: 'Chưa tìm thấy xe ghép chạy theo lịch đến Tuần Châu. Nên đặt xe riêng.',
      returnOperators: 'Chiều về từ Tuần Châu:',
      seeTable: 'So sánh điểm đón và điểm trả',
      operatorsAnchor: { hanoi: 'pho-co', noibai: 'san-bay', ninhbinh: 'ninh-binh' },
      note: 'Chỉ là gợi ý, tính theo giờ check-in dự kiến 10:45 và giờ rời tàu 11:00–11:30. Không phải lịch chạy hay cam kết: hãy dự phòng thêm cho giao thông, chậm trễ và thủ tục sân bay. Giá theo công bố của nhà xe; hãy xác nhận khi đặt.',
    },
    origins: [
      {
        key: 'hanoi',
        label: 'Hà Nội (phố cổ)',
        routes: [
          { mode: 'Xe riêng', time: '2,5–3 giờ', notes: 'Đón tận nơi, chủ động giờ.' },
          { mode: 'Limousine ghép', time: '3–3,5 giờ', notes: 'Đón tại khách sạn ở trung tâm Hà Nội, dừng nghỉ một lần. Một số nhà xe chạy mỗi giờ.' },
          { mode: 'Tự lái', time: '2,5–3 giờ', notes: 'Hỏi trước chỗ gửi xe gần bến.' },
          { mode: 'Xe khách cao tốc', time: '2,5 giờ + đường ra bến Mỹ Đình', notes: 'Đi từ bến xe Mỹ Đình. Khó căn giờ check-in buổi sáng.' },
        ],
        tip: 'Ở gần phố cổ thường thuận tiện nhất cho limousine đón.',
      },
      {
        key: 'noibai',
        label: 'Sân bay Nội Bài (HAN)',
        airport: 'noibai',
        routes: [
          { mode: 'Xe riêng', time: '2,5–3,5 giờ', notes: 'Đặt trước, tài xế đón ở sảnh đến; hỏi rõ chính sách chờ khi chuyến bay trễ.' },
          { mode: 'Limousine ghép', time: 'Khoảng 3 giờ', notes: 'Ít nhất một nhà xe chạy mỗi giờ từ sân bay; chuyến bay trễ được đổi sang chuyến sau.' },
          { mode: 'Taxi hoặc xe công nghệ', time: '2,5–3,5 giờ', notes: 'Thống nhất giá và đúng nhà ga ở bến trước khi đi.' },
        ],
        tip: 'Lên tàu ngay trong ngày cần chuyến bay đến sớm và ít chỗ dự phòng. Ngủ lại Hà Nội từ đêm trước thường an toàn hơn.',
      },
      {
        key: 'catbi',
        label: 'Sân bay Cát Bi (HPH)',
        airport: 'catbi',
        routes: [
          { mode: 'Xe riêng', time: 'Tùy tuyến', notes: 'Khoảng 40 km đường bộ. Hỏi nhà xe tuyến đường và thời gian đến Tuần Châu.' },
          { mode: 'Taxi hoặc xe công nghệ', time: 'Tùy tuyến', notes: 'Có sẵn tại sân bay; xác nhận đúng nhà ga ở bến.' },
        ],
        tip: 'Tiện cho một số đường bay nội địa; hãy kiểm tra thời gian di chuyển trước khi chọn bay đến và lên tàu trong ngày.',
      },
      {
        key: 'vandon',
        label: 'Sân bay Vân Đồn (VDO)',
        airport: 'vandon',
        routes: [{ mode: 'Xe riêng hoặc taxi', time: 'Tùy tuyến', notes: 'Khoảng 60–70 km. Nên đặt xe trước và hỏi rõ thời gian di chuyển.' }],
        tip: 'Kiểm tra kỹ ngày bay: lịch bay ở Vân Đồn khá thưa.',
      },
      {
        key: 'ninhbinh',
        label: 'Ninh Bình / Tam Cốc',
        routes: [
          { mode: 'Xe riêng', time: '3,5–4 giờ', notes: 'Đón tận nơi, đi theo cao tốc.' },
          { mode: 'Limousine ghép', time: '4–4,5 giờ', notes: 'Đón ở Tam Cốc, một số trả ở Tuần Châu. Không chuyến nào chắc chắn đến trước 10:45.' },
        ],
        tip: 'Để kịp check-in buổi sáng, ngủ lại Hạ Long trước một đêm là phương án an toàn hơn.',
      },
    ],
  },
  itineraries: { title: 'Các hành trình Green Ruby', days: (n) => `${n} ngày ${n - 1} đêm`, view: 'Xem hành trình' },
};

export default transfer;
