import { FileText } from 'lucide-react';
import { content } from '@/data/content';
import { icons, type IconKey } from './icons';

const { contact } = content;

export default function SiteFooter() {
  // Static export: this is evaluated once at build time, which is fine for a
  // copyright line. Rebuild yearly, or the deploy after New Year fixes it.
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-rule bg-paper-sunken"
    >
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <h2
          id="contact-heading"
          className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ink-faint"
        >
          {contact.heading}
        </h2>

        <p className="mt-8 max-w-2xl font-serif text-2xl leading-[1.45] text-ink sm:text-3xl">
          {contact.blurb}
        </p>

        <a
          href={`mailto:${contact.email}`}
          className="mt-8 inline-block border-b border-rule-strong pb-1 text-lg text-ink transition-colors hover:border-accent hover:text-accent sm:text-xl"
        >
          {contact.email}
        </a>

        <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
          {contact.links.map((link) => {
            const Icon = icons[link.icon as IconKey];
            const external = link.href.startsWith('http');
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent"
                >
                  <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-8">
          <p className="text-sm text-ink-faint">
            (c) {year} {contact.copyrightName}
          </p>
          <a
            href={contact.atsResume.href}
            download
            className="inline-flex items-center gap-1.5 text-sm text-ink-faint transition-colors hover:text-accent"
          >
            <FileText aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
            {contact.atsResume.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
