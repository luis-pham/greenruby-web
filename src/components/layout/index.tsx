import Image from 'next/image';
import type { ReactNode } from 'react';
import { cx, Eyebrow, SmartLink } from '@/components/ui';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Site } from '@/lib/api/schemas';
import { homePath, sectionPath, type Locale } from '@/lib/i18n';
import { navLinks, siteInfo } from '@/lib/site-info';
import { absoluteUrl } from '@/lib/site-url';
import type { Messages } from '@/messages';
import { MobileMenu } from './MobileMenu';
import s from './layout.module.css';

export type Chrome = { locale: Locale; site: Site; t: Messages; alternateHref: string };

function Anchor({ href, external, className, children }: { href: string; external?: boolean; className?: string; children: ReactNode }) {
  return (
    <SmartLink href={href} className={className} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
      {children}
    </SmartLink>
  );
}

/** The real brand logo from the CMS (white version: the header and footer sit on dark backgrounds). */
export function Brand({ locale, site, className, eager }: { locale: Locale; site: Site; className?: string; eager?: boolean }) {
  const info = siteInfo(site);
  const logo = info.logoNegative ?? info.logo;
  // Served as-is (no resizing) so the transparent PNG stays crisp. In production /upload is same-origin
  // via Nginx; locally NEXT_PUBLIC_MEDIA_ORIGIN points at Laravel.
  const src = logo ? `${process.env.NEXT_PUBLIC_MEDIA_ORIGIN ?? ''}${logo}` : null;
  return (
    <SmartLink href={homePath(locale)} className={cx(s.brand, className)} aria-label={info.name}>
      {src ? (
        <Image src={src} alt={info.name} width={117} height={93} unoptimized loading={eager ? 'eager' : 'lazy'} className={s.brandLogo} />
      ) : (
        <span className={s.brandWord}>
          GREEN RUBY<small>CRUISES</small>
        </span>
      )}
    </SmartLink>
  );
}

export function Topbar({ site, t }: Pick<Chrome, 'site' | 't'>) {
  const info = siteInfo(site);
  return (
    <div className={s.topbar}>
      <div className={cx('container', s.topbarInner)}>
        <span>{t.topbar.location.toUpperCase()}</span>
        <span className={s.topbarContact}>
          {t.topbar.reservations.toUpperCase()}
          {info.hotlineHref && <a href={info.hotlineHref}>{info.hotline}</a>}
          {info.email && (
            <>
              <span aria-hidden="true">·</span>
              <a href={`mailto:${info.email}`}>{info.email}</a>
            </>
          )}
        </span>
      </div>
    </div>
  );
}

export function SiteNav({ locale, site, t, alternateHref, currentHref }: Chrome & { currentHref?: string }) {
  const links = navLinks(site.menus.primary);
  return (
    <nav className={s.nav} aria-label={t.nav.label}>
      <Brand locale={locale} site={site} eager />
      <div className={s.navLinks}>
        {/* The brand already links home; skipping it keeps long CMS menus (e.g. Vietnamese) on one line. */}
        {links.filter((link) => link.href !== homePath(locale)).map((link) => (
          <Anchor key={link.href + link.label} href={link.href} external={link.external}>
            <span aria-current={link.href === currentHref ? 'page' : undefined}>{link.label}</span>
          </Anchor>
        ))}
      </div>
      <div className={s.navEnd}>
        <a className={s.language} href={alternateHref} hrefLang={locale === 'en' ? 'vi' : 'en'} lang={locale === 'en' ? 'vi' : 'en'}>
          {t.nav.switchLanguage}
        </a>
        <SmartLink className={s.navBook} href={sectionPath(locale, 'booking')}>
          {t.nav.book} <span aria-hidden="true">↗</span>
        </SmartLink>
        <MobileMenu label={t.nav.openMenu}>
          {links.map((link) => (
            <div key={link.href + link.label}>
              <Anchor href={link.href} external={link.external}>{link.label}</Anchor>
              {link.children.length > 0 && (
                <div className={s.mobileChildren}>
                  {link.children.map((child) => (
                    <Anchor key={child.href} href={child.href} external={child.external}>{child.label}</Anchor>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a href={alternateHref}>{t.nav.switchLanguage}</a>
          <SmartLink href={sectionPath(locale, 'booking')}>{t.nav.book} ↗</SmartLink>
        </MobileMenu>
      </div>
    </nav>
  );
}

export type Crumb = { label: string; href?: string };

/** Visible breadcrumb plus BreadcrumbList JSON-LD. The last crumb is the current page. */
export function Breadcrumb({ items, label }: { items: Crumb[]; label: string }) {
  return (
    <nav className={s.breadcrumb} aria-label={label}>
      <ol>
        {items.map((item, i) => (
          <li key={i}>
            {item.href && i < items.length - 1 ? <SmartLink href={item.href}>{item.label}</SmartLink> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.label,
            ...(item.href ? { item: absoluteUrl(item.href) } : {}),
          })),
        }}
      />
    </nav>
  );
}

export function PageHero({
  chrome,
  currentHref,
  image,
  imageAlt,
  crumbs,
  eyebrow,
  title,
  subtitle,
  description,
  actions,
  compact,
}: {
  chrome: Chrome;
  currentHref?: string;
  image: string | null;
  imageAlt: string;
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  compact?: boolean;
}) {
  return (
    <>
      <Topbar site={chrome.site} t={chrome.t} />
      <header className={cx(s.hero, compact && s.heroCompact)}>
        {image && <Image src={image} alt={imageAlt} fill preload sizes="100vw" quality={85} className={s.heroImage} />}
        <div className="container">
          <SiteNav {...chrome} currentHref={currentHref} />
          <div className={s.heroBody}>
            <Breadcrumb items={crumbs} label={chrome.t.breadcrumb.label} />
            <Eyebrow inverse>{eyebrow}</Eyebrow>
            <h1 className={s.heroTitle}>{title}</h1>
            {subtitle && <p className={s.heroSubtitle}>{subtitle}</p>}
            {description && <p className={s.heroDescription}>{description}</p>}
            {actions && <div className={s.heroActions}>{actions}</div>}
          </div>
        </div>
      </header>
    </>
  );
}

export function SiteFooter({ locale, site, t }: Pick<Chrome, 'locale' | 'site' | 't'>) {
  const info = siteInfo(site);
  const p = (section: Parameters<typeof sectionPath>[1]) => sectionPath(locale, section);
  const year = 2026; // Static on purpose: Date() would make every page dynamic. Bump yearly or derive at build.
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.footerMain}>
          <div>
            <Brand locale={locale} site={site} />
            <p className={s.footerAbout}>{t.footer.tagline}</p>
            {info.socials.length > 0 && (
              <div className={s.socials}>
                {info.socials.map((social) => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener">{social.name}</a>
                ))}
              </div>
            )}
          </div>
          <div className={s.footerCol}>
            <h2>{t.footer.explore}</h2>
            <SmartLink href={p('itinerary')}>{t.nav.itineraries}</SmartLink>
            <SmartLink href={p('experiences')}>{t.nav.experiences}</SmartLink>
            <SmartLink href={p('gallery')}>{t.footer.gallery}</SmartLink>
            <SmartLink href={p('services')}>{t.footer.services}</SmartLink>
          </div>
          <div className={s.footerCol}>
            <h2>{t.footer.discover}</h2>
            <SmartLink href={p('aboutUs')}>{t.footer.about}</SmartLink>
            <SmartLink href={p('blog')}>{t.footer.journal}</SmartLink>
            <SmartLink href={p('faq')}>{t.footer.faq}</SmartLink>
          </div>
          <div className={s.footerCol}>
            <h2>{t.footer.getInTouch}</h2>
            {info.hotlineHref && <a href={info.hotlineHref}>{info.hotline}</a>}
            {info.email && <a href={`mailto:${info.email}`}>{info.email}</a>}
            {info.address && <address><p>{info.address}</p></address>}
            <SmartLink href={p('contact')}>{t.footer.contactTeam}</SmartLink>
            <SmartLink href={p('booking')}>{t.footer.bookCruise} ↗</SmartLink>
          </div>
        </div>
        <div className={s.footerBottom}>
          <span>© {year} {info.name.toUpperCase()}. {t.footer.rights.toUpperCase()}</span>
          <nav aria-label="Legal">
            <SmartLink href={p('privacyPolicy')}>{t.footer.privacy}</SmartLink>
            <SmartLink href={p('legal')}>{t.footer.legal}</SmartLink>
          </nav>
          <span>{t.footer.bays}</span>
        </div>
      </div>
    </footer>
  );
}
