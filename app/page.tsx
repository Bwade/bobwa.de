import EdAbout from '@/components/editorial/EdAbout';
import EdContact from '@/components/editorial/EdContact';
import EdExperience from '@/components/editorial/EdExperience';
import EdHero from '@/components/editorial/EdHero';
import EdImpact from '@/components/editorial/EdImpact';
import EdNav from '@/components/editorial/EdNav';
import EdChanges from '@/components/editorial/EdChanges';
import EdWhatIDo from '@/components/editorial/EdWhatIDo';
import EdWork from '@/components/editorial/EdWork';
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
      {/* Without JS the reveal classes would leave content faded out forever. */}
      <noscript>
        <style>{`.reveal,.reveal-stagger>*{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      <a
        href="#main"
        className="focus:bg-ed-accent focus:text-ed-paper sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <EdNav />

      {/* data-panel tells the nav whether it is currently over light or dark. */}
      <main id="main" className="flex-1">
        <div data-panel="light">
          <EdHero />
          <EdImpact />
          <EdAbout />
        </div>
        <div data-panel="dark">
          <EdChanges />
          <EdWhatIDo />
        </div>
        <div data-panel="light">
          <EdExperience />
        </div>
        <div data-panel="dark">
          <EdWork />
        </div>
      </main>

      <div data-panel="light">
        <EdContact />
      </div>

      <script
        type="application/ld+json"
        // Serialized from a local literal, so no user input reaches this.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
