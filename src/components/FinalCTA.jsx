import { MessageSquare, Phone } from 'lucide-react'
import { Reveal, Stagger, useParallax } from '../lib/motion.jsx'
import { business, finalCta } from '../data/site.js'
import './FinalCTA.css'

export default function FinalCTA() {
  const parallax = useParallax(0.1, { maxWidth: 900 })

  return (
    <section className="cta" id="contact" aria-labelledby="cta-h2">
      <div className="cta__bg" aria-hidden="true">
        <div className="cta__photo" ref={parallax}>
          <img
            className="media-img grade-deep"
            src={finalCta.image.src}
            srcSet={`${finalCta.image.src800} 800w, ${finalCta.image.src} 1600w`}
            sizes="100vw"
            width={finalCta.image.w}
            height={finalCta.image.h}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <span className="cta__veil" />
      </div>

      <div className="shell cta__inner">
        <Stagger className="cta__stack" step={130}>
          <Reveal variant="rise-sm" as="p" className="eyebrow eyebrow-inv">
            <span className="eyebrow-rule" aria-hidden="true" />
            {finalCta.eyebrow}
          </Reveal>

          <Reveal variant="rise" as="h2" className="cta__h2" id="cta-h2">
            {finalCta.h2}
          </Reveal>

          <Reveal variant="rise-sm" as="p" className="cta__sub">
            {finalCta.sub}
          </Reveal>

          <Reveal variant="rise-sm" className="cta__actions">
            <a className="btn btn-primary cta__call" href={business.phoneHref}>
              <Phone className="btn-icon" strokeWidth={2} aria-hidden="true" />
              Call {business.phoneDisplay}
            </a>
            <a className="btn btn-ghost-inv cta__text" href={business.smsHref}>
              <MessageSquare className="btn-icon" strokeWidth={2} aria-hidden="true" />
              {finalCta.textCta}
            </a>
          </Reveal>

          <Reveal variant="fade" className="cta__note">
            <span className="signal">
              <span className="pulse" aria-hidden="true" />
              {business.availability}
            </span>
            <span className="cta__noteText">{finalCta.note}</span>
          </Reveal>
        </Stagger>
      </div>
    </section>
  )
}
