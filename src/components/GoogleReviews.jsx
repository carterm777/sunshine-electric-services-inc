import { Info, Star } from 'lucide-react'
import { CountUp, Reveal, Stagger } from '../lib/motion.jsx'
import { reviews } from '../data/site.js'
import './GoogleReviews.css'

function Stars({ label }) {
  return (
    <span className="stars" role="img" aria-label={label}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          className="stars__i"
          key={i}
          size={14}
          strokeWidth={0}
          fill="currentColor"
          style={{ '--star-i': i }}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

export default function GoogleReviews() {
  return (
    <section className="rvw" id="reviews" aria-labelledby="rvw-h2">
      <div className="shell rvw__inner">
        <div className="rvw__head">
          <Reveal variant="rise-sm" as="p" className="eyebrow rvw__eyebrow">
            <span className="rvw__g" aria-hidden="true">
              G
            </span>
            {reviews.eyebrow}
          </Reveal>
          <Reveal variant="clip" as="h2" className="h2 rvw__h2" id="rvw-h2">
            {reviews.h2}
          </Reveal>
        </div>

        <Reveal variant="rise" className="rvw__aggregate glass">
          <div className="rvw__score">
            <CountUp
              className="rvw__scoreNum"
              end={reviews.aggregate.score}
              decimals={1}
              duration={1400}
            />
            <span className="rvw__scoreOf">/ {reviews.aggregate.outOf}</span>
          </div>
          <div className="rvw__scoreMeta">
            <Stars label={reviews.aggregate.headline} />
            <p className="rvw__scoreLine">{reviews.aggregate.headline}</p>
          </div>
          <p className="rvw__flag">
            <Info size={13} strokeWidth={1.9} aria-hidden="true" />
            {reviews.placeholderNote}
          </p>
        </Reveal>

        <Stagger className="rvw__grid" as="ul" step={110}>
          {reviews.items.map((item) => (
            <Reveal className="rvw__card glass" as="li" variant="rise" key={item.name}>
              <figure className="rvw__fig">
                <div className="rvw__cardTop">
                  <Stars label="Rated 5 out of 5" />
                  <span className="rvw__focus">{item.focus}</span>
                </div>
                <blockquote className="rvw__quote">{item.quote}</blockquote>
                <figcaption className="rvw__by">
                  <span className="rvw__avatar" aria-hidden="true">
                    {item.name.charAt(0)}
                  </span>
                  <span className="rvw__byText">
                    <span className="rvw__name">{item.name}</span>
                    <span className="rvw__src">Google review</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
