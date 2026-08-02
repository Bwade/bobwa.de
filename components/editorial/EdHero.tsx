import { ArrowDown, Download, Mail, MapPin } from 'lucide-react';
import { content } from '@/data/content';
import { icons } from '@/components/icons';
import TrackedLink from '@/components/TrackedLink';
import Reveal from './Reveal';

const { hero } = content;

export default function EdHero() {
  return (
    <section
      id="top"
      className="bg-ed-paper text-ed-ink relative flex min-h-[92vh] flex-col justify-between px-6 pt-28 pb-10 sm:px-10 sm:pt-32"
    >
      <Reveal className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center">
        <p className="ed-label text-ed-accent">{hero.title}</p>

        <h1 className="ed-display mt-6 text-[clamp(3.5rem,13vw,11rem)]">{hero.name}</h1>

        <p className="text-ed-ink/70 mt-10 max-w-2xl text-lg leading-relaxed sm:text-xl">
          {hero.blurb}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3">
          <TrackedLink
            event="resume_download"
            eventProps={{ variant: 'designed', location: 'hero' }}
            href={hero.primaryCta.href}
            download
            className="bg-ed-ink text-ed-paper hover:bg-ed-accent inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors"
          >
            <Download aria-hidden="true" className="size-4" strokeWidth={1.75} />
            {hero.primaryCta.label}
          </TrackedLink>

          <TrackedLink
            event="email_click"
            eventProps={{ location: 'hero' }}
            href={hero.secondaryCta.href}
            className="border-ed-ink text-ed-ink hover:border-ed-accent hover:text-ed-accent inline-flex items-center gap-2 border px-6 py-3 text-sm font-medium transition-colors"
          >
            <Mail aria-hidden="true" className="size-4" strokeWidth={1.75} />
            {hero.secondaryCta.label}
          </TrackedLink>
        </div>
      </Reveal>

      <div className="border-ed-rule mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 border-t pt-6">
        <p className="text-ed-ink/55 inline-flex items-center gap-1.5 text-sm">
          <MapPin aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
          {hero.location}
        </p>

        <ul className="flex flex-wrap items-center gap-x-6">
          {hero.social.map((link) => {
            const Icon = icons[link.icon];
            return (
              <li key={link.href}>
                <TrackedLink
                  event="social_click"
                  eventProps={{ network: link.icon, location: 'hero' }}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ed-ink/55 hover:text-ed-accent inline-flex items-center gap-1.5 text-sm transition-colors"
                >
                  <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
                  {link.label}
                </TrackedLink>
              </li>
            );
          })}
        </ul>

        <p aria-hidden="true" className="ed-label text-ed-ink/40 inline-flex items-center gap-2">
          Scroll
          <ArrowDown className="size-3.5" strokeWidth={1.75} />
        </p>
      </div>
    </section>
  );
}
