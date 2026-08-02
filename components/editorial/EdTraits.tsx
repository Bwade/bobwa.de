'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { content } from '@/data/content';

const { traits, hero } = content;

/**
 * A tall section with a sticky, full-height portrait. Three sentinels, one per
 * viewport of scroll, decide which word is showing, so the words cross-fade as
 * you move rather than animating on a timer.
 *
 * Every word is in the DOM the whole time and only opacity changes, so the text
 * is present for search engines and screen readers regardless of scroll state.
 */
export default function EdTraits() {
  const [active, setActive] = useState(0);
  const sentinels = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(index)) setActive(index);
        }
      },
      // Fire when a sentinel crosses the middle of the screen.
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    );

    for (const node of sentinels.current) {
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="traits-heading"
      className="bg-ed-dark text-ed-dark-ink relative"
      // One viewport of scroll per word.
      style={{ height: `${traits.items.length * 100}vh` }}
    >
      <h2 id="traits-heading" className="sr-only">
        {traits.label}
      </h2>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Image
          src="/bob-mono.jpg"
          alt={hero.portrait.alt}
          fill
          sizes="100vw"
          className="object-cover object-[58%_center]"
          priority={false}
        />

        {/* The asset already fades to black on the left. This is a gentle second
            pass so the word stays legible at any crop, including narrow
            viewports where the baked black field gets cropped away. */}
        <div
          aria-hidden="true"
          className="from-ed-dark via-ed-dark/45 absolute inset-0 bg-gradient-to-r to-transparent"
        />

        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-center px-6 sm:px-10">
          <p className="ed-label text-ed-accent-dark">{traits.label}</p>

          <div className="relative mt-5 h-[clamp(3.5rem,11vw,9rem)]">
            {traits.items.map((item, index) => (
              <span
                key={item.word}
                aria-hidden={active === index ? undefined : 'true'}
                className={`ed-display absolute inset-0 text-[clamp(3rem,10vw,8.5rem)] leading-[0.9] transition-[opacity,transform] duration-700 ease-out ${
                  active === index
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-3 opacity-0'
                }`}
              >
                {item.word}
              </span>
            ))}
          </div>

          <div className="relative mt-8 h-32 max-w-xl sm:h-28">
            {traits.items.map((item, index) => (
              <p
                key={item.word}
                aria-hidden={active === index ? undefined : 'true'}
                className={`text-ed-dark-ink/75 absolute inset-0 text-base leading-relaxed transition-opacity duration-700 sm:text-lg ${
                  active === index ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
                {item.line}
              </p>
            ))}
          </div>

          {/* Progress ticks. Decorative: the words themselves carry the meaning. */}
          <ol aria-hidden="true" className="mt-10 flex gap-2">
            {traits.items.map((item, index) => (
              <li
                key={item.word}
                className={`h-px w-10 transition-colors duration-500 ${
                  active === index ? 'bg-ed-accent-dark' : 'bg-ed-rule-dark'
                }`}
              />
            ))}
          </ol>
        </div>
      </div>

      {/* Scroll sentinels, stacked behind the sticky layer. */}
      <div className="absolute inset-0 -z-10">
        {traits.items.map((item, index) => (
          <div
            key={item.word}
            data-index={index}
            ref={(node) => {
              sentinels.current[index] = node;
            }}
            className="h-screen w-full"
          />
        ))}
      </div>
    </section>
  );
}
