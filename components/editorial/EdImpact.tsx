import { content } from '@/data/content';
import Reveal from './Reveal';

export default function EdImpact() {
  return (
    <section
      aria-label="Impact by the numbers"
      className="bg-ed-paper text-ed-ink ed-section px-6 sm:px-10"
    >
      <Reveal
        stagger
        className="mx-auto grid max-w-6xl gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
      >
        {content.impact.map((stat) => (
          <div key={stat.value} className="border-ed-ink border-t pt-6">
            <p className="ed-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.95]">{stat.value}</p>
            <p className="text-ed-ink/60 mt-3 text-sm leading-snug">{stat.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
