/**
 * ALL SITE COPY LIVES HERE.
 *
 * Edit this file to change any text on the site. You should never need to open
 * a component to change wording, links, tags, dates, or metrics.
 *
 * `icon` values map to icons in components/icons.tsx. If you want a different
 * icon, add it to that map first, then use its key here.
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
      'Engineering leader with 19 years building technical organizations. I own Core Engineering and Solutions Engineering at Button, the platform behind $100B+ in driven mobile commerce.',
    locale: 'en_US',
    /**
     * Social share card, 1200x630, committed at public/og.png.
     * TODO: swap public/og.png for a designed card when you have one. Same
     * filename, same dimensions, and nothing else needs to change.
     */
    ogImage: '/og.png',
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
    title: 'Senior Engineering Manager: Platform, Partner & Product Engineering',
    /** Two or three sentences. Keep it tight. This is the whole pitch. */
    blurb:
      'I own Core Engineering and Solutions Engineering at Button: 13 engineers across two functions running the platform behind $100B+ in driven mobile commerce. Nineteen years building technical organizations, more than ten of them in management, and still hands on enough to fix the systems before I fix the org that owns them. Separately I founded a consultancy that stands companies up end to end.',
    /**
     * Portrait shown next to the hero text.
     *
     * TODO: drop a headshot at public/bob-wade.jpg (square or 4:5, at least
     * 800px on the short edge) and change `src` below from null to
     * '/bob-wade.jpg'. While `src` is null the hero renders text only, so
     * there is never a broken image.
     */
    portrait: {
      src: null as string | null,
      alt: 'Bob Wade',
    },
    primaryCta: { label: 'Download Résumé', href: '/Robert_Wade_Resume.pdf' },
    secondaryCta: { label: 'Email me', href: 'mailto:bwade231@gmail.com' },
    social: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bwade231/', icon: 'linkedin' },
      { label: 'GitHub', href: 'https://github.com/bwade', icon: 'github' },
    ],
  },

  /** Four metric cards. `value` is the big number, `label` the caption. */
  impact: [
    { value: '$100B+', label: 'in commerce driven' },
    { value: '99.99%', label: 'platform uptime' },
    { value: '130M+', label: 'Amazon clicks / month' },
    { value: '13', label: 'engineers across 2 functions' },
  ],

  about: {
    heading: 'About',
    /** One short paragraph. */
    body: "I'm an engineering leader with 19 years building and running technical organizations, including more than ten years in management. At Button I own Core Engineering and Solutions Engineering, the platform behind $100B+ in driven mobile commerce for Amazon, Walmart, Uber, Lyft, Fetch, and Sam's Club. I'm a hands on architect who still ships: I fix the systems, then I fix the organization that owns them. Separately I founded Digital Tide, a consultancy that stands companies up end to end.",
  },

  whatIDo: {
    heading: 'What I do',
    items: [
      {
        title: 'Platform Reliability & Scale',
        description:
          'Incident command, on-call and severity design, blameless postmortems, SLAs, and peak load readiness. The operational discipline that keeps uptime at four nines instead of hoping for it.',
        icon: 'activity',
      },
      {
        title: 'Partner Integrations',
        description:
          'The technical and relationship surface between us and the largest merchants on the internet. Enterprise integrations, escalation management, and attribution pipelines that survive a partner roadmap change.',
        icon: 'plug',
      },
      {
        title: 'AI-Augmented Delivery',
        description:
          'Claude and MCP in the delivery loop where it compounds: review, scaffolding, migrations, and tightly scoped internal tooling. Guardrails first, so velocity does not turn into debt.',
        icon: 'sparkles',
      },
      {
        title: 'Product & Design',
        description:
          'Enough craft to prototype an idea instead of describing it. I write the spec, draw the screens, cut the scope, and hand the team something they can build.',
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
          "Own two engineering functions and 13 direct reports: Core Engineering (routing, attribution, data, infrastructure) and Solutions Engineering (partner delivery and technical escalation), for the platform behind $100B+ in driven mobile commerce across 200+ brands including Amazon, Walmart, Uber, Lyft, Fetch, Target, and Sam's Club. I own both the platform and the partner handoff that most orgs split and drop.",
        groups: [
          {
            label: 'Reliability, run the business and keep the lights on',
            bullets: [
              'Own the RTB/KTLO mandate for the core platform: reliability, tech debt paydown, and operational load for the systems moving $100B+ in commerce.',
              'Rebuilt on-call, severity classification, and blameless postmortems from scratch, sustaining 99.99% uptime and cutting MTTR.',
              "Incident commander through Prime Day and Fetch's Super Bowl, where the platform peaked at roughly 5,260 RPS, about 2.6x the planned peak, with 4XX errors inside normal limits.",
              'Cut core engineering interrupts about 30% by standing up a Support to Data to Core escalation flow, converting reactive firefighting into protected delivery capacity.',
            ],
          },
          {
            label: 'Scale, platform modernization, and AI-augmented operations',
            bullets: [
              'Hardened the order pipeline with parallelized finalization workers, load tested to 5,000 RPS, and drove Aurora migrations, ComStore and Django modernization, and Terraform plus AWS provider upgrades, clearing debt that had blocked platform progress.',
              'Stood up ML platform infrastructure on SageMaker and backed cost discipline including a single AWS savings of roughly $70K per year.',
              "Sponsored internal read-only LLM tooling, a Sam's Club order debugger and a CSV validator, that cut manual triage load. Built with tightly scoped tools to prevent hallucination.",
              'Helped drive AI-augmented delivery across the org, with Claude attributed code reaching about 45% of lines shipped and roughly two thirds of merged PRs.',
            ],
          },
          {
            label: 'Partner integrations and revenue',
            bullets: [
              "Solutions Engineering landed and scaled integrations across Best Buy, Sam's Club (Glass and mParticle migration), TurboTax, Target, Fetch, Uber One, Lululemon, Hostelworld, Puma, and Albertsons.",
              'Cut enterprise integration onboarding time 30% and raised revenue per integration 20% by standardizing the integration path and removing bespoke per partner engineering.',
              'Defined the SLAs and escalation model across Solutions Engineering, Partner Success, and Support.',
              "Led formation and initial delivery of Button's retail media product with NY Post, Forbes, and BuzzFeed.",
            ],
          },
          {
            label: 'Organization',
            bullets: [
              'Built the team I now run: raised the partner facing hiring bar, formalized design review, authored the runbook and SOP library global teams use, and sponsored a PERM labor certification end to end.',
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
          'Founded and operate an independent technical consultancy. I stand businesses up end to end, covering cloud, email, application, automation, and go to market, then run them. Architect, operator, and PM in one seat. Selected engagements are listed below.',
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
              'As Senior Engineer: implemented OAuth 2.0 via API Gateway, migrated the department from SVN to Git, and hired and mentored about 10 engineers.',
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
          'Hiring and bar setting',
          'Career frameworks',
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
          'AWS (ECS, EC2, RDS/Aurora, S3, SES, SageMaker)',
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
          "Built the client's entire technical foundation: GCP and AWS infrastructure, DNS, email and identity, deployment pipeline, and production site.",
        tags: ['Infrastructure', 'GCP', 'AWS'],
        href: 'https://sanbar.us',
      },
      {
        name: 'That Paleo Chick',
        description:
          'Built the business, not just the site. AWS infrastructure, transactional and marketing email, automated social content production and scheduling via Postiz, publishing pipeline, and affiliate monetization. Runs as a near fully automated operation.',
        tags: ['E-commerce', 'Automation', 'AWS'],
        href: 'https://thatpaleochick.com',
      },
      {
        name: 'Greedy',
        description:
          'Ran project management for the full site redesign, covering scope, vendors, design to build, and launch. Own social marketing and paid acquisition, including a competitive intelligence playbook built from live Meta Ad Library analysis and AI generated video creative.',
        tags: ['Program management', 'Growth', 'Paid media'],
        // TODO: add a public link when there is one.
        href: null,
      },
      {
        name: 'Charter',
        description:
          'Designed and built an invoicing application end to end: auth, billing entities, invoice generation, and payment tracking.',
        tags: ['Product', 'Next.js', 'Clerk'],
        href: 'https://charter.digitalti.de',
      },
      {
        name: 'Digital Tide',
        description:
          'The same playbook applied to my own firm, plus the engineering standards clients inherit: Linear first delivery, GitHub Actions CI, Slack automation, and a hybrid repo model.',
        tags: ['Studio', 'Consulting', 'Full-stack'],
        href: 'https://digitalti.de',
      },
    ] satisfies WorkItem[],
  },

  contact: {
    heading: 'Get in touch',
    blurb:
      'Open to conversations about platform and engineering leadership roles, advisory work, or an interesting build.',
    email: 'bwade231@gmail.com',
    links: [
      { label: 'Email', href: 'mailto:bwade231@gmail.com', icon: 'mail' },
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
