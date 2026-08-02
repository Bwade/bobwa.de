import Image from 'next/image';
import { Download, Mail, MapPin } from 'lucide-react';
import { content } from '@/data/content';
import { icons, type IconKey } from './icons';
import TrackedLink from './TrackedLink';

const { hero } = content;

export default function Hero() {
  const portrait = hero.portrait.src;

  return (
    <section
      id="top"
      className="mx-auto grid max-w-5xl gap-10 px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16"
    >
      <div>
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-accent">
          {hero.title}
        </p>

        <h1 className="mt-6 font-serif text-5xl font-normal leading-[0.95] tracking-tight text-ink sm:text-7xl">
          {hero.name}
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl sm:leading-relaxed">
          {hero.blurb}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <TrackedLink
            event="resume_download"
            eventProps={{ variant: 'designed', location: 'hero' }}
            href={hero.primaryCta.href}
            download
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper-raised transition-colors hover:bg-accent-strong dark:text-[#0f1214]"
          >
            <Download aria-hidden="true" className="size-4" strokeWidth={1.75} />
            {hero.primaryCta.label}
          </TrackedLink>

          <TrackedLink
            event="email_click"
            eventProps={{ location: 'hero' }}
            href={hero.secondaryCta.href}
            className="inline-flex items-center gap-2 rounded-full border border-rule-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <Mail aria-hidden="true" className="size-4" strokeWidth={1.75} />
            {hero.secondaryCta.label}
          </TrackedLink>
        </div>

        <p className="mt-8 flex items-center gap-1.5 text-sm text-ink-faint">
          <MapPin aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
          {hero.location}
        </p>

        <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
          {hero.social.map((link) => {
            const Icon = icons[link.icon as IconKey];
            return (
              <li key={link.href}>
                <TrackedLink
                  event="social_click"
                  eventProps={{ network: link.icon, location: 'hero' }}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-ink-faint transition-colors hover:text-accent"
                >
                  <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
                  {link.label}
                </TrackedLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Rendered only when hero.portrait.src is set, so there is never a broken
          image. The grade is baked into the file rather than applied as a CSS
          filter, so it looks identical everywhere and costs nothing to paint. */}
      {portrait && (
        <figure className="order-first lg:order-none lg:pt-2">
          <div className="w-40 overflow-hidden rounded-sm border border-rule sm:w-48 lg:w-56">
            <Image
              src={portrait}
              alt={hero.portrait.alt}
              width={480}
              height={600}
              priority
              sizes="(min-width: 1024px) 14rem, (min-width: 640px) 12rem, 10rem"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </figure>
      )}
    </section>
  );
}
