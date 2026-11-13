import { TextLink } from '@/components/ui';
import { byLocale, type Locale } from '@/lib/i18n';
import { isRedirect, listArticles } from '@/views/blog/data';
import { articlePath } from '@/views/blog/paths';
import s from './journal.module.css';

const label = byLocale({ en: 'From the Green Ruby Journal', vi: 'Từ blog Green Ruby', ja: 'Green Rubyの旅のコラムより', fr: 'À lire dans le Journal Green Ruby', es: 'Del diario de viaje de Green Ruby', de: 'Aus dem Reisejournal von Green Ruby', ko: 'Green Ruby 여행 저널에서' });

/**
 * Internal link from a product page (itinerary, cruise) to the newest published article, so the blog's
 * guides and the pages that sell are linked both ways. Renders nothing while a language has no article.
 */
export async function JournalLink({ locale, inverse }: { locale: Locale; inverse?: boolean }) {
  const list = await listArticles(locale, null, 1);
  if (!list || isRedirect(list)) return null;
  const article = list.featured[0] ?? list.items[0];
  if (!article?.category) return null;
  return (
    <p className={s.journal}>
      <span className={inverse ? s.labelInverse : s.label}>{label[locale]}</span>
      <TextLink href={articlePath(locale, article.category.slug, article.slug)} inverse={inverse}>{article.title}</TextLink>
    </p>
  );
}
