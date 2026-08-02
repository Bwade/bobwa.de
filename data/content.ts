/**
 * ALL SITE COPY LIVES HERE.
 *
 * Edit this file to change any text on the site. You should never need to open
 * a component to change wording, links, tags, or metrics.
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

export const content = {
  /** Site-wide SEO + OpenGraph. */
  site: {
    /** Canonical production URL. Used for OG tags and the sitemap. */
    url: 'https://bobwa.de',
    title: 'Bob Wade, Senior Engineering Manager',
    description:
      'Senior Engineering Manager leading platform, partner, and product engineering. I own the infrastructure high volume commerce runs on, and I build products end to end.',
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
      { label: 'Work', href: '#work' },
      { label: 'Contact', href: '#contact' },
    ],
  },

  hero: {
    name: 'Bob Wade',
    title: 'Senior Engineering Manager: Platform, Partner & Product Engineering',
    /** Two or three sentences. Keep it tight. This is the whole pitch. */
    blurb:
      'I run the platform teams behind high volume commerce: partner integrations, routing, and the reliability work everything else depends on. I hire and grow engineers, and I stay close enough to the code to catch a bad architecture early. On my own time I build and ship products end to end.',
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
    body: "I'm an engineering leader who owns the infrastructure Button runs on: the partner integrations, the routing layer, and the reliability guarantees everything downstream depends on. I'm also a founder and builder. I've taken products from an empty repo to paying customers across engineering, design, and go to market, which is why I usually push for the version that ships.",
  },

  whatIDo: {
    heading: 'What I do',
    items: [
      {
        title: 'Platform Reliability & Scale',
        description:
          'Systems that hold when volume spikes. Capacity planning, observability, incident response, and the operational discipline that keeps uptime at four nines.',
        icon: 'activity',
      },
      {
        title: 'Partner Integrations',
        description:
          'The technical surface between us and the largest merchants on the internet. Integrations that survive their roadmap changes, and onboarding that does not take a heroic effort every time.',
        icon: 'plug',
      },
      {
        title: 'AI-Augmented Delivery',
        description:
          'AI applied where it actually pays off in the delivery loop: code review, scaffolding, migrations, and test coverage. With enough guardrails that speed does not turn into debt.',
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

  work: {
    heading: 'Selected work',
    items: [
      {
        name: 'Sanbar',
        description:
          'Operations and field service platform for teams that run on scheduling instead of spreadsheets.',
        tags: ['Product', 'Next.js', 'AWS'],
        href: 'https://sanbar.io',
      },
      {
        name: 'That Paleo Chick',
        description:
          'Food brand and content platform. Storefront, recipe library, and the publishing pipeline behind both.',
        tags: ['E-commerce', 'Content', 'Brand'],
        href: 'https://thatpaleochick.com',
      },
      {
        name: 'Greedy',
        description:
          'Consumer finance experiment that turns everyday spending into something you can see and act on.',
        tags: ['Fintech', 'Mobile', 'Design'],
        // TODO: add a public link when there is one.
        href: null,
      },
      {
        name: 'Charter',
        description:
          'Internal delivery platform. Project scaffolding, auth, and the shared services teams keep rebuilding.',
        tags: ['Platform', 'Next.js', 'Clerk'],
        href: 'https://charter.digitalti.de',
      },
      {
        name: 'Digital Tide',
        description:
          'My studio. Engineering and design for founders who need the first version to be the right one.',
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
