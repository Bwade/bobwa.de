import { ArrowUpRight } from 'lucide-react';
import { content } from '@/data/content';
import Section from './Section';
import TrackedLink from './TrackedLink';

export default function Work() {
  return (
    <Section id="work" eyebrow={content.work.heading}>
      <ul className="border-b border-rule">
        {content.work.items.map((item) => {
          const linked = Boolean(item.href);

          const body = (
            <div className="grid gap-x-10 gap-y-3 py-7 sm:grid-cols-[minmax(0,13rem)_1fr] sm:py-8">
              <h3 className="flex items-start gap-1.5 font-serif text-xl tracking-tight text-ink transition-colors group-hover:text-accent sm:text-2xl">
                {item.name}
                {linked && (
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    strokeWidth={1.75}
                  />
                )}
              </h3>

              <div>
                <p className="max-w-prose leading-relaxed text-ink-muted">{item.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-rule px-2.5 py-1 text-xs tracking-wide text-ink-faint"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );

          return (
            <li key={item.name} className="border-t border-rule">
              {linked ? (
                <TrackedLink
                  event="project_click"
                  eventProps={{ project: item.name }}
                  href={item.href as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  {body}
                </TrackedLink>
              ) : (
                <div className="group">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
