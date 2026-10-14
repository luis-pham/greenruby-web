import { cx } from '@/components/ui';
import type { T } from './model';
import s from './booking.module.css';

/**
 * Progress through the four steps. Rendered by the server in the Suspense fallback (no `onGo`) and by
 * the wizard, where completed steps become buttons to go back.
 */
export function StepsBar({ t, step, allDone = false, onGo }: { t: T; step: number; allDone?: boolean; onGo?: (step: 1 | 2 | 3 | 4) => void }) {
  return (
    <div className={s.stepsWrap} id="booking-steps">
      <nav className="container" aria-label={t.progressLabel}>
        <ol className={s.steps}>
          {t.steps.map((item, i) => {
            const n = (i + 1) as 1 | 2 | 3 | 4;
            const done = allDone || n < step;
            const current = !allDone && n === step;
            const content = (
              <>
                <span className={s.stepIndex} aria-hidden="true">{done ? '✓' : String(n).padStart(2, '0')}</span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.hint}</small>
                  {done && <span className="sr-only"> ({t.stepCompleted})</span>}
                </span>
              </>
            );
            return (
              <li key={item.title} className={cx(s.step, current && s.stepActive, done && s.stepPast)} aria-current={current ? 'step' : undefined}>
                {done && onGo && !allDone ? (
                  <button type="button" className={s.stepButton} onClick={() => onGo(n)}>
                    {content}
                  </button>
                ) : (
                  <span className={s.stepButton}>{content}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
