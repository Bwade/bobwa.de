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
      <h3 className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ink-faint">
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
      <ol className="border-b border-rule">
        {experience.roles.map((role) => (
          <li
            key={role.company + role.title}
            className="grid gap-x-10 gap-y-4 border-t border-rule py-9 sm:grid-cols-[minmax(0,13rem)_1fr] sm:py-11"
          >
            {/* Left rail: company and when. Sticks while the bullets scroll past. */}
            <div className="sm:sticky sm:top-24 sm:self-start">
              <h3 className="font-serif text-xl tracking-tight text-ink sm:text-2xl">
                {role.company}
              </h3>
              <p className="mt-1.5 text-sm text-ink-faint">{role.dates}</p>
              {role.location && <p className="text-sm text-ink-faint">{role.location}</p>}
            </div>

            <div>
              <p className="font-medium leading-snug text-ink">{role.title}</p>

              {role.summary && (
                <p className="mt-3 max-w-prose leading-relaxed text-ink-muted">{role.summary}</p>
              )}

              {role.groups?.map((group) => (
                <div key={group.label} className="mt-6">
                  {group.label && (
                    <h4 className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-accent">
                      {group.label}
                    </h4>
                  )}
                  <ul className="mt-3 space-y-2.5">
                    {group.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="relative max-w-prose pl-5 leading-relaxed text-ink-muted before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-rule-strong"
                      >
                        {bullet}
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

      <div className="mt-16 border-t border-rule pt-10">
        <h3 className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ink-faint">
          {toolkit.heading}
        </h3>
        <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {toolkit.groups.map((group) => (
            <div key={group.label} className="grid gap-1 sm:grid-cols-[minmax(0,10rem)_1fr]">
              <dt className="text-sm text-ink">{group.label}</dt>
              <dd className="text-sm leading-relaxed text-ink-muted">{group.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
