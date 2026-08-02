import { FileText } from 'lucide-react';
import { content } from '@/data/content';
import { icons } from './icons';
import TrackedLink from './TrackedLink';

const { contact } = content;

export default function SiteFooter() {
  // Static export: this is evaluated once at build time, which is fine for a
  // copyright line. Rebuild yearly, or the deploy after New Year fixes it.
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="border-rule bg-paper-sunken border-t"
    >
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <h2
          id="contact-heading"
          className="text-ink-faint text-[0.7rem] font-medium tracking-[0.2em] uppercase"
        >
          {contact.heading}
        </h2>

        <p className="text-ink mt-8 max-w-2xl font-serif text-2xl leading-[1.45] sm:text-3xl">
          {contact.blurb}
        </p>

        <TrackedLink
          event="email_click"
          eventProps={{ location: 'footer' }}
          href={`mailto:${contact.email}`}
          className="border-rule-strong text-ink hover:border-accent hover:text-accent mt-8 inline-block border-b pb-1 text-lg transition-colors sm:text-xl"
        >
          {contact.email}
        </TrackedLink>

        <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
          {contact.links.map((link) => {
            const Icon = icons[link.icon];
            const external = link.href.startsWith('http');
            const shared = {
              href: link.href,
              ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
              className:
                'inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent',
              children: (
                <>
                  <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
                  {link.label}
                </>
              ),
            };
            return (
              <li key={link.href}>
                {link.icon === 'mail' ? (
                  <TrackedLink
                    event="email_click"
                    eventProps={{ location: 'footer' }}
                    {...shared}
                  />
                ) : (
                  <TrackedLink
                    event="social_click"
                    eventProps={{ network: link.icon, location: 'footer' }}
                    {...shared}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="border-rule mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-8">
          <p className="text-ink-faint text-sm">
            (c) {year} {contact.copyrightName}
          </p>
          <TrackedLink
            event="resume_download"
            eventProps={{ variant: 'ats', location: 'footer' }}
            href={contact.atsResume.href}
            download
            className="text-ink-faint hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
          >
            <FileText aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
            {contact.atsResume.label}
          </TrackedLink>
        </div>
      </div>
    </footer>
  );
}
