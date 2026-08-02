import About from '@/components/About';
import Hero from '@/components/Hero';
import ImpactStrip from '@/components/ImpactStrip';
import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';
import WhatIDo from '@/components/WhatIDo';
import Work from '@/components/Work';
import { content } from '@/data/content';

/** Structured data so search results show the person, not just the page. */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: content.hero.name,
  jobTitle: content.hero.title,
  description: content.site.description,
  url: content.site.url,
  email: `mailto:${content.contact.email}`,
  sameAs: content.hero.social.map((link) => link.href),
};

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-paper-raised"
      >
        Skip to content
      </a>

      <SiteNav />

      <main id="main" className="flex-1">
        <Hero />
        <ImpactStrip />
        <About />
        <WhatIDo />
        <Work />
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        // Serialized from a local literal. no user input reaches this.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
