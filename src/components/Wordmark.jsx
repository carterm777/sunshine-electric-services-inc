import './Wordmark.css'

/*
 * Brand mark: a copper aperture arc broken by a single vertical conductor.
 * Abstract on purpose — reads as an opening/rising form rather than a literal
 * sun or a lightning bolt, which the voice brief rules out.
 */
export default function Wordmark({ tone = 'inv' }) {
  return (
    <span className={`wm wm--${tone}`}>
      <svg className="wm__mark" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
        <circle className="wm__field" cx="20" cy="20" r="19" />
        <path className="wm__arc" d="M9 25a11 11 0 0 1 22 0" />
        <path className="wm__arcOuter" d="M4.5 27.5a15.5 15.5 0 0 1 31 0" />
        <path className="wm__rod" d="M20 8.5v14.5" />
        <circle className="wm__node" cx="20" cy="26.4" r="2.1" />
      </svg>
      <span className="wm__type">
        <span className="wm__name">Sunshine</span>
        <span className="wm__sub">Electric Services</span>
      </span>
    </span>
  )
}
