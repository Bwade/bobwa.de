'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { content } from '@/data/content';

const { changes } = content;

/**
 * A tall section with a sticky, full-height panel. One sentinel per viewport of
 * scroll decides which entry is showing, so they cross-fade as you move rather
 * than animating on a timer.
 *
 * Each entry is a before and an after rather than an adjective: what the area
 * looked like on arrival, and what it looked like afterwards. Outcomes are
 * checkable, character claims are not.
 *
 * Every entry stays in the DOM and only opacity changes, so all the text is
 * present for search engines and screen readers regardless of scroll state.
 */
export default function EdChanges() {
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
      aria-labelledby="changes-heading"
      className="bg-ed-dark text-ed-dark-ink relative"
      // One viewport of scroll per entry.
      style={{ height: `${changes.items.length * 100}vh` }}
    >
      <h2 id="changes-heading" className="sr-only">
        {changes.label}
      </h2>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Generated backdrop: traffic traces ramping through a peak and
            settling back to baseline. It is the work being described, not a
            decoration, and it fades to black on the left for the display type. */}
        <Image
          src="/signal.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="from-ed-dark via-ed-dark/60 absolute inset-0 bg-gradient-to-r to-transparent"
        />

        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-center px-6 sm:px-10">
          <p className="ed-label text-ed-accent-dark">{changes.label}</p>

          <div className="relative mt-5 h-[clamp(3rem,8vw,6.5rem)]">
            {changes.items.map((item, index) => (
              <span
                key={item.area}
                aria-hidden={active === index ? undefined : 'true'}
                className={`ed-display absolute inset-0 text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] transition-[opacity,transform] duration-700 ease-out ${
                  active === index
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-3 opacity-0'
                }`}
              >
                {item.area}
              </span>
            ))}
          </div>

          <div className="relative mt-10 h-64 max-w-2xl sm:h-56">
            {changes.items.map((item, index) => (
              <div
                key={item.area}
                aria-hidden={active === index ? undefined : 'true'}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  active === index ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
                <p className="text-ed-dark-ink/65 max-w-xl text-base leading-relaxed sm:text-lg">
                  {item.before}
                </p>
                <p className="text-ed-dark-ink border-ed-accent-dark mt-5 max-w-xl border-l-2 pl-5 text-base leading-relaxed sm:text-lg">
                  {item.after}
                </p>
              </div>
            ))}
          </div>

          {/* Progress ticks. Decorative: the entries carry the meaning. */}
          <ol aria-hidden="true" className="mt-10 flex gap-2">
            {changes.items.map((item, index) => (
              <li
                key={item.area}
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
        {changes.items.map((item, index) => (
          <div
            key={item.area}
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
