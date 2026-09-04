import { Reveal, Stagger } from '../lib/motion.jsx'
import { story } from '../data/site.js'
import './Story.css'

export default function Story() {
  return (
    <section className="story" id="story" aria-labelledby="story-h2">
      <span className="story__wash" aria-hidden="true" />

      <div className="shell story__inner">
        <div className="story__aside">
          <div className="story__sticky">
            <Reveal className="story__media media" variant="settle">
              <img
                className="media-img grade-deep"
                src={story.image.src}
                srcSet={`${story.image.src800} 800w, ${story.image.src} 1600w`}
                sizes="(max-width: 980px) 100vw, 40vw"
                width={story.image.w}
                height={story.image.h}
                alt={story.image.alt}
                loading="lazy"
                decoding="async"
              />
              <span className="story__mediaEdge" aria-hidden="true" />
            </Reveal>

            <Reveal className="story__quote" variant="rise" as="blockquote">
              <span className="story__quoteMark" aria-hidden="true">
                &ldquo;
              </span>
              <p className="story__quoteText">{story.pullQuote}</p>
            </Reveal>
          </div>
        </div>

        <div className="story__body">
          <Reveal variant="rise-sm" as="p" className="eyebrow eyebrow-inv">
            <span className="eyebrow-rule" aria-hidden="true" />
            {story.eyebrow}
          </Reveal>
          <Reveal variant="clip" as="h2" className="h2 story__h2" id="story-h2">
            {story.h2}
          </Reveal>

          <Stagger className="story__prose" step={140}>
            {story.paragraphs.map((para, i) => (
              <Reveal className="story__para" as="p" variant="rise-sm" key={i}>
                {para}
              </Reveal>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
