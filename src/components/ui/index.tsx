import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { isMigratedPath } from '@/lib/i18n';
import s from './ui.module.css';

const cx = (...classes: (string | false | undefined)[]) => classes.filter(Boolean).join(' ');

export function Eyebrow({ children, inverse, className }: { children: ReactNode; inverse?: boolean; className?: string }) {
  return <span className={cx(s.eyebrow, inverse && s.eyebrowInverse, className)}>{children}</span>;
}

/** Link that uses next/link only for pages served by this app (see isMigratedPath). */
export function SmartLink({ href, children, ...rest }: { href: string; children: ReactNode } & Omit<ComponentProps<'a'>, 'href'>) {
  return isMigratedPath(href) ? (
    <Link href={href} {...rest}>{children}</Link>
  ) : (
    <a href={href} {...rest}>{children}</a>
  );
}

type Variant = 'gold' | 'dark' | 'outline' | 'lightOutline';

// next/link only for pages this app serves; everything else (external, mailto/tel, pages still on
// Laravel) is a plain anchor so the browser does a full navigation.
const isExternal = (href: string) => !isMigratedPath(href);

/** Button-styled link. Internal hrefs use next/link; mailto/tel/external use a plain anchor. */
export function ButtonLink({
  href,
  variant = 'gold',
  arrow = true,
  children,
  className,
  ...rest
}: { href: string; variant?: Variant; arrow?: boolean; children: ReactNode } & Omit<ComponentProps<'a'>, 'href'>) {
  const content = (
    <>
      {children}
      {arrow && <span className={s.arrow} aria-hidden="true">↗︎</span>}
    </>
  );
  const classes = cx(s.btn, s[variant], className);
  return isExternal(href) ? (
    <a href={href} className={classes} {...rest}>{content}</a>
  ) : (
    <Link href={href} className={classes} {...rest}>{content}</Link>
  );
}

export function Button({
  variant = 'gold',
  children,
  className,
  ...rest
}: { variant?: Variant; children: ReactNode } & ComponentProps<'button'>) {
  return (
    <button className={cx(s.btn, s[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export function TextLink({ href, inverse, children }: { href: string; inverse?: boolean; children: ReactNode }) {
  const classes = cx(s.textLink, inverse && s.textLinkInverse);
  const content = (
    <>
      {children}
      <span className={s.arrow} aria-hidden="true">↗︎</span>
    </>
  );
  return isExternal(href) ? <a href={href} className={classes}>{content}</a> : <Link href={href} className={classes}>{content}</Link>;
}

/** Eyebrow + h2 (with optional <em> accent) + intro paragraph, in the design's split layout. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  inverse,
  stacked,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  inverse?: boolean;
  stacked?: boolean;
}) {
  return (
    <div className={cx(s.sectionHeading, stacked && s.sectionHeadingStacked, inverse && s.inverse)}>
      <div>
        <Eyebrow inverse={inverse}>{eyebrow}</Eyebrow>
        <h2 className={s.heading} id={id}>{title}</h2>
      </div>
      {description && <p className={s.description}>{description}</p>}
    </div>
  );
}

export { cx };
