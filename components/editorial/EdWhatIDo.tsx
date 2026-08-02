import { content } from '@/data/content';
import { icons } from '@/components/icons';
import Reveal from './Reveal';

export default function EdWhatIDo() {
  return (
    <section
      id="what-i-do"
      aria-labelledby="what-i-do-heading"
      className="bg-ed-dark text-ed-dark-ink ed-section px-6 sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 id="what-i-do-heading" className="ed-label text-ed-accent-dark">
            {content.whatIDo.heading}
          </h2>
        </Reveal>

        <Reveal stagger className="ed-section-body grid gap-x-14 gap-y-16 sm:grid-cols-2">
          {content.whatIDo.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <div key={item.title} className="border-ed-rule-dark border-t pt-7">
                <Icon aria-hidden="true" className="text-ed-accent-dark size-5" strokeWidth={1.5} />
                <h3 className="ed-display mt-5 text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.15]">
                  {item.title}
                </h3>
                <p className="text-ed-dark-ink/65 mt-4 max-w-prose leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
