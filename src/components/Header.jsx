import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, Mail, MapPin, Phone } from 'lucide-react'
import { useScrolled } from '../lib/motion.jsx'
import { business, nav } from '../data/site.js'
import Wordmark from './Wordmark.jsx'
import './Header.css'

function NavDropdown({ item, openKey, setOpenKey }) {
  const panelId = useId()
  const wrapRef = useRef(null)
  const btnRef = useRef(null)
  const open = openKey === item.label

  const close = useCallback(
    (refocus) => {
      setOpenKey(null)
      if (refocus && btnRef.current) btnRef.current.focus()
    },
    [setOpenKey]
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close(true)
    }
    const onPointer = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) close(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open, close])

  return (
    <li
      className="nav__item nav__item--has-menu"
      ref={wrapRef}
      onMouseEnter={() => setOpenKey(item.label)}
      onMouseLeave={() => setOpenKey(null)}
    >
      <a
        className="nav__link"
        href={item.href}
        ref={btnRef}
        aria-expanded={open}
        aria-controls={panelId}
        onFocus={() => setOpenKey(item.label)}
        onClick={() => setOpenKey(null)}
      >
        {item.label}
        <ChevronDown className="nav__chev" size={13} strokeWidth={2} aria-hidden="true" />
      </a>

      <div className={`menu${open ? ' menu--open' : ''}`} id={panelId} hidden={!open}>
        <div className="menu__inner">
          <p className="menu__label">{item.label}</p>
          <ul className="menu__list">
            {item.menu.map((entry) => (
              <li key={entry}>
                <a className="menu__link" href={item.menuHref} onClick={() => close(false)}>
                  {entry}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  )
}

export default function Header() {
  const scrolled = useScrolled(40)
  const [openKey, setOpenKey] = useState(null)

  return (
    <header className={`hdr${scrolled ? ' hdr--stuck' : ''}`}>
      <div className="hdr__sub">
        <div className="shell hdr__subInner">
          <a className="hdr__subItem" href={business.phoneHref}>
            <Phone size={13} strokeWidth={1.8} aria-hidden="true" />
            {business.phoneDisplay}
          </a>
          <span className="hdr__dot" aria-hidden="true" />
          <a className="hdr__subItem" href={business.emailHref}>
            <Mail size={13} strokeWidth={1.8} aria-hidden="true" />
            {business.email}
          </a>
          <span className="hdr__dot" aria-hidden="true" />
          <span className="hdr__subItem hdr__subItem--plain">
            <MapPin size={13} strokeWidth={1.8} aria-hidden="true" />
            {business.address}
          </span>
          <span className="hdr__signal signal">
            <span className="pulse" aria-hidden="true" />
            {business.availability}
          </span>
        </div>
      </div>

      <div className="hdr__bar">
        <div className="shell hdr__barInner">
          <a className="hdr__brand" href="#top" aria-label={`${business.name} — back to top`}>
            <Wordmark />
          </a>

          <nav className="nav" aria-label="Primary">
            <ul className="nav__list">
              {nav.map((item) =>
                item.menu ? (
                  <NavDropdown
                    key={item.label}
                    item={item}
                    openKey={openKey}
                    setOpenKey={setOpenKey}
                  />
                ) : (
                  <li className="nav__item" key={item.label}>
                    <a className="nav__link" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>

          <a className="btn btn-primary hdr__cta" href={business.phoneHref}>
            <Phone className="btn-icon" strokeWidth={2} aria-hidden="true" />
            <span className="hdr__ctaFull">{business.phoneDisplay}</span>
            <span className="hdr__ctaShort">Call</span>
          </a>
        </div>
      </div>

      <nav className="railnav" aria-label="Sections">
        <ul className="railnav__list">
          {nav.map((item) => (
            <li key={item.label}>
              <a className="railnav__link" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
