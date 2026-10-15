import Image from 'next/image';
import type { ReactNode } from 'react';
import { cx, Eyebrow, SmartLink } from '@/components/ui';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Site } from '@/lib/api/schemas';
import { homePath, sectionPath, type Locale, type Section } from '@/lib/i18n';
import { navLinks, siteInfo, type NavLink } from '@/lib/site-info';
import { absoluteUrl } from '@/lib/site-url';
import type { Messages } from '@/messages';
import { FlagGB, FlagVN } from './Flags';
import { CookieConsent } from './CookieConsent';
import { MobileMenu } from './MobileMenu';
import { SOCIAL_LABELS, SocialIcon } from './SocialIcon';
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

const LANGUAGE_NAMES = { en: 'English', vi: 'Tiếng Việt' } as const;

/**
 * Viewport width below which the desktop menu collapses into the menu button. The header spans the
 * 1300px content column (so the logo lines up with the page); a CMS menu too long for it always
 * collapses. Width estimate: 14px uppercase with 0.12em tracking.
 */
function menuBreakpoint(links: NavLink[]): number {
  const chars = links.reduce((n, l) => n + l.label.length, 0);
  const chevrons = links.filter((l) => l.children.length > 0).length;
  const menu = chars * 10.2 + chevrons * 21 + Math.max(0, links.length - 1) * 28;
  const needed = menu + 80 + 275 + 50; // menu, logo, flags + booking button, gaps
  const column = 1300 - 2 * 46; // content column inside the container padding
  if (needed > column) return 100000;
  return Math.round(Math.max(1200, needed + 2 * 46 + 16));
}

function Chevron() {
  return (
    <svg className={s.chevron} viewBox="0 0 12 8" aria-hidden="true">
      <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LanguageFlags({ locale, alternateHref, uid }: { locale: Locale; alternateHref: string; uid: string }) {
  const other: Locale = locale === 'en' ? 'vi' : 'en';
  const flag = (l: Locale) => (l === 'en' ? <FlagGB uid={uid} /> : <FlagVN />);
  return (
    <span className={s.flags}>
      <span className={cx(s.flag, s.flagCurrent)} title={LANGUAGE_NAMES[locale]} aria-current="true">
        {flag(locale)}
        <span className="sr-only">{LANGUAGE_NAMES[locale]}</span>
      </span>
      <a className={s.flag} href={alternateHref} hrefLang={other} lang={other} title={LANGUAGE_NAMES[other]}>
        {flag(other)}
        <span className="sr-only">{LANGUAGE_NAMES[other]}</span>
      </a>
    </span>
  );
}

/** Sections linked from the footer only, so the header menu stays short. */
const FOOTER_ONLY: Section[] = ['gallery', 'blog', 'aboutUs', 'faq'];

export function SiteNav({ locale, site, t, alternateHref, currentHref }: Chrome & { currentHref?: string }) {
  const footerOnly = FOOTER_ONLY.map((section) => sectionPath(locale, section));
  const inHeader = (link: NavLink) => !footerOnly.some((path) => link.href === path || link.href.startsWith(`${path}/`));
  const links = navLinks(site.menus.primary).filter(inHeader);
  // The brand already links home, so the home item is left out of the desktop menu.
  const desktopLinks = links.filter((link) => link.href !== homePath(locale));
  const collapseAt = menuBreakpoint(desktopLinks);
  const isCurrent = (link: NavLink) => link.href === currentHref || link.children.some((c) => c.href === currentHref);
  return (
    <nav className={s.nav} aria-label={t.nav.label}>
      {/* Collapse to the menu button when this menu (from the CMS) wouldn't fit on one line. */}
      <style>{`@media (max-width:${collapseAt}px){.${s.navLinks}{display:none}.${s.mobileMenu}{display:block}}`}</style>
      <Brand locale={locale} site={site} eager />
      <ul className={s.navLinks}>
        {desktopLinks.map((link) => (
          <li key={link.href + link.label} className={s.navItem}>
            <Anchor href={link.href} external={link.external} className={s.navLink}>
              <span aria-current={isCurrent(link) ? 'page' : undefined}>{link.label}</span>
              {link.children.length > 0 && <Chevron />}
            </Anchor>
            {link.children.length > 0 && (
              <ul className={s.dropdown}>
                {link.children.map((child) => (
                  <li key={child.href + child.label}>
                    <Anchor href={child.href} external={child.external}>
                      <span aria-current={child.href === currentHref ? 'page' : undefined}>{child.label}</span>
                    </Anchor>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className={s.navEnd}>
        <LanguageFlags locale={locale} alternateHref={alternateHref} uid="nav" />
        <SmartLink className={s.navBook} href={sectionPath(locale, 'booking')}>
          {t.nav.book} <span aria-hidden="true">↗︎</span>
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
          <a className={s.mobileLanguage} href={alternateHref} hrefLang={locale === 'en' ? 'vi' : 'en'}>
            <span className={s.flag}>{locale === 'en' ? <FlagVN /> : <FlagGB uid="mobile" />}</span>
            {LANGUAGE_NAMES[locale === 'en' ? 'vi' : 'en']}
          </a>
          <SmartLink href={sectionPath(locale, 'booking')}>{t.nav.book} ↗︎</SmartLink>
        </MobileMenu>
      </div>
    </nav>
  );
}

/** Topbar + solid dark header bar with the menu, for pages without an image hero. */
export function SolidHeader({ chrome, currentHref }: { chrome: Chrome; currentHref?: string }) {
  return (
    <>
      <Topbar site={chrome.site} t={chrome.t} />
      <header className={s.solidHeader}>
        <div className="container">
          <SiteNav {...chrome} currentHref={currentHref} />
        </div>
      </header>
    </>
  );
}

/**
 * Page opening without an image hero (contact, hubs, legal): solid header, then breadcrumb, eyebrow and
 * title on the left, intro and actions on the right, on the page background.
 */
export function PageIntro({
  chrome,
  currentHref,
  crumbs,
  eyebrow,
  title,
  lead,
  actions,
  meta,
}: {
  chrome: Chrome;
  currentHref?: string;
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <>
      <SolidHeader chrome={chrome} currentHref={currentHref} />
      <section className={s.pageIntro}>
        <div className="container">
          <Breadcrumb onLight items={crumbs} label={chrome.t.breadcrumb.label} />
          <div className={s.pageIntroGrid}>
            <div>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h1 className={s.pageIntroTitle}>{title}</h1>
            </div>
            {(lead || actions || meta) && (
              <div className={s.pageIntroAside}>
                {lead && <p className={s.pageIntroLead}>{lead}</p>}
                {actions && <div className={s.pageIntroActions}>{actions}</div>}
                {meta && <div className={s.pageIntroMeta}>{meta}</div>}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export type Crumb = { label: string; href?: string };

/** Visible breadcrumb plus BreadcrumbList JSON-LD. The last crumb is the current page. */
export function Breadcrumb({ items, label, onLight }: { items: Crumb[]; label: string; onLight?: boolean }) {
  return (
    <nav className={cx(s.breadcrumb, onLight && s.breadcrumbOnLight)} aria-label={label}>
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

type FooterLink = { label: string; href?: string; soon?: boolean };

/** Footer menus as on the Laravel site (EXPLORE / ABOUT / SUPPORT / SUSTAINABILITY). */
function footerColumns(locale: Locale, t: Messages): { title: string; links: FooterLink[] }[] {
  const f = t.footer.links;
  const p = (section: Section, hash = '') => `${sectionPath(locale, section)}${hash}`;
  return [
    {
      title: t.footer.columns.explore,
      links: [
        { label: f.ourCruises, href: `${homePath(locale)}#fleet` },
        { label: f.ourItineraries, href: p('itinerary') },
        { label: f.ourServices, href: p('services') },
        { label: f.ourAdventures, href: p('experiences') },
        { label: f.meetingEvents, href: p('services', '#events') },
      ],
    },
    {
      title: t.footer.columns.about,
      links: [
        { label: f.aboutUs, href: p('aboutUs') },
        { label: f.contactUs, href: p('contact') },
        { label: f.blog, href: p('blog') },
        { label: f.gallery, href: p('gallery') },
      ],
    },
    {
      title: t.footer.columns.support,
      links: [
        { label: f.askAi, soon: true },
        { label: f.faqs, href: p('faq') },
        { label: f.safetyPolicies, href: p('safetyPolicies') },
        { label: f.paymentMethods, href: p('paymentMethods') },
      ],
    },
    {
      title: t.footer.columns.sustainability,
      links: [
        { label: f.greenTechnology, href: p('aboutUs', '#sustainability') },
        { label: f.greenGlobe, href: p('aboutUs', '#standards') },
        { label: f.ecoDashboard, href: p('ecoDashboard') },
      ],
    },
  ];
}

export function SiteFooter({ locale, site, t }: Pick<Chrome, 'locale' | 'site' | 't'>) {
  const info = siteInfo(site);
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.footerMain}>
          <div className={s.footerBrand}>
            <Brand locale={locale} site={site} />
            <p className={s.footerAbout}>{t.footer.statement}</p>
            {info.socials.length > 0 && (
              <div className={s.socialBlock}>
                <p className={s.socialLabel}>{t.footer.followUs}</p>
                <div className={s.socials}>
                  {info.socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener me"
                      aria-label={SOCIAL_LABELS[social.name] ?? social.name}
                      title={SOCIAL_LABELS[social.name] ?? social.name}
                    >
                      <SocialIcon name={social.name} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={s.footerNav}>
            {footerColumns(locale, t).map((column) => (
              <nav key={column.title} className={s.footerCol} aria-label={column.title}>
                <h2>{column.title}</h2>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <SmartLink href={link.href}>{link.label}</SmartLink>
                      ) : (
                        <span className={s.footerSoonItem} aria-disabled="true">{link.label}</span>
                      )}
                      {link.soon && <span className={s.soonBadge}>{t.footer.soon}</span>}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className={s.footerBottom}>
          <span>{t.footer.copyright}</span>
          <nav aria-label={t.footer.legal}>
            <SmartLink href={sectionPath(locale, 'privacyPolicy')}>{t.footer.privacy}</SmartLink>
            <span aria-hidden="true">|</span>
            <SmartLink href={sectionPath(locale, 'termsAndConditions')}>{t.footer.terms}</SmartLink>
            <span aria-hidden="true">|</span>
            <SmartLink href={sectionPath(locale, 'cookiePolicy')}>{t.footer.cookies}</SmartLink>
          </nav>
          <span>{t.footer.bays}</span>
        </div>
        <CookieConsent gtmId={info.gtmId} labels={t.cookies} policyHref={sectionPath(locale, 'cookiePolicy')} />
        {(info.hotlineHref || info.email || info.address) && (
          <address className={s.footerContact}>
            {info.hotlineHref && <a href={info.hotlineHref}>{info.hotline}</a>}
            {info.email && <a href={`mailto:${info.email}`}>{info.email}</a>}
            {info.address && <span>{info.address}</span>}
          </address>
        )}
      </div>
    </footer>
  );
}
