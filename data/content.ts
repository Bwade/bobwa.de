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
};

export type Role = {
  company: string;
  title: string;
  /** Free text. Shown exactly as written. */
  dates: string;
  location?: string;
  /** One paragraph framing the role. Optional. */
  summary?: string;
  /**
   * Bullets, optionally grouped under a label. Use a single group with an
   * empty label if you do not want headings.
   */
  groups?: { label: string; bullets: string[] }[];
};

export const content = {
  /** Site-wide SEO + OpenGraph. */
  site: {
    /** Canonical production URL. Used for OG tags and the sitemap. */
    url: 'https://bobwa.de',
    title: 'Bob Wade, Senior Engineering Manager',
    description:
      'I run the platform behind $100B+ in mobile commerce at Button. Two engineering functions, 13 people, four nines sustained through Prime Day and a Super Bowl.',
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
    title: 'Senior Engineering Manager at Button',
    /** Two or three sentences. Keep it tight. This is the whole pitch. */
    blurb:
      'Two engineering functions, thirteen people, and the platform every partner and every dollar flows through. I take over systems that wobble and leave behind ones that hold.',
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
   * design/editorial-scroll only. Three words revealed over the portrait in the
   * sticky panel. Keep them to one word each; they are set very large.
   */
  traits: {
    label: 'How I work',
    /**
     * `proof` is set very large and nearly transparent behind the word. It is
     * decorative reinforcement of the line beneath, so it is hidden from
     * assistive tech: the same number is already stated in `line`.
     */
    items: [
      {
        word: 'Unflappable',
        proof: '99.99%',
        line: 'Prime Day at twelve times baseline. A Super Bowl at 2.6x its planned peak. Four nines, sustained, because on-call and severity were rebuilt from nothing rather than hoped over.',
      },
      {
        word: 'Hands-on',
        proof: '45%',
        line: 'Close enough to the code to catch a bad architecture before it ships. I fix the system, then I fix the organization that let it happen.',
      },
      {
        word: 'Commercial',
        proof: '+20%',
        line: 'Onboarding down 30%. Revenue per integration up 20%. A retail media line stood up from zero. I also found and run my own businesses.',
      },
    ],
  },

  about: {
    heading: 'About',
    /** One short paragraph. */
    body: 'Every org I have inherited looked the same on day one: on-call improvised, severity undefined, the team firefighting instead of building. I rebuild that layer first. On-call from scratch to four nines. Interrupts down thirty percent. Release cycles from two months to three weeks. Then I rebuild the organization that owns it, because a system only stays fixed when the people around it are set up to keep it that way. Nineteen years in, ten of them managing, and I still found and run my own companies. That is why I argue for the version that ships.',
  },

  whatIDo: {
    heading: 'What I do',
    items: [
      {
        title: 'Platform Reliability & Scale',
        description:
          'Prime Day at twelve times baseline. A Super Bowl at 2.6x its planned peak, errors flat. I plan for the spike instead of surviving it: capacity, load tests, incident command, and postmortems that actually change something.',
        icon: 'activity',
      },
      {
        title: 'Partner Integrations',
        description:
          'Amazon, Walmart, Best Buy, Target, Nike, Marriott, Disney+. I own the technical surface those relationships run on, plus the tiered SLAs and escalation paths that stop every issue becoming a fire drill.',
        icon: 'plug',
      },
      {
        title: 'AI-Augmented Delivery',
        description:
          'Claude and MCP inside the delivery loop, not bolted onto it. Around 45% of shipped lines and two thirds of merged PRs, with tooling scoped tightly enough that it cannot invent its way into production.',
        icon: 'sparkles',
      },
      {
        title: 'Product & Design',
        description:
          'I sit in the feasibility gate between revenue, product, and engineering. I can also open Figma and build the front end, so I argue with a prototype instead of a paragraph.',
        icon: 'compass',
      },
    ],
  },

  experience: {
    heading: 'Experience',
    roles: [
      {
        company: 'Button, Inc.',
        title: 'Senior Engineering Manager, Core Engineering & Solutions Engineering',
        dates: 'Oct 2020 - Present',
        location: 'Remote (NYC)',
        summary:
          "Own two engineering functions and 13 direct reports: Core Engineering (routing, attribution, data, infrastructure) and Solutions Engineering (partner delivery and technical escalation), covering the platform behind $100B+ in driven mobile commerce and routing 130M+ Amazon creator clicks a month across 200+ brands including Amazon, Walmart, Uber, Lyft, Fetch, Target, and Sam's Club. I own both the platform and the partner handoff that most orgs split and drop.",
        groups: [
          {
            label: 'Reliability and high-traffic events',
            bullets: [
              'My team owns the core infrastructure that makes Button run: the routing, decisioning, attribution, and order pipeline every partner and dollar flows through. I hold the RTB/KTLO mandate for it, covering reliability, tech debt, and operational load for systems moving $100B+ in commerce.',
              "Lead Amazon Prime Day readiness year over year, Button's largest revenue event: capacity planning, load testing, and Go/No-Go across the core services, scaling infrastructure up to 12x baseline and proving headroom for each larger ramp at 100% uptime.",
              "Incident commander through Fetch's Super Bowl, holding the platform at 2.6x its planned peak with errors within normal limits. Rebuilt on-call, severity, and blameless postmortems from scratch, sustaining 99.99% uptime and cutting MTTR.",
              'Cut core engineering interrupts about 30% by standing up a Support to Data to Core escalation flow, converting reactive firefighting into protected delivery capacity.',
            ],
          },
          {
            label: 'Scale, platform modernization, and AI-augmented operations',
            bullets: [
              "Own Button's order pipeline, the platform's revenue path at 600K+ orders a day. Drove autoscaling, Aurora migrations, and ComStore and Django modernization, and led the release-confidence program (staging parity plus end-to-end testing) that cut release cycles from roughly two months to about three weeks. Backed cost discipline including a single AWS saving of roughly $70K a year.",
              "Sponsored internal read-only LLM tooling, a Sam's Club order debugger and a CSV validator, that cut manual triage load. Built with tightly scoped tools to prevent hallucination.",
              'Championed AI-augmented delivery. Org-wide, Claude-attributed code reached about 45% of lines shipped and roughly two thirds of merged PRs.',
            ],
          },
          {
            label: 'Support engineering and service design',
            bullets: [
              "Stood up Button's partner-support function from scratch, taking support from 100% ad hoc (Slack DMs and email, no ownership or routing) to a structured, SLA-backed operation.",
              'Architected the Salesforce to Zendesk to Jira model, with Zendesk as the source of truth for routing, prioritization, and SLAs, and formed a Support Engineering team to own it.',
              "Defined tiered SLAs and the incident priority matrix across strategic partners (Uber, Amazon, Best Buy, Sam's Club, Fetch): P0 acknowledged in under 15 minutes, 30-minute response for Tier 1, plus the escalation decision tree routing work across Solutions Engineering, Data, and on-call.",
            ],
          },
          {
            label: 'Partner integrations, product, and revenue',
            bullets: [
              "Solutions Engineering landed and scaled integrations across a who's-who of commerce, travel, and marketplace: Amazon, Walmart, Best Buy, Target, Sam's Club, Nike, Lululemon, Puma, Samsung, Expedia, Marriott, Uber One, Lyft, Disney+, and StubHub, including the Sam's Club Glass and mParticle migration.",
              'Cut enterprise integration onboarding time 30% and raised revenue per integration 20% by standardizing the integration path and removing bespoke per partner engineering.',
              "Led formation and initial delivery of Button's retail media product: set the roadmap and release plan with product and revenue, and shipped initial releases with NY Post, Forbes, and BuzzFeed.",
            ],
          },
          {
            label: 'Organization and delivery leadership',
            bullets: [
              'Act as engineering manager, product manager, and scrum lead for my org: own the roadmap, backlog prioritization, quarterly capacity planning, and the full Agile cadence across multiple squads, plus the feasibility gate between Revenue, Product, and Engineering on what actually gets built.',
              "Early on, led Button's PostTap product engineering and ran half the org through the post-COVID rebuild.",
              'Built the team I now run and lead through managers, not only ICs: a Solutions Engineering leader on the director track reports to me directly. Raised the hiring bar, authored the career-growth ladder and design-review process, and sponsored a PERM labor certification end to end.',
            ],
          },
        ],
      },
      {
        company: 'Digital Tide',
        title: 'Founder & Principal',
        dates: '2023 - Present',
        location: 'Remote',
        summary:
          'Independent consultancy where I found and run businesses end to end, wearing every hat: product, engineering, business, growth, and design. I stand companies up (entity, cloud, email, go to market), build the apps, and take on brand and design work where it is mine to do. Selected engagements are listed below.',
      },
      {
        company: 'Centene Corporation',
        title: 'IT Manager, Engineering Chapter',
        dates: 'Jan 2019 - Oct 2020',
        location: 'St. Louis, MO',
        groups: [
          {
            label: '',
            bullets: [
              'Led 25 engineers across seven cross functional Agile teams delivering member facing web and mobile applications and new health plan implementations.',
              'Built the standard engineering process layer for all web and mobile matrix teams, and defined the metrics leadership used for staffing and prioritization.',
              'Created a Developer Assessment Framework that made role expectations explicit. Top 10% employee engagement across web leadership teams.',
            ],
          },
        ],
      },
      {
        company: 'Centene Corporation',
        title: 'IT Manager, Member AI & Mobile, then Senior Application Software Engineer',
        dates: 'Sep 2014 - Jan 2019',
        location: 'St. Louis, MO',
        groups: [
          {
            label: '',
            bullets: [
              'Built and led the cross functional team that shipped a self service AI health assistant, reducing call center volume, and established the SDLC framework for the inherited application.',
              'Delivered more than 20 mobile applications across iOS and Android, launched care management in the Florida market, and standardized mobile build, release, and compliance for state contracts.',
              'As Senior Engineer: shipped OAuth 2.0 via API Gateway, migrated the org from SVN to Git, and mentored about 10 engineers.',
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
} as const;

export type Content = typeof content;
