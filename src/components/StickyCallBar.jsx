import { Phone } from 'lucide-react'
import { useScrolled } from '../lib/motion.jsx'
import { business } from '../data/site.js'
import './StickyCallBar.css'

/*
 * Mobile call-only bar. It stays out of the way until the visitor has moved
 * past the hero, so it never eats into the above-the-fold budget the hero
 * has to hit at 390x844.
 */
export default function StickyCallBar() {
  const past = useScrolled(560)

  return (
    <div className={`scb${past ? ' scb--in' : ''}`} aria-hidden={!past}>
      <a className="scb__btn" href={business.phoneHref} tabIndex={past ? 0 : -1}>
        <span className="scb__icon" aria-hidden="true">
          <Phone size={17} strokeWidth={2} />
        </span>
        <span className="scb__text">
          <span className="scb__label">{business.primaryCta}</span>
          <span className="scb__num">
            <span className="pulse" aria-hidden="true" />
            {business.phoneDisplay} · {business.availability}
          </span>
        </span>
      </a>
    </div>
  )
}
