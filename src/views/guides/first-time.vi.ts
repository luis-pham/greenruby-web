import type { GuideContent } from './types';

// Viết riêng cho người đọc Việt (không dịch từng câu từ bản tiếng Anh); dữ kiện giữ nguyên như bản EN.

const firstTime: GuideContent = {
  metaTitle: 'Lần đầu đi du thuyền Hạ Long: kinh nghiệm cần biết',
  metaDescription:
    'Có nên ngủ đêm trên du thuyền Hạ Long, chọn vịnh nào, đi mấy ngày, giá gồm những gì, ngày lên tàu diễn ra thế nào, cần mang gì và những lỗi hay gặp khi đi lần đầu.',
  breadcrumb: 'Lần đầu đi du thuyền',
  eyebrow: 'Cẩm nang du thuyền',
  title: 'Lần đầu đi du thuyền Hạ Long: những điều nên biết',
  lead: 'Một chuyến du thuyền ngủ đêm trên vịnh Hạ Long hay vịnh Lan Hạ thực sự diễn ra thế nào, nên chọn ra sao, và làm sao tránh những sơ suất nhỏ khiến ngày đầu tiên trở nên vội vã.',
  summaryTitle: 'Tóm tắt nhanh',
  summary: [
    ['Có đáng đi?', 'Đáng, nếu bạn ngủ lại ít nhất một đêm: vịnh đẹp nhất lúc hoàng hôn và sáng sớm, khi tàu đi trong ngày đã về.'],
    ['Đi mấy ngày?', '**2 ngày 1 đêm** cho lần đầu; **3 ngày 2 đêm** nếu muốn đến vùng vắng hơn và đi chậm rãi.'],
    ['Vịnh nào?', '**Hạ Long** để xem các hang, điểm ngắm cảnh nổi tiếng; **Lan Hạ** nếu thích yên tĩnh và chèo kayak.'],
    ['Di chuyển', 'Từ Hà Nội đến Tuần Châu khoảng 2,5–3 giờ đường bộ (ước tính). Xem [hướng dẫn di chuyển](transfer).'],
    ['Ngày lên tàu', 'Theo lịch trình Green Ruby đã công bố: check-in từ khoảng 10:45, xuồng ra tàu lúc khoảng 11:45.'],
  ],
  updated: { iso: '2026-10-24', label: 'Cập nhật ngày 24/10/2026' },
  tocTitle: 'Nội dung',
  sections: [
    {
      id: 'co-dang-di',
      title: 'Có nên ngủ đêm trên du thuyền Hạ Long?',
      blocks: [
        { p: 'Vịnh Hạ Long là Di sản Thiên nhiên Thế giới được UNESCO công nhận về cảnh quan và địa chất; từ năm 2023, di sản mở rộng thêm quần đảo Cát Bà, bao gồm vịnh Lan Hạ. Cái hay của vịnh nằm ở quy mô: hàng nghìn đảo đá vôi, phần lớn không có người ở, và cách ngắm đúng nhất là chậm rãi từ mặt nước.' },
        { p: 'Đi trong ngày từ Hà Nội vẫn được, nhưng phần lớn thời gian là ngồi xe: khoảng năm, sáu tiếng cả đi lẫn về để đổi lấy ba, bốn tiếng trên vịnh. Ngủ lại một đêm trên tàu thì quãng đường trở thành một phần của chuyến đi. Bạn được ngắm vịnh trong nắng chiều, thức dậy giữa vịnh và tham quan hang, áng từ sớm, trước khi các tàu ngày kéo đến.' },
        { p: 'Du thuyền ngủ đêm sẽ không hợp nếu bạn muốn nằm biển cả ngày, tìm cuộc sống về đêm, hay hoàn toàn tự do giờ giấc. Lịch trình trên tàu được sắp theo thủy triều, thời tiết và quy định điều hành tàu trên vịnh.' },
      ],
    },
    {
      id: 'chon-vinh',
      title: 'Chọn vịnh Hạ Long hay vịnh Lan Hạ?',
      blocks: [
        { p: 'Hai vịnh có chung cảnh quan núi đá vôi; khác nhau ở trải nghiệm và độ đông đúc. Bài [so sánh vịnh Hạ Long và Lan Hạ](bayComparison) phân tích kỹ hơn, còn tóm gọn thì:' },
        {
          table: {
            head: ['', 'Vịnh Hạ Long', 'Vịnh Lan Hạ'],
            rows: [
              ['Đặc điểm', 'Vùng lõi di sản, tuyến tàu đông hơn', 'Ngoài khơi đảo Cát Bà, ít tàu, chỗ neo yên tĩnh'],
              ['Điểm thường ghé', '[Hang Sửng Sốt](destination:hang-sung-sot), [đảo Ti Tốp](destination:dao-ti-top), [hang Luồn](destination:hang-luon)', '[Hang Sáng Tối](destination:hang-sang-toi), [Ao Ếch](destination:ao-ech), [làng Việt Hải](destination:lang-viet-hai)'],
              ['Hợp với', 'Người đi lần đầu, muốn xem các điểm nổi tiếng', 'Người thích chèo kayak, tắm biển, nhịp chậm'],
              ['Tàu Green Ruby', 'Green Ruby 1', 'Green Ruby 2'],
            ],
          },
        },
        { p: 'Khách của cả hai tàu Green Ruby đều check-in ở Tuần Châu; khách Green Ruby 2 đi tiếp bằng xuồng sang bến Gia Luận để lên tàu trên vịnh Lan Hạ. Xem vị trí các điểm trên [bản đồ điểm đến](destinations).' },
      ],
    },
    {
      id: 'may-ngay',
      title: 'Đi trong ngày, 2 ngày 1 đêm hay 3 ngày 2 đêm?',
      blocks: [
        {
          table: {
            head: ['', 'Trong ngày', '2 ngày 1 đêm', '3 ngày 2 đêm'],
            rows: [
              ['Thời gian trên vịnh', 'Khoảng 4–6 giờ', 'Khoảng 24 giờ', 'Khoảng 48 giờ'],
              ['Được xem gì', 'Một khu vực, thường là nơi đông nhất', '2–3 điểm, hoàng hôn và bình minh', 'Thêm một ngày đi tàu ngày ra vùng xa'],
              ['Nhịp độ', 'Vội', 'Vừa phải', 'Thong thả'],
              ['Hợp với', 'Lịch rất gấp', 'Phần lớn khách đi lần đầu', 'Gia đình có thời gian, người muốn đến vùng vắng'],
            ],
          },
        },
        { p: 'Nếu còn phân vân, hãy chọn 2 ngày 1 đêm. Đêm thứ hai đáng giá khi bạn muốn có chuyến tàu ngày: theo kế hoạch của Green Ruby là [làng chài Cửa Vạn](destination:lang-chai-cua-van) và [hang Tiên Ông](destination:hang-tien-ong) trên vịnh Hạ Long, hoặc [làng Việt Hải](destination:lang-viet-hai) trên đảo Cát Bà với tuyến Lan Hạ.' },
      ],
    },
    {
      id: 'chon-phong',
      title: 'Chọn phòng và tiện ích trên tàu',
      blocks: [
        { p: 'Với chuyến một đêm, phòng ngủ quan trọng hơn bạn nghĩ, vì buổi tối và sáng sớm bạn sẽ ở đó khá nhiều. Nên so sánh:' },
        {
          ul: [
            '**Ban công, sân hiên riêng**: ngắm bình minh ngay trong phòng, không phải lên boong.',
            '**Kiểu giường**: giường đôi hay hai giường đơn, có kê thêm giường hoặc cho trẻ ngủ cùng được không.',
            '**Diện tích và tầng**: tầng cao nhìn rộng hơn, tầng thấp cảm giác vững hơn.',
            '**Không gian chung**: boong tắm nắng, nhà hàng, quầy bar, spa dùng chung cho mọi khách, nên phòng nhỏ không có nghĩa là chuyến đi kém đi.',
          ],
        },
        { p: 'Green Ruby 1 và Green Ruby 2 được thiết kế là hai tàu chị em giống hệt nhau, cùng bốn hạng phòng: Imperial Suite, Royal Romance Suite, Ocean Breeze Premium và Serenity Deluxe. Thông số theo thiết kế của tàu; tình trạng hiện tại xem ở trang [thông tin đội tàu](/vi/gioi-thieu/thong-tin-thuong-hieu).' },
      ],
    },
    {
      id: 'gia-gom-gi',
      title: 'Giá tour gồm gì, phát sinh gì?',
      blocks: [
        { p: 'Giá du thuyền thường bao gồm nhiều hơn một đêm khách sạn nhưng hiếm khi trọn gói tất cả. Theo các hành trình Green Ruby đã công bố:' },
        {
          table: {
            head: ['Thường đã bao gồm', 'Thường tính thêm'],
            rows: [
              ['Các bữa ăn theo lịch trình (trưa, tối, sáng, brunch)', 'Xe đưa đón Hà Nội hoặc sân bay – Tuần Châu'],
              ['Phòng có phòng tắm riêng, điều hòa', 'Đồ uống, trừ khi ghi rõ'],
              ['Vé tham quan các điểm trong lịch trình', 'Dịch vụ spa'],
              ['Kayak hoặc đò nan tại các điểm dừng', 'Tiền tip cho thủy thủ đoàn, hướng dẫn viên'],
              ['Lớp nấu ăn, Thái Cực Quyền buổi sáng; hướng dẫn viên', 'Bảo hiểm du lịch và chi tiêu cá nhân'],
              ['Chuyến tàu ngày (chỉ với 3 ngày 2 đêm)', ''],
            ],
          },
        },
        { p: 'Danh sách trên [trang hành trình](itineraries) bạn đặt mới là căn cứ cuối cùng. Điều kiện hủy được công bố ở [câu hỏi thường gặp](faq): hoàn tiền đủ nếu hủy từ 30 ngày trước ngày đi, sau đó phí hủy tăng dần, và không hoàn tiền trong vòng 7 ngày.' },
        { note: 'Tàu Green Ruby dự kiến đi vào hoạt động từ tháng 2/2027 (chưa chính thức). Giá và ngày khởi hành được xác nhận khi đặt chỗ.' },
      ],
    },
    {
      id: 'chuan-bi',
      title: 'Chuẩn bị trước ngày đi',
      blocks: [
        {
          ul: [
            '**Giấy tờ tùy thân**: mang CCCD bản gốc (khách nước ngoài mang hộ chiếu). Đơn vị vận hành phải khai báo danh sách khách với cảng trước khi tàu xuất bến.',
            '**Ăn uống và sức khỏe**: báo dị ứng, chế độ ăn, bệnh lý cần lưu ý ngay khi đặt chỗ, đừng đợi đến lúc ra bến.',
            '**Bảo hiểm du lịch**: nên có, nhất là từ tháng 6 đến tháng 10, khi bão có thể làm thay đổi lịch tàu.',
            '**Tiền mặt**: mang ít tiền mặt cho các khoản nhỏ trên bờ; trên tàu có thể thanh toán dịch vụ thêm bằng thẻ.',
          ],
        },
      ],
    },
    {
      id: 'di-chuyen',
      title: 'Từ Hà Nội đến bến tàu',
      blocks: [
        { p: 'Từ trung tâm Hà Nội đến Tuần Châu khoảng 160–180 km theo cao tốc. Đi xe riêng mất khoảng 2,5–3 giờ, xe limousine ghép lâu hơn một chút vì đón nhiều khách và dừng nghỉ giữa đường. Đây đều là thời gian ước tính: giờ ra khỏi Hà Nội và các dịp lễ ảnh hưởng nhiều nhất.' },
        { p: 'Giá du thuyền chưa bao gồm xe đưa đón. Theo kế hoạch đã công bố, Green Ruby sẽ có xe limousine ghép và xe riêng theo yêu cầu, tính phí riêng. Bài [Hà Nội đi Hạ Long](transfer) so sánh đủ các phương án, kể cả khi bạn bay đến Nội Bài, Cát Bi hay Vân Đồn.' },
      ],
    },
    {
      id: 'ngay-len-tau',
      title: 'Ngày lên tàu diễn ra thế nào',
      blocks: [
        { p: 'Du thuyền lớn không cập thẳng nhà ga hành khách, nên khách làm thủ tục trên bờ rồi được xuồng nhỏ đưa ra tàu. Mốc giờ dưới đây theo các hành trình Green Ruby đã công bố.' },
        { widget: 'boarding-timeline' },
        { p: '**Chuyến xuồng ra tàu.** Xuồng có mái che, thủy thủ đỡ bạn lên xuống, có áo phao và hành lý được chuyển giúp. Nên giữ bên mình một túi nhỏ đựng giấy tờ, thuốc và điện thoại.' },
      ],
    },
    {
      id: 'tren-tau',
      title: 'Trên tàu có gì',
      blocks: [
        {
          ul: [
            '**Buổi chiều**: phổ biến an toàn, ăn trưa khi tàu chạy, rồi đến điểm tham quan đầu tiên: hang hoặc áng nước bằng kayak, đò nan, có khi là bãi tắm.',
            '**Buổi tối**: ngắm hoàng hôn trên boong, học nấu ăn hoặc nghỉ ngơi, ăn tối, rồi câu mực nếu thích.',
            '**Buổi sáng**: tập Thái Cực Quyền đón bình minh, ăn sáng nhẹ và thêm một điểm tham quan, thường là hang, trước bữa brunch và khi tàu về bến.',
          ],
        },
        { p: 'Tàu neo đêm ở các khu vực quy định, buổi tối không lên bờ. Mọi hoạt động đều không bắt buộc: bạn có thể ở lại tàu ở bất kỳ điểm dừng nào.' },
      ],
    },
    {
      id: 'an-toan',
      title: 'Thời tiết, an toàn, trẻ em và người hạn chế vận động',
      blocks: [
        { p: '**Thời tiết.** Từ tháng 10 đến tháng 4 mát và khô hơn; tháng 5 đến tháng 9 nóng ẩm, đồng thời là mùa bão, khoảng tháng 6 đến tháng 10. Khi có cảnh báo bão, cơ quan chức năng có thể dừng toàn bộ tàu trên vịnh với thời gian báo trước rất ngắn; đơn vị vận hành sẽ đổi lịch hoặc hoàn tiền theo chính sách. Mùa đông hay có sương mù và mây thấp. Xem [thời điểm đẹp nhất để đi Hạ Long](bestTime) để biết thời tiết từng tháng.' },
        { p: '**Say sóng.** Vịnh được các đảo che chắn, mặt nước thường êm nên đa số khách gần như không thấy rung lắc. Nếu dễ say, hãy mang theo thuốc quen dùng cho đoạn đi xuồng.' },
        { p: '**Trẻ em.** Phần lớn du thuyền đón gia đình có trẻ nhỏ. Trẻ mặc áo phao trong mọi hoạt động dưới nước; bé nhỏ thường đi đò nan cùng người lớn thay vì chèo kayak. Hỏi rõ chính sách trẻ em và giường khi đặt.' },
        { p: '**Người hạn chế vận động.** Lên tàu phải bước qua lại giữa cầu tàu, xuồng và du thuyền; nhiều điểm tham quan có bậc: [hang Sửng Sốt](destination:hang-sung-sot) và điểm ngắm cảnh [Ti Tốp](destination:dao-ti-top) đều phải leo khá nhiều. Người đi lại khó khăn vẫn có thể tận hưởng chuyến đi từ trên tàu; hãy báo nhu cầu trước khi đặt để được tư vấn đúng.' },
      ],
    },
    {
      id: 'hanh-ly',
      title: 'Danh sách đồ cần mang',
      blocks: [
        { p: 'Mang một túi nhỏ cho một, hai đêm thay vì vali lớn: lên xuống xuồng và để trong phòng đều gọn hơn.' },
        {
          checklist: [
            { title: 'Giấy tờ', items: ['CCCD hoặc hộ chiếu bản gốc', 'Xác nhận đặt chỗ', 'Thông tin bảo hiểm du lịch', 'Ít tiền mặt'] },
            { title: 'Quần áo', items: ['Đồ bơi, khăn nhanh khô', 'Giày đế bám để đi hang, leo bậc', 'Áo khoác mỏng (rất cần từ tháng 11 đến tháng 3)', 'Mũ, kính râm'] },
            { title: 'Đồ dùng', items: ['Kem chống nắng, thuốc chống côn trùng', 'Thuốc cá nhân, thuốc say sóng nếu cần', 'Túi chống nước cho điện thoại khi chèo kayak', 'Sạc dự phòng và dây sạc'] },
          ],
        },
      ],
    },
    {
      id: 'loi-thuong-gap',
      title: 'Những lỗi hay gặp khi đi lần đầu',
      blocks: [
        {
          ol: [
            '**Đặt chuyến bay quá sớm vào ngày cuối.** Tàu về bến khoảng cuối buổi sáng, đường về mất vài tiếng. Bay nội địa từ Nội Bài nên chọn chuyến sau khoảng 16:30 (ước tính).',
            '**Ra nhầm bến.** Hạ Long có nhiều cảng hành khách. Hãy đưa tài xế đúng địa điểm check-in; khách Green Ruby check-in tại Tuần Châu.',
            '**Quên giấy tờ bản gốc ở khách sạn.** Không có giấy tờ, bạn có thể không được lên tàu.',
            '**Chọn đi trong ngày cho đỡ tốn thời gian.** Phần lớn thời gian lại ngồi xe, và bỏ lỡ lúc vịnh yên tĩnh nhất.',
            '**Mong tắm biển vào mùa đông.** Tháng 12 đến tháng 2 nước lạnh, trời thường âm u; chuyến đi lúc này là để ngắm cảnh.',
            '**Không báo trước nhu cầu ăn uống, đi lại.** Chuẩn bị trước ngày đi dễ hơn nhiều so với xử lý tại chỗ.',
          ],
        },
      ],
    },
    {
      id: 'hanh-trinh',
      title: 'Các hành trình Green Ruby',
      blocks: [{ p: 'Bốn hành trình dự kiến, mỗi vịnh hai hành trình: 2 ngày 1 đêm và 3 ngày 2 đêm.' }, { widget: 'itineraries' }],
    },
  ],
  faqTitle: 'Câu hỏi thường gặp',
  faq: [
    { q: 'Có nên đi du thuyền Hạ Long không?', a: 'Với phần lớn du khách là có, miễn là ngủ lại trên tàu. Đi trong ngày thì chủ yếu ngồi xe; một đêm trên tàu cho bạn hoàng hôn, bình minh và những điểm tham quan vắng hơn.' },
    { q: 'Đi du thuyền Hạ Long mấy ngày là hợp lý?', a: '2 ngày 1 đêm là đủ cho lần đầu. Chọn 3 ngày 2 đêm nếu muốn đi tàu ngày ra vùng vắng hơn và có nhịp nghỉ ngơi thong thả.' },
    { q: 'Đi du thuyền Hạ Long cần mang gì?', a: 'CCCD hoặc hộ chiếu bản gốc, đồ bơi, giày đế bám, áo khoác mỏng từ tháng 11 đến tháng 3, đồ chống nắng, thuốc cá nhân và túi chống nước khi chèo kayak. Túi nhỏ tiện hơn vali lớn.' },
    { q: 'Đi du thuyền trên vịnh có say sóng không?', a: 'Hiếm khi. Vịnh được các đảo che chắn, mặt nước thường êm. Nếu dễ say, nên mang theo thuốc cho đoạn đi xuồng.' },
    { q: 'Thời tiết xấu thì du thuyền có bị hủy không?', a: 'Có thể. Khi có cảnh báo bão, chủ yếu từ tháng 6 đến tháng 10, cơ quan chức năng có thể dừng tàu với thời gian báo trước ngắn. Đơn vị vận hành sẽ đổi lịch hoặc hoàn tiền theo chính sách.' },
    { q: 'Mấy giờ phải có mặt ở bến?', a: 'Theo lịch trình Green Ruby đã công bố, check-in tại phòng chờ ở Tuần Châu bắt đầu khoảng 10:45 và xuồng ra tàu khoảng 11:45. Đi xe riêng từ Hà Nội, bạn nên xuất phát trước khoảng 07:15 (ước tính).' },
  ],
  related: {
    title: 'Chuẩn bị tiếp',
    links: [
      { href: 'transfer', title: 'Hà Nội đi Hạ Long', body: 'Phương tiện, bến tàu và thời gian di chuyển thực tế.' },
      { href: 'destinations', title: 'Điểm đến trên vịnh', body: 'Hang động, đảo, làng chài kèm lưu ý thực tế.' },
      { href: 'luxuryPillar', title: 'Kinh nghiệm chọn du thuyền cao cấp', body: 'Những điều nên biết trước khi đặt du thuyền hạng sang.' },
    ],
  },
  estimateNote: 'Thời gian di chuyển và tham quan trên trang này là ước tính, không phải lịch cố định. Hành trình Green Ruby có thể điều chỉnh trước khi tàu chính thức hoạt động, dự kiến từ tháng 2/2027.',
  timeline: {
    label: 'Chọn tàu',
    note: 'Mốc giờ theo các hành trình Green Ruby đã công bố; có thể thay đổi theo thời tiết và chỉ đạo của cảng trong ngày.',
    tabs: [
      {
        key: 'gr1',
        label: 'Green Ruby 1 · Vịnh Hạ Long',
        steps: [
          { time: '≈ 08:00', title: 'Rời Hà Nội', body: 'Xe đón ở Hà Nội nếu bạn đặt xe đưa đón; đường đi khoảng 2,5–3 giờ (ước tính).' },
          { time: '≈ 10:45', title: 'Check-in ở Tuần Châu', body: 'Phòng chờ Green Ruby tại Tuần Châu: kiểm tra giấy tờ, gửi hành lý, đồ uống chào mừng.' },
          { time: '≈ 11:45', title: 'Xuồng ra tàu', body: 'Một quãng ngắn ra Green Ruby 1 đang neo trên vịnh Hạ Long.' },
          { time: '≈ 12:30', title: 'Phổ biến an toàn, nhận phòng', body: 'Phổ biến an toàn tại nhà hàng, sau đó nhận chìa khóa và về phòng.' },
          { time: '≈ 13:00', title: 'Ăn trưa khi tàu chạy', body: 'Tàu tiến vào vịnh trong bữa trưa.' },
          { time: '≈ 15:30', title: 'Điểm tham quan đầu tiên', body: 'Hang Luồn bằng kayak hoặc đò nan, sau đó đến đảo Ti Tốp khoảng 16:30.' },
        ],
      },
      {
        key: 'gr2',
        label: 'Green Ruby 2 · Vịnh Lan Hạ',
        steps: [
          { time: '≈ 08:00', title: 'Rời Hà Nội', body: 'Xe đón ở Hà Nội nếu bạn đặt xe đưa đón; đường đi khoảng 2,5–3 giờ (ước tính).' },
          { time: '≈ 10:45', title: 'Check-in ở Tuần Châu', body: 'Cùng phòng chờ Green Ruby tại Tuần Châu như khách Green Ruby 1.' },
          { time: '≈ 11:45', title: 'Xuồng sang bến Gia Luận', body: 'Xuồng đưa khách sang bến Gia Luận trên đảo Cát Bà (Hải Phòng), lên Green Ruby 2 trên vịnh Lan Hạ.' },
          { time: '≈ 12:30', title: 'Phổ biến an toàn, nhận phòng', body: 'Phổ biến an toàn tại nhà hàng, sau đó nhận chìa khóa và về phòng.' },
          { time: '≈ 13:00', title: 'Ăn trưa khi tàu chạy', body: 'Ăn trưa khi tàu tiến vào vịnh Lan Hạ.' },
          { time: '≈ 15:00–15:30', title: 'Điểm tham quan đầu tiên', body: 'Hang Sáng Tối bằng kayak hoặc đò nan.' },
        ],
      },
    ],
  },
  itineraries: { title: 'Các hành trình Green Ruby', days: (n) => `${n} ngày ${n - 1} đêm`, view: 'Xem hành trình' },
};

export default firstTime;
