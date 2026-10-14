import { JsonLd } from '@/components/seo/JsonLd';
import s from './sections.module.css';

export type FaqItem = { question: string; answerHtml: string };

const plain = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

/** Accordion built on <details>: answers are in the HTML (crawlable) and it works without JS. */
export function FaqList({ items, schema = true }: { items: FaqItem[]; schema?: boolean }) {
  return (
    <div className={s.faqList}>
      {items.map((faq) => (
        <details key={faq.question}>
          <summary>{faq.question}</summary>
          <div className={s.faqAnswer} dangerouslySetInnerHTML={{ __html: faq.answerHtml }} />
        </details>
      ))}
      {schema && items.length > 0 && <JsonLd data={faqPageSchema(items)} />}
    </div>
  );
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: plain(faq.answerHtml) },
    })),
  };
}
