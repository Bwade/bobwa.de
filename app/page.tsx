import About from '@/components/About';
import Experience from '@/components/Experience';
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
  alternateName: 'Robert Wade',
  jobTitle: content.hero.title,
  description: content.site.description,
  url: content.site.url,
  email: `mailto:${content.contact.email}`,
  sameAs: content.hero.social.map((link) => link.href),
  address: {
    '@type': 'PostalAddress',
    addressLocality: content.hero.address.locality,
    addressRegion: content.hero.address.region,
    addressCountry: content.hero.address.country,
  },
  worksFor: content.experience.roles.map((role) => ({
    '@type': 'Organization',
    name: role.company,
  })),
  alumniOf: content.experience.education.items.map((item) => ({
    '@type': 'EducationalOrganization',
    name: item.company,
  })),
  knowsAbout: content.toolkit.groups.flatMap((group) => group.items),
};

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="focus:bg-accent focus:text-paper-raised sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <SiteNav />

      <main id="main" className="flex-1">
        <Hero />
        <ImpactStrip />
        <About />
        <WhatIDo />
        <Experience />
        <Work />
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        // Serialized from a local literal, so no user input reaches this.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
