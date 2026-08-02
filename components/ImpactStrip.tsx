import { content } from '@/data/content';

export default function ImpactStrip() {
  return (
    <section aria-label="Impact by the numbers" className="border-y border-rule bg-paper-sunken">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-14">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-8">
          {content.impact.map((stat) => (
            <div
              key={stat.value + stat.label}
              // `dt` must precede `dd` in the markup; the visual order is flipped.
              // `justify-end` packs toward the top under column-reverse, so the
              // numbers stay on one line even when a label wraps.
              className="flex flex-col-reverse justify-end gap-1.5 border-t border-rule pt-5 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 sm:first:border-l-0 sm:first:pl-0"
            >
              <dt className="text-sm leading-snug text-ink-muted">{stat.label}</dt>
              <dd className="font-serif text-3xl leading-none tracking-tight text-ink sm:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
