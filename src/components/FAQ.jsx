import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import { Reveal, Stagger } from '../lib/motion.jsx'
import { faq } from '../data/site.js'
import './FAQ.css'

export default function FAQ() {
  const uid = useId()
  const [open, setOpen] = useState('0-0')

  return (
    <section className="faq section" id="faq" aria-labelledby="faq-h2">
      <div className="shell">
        <div className="section-head faq__head">
          <Reveal variant="rise-sm" as="p" className="eyebrow">
            <span className="eyebrow-rule" aria-hidden="true" />
            {faq.eyebrow}
          </Reveal>
          <Reveal variant="clip" as="h2" className="h2" id="faq-h2">
            {faq.h2}
          </Reveal>
        </div>

        <div className="faq__cols">
          {faq.groups.map((group, gi) => (
            <div className="faq__col" key={group.title}>
              <Reveal variant="rise-sm" className="faq__colHead">
                <span className="faq__colRule" aria-hidden="true" />
                <span className="faq__colTitle">{group.title}</span>
              </Reveal>

              <Stagger className="faq__list" as="ul" step={90}>
                {group.items.map((item, ii) => {
                  const key = `${gi}-${ii}`
                  const id = `${uid}-${key}`
                  const isOpen = open === key
                  return (
                    <Reveal
                      as="li"
                      variant="rise-sm"
                      key={item.q}
                      className={`faq__item glass${isOpen ? ' faq__item--open' : ''}`}
                    >
                      <h3 className="faq__qWrap">
                        <button
                          className="faq__q"
                          type="button"
                          id={`${id}-btn`}
                          aria-expanded={isOpen}
                          aria-controls={`${id}-panel`}
                          onClick={() => setOpen(isOpen ? null : key)}
                        >
                          <span className="faq__qText">{item.q}</span>
                          <span className="faq__qIcon" aria-hidden="true">
                            <Plus size={16} strokeWidth={2} />
                          </span>
                        </button>
                      </h3>
                      <div
                        className="faq__panel"
                        id={`${id}-panel`}
                        role="region"
                        aria-labelledby={`${id}-btn`}
                      >
                        <div className="faq__panelInner">
                          <p className="faq__a">{item.a}</p>
                        </div>
                      </div>
                    </Reveal>
                  )
                })}
              </Stagger>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
