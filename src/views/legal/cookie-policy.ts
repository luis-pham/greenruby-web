import type { Locale } from '@/lib/i18n';

// The cookie policy is not a CMS page: on the Blade site it was a hard-coded section of
// /privacy-policy (#cookies) linked from the footer. It lives here with the same wording,
// expanded to describe what this site actually sets: the consent cookie, session/security
// cookies on booking and payment, and Google Tag Manager tags only after "Accept".

export type CookieClause = { id: string; title: string; html: string };

type CookiePolicyCopy = {
  title: string;
  seoDescription: string;
  heroTitle: string;
  heroTitleEm: string;
  heroIntro: string;
  introHeading: string;
  introHtml: string;
  updated: string;
  clauses: CookieClause[];
  settingsTitle: string;
  settingsBody: string;
  settingsButton: string;
  privacyLink: string;
};

const en: CookiePolicyCopy = {
  title: 'Cookie Policy',
  seoDescription: 'How Green Ruby Cruises uses cookies on greenrubycruises.com and how you can manage your preferences.',
  heroTitle: 'Cookies, explained',
  heroTitleEm: 'simply.',
  heroIntro: 'What our website stores in your browser, why, and how you stay in control of it.',
  introHeading: 'A small file, used with care.',
  introHtml:
    '<p>Our website uses cookies to improve your browsing experience and analyse site traffic. This policy explains which cookies we use and how you can manage them. It should be read together with our Privacy Policy.</p>',
  updated: '2026-10-14',
  clauses: [
    {
      id: 'what-are-cookies',
      title: 'What are cookies?',
      html: '<p>Cookies are small text files that a website stores in your browser. They let the site remember information between pages or visits, such as your cookie choice or the progress of a booking.</p>',
    },
    {
      id: 'types',
      title: 'Types of cookies we use',
      html:
        '<ul>' +
        '<li><strong>Essential cookies</strong> — Required for the website to function (cannot be disabled). They remember your cookie choice (<em>cookie_consent</em>, kept for 12 months) and keep booking and payment requests secure (session and security tokens that expire when your session ends).</li>' +
        '<li><strong>Analytics cookies</strong> — Help us understand how visitors use our site (Google Analytics, loaded through Google Tag Manager). They are only set after you select “Accept”.</li>' +
        '</ul>',
    },
    {
      id: 'third-parties',
      title: 'Third-party cookies',
      html: '<p>Analytics tags are provided by Google. When you accept analytics cookies, Google may set its own cookies (such as <em>_ga</em>) under its terms. Payment providers may also set cookies on their own pages when you complete a payment.</p>',
    },
    {
      id: 'manage',
      title: 'Managing your preferences',
      html: '<p>You can manage cookie preferences through your browser settings or our cookie consent panel. Declining analytics cookies does not affect browsing or booking on our website.</p>',
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      html: '<p>We may update this policy when our website or the tools we use change. The date at the top of this page shows when it was last revised.</p>',
    },
  ],
  settingsTitle: 'Your cookie choice',
  settingsBody: 'Change your mind at any time. Your new choice applies from the next page you visit.',
  settingsButton: 'Cookie settings',
  privacyLink: 'Privacy Policy',
};

const vi: CookiePolicyCopy = {
  title: 'Chính sách Cookie',
  seoDescription: 'Cách Green Ruby Cruises sử dụng cookie trên greenrubycruises.com và cách bạn quản lý lựa chọn của mình.',
  heroTitle: 'Cookie,',
  heroTitleEm: 'nói một cách đơn giản.',
  heroIntro: 'Website của chúng tôi lưu gì trong trình duyệt của bạn, vì sao, và cách bạn luôn kiểm soát điều đó.',
  introHeading: 'Một tệp nhỏ, được dùng cẩn trọng.',
  introHtml:
    '<p>Website của chúng tôi sử dụng cookie để cải thiện trải nghiệm duyệt web và phân tích lưu lượng truy cập. Chính sách này giải thích những cookie chúng tôi sử dụng và cách bạn quản lý chúng, và nên được đọc cùng Chính sách bảo mật.</p>',
  updated: '2026-10-14',
  clauses: [
    {
      id: 'what-are-cookies',
      title: 'Cookie là gì?',
      html: '<p>Cookie là các tệp văn bản nhỏ mà website lưu trong trình duyệt của bạn, giúp website ghi nhớ thông tin giữa các trang hoặc các lần truy cập, chẳng hạn lựa chọn cookie của bạn hoặc tiến trình đặt chỗ.</p>',
    },
    {
      id: 'types',
      title: 'Các loại cookie chúng tôi sử dụng',
      html:
        '<ul>' +
        '<li><strong>Cookie thiết yếu</strong> — Cần thiết để website hoạt động (không thể tắt). Chúng ghi nhớ lựa chọn cookie của bạn (<em>cookie_consent</em>, lưu trong 12 tháng) và bảo vệ các yêu cầu đặt chỗ, thanh toán (mã phiên và mã bảo mật, hết hạn khi phiên kết thúc).</li>' +
        '<li><strong>Cookie phân tích</strong> — Giúp chúng tôi hiểu cách khách truy cập sử dụng website (Google Analytics, tải qua Google Tag Manager). Chỉ được đặt sau khi bạn chọn “Chấp nhận”.</li>' +
        '</ul>',
    },
    {
      id: 'third-parties',
      title: 'Cookie của bên thứ ba',
      html: '<p>Công cụ phân tích do Google cung cấp. Khi bạn chấp nhận cookie phân tích, Google có thể đặt cookie riêng (ví dụ <em>_ga</em>) theo điều khoản của Google. Các cổng thanh toán cũng có thể đặt cookie trên trang của họ khi bạn hoàn tất thanh toán.</p>',
    },
    {
      id: 'manage',
      title: 'Quản lý lựa chọn của bạn',
      html: '<p>Bạn có thể quản lý cookie qua cài đặt trình duyệt hoặc bảng đồng ý cookie của chúng tôi. Việc từ chối cookie phân tích không ảnh hưởng đến việc xem website hay đặt chỗ.</p>',
    },
    {
      id: 'changes',
      title: 'Thay đổi chính sách',
      html: '<p>Chúng tôi có thể cập nhật chính sách này khi website hoặc các công cụ chúng tôi sử dụng thay đổi. Ngày ở đầu trang cho biết lần cập nhật gần nhất.</p>',
    },
  ],
  settingsTitle: 'Lựa chọn cookie của bạn',
  settingsBody: 'Bạn có thể thay đổi bất cứ lúc nào. Lựa chọn mới áp dụng từ trang tiếp theo bạn truy cập.',
  settingsButton: 'Cài đặt cookie',
  privacyLink: 'Chính sách bảo mật',
};

export const cookiePolicy: Record<Locale, CookiePolicyCopy> = { en, vi };
