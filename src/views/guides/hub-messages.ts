import type { Locale } from '@/lib/i18n';

/**
 * Travel guide hub (/guides, /vi/cam-nang): a navigation page over the guides, places and journal. It owns only
 * the broad "travel guide" query (app_seo_owner); every card sends the reader to the page that owns the topic.
 */
const en = {
  metaTitle: 'Ha Long Bay Travel Guide: Places, Planning & Cruises',
  metaDescription: 'Start here: guides to Ha Long Bay and Lan Ha Bay on where to go, how to get there, when to visit and how to choose a cruise.',
  eyebrow: 'Ha Long Bay · Lan Ha Bay',
  title: 'Ha Long Bay',
  titleEm: 'travel guide',
  lead: 'Every guide we publish about the two bays, grouped by what you are planning. Each card leads to the page that answers it in full.',
  plan: { title: 'Plan your trip', lede: 'When to go, how many nights, which bay and how to get to the port.' },
  places: {
    title: 'Places to visit',
    lede: 'Caves, islands and villages in the bays, with what each visit involves and which itineraries plan to stop there.',
    hub: 'See all places to visit',
  },
  cruises: {
    title: 'Choose your cruise',
    lede: 'The two ships, the four itineraries and what to compare before you book.',
    itineraries: ['All itineraries', 'Two bays, one or two nights: day-by-day programmes side by side.'],
    luxury: ['The complete guide to eco-friendly luxury cruises', 'What to check before you book: certifications, technology and the two bays.'],
    ship: (bay: string) => `The ship that sails ${bay}: cabins, facilities and itineraries.`,
  },
  journal: { title: 'From the Travel Journal', lede: 'Recent articles on seasons, comparisons and sustainability.', all: 'All Travel Journal articles' },
};

export type HubMessages = typeof en;

const vi: HubMessages = {
  metaTitle: 'Cẩm nang du lịch Hạ Long & Lan Hạ',
  metaDescription: 'Bắt đầu từ đây: cẩm nang vịnh Hạ Long và Lan Hạ về đi đâu, đi thế nào, mùa nào đẹp và chọn du thuyền ra sao.',
  eyebrow: 'Vịnh Hạ Long · Vịnh Lan Hạ',
  title: 'Cẩm nang du lịch',
  titleEm: 'Hạ Long & Lan Hạ',
  lead: 'Toàn bộ cẩm nang về hai vịnh, xếp theo việc bạn đang chuẩn bị. Mỗi thẻ dẫn tới trang trả lời đầy đủ chủ đề đó.',
  plan: { title: 'Chuẩn bị chuyến đi', lede: 'Đi lúc nào, mấy đêm, vịnh nào và đến bến tàu bằng cách nào.' },
  places: {
    title: 'Địa điểm tham quan',
    lede: 'Hang động, đảo và làng chài trên hai vịnh: mỗi nơi tham quan thế nào và hành trình nào dự kiến ghé.',
    hub: 'Xem tất cả địa điểm tham quan',
  },
  cruises: {
    title: 'Chọn du thuyền',
    lede: 'Hai tàu, bốn hành trình và những điều nên so sánh trước khi đặt.',
    itineraries: ['Tất cả hành trình', 'Hai vịnh, một hoặc hai đêm: lịch trình từng ngày đặt cạnh nhau.'],
    luxury: ['Kinh nghiệm chọn du thuyền Hạ Long cao cấp', 'Những điều cần so sánh trước khi đặt một du thuyền cao cấp.'],
    ship: (bay: string) => `Du thuyền khai thác ${bay}: phòng nghỉ, tiện ích và hành trình.`,
  },
  journal: { title: 'Từ Nhật ký hành trình', lede: 'Bài viết mới về mùa du lịch, so sánh và du lịch xanh.', all: 'Tất cả bài viết' },
};

export const hubMessages: Record<Locale, HubMessages> = { en, vi };
