import type { Locale } from '@/lib/i18n';

// Booking Terms & Conditions (/booking-terms-and-conditions, /vi/dieu-khoan-dat-tour). Kept in code like the
// cookie policy: a long, structured legal text, EN and VI with the same 20 sections and the same anchors.
// Commercial terms follow TPX's rules of 27/10/2026 (30% deposit or optional full payment more than 30 days out,
// full payment within 30 days, balance 30 days before, cancellation schedule, weather options, payment methods).
// Still a draft until TPX approves; open points: docs/booking-terms-review.md.

/**
 * Publication control. While "draft": the page is reachable but marked as a draft, noindex, out of the sitemap,
 * and nothing on the site links to it. Set "published" (with the approved effective date) only after TPX
 * approval; the footer, related-policy and booking-step links then appear (see bookingTermsLinked).
 */
export const BOOKING_TERMS: { status: 'draft' | 'published'; effectiveDate: string | null; updated: string } = {
  status: 'draft',
  effectiveDate: null,
  updated: '2026-10-26',
};

export const bookingTermsLinked = (status: 'draft' | 'published' = BOOKING_TERMS.status) => status === 'published';

/**
 * The version a guest accepts in the booking flow: the effective date of the published terms. The CMS
 * must be configured with the same value (BOOKING_TERMS_VERSION); a draft has no version, so the CMS
 * refuses acceptance of it.
 */
export const bookingTermsVersion = (terms: typeof BOOKING_TERMS = BOOKING_TERMS): string | null =>
  terms.status === 'published' ? terms.effectiveDate : null;

/** Site paths the text links to, per language. */
export type BookingTermsPaths = { privacy: string; contact: string };

export type BookingTermsSection = { id: string; title: string; html: (p: BookingTermsPaths) => string };

type BookingTermsCopy = {
  title: string;
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  heroTitleEm: string;
  heroIntro: string;
  draftTitle: string;
  draftBody: string;
  effectiveLabel: string;
  effectivePending: string;
  operator: string;
  introHeading: string;
  introHtml: string;
  glance: { title: string; items: [string, string][]; tableLink: string };
  sections: BookingTermsSection[];
  contactLines: { email: string; phone: string; page: string };
  closingNote: string;
};

const table = (head: [string, string], rows: [string, string][]) =>
  `<div data-table><table><thead><tr><th scope="col">${head[0]}</th><th scope="col">${head[1]}</th></tr></thead><tbody>${rows
    .map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`)
    .join('')}</tbody></table></div>`;

const ul = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;

const en: BookingTermsCopy = {
  title: 'Booking Terms & Conditions',
  seoTitle: 'Booking Terms & Conditions | Green Ruby Cruises',
  seoDescription:
    'Booking terms for Green Ruby Cruises: reservations and confirmation, 30% deposit, payment, cancellation charges, changes, refunds, weather and check-in.',
  heroTitle: 'Booking terms,',
  heroTitleEm: 'clearly set out.',
  heroIntro: 'The conditions that apply when you reserve a Green Ruby cruise: confirmation, payment, cancellation, changes and refunds.',
  draftTitle: 'Draft — not yet in effect.',
  draftBody:
    'These Booking Terms & Conditions are awaiting approval and do not yet apply to any reservation. Until an effective date is published here, the terms in your booking confirmation apply.',
  effectiveLabel: 'Effective date',
  effectivePending: 'To be confirmed',
  operator: 'Green Ruby Cruises is operated by TPX JOINT STOCK COMPANY · Vietnam enterprise / tax registration no. 5702096485',
  introHeading: 'Before you confirm your reservation.',
  introHtml:
    '<p>These Booking Terms & Conditions apply to reservations made directly with Green Ruby Cruises through our official website, reservations team, or other authorised booking channels.</p>' +
    '<p>Please read them carefully before confirming your reservation. You will be asked to accept them before your booking is confirmed or paid. By accepting them, you acknowledge the booking conditions, payment requirements, cancellation policies and responsibilities described below.</p>',
  glance: {
    title: 'At a glance',
    items: [
      ['More than 30 days before departure', '30% deposit, or full payment if you prefer'],
      ['Balance', 'The remaining 70%, no later than 30 calendar days before departure'],
      ['30 days or less before departure', 'Full payment at booking'],
      ['Payment methods', 'Card (Stripe) or PayPal in USD; bank transfer by VietQR (SePay) in VND'],
      ['Confirmed when', 'We have accepted the booking and received the deposit or full payment'],
      ['Changes', 'Up to two amendments; a new date is treated as a cancellation and a new booking'],
    ],
    tableLink: 'See the cancellation charges',
  },
  sections: [
    {
      id: 'general',
      title: 'General Information',
      html: () =>
        '<p>Green Ruby Cruises is a luxury overnight cruise brand operated by TPX JOINT STOCK COMPANY in Vietnam.</p>' +
        '<p>Our fleet comprises two sister ships:</p>' +
        ul(['<strong>Green Ruby 1:</strong> overnight cruises in Ha Long Bay.', '<strong>Green Ruby 2:</strong> overnight cruises in Lan Ha Bay.']) +
        '<p>Our cruise programmes include 2-day/1-night and 3-day/2-night itineraries, together with selected private charter arrangements.</p>' +
        '<p>Cruise operations are subject to the necessary regulatory approvals, weather conditions, navigation restrictions and instructions issued by the competent Vietnamese authorities.</p>',
    },
    {
      id: 'reservations',
      title: 'Reservations and Booking Confirmation',
      html: () =>
        '<h3>2.1 Making a reservation</h3>' +
        '<p>Guests may request or make reservations through:</p>' +
        ul([
          'The official Green Ruby Cruises website.',
          'Our reservations team by email, telephone or authorised messaging channels.',
          'Authorised travel agents and distribution partners.',
        ]) +
        '<p>All reservations are subject to cabin availability and confirmation.</p>' +
        '<h3>2.2 Booking confirmation</h3>' +
        '<p>Submitting a reservation request does not, by itself, guarantee a confirmed booking.</p>' +
        '<p>Once availability and the applicable rate have been established, Green Ruby Cruises will provide a booking summary or confirmation containing the relevant details, including:</p>' +
        ul([
          'Guest name and number of passengers.',
          'Cruise departure date and duration.',
          'Vessel, itinerary and cabin category.',
          'Total price and included services.',
          'Deposit amount and payment deadline.',
          'Applicable cancellation conditions.',
        ]) +
        '<p>A reservation becomes confirmed when Green Ruby Cruises has accepted the booking and received the required deposit or full payment, or has expressly agreed to alternative payment arrangements in writing.</p>' +
        '<p>Guests are responsible for checking their booking details and promptly reporting any errors.</p>' +
        '<h3>2.3 Bookings made for other guests</h3>' +
        '<p>Anyone making a reservation on behalf of other passengers must have their authorisation and ensure that all passengers receive the relevant booking conditions.</p>',
    },
    {
      id: 'rates',
      title: 'Cruise Rates and Inclusions',
      html: () =>
        '<p>Cruise rates depend on the selected departure date, itinerary, cabin category, occupancy, seasonal demand and applicable offers.</p>' +
        '<p>The final price and currency will be shown in the booking confirmation.</p>' +
        '<p>Unless otherwise specified, the cruise package includes the accommodation, meals, scheduled excursions and services expressly listed in the selected itinerary or booking confirmation.</p>' +
        '<p>Applicable sightseeing and entrance fees included in the confirmed cruise programme are covered by Green Ruby Cruises.</p>' +
        '<p>The following may incur additional charges unless expressly included:</p>' +
        ul([
          'Transfers between Hanoi, airports, hotels and the embarkation point.',
          'Beverages outside the included package.',
          'Spa treatments and other optional services.',
          'Personal purchases and laundry services.',
          'Travel insurance and visa-related expenses.',
          'Gratuities and other personal expenses.',
        ]) +
        '<p>Any mandatory supplements or additional fees applicable to the reservation will be disclosed before booking confirmation.</p>' +
        '<p>Prices may change before a booking is confirmed. Once confirmed, the agreed price will remain applicable unless a change is mutually agreed or an adjustment is required by applicable law.</p>',
    },
    {
      id: 'payment',
      title: 'Deposit and Payment',
      html: () =>
        '<h3>4.1 Deposit requirements</h3>' +
        '<p>For bookings made <strong>more than 30 calendar days before departure</strong>, a deposit of <strong>30% of the total booking value</strong> secures the reservation. You may instead choose to pay the full amount at the time of booking.</p>' +
        '<p>Where a deposit is paid, the remaining 70% must be paid no later than <strong>30 calendar days before departure</strong>.</p>' +
        '<p>For bookings made 30 calendar days or less before departure, full payment is required at the time of booking.</p>' +
        '<p>Different payment schedules may apply to group reservations, private charters and special promotional offers where clearly stated and accepted before confirmation.</p>' +
        '<h3>4.2 Accepted payment methods</h3>' +
        '<p>Online payments are accepted through the following providers:</p>' +
        ul([
          '<strong>Credit or debit card</strong>, processed by Stripe, in US dollars (USD).',
          '<strong>PayPal</strong>, in US dollars (USD).',
          '<strong>Bank transfer by VietQR</strong>, processed by SePay, in Vietnamese dong (VND).',
        ]) +
        '<p>For reservations confirmed by our reservations team, payment instructions will be sent using one of these methods through an official Green Ruby Cruises channel.</p>' +
        '<p>Onboard extras not included in your booking, such as additional drinks or spa treatments, can be paid in cash or by card at check-out at the end of the cruise.</p>' +
        '<h3>4.3 Currency and transaction charges</h3>' +
        '<p>Payments must be made in the currency specified in the booking confirmation or payment instructions: US dollars for bookings made on the English website, Vietnamese dong for bookings made on the Vietnamese website.</p>' +
        '<p>Where currency conversion applies, the final amount may depend on the exchange rate and charges imposed by the guest’s bank or payment provider.</p>' +
        '<p>Any additional transaction or processing charges payable by the guest will be disclosed, where known, before payment and will comply with applicable law.</p>' +
        '<h3>4.4 Late or incomplete payment</h3>' +
        '<p>If payment is not received by the agreed deadline, Green Ruby Cruises may contact the guest and request settlement within an additional reasonable period.</p>' +
        '<p>Failure to complete payment after written notice may result in cancellation of the reservation, subject to the applicable cancellation conditions and legal requirements.</p>',
    },
    {
      id: 'cancellation',
      title: 'Cancellation by Guests',
      html: () =>
        '<p>Cancellation requests must be submitted in writing through the original booking channel or directly to the Green Ruby Cruises reservations team.</p>' +
        '<p>For standard reservations, the following cancellation charges apply unless different conditions were clearly disclosed and accepted at the time of booking.</p>' +
        table(
          ['Cancellation notice before departure', 'Cancellation charge'],
          [
            ['30 calendar days or more', 'No cancellation charge; 100% refund of the cruise amount paid'],
            ['15–29 calendar days', '50% of the total booking value'],
            ['7–14 calendar days', '75% of the total booking value'],
            ['0–6 calendar days', '100% of the total booking value'],
            ['No-show', '100% of the total booking value'],
          ],
        ) +
        '<p>Cancellation charges are calculated against the total confirmed booking value, not only the amount deposited.</p>' +
        '<p>Where the amount already paid is less than the applicable cancellation charge, any additional amount due will be handled in accordance with the confirmed booking agreement and applicable law.</p>' +
        '<p>The cancellation date is determined by when Green Ruby Cruises receives the written request, using Vietnam local time (GMT+7).</p>' +
        '<p>Different conditions may apply to private charters, group bookings, promotional rates and special offers if communicated before the reservation is confirmed.</p>',
    },
    {
      id: 'changes',
      title: 'Changes to Reservations',
      html: () =>
        '<p>Guests may request changes to departure dates, cabin categories, passenger details or other booking arrangements.</p>' +
        '<p>All changes are subject to availability and written confirmation by Green Ruby Cruises.</p>' +
        '<p>A requested change of departure date is treated as cancellation of the original reservation and creation of a new booking. Applicable cancellation charges and price differences may therefore apply.</p>' +
        '<p>A standard booking may be amended up to two times, subject to the agreed conditions.</p>' +
        '<p>If the new reservation has a higher price, the guest must pay the difference. Any reduction in price or refundable amount will be handled under the applicable booking conditions.</p>' +
        '<p>Transferring a booking to another passenger requires prior approval and submission of the necessary passenger information.</p>',
    },
    {
      id: 'refunds',
      title: 'Refunds',
      html: () =>
        '<p>Where a refund is due, Green Ruby Cruises will confirm the amount in writing, together with any applicable deductions permitted by these terms and Vietnamese law.</p>' +
        '<p>Refunds will generally be processed through the original payment method where reasonably possible.</p>' +
        '<p>The refund amount will be based on the amount actually received for the affected reservation, taking into account applicable cancellation charges and any services already provided.</p>' +
        '<p>Any non-refundable third-party expenses may be deducted only where properly disclosed, contractually permitted and legally applicable.</p>' +
        '<p>Refund processing times depend on the payment method and the receiving financial institution. Guests will be informed of the expected processing period when their refund is confirmed.</p>' +
        '<p>Green Ruby Cruises will not withhold any refund required by applicable consumer protection laws.</p>',
    },
    {
      id: 'operator-changes',
      title: 'Cancellation or Changes by Green Ruby Cruises',
      html: () =>
        '<p>Green Ruby Cruises may need to change or cancel a departure due to circumstances including:</p>' +
        ul([
          'Severe weather or unsafe navigation conditions.',
          'Instructions from port or maritime authorities.',
          'Vessel safety or technical issues.',
          'Government restrictions or other legal requirements.',
          'Other circumstances that materially affect the safe operation of the cruise.',
        ]) +
        '<p>Where Green Ruby Cruises cancels a confirmed departure for reasons within its control, guests will be offered an appropriate alternative arrangement or a refund of the affected cruise services.</p>' +
        '<p>Where reasonably available, alternatives may include a different departure date, a comparable cruise programme or another vessel of an equivalent standard.</p>' +
        '<p>Guests will be informed of material changes as promptly as reasonably practicable.</p>' +
        '<p>If a material change cannot be accepted, the available refund and cancellation options will be determined by the circumstances, the confirmed booking agreement and applicable law.</p>',
    },
    {
      id: 'weather',
      title: 'Weather Conditions and Itinerary Changes',
      html: () =>
        '<p>Ha Long Bay and Lan Ha Bay cruise operations are subject to weather conditions and the decisions of competent maritime and port authorities.</p>' +
        '<p>For safety reasons, the authorities may restrict navigation, suspend overnight cruises, close certain attractions or prohibit vessels from departing at short notice.</p>' +
        '<h3>9.1 Cancellation before departure</h3>' +
        '<p>If the cruise cannot depart because the competent authorities have restricted navigation for weather or safety reasons, guests will be offered the choice of a <strong>change of departure date</strong> or a <strong>full refund of the affected cruise booking</strong>.</p>' +
        '<h3>9.2 Shortened cruises</h3>' +
        '<p>If a cruise that has already begun must be shortened, Green Ruby Cruises will explain the revised programme and make a <strong>fair adjustment</strong> based on the services provided and applicable law.</p>' +
        '<p>Services already delivered, such as meals, accommodation, excursions or transfers, will be identified when calculating the adjustment.</p>' +
        '<h3>9.3 Changes during the cruise</h3>' +
        '<p>The Captain may adjust the sailing route, activity sequence, anchorage or schedule when necessary for safety or compliance with official instructions.</p>' +
        '<p>Alternative activities or destinations may be provided where reasonably possible.</p>' +
        '<p>Green Ruby Cruises cannot guarantee access to every sightseeing location where access depends on weather, tides, local restrictions or authority decisions.</p>',
    },
    {
      id: 'passenger-information',
      title: 'Passenger Information and Travel Documents',
      html: () =>
        '<p>Guests must provide accurate passenger information required for registration, immigration compliance and maritime safety.</p>' +
        '<p>Depending on applicable requirements, this may include:</p>' +
        ul([
          'Full legal name.',
          'Date of birth and nationality.',
          'Passport or identification document details.',
          'Visa or immigration information where relevant.',
          'Dietary requirements or other information necessary to arrange the booked services.',
        ]) +
        '<p>Guests must carry valid identity and travel documents and comply with Vietnamese entry and immigration requirements.</p>' +
        '<p>Green Ruby Cruises may be unable to accommodate guests who fail to provide information or documents legally required for embarkation.</p>' +
        '<p>Any resulting cancellation or refund will be assessed under the applicable booking terms and law.</p>',
    },
    {
      id: 'check-in',
      title: 'Check-in and Embarkation',
      html: () =>
        '<p>The designated check-in location is the Green Ruby Cruises reception lounge at Tuan Chau International Passenger Port, unless otherwise stated in the booking confirmation.</p>' +
        '<p>Guests must arrive within the check-in window communicated before departure.</p>' +
        '<p>Embarkation may involve a tender transfer. Depending on the selected vessel and itinerary, passengers may also be transferred to another pier before boarding the main cruise vessel.</p>' +
        '<p>The boarding arrangements and departure times are subject to operational and safety requirements.</p>' +
        '<p>Guests who anticipate arriving late should contact the reservations or operations team immediately.</p>' +
        '<p>Failure to arrive by the required boarding deadline may result in a missed departure and application of the no-show policy.</p>',
    },
    {
      id: 'safety',
      title: 'Health, Safety and Guest Conduct',
      html: () =>
        '<p>Guests must follow lawful safety instructions given by the Captain, crew and relevant authorities.</p>' +
        '<p>Guests should inform Green Ruby Cruises before travel of any mobility limitations, medical needs, dietary restrictions or circumstances that may require special assistance.</p>' +
        '<p>Participation in excursions such as kayaking, swimming, cycling or other physical activities is subject to weather, safety assessments, individual suitability and applicable restrictions.</p>' +
        '<p>Children must be supervised by their accompanying adults.</p>' +
        '<p>Guests must behave respectfully toward other passengers, crew members and the natural environment.</p>' +
        '<p>Green Ruby Cruises may take appropriate action where a guest presents a serious safety risk or materially violates lawful onboard safety requirements.</p>' +
        '<p>Any refusal of service, disembarkation or related refund decision must comply with applicable law.</p>',
    },
    {
      id: 'cabins',
      title: 'Cabin Allocation and Onboard Services',
      html: () =>
        '<p>Cabin reservations are confirmed by category unless a specific cabin number is expressly guaranteed in writing.</p>' +
        '<p>In exceptional operational circumstances, Green Ruby Cruises may offer alternative accommodation of an equivalent or higher standard.</p>' +
        '<p>Guests will be informed if a material change affects their confirmed accommodation.</p>' +
        '<p>Cabin descriptions, layouts and photographs are intended to represent the accommodation accurately, although minor differences may exist between cabins within the same category.</p>' +
        '<p>Certain onboard services, excursions and facilities may be temporarily unavailable due to safety, maintenance, weather or operational requirements.</p>',
    },
    {
      id: 'groups-charters',
      title: 'Group Reservations and Private Charters',
      html: () =>
        '<p>Group reservations and exclusive vessel charters may have separate booking, payment, cancellation and minimum-guarantee conditions.</p>' +
        '<p>These conditions will be provided in the relevant quotation or charter agreement before the reservation is confirmed.</p>' +
        '<p>Where a separately agreed contract conflicts with these general terms, the specific agreed provisions will govern to the extent permitted by applicable law.</p>',
    },
    {
      id: 'insurance',
      title: 'Travel Insurance and Personal Belongings',
      html: () =>
        '<p>Guests are strongly advised to purchase appropriate travel insurance covering cancellation, medical treatment, personal accidents, lost baggage and travel disruption.</p>' +
        '<p>Guests are responsible for taking reasonable care of their personal belongings and valuables.</p>' +
        '<p>Any loss, damage or injury will be assessed in accordance with the circumstances, Green Ruby Cruises’ legal obligations and applicable Vietnamese law.</p>' +
        '<p>Neither party is responsible for failing to perform its obligations where this is caused by events beyond its reasonable control, such as natural disasters, severe weather or decisions of public authorities (force majeure). This does not affect the date change and refund options in sections 8 and 9.</p>' +
        '<p>Nothing in these terms excludes or limits liability where such exclusion or limitation is prohibited by law.</p>',
    },
    {
      id: 'agents',
      title: 'Bookings Through Travel Agents and Third Parties',
      html: () =>
        '<p>Where a reservation is made through a travel agent, online travel agency or other authorised partner, guests should contact the original booking provider regarding payments, changes, cancellations and refunds.</p>' +
        '<p>The booking conditions disclosed and accepted through that provider may include additional or different terms.</p>' +
        '<p>Green Ruby Cruises remains responsible for the cruise services it is legally and contractually obligated to provide.</p>',
    },
    {
      id: 'complaints',
      title: 'Complaints and Dispute Resolution',
      html: () =>
        '<p>Guests experiencing any problem during their cruise are encouraged to inform the Cruise Manager or Guest Relations team promptly so that the matter can be addressed.</p>' +
        '<p>Formal complaints may also be submitted in writing through the official Green Ruby Cruises contact channels, including after the cruise.</p>' +
        '<p>Please include the booking reference, travel date, a description of the issue and any relevant supporting information.</p>' +
        '<p>Green Ruby Cruises will review complaints in good faith and seek a fair resolution in accordance with applicable Vietnamese law.</p>' +
        '<p>If a dispute cannot be resolved through direct discussion or another mutually agreed lawful process, either party may refer the matter to the competent authority or court in accordance with applicable law.</p>' +
        '<p>These terms do not restrict any mandatory rights available to consumers.</p>',
    },
    {
      id: 'privacy',
      title: 'Privacy and Personal Data',
      html: (p) =>
        '<p>Personal information collected during the booking process will be used for reservation management, payment administration, guest communications, regulatory passenger registration and delivery of the booked services.</p>' +
        `<p>Personal data will be processed in accordance with applicable Vietnamese data protection laws and the Green Ruby Cruises <a href="${p.privacy}">Privacy Policy</a>.</p>` +
        '<p>Where disclosure to public authorities, payment providers or operational partners is required or otherwise legally permitted, Green Ruby Cruises will handle such information in accordance with applicable requirements.</p>',
    },
    {
      id: 'law',
      title: 'Applicable Law and Amendments',
      html: () =>
        '<p>These Booking Terms & Conditions are governed by the laws of Vietnam.</p>' +
        '<p>Green Ruby Cruises may update these terms from time to time to reflect operational, commercial or legal changes.</p>' +
        '<p>Material changes will not be applied retroactively to confirmed bookings without an appropriate legal or contractual basis.</p>' +
        '<p>The version of the terms accepted at the time of booking will form part of the applicable booking agreement, together with the booking confirmation and any expressly agreed special conditions.</p>',
    },
    {
      id: 'contact',
      title: 'Contact Information',
      html: (p) =>
        `<p>For reservations, payment questions, cancellation requests or complaints, please contact Green Ruby Cruises through the contact details published on our <a href="${p.contact}">contact page</a>.</p>` +
        '<p><strong>Green Ruby Cruises</strong><br>Operated by TPX JOINT STOCK COMPANY<br>Enterprise / tax registration no. 5702096485<br>Official website: https://greenrubycruises.com</p>',
    },
  ],
  contactLines: { email: 'Email', phone: 'Telephone', page: 'All contact details' },
  closingNote: 'These terms should be read together with the applicable booking confirmation, itinerary inclusions and Privacy Policy.',
};

const vi: BookingTermsCopy = {
  title: 'Điều khoản và Điều kiện Đặt Du thuyền',
  seoTitle: 'Điều khoản đặt du thuyền | Green Ruby Cruises',
  seoDescription:
    'Điều khoản đặt du thuyền Green Ruby Cruises: xác nhận đặt chỗ, đặt cọc 30%, thanh toán, phí hủy, thay đổi, hoàn tiền, thời tiết và làm thủ tục lên tàu.',
  heroTitle: 'Điều khoản đặt chỗ,',
  heroTitleEm: 'rõ ràng từ đầu.',
  heroIntro: 'Những điều kiện áp dụng khi Quý khách đặt du thuyền Green Ruby: xác nhận, thanh toán, hủy, thay đổi và hoàn tiền.',
  draftTitle: 'Bản dự thảo — chưa có hiệu lực.',
  draftBody:
    'Điều khoản và Điều kiện Đặt Du thuyền này đang chờ phê duyệt và chưa áp dụng cho bất kỳ đặt chỗ nào. Cho đến khi ngày có hiệu lực được công bố tại đây, các điều kiện trong xác nhận đặt chỗ của Quý khách được áp dụng.',
  effectiveLabel: 'Ngày có hiệu lực',
  effectivePending: 'Sẽ cập nhật sau khi được phê duyệt',
  operator: 'Green Ruby Cruises do Công ty Cổ phần TPX (TPX JOINT STOCK COMPANY) vận hành · Mã số doanh nghiệp / Mã số thuế 5702096485',
  introHeading: 'Trước khi Quý khách xác nhận đặt chỗ.',
  introHtml:
    '<p>Các Điều khoản và Điều kiện Đặt Du thuyền dưới đây áp dụng đối với những đặt chỗ được thực hiện trực tiếp với Green Ruby Cruises thông qua website chính thức, bộ phận đặt phòng hoặc các kênh đặt chỗ được ủy quyền.</p>' +
    '<p>Vui lòng đọc kỹ các điều khoản trước khi xác nhận đặt chỗ. Quý khách sẽ được đề nghị xác nhận đồng ý với các điều khoản này trước khi đặt chỗ được xác nhận hoặc thanh toán. Khi đồng ý, Quý khách xác nhận đã được thông tin về điều kiện đặt chỗ, thanh toán, hủy đặt chỗ và trách nhiệm của các bên.</p>',
  glance: {
    title: 'Tóm tắt',
    items: [
      ['Đặt trước ngày khởi hành hơn 30 ngày', 'Đặt cọc 30%, hoặc thanh toán toàn bộ nếu Quý khách muốn'],
      ['Thanh toán còn lại', '70% còn lại, chậm nhất 30 ngày theo lịch trước ngày khởi hành'],
      ['Đặt trong vòng 30 ngày trở xuống', 'Thanh toán toàn bộ khi đặt chỗ'],
      ['Phương thức thanh toán', 'Thẻ (Stripe) hoặc PayPal bằng USD; chuyển khoản VietQR (SePay) bằng VND'],
      ['Được xác nhận khi', 'Chúng tôi chấp thuận đặt chỗ và nhận khoản đặt cọc hoặc toàn bộ số tiền'],
      ['Thay đổi', 'Tối đa hai lần; đổi ngày được xử lý như hủy và đặt chỗ mới'],
    ],
    tableLink: 'Xem biểu phí hủy',
  },
  sections: [
    {
      id: 'general',
      title: 'Thông tin chung',
      html: () =>
        '<p>Green Ruby Cruises là thương hiệu du thuyền nghỉ đêm cao cấp do Công ty Cổ phần TPX vận hành tại Việt Nam.</p>' +
        '<p>Đội tàu Green Ruby Cruises gồm hai du thuyền:</p>' +
        ul(['<strong>Green Ruby 1:</strong> khai thác các hành trình nghỉ đêm trên vịnh Hạ Long.', '<strong>Green Ruby 2:</strong> khai thác các hành trình nghỉ đêm trên vịnh Lan Hạ.']) +
        '<p>Các chương trình bao gồm hành trình 2 ngày 1 đêm, 3 ngày 2 đêm và một số dịch vụ thuê du thuyền riêng theo thỏa thuận.</p>' +
        '<p>Hoạt động khai thác du thuyền phụ thuộc vào các giấy phép và chấp thuận cần thiết, điều kiện thời tiết, quy định hàng hải và hướng dẫn của cơ quan nhà nước có thẩm quyền.</p>',
    },
    {
      id: 'reservations',
      title: 'Đặt chỗ và Xác nhận Đặt du thuyền',
      html: () =>
        '<h3>2.1. Phương thức đặt chỗ</h3>' +
        '<p>Quý khách có thể gửi yêu cầu hoặc thực hiện đặt chỗ thông qua:</p>' +
        ul([
          'Website chính thức của Green Ruby Cruises.',
          'Bộ phận đặt phòng qua email, điện thoại hoặc các kênh liên lạc được công bố.',
          'Đại lý du lịch và đối tác phân phối được ủy quyền.',
        ]) +
        '<p>Mọi yêu cầu đặt chỗ đều phụ thuộc vào tình trạng phòng thực tế và xác nhận từ Green Ruby Cruises.</p>' +
        '<h3>2.2. Xác nhận đặt chỗ</h3>' +
        '<p>Việc gửi yêu cầu đặt chỗ không đồng nghĩa với việc đặt chỗ đã được xác nhận.</p>' +
        '<p>Sau khi kiểm tra tình trạng phòng và giá áp dụng, Green Ruby Cruises sẽ gửi thông tin đặt chỗ, bao gồm:</p>' +
        ul([
          'Họ tên khách và số lượng hành khách.',
          'Ngày khởi hành và thời lượng hành trình.',
          'Tên du thuyền, chương trình và hạng phòng.',
          'Tổng giá trị đặt chỗ cùng các dịch vụ bao gồm.',
          'Số tiền đặt cọc và thời hạn thanh toán.',
          'Điều kiện hủy đặt chỗ áp dụng.',
        ]) +
        '<p>Đặt chỗ được xác nhận khi Green Ruby Cruises chấp thuận yêu cầu và nhận đủ khoản đặt cọc hoặc toàn bộ số tiền theo quy định, trừ trường hợp hai bên có thỏa thuận thanh toán khác bằng văn bản.</p>' +
        '<p>Quý khách có trách nhiệm kiểm tra thông tin trong xác nhận đặt chỗ và thông báo kịp thời nếu có sai sót.</p>' +
        '<h3>2.3. Đặt chỗ thay cho người khác</h3>' +
        '<p>Người đại diện đặt chỗ cho các hành khách khác cần được những người này đồng ý và có trách nhiệm chuyển đầy đủ thông tin, điều kiện đặt chỗ cho các hành khách liên quan.</p>',
    },
    {
      id: 'rates',
      title: 'Giá Du thuyền và Dịch vụ Bao gồm',
      html: () =>
        '<p>Giá du thuyền phụ thuộc vào ngày khởi hành, hành trình, hạng phòng, số lượng khách, mùa du lịch và các chương trình ưu đãi đang áp dụng.</p>' +
        '<p>Giá cuối cùng và đơn vị tiền tệ thanh toán được thể hiện trong xác nhận đặt chỗ.</p>' +
        '<p>Trừ khi được quy định khác, giá chương trình bao gồm dịch vụ lưu trú, các bữa ăn, hoạt động tham quan và những dịch vụ được liệt kê cụ thể trong chương trình hoặc xác nhận đặt chỗ.</p>' +
        '<p>Các khoản phí tham quan và vé vào điểm đến thuộc chương trình đã xác nhận được bao gồm trong giá hành trình.</p>' +
        '<p>Những dịch vụ sau có thể phát sinh chi phí riêng nếu không được ghi rõ là đã bao gồm:</p>' +
        ul([
          'Xe đưa đón giữa Hà Nội, sân bay, khách sạn và điểm lên du thuyền.',
          'Đồ uống ngoài danh mục của gói dịch vụ.',
          'Dịch vụ spa và các dịch vụ tự chọn.',
          'Chi tiêu cá nhân và dịch vụ giặt là.',
          'Bảo hiểm du lịch, thị thực và các chi phí liên quan.',
          'Tiền bồi dưỡng (tip) cho nhân viên và các khoản chi tiêu cá nhân khác.',
        ]) +
        '<p>Các khoản phụ thu bắt buộc, nếu có, sẽ được thông báo trước khi xác nhận đặt chỗ.</p>' +
        '<p>Giá có thể thay đổi trước khi đặt chỗ được xác nhận. Sau khi xác nhận, mức giá đã thỏa thuận được áp dụng, trừ trường hợp hai bên thống nhất thay đổi hoặc pháp luật có quy định khác.</p>',
    },
    {
      id: 'payment',
      title: 'Đặt cọc và Thanh toán',
      html: () =>
        '<h3>4.1. Quy định đặt cọc</h3>' +
        '<p>Đối với đặt chỗ được thực hiện <strong>trước ngày khởi hành hơn 30 ngày theo lịch</strong>, khoản đặt cọc bằng <strong>30% tổng giá trị đặt chỗ</strong> sẽ giữ chỗ cho Quý khách. Quý khách cũng có thể chọn thanh toán toàn bộ ngay khi đặt chỗ.</p>' +
        '<p>Trường hợp đặt cọc, 70% còn lại phải được thanh toán <strong>chậm nhất 30 ngày theo lịch trước ngày khởi hành</strong>.</p>' +
        '<p>Đối với đặt chỗ được thực hiện trong vòng 30 ngày theo lịch trở xuống trước ngày khởi hành, Quý khách cần thanh toán toàn bộ giá trị đặt chỗ khi đặt.</p>' +
        '<p>Đặt chỗ theo đoàn, thuê nguyên du thuyền hoặc chương trình ưu đãi đặc biệt có thể áp dụng tiến độ thanh toán riêng. Những điều kiện này sẽ được thông báo và thống nhất trước khi xác nhận.</p>' +
        '<h3>4.2. Phương thức thanh toán</h3>' +
        '<p>Thanh toán trực tuyến được thực hiện qua các đơn vị sau:</p>' +
        ul([
          '<strong>Thẻ tín dụng hoặc thẻ ghi nợ</strong> qua Stripe, bằng đô la Mỹ (USD).',
          '<strong>PayPal</strong>, bằng đô la Mỹ (USD).',
          '<strong>Chuyển khoản ngân hàng qua VietQR</strong> do SePay xử lý, bằng đồng Việt Nam (VND).',
        ]) +
        '<p>Với các đặt chỗ do bộ phận đặt phòng xác nhận, hướng dẫn thanh toán sẽ được gửi theo một trong các phương thức trên qua kênh chính thức của Green Ruby Cruises.</p>' +
        '<p>Các dịch vụ phát sinh trên tàu ngoài gói đã đặt, như đồ uống thêm hoặc dịch vụ spa, có thể thanh toán bằng tiền mặt hoặc thẻ khi làm thủ tục trả phòng cuối hành trình.</p>' +
        '<h3>4.3. Loại tiền tệ và phí giao dịch</h3>' +
        '<p>Quý khách thanh toán theo đơn vị tiền tệ được ghi trong xác nhận đặt chỗ hoặc hướng dẫn thanh toán: đô la Mỹ với đặt chỗ trên website tiếng Anh, đồng Việt Nam với đặt chỗ trên website tiếng Việt.</p>' +
        '<p>Nếu có chuyển đổi ngoại tệ, số tiền thực tế có thể phụ thuộc vào tỷ giá và các khoản phí do ngân hàng hoặc đơn vị cung cấp dịch vụ thanh toán áp dụng.</p>' +
        '<p>Mọi khoản phí xử lý giao dịch do Quý khách chịu, nếu có, sẽ được thông báo khi có thể xác định trước và phải phù hợp với quy định pháp luật.</p>' +
        '<h3>4.4. Thanh toán chậm hoặc chưa đầy đủ</h3>' +
        '<p>Nếu khoản thanh toán không được thực hiện đúng hạn, Green Ruby Cruises có thể liên hệ và yêu cầu Quý khách hoàn tất thanh toán trong một thời hạn bổ sung hợp lý.</p>' +
        '<p>Nếu Quý khách không hoàn tất thanh toán sau khi được thông báo bằng văn bản, đặt chỗ có thể bị hủy theo các điều kiện hủy đã thỏa thuận và quy định pháp luật áp dụng.</p>',
    },
    {
      id: 'cancellation',
      title: 'Hủy Đặt chỗ theo Yêu cầu của Khách hàng',
      html: () =>
        '<p>Quý khách cần gửi yêu cầu hủy đặt chỗ bằng văn bản thông qua kênh đã đặt dịch vụ hoặc trực tiếp đến bộ phận đặt phòng Green Ruby Cruises.</p>' +
        '<p>Đối với đặt chỗ thông thường, biểu phí hủy sau được áp dụng, trừ khi những điều kiện khác đã được thông báo rõ và được Quý khách chấp thuận khi đặt chỗ.</p>' +
        table(
          ['Thời điểm nhận yêu cầu hủy trước ngày khởi hành', 'Phí hủy'],
          [
            ['Từ 30 ngày trở lên', 'Không thu phí hủy; hoàn 100% số tiền đã thanh toán cho dịch vụ du thuyền'],
            ['Từ 15 đến 29 ngày', '50% tổng giá trị đặt chỗ'],
            ['Từ 7 đến 14 ngày', '75% tổng giá trị đặt chỗ'],
            ['Từ 0 đến 6 ngày', '100% tổng giá trị đặt chỗ'],
            ['Không đến làm thủ tục (No-show)', '100% tổng giá trị đặt chỗ'],
          ],
        ) +
        '<p>Phí hủy được tính trên <strong>tổng giá trị đặt chỗ đã xác nhận</strong>, không chỉ trên số tiền đặt cọc.</p>' +
        '<p>Trường hợp số tiền đã thanh toán thấp hơn mức phí hủy áp dụng, khoản chênh lệch (nếu phát sinh) được xử lý theo thỏa thuận đặt chỗ đã xác nhận và quy định pháp luật.</p>' +
        '<p>Thời điểm hủy được xác định theo thời gian Green Ruby Cruises nhận được yêu cầu bằng văn bản, tính theo giờ Việt Nam (GMT+7).</p>' +
        '<p>Đối với đặt chỗ theo đoàn, thuê nguyên du thuyền hoặc các chương trình ưu đãi đặc biệt, điều kiện hủy có thể khác nếu đã được thông báo và chấp thuận trước khi xác nhận.</p>',
    },
    {
      id: 'changes',
      title: 'Thay đổi Thông tin Đặt chỗ',
      html: () =>
        '<p>Quý khách có thể yêu cầu thay đổi ngày khởi hành, hạng phòng, thông tin hành khách hoặc các nội dung khác của đặt chỗ.</p>' +
        '<p>Mọi thay đổi đều phụ thuộc vào tình trạng dịch vụ và cần được Green Ruby Cruises xác nhận bằng văn bản.</p>' +
        '<p>Việc đổi ngày khởi hành được xử lý như hủy đặt chỗ ban đầu và tạo đặt chỗ mới. Vì vậy, phí hủy và phần chênh lệch giá, nếu có, có thể được áp dụng.</p>' +
        '<p>Một đặt chỗ thông thường có thể được điều chỉnh tối đa hai lần, tùy theo các điều kiện đã thỏa thuận.</p>' +
        '<p>Nếu dịch vụ mới có giá cao hơn, Quý khách cần thanh toán khoản chênh lệch. Nếu giá thấp hơn, số tiền chênh lệch có thể được hoàn hoặc xử lý theo điều kiện đặt chỗ áp dụng.</p>' +
        '<p>Việc chuyển đặt chỗ sang tên hành khách khác cần được Green Ruby Cruises chấp thuận trước và cung cấp đầy đủ thông tin theo yêu cầu.</p>',
    },
    {
      id: 'refunds',
      title: 'Hoàn tiền',
      html: () =>
        '<p>Khi phát sinh khoản tiền được hoàn, Green Ruby Cruises sẽ xác nhận bằng văn bản số tiền hoàn trả cùng các khoản khấu trừ hợp lệ, nếu có.</p>' +
        '<p>Tiền hoàn sẽ được chuyển về phương thức thanh toán ban đầu trong trường hợp có thể thực hiện hợp lý.</p>' +
        '<p>Số tiền được hoàn căn cứ vào khoản tiền thực tế đã nhận cho đặt chỗ, mức phí hủy áp dụng và các dịch vụ đã cung cấp.</p>' +
        '<p>Những chi phí không hoàn lại từ bên thứ ba chỉ được khấu trừ nếu đã được thông báo phù hợp, có căn cứ theo thỏa thuận và được pháp luật cho phép.</p>' +
        '<p>Thời gian xử lý hoàn tiền phụ thuộc vào phương thức thanh toán và đơn vị tài chính tiếp nhận. Green Ruby Cruises sẽ thông báo thời gian dự kiến khi xác nhận khoản hoàn tiền.</p>' +
        '<p>Green Ruby Cruises không giữ lại những khoản tiền mà pháp luật về bảo vệ quyền lợi người tiêu dùng yêu cầu phải hoàn trả.</p>',
    },
    {
      id: 'operator-changes',
      title: 'Hủy hoặc Thay đổi Hành trình từ Green Ruby Cruises',
      html: () =>
        '<p>Green Ruby Cruises có thể cần thay đổi hoặc hủy chuyến do các trường hợp sau:</p>' +
        ul([
          'Thời tiết xấu hoặc điều kiện hàng hải không bảo đảm an toàn.',
          'Yêu cầu từ cảng vụ hoặc cơ quan quản lý hàng hải.',
          'Sự cố kỹ thuật hoặc vấn đề an toàn của du thuyền.',
          'Quy định hạn chế của cơ quan nhà nước có thẩm quyền.',
          'Các tình huống khác ảnh hưởng đáng kể đến khả năng vận hành an toàn.',
        ]) +
        '<p>Nếu Green Ruby Cruises hủy chuyến đã xác nhận do nguyên nhân thuộc trách nhiệm của mình, Quý khách sẽ được đề xuất phương án thay thế phù hợp hoặc hoàn tiền đối với dịch vụ bị ảnh hưởng.</p>' +
        '<p>Tùy tình trạng thực tế, phương án thay thế có thể là đổi ngày khởi hành, lựa chọn chương trình tương đương hoặc du thuyền khác có tiêu chuẩn phù hợp.</p>' +
        '<p>Green Ruby Cruises sẽ thông báo những thay đổi quan trọng trong thời gian sớm nhất có thể.</p>' +
        '<p>Nếu Quý khách không thể chấp nhận thay đổi đáng kể, phương án hủy và hoàn tiền sẽ được xác định dựa trên hoàn cảnh thực tế, thỏa thuận đặt chỗ và quy định pháp luật.</p>',
    },
    {
      id: 'weather',
      title: 'Điều kiện Thời tiết và Thay đổi Lịch trình',
      html: () =>
        '<p>Hoạt động du thuyền tại vịnh Hạ Long và vịnh Lan Hạ chịu ảnh hưởng trực tiếp của thời tiết và quyết định từ các cơ quan quản lý hàng hải, cảng vụ có thẩm quyền.</p>' +
        '<p>Để bảo đảm an toàn, cơ quan chức năng có thể hạn chế hoạt động tàu thuyền, tạm dừng hành trình nghỉ đêm, đóng cửa một số điểm tham quan hoặc không cho phép tàu rời cảng trong thời gian ngắn.</p>' +
        '<h3>9.1. Hủy chuyến trước giờ khởi hành</h3>' +
        '<p>Nếu du thuyền không thể khởi hành do cơ quan có thẩm quyền hạn chế hoạt động hàng hải vì thời tiết hoặc lý do an toàn, Quý khách được lựa chọn <strong>đổi ngày khởi hành</strong> hoặc <strong>hoàn toàn bộ số tiền của đặt chỗ du thuyền bị ảnh hưởng</strong>.</p>' +
        '<h3>9.2. Rút ngắn hành trình</h3>' +
        '<p>Nếu hành trình đã bắt đầu nhưng phải rút ngắn, Green Ruby Cruises sẽ thông báo chương trình điều chỉnh và thực hiện <strong>khoản điều chỉnh hợp lý</strong> dựa trên các dịch vụ đã cung cấp và quy định pháp luật.</p>' +
        '<p>Những dịch vụ đã được cung cấp như bữa ăn, lưu trú, tham quan hoặc vận chuyển sẽ được xác định khi tính toán khoản điều chỉnh.</p>' +
        '<h3>9.3. Thay đổi trong quá trình hành trình</h3>' +
        '<p>Thuyền trưởng có quyền điều chỉnh tuyến di chuyển, thứ tự hoạt động, vị trí neo đậu hoặc thời gian thực hiện chương trình khi cần thiết để bảo đảm an toàn hoặc tuân thủ yêu cầu từ cơ quan có thẩm quyền.</p>' +
        '<p>Các điểm tham quan hoặc hoạt động thay thế có thể được bố trí khi điều kiện cho phép.</p>' +
        '<p>Green Ruby Cruises không thể bảo đảm mọi điểm tham quan đều mở cửa trong trường hợp có ảnh hưởng từ thời tiết, thủy triều, quy định địa phương hoặc quyết định của cơ quan quản lý.</p>',
    },
    {
      id: 'passenger-information',
      title: 'Thông tin Hành khách và Giấy tờ Tùy thân',
      html: () =>
        '<p>Quý khách cần cung cấp đầy đủ và chính xác những thông tin hành khách phục vụ việc đăng ký lưu trú, quản lý xuất nhập cảnh và bảo đảm an toàn hàng hải theo quy định.</p>' +
        '<p>Tùy yêu cầu áp dụng, thông tin có thể bao gồm:</p>' +
        ul([
          'Họ tên đầy đủ theo giấy tờ tùy thân.',
          'Ngày sinh và quốc tịch.',
          'Thông tin hộ chiếu, căn cước hoặc giấy tờ nhận dạng hợp lệ.',
          'Thông tin thị thực hoặc xuất nhập cảnh khi cần thiết.',
          'Yêu cầu về chế độ ăn và những thông tin cần thiết khác để tổ chức dịch vụ đã đặt.',
        ]) +
        '<p>Quý khách có trách nhiệm mang theo giấy tờ tùy thân hợp lệ và tuân thủ các quy định về nhập cảnh, lưu trú tại Việt Nam.</p>' +
        '<p>Green Ruby Cruises có thể không tiếp nhận được khách lên tàu nếu thiếu thông tin hoặc giấy tờ bắt buộc theo quy định pháp luật.</p>' +
        '<p>Việc hủy đặt chỗ hoặc hoàn tiền trong những trường hợp này được xem xét theo điều kiện đã thỏa thuận và quy định pháp luật.</p>',
    },
    {
      id: 'check-in',
      title: 'Làm thủ tục và Lên Du thuyền',
      html: () =>
        '<p>Địa điểm làm thủ tục thông thường là khu vực đón khách của Green Ruby Cruises tại Cảng tàu khách Quốc tế Tuần Châu, trừ khi xác nhận đặt chỗ có hướng dẫn khác.</p>' +
        '<p>Quý khách cần có mặt trong khoảng thời gian làm thủ tục được thông báo trước ngày khởi hành.</p>' +
        '<p>Quá trình lên du thuyền có thể bao gồm di chuyển bằng tàu trung chuyển. Tùy theo du thuyền và hành trình đã chọn, Quý khách có thể cần di chuyển đến một bến khác trước khi lên du thuyền chính.</p>' +
        '<p>Thời gian và phương án đón khách phụ thuộc vào điều kiện vận hành và yêu cầu an toàn.</p>' +
        '<p>Nếu dự kiến đến muộn, Quý khách cần liên hệ ngay với bộ phận đặt phòng hoặc điều hành của Green Ruby Cruises.</p>' +
        '<p>Nếu Quý khách không có mặt đúng thời hạn lên tàu và lỡ chuyến, chính sách không đến làm thủ tục (No-show) có thể được áp dụng.</p>',
    },
    {
      id: 'safety',
      title: 'Sức khỏe, An toàn và Quy tắc Ứng xử',
      html: () =>
        '<p>Quý khách cần tuân thủ hướng dẫn an toàn hợp pháp của Thuyền trưởng, thủy thủ đoàn và cơ quan có thẩm quyền.</p>' +
        '<p>Trước chuyến đi, Quý khách nên thông báo cho Green Ruby Cruises về những hạn chế vận động, nhu cầu hỗ trợ y tế, chế độ ăn đặc biệt hoặc các yêu cầu hỗ trợ khác.</p>' +
        '<p>Việc tham gia chèo kayak, bơi lội, đạp xe hoặc những hoạt động thể chất khác phụ thuộc vào thời tiết, đánh giá an toàn, tình trạng phù hợp của từng hành khách và quy định áp dụng.</p>' +
        '<p>Trẻ em phải được người lớn đi cùng giám sát.</p>' +
        '<p>Quý khách cần có thái độ tôn trọng những hành khách khác, nhân viên và môi trường tự nhiên.</p>' +
        '<p>Green Ruby Cruises có thể áp dụng biện pháp phù hợp nếu hành vi của hành khách gây nguy cơ nghiêm trọng đến an toàn hoặc vi phạm đáng kể các quy định an toàn hợp pháp trên tàu.</p>' +
        '<p>Mọi quyết định từ chối phục vụ, yêu cầu rời tàu hoặc xử lý hoàn tiền liên quan phải tuân thủ quy định pháp luật.</p>',
    },
    {
      id: 'cabins',
      title: 'Bố trí Phòng nghỉ và Dịch vụ trên Tàu',
      html: () =>
        '<p>Đặt chỗ được xác nhận theo hạng phòng, trừ khi số phòng cụ thể đã được bảo đảm bằng văn bản.</p>' +
        '<p>Trong những tình huống vận hành đặc biệt, Green Ruby Cruises có thể đề xuất phòng thay thế có tiêu chuẩn tương đương hoặc cao hơn.</p>' +
        '<p>Quý khách sẽ được thông báo nếu thay đổi ảnh hưởng đáng kể đến loại phòng đã xác nhận.</p>' +
        '<p>Mô tả, sơ đồ và hình ảnh phòng nghỉ được cung cấp nhằm phản ánh chính xác đặc điểm lưu trú, tuy nhiên có thể có khác biệt nhỏ giữa các phòng trong cùng hạng.</p>' +
        '<p>Một số tiện ích, hoạt động tham quan hoặc dịch vụ trên tàu có thể tạm thời không khả dụng do yêu cầu an toàn, bảo trì, thời tiết hoặc điều kiện vận hành.</p>',
    },
    {
      id: 'groups-charters',
      title: 'Đặt chỗ theo Đoàn và Thuê Nguyên Du thuyền',
      html: () =>
        '<p>Các đặt chỗ theo đoàn hoặc thuê riêng toàn bộ du thuyền có thể áp dụng điều kiện đặt chỗ, thanh toán, hủy và số lượng khách bảo đảm riêng.</p>' +
        '<p>Những điều kiện này được thể hiện trong báo giá hoặc hợp đồng thuê du thuyền tương ứng và cung cấp trước khi xác nhận.</p>' +
        '<p>Trường hợp hợp đồng riêng có nội dung khác với điều khoản chung này, các thỏa thuận cụ thể được ưu tiên áp dụng trong phạm vi pháp luật cho phép.</p>',
    },
    {
      id: 'insurance',
      title: 'Bảo hiểm Du lịch và Tài sản Cá nhân',
      html: () =>
        '<p>Green Ruby Cruises khuyến nghị Quý khách mua bảo hiểm du lịch phù hợp, bao gồm quyền lợi về hủy chuyến, chăm sóc y tế, tai nạn cá nhân, thất lạc hành lý và gián đoạn hành trình.</p>' +
        '<p>Quý khách có trách nhiệm bảo quản hợp lý tư trang và tài sản có giá trị của mình.</p>' +
        '<p>Các trường hợp mất mát, thiệt hại hoặc thương tích sẽ được xem xét dựa trên hoàn cảnh thực tế, nghĩa vụ pháp lý của Green Ruby Cruises và quy định pháp luật Việt Nam.</p>' +
        '<p>Không bên nào phải chịu trách nhiệm về việc không thực hiện được nghĩa vụ do sự kiện nằm ngoài khả năng kiểm soát hợp lý của mình, như thiên tai, thời tiết xấu hoặc quyết định của cơ quan nhà nước (sự kiện bất khả kháng). Quy định này không ảnh hưởng đến quyền đổi ngày và hoàn tiền tại mục 8 và mục 9.</p>' +
        '<p>Không có nội dung nào trong các điều khoản này nhằm loại trừ hoặc giới hạn trách nhiệm trong trường hợp pháp luật không cho phép.</p>',
    },
    {
      id: 'agents',
      title: 'Đặt chỗ qua Đại lý và Bên thứ ba',
      html: () =>
        '<p>Nếu đặt chỗ được thực hiện thông qua đại lý du lịch, nền tảng đặt dịch vụ trực tuyến (OTA) hoặc đối tác được ủy quyền, Quý khách nên liên hệ đơn vị tiếp nhận đặt chỗ ban đầu để giải quyết các vấn đề về thanh toán, thay đổi, hủy và hoàn tiền.</p>' +
        '<p>Điều kiện đặt chỗ đã được công bố và chấp thuận trên kênh đó có thể bao gồm các quy định bổ sung hoặc khác biệt.</p>' +
        '<p>Green Ruby Cruises vẫn chịu trách nhiệm đối với những dịch vụ du thuyền thuộc nghĩa vụ pháp lý và hợp đồng của mình.</p>',
    },
    {
      id: 'complaints',
      title: 'Khiếu nại và Giải quyết Tranh chấp',
      html: () =>
        '<p>Nếu phát sinh vấn đề trong thời gian sử dụng dịch vụ, Quý khách được khuyến khích thông báo sớm cho Quản lý Du thuyền hoặc bộ phận Chăm sóc Khách hàng để được hỗ trợ.</p>' +
        '<p>Khiếu nại chính thức cũng có thể được gửi bằng văn bản qua các kênh liên hệ của Green Ruby Cruises, kể cả sau khi kết thúc hành trình.</p>' +
        '<p>Nội dung khiếu nại nên bao gồm mã đặt chỗ, ngày khởi hành, mô tả sự việc và các tài liệu liên quan (nếu có).</p>' +
        '<p>Green Ruby Cruises sẽ tiếp nhận và xem xét khiếu nại trên tinh thần thiện chí, hướng đến phương án giải quyết công bằng và phù hợp với quy định pháp luật Việt Nam.</p>' +
        '<p>Nếu tranh chấp không thể giải quyết thông qua thương lượng hoặc một phương thức hợp pháp được hai bên thống nhất, các bên có thể yêu cầu cơ quan có thẩm quyền hoặc Tòa án giải quyết theo quy định.</p>' +
        '<p>Những điều khoản này không hạn chế các quyền bắt buộc mà pháp luật dành cho người tiêu dùng.</p>',
    },
    {
      id: 'privacy',
      title: 'Bảo mật và Dữ liệu Cá nhân',
      html: (p) =>
        '<p>Thông tin cá nhân được thu thập trong quá trình đặt chỗ được sử dụng nhằm quản lý đặt phòng, xử lý thanh toán, liên hệ với khách hàng, đăng ký hành khách theo quy định và cung cấp dịch vụ đã đặt.</p>' +
        `<p>Dữ liệu cá nhân được xử lý theo pháp luật Việt Nam hiện hành về bảo vệ dữ liệu cá nhân và <a href="${p.privacy}">Chính sách Bảo mật</a> của Green Ruby Cruises.</p>` +
        '<p>Trường hợp cần cung cấp thông tin cho cơ quan nhà nước, đơn vị thanh toán hoặc đối tác vận hành theo yêu cầu hay căn cứ hợp pháp, Green Ruby Cruises sẽ thực hiện theo các quy định liên quan.</p>',
    },
    {
      id: 'law',
      title: 'Pháp luật Áp dụng và Điều chỉnh Điều khoản',
      html: () =>
        '<p>Các Điều khoản và Điều kiện Đặt Du thuyền này được điều chỉnh bởi pháp luật Việt Nam.</p>' +
        '<p>Green Ruby Cruises có thể cập nhật nội dung theo thay đổi về hoạt động, chính sách kinh doanh hoặc quy định pháp luật.</p>' +
        '<p>Những thay đổi quan trọng không được áp dụng hồi tố đối với các đặt chỗ đã xác nhận nếu không có căn cứ hợp đồng hoặc pháp luật phù hợp.</p>' +
        '<p>Phiên bản điều khoản được Quý khách chấp thuận tại thời điểm đặt chỗ là một phần của thỏa thuận đặt chỗ, cùng với xác nhận đặt chỗ và các điều kiện riêng đã được hai bên thống nhất.</p>',
    },
    {
      id: 'contact',
      title: 'Thông tin Liên hệ',
      html: (p) =>
        `<p>Để được hỗ trợ về đặt phòng, thanh toán, thay đổi lịch trình, hủy đặt chỗ hoặc gửi khiếu nại, Quý khách vui lòng liên hệ Green Ruby Cruises qua các kênh chính thức được công bố tại <a href="${p.contact}">trang liên hệ</a>.</p>` +
        '<p><strong>GREEN RUBY CRUISES</strong><br>Đơn vị vận hành: Công ty Cổ phần TPX<br>Mã số doanh nghiệp / Mã số thuế: 5702096485<br>Website: https://greenrubycruises.com</p>',
    },
  ],
  contactLines: { email: 'Email', phone: 'Điện thoại', page: 'Tất cả thông tin liên hệ' },
  closingNote: 'Các điều khoản này cần được đọc cùng với Xác nhận Đặt chỗ, danh mục dịch vụ bao gồm trong chương trình và Chính sách Bảo mật của Green Ruby Cruises.',
};

export const bookingTerms: Record<Locale, BookingTermsCopy> = { en, vi };
