'use client';

import { useRef, useState, type ReactNode } from 'react';
import s from './home.module.css';

/**
 * Ship choice for the suite collection. Every card carries a link for each ship (server-rendered, so crawlers see
 * both); the links of the other ships are `hidden`, and this only toggles which ship's links show.
 */
export function ShipTabs({ label, ships, children }: { label: string; ships: { id: number; label: string }[]; children: ReactNode }) {
  const [active, setActive] = useState(ships[0]?.id);
  const scope = useRef<HTMLDivElement>(null);

  const select = (id: number) => {
    setActive(id);
    scope.current?.querySelectorAll<HTMLElement>('[data-ship]').forEach((el) => {
      el.hidden = Number(el.dataset.ship) !== id;
    });
  };

  return (
    <>
      {ships.length > 1 && (
      <div className={`${s.tabs} ${s.shipTabs}`} role="tablist" aria-label={label}>
        {ships.map((ship) => (
          <button
            key={ship.id}
            type="button"
            role="tab"
            aria-selected={ship.id === active}
            className={ship.id === active ? `${s.tab} ${s.tabActive}` : s.tab}
            onClick={() => select(ship.id)}
          >
            {ship.label}
          </button>
        ))}
      </div>
      )}
      <div ref={scope}>{children}</div>
    </>
  );
}
