import { ArrowUpRight } from 'lucide-react';
import { content } from '@/data/content';
import TrackedLink from '@/components/TrackedLink';
import Reveal from './Reveal';

export default function EdWork() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-ed-dark text-ed-dark-ink px-6 py-28 sm:px-10 sm:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 id="work-heading" className="ed-label text-ed-accent-dark">
            {content.work.heading}
          </h2>
        </Reveal>

        <ul className="mt-14">
          {content.work.items.map((item) => {
            const href = item.href ?? null;

            const body = (
              <div className="grid gap-x-12 gap-y-4 py-10 lg:grid-cols-[minmax(0,17rem)_1fr]">
                <h3 className="ed-display group-hover:text-ed-accent-dark flex items-start gap-2 text-[clamp(1.6rem,3vw,2.4rem)] transition-colors">
                  {item.name}
                  {href && (
                    <ArrowUpRight
                      aria-hidden="true"
                      className="text-ed-dark-ink/40 group-hover:text-ed-accent-dark mt-1 size-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      strokeWidth={1.5}
                    />
                  )}
                </h3>

                <div>
                  <p className="text-ed-dark-ink/65 max-w-prose leading-relaxed">
                    {item.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border-ed-rule-dark text-ed-dark-ink/55 border px-3 py-1 text-xs tracking-wide"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );

            return (
              <Reveal as="li" key={item.name} className="border-ed-rule-dark border-t">
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
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
