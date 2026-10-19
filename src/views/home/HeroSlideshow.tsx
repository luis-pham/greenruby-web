'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import s from './home.module.css';

export type HeroSlide = { image: string; title: string; titleEm: string | null; body: string | null };

const INTERVAL = 3500;
const pad = (n: number) => String(n).padStart(2, '0');
const fullTitle = (slide: HeroSlide) => (slide.titleEm ? `${slide.title} ${slide.titleEm}` : slide.title);
const fill = (template: string, n: number, slide: HeroSlide) => template.replace('{n}', pad(n)).replace('{title}', fullTitle(slide));

/**
 * Homepage hero: CMS banners as a cross-fading slideshow with a vertical slide nav on the right.
 * Every slide's copy is server-rendered (crawlers see all of it); inactive slides are inert.
 * Autoplay pauses on keyboard focus, when the tab is hidden or via the pause button, and is off for
 * reduced-motion users. (Not on hover: the pointer usually rests over the hero, which froze the slideshow.)
 */
export function HeroSlideshow({
  slides,
  heading,
  actions,
  nav,
  labels,
}: {
  slides: HeroSlide[];
  /** The page H1 (stays put while slides change). */
  heading: ReactNode;
  actions: ReactNode;
  /** Site navigation, rendered above the slides. */
  nav: ReactNode;
  /** `slide` is a template with {n} and {title} (plain strings: props cross the server/client boundary). */
  labels: { region: string; slide: string; pause: string; play: string };
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback((i: number) => setActive(((i % count) + count) % count), [count]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // The active slide's progress bar is the timer: its CSS animation advances the slide when it ends, so
  // pausing (hover, focus, hidden tab, pause button) freezes bar and slideshow together.
  const running = count > 1 && !paused && !userPaused && !reduced;

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return (
    <div
      className={s.heroStage}
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div className={s.heroMedia} aria-hidden="true">
        {slides.map((slide, i) => (
          <Image
            key={slide.image + i}
            src={slide.image}
            alt=""
            fill
            preload={i === 0}
            sizes="100vw"
            quality={75}
            className={`${s.heroImage} ${i === active ? s.heroImageActive : ''}`}
          />
        ))}
      </div>

      <div className="container">
        {nav}
        <div className={s.heroCopy}>
          {heading}
          <div className={s.heroSlides}>
            {slides.map((slide, i) => (
              <div
                key={slide.image + i}
                className={`${s.heroSlide} ${i === active ? s.heroSlideActive : ''}`}
                role="group"
                aria-roledescription="slide"
                aria-label={fill(labels.slide, i + 1, slide)}
                aria-hidden={i !== active}
                inert={i !== active}
              >
                <p className={s.heroTitle}>
                  {slide.title}
                  {slide.titleEm && (
                    <>
                      {' '}
                      <em>{slide.titleEm}</em>
                    </>
                  )}
                </p>
                {slide.body && <p className={s.heroBody}>{slide.body}</p>}
              </div>
            ))}
          </div>
          {actions}
        </div>
      </div>

      {count > 1 && (
        <div className={s.heroNav}>
          <ol>
            {slides.map((slide, i) => (
              <li key={slide.image + i}>
                <button
                  type="button"
                  className={i === active ? s.heroNavActive : undefined}
                  aria-current={i === active ? 'true' : undefined}
                  aria-label={fill(labels.slide, i + 1, slide)}
                  onClick={() => go(i)}
                >
                  <span className={s.heroNavNum}>{pad(i + 1)}</span>
                  <span className={s.heroNavTrack} aria-hidden="true">
                    {i === active && (
                      <span
                        key={active}
                        className={s.heroNavFill}
                        style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: running ? 'running' : 'paused' }}
                        onAnimationEnd={() => go(active + 1)}
                      />
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <button type="button" className={s.heroNavPause} onClick={() => setUserPaused((v) => !v)} aria-pressed={userPaused} aria-label={userPaused ? labels.play : labels.pause}>
            {userPaused || reduced ? (
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9l7-4.5z" fill="currentColor" /></svg>
            ) : (
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9M11 3.5v9" stroke="currentColor" strokeWidth="1.6" /></svg>
            )}
          </button>
          <span className={s.heroNavTotal} aria-hidden="true">/ {pad(count)}</span>
        </div>
      )}
    </div>
  );
}
