import { content } from '@/data/content';
import { icons, type IconKey } from './icons';
import { Download, Mail } from 'lucide-react';

const { hero } = content;

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
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
        <a
          href={hero.primaryCta.href}
          download
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper-raised transition-colors hover:bg-accent-strong dark:text-[#0f1214]"
        >
          <Download aria-hidden="true" className="size-4" strokeWidth={1.75} />
          {hero.primaryCta.label}
        </a>

        <a
          href={hero.secondaryCta.href}
          className="inline-flex items-center gap-2 rounded-full border border-rule-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          <Mail aria-hidden="true" className="size-4" strokeWidth={1.75} />
          {hero.secondaryCta.label}
        </a>
      </div>

      <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
        {hero.social.map((link) => {
          const Icon = icons[link.icon as IconKey];
          return (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-ink-faint transition-colors hover:text-accent"
              >
                <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
