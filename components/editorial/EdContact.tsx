import { FileText } from 'lucide-react';
import { content } from '@/data/content';
import { icons } from '@/components/icons';
import TrackedLink from '@/components/TrackedLink';
import Reveal from './Reveal';

const { contact } = content;

export default function EdContact() {
  // Static export: evaluated once at build time, which is fine for a copyright.
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-ed-paper text-ed-ink flex min-h-screen flex-col justify-between px-6 pt-28 pb-10 sm:px-10 sm:pt-36"
    >
      <Reveal className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center">
        <h2 id="contact-heading" className="ed-label text-ed-muted">
          {contact.heading}
        </h2>

        <p className="ed-display mt-10 max-w-4xl text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.2]">
          {contact.blurb}
        </p>

        <TrackedLink
          event="email_click"
          eventProps={{ location: 'footer' }}
          href={`mailto:${contact.email}`}
          className="ed-display border-ed-ink hover:border-ed-accent hover:text-ed-accent mt-12 inline-block w-fit border-b-2 pb-2 text-[clamp(1.5rem,4vw,3rem)] transition-colors"
        >
          {contact.email}
        </TrackedLink>
      </Reveal>

      <div className="border-ed-rule mx-auto mt-16 w-full max-w-6xl border-t pt-7">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {contact.links.map((link) => {
              const Icon = icons[link.icon];
              const external = link.href.startsWith('http');
              const shared = {
                href: link.href,
                ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
                className:
                  'inline-flex items-center gap-1.5 text-sm text-ed-ink/60 transition-colors hover:text-ed-accent',
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

          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <TrackedLink
              event="resume_download"
              eventProps={{ variant: 'ats', location: 'footer' }}
              href={contact.atsResume.href}
              download
              className="text-ed-ink/60 hover:text-ed-accent inline-flex items-center gap-1.5 text-sm transition-colors"
            >
              <FileText aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
              {contact.atsResume.label}
            </TrackedLink>
            <p className="text-ed-muted text-sm">
              (c) {year} {contact.copyrightName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
