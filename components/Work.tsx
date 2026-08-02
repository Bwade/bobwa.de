import { ArrowUpRight } from 'lucide-react';
import { content } from '@/data/content';
import Section from './Section';
import TrackedLink from './TrackedLink';

export default function Work() {
  return (
    <Section id="work" eyebrow={content.work.heading}>
      <ul className="border-rule border-b">
        {content.work.items.map((item) => {
          // Bind to a local so TypeScript narrows it inside the JSX below.
          // `Boolean(item.href)` would not narrow, and would need a cast.
          const href = item.href ?? null;

          const body = (
            <div className="grid gap-x-10 gap-y-3 py-7 sm:grid-cols-[minmax(0,13rem)_1fr] sm:py-8">
              <h3 className="text-ink group-hover:text-accent flex items-start gap-1.5 font-serif text-xl tracking-tight transition-colors sm:text-2xl">
                {item.name}
                {href && (
                  <ArrowUpRight
                    aria-hidden="true"
                    className="text-ink-faint group-hover:text-accent mt-0.5 size-4 shrink-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                  />
                )}
              </h3>

              <div>
                <p className="text-ink-muted max-w-prose leading-relaxed">{item.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border-rule text-ink-faint rounded-full border px-2.5 py-1 text-xs tracking-wide"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );

          return (
            <li key={item.name} className="border-rule border-t">
              {href ? (
                <TrackedLink
                  event="project_click"
                  eventProps={{ project: item.name }}
                  href={href}
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
