import Image from 'next/image';
import { ArrowDown, Download, Mail, MapPin } from 'lucide-react';
import { content } from '@/data/content';
import { icons } from '@/components/icons';
import TrackedLink from '@/components/TrackedLink';
import Reveal from './Reveal';

const { hero } = content;

/**
 * The portrait bleeds off the edge of the section and dissolves into the paper
 * rather than sitting in a frame. The dissolve is a CSS mask, so the file stays
 * a clean photograph and the fade always matches the background colour exactly.
 *
 * Mobile puts the image across the top and fades it downward; from `lg` it moves
 * to the right and fades leftward, behind the display type.
 */
export default function EdHero() {
  return (
    <section
      id="top"
      className="bg-ed-paper text-ed-ink relative isolate flex min-h-svh flex-col justify-between overflow-hidden px-6 pb-10 sm:px-10"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[46svh] [mask-image:linear-gradient(to_bottom,black_52%,transparent_96%)] [-webkit-mask-image:linear-gradient(to_bottom,black_52%,transparent_96%)] lg:inset-y-0 lg:right-0 lg:left-auto lg:h-auto lg:w-[54%] lg:[mask-image:linear-gradient(to_right,transparent_2%,black_46%)] lg:[-webkit-mask-image:linear-gradient(to_right,transparent_2%,black_46%)]"
      >
        <Image
          src="/bob-hero.webp"
          alt={hero.portrait.alt}
          fill
          priority
          sizes="(min-width: 1024px) 54vw, 100vw"
          className="object-cover object-[58%_18%] lg:object-[52%_22%]"
        />
      </div>

      {/* Scrims. The photo runs under the nav and the bottom rail, and its
          bright office background leaves both illegible without these. */}
      <div
        aria-hidden="true"
        className="from-ed-paper pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b via-transparent to-transparent"
      />
      <div
        aria-hidden="true"
        className="from-ed-paper pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t via-transparent to-transparent"
      />

      <Reveal className="mx-auto flex w-full max-w-6xl flex-[1_1_auto] flex-col justify-center pt-[42svh] pb-16 lg:pt-40 lg:pb-24">
        <p className="ed-label text-ed-accent max-w-xl lg:max-w-lg">{hero.title}</p>

        <h1 className="ed-display mt-7 text-[clamp(3.25rem,10vw,8.5rem)] leading-[0.88]">
          {hero.name}
        </h1>

        <p className="text-ed-ink/75 mt-8 max-w-xl text-lg leading-relaxed sm:text-xl">
          {hero.blurb}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
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

      <div className="border-ed-rule mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t pt-6">
        <p className="text-ed-muted inline-flex items-center gap-1.5 text-sm">
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
                  className="text-ed-muted hover:text-ed-accent inline-flex items-center gap-1.5 text-sm transition-colors"
                >
                  <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
                  {link.label}
                </TrackedLink>
              </li>
            );
          })}
        </ul>

        <p aria-hidden="true" className="ed-label text-ed-muted inline-flex items-center gap-2">
          Scroll
          <ArrowDown className="size-3.5" strokeWidth={1.75} />
        </p>
      </div>
    </section>
  );
}
