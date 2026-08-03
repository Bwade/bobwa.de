import { content } from '@/data/content';
import Reveal from './Reveal';

const { experience, toolkit } = content;

function CompactList({
  label,
  items,
}: {
  label: string;
  items: readonly { title: string; company: string; dates: string }[];
}) {
  return (
    <div>
      <h3 className="ed-label text-ed-muted">{label}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.title + item.company} className="text-sm leading-snug">
            <span className="text-ed-ink">{item.title}</span>
            <span className="text-ed-ink/60">, {item.company}</span>
            {item.dates && <span className="text-ed-muted"> ({item.dates})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function EdExperience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="bg-ed-paper text-ed-ink ed-section px-6 sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 id="experience-heading" className="ed-label text-ed-muted">
            {experience.heading}
          </h2>
        </Reveal>

        <ol className="ed-section-body">
          {experience.roles.map((role) => (
            <Reveal
              as="li"
              key={role.company + role.title}
              className="border-ed-ink/25 grid gap-x-12 gap-y-6 border-t py-12 lg:grid-cols-[minmax(0,17rem)_1fr]"
            >
              <div className="lg:sticky lg:top-24 lg:self-start">
                <h3 className="ed-display text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.05]">
                  {role.company}
                </h3>
                <p className="text-ed-muted mt-3 text-sm">{role.dates}</p>
                {role.location && <p className="text-ed-muted text-sm">{role.location}</p>}
              </div>

              <div>
                <p className="text-ed-ink text-lg leading-snug font-medium">{role.title}</p>

                {role.summary && (
                  <p className="text-ed-ink/70 mt-4 max-w-prose leading-relaxed">{role.summary}</p>
                )}

                {role.groups?.map((group) => (
                  <div key={group.id} className="mt-8">
                    {group.label && <h4 className="ed-label text-ed-accent">{group.label}</h4>}
                    <ul className="mt-4 space-y-3">
                      {group.bullets.map((bullet) => (
                        <li
                          key={bullet.id}
                          className="text-ed-ink/70 before:bg-ed-ink/35 relative max-w-prose pl-6 leading-relaxed before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-3"
                        >
                          {bullet.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal
          stagger
          className="border-ed-ink/25 mt-16 grid gap-12 border-t pt-12 sm:grid-cols-3"
        >
          <CompactList label={experience.earlier.label} items={experience.earlier.roles} />
          <CompactList label={experience.education.label} items={experience.education.items} />
          <CompactList
            label={experience.certifications.label}
            items={experience.certifications.items}
          />
        </Reveal>

        <Reveal className="border-ed-ink/25 mt-20 border-t pt-12">
          <h3 className="ed-label text-ed-muted">{toolkit.heading}</h3>
          <dl className="mt-8 grid gap-x-12 gap-y-7 sm:grid-cols-2">
            {toolkit.groups.map((group) => (
              <div key={group.label} className="grid gap-1 sm:grid-cols-[minmax(0,11rem)_1fr]">
                <dt className="text-ed-ink text-sm">{group.label}</dt>
                <dd className="text-ed-ink/60 text-sm leading-relaxed">{group.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
