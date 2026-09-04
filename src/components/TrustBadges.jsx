import { Award, MapPin, ShieldCheck, Umbrella } from 'lucide-react'
import { Reveal, Stagger } from '../lib/motion.jsx'
import { trustBadges } from '../data/site.js'
import './TrustBadges.css'

const ICONS = { ShieldCheck, Umbrella, MapPin, Award }

export default function TrustBadges() {
  return (
    <section className="tb" aria-labelledby="tb-h2">
      <div className="tb__bg" aria-hidden="true">
        <img
          className="media-img grade-deep tb__tex"
          src="/images/conduit-pattern.webp"
          srcSet="/images/conduit-pattern-800.webp 800w, /images/conduit-pattern.webp 1600w"
          sizes="100vw"
          width={1600}
          height={900}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span className="tb__veil" />
      </div>

      <div className="shell tb__inner">
        <h2 className="tb__h2" id="tb-h2">
          {trustBadges.h2}
        </h2>

        <Stagger className="tb__list" as="ul" step={95}>
          {trustBadges.items.map((item) => {
            const Icon = ICONS[item.icon]
            return (
              <Reveal className="tb__item" as="li" variant="scale" key={item.label}>
                <span className="tb__icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.5} />
                </span>
                <h3 className="tb__label">{item.label}</h3>
              </Reveal>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
