/*
 * Every word that renders on this page lives here.
 *
 * PAGE COPY is verbatim from Prompts/Sunshine Electric Services Inc-prompt.txt.
 * Only connective microcopy (labels, eyebrows, button text, alt text) is
 * authored here, and it follows the prompt's VOICE BRIEF: warm, direct,
 * quietly confident; plain explanation; no franchise language, no
 * manufactured urgency, no electricity puns.
 */

export const business = {
  name: 'Sunshine Electric Services Inc',
  shortName: 'Sunshine Electric',
  city: 'Calgary',
  region: 'Alberta',
  phoneDisplay: '(403) 519-2155',
  phoneHref: 'tel:+14035192155',
  smsHref: 'sms:+14035192155',
  email: 'info@sunshineelectrical.ca',
  emailHref: 'mailto:info@sunshineelectrical.ca',
  address: '39 Hunter Street NW, Calgary, AB T2K 2P8',
  addressParts: {
    street: '39 Hunter Street NW',
    locality: 'Calgary, AB T2K 2P8',
  },
  site: 'https://www.sunshineelectrical.ca/',
  primaryCta: 'Call For A Free Quote',
  availability: 'Line Open 24/7',
}

export const serviceMenu = [
  'Panel Upgrades',
  'EV Charger Installation',
  'Lighting & LED Upgrades',
  'Wiring for Renovations & New Builds',
  'Smoke & CO Detector Installation',
  'Commercial Electrical Services',
  'Electrical Safety Inspections',
  'Hot Tub & Appliance Wiring',
  'Emergency Electrical Repairs',
  'Knob-and-Tube Rewiring',
  'Generator & Backup Power Wiring',
  'Ceiling Fan & Fixture Installation',
  'Surge Protection Installation',
  'Outlet & Switch Repair',
  'Aluminum Wiring Remediation',
]

export const areaMenu = [
  'Calgary',
  'Cochrane',
  'Airdrie',
  'Chestermere',
  'Okotoks',
  'High River',
  'Crossfield',
  'Rocky View County',
]

/* Anchor map is fixed by the prompt:
   Services -> #services / Service Areas -> #coverage / About -> #story
   FAQ -> #faq / Contact -> #contact / Blog -> #footer */
export const nav = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#story' },
  { label: 'Services', href: '#services', menu: serviceMenu, menuHref: '#services' },
  { label: 'Service Areas', href: '#coverage', menu: areaMenu, menuHref: '#coverage' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Blog', href: '#footer' },
  { label: 'Contact', href: '#contact' },
]

export const hero = {
  eyebrow: 'Locally Owned Calgary Electrical Contractor',
  h1: 'Licensed Journeyman Electricians Serving Calgary AB',
  sub: 'Fully licensed and insured electricians delivering code-compliant wiring, panel, and lighting work for homes and businesses across Calgary.',
  badges: [
    { label: 'Licensed & Insured', icon: 'ShieldCheck' },
    { label: '24/7 Emergency Service', icon: 'Clock' },
    { label: '3-Year Workmanship Guarantee', icon: 'BadgeCheck' },
    { label: 'Transparent Pricing', icon: 'Receipt' },
  ],
  secondaryCta: 'See What We Do',
  image: {
    src: '/images/panel-upgrade-hero.webp',
    src800: '/images/panel-upgrade-hero-800.webp',
    alt: 'Gloved hands guiding a screwdriver into a densely wired residential breaker panel',
    w: 1600,
    h: 900,
  },
}

export const widget = {
  eyebrow: 'Photo Diagnosis',
  h2: 'Send A Photo, Get A Straight Answer',
  intro:
    'Snap the panel, the outlet, or whatever is worrying you. A journeyman looks at it and calls you back with what it is and what it costs.',
  dropLabel: 'Add a photo of the problem',
  dropHint: 'Drag it here or browse — JPG, PNG or WebP up to 8 MB',
  browse: 'Browse files',
  replace: 'Replace photo',
  remove: 'Remove photo',
  fields: {
    description: 'What is happening?',
    descriptionHint: 'A sentence is plenty — when it started, what you noticed.',
    descriptionPlaceholder: 'Breaker trips every time the dryer runs.',
    name: 'Your name',
    phone: 'Phone number',
  },
  submit: 'Send Photo & Get My Quote',
  analysing: 'Sending your photo to the on-call journeyman',
  reassurance: 'No cost, no obligation — we don’t share your information.',
  successTitle: 'Thanks — we’ll call you back with next steps.',
  successBody:
    'Your photo is with the on-call journeyman. If it can’t wait, call and someone answers, day or night.',
  successAgain: 'Send another photo',
  errors: {
    type: 'That file type won’t open on our end. Use a JPG, PNG or WebP.',
    size: 'That photo is over 8 MB. Try a smaller version, or call and describe it instead.',
    missingName: 'Add a name so we know who we’re calling back.',
    missingPhone: 'Add a phone number — a callback is how this works.',
    phoneFormat: 'That doesn’t look like a phone number we can call back.',
  },
  demoNote: 'Demo build — nothing is uploaded or stored.',
}

export const reviews = {
  eyebrow: 'Google Reviews',
  h2: 'What Calgary Homeowners Say',
  aggregate: {
    score: 4.9,
    outOf: 5,
    countLabel: '120+ Google reviews',
    headline: '4.9 out of 5 stars, based on 120+ Google reviews',
  },
  placeholderNote:
    'Placeholder content — swap for real Google Business Profile reviews before launch.',
  items: [
    {
      name: 'Derek M.',
      focus: 'Emergency call-out',
      quote:
        'Called about a breaker that kept tripping and had someone out within the hour. Fixed it fast and didn’t try to sell me anything I didn’t need.',
    },
    {
      name: 'Priya S.',
      focus: 'Panel upgrade',
      quote:
        'The panel upgrade got scheduled around my work hours, and the crew left the garage cleaner than they found it.',
    },
    {
      name: 'Wayne T.',
      focus: 'EV charger install',
      quote:
        'Quoted the EV charger install over the phone, and the final bill matched to the dollar.',
    },
    {
      name: 'A. Bergman',
      focus: 'Rental portfolio',
      quote:
        'We use them for our rental units across the northwest. The same electrician shows up every time, which matters more than people think.',
    },
    {
      name: 'Leah K.',
      focus: 'Knob-and-tube wiring',
      quote:
        'Asked a dozen questions about our old knob-and-tube wiring, and the electrician answered every one before touching a tool.',
    },
  ],
}

export const trustBadges = {
  h2: 'Credentials Behind Every Call',
  items: [
    { label: 'Licensed Journeyman Electricians', icon: 'ShieldCheck' },
    { label: 'Fully Insured', icon: 'Umbrella' },
    { label: 'Locally Owned & Operated', icon: 'MapPin' },
    { label: 'Workmanship Guaranteed', icon: 'Award' },
  ],
}

export const whyUs = {
  eyebrow: 'Why Us',
  h2: 'Four Reasons The Call Goes Better',
  items: [
    {
      title: 'Upfront Pricing, No Surprises',
      icon: 'Receipt',
      body: 'You get a real number before we start, not a guess that grows once the panel’s open. What we quote is what shows up on the invoice.',
      image: {
        src: '/images/written-quote.webp',
        src800: '/images/written-quote-800.webp',
        alt: 'A written quote form on a clipboard beside a pen, mug and desk lamp',
        w: 1600,
        h: 1200,
      },
    },
    {
      title: 'Licensed From Start to Finish',
      icon: 'GraduationCap',
      body: 'Every job gets a certified journeyman, not an apprentice learning on your panel. That holds whether it’s a light fixture or a full service upgrade.',
      image: {
        src: '/images/permit-tag.webp',
        src800: '/images/permit-tag-800.webp',
        alt: 'Gloved hands holding an inspection permit clipboard at an exterior meter base',
        w: 1600,
        h: 1200,
      },
    },
    {
      title: 'Emergency Response When It Can’t Wait',
      icon: 'Zap',
      body: 'A dead panel or a sparking outlet doesn’t wait for business hours, so we don’t either. Someone answers the call, day or night.',
      image: {
        src: '/images/voltage-tester.webp',
        src800: '/images/voltage-tester-800.webp',
        alt: 'A hand holding a voltage tester at a wall outlet under a work light',
        w: 1600,
        h: 1200,
      },
    },
    {
      title: 'Built By Calgary, For Calgary',
      icon: 'Home',
      body: 'We grew up here, so the crew that shows up at your door lives in the same neighbourhoods they wire.',
      image: {
        src: '/images/vans-morning.webp',
        src800: '/images/vans-morning-800.webp',
        alt: 'Two white service vans idling on a snowy Calgary residential street in early morning light',
        w: 1600,
        h: 900,
      },
    },
  ],
}

export const services = {
  eyebrow: 'Core Services',
  h2: 'Electrical Work We Take On',
  featured: {
    title: 'Panel Upgrades',
    icon: 'CircuitBoard',
    body: 'Aging fuse boxes and undersized panels get swapped for panels that can carry a modern home’s real electrical load, done to current code.',
    tag: 'Most requested',
    image: {
      src: '/images/conductors-detail.webp',
      src800: '/images/conductors-detail-800.webp',
      alt: 'Close-up of copper busbar conductors terminating into a breaker block inside a panel',
      w: 1600,
      h: 1200,
    },
  },
  items: [
    {
      title: 'EV Charger Installation',
      icon: 'PlugZap',
      body: 'Level 2 charger installs sized to your panel and your vehicle, so a full charge doesn’t mean waiting until morning.',
    },
    {
      title: 'Lighting & LED Upgrades',
      icon: 'Lightbulb',
      body: 'From pot lights to full fixture replacements, we cut the flicker and the power bill that comes with older lighting.',
    },
    {
      title: 'Wiring for Renovations & New Builds',
      icon: 'Hammer',
      body: 'New circuits run clean through walls that are already open, coordinated around your contractor’s timeline instead of working against it.',
    },
    {
      title: 'Smoke & CO Detector Installation',
      icon: 'BellRing',
      body: 'Interconnected alarms placed where code requires them and where they’ll wake you up when it matters.',
    },
    {
      title: 'Commercial Electrical Services',
      icon: 'Building2',
      body: 'Retail units, clinics, and office spaces get the same licensed crew and code-compliant standard as a residential service call.',
    },
  ],
}

export const coverage = {
  eyebrow: 'Coverage',
  h2: 'Where We Work',
  lead: 'We work throughout Calgary and the communities that sit just outside it.',
  zones: [
    {
      name: 'Calgary',
      note: 'every quadrant, from downtown high-rises to acreages on the edge of the city',
    },
    { name: 'Cochrane', note: '' },
    { name: 'Airdrie', note: '' },
    { name: 'The surrounding communities in between', note: '' },
  ],
  closing: 'Not sure if your address is in range? Call and we’ll tell you directly.',
  finder: {
    label: 'Check a community',
    placeholder: 'Start typing a community name',
    hint: 'Type a community to see whether it falls inside the regular run.',
    inRange: 'In range — regular service run.',
    edge: 'On the edge of the run. Call and we’ll confirm the same day.',
    none: 'Not on the list. Call and we’ll tell you directly.',
  },
  /* Diagram only. Ring assignment reflects how the crew actually runs the
     week, not distance on a map. */
  places: [
    { name: 'Calgary', ring: 0, angle: 0, status: 'in' },
    { name: 'Airdrie', ring: 1, angle: -74, status: 'in' },
    { name: 'Cochrane', ring: 1, angle: -152, status: 'in' },
    { name: 'Chestermere', ring: 1, angle: 14, status: 'in' },
    { name: 'Okotoks', ring: 2, angle: 66, status: 'edge' },
    { name: 'Crossfield', ring: 2, angle: -56, status: 'edge' },
    { name: 'High River', ring: 2, angle: 124, status: 'edge' },
    { name: 'Rocky View County', ring: 2, angle: -14, status: 'edge' },
  ],
  address: {
    label: 'Shop & mailing address',
  },
}

export const story = {
  eyebrow: 'Our Story',
  h2: 'Built Here, Not Franchised In',
  pullQuote: 'We’d rather earn the next call than chase it.',
  paragraphs: [
    'We’re a Calgary electrical company built by people who grew up here, not a franchise that picked this city off a map. Every electrician on the crew is a licensed journeyman — never an apprentice learning on your panel, never a subcontractor we met once and never saw again. We work Calgary, Cochrane, and Airdrie seven days a week, because electrical problems don’t wait for a weekday.',
    'Integrity, credibility, transparency, and safety aren’t values we printed on a wall. They’re how a service call runs, start to finish. That means a real explanation of what’s wrong before any tool comes out, a price that doesn’t move once the job starts, and work that meets code the first time, not the second visit.',
    'We took on a full panel replacement for a Calgary medical clinic the same year we rewired someone’s first home purchase, and treated both jobs the same way: a real explanation first, licence and insurance behind every hour on site. In a city this size, word travels fast. We’d rather earn the next call than chase it.',
  ],
  image: {
    src: '/images/about-crew.webp',
    src800: '/images/about-crew-800.webp',
    alt: 'Five electricians standing together in a shop bay in front of two white service vans',
    w: 1600,
    h: 900,
  },
}

export const finalCta = {
  eyebrow: 'Contact',
  h2: 'Get A Straight Answer From A Licensed Calgary Electrician',
  sub: 'Tell us what’s going on and we’ll call back with a real quote, not a guess.',
  textCta: 'Text Us Instead',
  note: 'Seven days a week, with 24/7 response when something can’t wait.',
  image: {
    src: '/images/outage-night.webp',
    src800: '/images/outage-night-800.webp',
    alt: 'A snowy suburban street at night with a single house still lit',
    w: 1600,
    h: 900,
  },
}

export const faq = {
  eyebrow: 'FAQ',
  h2: 'Questions We Get Asked Most',
  groups: [
    {
      title: 'The Crew & The Work',
      items: [
        {
          q: 'Do you send a licensed electrician, or an apprentice?',
          a: 'Every electrician on our crew is a licensed journeyman. We don’t send apprentices out on their own or bring in subcontractors we haven’t worked with before, so the person wiring your panel is the person certified to do it.',
        },
        {
          q: 'Do you work on commercial properties, or only homes?',
          a: 'Both. We handle everything from lighting upgrades in a single-family home to full electrical work in retail units, clinics, and offices, with the same licensed crew and the same guarantee either way.',
        },
        {
          q: 'What’s included in the 3-year workmanship guarantee?',
          a: 'Workmanship on any job we complete is covered for three years. If something we installed fails because of how it was installed, we come back and fix it at no extra cost.',
        },
      ],
    },
    {
      title: 'Hours, Pricing & Coverage',
      items: [
        {
          q: 'Are you available outside of regular business hours?',
          a: 'Yes. We’re available 24/7 for emergency calls, and we run a full schedule seven days a week for Calgary, Cochrane, and Airdrie, so a weekend or an evening doesn’t mean waiting until Monday.',
        },
        {
          q: 'Will I know what the job costs before you start?',
          a: 'You’ll get a real number before any work begins, and that number doesn’t move once we’re on-site. If something changes once a panel’s open, we walk you through it and get your okay first.',
        },
        {
          q: 'What areas do you cover outside Calgary?',
          a: 'We serve Cochrane and Airdrie in addition to all of Calgary, along with the communities in between. If you’re not sure whether your address is in range, call and we’ll tell you directly.',
        },
      ],
    },
  ],
}

export const footer = {
  mission:
    'We’re a licensed, locally owned electrical crew serving Calgary, Cochrane, and Airdrie seven days a week, with 24/7 response when something can’t wait. Homes and businesses get one certified journeyman electrician and one honest price, whether the job is a single outlet or a full panel.',
  columns: [
    {
      title: 'Our Services',
      links: [
        { label: 'Panel Upgrades', href: '#services' },
        { label: 'EV Charger Installation', href: '#services' },
        { label: 'Lighting & LED Upgrades', href: '#services' },
        { label: 'Commercial Electrical Services', href: '#services' },
        { label: 'Emergency Electrical Repairs', href: '#services' },
      ],
    },
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', href: '#top' },
        { label: 'About', href: '#story' },
        { label: 'Services', href: '#services' },
        { label: 'Service Areas', href: '#coverage' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  ],
  contactTitle: 'Get In Touch',
  /* No verifiable Facebook / Instagram / Google Business profile was found for
     this business, so the three social marks point at the real company site
     rather than an invented handle. Noted in README.md. */
  socials: [
    { label: 'Facebook', icon: 'Facebook', href: business.site },
    { label: 'Instagram', icon: 'Instagram', href: business.site },
    { label: 'Google', icon: 'Globe', href: business.site },
  ],
  copyright: 'Sunshine Electric Services Inc. All rights reserved.',
}
