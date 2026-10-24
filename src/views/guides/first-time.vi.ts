import type { GuideContent } from './types';

// Viết riêng cho người đọc Việt (không dịch từng câu từ bản tiếng Anh); dữ kiện giữ nguyên như bản EN.
// Bản biên tập 2026-10-24. Không đưa "trợ lý AI trong cabin" vào: chưa có trong thông số đã công bố
// (CMS chỉ xác nhận dịch vụ quản gia cho hai hạng suite).

const firstTime: GuideContent = {
  metaTitle: 'Lần đầu đi du thuyền Hạ Long: kinh nghiệm cần biết',
  metaDescription:
    'Có nên ngủ đêm trên du thuyền Hạ Long, chọn vịnh nào, đi mấy ngày, giá gồm những gì, ngày lên tàu diễn ra thế nào, cần mang gì và những điều người đi lần đầu hay bỏ sót.',
  breadcrumb: 'Lần đầu đi du thuyền',
  eyebrow: 'Cẩm nang du thuyền',
  title: 'Lần đầu đi du thuyền Hạ Long: Những điều nên biết',
  lead: 'Đi du thuyền nghỉ đêm ở Hạ Long hay Lan Hạ có gì khác so với tour trong ngày? Nên chọn vịnh nào, đi mấy đêm, chuẩn bị những gì và cần lưu ý điều gì trước khi lên tàu? Cẩm nang dưới đây sẽ giúp bạn lên kế hoạch cho chuyến đi đầu tiên.',
  summaryTitle: 'Tóm tắt nhanh',
  summary: [
    ['Có nên đi du thuyền nghỉ đêm?', 'Có, nếu bạn muốn dành nhiều thời gian trên vịnh, ngắm hoàng hôn và đón bình minh ngay trên tàu.'],
    ['Nên đi mấy ngày?', '**2 ngày 1 đêm** phù hợp với người đi lần đầu; **3 ngày 2 đêm** dành cho những ai muốn nghỉ dưỡng lâu hơn và khám phá thêm các điểm tham quan.'],
    ['Chọn vịnh nào?', '**Hạ Long** nổi bật với các hang động và danh thắng nổi tiếng; **Lan Hạ** phù hợp nếu bạn thích không gian yên tĩnh, chèo kayak và tắm biển.'],
    ['Di chuyển thế nào?', 'Từ Hà Nội đến Tuần Châu thường mất khoảng 2,5–3 giờ bằng ô tô, tùy điểm đón và tình hình giao thông. Xem [hướng dẫn di chuyển](transfer).'],
    ['Khi nào lên tàu?', 'Theo lịch trình dự kiến của Green Ruby, khách làm thủ tục từ khoảng 10:45 và bắt đầu di chuyển ra tàu khoảng 11:45.'],
  ],
  updated: { iso: '2026-10-24', label: 'Cập nhật ngày 24/10/2026' },
  tocTitle: 'Nội dung',
  sections: [
    {
      id: 'co-dang-di',
      title: 'Có nên ngủ đêm trên du thuyền Hạ Long?',
      blocks: [
        { p: 'Vịnh Hạ Long được UNESCO công nhận là Di sản Thiên nhiên Thế giới nhờ cảnh quan và giá trị địa chất đặc biệt. Từ năm 2023, khu di sản được mở rộng, bao gồm cả quần đảo Cát Bà và vịnh Lan Hạ.' },
        { p: 'Với hàng nghìn đảo đá vôi trải rộng trên mặt biển, Hạ Long mang đến những khung cảnh khác nhau theo từng thời điểm trong ngày. Nghỉ đêm trên du thuyền là một cách để có thêm thời gian ngắm cảnh, thay vì chỉ tham quan trong vài giờ.' },
        { p: 'Nếu xuất phát từ Hà Nội, tour trong ngày thường mất khoảng 5–6 giờ di chuyển khứ hồi, trong khi thời gian tham quan trên vịnh khá hạn chế. Với hành trình nghỉ đêm, bạn có thể ngắm hoàng hôn trên boong tàu, dùng bữa tối giữa vịnh và thức dậy giữa khung cảnh núi đá vôi vào sáng hôm sau.' },
        { p: 'Tuy nhiên, du thuyền nghỉ đêm không phải lựa chọn phù hợp với tất cả mọi người. Nếu thích dành cả ngày trên bãi biển, khám phá cuộc sống về đêm hoặc muốn tự do thay đổi lịch trình, bạn nên cân nhắc những hình thức du lịch khác. Các hoạt động trên du thuyền thường được tổ chức theo thời gian cố định và có thể điều chỉnh tùy theo thời tiết, thủy triều và quy định an toàn.' },
      ],
    },
    {
      id: 'chon-vinh',
      title: 'Chọn vịnh Hạ Long hay vịnh Lan Hạ?',
      blocks: [
        { p: 'Hạ Long và Lan Hạ đều nổi bật với cảnh quan núi đá vôi giữa mặt nước xanh. Sự khác biệt chủ yếu nằm ở các điểm tham quan, mật độ tàu du lịch và những hoạt động mà du khách có thể trải nghiệm.' },
        { p: 'Nếu muốn tìm hiểu kỹ hơn, bạn có thể tham khảo bài [Nên chọn du thuyền Hạ Long hay Lan Hạ?](bayComparison).' },
        {
          table: {
            head: ['Tiêu chí', 'Vịnh Hạ Long', 'Vịnh Lan Hạ'],
            rows: [
              ['Đặc điểm', 'Có nhiều tuyến tham quan nổi tiếng, thường đông tàu hơn tại các điểm chính', 'Nằm gần đảo Cát Bà, có nhiều khu vực yên tĩnh và các điểm chèo kayak'],
              ['Điểm tham quan tiêu biểu', '[Hang Sửng Sốt](destination:hang-sung-sot), [đảo Ti Tốp](destination:dao-ti-top), [hang Luồn](destination:hang-luon)', '[Hang Sáng Tối](destination:hang-sang-toi), [Ao Ếch](destination:ao-ech), [làng Việt Hải](destination:lang-viet-hai)'],
              ['Phù hợp với', 'Người lần đầu đến Hạ Long, muốn khám phá những danh thắng nổi tiếng', 'Người thích chèo kayak, tắm biển và không gian nghỉ dưỡng yên tĩnh'],
              ['Du thuyền Green Ruby dự kiến', '[Green Ruby 1](/vi/du-thuyen/green-ruby-1-1.html)', '[Green Ruby 2](/vi/du-thuyen/green-ruby-2-2.html)'],
            ],
          },
        },
        { p: 'Theo kế hoạch, khách của cả hai du thuyền Green Ruby sẽ làm thủ tục tại Tuần Châu. Riêng khách đi Green Ruby 2 sẽ tiếp tục di chuyển bằng xuồng trung chuyển đến khu vực Gia Luận để lên tàu tham quan vịnh Lan Hạ.' },
        { p: 'Bạn cũng có thể xem thêm [bản đồ các điểm đến](destinations) để hình dung vị trí các địa danh và tuyến tham quan trên hai vịnh.' },
      ],
    },
    {
      id: 'may-ngay',
      title: 'Đi trong ngày, 2 ngày 1 đêm hay 3 ngày 2 đêm?',
      blocks: [
        { p: 'Thời gian lưu trú là một trong những yếu tố quan trọng nhất khi chọn du thuyền Hạ Long.' },
        {
          table: {
            head: ['Tiêu chí', 'Tour trong ngày', '2 ngày 1 đêm', '3 ngày 2 đêm'],
            rows: [
              ['Thời gian trên vịnh', 'Khoảng 4–6 giờ', 'Thường chưa đến 24 giờ', 'Khoảng 2 ngày, tùy lịch trình'],
              ['Trải nghiệm', 'Tham quan một số điểm trong cùng tuyến', 'Tham quan, hoạt động trên vịnh, ngắm hoàng hôn và nghỉ đêm', 'Có thêm một ngày khám phá những địa điểm ngoài lịch trình ngắn'],
              ['Thời gian nghỉ dưỡng', 'Khá hạn chế', 'Vừa đủ cho chuyến đi đầu tiên', 'Thoải mái hơn'],
              ['Phù hợp với', 'Người có ít thời gian', 'Phần lớn du khách đi lần đầu', 'Gia đình, cặp đôi và những ai muốn ở lại lâu hơn'],
            ],
          },
        },
        { p: 'Nếu lần đầu đi du thuyền và lịch trình du lịch khá bận rộn, **2 ngày 1 đêm** thường là lựa chọn phù hợp.' },
        { p: 'Nếu muốn dành nhiều thời gian nghỉ dưỡng hoặc khám phá thêm các điểm đến, bạn có thể chọn hành trình **3 ngày 2 đêm**. Theo kế hoạch của Green Ruby, ngày thứ hai có thể bao gồm chuyến tham quan [làng chài Cửa Vạn](destination:lang-chai-cua-van) và [hang Tiên Ông](destination:hang-tien-ong) trên vịnh Hạ Long, hoặc [làng Việt Hải](destination:lang-viet-hai) trên đảo Cát Bà đối với hành trình Lan Hạ.' },
      ],
    },
    {
      id: 'chon-phong',
      title: 'Chọn phòng và tiện nghi trên tàu',
      blocks: [
        { p: 'Cabin là không gian riêng để bạn nghỉ ngơi sau các hoạt động tham quan. Khi lựa chọn, đừng chỉ nhìn vào hình ảnh hoặc tên hạng phòng mà nên kiểm tra một số yếu tố thực tế:' },
        {
          ul: [
            '**Ban công và sân hiên:** Cabin có ban công riêng giúp bạn ngắm cảnh và tận hưởng không gian ngoài trời ngay tại phòng.',
            '**Loại giường:** Kiểm tra phòng có giường đôi hay hai giường đơn, có thể kê giường phụ hoặc cho trẻ em ngủ cùng hay không.',
            '**Diện tích và vị trí:** Cabin ở các tầng khác nhau có thể mang đến tầm nhìn và mức độ yên tĩnh khác nhau.',
            '**Tiện nghi trong phòng:** Tìm hiểu về phòng tắm, bồn tắm, vòi sen, điều hòa, Wi-Fi và các dịch vụ đi kèm.',
            '**Không gian sinh hoạt chung:** Nhà hàng, boong tắm nắng, quầy bar và khu vực thư giãn cũng ảnh hưởng đến trải nghiệm tổng thể.',
          ],
        },
        { p: 'Green Ruby 1 và Green Ruby 2 được thiết kế theo cùng tiêu chuẩn, với bốn hạng phòng: **Serenity Deluxe, Ocean Breeze Premium, Royal Romance Suite và Imperial Suite**.' },
        { p: 'Hai hạng suite cao cấp dự kiến có dịch vụ quản gia riêng. Thông số và tiện nghi cần được đối chiếu với cấu hình chính thức của từng tàu trước khi đặt.' },
        { p: 'Bạn có thể tìm hiểu thêm về các hạng phòng và tình trạng chuẩn bị của đội tàu tại [trang thông tin thương hiệu Green Ruby](/vi/gioi-thieu/thong-tin-thuong-hieu).' },
      ],
    },
    {
      id: 'gia-gom-gi',
      title: 'Giá du thuyền bao gồm những gì?',
      blocks: [
        { p: 'Giá du thuyền nghỉ đêm thường bao gồm phòng nghỉ, các bữa ăn theo lịch trình và một số hoạt động tham quan. Tuy nhiên, phạm vi dịch vụ có thể khác nhau giữa các hãng và từng gói đặt chỗ.' },
        { p: 'Theo thông tin dự kiến của Green Ruby Cruises:' },
        {
          table: {
            head: ['Dịch vụ dự kiến đã bao gồm', 'Dịch vụ thường tính riêng'],
            rows: [
              ['Phòng nghỉ có điều hòa và phòng tắm riêng', 'Xe đưa đón Hà Nội hoặc sân bay – Tuần Châu'],
              ['Các bữa ăn theo chương trình', 'Đồ uống ngoài những loại được bao gồm trong gói'],
              ['Phí tham quan các địa điểm trong lịch trình', 'Dịch vụ spa'],
              ['Chèo kayak hoặc đi thuyền nan theo chương trình', 'Tiền tip cho nhân viên phục vụ và hướng dẫn viên'],
              ['Lớp học nấu ăn, tập Thái Cực Quyền và hướng dẫn viên', 'Bảo hiểm du lịch và chi phí cá nhân'],
              ['Tàu tham quan trong ngày thứ hai đối với hành trình 3 ngày 2 đêm', 'Các dịch vụ bổ sung theo yêu cầu'],
            ],
          },
        },
        { p: 'Trước khi đặt, bạn nên kiểm tra danh sách dịch vụ bao gồm và không bao gồm trong báo giá chính thức. Đây là cách tốt nhất để tránh những khoản chi phí ngoài dự kiến.' },
        { p: 'Bạn cũng cần đọc kỹ điều kiện [thanh toán](/vi/phuong-thuc-thanh-toan), đặt cọc và hủy chuyến. Theo chính sách Green Ruby đã công bố ([câu hỏi thường gặp](faq)), khách hủy trước ngày khởi hành từ 30 ngày trở lên được hoàn lại toàn bộ tiền đã thanh toán; mức phí hủy tăng dần khi ngày khởi hành đến gần và không hoàn tiền đối với trường hợp hủy trong vòng 7 ngày. Các điều khoản áp dụng cần được xác nhận tại thời điểm đặt chỗ.' },
        { note: '**Lưu ý:** Green Ruby 1 và Green Ruby 2 dự kiến bắt đầu khai thác từ tháng 2/2027. Đây vẫn là thời điểm dự kiến, chưa phải lịch khởi hành chính thức.' },
      ],
    },
    {
      id: 'chuan-bi',
      title: 'Chuẩn bị trước ngày đi',
      blocks: [
        { p: 'Một số việc đơn giản nên được chuẩn bị trước để ngày lên tàu diễn ra thuận lợi:' },
        {
          ul: [
            '**Giấy tờ tùy thân:** Mang theo căn cước hoặc hộ chiếu hợp lệ theo yêu cầu của đơn vị vận hành. Khách nước ngoài nên chuẩn bị hộ chiếu và các giấy tờ nhập cảnh cần thiết.',
            '**Thông tin sức khỏe và ăn uống:** Nếu bạn có dị ứng thực phẩm, chế độ ăn riêng hoặc vấn đề sức khỏe cần được hỗ trợ, hãy thông báo ngay khi đặt chỗ để nhân viên có thời gian chuẩn bị.',
            '**Bảo hiểm du lịch:** Nên cân nhắc bảo hiểm cho toàn bộ chuyến đi, đặc biệt nếu đi vào mùa mưa bão hoặc có các chuyến bay nối tiếp.',
            '**Phương thức thanh toán:** Chuẩn bị một ít tiền mặt cho các khoản chi tiêu nhỏ và xác nhận trước những [phương thức thanh toán](/vi/phuong-thuc-thanh-toan) được chấp nhận trên du thuyền.',
            '**Thông tin đón khách:** Lưu [địa chỉ phòng chờ](checkin-map), giờ làm thủ tục và [số liên hệ](contact) của đơn vị tổ chức trong trường hợp cần hỗ trợ.',
          ],
        },
      ],
    },
    {
      id: 'di-chuyen',
      title: 'Từ Hà Nội đến bến tàu',
      blocks: [
        { p: 'Từ trung tâm Hà Nội đến khu vực Tuần Châu, quãng đường di chuyển bằng ô tô thường khoảng 160–180 km tùy điểm xuất phát và tuyến đường.' },
        { p: 'Nếu đi xe riêng, hành trình thường mất khoảng 2,5–3 giờ trong điều kiện giao thông thuận lợi. Xe limousine ghép khách có thể mất thêm thời gian do cần đón khách tại nhiều địa điểm hoặc dừng nghỉ dọc đường.' },
        { p: 'Đây chỉ là thời gian tham khảo. Nếu đi vào cuối tuần, dịp lễ hoặc có lịch trình gấp, bạn nên dự phòng thêm thời gian.' },
        { p: 'Theo kế hoạch, Green Ruby sẽ hỗ trợ đặt xe limousine ghép khách hoặc xe riêng theo yêu cầu. Chi phí đưa đón được tính riêng, không mặc nhiên bao gồm trong giá du thuyền.' },
        { p: 'Để so sánh các phương tiện và tìm hiểu đường đến bến Tuần Châu từ Hà Nội, Nội Bài, Cát Bi hoặc Vân Đồn, bạn có thể tham khảo [hướng dẫn di chuyển Hà Nội – Hạ Long](transfer).' },
      ],
    },
    {
      id: 'ngay-len-tau',
      title: 'Ngày lên tàu diễn ra như thế nào?',
      blocks: [
        { p: 'Với một số du thuyền nghỉ đêm, khách làm thủ tục tại phòng chờ trên bờ trước khi được đưa ra tàu bằng xuồng trung chuyển.' },
        { p: 'Theo chương trình dự kiến của Green Ruby, quy trình đón khách được tổ chức tại Tuần Châu. Chọn tàu bên dưới để xem ngày đầu tiên của hành trình trên vịnh Hạ Long (Green Ruby 1) hoặc vịnh Lan Hạ (Green Ruby 2).' },
        { h3: 'Lịch trình ngày lên tàu dự kiến' },
        { widget: 'boarding-timeline' },
        { h3: 'Di chuyển bằng xuồng trung chuyển' },
        { p: 'Từ bến, khách có thể cần đi xuồng trung chuyển để đến du thuyền đang neo trên vịnh. Trong quá trình lên xuống xuồng, bạn nên tuân theo hướng dẫn của thủy thủ đoàn và mặc áo phao theo quy định.' },
        { p: 'Hành lý sẽ được hỗ trợ vận chuyển theo quy trình của tàu. Tuy nhiên, bạn nên giữ riêng một túi nhỏ đựng giấy tờ, điện thoại, thuốc cá nhân và những vật dụng cần sử dụng ngay.' },
        { p: 'Nếu đi cùng người lớn tuổi, trẻ nhỏ hoặc người gặp khó khăn khi di chuyển, hãy thông báo trước để được hướng dẫn phù hợp.' },
      ],
    },
    {
      id: 'tren-tau',
      title: 'Trên du thuyền có những hoạt động gì?',
      blocks: [
        { p: 'Lịch trình cụ thể khác nhau giữa các du thuyền, nhưng một chuyến nghỉ đêm thường có những hoạt động sau:' },
        {
          ul: [
            '**Buổi chiều:** Sau khi lên tàu và ăn trưa, du khách tham gia các hoạt động như tham quan hang động, chèo kayak, đi thuyền nan hoặc tắm biển, tùy chương trình.',
            '**Buổi tối:** Bạn có thể ngắm hoàng hôn trên boong, tham gia lớp học nấu ăn, thưởng thức bữa tối hoặc trải nghiệm câu mực đêm nếu lịch trình có tổ chức.',
            '**Sáng hôm sau:** Một số du thuyền có hoạt động tập Thái Cực Quyền, ăn sáng nhẹ và tham quan thêm một địa điểm trước khi trở về bến.',
          ],
        },
        { p: 'Du thuyền nghỉ đêm thường neo tại những khu vực được phép. Khách không tự ý rời tàu vào buổi tối.' },
        { p: 'Phần lớn hoạt động giải trí và tham quan có tính tự chọn. Nếu muốn nghỉ ngơi trên tàu thay vì tham gia một hoạt động nào đó, bạn nên thông báo với nhân viên để được hướng dẫn và bảo đảm an toàn. Xem thêm các [hoạt động trải nghiệm](/vi/hoat-dong-trai-nghiem) dự kiến trên tàu Green Ruby.' },
      ],
    },
    {
      id: 'an-toan',
      title: 'Thời tiết, an toàn và những lưu ý khi đi cùng gia đình',
      blocks: [
        { h3: 'Thời tiết và mùa bão' },
        { p: 'Hạ Long có thể tham quan vào nhiều thời điểm trong năm. Từ tháng 10 đến tháng 4, thời tiết thường mát mẻ hơn, trong khi giai đoạn tháng 5 đến tháng 9 nóng ẩm và có lượng mưa lớn.' },
        { p: 'Mùa mưa bão có thể ảnh hưởng đến lịch trình du thuyền. Khi xuất hiện thời tiết nguy hiểm, cơ quan chức năng có thể tạm dừng cấp phép cho tàu du lịch hoạt động. Trong những trường hợp này, đơn vị vận hành sẽ xử lý việc thay đổi ngày, hủy chuyến hoặc hoàn tiền theo chính sách áp dụng.' },
        { p: 'Nếu muốn lựa chọn thời điểm phù hợp, hãy xem bài [Du lịch Hạ Long mùa nào đẹp nhất? Thời tiết 12 tháng trong năm](bestTime).' },
        { h3: 'Đi du thuyền có dễ say sóng không?' },
        { p: 'Các tuyến du thuyền trên vịnh thường đi qua những vùng nước được đảo đá vôi che chắn nên tương đối êm khi thời tiết thuận lợi.' },
        { p: 'Tuy nhiên, tàu vẫn có thể rung lắc khi có gió lớn hoặc sóng mạnh. Nếu dễ bị say tàu xe, bạn nên chuẩn bị biện pháp phòng say phù hợp và hỏi nhân viên về điều kiện di chuyển trước khi khởi hành.' },
        { h3: 'Đi cùng trẻ em' },
        { p: 'Du thuyền nghỉ đêm có thể phù hợp với gia đình có trẻ nhỏ, nhưng bạn nên kiểm tra chính sách độ tuổi, giường phụ và các [quy định an toàn](/vi/chinh-sach-an-toan) của từng hãng.' },
        { p: 'Trẻ em cần mặc áo phao khi tham gia các hoạt động dưới nước và có người lớn giám sát. Với những hoạt động như chèo kayak, khả năng tham gia còn phụ thuộc vào độ tuổi, điều kiện thực tế và quy định của đơn vị tổ chức.' },
        { h3: 'Người lớn tuổi và người gặp khó khăn khi di chuyển' },
        { p: 'Một số hoạt động trên du thuyền đòi hỏi du khách phải bước lên xuống cầu cảng, xuồng trung chuyển hoặc di chuyển qua các bậc thang.' },
        { p: 'Những điểm tham quan như [hang Sửng Sốt](destination:hang-sung-sot) và [đảo Ti Tốp](destination:dao-ti-top) cũng có nhiều bậc đá, không phù hợp với tất cả mọi người.' },
        { p: 'Nếu đi cùng người lớn tuổi hoặc người gặp khó khăn khi di chuyển, bạn nên trao đổi trước với đơn vị vận hành về vị trí cabin, thang máy, phương án lên tàu và các hoạt động có thể tham gia.' },
      ],
    },
    {
      id: 'hanh-ly',
      title: 'Danh sách đồ cần mang theo',
      blocks: [
        { p: 'Với hành trình 2 ngày 1 đêm hoặc 3 ngày 2 đêm, bạn không cần mang quá nhiều hành lý. Một vali nhỏ hoặc túi du lịch gọn nhẹ thường thuận tiện hơn khi di chuyển giữa bến và du thuyền.' },
        {
          checklist: [
            { title: 'Giấy tờ và vật dụng quan trọng', items: ['Căn cước hoặc hộ chiếu hợp lệ', 'Thông tin xác nhận đặt chỗ', 'Thông tin bảo hiểm du lịch, nếu có', 'Một ít tiền mặt và phương thức thanh toán phù hợp'] },
            { title: 'Quần áo', items: ['Trang phục thoải mái, phù hợp với thời tiết', 'Đồ bơi và khăn nhanh khô nếu dự định tắm biển', 'Giày có độ bám tốt để đi hang động hoặc leo bậc đá', 'Áo khoác cho buổi tối trên boong, đặc biệt vào mùa lạnh', 'Mũ và kính râm'] },
            { title: 'Đồ dùng cá nhân', items: ['Kem chống nắng và thuốc chống côn trùng', 'Thuốc cá nhân, thuốc chống say tàu xe nếu cần', 'Túi chống nước cho điện thoại khi chèo kayak', 'Sạc dự phòng và dây sạc'] },
          ],
        },
      ],
    },
    {
      id: 'loi-thuong-gap',
      title: 'Những điều người đi lần đầu thường bỏ sót',
      blocks: [
        {
          ol: [
            '**Đặt chuyến bay quá sát giờ kết thúc hành trình.** Du thuyền thường trở về bến vào cuối buổi sáng, nhưng bạn vẫn cần thêm thời gian di chuyển đến sân bay. Nếu có chuyến bay nối tiếp, nên dự phòng đủ thời gian cho giao thông và các tình huống phát sinh (xem [giờ bay nên đặt](/vi/cam-nang/ha-noi-di-ha-long#chieu-ve)).',
            '**Đến nhầm cảng hoặc điểm làm thủ tục.** Hạ Long có nhiều cảng và khu vực đón khách. Trước ngày khởi hành, hãy kiểm tra chính xác [địa chỉ phòng chờ](checkin-map) và gửi địa điểm đó cho tài xế.',
            '**Quên giấy tờ tùy thân.** Đây là một trong những việc có thể ảnh hưởng trực tiếp đến thủ tục lên tàu. Bạn nên chuẩn bị giấy tờ từ tối hôm trước.',
            '**Chọn tour trong ngày vì nghĩ sẽ tiết kiệm thời gian.** Nếu đi từ Hà Nội, thời gian di chuyển khứ hồi có thể chiếm phần lớn ngày du lịch. Hành trình nghỉ đêm phù hợp hơn nếu bạn muốn dành nhiều thời gian trên vịnh.',
            '**Đặt kỳ vọng tắm biển vào mùa đông.** Từ tháng 12 đến tháng 2, thời tiết và nhiệt độ nước biển thường khá lạnh. Đây là thời điểm thích hợp hơn cho việc ngắm cảnh, tham quan hang động và nghỉ dưỡng trên du thuyền.',
            '**Không thông báo trước những nhu cầu đặc biệt.** Các yêu cầu về ăn uống, sức khỏe, giường phụ hoặc hỗ trợ di chuyển nên được trao đổi ngay khi đặt chỗ để đơn vị vận hành chuẩn bị chu đáo.',
          ],
        },
      ],
    },
    {
      id: 'hanh-trinh',
      title: 'Các hành trình dự kiến của Green Ruby',
      blocks: [
        { p: 'Green Ruby Cruises dự kiến khai thác hai du thuyền với các hành trình nghỉ đêm trên vịnh Hạ Long và Lan Hạ. Mỗi tàu có chương trình 2 ngày 1 đêm và 3 ngày 2 đêm.' },
        { widget: 'itineraries' },
        { note: 'Các hành trình trên đang trong giai đoạn chuẩn bị khai thác. Lịch khởi hành dự kiến từ tháng 2/2027 và có thể được điều chỉnh trước khi chính thức đưa tàu vào hoạt động.' },
      ],
    },
  ],
  faqTitle: 'Câu hỏi thường gặp',
  faq: [
    { q: 'Có nên đi du thuyền Hạ Long không?', a: 'Nếu muốn ngắm cảnh vịnh ở nhiều thời điểm trong ngày và có thêm thời gian nghỉ dưỡng, du thuyền ngủ đêm là lựa chọn đáng cân nhắc. Đây cũng là hình thức phù hợp với du khách muốn kết hợp tham quan, ăn uống và nghỉ ngơi trong cùng một hành trình.' },
    { q: 'Đi du thuyền Hạ Long mấy ngày là hợp lý?', a: 'Hành trình 2 ngày 1 đêm phù hợp với phần lớn du khách đi lần đầu hoặc có lịch trình ngắn. Nếu muốn tham quan thêm các địa điểm và dành nhiều thời gian thư giãn, bạn có thể chọn 3 ngày 2 đêm.' },
    { q: 'Đi du thuyền Hạ Long cần mang gì?', a: 'Bạn nên chuẩn bị giấy tờ tùy thân, quần áo phù hợp với thời tiết, giày có độ bám tốt, đồ bơi, kem chống nắng và các loại thuốc cá nhân cần thiết. Vào mùa đông, đừng quên áo khoác cho buổi tối và sáng sớm trên boong.' },
    { q: 'Đi du thuyền trên vịnh có say sóng không?', a: 'Mặt nước trên nhiều tuyến tham quan thường tương đối êm khi thời tiết thuận lợi, nhưng người nhạy cảm vẫn có thể bị say sóng. Nếu dễ say tàu xe, bạn nên chủ động chuẩn bị biện pháp phòng say phù hợp.' },
    { q: 'Thời tiết xấu thì du thuyền có bị hủy không?', a: 'Có thể. Khi thời tiết nguy hiểm, cơ quan chức năng có thể tạm dừng hoạt động của tàu du lịch. Chính sách hoàn tiền, đổi ngày hoặc chuyển sang dịch vụ khác sẽ phụ thuộc vào điều khoản đặt chỗ của từng hãng.' },
    { q: 'Mấy giờ phải có mặt ở bến?', a: 'Giờ làm thủ tục tùy theo từng hãng và hành trình. Với Green Ruby, thời gian dự kiến là khoảng 10:45 tại phòng chờ Tuần Châu. Bạn cần xác nhận lại giờ và địa điểm chính thức trước ngày khởi hành.' },
  ],
  related: {
    title: 'Tìm hiểu thêm trước chuyến đi',
    links: [
      { href: 'transfer', title: 'Hà Nội đi Hạ Long', body: 'Hướng dẫn phương tiện di chuyển, bến tàu và thời gian đi từ Hà Nội hoặc các sân bay gần Hạ Long.' },
      { href: 'destinations', title: 'Điểm đến trên vịnh', body: 'Khám phá các hang động, đảo, làng chài và những điểm tham quan nổi bật ở Hạ Long và Lan Hạ.' },
      { href: 'luxuryPillar', title: 'Kinh nghiệm chọn du thuyền Hạ Long cao cấp', body: 'Những điều cần biết về hành trình, hạng phòng, tiện nghi và chi phí trước khi đặt du thuyền nghỉ đêm.' },
    ],
  },
  estimateNote: 'Thời gian di chuyển, lịch trình tham quan và các thông tin vận hành trong bài mang tính tham khảo. Hai du thuyền Green Ruby dự kiến bắt đầu khai thác từ tháng 2/2027; ngày khởi hành và chương trình chính thức có thể được điều chỉnh.',
  timeline: {
    label: 'Chọn tàu',
    note: 'Các mốc thời gian trên chỉ mang tính tham khảo theo chương trình đã công bố. Lịch trình có thể điều chỉnh tùy theo tình hình thời tiết, điều kiện khai thác và quy định của cơ quan chức năng.',
    tabs: [
      {
        key: 'gr1',
        label: 'Green Ruby 1 · Vịnh Hạ Long',
        steps: [
          { time: 'Khoảng 08:00', title: 'Khởi hành từ Hà Nội', body: 'Nếu đặt dịch vụ xe đưa đón, xe sẽ đón khách tại địa điểm đã thỏa thuận.' },
          { time: 'Khoảng 10:45', title: 'Làm thủ tục tại Tuần Châu', body: 'Xuất trình giấy tờ, làm thủ tục và nghỉ tại phòng chờ Green Ruby.' },
          { time: 'Khoảng 11:45', title: 'Di chuyển ra du thuyền', body: 'Khách được đưa đến tàu Green Ruby 1 bằng xuồng trung chuyển.' },
          { time: 'Khoảng 12:30', title: 'Hướng dẫn an toàn và nhận phòng', body: 'Nhân viên phổ biến các quy định an toàn và hướng dẫn khách về cabin.' },
          { time: 'Khoảng 13:00', title: 'Ăn trưa', body: 'Thưởng thức bữa trưa khi du thuyền bắt đầu hành trình trên vịnh.' },
          { time: 'Khoảng 15:30', title: 'Tham quan hang Luồn', body: 'Chèo kayak hoặc đi thuyền nan, sau đó dự kiến ghé đảo Ti Tốp vào khoảng 16:30.' },
        ],
      },
      {
        key: 'gr2',
        label: 'Green Ruby 2 · Vịnh Lan Hạ',
        steps: [
          { time: 'Khoảng 08:00', title: 'Khởi hành từ Hà Nội', body: 'Nếu đặt dịch vụ xe đưa đón, xe sẽ đón khách tại địa điểm đã thỏa thuận.' },
          { time: 'Khoảng 10:45', title: 'Làm thủ tục tại Tuần Châu', body: 'Làm thủ tục tại cùng phòng chờ Green Ruby với khách Green Ruby 1.' },
          { time: 'Khoảng 11:45', title: 'Di chuyển đến Gia Luận', body: 'Xuồng trung chuyển đưa khách sang khu vực bến Gia Luận (Cát Bà, Hải Phòng) để lên tàu Green Ruby 2 trên vịnh Lan Hạ.' },
          { time: 'Khoảng 12:30', title: 'Hướng dẫn an toàn và nhận phòng', body: 'Nhân viên phổ biến các quy định an toàn và hướng dẫn khách về cabin.' },
          { time: 'Khoảng 13:00', title: 'Ăn trưa', body: 'Thưởng thức bữa trưa khi du thuyền tiến vào vịnh Lan Hạ.' },
          { time: 'Khoảng 15:00–15:30', title: 'Tham quan hang Sáng Tối', body: 'Chèo kayak hoặc đi thuyền nan khám phá khu vực hang Sáng Tối.' },
        ],
      },
    ],
  },
  itineraries: {
    title: 'Các hành trình dự kiến của Green Ruby',
    days: (n) => `${n} ngày ${n - 1} đêm`,
    view: 'Xem hành trình',
    descriptions: {
      'ha-long:2': 'Hành trình dự kiến đưa du khách đến hang Luồn, đảo Ti Tốp và hang Sửng Sốt, kết hợp các hoạt động chèo kayak, tham quan và nghỉ đêm trên vịnh.',
      'ha-long:3': 'Có thêm một ngày khám phá các điểm đến như làng chài Cửa Vạn, hang Tiên Ông và trang trại ngọc trai theo chương trình dự kiến.',
      'lan-ha:2': 'Hành trình dự kiến bao gồm khu vực hang Sáng Tối và Ao Ếch, phù hợp với du khách yêu thích chèo kayak và không gian yên tĩnh.',
      'lan-ha:3': 'Dành thêm thời gian khám phá làng Việt Hải trên đảo Cát Bà và tham gia các hoạt động nghỉ dưỡng, tham quan theo chương trình.',
    },
  },
};

export default firstTime;
