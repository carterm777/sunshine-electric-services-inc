/*
 * Motion primitives — shared infrastructure for every section's animation phase.
 *
 * Every scroll-triggered entrance in this project MUST fire once the element is
 * meaningfully inside the viewport (threshold ~0.15-0.2 / rootMargin -12%..-15%),
 * never at first pixel. These defaults enforce that; don't lower them.
 *
 * Every technique here has a reduced-motion fallback baked in: when
 * prefers-reduced-motion is set, elements render at their final state instantly
 * with no transform, no blur, and no stagger delay.
 */
import {
  Fragment,
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

/* ------------------------------------------------------------------ */
/* Reduced motion                                                      */
/* ------------------------------------------------------------------ */

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/* ------------------------------------------------------------------ */
/* In-view detection                                                   */
/* ------------------------------------------------------------------ */

/**
 * IntersectionObserver hook with project-correct trigger timing.
 * Returns [ref, inView].
 *
 * Elements taller than the viewport fall back to a rootMargin-only trigger so
 * they don't wait for an unreachable threshold.
 */
export function useInView({
  threshold = 0.18,
  rootMargin = '0px 0px -12% 0px',
  once = true,
} = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    // A block taller than the viewport can never reach a 0.18 threshold, so
    // trigger it off the rootMargin alone.
    const tall = node.offsetHeight > window.innerHeight * 0.9
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setInView(false)
          }
        })
      },
      {
        threshold: tall ? 0 : threshold,
        rootMargin: tall ? '0px 0px -20% 0px' : rootMargin,
      }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}

/* ------------------------------------------------------------------ */
/* Stagger context — lets a parent hand out sequential delays           */
/* ------------------------------------------------------------------ */

const StaggerContext = createContext(null)

/**
 * Wraps a group of <Reveal> children so they share one trigger and receive
 * sequential delays. `step` is the ms gap between siblings (80-150ms reads as
 * deliberate; below 80 looks accidental, above 150 looks sluggish).
 */
export function Stagger({
  children,
  step = 110,
  base = 0,
  threshold,
  rootMargin,
  once = true,
  as: Tag = 'div',
  ...rest
}) {
  const [ref, inView] = useInView({ threshold, rootMargin, once })
  const counter = useRef(0)
  counter.current = 0

  const value = useMemo(
    () => ({
      inView,
      step,
      base,
      next: () => base + counter.current++ * step,
    }),
    [inView, step, base]
  )

  return (
    <StaggerContext.Provider value={value}>
      <Tag ref={ref} {...rest}>
        {children}
      </Tag>
    </StaggerContext.Provider>
  )
}

/* ------------------------------------------------------------------ */
/* Reveal                                                              */
/* ------------------------------------------------------------------ */

/**
 * Entrance wrapper. `variant` maps to a technique from
 * references/animation-and-motion-richness.md:
 *
 *   rise    — Staggered Rise (24-32px rise, 600ms, ease-out-cubic)
 *   fade    — opacity only
 *   clip    — Clip Reveal (mask slides away, 700-900ms ease-out-quart)
 *   clip-x  — Clip Reveal, horizontal wipe
 *   settle  — Depth Settle (scale 1.04 -> 1, blur 4px -> 0, 800ms)
 *   focus   — Video/Image Focus Pull (blur 6px -> 0, 700ms)
 *   rise-sm — shorter rise for tight groups
 *   scale   — quiet scale-in for icons/badges
 *
 * Inside a <Stagger>, delay is assigned automatically unless passed explicitly.
 */
export function Reveal({
  children,
  variant = 'rise',
  delay,
  duration,
  as: Tag = 'div',
  className = '',
  style,
  threshold,
  rootMargin,
  once = true,
  ...rest
}) {
  const group = useContext(StaggerContext)

  // Chrome's IntersectionObserver DOES account for the target's own clip-path,
  // so a `clip` variant observes itself at zero area and can never reach a
  // ratio threshold — the entrance deadlocks and the element stays invisible
  // forever. (Verified empirically; scale-based variants do NOT have this
  // problem, Chrome reports zero-area transformed targets as intersecting.)
  // For clip variants, trigger off rootMargin alone, which the motion-richness
  // file explicitly allows as the alternative to a ratio threshold.
  const clipped = variant === 'clip' || variant === 'clip-x'
  const own = useInView({
    threshold: threshold ?? (clipped ? 0 : undefined),
    rootMargin: rootMargin ?? (clipped ? '0px 0px -30% 0px' : undefined),
    once,
  })
  const assigned = useRef(null)

  if (group && assigned.current === null) assigned.current = group.next()

  const inView = group ? group.inView : own[1]
  const ref = group ? undefined : own[0]
  const ms = delay !== undefined ? delay : group ? assigned.current : 0

  return (
    <Tag
      ref={ref}
      className={`rv rv--${variant}${inView ? ' is-in' : ''}${className ? ' ' + className : ''}`}
      style={{
        '--rv-delay': `${ms}ms`,
        ...(duration ? { '--rv-duration': `${duration}ms` } : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ------------------------------------------------------------------ */
/* Weighted Word Reveal — hero headline only, once per page            */
/* ------------------------------------------------------------------ */

/**
 * Splits a headline into words that rise in sequence. Per the richness file
 * this is a once-per-page technique — use it on the H1 and nowhere else, and
 * only when the headline is roughly 10 words or fewer.
 */
export function WordReveal({
  text,
  as: Tag = 'span',
  delay = 0,
  step = 75,
  className = '',
  trigger = true,
  ...rest
}) {
  const words = String(text).split(' ')
  return (
    <Tag className={`wr${trigger ? ' is-in' : ''}${className ? ' ' + className : ''}`} {...rest}>
      {words.map((word, i) => (
        // The separating space MUST sit outside .wr__w. That element is an
        // inline-block with overflow:hidden, and trailing whitespace inside one
        // is collapsed away — putting the space in there runs every word
        // together ("LicensedMasterElectricians").
        <Fragment key={`${word}-${i}`}>
          <span className="wr__w">
            <span className="wr__i" style={{ '--wr-delay': `${delay + i * step}ms` }}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Tag>
  )
}

/* ------------------------------------------------------------------ */
/* Counting Numerals                                                   */
/* ------------------------------------------------------------------ */

/**
 * Counts up once when scrolled into view. Only worth using on figures that are
 * round or large enough to justify the emphasis.
 */
export function CountUp({
  end,
  duration = 1500,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  as: Tag = 'span',
}) {
  const reduced = usePrefersReducedMotion()
  const [ref, inView] = useInView({ threshold: 0.4, rootMargin: '0px 0px -10% 0px' })
  const [value, setValue] = useState(reduced ? end : 0)

  useEffect(() => {
    if (!inView || reduced) {
      if (reduced) setValue(end)
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      // ease-out-expo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setValue(end * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, end, duration, reduced])

  return (
    <Tag ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </Tag>
  )
}

/* ------------------------------------------------------------------ */
/* Layered Parallax Drift                                              */
/* ------------------------------------------------------------------ */

/**
 * Scroll-linked drift for a background layer. Returns a ref to attach.
 * Automatically flat on mobile (<= 900px) and under reduced motion, per the
 * richness file's mobile guidance — a static fallback, not a hope it degrades.
 */
export function useParallax(speed = 0.35, { maxWidth = 900 } = {}) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (reduced || window.innerWidth <= maxWidth) {
      node.style.transform = ''
      return
    }

    let raf = null
    const update = () => {
      raf = null
      const rect = node.getBoundingClientRect()
      const mid = rect.top + rect.height / 2 - window.innerHeight / 2
      node.style.transform = `translate3d(0, ${(-mid * speed).toFixed(2)}px, 0)`
    }
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [speed, reduced, maxWidth])

  return ref
}

/* ------------------------------------------------------------------ */
/* Progressive Reveal Scrub                                            */
/* ------------------------------------------------------------------ */

/**
 * Ties an element's progress (0-1) to its distance from viewport centre, for
 * long-form/process content that should feel scroll-linked rather than
 * fire-once. Writes `--scrub` on the node so CSS can consume it.
 */
export function useScrub({ maxWidth = 0 } = {}) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (reduced || (maxWidth && window.innerWidth <= maxWidth)) {
      node.style.setProperty('--scrub', '1')
      return
    }

    let raf = null
    const update = () => {
      raf = null
      const rect = node.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the element's top is at the bottom of the viewport,
      // 1 once its top has travelled to 55% up the screen.
      const p = 1 - (rect.top - vh * 0.15) / (vh * 0.6)
      node.style.setProperty('--scrub', String(Math.min(Math.max(p, 0), 1)))
    }
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduced, maxWidth])

  return ref
}

/* ------------------------------------------------------------------ */
/* Cursor-Reactive Glow                                                */
/* ------------------------------------------------------------------ */

/**
 * Radial light that follows the pointer inside a panel. Per the richness file
 * this is a 1-2 elements per page technique on dark surfaces only — using it
 * everywhere burns the effect.
 *
 * Spread the returned props onto the element; drive the visual from
 * --glow-x / --glow-y / --glow-on in CSS.
 */
export function useCursorGlow() {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  const onPointerMove = useCallback(
    (e) => {
      const node = ref.current
      if (!node || reduced) return
      const rect = node.getBoundingClientRect()
      node.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
      node.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
    },
    [reduced]
  )

  const onPointerEnter = useCallback(() => {
    const node = ref.current
    if (!node || reduced) return
    node.style.setProperty('--glow-on', '1')
  }, [reduced])

  const onPointerLeave = useCallback(() => {
    const node = ref.current
    if (!node) return
    node.style.setProperty('--glow-on', '0')
  }, [])

  return { ref, onPointerMove, onPointerEnter, onPointerLeave }
}

/* ------------------------------------------------------------------ */
/* Sequential Line Draw                                                */
/* ------------------------------------------------------------------ */

/**
 * Convenience for stroke-dashoffset draws: returns [ref, inView] and the class
 * hooks are handled in CSS via `.draw` / `.draw.is-in`.
 */
export function useDraw(options) {
  return useInView({ threshold: 0.25, rootMargin: '0px 0px -15% 0px', ...options })
}

/* ------------------------------------------------------------------ */
/* Scroll progress (for sticky/pinned sections and nav state)          */
/* ------------------------------------------------------------------ */

export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])
  return scrolled
}
