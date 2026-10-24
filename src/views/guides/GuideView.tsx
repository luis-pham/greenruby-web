import { PageIntro, SiteFooter, type Chrome } from '@/components/layout';
import { FaqList } from '@/components/sections/Faq';
import { JsonLd } from '@/components/seo/JsonLd';
import { SmartLink, TextLink } from '@/components/ui';
import type { ItinerarySummary } from '@/lib/api/schemas';
import { homePath, itineraryPath } from '@/lib/i18n';
import { ORGANIZATION_ID } from '@/lib/organization';
import { absoluteUrl } from '@/lib/site-url';
import { BoardingTimeline } from './BoardingTimeline';
import { plainText, RichText, type LinkResolver } from './Rich';
import { TransferSelector } from './TransferSelector';
import type { Block, GuideContent } from './types';
import s from './guide.module.css';

const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Long-form guide page: intro, "at a glance" answers, table of contents, sections, FAQ and related links. */
export function GuideView({
  chrome,
  content: c,
  path,
  resolve,
  itineraries,
  bayLabels,
}: {
  chrome: Chrome;
  content: GuideContent;
  path: string;
  resolve: LinkResolver;
  itineraries: ItinerarySummary[];
  bayLabels: Record<string, string>;
}) {
  const { locale, t } = chrome;
  const rich = (text: string) => <RichText text={text} resolve={resolve} />;

  const renderBlock = (block: Block, key: number) => {
    if ('p' in block) return <p key={key}>{rich(block.p)}</p>;
    if ('h3' in block) return <h3 key={key}>{block.h3}</h3>;
    if ('ul' in block) return <ul key={key}>{block.ul.map((item, i) => <li key={i}>{rich(item)}</li>)}</ul>;
    if ('ol' in block) return <ol key={key}>{block.ol.map((item, i) => <li key={i}>{rich(item)}</li>)}</ol>;
    if ('note' in block) return <p key={key} className={s.note}>{rich(block.note)}</p>;
    if ('table' in block) {
      const { head, rows, caption } = block.table;
      return (
        <div key={key} className={s.tableWrap}>
          <table className={s.table}>
            {caption && <caption>{caption}</caption>}
            <thead>
              <tr>{head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, i) => (i === 0 ? <th key={i} scope="row">{rich(cell)}</th> : <td key={i}>{rich(cell)}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if ('checklist' in block) {
      return (
        <div key={key} className={s.checklist}>
          {block.checklist.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      );
    }
    if (block.widget === 'boarding-timeline' && c.timeline) return <BoardingTimeline key={key} {...c.timeline} />;
    if (block.widget === 'transfer-selector' && c.selector) return <TransferSelector key={key} {...c.selector} />;
    if (block.widget === 'itineraries' && c.itineraries) {
      const list = [...itineraries].sort((a, b) => (a.bay ?? '').localeCompare(b.bay ?? '') || a.duration - b.duration);
      return (
        <ul key={key} className={s.itineraries}>
          {list.map((it) => (
            <li key={it.itineraryId}>
              <SmartLink href={itineraryPath(locale, it.slug, it.cruiseId, it.itineraryId)}>
                <span>
                  {it.cruiseName} · {it.bay ? bayLabels[it.bay] : ''} · {c.itineraries!.days(it.duration)}
                </span>
                <strong>{it.name}</strong>
                {c.itineraries!.descriptions?.[`${it.bay}:${it.duration}`] && <small>{c.itineraries!.descriptions[`${it.bay}:${it.duration}`]}</small>}
                <em>{c.itineraries!.view} ↗︎</em>
              </SmartLink>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <>
      <PageIntro
        chrome={chrome}
        currentHref={path}
        crumbs={[
          { label: t.breadcrumb.home, href: homePath(locale) },
          { label: c.breadcrumb, href: path },
        ]}
        eyebrow={c.eyebrow}
        title={c.title}
        lead={c.lead}
        meta={<time dateTime={c.updated.iso}>{c.updated.label}</time>}
      />

      <section className={s.glance} aria-labelledby="glance-title">
        <div className="container">
          <h2 id="glance-title" className={s.glanceTitle}>{c.summaryTitle}</h2>
          <dl className={s.glanceGrid}>
            {c.summary.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{rich(v)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <main className={`container ${s.layout}`}>
        <aside className={s.side}>
          <p className={s.sideTitle}>{c.tocTitle}</p>
          <nav aria-label={c.tocTitle}>
            <ol className={s.toc}>
              {c.sections.map((section, i) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {section.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#faq">
                  <span>{String(c.sections.length + 1).padStart(2, '0')}</span>
                  {c.faqTitle}
                </a>
              </li>
            </ol>
          </nav>
        </aside>

        <article className={s.content}>
          {c.sections.map((section) => (
            <section key={section.id} className={s.section} aria-labelledby={section.id}>
              <h2 id={section.id}>{section.title}</h2>
              {section.blocks.map(renderBlock)}
            </section>
          ))}

          <section className={s.section} aria-labelledby="faq">
            <h2 id="faq">{c.faqTitle}</h2>
            <FaqList items={c.faq.map((f) => ({ question: f.q, answerHtml: `<p>${escapeHtml(plainText(f.a))}</p>` }))} />
          </section>

          <p className={s.estimate}>{c.estimateNote}</p>
        </article>
      </main>

      <section className={s.related} aria-labelledby="related-title">
        <div className="container">
          <h2 id="related-title">{c.related.title}</h2>
          <ul>
            {c.related.links.map((link) => {
              const href = resolve(link.href);
              return href ? (
                <li key={link.href}>
                  <SmartLink href={href}>
                    <strong>{link.title}</strong>
                    <span>{link.body}</span>
                  </SmartLink>
                </li>
              ) : null;
            })}
          </ul>
          <TextLink href={resolve('contact') ?? homePath(locale)}>{locale === 'vi' ? 'Liên hệ đặt chỗ' : 'Contact reservations'}</TextLink>
        </div>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: c.title,
          description: c.metaDescription,
          inLanguage: locale,
          url: absoluteUrl(path),
          mainEntityOfPage: absoluteUrl(path),
          dateModified: c.updated.iso,
          author: { '@id': ORGANIZATION_ID },
          publisher: { '@id': ORGANIZATION_ID },
        }}
      />
      <SiteFooter locale={locale} site={chrome.site} t={t} />
    </>
  );
}
