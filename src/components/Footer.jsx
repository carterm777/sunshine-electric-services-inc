import { Facebook, Globe, Instagram, Mail, MapPin, MessageSquare, Phone } from 'lucide-react'
import { Reveal, Stagger } from '../lib/motion.jsx'
import { business, footer } from '../data/site.js'
import Wordmark from './Wordmark.jsx'
import './Footer.css'

const ICONS = { Facebook, Instagram, Globe }

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="ftr" id="footer">
      <span className="ftr__divider" aria-hidden="true" />

      <div className="shell ftr__inner">
        <Stagger className="ftr__cols" step={110}>
          <Reveal className="ftr__col ftr__col--brand" variant="rise-sm">
            <Wordmark />
            <p className="ftr__mission">{footer.mission}</p>
            <ul className="ftr__socials">
              {footer.socials.map((s) => {
                const Icon = ICONS[s.icon]
                return (
                  <li key={s.label}>
                    <a
                      className="ftr__social"
                      href={s.href}
                      aria-label={`${business.shortName} on ${s.label}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          {footer.columns.map((col) => (
            <Reveal className="ftr__col" variant="rise-sm" key={col.title}>
              <h3 className="ftr__colTitle">{col.title}</h3>
              <ul className="ftr__links">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a className="ftr__link" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal className="ftr__col ftr__col--contact" variant="rise-sm">
            <h3 className="ftr__colTitle">{footer.contactTitle}</h3>
            <address className="ftr__contact">
              <span className="ftr__biz">{business.name}</span>
              <span className="ftr__row">
                <MapPin size={14} strokeWidth={1.8} aria-hidden="true" />
                <span>{business.address}</span>
              </span>
              <a className="ftr__row ftr__rowLink" href={business.phoneHref}>
                <Phone size={14} strokeWidth={1.8} aria-hidden="true" />
                {business.phoneDisplay}
              </a>
              <a className="ftr__row ftr__rowLink" href={business.smsHref}>
                <MessageSquare size={14} strokeWidth={1.8} aria-hidden="true" />
                Text {business.phoneDisplay}
              </a>
              <a className="ftr__row ftr__rowLink" href={business.emailHref}>
                <Mail size={14} strokeWidth={1.8} aria-hidden="true" />
                {business.email}
              </a>
            </address>
          </Reveal>
        </Stagger>

        <div className="ftr__base">
          <p className="ftr__copy">
            &copy; {year} {footer.copyright}
          </p>
          <p className="ftr__demo">
            Unsolicited concept build — not affiliated with the business, set to noindex.
          </p>
        </div>
      </div>
    </footer>
  )
}
