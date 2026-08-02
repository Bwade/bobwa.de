import { content } from '@/data/content';

export default function ImpactStrip() {
  return (
    <section aria-label="Impact by the numbers" className="border-rule bg-paper-sunken border-y">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-14">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-8">
          {content.impact.map((stat) => (
            <div
              key={stat.value + stat.label}
              // `dt` must precede `dd` in the markup; the visual order is flipped.
              // `justify-end` packs toward the top under column-reverse, so the
              // numbers stay on one line even when a label wraps.
              className="border-rule flex flex-col-reverse justify-end gap-1.5 border-t pt-5 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
            >
              <dt className="text-ink-muted text-sm leading-snug">{stat.label}</dt>
              <dd className="text-ink font-serif text-3xl leading-none tracking-tight sm:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
