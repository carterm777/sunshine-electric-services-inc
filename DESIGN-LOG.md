# Selection Log — Sunshine Electric Services Inc

Run of the three-phase process from `section-style-repo.md`, constrained by
`_kit/ART-DIRECTION.md` §12. Every choice below names the entry it came from,
one line of rationale, the element inventory / motion budget, and the
reduced-motion fallback.

---

## Step 0 — Page inventory

**Sections, in fixed order:** Header · Hero · Google Reviews · Trust Badges
Banner · Why Us · Services · Coverage · Our Story · Final CTA · FAQ · Footer ·
Sticky mobile call bar.

**Visual ambition:** *mixed, calm and premium.* Glass-depth dominant, editorial
secondary. The page is deliberately cool: charcoal-teal anchors at the hero,
the story and the footer, airy ivory in between, and copper used as the single
warm signal rather than a second colour scheme.

**Tonal rhythm actually built (top to bottom):**

| # | Section | Surface |
|---|---|---|
| 1 | Hero | `--surface-deep` charcoal-teal + graded photograph |
| 2 | Google Reviews | `--surface` ivory |
| 3 | Trust Badges | `--surface-band` mid teal (a spine, not a fourth anchor) |
| 4 | Why Us | `--surface` ivory |
| 5 | Services | `--surface-sunken` tinted ivory |
| 6 | Coverage | `--surface` ivory, with one deep inset panel |
| 7 | Our Story | `--surface-deep` charcoal-teal |
| 8 | Final CTA | `--surface-deepest` near-black + photograph |
| 9 | FAQ | `--surface-sunken` tinted ivory |
| 10 | Footer | `--surface-deepest` near-black |

The trust-badge band is a deliberate addition to the assigned rhythm: reviews,
Why Us, Services and Coverage are four consecutive light sections, and the
banner is the natural place for the page's one mid-tone. It is short and
mid-depth so it reads as a rule rather than an anchor.

**Imagery available per section** (from `_kit/IMAGE-CATALOG.md`; ten photos
shipped, nothing else copied into `public/`):

- Hero — `panel-upgrade-hero`
- Reviews — none (deliberate: the glass cards and the aggregate are the visual)
- Trust badges — `conduit-pattern` as texture only
- Why Us — `written-quote`, `permit-tag`, `voltage-tester`, `vans-morning`
- Services — `panel-new` (spotlight only; the five secondary cards are icon-led)
- Coverage — `panorama-hills-hero` under the hand-drawn diagram
- Story — `about-crew`
- Final CTA — `outage-night`

**Page-level motion budget.** One `WordReveal` (hero H1). One `useCursorGlow`
(the photo-diagnosis widget — the page's only dark-glass surface). Two
`useParallax` layers (hero backdrop, CTA backdrop), both flat below 1080/900px
and under reduced motion. One `useDraw` (coverage run lines). One `useScrub`
was considered for the story and rejected — the sticky column already carries
that section.

---

## 1. Header / Navigation

- **Layout — Mega Menu Dropdown Nav.** Fifteen services and eight service areas
  is real depth; *Standard Horizontal Nav Bar* would have had to truncate the
  list, and *Sticky Minimal with Hidden Menu* is ruled out by the prompt's
  no-hamburger rule. Centred link set with the CTA held to the right.
- **Visual style — Glass Frosted Nav Bar** (assigned). Tuned per its premium
  note: the bar blurs what is behind it, its own links stay crisp. Opacity
  steps up on scroll rather than switching material.
- **Animation — Underline Grow on Hover** + *Nav Background Fade-In on Scroll*.
  The subheader collapses on scroll (desktop) and the mobile strip collapses to
  click-to-call only, which is the prompt's explicit mobile behaviour.
- **Element inventory:** no entrance sequence — the header is present on load.
  Resting states: link underline sweep (240ms ease-out-quart), CTA lift, chevron
  rotation, sub-item colour. Dropdown opens on hover *and* focus, closes on
  Escape and on outside pointer-down, and is `hidden` when closed so its links
  are never focus traps.
- **Reduced motion:** collapse/underline transitions are neutralised by the
  global `prefers-reduced-motion` block in `base.css`.
- **Mobile strip:** seven items in a horizontally scrollable row with a fade
  affordance on the right edge, so a clipped last item reads as scrollable.

## 2. Hero

- **Layout — Asymmetric Layered Hero** (assigned). Copy column left, the
  photo-diagnosis widget as a full right-hand rail. *Split-Screen* would have
  given the photo equal weight it does not need here, and the mandated hero
  contents (eyebrow, H1, sub, four badges, two CTAs, widget) do not fit a
  centred or full-bleed treatment above a 390×844 fold.
- **Visual style — Layered Glass Panel** (assigned), executed as *Layered Depth
  Composition* from the richness file: graded photograph bleeding in from the
  right → teal veil → hairline plan grid masked diagonally → glass panel.
- **Animation — Staggered Load-In** with *Weighted Word Reveal* on the H1 and
  *Layered Parallax Drift* (0.12) on the backdrop. *Cursor-Reactive Parallax
  Layers* was rejected: the hero carries heavy text and a live form, and its
  own **Avoid when** flags exactly that.
- **Element inventory / motion budget — 6 groups (budget 6):**
  1. eyebrow — `rise-sm`, 0ms
  2. H1 — `WordReveal`, 140ms, 68ms per word (10 words, inside the entry's limit)
  3. subheadline — `rise-sm`, 620ms
  4. badge strip — `rise-sm` as **one** group, 760ms (four chips read as one unit)
  5. CTA pair — `rise-sm`, 880ms
  6. 24/7 signal + region line — `fade`, 1000ms
  Trigger: load (`threshold: 0.01`, `rootMargin: 0px` — the hero is on screen
  at load, so the standard scroll timing does not apply).
- **Resting states:** badge chips warm their border on hover; both buttons lift
  2px with a shadow bloom; the 24/7 dot carries a 4.5s ring.
- **Reduced motion:** `Reveal`/`WordReveal` render final-state instantly;
  `useParallax` returns a static layer; the pulse ring is static.
- **Mandated hero rules:** the eyebrow's top edge and the widget's top edge share
  the same Y (`--hero-pad-t` drives both). The copy column is capped at 40rem so
  the H1 wraps to three lines at 1440 and three at 390.

## 3. Photo Diagnosis (the signature)

- **Layout — Quote or Estimate Request Form** (forms) inside the hero rail.
  *Multi-Step* was rejected — three inputs plus a file is not eight fields.
- **Visual style — Glass Panel Widget with Depth** (interactive) in the dark
  recipe. It is the only dark-glass object on the page, which is what lets it
  stay legible when it travels onto the ivory reviews section.
- **Animation — the signature moment.** A genuine sticky travel: the widget's
  rail is absolutely positioned against `.lede-wrap` (hero + reviews) and the
  panel inside it is `position: sticky`. It therefore travels the whole hero and
  the whole reviews section and **releases at the bottom of the reviews** — the
  containing block guarantees it can never reach the trust-badge banner. No
  scroll maths, no `window.scrollTo`, nothing to desynchronise. Guarded to
  `min-width: 1081px`; below that the rail returns to normal flow directly
  under the hero copy, on the same dark backdrop.
- Plus *Cursor-Reactive Glow* (the page's one use, dark surface only),
  *Field Focus Highlight*, *Inline Validation Feedback*, and *Success State
  Confirmation Animation* (a drawn ring then a drawn tick — not a green check).
- **Real instrument details:** drag-and-drop with a live hover state, genuine
  local preview via `URL.createObjectURL` revoked on unmount and on replace,
  MIME and 8 MB validation with real error copy, a labelled "sending" beat with
  a scan bar, `aria-live="polite"` status region, real `<label>` for every
  control, full keyboard operation, and a compact mobile entry state that
  expands on interaction (or automatically if submit is pressed with a field
  still empty).
- **Reduced motion:** glow off, scan bar and success draws static, the fake
  send collapses from 1500ms to 250ms.

## 4. Google Reviews

- **Layout — Testimonial Card Grid** (assigned). Five short quotes of even
  length is exactly its content shape; *Testimonial Carousel* would hide four
  fifths of the proof behind an interaction the section does not need.
- **Visual style — Glass Panel Quote Card** (assigned), light recipe, over the
  ivory surface. Aggregate callout gets its own wider glass panel above the grid.
- **Animation — Staggered Rise** on the cards, *Star Rating Fill* sweep,
  *Counting Numerals* on the 4.9, *Magnetic Lift* on card hover.
- **Element inventory — 4 groups (budget 4):** eyebrow+H2 → aggregate panel →
  card row 1 → card rows 2/3, 110ms apart, threshold 0.18 / rootMargin -12%
  (motion.jsx defaults). Stars sweep at 55ms each, 120ms after their card.
- **Placeholder labelling:** an `Info`-marked line inside the aggregate panel,
  set in the quietest ink on the page. Honest, not a garish banner.
- **Note:** the grid is intentionally narrow on desktop — it shares the row with
  the travelling widget, and `padding-right` reserves that column so the two can
  never overlap.

## 5. Trust Badges Banner

- **Layout — Certification Badge Wall** (assigned). Exactly four marks, all
  traceable to the source site; nothing invented, no BBB or association claim.
- **Visual style — Glass Badge Cluster** (assigned), on the mid-teal band with
  `conduit-pattern` at 16%. Per its premium note the blur stays light enough
  that the labels are crisp; per the layout's note all four boxes share one
  min-height, one padding, one 2.5rem icon chip, one 22px icon at 1.5 stroke.
- **Animation — Badge Cluster Staggered Pop-In**, `scale` variant, 95ms apart,
  ordered by credential weight (licensing → insurance → local → guarantee).
- **Element inventory — 2 groups:** section H2, then the four badges as one
  staggered cluster. Hover lifts 3px and warms the border.

## 6. Why Us

- **Layout — Alternating Benefit List** (assigned). Its **Avoid when** is "no
  supporting imagery per point" — four genuinely distinct photographs exist, one
  per reason, so the entry holds. This is also what keeps the page off the
  three-column icon-card default the brief warns about.
- **Visual style — Soft Card Elevation** (assigned) on the photo plates, with
  *Framed or Bordered Photo Insert* for the inner hairline.
- **Animation — Sequential Reveal on Scroll**, using the directional `left` /
  `right` variants so each row enters from the side its image sits on.
- **Element inventory — 2 groups per row (budget 8 across four rows):** photo
  plate (directional, 700ms) → text block (icon + title + rule + copy as one
  unit, 130ms later). Reading order is left-to-right per row.
- **Resting state:** the photograph scales 1.028 over 900ms on row hover.
- **No numbered markers** — four reasons are not a sequence.

## 7. Services

- **Layout — Featured Service Spotlight with Secondary List** (assigned). Panel
  Upgrades is the flagship on the source site, so the hierarchy is real;
  *Service Card Grid* would flatten it, and six services is under the eight-plus
  threshold that would justify a tabbed panel.
- **Visual style — Glass Panel Service Card** (assigned) for the five secondary
  cards, plus *Overlapping or Bleeding Image* — the spotlight panel overlaps the
  photograph rather than sitting beside it, so the hierarchy is structural.
- **Animation — Staggered Grid Fade-In on Scroll** + *Card Hover Reveal* (an
  arrow mark that fades in from below-left on hover).
- **Element inventory — 3 + 5 groups:** H2 → spotlight photo (`settle`) →
  spotlight panel (`rise`, 120ms later); then the five cards as one staggered
  group at 100ms, in reading order.

## 8. Coverage

- **Layout — Interactive Location Finder** (assigned). Real interaction: typing
  a community name resolves it live against the coverage list and reports in
  range / on the edge / not listed.
- **Visual style — Glass Overlay Address Card on Map** (assigned), on a
  **hand-built** schematic. Per the every-site rule there is no embed, no tile
  service and no API key, and the graphic is explicitly captioned as a diagram
  encoding run frequency rather than distance, so it cannot misrepresent
  geography. Built as *Layered Depth Composition*: photograph at 22% → teal veil
  → drawn rings and nodes → glass address card.
- **Animation — Location Search Live Filter** + *Sequential Line Draw* on the
  run lines (`useDraw`, threshold 0.25 / rootMargin -15%, 90ms apart).
- **Element inventory — 6 groups:** eyebrow → H2 → lead → zone index → finder →
  closing line, with the panel entering on `settle` alongside.
- **Copy:** the four coverage lines and the closing question ship verbatim.

## 9. Our Story

- **Layout — Split Story with Sticky Photo or Quote** (assigned). The three
  paragraphs give the sticky column enough scroll distance to justify the pin.
- **Visual style — deviation, logged.** The assignment was *Glass Timeline
  Markers*, but the every-site rule is that timeline treatments need real dates
  and this story copy contains none. Substituted *Editorial Pull-Quote
  Typography* — its own **Avoid when** ("no line strong enough to stand alone")
  does not apply; "We'd rather earn the next call than chase it" carries it. The
  section's glass is kept in the quote plate, which overlaps the photograph, so
  the family assignment still holds. Set in italic Fraunces at high `opsz` and
  `SOFT` 60 — a genuinely different voice from the body, per the entry's note.
- **Animation — Story Section Sticky Scroll Progress**: the photo and quote
  enter once and hold; only the prose continues to sequence.
- **Element inventory — 5 groups:** photo (`settle`) → quote plate (`rise`) →
  eyebrow → H2 (`clip`) → three paragraphs at 140ms.
- **Typography:** a raised cap on the opening paragraph in amber, so the section
  reads as an essay rather than three equal blocks.
- Story copy ships verbatim as prose; the pull-quote is lifted from paragraph
  three and left in place there, as an actual magazine would.

## 10. Final CTA

- **Layout — Full-Width CTA Banner** (assigned). *Urgent or Emergency CTA
  Banner* was the obvious alternative and was rejected on the art-direction
  risk: urgency here is carried by steadiness, not alarm.
- **Visual style — Dark Cinematic CTA Background** (assigned) over
  `outage-night`, with a three-stop veil so the type sits on near-solid black
  while the lit house stays readable on the right.
- **Animation — Banner Background Slow Pan** as a 0.1 parallax layer, with a
  standard grouped entrance on top.
- **Element inventory — 5 groups:** eyebrow → H2 → sub → button pair →
  24/7 signal + note, 130ms apart.
- Click-to-call and click-to-text both present, per the prompt.

## 11. FAQ

- **Layout — Two-Column Category Split** (assigned). The six questions sort
  cleanly into "The Crew & The Work" and "Hours, Pricing & Coverage" — three
  each, which is the entry's stated content shape.
- **Visual style — Glass Panel Accordion** (assigned), on the tinted sunken
  surface so the panes have something to sit against.
- **Animation — Accordion Expand and Collapse with Height Transition** (via
  `grid-template-rows: 0fr → 1fr`, so no JS measurement), *Icon Rotate on
  Expand* (plus rotates 135° into a cross), *Active Question Highlight Glow*
  (the open pane gains the copper hairline and a deeper shadow), and *Staggered
  Fade-In on Scroll* for the initial entrance.
- **Element inventory — 2 columns × (heading + 3 rows):** column label first,
  then question rows top to bottom at 90ms.
- **Accessibility:** real `<button>` triggers inside `<h3>`, `aria-expanded`,
  `aria-controls`, and a labelled region per answer. First question opens by
  default so the section never reads as an empty list of bars.

## 12. Footer

- **Layout — Mega Footer** (four columns, per the prompt's fixed structure).
- **Visual style — Glass Divider Footer** (assigned): a frosted gradient strip
  over a copper hairline separates the FAQ from the footer instead of a hard rule.
- **Animation — Link Column Staggered Fade-In on Scroll** (110ms per column) +
  *Underline Sweep* on every link and a lift on the social marks.
- **Social links:** no verifiable Facebook / Instagram / Google Business profile
  was found, so all three marks point at the real company site rather than an
  invented handle. Flagged in `README.md`.

## 13. Sticky mobile call bar

- **Layout — Sticky or Floating CTA Bar**, **visual style — Glass Panel Sticky
  Bar**, **animation — Sticky Bar Slide-In on Scroll Threshold** (560px).
- Held back until the visitor is past the hero so it never consumes part of the
  390×844 above-the-fold budget the hero has to hit.

---

## Finishing pass 1 — elevation sweep

| Section | Change |
|---|---|
| Hero | Added the hairline plan grid as a third background layer and the diagonal mask, so the composition is genuinely three-deep rather than photo-plus-scrim. |
| Photo Diagnosis | Replaced a plain confirmation with a drawn ring-then-tick sequence and a real callback line; added the scan bar to the sending beat. |
| Reviews | Added *Counting Numerals* on the aggregate and the star fill sweep — the panel was static in the first pass. |
| Trust badges | Added the `conduit-pattern` texture; the band was a flat colour and read as the least considered thing on the page. |
| Why Us | Added the directional entrance variants — the first pass used a single `rise` on every row, which flattened the alternation the layout exists for. |
| Services | Pushed the spotlight panel into a negative margin over the photograph (*Overlapping or Bleeding Image*) instead of sitting beside it. |
| Coverage | Added *Sequential Line Draw* on the run lines; the diagram was static. |
| Story | Added the raised cap and moved the quote plate to overlap the photograph. |
| Final CTA | Left as-is — already at the intended ambition, and the section's job is to be the page's quietest, heaviest moment. |
| FAQ | Added the open-state highlight; the accordion was correct but inert. |

## Finishing pass 2 — coherence sweep

- **Walked back:** an ambient drift behind the hero backdrop. The hero already
  carries parallax, a word reveal and a live form — stacking idle background
  motion on active foreground motion is exactly the overload this pass exists to
  catch. The drift is gone; the parallax stays.
- **Walked back:** a second `useCursorGlow` on the final CTA. One or two per page
  is the entry's own limit, and putting a second one anywhere dilutes the widget,
  which is the whole point of the page.
- **Checked for family repetition:** glass appears in six sections, which is the
  assigned dominant family — but in four distinct recipes (dark instrument, light
  quote card, badge cluster on a mid band, accordion pane). Why Us and Coverage
  carry no glass at all, which is what keeps it from reading as one repeated
  card style.
- **Checked hover coverage:** every interactive element on the page has a
  resting-state behaviour — nav links, dropdown items, badges, review cards,
  service cards, FAQ triggers, footer links, social marks, both button styles,
  and every form control.
- **Checked motion load:** eleven scroll-triggered sections, all at the
  motion.jsx defaults (threshold 0.18 / rootMargin -12%), none faster than 90ms
  or slower than 140ms between siblings, all entrances 500–850ms, all ease-out
  cubic or quart. No bounce, no elastic, nothing under 400ms.

---

## Screenshot critique — what the captures actually caught

Everything below was found by reading the rendered PNGs back and measuring the
live DOM, not by inspecting the source.

1. **The reviews grid was flush against the widget.** `.shell` is
   `box-sizing: border-box`, so replacing its gutter with
   `calc(rail-w + rail-gap)` left the cards 2px from the travelling panel
   instead of a column apart. Fixed by adding the gutter back into the
   calculation — measured 45px of clearance afterwards.
2. **The nav bar read as washed grey, not dark.** At the top of the page the
   frosted bar is sitting over the ivory body, not over content, so 0.72 alpha
   turned muddy. Raised to 0.90 at rest and 0.95 once stuck; the frost still
   does its job on everything that scrolls under it.
3. **The alternating photographs changed width row to row.** The `order` swap
   moved the media into the wider grid track on even rows, so rows 2 and 4 had
   visibly larger images than 1 and 3. Fixed by mirroring the track sizes as
   well as the order. Also went 4:3 → 3:2 to tighten the section's rhythm.
4. **The services grid left a hole.** Five secondary cards in three columns
   gives 3 + 2 and an empty cell. Rebuilt on a six-column grid so the rows fill
   as 2+2+2 then 3+3.
5. **The Panel Upgrades spotlight photo was a grey box on a wall.** Swapped
   `panel-new` for `conductors-detail` — copper busbar terminating into a
   breaker block. Same subject, and the copper is the page's accent colour.
6. **The mobile eyebrow wrapped under its own rule** and read as a stray
   indent. Below 900px the rule is dropped and the eyebrow is set tighter so it
   holds one flush-left line.
7. **The coverage address card went grey.** A 0.66-alpha light glass over a
   near-black panel is a milky slab, not glass. Added
   `--glass-light-strong` (0.93) for panes that sit on dark surfaces. Also
   separated the Okotoks / High River node labels, which were colliding.
8. **The widget's fold at 1024×900.** The compact entry state was gated at
   900px, so at tablet widths the full form stacked under the hero copy and the
   CTA fell below the fold. The compact *behaviour* now starts at 1080px, with
   a separate 901–1080px block that shortens the drop zone; the phone-specific
   sizing stays at 900px.
9. **Colour literals had leaked out of `tokens.css`** — 31 of them, mostly
   veil gradients and glass fills. All are now named role tokens (`--nav-fill`,
   `--veil-hero`, `--field-fill`, `--frame-vignette`, …). The page's five
   photographic veils being defined in one place is also why the sections stay
   tonally identical to each other.
10. **The sticky travel ignored reduced motion.** The rail now goes static
    under `prefers-reduced-motion`, so the widget rides the page normally.

Verified after the fixes: no horizontal overflow at 390 / 768 / 1024 / 1280 /
1440 / 1920; zero console errors; one `<h1>`; heading order
H1→H2→H3 with no skipped level; every `<img>` has real alt text; zero
`href="#"` and every in-page anchor resolves to a real element; the widget's
full flow (bad file type → valid file → preview → validation → sending →
drawn confirmation → reset) works; the nav dropdown opens on focus and closes
on Escape; the coverage finder returns in-range / edge / not-listed correctly.
