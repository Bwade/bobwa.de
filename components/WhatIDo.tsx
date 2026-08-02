import { content } from '@/data/content';
import Section from './Section';
import { icons } from './icons';

export default function WhatIDo() {
  return (
    <Section id="what-i-do" eyebrow={content.whatIDo.heading}>
      <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-2 sm:gap-y-14">
        {content.whatIDo.items.map((item) => {
          const Icon = icons[item.icon];
          return (
            <li key={item.title} className="border-rule border-t pt-6">
              <Icon aria-hidden="true" className="text-accent size-5" strokeWidth={1.5} />
              <h3 className="text-ink mt-4 font-serif text-xl tracking-tight sm:text-2xl">
                {item.title}
              </h3>
              <p className="text-ink-muted mt-3 max-w-prose leading-relaxed">{item.description}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
