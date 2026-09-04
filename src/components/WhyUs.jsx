import { GraduationCap, Home, Receipt, Zap } from 'lucide-react'
import { Reveal, Stagger } from '../lib/motion.jsx'
import { whyUs } from '../data/site.js'
import './WhyUs.css'

const ICONS = { Receipt, GraduationCap, Zap, Home }

export default function WhyUs() {
  return (
    <section className="why section" id="why" aria-labelledby="why-h2">
      <div className="shell">
        <div className="section-head why__head">
          <Reveal variant="rise-sm" as="p" className="eyebrow">
            <span className="eyebrow-rule" aria-hidden="true" />
            {whyUs.eyebrow}
          </Reveal>
          <Reveal variant="clip" as="h2" className="h2" id="why-h2">
            {whyUs.h2}
          </Reveal>
        </div>

        <ul className="why__list">
          {whyUs.items.map((item, i) => {
            const Icon = ICONS[item.icon]
            return (
              <Stagger className="why__row" as="li" step={130} key={item.title}>
                <Reveal
                  className="why__media media"
                  variant={i % 2 === 0 ? 'left' : 'right'}
                >
                  <img
                    className="media-img grade"
                    src={item.image.src}
                    srcSet={`${item.image.src800} 800w, ${item.image.src} 1600w`}
                    sizes="(max-width: 860px) 100vw, 42vw"
                    width={item.image.w}
                    height={item.image.h}
                    alt={item.image.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="why__mediaEdge" aria-hidden="true" />
                </Reveal>

                <Reveal className="why__body" variant="rise-sm">
                  <span className="why__icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <h3 className="h3 why__title">{item.title}</h3>
                  <span className="why__rule" aria-hidden="true" />
                  <p className="why__copy">{item.body}</p>
                </Reveal>
              </Stagger>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
