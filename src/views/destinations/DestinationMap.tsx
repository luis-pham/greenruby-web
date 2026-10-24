import Link from 'next/link';
import { staticMap, type LatLng } from './map';
import s from './destinations.module.css';

export type MapPoint = LatLng & { name: string; href: string; bay: string };

/**
 * Server-rendered map: OpenStreetMap tiles as lazy <img> and one numbered link per destination, with
 * the same numbers in a list below (keyboard and screen-reader friendly). No map library, no client JS.
 */
export function DestinationMap({ points, title, attribution, listLabel }: { points: MapPoint[]; title: string; attribution: string; listLabel: string }) {
  const map = staticMap(points);
  if (!map) return null;
  return (
    <figure className={s.map}>
      <div className={s.mapCanvas} style={{ aspectRatio: `${map.width} / ${map.height}` }} aria-label={title} role="group">
        {map.tiles.map((tile) => (
          // eslint-disable-next-line @next/next/no-img-element -- third-party map tiles, not resized by the CMS proxy
          <img
            key={tile.url}
            src={tile.url}
            alt=""
            width={256}
            height={256}
            loading="lazy"
            decoding="async"
            className={s.mapTile}
            style={{ left: `${tile.left}%`, top: `${tile.top}%`, width: `${tile.size}%` }}
          />
        ))}
        {points.map((point, i) => (
          <Link
            key={point.href}
            href={point.href}
            className={s.mapPin}
            data-bay={point.bay}
            style={{ left: `${map.pins[i].left}%`, top: `${map.pins[i].top}%` }}
            aria-label={point.name}
          >
            <span aria-hidden="true">{i + 1}</span>
            <span className={s.mapPinLabel} aria-hidden="true">{point.name}</span>
          </Link>
        ))}
      </div>
      <figcaption className={s.mapCaption}>
        <ol className={s.mapList} aria-label={listLabel}>
          {points.map((point, i) => (
            <li key={point.href} data-bay={point.bay}>
              <span aria-hidden="true">{i + 1}</span>
              <Link href={point.href}>{point.name}</Link>
            </li>
          ))}
        </ol>
        <a className={s.mapAttribution} href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">
          {attribution}
        </a>
      </figcaption>
    </figure>
  );
}
