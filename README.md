# Sunshine Electric Services Inc — demo site

A one-page redesign concept for **Sunshine Electric Services Inc**, a licensed
residential and commercial electrical contractor in Calgary, Alberta serving
Calgary, Cochrane and Airdrie.

**This is an unsolicited demo.** It is not affiliated with, commissioned by, or
approved by the business. Every page carries
`<meta name="robots" content="noindex, nofollow">` and `public/robots.txt`
disallows all crawlers.

---

## Stack

- Vite 6 + React 18
- `lucide-react` for every icon (no icon fonts, no emoji)
- Fraunces (display, variable `opsz` / `SOFT` / `WONK` axes) and IBM Plex Sans
  (body), loaded from Google Fonts with `display=swap`
- No CSS framework. The whole design system lives in `src/styles/tokens.css`;
  there is **no colour literal anywhere outside that file**.
- No backend, no analytics, no third-party embeds, no map service

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # -> dist/
npm run preview    # serve the production build
```

## Structure

```
src/
  data/site.js            all page copy, nav, services, reviews, FAQ
  lib/motion.jsx          shared motion primitives (provided)
  styles/
    tokens.css            the entire token system — the only file with colours
    base.css              reset, a11y floor, motion variants (provided)
    app.css               page scaffolding + shared patterns
  components/             one .jsx + one .css per section
public/
  images/                 only the ten photographs this page actually renders
  favicon.svg             the brand mark
DESIGN-LOG.md             the layout / visual-style / animation selection log
```

## The signature element

The photo-diagnosis widget is a genuinely sticky instrument on desktop. Its
rail is absolutely positioned against the wrapper that holds the hero **and**
the Google Reviews section, and the panel inside it is `position: sticky` — so
it travels with the visitor through both sections and then releases cleanly at
the end of the reviews. Because the containing block ends there, it can never
overlap the trust-badge banner that follows. It is disabled below 1081px (where
it returns to normal flow directly under the hero copy) and under
`prefers-reduced-motion`.

The widget itself does real work client-side: drag-and-drop with a live hover
state, a genuine local preview via `URL.createObjectURL` (revoked on unmount and
on replace), file-type and 8 MB size validation with real error copy, a labelled
sending beat, an `aria-live` status region, and a drawn confirmation state.
Nothing is uploaded or stored — there is no backend.

## Things to know before this goes anywhere real

- **The five Google reviews are fabricated placeholder content.** They are
  labelled as such inside the aggregate-rating panel. Replace them, and the
  "4.9 out of 5 based on 120+ Google reviews" figure, with real Google Business
  Profile data before launch.
- **The social icons do not point at social profiles.** No verifiable Facebook,
  Instagram or Google Business profile was found for this business, so all three
  marks link to the company's real website (`sunshineelectrical.ca`) rather than
  an invented handle. Point them at the real profiles or remove them.
- **The coverage graphic is a diagram, not a map.** It is drawn by hand in SVG,
  it is captioned as not-to-scale, and its rings encode how often the crew is
  through an area rather than distance. It deliberately does not represent real
  geography, and there is no map embed anywhere on the page.
- **No credential is invented.** The four trust badges (licensed journeymen,
  fully insured, locally owned, workmanship guaranteed) all trace to claims made
  on the business's own live site. No BBB rating, association membership or award
  is claimed, because none appears there.
- **Every form is non-functional by design.** Each has a convincing client-side
  success state and reassurance microcopy, and none posts anywhere.
- The phone number, email and address are the real ones published on
  `sunshineelectrical.ca`.

## Accessibility and quality floor

- One `<h1>`, one `<h2>` per section, `<h3>` for sub-items, no skipped levels
- Real `<section>` elements with `aria-labelledby`, one `<main>`, a skip link
- Nav dropdowns open on hover *and* focus, close on Escape and outside click,
  and are `hidden` when closed so their links are never focus traps
- FAQ is real `<button>` triggers with `aria-expanded` / `aria-controls`
- Visible, on-brand focus rings everywhere; no `outline: none` without a
  replacement
- `prefers-reduced-motion` respected throughout, including the sticky travel
- No horizontal scroll at 390, 768, 1024, 1280, 1440 or 1920
- No console errors or React warnings
