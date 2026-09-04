import { useId, useMemo, useState } from 'react'
import { MapPin, Phone, Search } from 'lucide-react'
import { Reveal, useDraw } from '../lib/motion.jsx'
import { business, coverage } from '../data/site.js'
import './ServiceAreas.css'

const RINGS = [0, 78, 142]

function nodeXY(place) {
  const rad = (place.angle * Math.PI) / 180
  const r = RINGS[place.ring]
  return { x: 200 + r * Math.cos(rad), y: 200 + r * Math.sin(rad) }
}

export default function ServiceAreas() {
  const uid = useId()
  const [query, setQuery] = useState('')
  const [drawRef, drawIn] = useDraw()

  const nodes = useMemo(
    () => coverage.places.map((p) => ({ ...p, ...nodeXY(p) })),
    []
  )

  const q = query.trim().toLowerCase()
  const match = q ? nodes.find((n) => n.name.toLowerCase().includes(q)) : null
  const result = !q
    ? null
    : match
      ? { status: match.status, name: match.name }
      : { status: 'none', name: query.trim() }

  const resultCopy = !result
    ? ''
    : result.status === 'in'
      ? `${result.name} — ${coverage.finder.inRange}`
      : result.status === 'edge'
        ? `${result.name} — ${coverage.finder.edge}`
        : coverage.finder.none

  return (
    <section className="cov section" id="coverage" aria-labelledby="cov-h2">
      <div className="shell cov__inner">
        <div className="cov__copy">
          <Reveal variant="rise-sm" as="p" className="eyebrow">
            <span className="eyebrow-rule" aria-hidden="true" />
            {coverage.eyebrow}
          </Reveal>
          <Reveal variant="clip" as="h2" className="h2 cov__h2" id="cov-h2">
            {coverage.h2}
          </Reveal>
          <Reveal variant="rise-sm" as="p" className="lede cov__lead">
            {coverage.lead}
          </Reveal>

          <Reveal variant="rise-sm" as="ul" className="cov__zones">
            {coverage.zones.map((zone) => (
              <li className="cov__zone" key={zone.name}>
                <span className="cov__zoneMark" aria-hidden="true" />
                <span className="cov__zoneText">
                  <span className="cov__zoneName">{zone.name}</span>
                  {zone.note ? <span className="cov__zoneNote">{" — "}{zone.note}</span> : null}
                </span>
              </li>
            ))}
          </Reveal>

          <Reveal variant="rise-sm" className="cov__finder">
            <label className="cov__finderLabel" htmlFor={`${uid}-find`}>
              {coverage.finder.label}
            </label>
            <span className="cov__finderField">
              <Search className="cov__finderIcon" size={16} strokeWidth={1.9} aria-hidden="true" />
              <input
                className="cov__finderInput"
                id={`${uid}-find`}
                type="search"
                autoComplete="off"
                placeholder={coverage.finder.placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-describedby={`${uid}-find-out`}
              />
            </span>
            <p
              className={`cov__finderOut cov__finderOut--${result ? result.status : 'idle'}`}
              id={`${uid}-find-out`}
              aria-live="polite"
            >
              {result ? resultCopy : coverage.finder.hint}
            </p>
          </Reveal>

          <Reveal variant="fade" as="p" className="cov__closing">
            {coverage.closing}
          </Reveal>
        </div>

        <Reveal className="cov__panel" variant="settle">
          <div className="cov__panelBg" aria-hidden="true">
            <img
              className="media-img grade-deep cov__panelImg"
              src="/images/panorama-hills-hero.webp"
              srcSet="/images/panorama-hills-hero-800.webp 800w, /images/panorama-hills-hero.webp 1600w"
              sizes="(max-width: 980px) 100vw, 46vw"
              width={1600}
              height={900}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <span className="cov__panelVeil" />
          </div>

          <svg
            className={`cov__diagram${drawIn ? ' is-in' : ''}`}
            ref={drawRef}
            viewBox="-34 -14 468 428"
            role="img"
            aria-label="Coverage diagram: Calgary at the centre, with Airdrie, Cochrane and Chestermere on the regular run, and Crossfield, Rocky View County, Okotoks and High River on the outer run."
          >
            <g className="cov__rings" aria-hidden="true">
              <circle cx="200" cy="200" r="78" />
              <circle cx="200" cy="200" r="142" />
              <circle className="cov__ringEdge" cx="200" cy="200" r="188" />
            </g>

            <g className="cov__runs" aria-hidden="true">
              {nodes.slice(1).map((n, i) => (
                <line
                  className="draw"
                  key={n.name}
                  x1="200"
                  y1="200"
                  x2={n.x}
                  y2={n.y}
                  pathLength="1"
                  style={{ '--rv-delay': `${180 + i * 90}ms` }}
                />
              ))}
            </g>

            <g className="cov__nodes">
              {nodes.map((n) => (
                <g className={`cov__node cov__node--${n.ring === 0 ? 'core' : n.status}`} key={n.name}>
                  <circle className="cov__nodeHalo" cx={n.x} cy={n.y} r={n.ring === 0 ? 17 : 10} />
                  <circle className="cov__nodeDot" cx={n.x} cy={n.y} r={n.ring === 0 ? 6.5 : 3.6} />
                  <text
                    className="cov__nodeLabel"
                    x={n.x}
                    y={n.y - (n.ring === 0 ? 26 : 17)}
                    textAnchor="middle"
                  >
                    {n.name}
                  </text>
                </g>
              ))}
            </g>
          </svg>

          <p className="cov__caption">
            Coverage diagram, not to scale — rings show how often the crew is through, not distance.
          </p>

          <address className="cov__card glass">
            <span className="cov__cardLabel">{coverage.address.label}</span>
            <span className="cov__cardAddr">
              <MapPin size={14} strokeWidth={1.9} aria-hidden="true" />
              <span>
                {business.addressParts.street}
                <br />
                {business.addressParts.locality}
              </span>
            </span>
            <a className="cov__cardPhone" href={business.phoneHref}>
              <Phone size={14} strokeWidth={1.9} aria-hidden="true" />
              {business.phoneDisplay}
            </a>
          </address>
        </Reveal>
      </div>
    </section>
  )
}
