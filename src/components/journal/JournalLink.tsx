import { TextLink } from '@/components/ui';
import type { Locale } from '@/lib/i18n';
import { isRedirect, listArticles } from '@/views/blog/data';
import { articlePath } from '@/views/blog/paths';
import s from './journal.module.css';

const label = { en: 'From the Green Ruby Journal', vi: 'Từ blog Green Ruby' };

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
