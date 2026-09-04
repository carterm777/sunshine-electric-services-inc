import { ArrowDown, BadgeCheck, Clock, Phone, Receipt, ShieldCheck } from 'lucide-react'
import { Reveal, Stagger, WordReveal, useParallax } from '../lib/motion.jsx'
import { business, hero } from '../data/site.js'
import PhotoDiagnosis from './PhotoDiagnosis.jsx'
import './Hero.css'

const ICONS = { ShieldCheck, Clock, BadgeCheck, Receipt }

export default function Hero() {
  const parallax = useParallax(0.12, { maxWidth: 1080 })

  return (
    <section className="hero" id="top" aria-labelledby="hero-h1">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__photo" ref={parallax}>
          <img
            className="media-img grade-deep"
            src={hero.image.src}
            srcSet={`${hero.image.src800} 800w, ${hero.image.src} 1600w`}
            sizes="(max-width: 900px) 100vw, 60vw"
            width={hero.image.w}
            height={hero.image.h}
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <span className="hero__veil" />
        <span className="hero__grid" />
      </div>

      <div className="shell hero__inner">
        <div className="hero__content">
          <Stagger className="hero__stack" step={120} threshold={0.01} rootMargin="0px">
            <Reveal className="hero__eyebrowWrap" variant="rise-sm" as="p">
              <span className="eyebrow eyebrow-inv">
                <span className="eyebrow-rule" aria-hidden="true" />
                {hero.eyebrow}
              </span>
            </Reveal>

            <h1 className="hero__h1" id="hero-h1">
              <WordReveal text={hero.h1} step={68} delay={140} />
            </h1>

            <Reveal className="hero__sub" variant="rise-sm" as="p" delay={620}>
              {hero.sub}
            </Reveal>

            <Reveal className="hero__badges" variant="rise-sm" as="ul" delay={760}>
              {hero.badges.map((badge) => {
                const Icon = ICONS[badge.icon]
                return (
                  <li className="hero__badge" key={badge.label}>
                    <span className="hero__badgeIcon" aria-hidden="true">
                      <Icon size={17} strokeWidth={1.7} />
                    </span>
                    <span className="hero__badgeLabel">{badge.label}</span>
                  </li>
                )
              })}
            </Reveal>

            <Reveal className="hero__actions" variant="rise-sm" delay={880}>
              <a className="btn btn-primary hero__call" href={business.phoneHref}>
                <Phone className="btn-icon" strokeWidth={2} aria-hidden="true" />
                {business.primaryCta}
              </a>
              <a className="btn btn-ghost-inv hero__secondary" href="#services">
                {hero.secondaryCta}
                <ArrowDown className="btn-icon" strokeWidth={2} aria-hidden="true" />
              </a>
            </Reveal>

            <Reveal className="hero__meta" variant="fade" delay={1000}>
              <span className="signal hero__signal">
                <span className="pulse" aria-hidden="true" />
                {business.availability}
              </span>
              <span className="hero__metaRule" aria-hidden="true" />
              <span className="hero__metaText">Calgary · Cochrane · Airdrie</span>
            </Reveal>
          </Stagger>
        </div>

        <div className="hero__slot" aria-hidden="true" />
      </div>

      {/* Sticky rail. Absolutely positioned against .lede (the hero + reviews
          wrapper) on desktop, so the widget travels the whole way down and
          then releases cleanly at the end of the reviews section — it can
          never overlap the trust-badge banner that follows. Below 1080px it
          drops back into normal flow directly beneath the hero copy. */}
      <div className="hero__rail">
        <div className="hero__railInner">
          <PhotoDiagnosis />
        </div>
      </div>
    </section>
  )
}
