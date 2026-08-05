/**
 * ALL SITE COPY LIVES HERE.
 *
 * Edit this file to change any text on the site. You should never need to open
 * a component to change wording, links, tags, dates, or metrics.
 *
 * `icon` values map to icons in components/icons.tsx. If you want a different
 * icon, add it to that map first, then use its key here.
 *
 * Kept deliberately in sync with public/Robert_Wade_Resume.pdf. When the resume
 * changes, change this too, otherwise the page and the download disagree.
 */

export type WorkItem = {
  name: string;
  description: string;
  tags: string[];
  /** Optional. Omit or set to null to render the row without a link. */
  href?: string | null;
  /**
   * Optional brand marks shown alongside the row. Only for design work, where
   * the artwork is the evidence and a sentence claiming it is not.
   */
  marks?: { src: string; alt: string; width: number; height: number }[];
};

/**
 * One achievement.
 *
 * `id` is referenced by per-application resume tailoring in applications/, so
 * it must stay stable when the wording changes and must never be reused. The
 * site renders `text` and ignores everything else.
 */
export type Bullet = {
  id: string;
  text: string;
  /**
   * Substrings of `text` to set bold on the designed resume. Each must occur
   * exactly once in `text` or the resume build fails, which is what makes a
   * reworded bullet a loud error instead of a stray bold run.
   */
  emphasis?: string[];
};

export type Group = {
  id: string;
  /** Empty string renders the bullets with no heading. */
  label: string;
  bullets: Bullet[];
};

export type Role = {
  id: string;
  company: string;
  title: string;
  /** Free text. Shown exactly as written. Kept in step with LinkedIn. */
  dates: string;
  location?: string;
  /** One paragraph framing the role. Optional. */
  summary?: string;
  groups?: Group[];
};

export const content = {
  /** Site-wide SEO + OpenGraph. */
  site: {
    /** Canonical production URL. Used for OG tags and the sitemap. */
    url: 'https://bobwa.de',
    title: 'Bob Wade, Senior Engineering Manager',
    description:
      'Engineering leader who makes platforms dependable and rebuilds the organizations that own them. Platform reliability, partner integrations, and delivery, at $100B+ commerce scale.',
    locale: 'en_US',
    /**
     * Social share card, 1200x630, committed at public/og.png.
     * TODO: swap public/og.png for a designed card when you have one. Same
     * filename, same dimensions, and nothing else needs to change.
     */
    ogImage: '/og.png',
    /**
     * GA4 measurement ID. Public by design, it ends up in the page source.
     * Set to null to remove Google Analytics entirely; Vercel Web Analytics is
     * independent of this and keeps running either way.
     */
    gaMeasurementId: 'G-5VGLSB2VFN' as string | null,
  },

  /**
   * Cookie consent. Only shown when Google Analytics is enabled, because the
   * Vercel analytics is cookieless and needs no permission.
   */
  consent: {
    message:
      'This site uses Google Analytics, which sets cookies. Visitor counts are also collected without cookies either way.',
    accept: 'Allow analytics',
    decline: 'No thanks',
    ariaLabel: 'Cookie consent',
  },

  nav: {
    /** The wordmark in the sticky top nav. */
    brand: 'Bob Wade',
    links: [
      { label: 'About', href: '#about' },
      { label: 'What I do', href: '#what-i-do' },
      { label: 'Experience', href: '#experience' },
      { label: 'Work', href: '#work' },
      { label: 'Contact', href: '#contact' },
    ],
  },

  hero: {
    name: 'Bob Wade',
    title: 'Engineering leadership: platform reliability, partner integrations, delivery',
    /** Two or three sentences. Keep it tight. This is the whole pitch. */
    blurb:
      'I make platforms dependable, and the teams around them capable of keeping them that way without me. Two engineering functions, thirteen engineers, and the routing, attribution and order pipeline that $100B+ in commerce moves through.',
    /**
     * Shown under the hero CTAs and fed into the structured data. Naming the
     * metro as well as the town is deliberate: recruiters search "Nashville",
     * not "Spring Hill".
     */
    location: 'Spring Hill, TN (Greater Nashville)',
    /** Used for schema.org PostalAddress. Keep in sync with `location`. */
    address: { locality: 'Spring Hill', region: 'TN', country: 'US' },
    /**
     * Portrait shown next to the hero text. Set `src` to null to hide it
     * entirely; the hero then renders text only and never shows a broken image.
     *
     * public/bob-wade.jpg is the LinkedIn headshot, regraded for the web:
     * shadow floor lifted off pure black, slightly warmed and desaturated, and
     * extended to 4:5 with headroom above. Replace the file to swap the photo.
     */
    portrait: {
      src: '/bob-wade.jpg' as string | null,
      alt: 'Bob Wade',
    },
    primaryCta: { label: 'Download Résumé', href: '/Robert_Wade_Resume.pdf' },
    secondaryCta: { label: 'Email me', href: 'mailto:bob@bobwa.de' },
    social: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bwade231/', icon: 'linkedin' },
      { label: 'GitHub', href: 'https://github.com/bwade', icon: 'github' },
    ],
  },

  /** Four metric cards. `value` is the big number, `label` the caption. */
  impact: [
    { value: '$100B+', label: 'commerce moved' },
    { value: '99.99%', label: 'uptime, sustained' },
    { value: '130M+', label: 'Amazon clicks a month' },
    { value: '13 / 2', label: 'engineers, functions owned' },
  ],

  /**
   * The scroll panel. Each entry is one thing that changed under his
   * ownership: the state on arrival, then the state after. Deliberately
   * outcomes rather than adjectives.
   */
  changes: {
    label: 'What changes',
    items: [
      {
        area: 'On-call',
        before:
          'A rotation that worked, but had never been tested at the scale the platform was heading for.',
        after:
          '99.99% sustained and MTTR down, with the platform held through its biggest traffic days of the year and nobody pulling an all-nighter to do it.',
      },
      {
        area: 'Partner support',
        before:
          'Fully ad hoc. Slack DMs and email, no routing, no ownership, and no answer to how long anything should take.',
        after:
          'A structured function with Salesforce to Zendesk to Jira as the spine. Tiered SLAs, P0 acknowledged inside fifteen minutes, and a team that owns it.',
      },
      {
        area: 'Delivery',
        before:
          'Core engineering interrupted constantly, and no gate between what the business wanted and what was actually possible.',
        after:
          'Interrupts routed away from core engineering, two week sprints run end to end, and a feasibility gate between revenue, product, and engineering on what actually gets built.',
      },
    ],
  },

  about: {
    heading: 'About',
    /** One short paragraph. */
    body: 'Nineteen years in engineering, the last ten in management. I came up through code and design before moving into leadership, and I run orgs the way I would want mine run: clear ownership, real escalation paths, and nobody having to be a hero to keep the lights on. What I deliver is a platform people can trust and a team that can keep it that way without me. I have done it at consumer scale and again for my own companies where I stood the whole business up end to end. I am most useful somewhere the platform matters commercially and the organization around it needs rebuilding at the same time.',
  },

  whatIDo: {
    heading: 'What I do',
    items: [
      {
        title: 'Keep the platform up',
        description:
          'The routing and order pipeline behind $100B+ in commerce, at 99.99% uptime. The part that matters is how: not me on call, but a team that holds it without me.',
        icon: 'activity',
      },
      {
        title: 'Stop the firefighting',
        description:
          'I take over orgs running on heroics and leave them running on process. Clear ownership, an escalation path people actually use, and engineers who get their week back instead of losing it to interrupts.',
        icon: 'compass',
      },
      {
        title: 'Run the delivery cadence',
        description:
          'Two week sprints across multiple squads, and I run every ceremony myself: planning, standups, grooming, retros. Plus a straight answer for the business on what is possible before anything gets promised, so the roadmap survives contact with reality.',
        icon: 'plug',
      },
      {
        title: 'Ship with AI, for real',
        description:
          'Not a pilot and not a slide. Around 45% of the code my org ships is AI written, reviewed by engineers, with the tooling scoped tightly enough that it cannot invent its way into production.',
        icon: 'sparkles',
      },
    ],
  },

  experience: {
    heading: 'Experience',
    roles: [
      {
        id: 'button',
        company: 'Button, Inc.',
        title: 'Senior Engineering Manager, Core Engineering & Solutions Engineering',
        dates: 'Oct 2021 - Present',
        location: 'Remote (NYC)',
        summary:
          "Own two engineering functions and 13 direct reports: Core Engineering (routing, attribution, data, infrastructure) and Solutions Engineering (partner delivery and technical escalation), covering the platform behind $100B+ in driven mobile commerce and routing 130M+ Amazon creator clicks a month across 200+ brands including Amazon, Walmart, Uber, Lyft, Fetch, Target, and Sam's Club. I own both the platform and the partner handoff that most orgs split and drop.",
        groups: [
          {
            id: 'reliability',
            label: 'Reliability and high-traffic events',
            bullets: [
              {
                id: 'rtb-mandate',
                text: 'My team owns the core infrastructure that makes Button run: the routing, decisioning, attribution, and order pipeline every partner and dollar flows through. I hold the RTB/KTLO mandate for it, covering reliability, tech debt, and operational load for systems moving $100B+ in commerce.',
                emphasis: ['core infrastructure that makes Button run', 'RTB/KTLO mandate'],
              },
              {
                id: 'prime-day',
                text: "Lead Amazon Prime Day readiness year over year, Button's largest revenue event: traffic modeling, load testing, and Go/No-Go across the core services. Planned and load-tested the jump from an 80 RPS baseline to a 1,200 RPS peak, with no downtime across the event window.",
                emphasis: ['Amazon Prime Day readiness', 'an 80 RPS baseline to a 1,200 RPS peak'],
              },
              {
                id: 'super-bowl',
                text: 'Own on-call and incident response for the core platform, sustaining 99.99% uptime and cutting MTTR across severity, escalation, and blameless postmortems.',
                emphasis: ['sustaining 99.99% uptime'],
              },
              {
                id: 'interrupts',
                text: 'Cut core engineering interrupts by standing up a Support to Data to Core escalation flow: first-level triage in Zendesk, the data team absorbing impact analysis, and self-serve tooling for the most common partner questions. Reactive firefighting became protected delivery capacity.',
                emphasis: ['Cut core engineering interrupts'],
              },
            ],
          },
          {
            id: 'scale',
            label: 'Scale, platform modernization, and AI-augmented operations',
            bullets: [
              {
                id: 'order-pipeline',
                text: "Own Button's order pipeline, the platform's revenue path at 600K+ orders a day. Drove autoscaling, Aurora migrations, and modernization of the partnership configuration service, and led the release-confidence program (staging parity plus end-to-end testing) behind it. Backed the right-sizing that took the link-generation service from 400 instances to 15 and the click-redirect service from 400 to 130, cutting CPU per task from 80% to 25% and peak-event scaling cost from roughly $20K a month to about $7.5K.",
                emphasis: [
                  "order pipeline, the platform's revenue path",
                  'Aurora migrations',
                  'release-confidence program',
                ],
              },
              {
                id: 'ai-delivery',
                text: 'Championed AI-augmented delivery. Org-wide, Claude-attributed code reached about 45% of lines shipped.',
                emphasis: ['about 45% of lines shipped'],
              },
              {
                id: 'llm-tooling',
                text: "Sponsored internal read-only LLM tooling, a Sam's Club order debugger and a CSV validator, that cut manual triage load. Built with tightly scoped tools to prevent hallucination.",
                emphasis: ['read-only LLM tooling'],
              },
            ],
          },
          {
            id: 'support',
            label: 'Support engineering and service design',
            bullets: [
              {
                id: 'support-function',
                text: 'There was no partner-support function at Button before me. I made the case to leadership, secured the budget and tooling, and led the engineer who built it, taking support from 100% ad hoc (Slack DMs and email, no ownership or routing) to a structured, SLA-backed operation.',
                emphasis: ['no partner-support function at Button before me', '100% ad hoc'],
              },
              {
                id: 'zendesk-model',
                text: 'Set the direction for the Salesforce to Zendesk to Jira model and steered the engineer who designed it, with Zendesk as the source of truth for routing, prioritization, and SLAs. Formed the Support Engineering team that owns it.',
                emphasis: ['Salesforce to Zendesk to Jira', 'Formed the Support Engineering team'],
              },
              {
                id: 'tiered-slas',
                text: "Defined tiered SLAs and the incident priority matrix across strategic partners (Uber, Amazon, Best Buy, Sam's Club, Fetch): P0 acknowledged in under 15 minutes, 30-minute response for Tier 1, plus the escalation decision tree routing work across Solutions Engineering, Data, and on-call.",
                emphasis: ['tiered SLAs', 'P0 acknowledged in under 15 minutes'],
              },
            ],
          },
          {
            id: 'partners',
            label: 'Partner integrations, product, and revenue',
            bullets: [
              {
                id: 'integrations',
                text: "Solutions Engineering landed and scaled integrations across a who's-who of commerce, travel, and marketplace: Amazon, Walmart, Best Buy, Target, Sam's Club, Nike, Lululemon, Puma, Samsung, Expedia, Marriott, Uber One, Lyft, Disney+, and StubHub, including a full platform migration for Sam's Club.",
                emphasis: [
                  "Amazon, Walmart, Best Buy, Target, Sam's Club, Nike, Lululemon, Puma, Samsung, Expedia, Marriott, Uber One, Lyft, Disney+, and StubHub",
                ],
              },
              {
                id: 'onboarding',
                text: 'Standardized the enterprise integration path and removed bespoke per partner engineering, so a new partner lands on a repeatable process instead of a custom build.',
                emphasis: ['Standardized the enterprise integration path'],
              },
              {
                id: 'retail-media',
                text: "Led formation and initial delivery of Button's retail media product: set the roadmap and release plan with product and revenue, and shipped initial releases with NY Post, Forbes, and BuzzFeed.",
                emphasis: ['retail media product'],
              },
            ],
          },
          {
            id: 'org',
            label: 'Organization and delivery leadership',
            bullets: [
              {
                id: 'through-managers',
                text: 'Inherited Core Engineering when my manager left, built Solutions Engineering from scratch, and hired into both. I lead through managers, not only ICs: a Solutions Engineering leader on the director track reports to me directly. Raised the hiring bar, authored the career-growth ladder and design-review process, and sponsored a PERM labor certification end to end.',
                emphasis: [
                  'built Solutions Engineering from scratch',
                  'lead through managers, not only ICs',
                ],
              },
              {
                id: 'posttap',
                text: 'Early on, led engineering for the creator link product and ran half the org through the post-COVID rebuild.',
                emphasis: ['the creator link product'],
              },
              {
                id: 'em-pm-scrum',
                text: 'Act as engineering manager, product manager, and scrum lead for my org: own the roadmap, backlog prioritization, quarterly capacity planning, and every Agile ceremony across multiple squads on two week sprints, plus the feasibility gate between Revenue, Product, and Engineering on what actually gets built.',
                emphasis: ['engineering manager, product manager, and scrum lead'],
              },
            ],
          },
        ],
      },
      {
        id: 'digital-tide',
        company: 'Digital Tide',
        title: 'Founder & Principal',
        dates: 'Mar 2025 - Present',
        location: 'Remote',
        summary:
          'Independent consultancy where I found and run businesses end to end, wearing every hat: product, engineering, business, growth, and design. I stand companies up (entity, cloud, email, go to market), build the apps, and take on brand and design work where it is mine to do. Selected engagements are listed below.',
        groups: [
          {
            id: 'engagements',
            label: '',
            bullets: [
              {
                id: 'sanbar',
                text: "Sanbar (sanbar.us): built the client's entire technical foundation, covering GCP and AWS infrastructure, DNS, email and identity, the deployment pipeline, and the production site.",
                emphasis: ['Sanbar (sanbar.us)'],
              },
              {
                id: 'paleo-chick',
                text: 'That Paleo Chick (thatpaleochick.com): built the business, not just the site. AWS infrastructure, transactional and marketing email, social content produced and scheduled automatically through Postiz, and affiliate monetization, running as a near fully automated operation.',
                emphasis: ['That Paleo Chick (thatpaleochick.com)'],
              },
              {
                id: 'greedy',
                text: 'Greedy: ran the full site redesign end to end, from scope through vendors to launch, and own social and paid acquisition, including a competitive playbook built from live Meta Ad Library teardowns and AI generated video creative.',
                emphasis: ['Greedy'],
              },
              {
                id: 'charter',
                text: 'Charter: designed and built an invoicing application solo, covering auth, billing entities, invoice generation, and payment tracking.',
                emphasis: ['Charter'],
              },
              {
                id: 'brand',
                text: 'Design and brand: designed the brand and logo for Digital Tide and That Paleo Chick, plus the UI and UX for the apps I have shipped.',
                emphasis: ['Design and brand'],
              },
              {
                id: 'digital-tide-firm',
                text: 'Digital Tide (digitalti.de): the same playbook applied to my own firm, plus the standards clients inherit, meaning Linear first delivery, GitHub Actions CI, and Slack automation.',
                emphasis: ['Digital Tide (digitalti.de)'],
              },
            ],
          },
        ],
      },
      {
        id: 'centene-manager',
        company: 'Centene Corporation',
        title:
          'Manager: Mobile Application Development, then Member AI Assistant, then Engineering Chapter',
        dates: 'Oct 2016 - Oct 2021',
        location: 'St. Louis, MO',
        summary:
          'Five years managing engineers across three orgs at Centene, promoted from the senior engineering track into running the mobile practice I had built.',
        groups: [
          {
            id: 'main',
            label: '',
            bullets: [
              {
                id: 'led-25',
                text: 'Led 25 engineers across seven cross functional Agile teams delivering member facing web and mobile applications and new health plan implementations.',
                emphasis: ['25 engineers across seven cross functional Agile teams'],
              },
              {
                id: 'health-assistant',
                text: 'Built and led the cross functional team that shipped a self service AI health assistant, cutting call center volume. Onboarded a newly acquired team into enterprise operations and delivered an enterprise payment solution alongside it.',
                emphasis: ['self service AI health assistant'],
              },
              {
                id: 'mobile-apps',
                text: 'Delivered more than 20 mobile applications across iOS and Android, launched care management in the Florida market, and standardized mobile build, release, and compliance so the business could bid on new state contracts.',
                emphasis: ['more than 20 mobile applications'],
              },
              {
                id: 'process-layer',
                text: 'Built the standard engineering process layer for all web and mobile matrix teams, and defined the metrics leadership used for staffing and prioritization.',
              },
              {
                id: 'hiring-growth',
                text: 'Hired and managed a mix of full time and contingent staff against a cost target, and built career plans and training programs for direct reports.',
                emphasis: ['career plans and training programs'],
              },
              {
                id: 'assessment-framework',
                text: 'Created a Developer Assessment Framework that made role expectations explicit. Top 10% employee engagement across web leadership teams.',
                emphasis: ['Developer Assessment Framework'],
              },
            ],
          },
        ],
      },
      {
        id: 'centene-engineer',
        company: 'Centene Corporation',
        title: 'Senior Application Software Engineer',
        dates: 'Sep 2014 - Oct 2016',
        location: 'St. Louis, MO',
        groups: [
          {
            id: 'main',
            label: '',
            bullets: [
              {
                id: 'built-mobile-practice',
                text: 'Stood up mobile engineering at Centene as an individual contributor: department processes, the move from SVN to Git, automated developer environment setup, and Angular and Ionic approved into the stack. Promoted into management to run the practice I had built.',
                emphasis: [
                  'Stood up mobile engineering at Centene',
                  'Promoted into management to run the practice I had built',
                ],
              },
              {
                id: 'release-management',
                text: 'Owned release management for more than 20 internal and consumer applications shipping through MDM, TestFlight, the App Store, and Google Play.',
                emphasis: ['more than 20 internal and consumer applications'],
              },
              {
                id: 'hiring-mentoring',
                text: 'Ran hiring for the team before I led it: interviewed and brought on about 10 full time engineers plus contingent staff, and mentored the junior developers.',
                emphasis: ['about 10 full time engineers'],
              },
              {
                id: 'oauth',
                text: 'Shipped OAuth 2.0 through the API gateway and managed the third party vendor integrations the platform depended on.',
              },
            ],
          },
        ],
      },
    ] satisfies Role[],

    /** Compact list. No bullets, just the line. */
    earlier: {
      label: 'Earlier',
      roles: [
        { title: 'Software Engineer / Web Producer', company: 'Centene', dates: '2013 - 2014' },
        { title: 'Team Lead, Visual Design', company: 'N-Depth Solutions', dates: '2008 - 2013' },
        { title: 'Web Developer', company: 'Clear Pages', dates: '2007 - 2008' },
      ],
    },

    education: {
      label: 'Education',
      items: [
        {
          title: 'A.A.S., Multimedia & Web Design',
          company: 'St. Charles Community College',
          dates: '2004 - 2007',
        },
      ],
    },

    certifications: {
      label: 'Certifications',
      items: [
        { title: 'ITIL Foundation', company: 'AXELOS', dates: '' },
        { title: 'Leadership Development Program', company: 'Centene', dates: '' },
      ],
    },
  },

  /** Grouped capability and tooling lists. Keeps the keywords scannable. */
  toolkit: {
    heading: 'Stack & expertise',
    groups: [
      {
        label: 'Leadership',
        items: [
          'Multi-function org design',
          'Multi-team Agile ceremonies',
          'Hiring and bar setting',
          'Coaching and career development',
          'Performance management',
          'PERM sponsorship',
          'Exec and VP reporting',
        ],
      },
      {
        label: 'Platform reliability',
        items: [
          'Incident command',
          'On-call and PagerDuty',
          'Blameless postmortems',
          'SLAs',
          'Observability',
          'Peak load readiness',
        ],
      },
      {
        label: 'Partner engineering',
        items: [
          'Enterprise integrations',
          'Escalation management',
          'Attribution and event pipelines',
          'Retail media',
        ],
      },
      {
        label: 'Product and delivery',
        items: [
          'Roadmapping and release planning',
          'Backlog and capacity planning',
          'Feasibility and scoping gates',
          'Cross-functional delivery across product, revenue, and support',
        ],
      },
      {
        label: 'Design and UX',
        items: ['Brand and logo design', 'UI/UX', 'Figma', 'Front-end build'],
      },
      {
        label: 'AI and automation',
        items: [
          'Claude and MCP',
          'Custom MCP servers',
          'Agentic PRD to ticket pipelines',
          'Generative creative',
        ],
      },
      {
        label: 'Backend and data',
        items: ['Go', 'Python', 'Node.js', 'Postgres', 'Aurora', 'MongoDB', 'BigQuery'],
      },
      {
        label: 'Frontend',
        items: ['TypeScript', 'React', 'Next.js', 'Tailwind'],
      },
      {
        label: 'Cloud and infrastructure',
        items: [
          'AWS (ECS, EC2, RDS/Aurora, S3, SES, Route 53)',
          'GCP',
          'Terraform',
          'Docker',
          'GitHub Actions',
        ],
      },
    ],
  },

  work: {
    heading: 'Selected work',
    items: [
      {
        name: 'Sanbar',
        description:
          'The client had an idea and nothing else. I built the whole technical foundation: GCP and AWS, DNS, email and identity, deployment pipeline, and the production site.',
        tags: ['Infrastructure', 'GCP', 'AWS'],
        href: 'https://sanbar.us',
      },
      {
        name: 'That Paleo Chick',
        description:
          'Not just the site, the business. AWS, transactional and marketing email, social content produced and scheduled automatically through Postiz, and affiliate monetization. It runs itself.',
        tags: ['E-commerce', 'Automation', 'AWS'],
        href: 'https://thatpaleochick.com',
      },
      {
        name: 'Greedy',
        description:
          'Ran the full site redesign end to end, from scope through vendors to launch. Own social and paid acquisition, including a competitive playbook built from live Meta Ad Library teardowns and AI generated video creative.',
        tags: ['Program management', 'Growth', 'Paid media'],
        // TODO: add a public link when there is one.
        href: null,
      },
      {
        name: 'Charter',
        description:
          'An invoicing product, designed and built solo: auth, billing entities, invoice generation, and payment tracking.',
        tags: ['Product', 'Next.js', 'Clerk'],
        href: 'https://charter.digitalti.de',
      },
      {
        name: 'Brand & product design',
        description:
          'Brand and logo for Digital Tide and That Paleo Chick, plus the UI and UX for the apps I have shipped. I design what I build.',
        tags: ['Brand', 'UI/UX', 'Figma'],
        href: null,
        // Both marks are shown in one colour so they read as a set against the
        // panel rather than dragging two unrelated brand palettes into it.
        marks: [
          { src: '/marks/digital-tide.webp', alt: 'Digital Tide', width: 640, height: 502 },
          { src: '/marks/that-paleo-chick.svg', alt: 'That Paleo Chick', width: 475, height: 603 },
        ],
      },
      {
        name: 'Digital Tide',
        description:
          'My own firm, run on the standards clients inherit: Linear first delivery, GitHub Actions CI, and Slack automation.',
        tags: ['Studio', 'Consulting', 'Full-stack'],
        href: 'https://digitalti.de',
      },
    ] satisfies WorkItem[],
  },

  contact: {
    heading: 'Get in touch',
    blurb:
      'If you are hiring for platform or engineering leadership and want someone who will own both the system and the people, I would like to hear about it.',
    email: 'bob@bobwa.de',
    links: [
      { label: 'Email', href: 'mailto:bob@bobwa.de', icon: 'mail' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bwade231/', icon: 'linkedin' },
      { label: 'GitHub', href: 'https://github.com/bwade', icon: 'github' },
    ],
    /** Plain text friendly resume for applicant tracking systems. */
    atsResume: { label: 'ATS résumé', href: '/Robert_Wade_Resume_ATS.pdf' },
    /** Rendered as "(c) {year} {name}". The year is filled in at build time. */
    copyrightName: 'Bob Wade',
  },

  /**
   * Fields the resume needs that the site does not show.
   *
   * Everything else the resume prints comes from the sections above, so the
   * page and the PDF cannot drift. Written in plain ASCII: the designed resume
   * substitutes its typographic marks at render time, which keeps the copy
   * here readable and keeps the ATS variant parseable.
   */
  resume: {
    /** Full legal name. The site uses the shorter `hero.name`. */
    legalName: 'Robert (Bob) Wade',
    phone: '+1 (314) 630-5428',
    /** Separators become middots on the designed resume. */
    tagline: 'Engineering leader | Platform & reliability | Partner & product | AI-augmented ops',
    /**
     * The resume's opening paragraph. Deliberately not `about.body`: that one
     * introduces a person, this one opens a pitch.
     */
    profile:
      "Senior Engineering Manager at Button leading two engineering functions through managers as well as ICs: Core Engineering and Solutions Engineering, 13 engineers, and the platform behind $100B+ in mobile commerce for Amazon, Walmart, Uber, Lyft, Fetch, and Sam's Club. 19 years in engineering, 10+ in management, and 25 engineers across seven teams before that at Centene. I own the platform other teams depend on and keep it dependable: on-call held at 99.99% uptime and core engineering interrupts cut by routing support triage away from the team. Delivery now runs on AI-augmented workflows, with about 45% of shipped code AI written and engineer reviewed. Also act as product owner for my org, holding the roadmap, backlog, and the call on what gets built.",
    /** Reusable scaffold only. Cover letter bodies are per application and live outside this repo. */
    letter: {
      signoff: 'Sincerely,',
      signature: 'Bob Wade',
    },
  },
} as const;

export type Content = typeof content;
