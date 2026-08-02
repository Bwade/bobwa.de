import { content } from '@/data/content';
import Section from './Section';
import { icons, type IconKey } from './icons';

export default function WhatIDo() {
  return (
    <Section id="what-i-do" eyebrow={content.whatIDo.heading}>
      <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-2 sm:gap-y-14">
        {content.whatIDo.items.map((item) => {
          const Icon = icons[item.icon as IconKey];
          return (
            <li key={item.title} className="border-t border-rule pt-6">
              <Icon aria-hidden="true" className="size-5 text-accent" strokeWidth={1.5} />
              <h3 className="mt-4 font-serif text-xl tracking-tight text-ink sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-prose leading-relaxed text-ink-muted">{item.description}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
