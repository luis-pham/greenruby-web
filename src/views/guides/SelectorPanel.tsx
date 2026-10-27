import type { Locale } from '@/lib/i18n';
import { listedServices, operatorById, type Area, type Operator } from './operators';
import { OperatorContacts, routeFares } from './OperatorTable';
import type { SelectorLabels } from './TransferSelector';
import type { Origin } from './transfer';
import s from './guide.module.css';

const unique = (ids: string[]) => [...new Set(ids)].map((id) => operatorById(id)).filter((o): o is Operator => Boolean(o));

/**
 * Server-rendered part of a transfer-selector origin: published fares and the operators we checked for
 * the route in each direction (from operators.ts). Rendered for every origin, so it is in the HTML.
 */
export function SelectorPanel({ origin, locale, labels }: { origin: Origin; locale: Locale; labels: SelectorLabels }) {
  const area: Exclude<Area, 'halong'> = origin;
  const fares = routeFares(`${area}-halong`, locale);
  const out = unique(listedServices([`${area}-halong`]).map((x) => x.operatorId));
  const back = unique(listedServices([`halong-${area}`]).map((x) => x.operatorId));
  const anchor = labels.operatorsAnchor[origin];
  return (
    <div className={s.selectorOps}>
      <div>
        <span>{labels.cost}</span>
        {fares.length > 0 ? (
          <ul>
            {fares.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        ) : (
          <small>{labels.costNone}</small>
        )}
      </div>
      <div>
        <span>{labels.operators}</span>
        {out.length > 0 ? (
          <ul>
            {out.map((op) => (
              <li key={op.operatorId}>
                <strong>{op.operatorName}</strong> <OperatorContacts operator={op} locale={locale} />
              </li>
            ))}
          </ul>
        ) : (
          <small>{labels.operatorsNone}</small>
        )}
        {back.length > 0 && (
          <small>
            {labels.returnOperators} {back.map((op) => op.operatorName).join(', ')}.
          </small>
        )}
        {anchor && out.length > 0 && <a href={`#${anchor}`}>{labels.seeTable}</a>}
      </div>
    </div>
  );
}
