import { content } from '@/data/content';
import Section from './Section';

const { experience, toolkit } = content;

/** Compact "title, company, dates" line used by Earlier / Education / Certifications. */
function CompactList({
  label,
  items,
}: {
  label: string;
  items: readonly { title: string; company: string; dates: string }[];
}) {
  return (
    <div>
      <h3 className="text-ink-faint text-[0.7rem] font-medium tracking-[0.2em] uppercase">
        {label}
      </h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.title + item.company} className="text-sm leading-snug">
            <span className="text-ink">{item.title}</span>
            <span className="text-ink-muted">, {item.company}</span>
            {item.dates && <span className="text-ink-faint"> ({item.dates})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience() {
  return (
    <Section id="experience" eyebrow={experience.heading}>
      <ol className="border-rule border-b">
        {experience.roles.map((role) => (
          <li
            key={role.company + role.title}
            className="border-rule grid gap-x-10 gap-y-4 border-t py-9 sm:grid-cols-[minmax(0,13rem)_1fr] sm:py-11"
          >
            {/* Left rail: company and when. Sticks while the bullets scroll past. */}
            <div className="sm:sticky sm:top-24 sm:self-start">
              <h3 className="text-ink font-serif text-xl tracking-tight sm:text-2xl">
                {role.company}
              </h3>
              <p className="text-ink-faint mt-1.5 text-sm">{role.dates}</p>
              {role.location && <p className="text-ink-faint text-sm">{role.location}</p>}
            </div>

            <div>
              <p className="text-ink leading-snug font-medium">{role.title}</p>

              {role.summary && (
                <p className="text-ink-muted mt-3 max-w-prose leading-relaxed">{role.summary}</p>
              )}

              {role.groups?.map((group) => (
                <div key={group.id} className="mt-6">
                  {group.label && (
                    <h4 className="text-accent text-[0.7rem] font-medium tracking-[0.16em] uppercase">
                      {group.label}
                    </h4>
                  )}
                  <ul className="mt-3 space-y-2.5">
                    {group.bullets.map((bullet) => (
                      <li
                        key={bullet.id}
                        className="text-ink-muted before:bg-rule-strong relative max-w-prose pl-5 leading-relaxed before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2.5"
                      >
                        {bullet.text}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-14 grid gap-10 sm:grid-cols-3">
        <CompactList label={experience.earlier.label} items={experience.earlier.roles} />
        <CompactList label={experience.education.label} items={experience.education.items} />
        <CompactList
          label={experience.certifications.label}
          items={experience.certifications.items}
        />
      </div>

      <div className="border-rule mt-16 border-t pt-10">
        <h3 className="text-ink-faint text-[0.7rem] font-medium tracking-[0.2em] uppercase">
          {toolkit.heading}
        </h3>
        <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {toolkit.groups.map((group) => (
            <div key={group.label} className="grid gap-1 sm:grid-cols-[minmax(0,10rem)_1fr]">
              <dt className="text-ink text-sm">{group.label}</dt>
              <dd className="text-ink-muted text-sm leading-relaxed">{group.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
