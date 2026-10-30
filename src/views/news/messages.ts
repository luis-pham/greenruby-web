import type { Locale } from '@/lib/i18n';
import { blogMessages, type BlogMessages } from '@/views/blog/messages';

// News reuses the blog listing and article layouts; only the copy that names the journal changes.

const en: Partial<BlogMessages> = {
  metaTitle: 'News',
  breadcrumb: 'News',
  heroEyebrow: 'Green Ruby News',
  heroTitle: 'News from',
  heroTitleEm: 'Green Ruby.',
  categoryLead: 'Company news from Green Ruby Cruises.',
  listIntro: 'The trade shows and industry events we attend, our partnerships and the milestones on the way to our first sailings.',
  latest: 'Latest news',
  storyCount: (n) => (n === 1 ? 'article' : 'articles'),
  featured: 'Featured',
  journalNumber: (n) => `Green Ruby News · ${String(n).padStart(2, '0')}`,
  readStory: 'Read more',
  moreArticles: 'More news',
  emptyTitle: 'News is on its way.',
  emptyBodyAll: 'There is no company news here yet. In the meantime, explore our journeys.',
  publisher: 'Green Ruby Cruises',
  tocTitle: 'In this article',
  tocMobile: 'Explore this article',
  share: 'Share this article',
  enjoyed: 'Share this news',
  relatedTitle: 'More',
  relatedTitleEm: 'news.',
  relatedIntro: 'More company news from Green Ruby Cruises, and where to go next.',
  fallbackCards: [
    { kicker: 'News', title: 'All news', body: 'Every update from Green Ruby Cruises in one place.', link: 'View all news', section: 'news' },
    ...blogMessages('en').fallbackCards.slice(1),
  ],
};

const vi: Partial<BlogMessages> = {
  metaTitle: 'Tin tức',
  breadcrumb: 'Tin tức',
  heroEyebrow: 'Tin tức Green Ruby',
  heroTitle: 'Tin tức từ',
  heroTitleEm: 'Green Ruby.',
  categoryLead: 'Tin tức từ Green Ruby Cruises.',
  listIntro: 'Các hội chợ, hội thảo du lịch chúng tôi tham dự, những hợp tác và các cột mốc trên chặng đường đến chuyến đi đầu tiên.',
  latest: 'Tin mới nhất',
  storyCount: () => 'bài',
  featured: 'Tin nổi bật',
  journalNumber: (n) => `Tin tức Green Ruby · ${String(n).padStart(2, '0')}`,
  readStory: 'Đọc tiếp',
  moreArticles: 'Tin khác',
  emptyTitle: 'Tin tức sẽ sớm được cập nhật.',
  emptyBodyAll: 'Hiện chưa có tin tức nào. Trong lúc chờ, mời bạn khám phá các hành trình của chúng tôi.',
  publisher: 'Green Ruby Cruises',
  tocTitle: 'Trong bài này',
  tocMobile: 'Mục lục bài viết',
  share: 'Chia sẻ bài viết',
  enjoyed: 'Chia sẻ tin này',
  relatedTitle: 'Tin tức',
  relatedTitleEm: 'khác.',
  relatedIntro: 'Thêm tin tức từ Green Ruby Cruises và những nơi bạn có thể xem tiếp.',
  fallbackCards: [
    { kicker: 'Tin tức', title: 'Tất cả tin tức', body: 'Mọi cập nhật từ Green Ruby Cruises ở một nơi.', link: 'Xem tất cả tin tức', section: 'news' },
    ...blogMessages('vi').fallbackCards.slice(1),
  ],
};

const overrides: Record<Locale, Partial<BlogMessages>> = { en, vi };

export function newsMessages(locale: Locale): BlogMessages {
  return { ...blogMessages(locale), ...overrides[locale] };
}
