import {
  ArrowUpRight,
  BellRing,
  Building2,
  CircuitBoard,
  Hammer,
  Lightbulb,
  Phone,
  PlugZap,
} from 'lucide-react'
import { Reveal, Stagger } from '../lib/motion.jsx'
import { business, services } from '../data/site.js'
import './Services.css'

const ICONS = { CircuitBoard, PlugZap, Lightbulb, Hammer, BellRing, Building2 }

export default function Services() {
  const Featured = ICONS[services.featured.icon]

  return (
    <section className="svc section" id="services" aria-labelledby="svc-h2">
      <div className="shell">
        <div className="section-head svc__head">
          <Reveal variant="rise-sm" as="p" className="eyebrow">
            <span className="eyebrow-rule" aria-hidden="true" />
            {services.eyebrow}
          </Reveal>
          <Reveal variant="clip" as="h2" className="h2" id="svc-h2">
            {services.h2}
          </Reveal>
        </div>

        <Stagger className="svc__feature" step={120}>
          <Reveal className="svc__featureMedia media" variant="settle">
            <img
              className="media-img grade"
              src={services.featured.image.src}
              srcSet={`${services.featured.image.src800} 800w, ${services.featured.image.src} 1600w`}
              sizes="(max-width: 900px) 100vw, 48vw"
              width={services.featured.image.w}
              height={services.featured.image.h}
              alt={services.featured.image.alt}
              loading="lazy"
              decoding="async"
            />
          </Reveal>

          <Reveal className="svc__featureBody glass" variant="rise">
            <p className="svc__tag">
              <span className="pulse" aria-hidden="true" />
              {services.featured.tag}
            </p>
            <span className="svc__featureIcon" aria-hidden="true">
              <Featured size={24} strokeWidth={1.5} />
            </span>
            <h3 className="svc__featureTitle">{services.featured.title}</h3>
            <p className="svc__featureCopy">{services.featured.body}</p>
            <a className="btn btn-primary svc__featureCta" href={business.phoneHref}>
              <Phone className="btn-icon" strokeWidth={2} aria-hidden="true" />
              {business.primaryCta}
            </a>
          </Reveal>
        </Stagger>

        <Stagger className="svc__grid" as="ul" step={100}>
          {services.items.map((item) => {
            const Icon = ICONS[item.icon]
            return (
              <Reveal className="svc__card glass" as="li" variant="rise" key={item.title}>
                <span className="svc__cardIcon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.6} />
                </span>
                <h3 className="svc__cardTitle">{item.title}</h3>
                <p className="svc__cardCopy">{item.body}</p>
                <span className="svc__cardMark" aria-hidden="true">
                  <ArrowUpRight size={15} strokeWidth={2} />
                </span>
              </Reveal>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
