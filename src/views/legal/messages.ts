import type { Locale } from '@/lib/i18n';
import type { LegalSectionKey } from './data';

// Design-only UI strings for the legal pages. The policy wording itself always comes from the CMS.

type PolicyCopy = {
  micro: string;
  jumpLabel: string;
  jumpNote: string;
  heroTitle: string;
  heroTitleEm: string;
  heroIntro: string;
  introHeading: string;
};

const en = {
  heroEyebrow: 'Green Ruby · Guest information',
  guestInformation: 'Guest information',
  lastUpdated: 'Last updated',
  appliesTo: 'Applies to',
  onThisPage: 'On this page',
  allPolicies: 'All policies',
  jumpToSection: 'Jump to a section',
  jumpBarLabel: 'Quick links to legal information',
  hubLink: 'Legal overview',
  hub: {
    heroTitle: 'Peace of mind,',
    heroTitleEm: 'every voyage.',
    heroIntro: 'Our policies for a safe, transparent and well-prepared journey through Vietnam’s extraordinary bays.',
    artEyebrow: 'Travel with confidence',
    artCaption: 'The details matter, at every turn.',
    introEyebrow: 'Information for our guests',
    introHeading: 'A more considered journey starts with clear expectations.',
    introBody:
      'Here you can review our onboard safety guidance, the booking terms published on our website, how we handle personal information, and the ways to pay.',
  },
  page: {
    artEyebrow: 'A more considered experience',
    artCaption: 'Your journey. Your confidence.',
  },
  policies: {
    safety: {
      micro: 'Onboard guidance',
      jumpLabel: 'On board',
      jumpNote: 'Prepared for every journey',
      heroTitle: 'Safety, at the heart',
      heroTitleEm: 'of every voyage.',
      heroIntro: 'How we prepare every sailing, and the guidance we share with guests on board.',
      introHeading: 'Every voyage begins with careful preparation.',
    },
    terms: {
      micro: 'Booking agreement',
      jumpLabel: 'Legal',
      jumpNote: 'Booking & changes',
      heroTitle: 'Clear terms,',
      heroTitleEm: 'calm waters.',
      heroIntro: 'The terms that apply when you book a Green Ruby cruise through our website or our team.',
      introHeading: 'Clear expectations make for a better journey.',
    },
    privacy: {
      micro: 'Personal information',
      jumpLabel: 'Personal data',
      jumpNote: 'How we handle information',
      heroTitle: 'Your privacy,',
      heroTitleEm: 'considered.',
      heroIntro: 'A clear guide to how Green Ruby collects, uses and protects your information, and the choices available to you.',
      introHeading: 'Transparency is part of thoughtful hospitality.',
    },
    paymentMethods: {
      micro: 'Reservations & payment',
      jumpLabel: 'Payment',
      jumpNote: 'Ways to pay',
      heroTitle: 'Simple ways',
      heroTitleEm: 'to pay.',
      heroIntro: 'The payment options available for your Green Ruby cruise.',
      introHeading: 'Paying for your voyage, made simple.',
    },
  } satisfies Record<LegalSectionKey, PolicyCopy>,
  readFull: 'Read the full policy',
  related: 'Related policies',
  support: {
    eyebrow: 'Here to help',
    title: 'Questions before you sail?',
    body: 'Our reservations team can clarify booking, onboard policies and personal data enquiries.',
  },
  popularArticles: 'Popular articles',
  bookingHelp: {
    title: 'Need help with a booking?',
    body: 'Speak with our team to confirm payment instructions or changes before you travel.',
    cta: 'Contact reservations',
  },
  policyHelp: {
    title: 'Questions about this policy?',
    body: 'Our team is happy to explain how it applies to your booking.',
    cta: 'Contact our team',
  },
  pending: {
    title: 'This policy is being updated.',
    body: 'Please contact our team for the current version before you book.',
  },
  cta: {
    eyebrow: 'Personal service',
    title: 'Questions before your',
    titleEm: 'next journey?',
    body: 'Our reservations team is here to help you plan with confidence.',
    primary: 'Explore journeys',
    secondary: 'Contact our team',
  },
};

export type LegalMessages = typeof en;

const vi: LegalMessages = {
  heroEyebrow: 'Green Ruby · Thông tin cho khách',
  guestInformation: 'Thông tin cho khách',
  lastUpdated: 'Cập nhật lần cuối',
  appliesTo: 'Áp dụng cho',
  onThisPage: 'Trong trang này',
  allPolicies: 'Tất cả chính sách',
  jumpToSection: 'Đi tới mục',
  jumpBarLabel: 'Liên kết nhanh tới thông tin pháp lý',
  hubLink: 'Tổng quan pháp lý',
  hub: {
    heroTitle: 'An tâm trọn vẹn,',
    heroTitleEm: 'mỗi hành trình.',
    heroIntro: 'Các chính sách giúp chuyến đi của bạn qua những vịnh biển tuyệt đẹp của Việt Nam an toàn, minh bạch và chu đáo.',
    artEyebrow: 'Vững tâm lên đường',
    artCaption: 'Chu đáo trong từng chi tiết.',
    introEyebrow: 'Thông tin dành cho khách',
    introHeading: 'Một hành trình trọn vẹn bắt đầu từ những điều rõ ràng.',
    introBody:
      'Tại đây bạn có thể xem hướng dẫn an toàn trên tàu, điều khoản đặt chỗ đăng trên website, cách chúng tôi xử lý thông tin cá nhân và các phương thức thanh toán.',
  },
  page: {
    artEyebrow: 'Trải nghiệm chỉn chu hơn',
    artCaption: 'Hành trình của bạn. Sự an tâm của bạn.',
  },
  policies: {
    safety: {
      micro: 'Hướng dẫn trên tàu',
      jumpLabel: 'Trên tàu',
      jumpNote: 'Sẵn sàng cho mọi hành trình',
      heroTitle: 'An toàn là trọng tâm',
      heroTitleEm: 'của mọi hành trình.',
      heroIntro: 'Cách chúng tôi chuẩn bị cho mỗi chuyến đi và những hướng dẫn dành cho khách trên tàu.',
      introHeading: 'Mỗi hành trình bắt đầu từ sự chuẩn bị kỹ lưỡng.',
    },
    terms: {
      micro: 'Thỏa thuận đặt chỗ',
      jumpLabel: 'Pháp lý',
      jumpNote: 'Đặt chỗ & thay đổi',
      heroTitle: 'Điều khoản rõ ràng,',
      heroTitleEm: 'hành trình an yên.',
      heroIntro: 'Các điều khoản áp dụng khi bạn đặt du thuyền Green Ruby qua website hoặc đội ngũ của chúng tôi.',
      introHeading: 'Hiểu rõ từ đầu để hành trình thêm trọn vẹn.',
    },
    privacy: {
      micro: 'Thông tin cá nhân',
      jumpLabel: 'Dữ liệu cá nhân',
      jumpNote: 'Cách chúng tôi xử lý thông tin',
      heroTitle: 'Quyền riêng tư của bạn,',
      heroTitleEm: 'luôn được tôn trọng.',
      heroIntro: 'Hướng dẫn rõ ràng về cách Green Ruby thu thập, sử dụng và bảo vệ thông tin của bạn, cùng những lựa chọn bạn có.',
      introHeading: 'Minh bạch là một phần của sự hiếu khách chu đáo.',
    },
    paymentMethods: {
      micro: 'Đặt chỗ & thanh toán',
      jumpLabel: 'Thanh toán',
      jumpNote: 'Các cách thanh toán',
      heroTitle: 'Thanh toán',
      heroTitleEm: 'thật đơn giản.',
      heroIntro: 'Các phương thức thanh toán dành cho chuyến du thuyền Green Ruby của bạn.',
      introHeading: 'Thanh toán cho hành trình, nhẹ nhàng và thuận tiện.',
    },
  },
  readFull: 'Xem toàn văn chính sách',
  related: 'Chính sách liên quan',
  support: {
    eyebrow: 'Luôn sẵn lòng hỗ trợ',
    title: 'Còn thắc mắc trước chuyến đi?',
    body: 'Bộ phận đặt chỗ sẵn sàng giải đáp về đặt chỗ, quy định trên tàu và thông tin cá nhân.',
  },
  popularArticles: 'Bài viết nổi bật',
  bookingHelp: {
    title: 'Cần hỗ trợ đặt chỗ?',
    body: 'Liên hệ đội ngũ của chúng tôi để xác nhận hướng dẫn thanh toán hoặc thay đổi trước chuyến đi.',
    cta: 'Liên hệ bộ phận đặt chỗ',
  },
  policyHelp: {
    title: 'Có câu hỏi về chính sách này?',
    body: 'Đội ngũ của chúng tôi sẵn lòng giải thích chính sách áp dụng thế nào cho đặt chỗ của bạn.',
    cta: 'Liên hệ chúng tôi',
  },
  pending: {
    title: 'Chính sách này đang được cập nhật.',
    body: 'Vui lòng liên hệ đội ngũ của chúng tôi để nhận phiên bản hiện hành trước khi đặt chỗ.',
  },
  cta: {
    eyebrow: 'Phục vụ tận tâm',
    title: 'Còn câu hỏi cho',
    titleEm: 'hành trình sắp tới?',
    body: 'Bộ phận đặt chỗ luôn sẵn sàng giúp bạn lên kế hoạch thật an tâm.',
    primary: 'Khám phá hành trình',
    secondary: 'Liên hệ chúng tôi',
  },
};

export const legalMessages: Record<Locale, LegalMessages> = { en, vi };
