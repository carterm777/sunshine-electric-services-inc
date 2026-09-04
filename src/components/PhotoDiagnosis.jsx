import { useCallback, useEffect, useId, useRef, useState } from 'react'
import {
  ArrowRight,
  Camera,
  ChevronDown,
  ImageUp,
  Lock,
  Phone,
  RotateCcw,
  Trash2,
  X,
} from 'lucide-react'
import { useCursorGlow, usePrefersReducedMotion } from '../lib/motion.jsx'
import { business, widget } from '../data/site.js'
import './PhotoDiagnosis.css'

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp']
const MAX_BYTES = 8 * 1024 * 1024

function prettySize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function PhotoDiagnosis() {
  const uid = useId()
  const reduced = usePrefersReducedMotion()
  const glow = useCursorGlow()

  const inputRef = useRef(null)
  const previewUrl = useRef(null)
  const timers = useRef([])

  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [fileError, setFileError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})
  const [values, setValues] = useState({ description: '', name: '', phone: '' })
  const [phase, setPhase] = useState('idle') // idle | sending | done
  /* Mobile presents a compact entry state so the hero still clears the fold;
     it expands to the full instrument on first interaction. */
  const [expanded, setExpanded] = useState(false)

  const releasePreview = useCallback(() => {
    if (previewUrl.current) {
      URL.revokeObjectURL(previewUrl.current)
      previewUrl.current = null
    }
  }, [])

  useEffect(
    () => () => {
      releasePreview()
      timers.current.forEach(clearTimeout)
    },
    [releasePreview]
  )

  const acceptFile = useCallback(
    (next) => {
      if (!next) return
      if (!ACCEPTED.includes(next.type)) {
        setFileError(widget.errors.type)
        return
      }
      if (next.size > MAX_BYTES) {
        setFileError(widget.errors.size)
        return
      }
      releasePreview()
      const url = URL.createObjectURL(next)
      previewUrl.current = url
      setPreview(url)
      setFile(next)
      setFileError(null)
      setExpanded(true)
    },
    [releasePreview]
  )

  const clearFile = useCallback(() => {
    releasePreview()
    setPreview(null)
    setFile(null)
    setFileError(null)
    if (inputRef.current) inputRef.current.value = ''
  }, [releasePreview])

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    acceptFile(e.dataTransfer.files?.[0])
  }

  const onField = (key) => (e) => {
    const v = e.target.value
    setValues((prev) => ({ ...prev, [key]: v }))
    setFieldErrors((prev) => (prev[key] ? { ...prev, [key]: null } : prev))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!values.name.trim()) next.name = widget.errors.missingName
    const digits = values.phone.replace(/\D/g, '')
    if (!digits) next.phone = widget.errors.missingPhone
    else if (digits.length < 10) next.phone = widget.errors.phoneFormat
    setFieldErrors(next)
    if (Object.keys(next).length) {
      // On the compact mobile entry state the fields are collapsed — open them
      // so the visitor can see what still needs filling in.
      setExpanded(true)
      return
    }

    setPhase('sending')
    timers.current.push(
      setTimeout(() => setPhase('done'), reduced ? 250 : 1500)
    )
  }

  const reset = () => {
    clearFile()
    setValues({ description: '', name: '', phone: '' })
    setFieldErrors({})
    setPhase('idle')
    setExpanded(true)
  }

  const busy = phase === 'sending'

  return (
    <section
      className={`pd glass-dark${expanded ? ' pd--open' : ''}${phase === 'done' ? ' pd--done' : ''}`}
      aria-labelledby={`${uid}-title`}
      ref={glow.ref}
      onPointerMove={glow.onPointerMove}
      onPointerEnter={glow.onPointerEnter}
      onPointerLeave={glow.onPointerLeave}
    >
      <span className="pd__glow" aria-hidden="true" />
      <span className="noise" aria-hidden="true" />

      <header className="pd__head">
        <p className="eyebrow eyebrow-inv pd__eyebrow">
          <Camera size={13} strokeWidth={1.9} aria-hidden="true" />
          {widget.eyebrow}
        </p>
        <h2 className="pd__title" id={`${uid}-title`}>
          {widget.h2}
        </h2>
        <p className="pd__intro">{widget.intro}</p>
      </header>

      {phase === 'done' ? (
        <div className="pd__success" role="status">
          <span className="pd__successMark" aria-hidden="true">
            <svg viewBox="0 0 40 40" className="pd__successSvg">
              <circle className="pd__successRing" cx="20" cy="20" r="17" pathLength="1" />
              <path className="pd__successTick" d="M12.5 20.4 17.6 25.4 27.8 15.2" pathLength="1" />
            </svg>
          </span>
          <p className="pd__successTitle">{widget.successTitle}</p>
          <p className="pd__successBody">{widget.successBody}</p>
          <div className="pd__successActions">
            <a className="btn btn-primary pd__successCall" href={business.phoneHref}>
              <Phone className="btn-icon" strokeWidth={2} aria-hidden="true" />
              {business.phoneDisplay}
            </a>
            <button className="pd__again" type="button" onClick={reset}>
              <RotateCcw size={14} strokeWidth={1.9} aria-hidden="true" />
              {widget.successAgain}
            </button>
          </div>
        </div>
      ) : (
        <form className="pd__form" onSubmit={onSubmit} noValidate>
          <div
            className={`pd__drop${dragging ? ' pd__drop--over' : ''}${preview ? ' pd__drop--filled' : ''}${fileError ? ' pd__drop--error' : ''}`}
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
          >
            {preview ? (
              <div className="pd__previewWrap">
                <img className="pd__preview" src={preview} alt="The photo you selected, ready to send" />
                <div className="pd__previewMeta">
                  <p className="pd__previewName">{file?.name}</p>
                  <p className="pd__previewSize">{file ? prettySize(file.size) : ''}</p>
                </div>
                <div className="pd__previewTools">
                  <button
                    className="pd__tool"
                    type="button"
                    onClick={() => inputRef.current?.click()}
                  >
                    <ImageUp size={13} strokeWidth={1.9} aria-hidden="true" />
                    {widget.replace}
                  </button>
                  <button className="pd__tool" type="button" onClick={clearFile}>
                    <Trash2 size={13} strokeWidth={1.9} aria-hidden="true" />
                    {widget.remove}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <span className="pd__dropIcon" aria-hidden="true">
                  <ImageUp size={20} strokeWidth={1.6} />
                </span>
                <label className="pd__dropLabel" htmlFor={`${uid}-file`}>
                  {widget.dropLabel}
                </label>
                <p className="pd__dropHint">{widget.dropHint}</p>
                <span className="pd__dropBrowse" aria-hidden="true">
                  {widget.browse}
                  <ArrowRight size={13} strokeWidth={2} />
                </span>
              </>
            )}

            <input
              className="pd__file"
              id={`${uid}-file`}
              ref={inputRef}
              type="file"
              accept={ACCEPTED.join(',')}
              onChange={(e) => acceptFile(e.target.files?.[0])}
            />
          </div>

          <p className="pd__status" aria-live="polite">
            {fileError ? (
              <span className="pd__error">
                <X size={13} strokeWidth={2.2} aria-hidden="true" />
                {fileError}
              </span>
            ) : busy ? (
              <span className="pd__busy">
                <span className="pd__busyBar" aria-hidden="true" />
                {widget.analysing}
              </span>
            ) : (
              <span className="pd__note">{widget.demoNote}</span>
            )}
          </p>

          <button
            className="pd__expand"
            type="button"
            onClick={() => setExpanded(true)}
            aria-expanded={expanded}
            aria-controls={`${uid}-fields`}
          >
            Add details and send
            <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
          </button>

          <div className="pd__fields" id={`${uid}-fields`}>
            <p className="pd__field">
              <label className="pd__label" htmlFor={`${uid}-desc`}>
                {widget.fields.description}
              </label>
              <textarea
                className="pd__input pd__input--area"
                id={`${uid}-desc`}
                rows={2}
                placeholder={widget.fields.descriptionPlaceholder}
                value={values.description}
                onChange={onField('description')}
                aria-describedby={`${uid}-desc-hint`}
              />
              <span className="pd__hint" id={`${uid}-desc-hint`}>
                {widget.fields.descriptionHint}
              </span>
            </p>

            <div className="pd__row">
              <p className="pd__field">
                <label className="pd__label" htmlFor={`${uid}-name`}>
                  {widget.fields.name}
                </label>
                <input
                  className="pd__input"
                  id={`${uid}-name`}
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={onField('name')}
                  aria-invalid={fieldErrors.name ? 'true' : undefined}
                  aria-describedby={fieldErrors.name ? `${uid}-name-err` : undefined}
                />
                {fieldErrors.name ? (
                  <span className="pd__fieldError" id={`${uid}-name-err`}>
                    {fieldErrors.name}
                  </span>
                ) : null}
              </p>

              <p className="pd__field">
                <label className="pd__label" htmlFor={`${uid}-phone`}>
                  {widget.fields.phone}
                </label>
                <input
                  className="pd__input"
                  id={`${uid}-phone`}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={onField('phone')}
                  aria-invalid={fieldErrors.phone ? 'true' : undefined}
                  aria-describedby={fieldErrors.phone ? `${uid}-phone-err` : undefined}
                />
                {fieldErrors.phone ? (
                  <span className="pd__fieldError" id={`${uid}-phone-err`}>
                    {fieldErrors.phone}
                  </span>
                ) : null}
              </p>
            </div>
          </div>

          <button className="btn btn-primary pd__submit" type="submit" disabled={busy}>
            {busy ? widget.analysing : widget.submit}
            <ArrowRight className="btn-icon" strokeWidth={2} aria-hidden="true" />
          </button>

          <p className="pd__reassure">
            <Lock size={12} strokeWidth={1.9} aria-hidden="true" />
            {widget.reassurance}
          </p>
        </form>
      )}
    </section>
  )
}
