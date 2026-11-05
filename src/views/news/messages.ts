import { byLocale, type Locale } from '@/lib/i18n';
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

const ja: Partial<BlogMessages> = {
  metaTitle: 'お知らせ',
  breadcrumb: 'お知らせ',
  heroEyebrow: 'Green Rubyからのお知らせ',
  heroTitle: 'Green Rubyから、',
  heroTitleEm: '最新のお知らせ',
  categoryLead: 'Green Ruby Cruisesからの企業ニュースです。',
  listIntro: '出展する旅行博や業界イベント、パートナーシップ、そして初就航に向けた歩みをお知らせします。',
  latest: '新着のお知らせ',
  storyCount: () => '件のお知らせ',
  featured: '注目のお知らせ',
  journalNumber: (n) => `Green Rubyからのお知らせ · ${String(n).padStart(2, '0')}`,
  readStory: '詳しく見る',
  moreArticles: 'その他のお知らせ',
  emptyTitle: 'お知らせは近日掲載予定です。',
  emptyBodyAll: '現在、お知らせはまだありません。掲載までの間、クルーズをご覧ください。',
  publisher: 'Green Ruby Cruises',
  tocTitle: 'この記事の内容',
  tocMobile: '目次を見る',
  share: 'この記事をシェア',
  enjoyed: 'このお知らせをシェア',
  relatedTitle: 'そのほかの',
  relatedTitleEm: 'お知らせ',
  relatedIntro: 'Green Ruby Cruisesからのその他のお知らせと、次にご覧いただきたいページです。',
  fallbackCards: [
    { kicker: 'お知らせ', title: 'すべてのお知らせ', body: 'Green Ruby Cruisesからの最新情報をまとめてご覧いただけます。', link: 'すべてのお知らせを見る', section: 'news' },
    ...blogMessages('ja').fallbackCards.slice(1),
  ],
};

const fr: Partial<BlogMessages> = {
  metaTitle: 'Actualités',
  breadcrumb: 'Actualités',
  heroEyebrow: 'Actualités Green Ruby',
  heroTitle: 'Les actualités de',
  heroTitleEm: 'Green Ruby.',
  categoryLead: 'Les actualités de Green Ruby Cruises.',
  listIntro: 'Les salons et événements professionnels auxquels nous participons, nos partenariats et les étapes qui nous mènent vers nos premiers départs.',
  latest: 'Dernières actualités',
  storyCount: (n) => (n === 1 ? 'article' : 'articles'),
  featured: 'À la une',
  journalNumber: (n) => `Actualités Green Ruby · ${String(n).padStart(2, '0')}`,
  readStory: 'Lire la suite',
  moreArticles: 'Autres actualités',
  emptyTitle: 'Nos actualités seront bientôt disponibles.',
  emptyBodyAll: 'Aucune actualité pour le moment. En attendant, découvrez nos croisières.',
  publisher: 'Green Ruby Cruises',
  tocTitle: 'Dans cet article',
  tocMobile: 'Parcourir cet article',
  share: 'Partager cet article',
  enjoyed: 'Partager cette actualité',
  relatedTitle: 'Autres',
  relatedTitleEm: 'actualités.',
  relatedIntro: 'D’autres actualités de Green Ruby Cruises, et des pistes pour poursuivre votre lecture.',
  fallbackCards: [
    { kicker: 'Actualités', title: 'Toutes les actualités', body: 'Toutes les nouvelles de Green Ruby Cruises, réunies en un seul endroit.', link: 'Voir toutes les actualités', section: 'news' },
    ...blogMessages('fr').fallbackCards.slice(1),
  ],
};

const overrides = byLocale<Partial<BlogMessages>>({ en, vi, ja, fr });

export function newsMessages(locale: Locale): BlogMessages {
  return { ...blogMessages(locale), ...overrides[locale] };
}
