'use client';

import { useEffect, useState } from 'react';
import { content } from '@/data/content';
import { BwMark } from '@/components/icons';
import { trackEvent } from '@/lib/analytics';

const { nav } = content;
const sectionIds = nav.links.map((link) => link.href.replace('#', ''));

/**
 * Floating nav that inverts over the dark panels.
 *
 * The panels alternate light and dark, so a fixed bar has to know which it is
 * sitting on. Rather than hardcode offsets, it reads the `data-panel` attribute
 * of whatever section is currently under the bar.
 */
export default function EdNav() {
  const [onDark, setOnDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const reported = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) return;

        setActive(visible.target.id);
        if (!reported.has(visible.target.id)) {
          reported.add(visible.target.id);
          trackEvent('section_view', { section: visible.target.id });
        }
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-panel]'));

    const onScroll = () => {
      // Sample just below the bar and see which panel owns that point.
      const probe = 34;
      let dark = false;
      for (const panel of panels) {
        const rect = panel.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) {
          dark = panel.dataset.panel === 'dark';
          break;
        }
      }
      setOnDark(dark);
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const tone = onDark ? 'text-ed-dark-ink' : 'text-ed-ink';
  const muted = onDark ? 'text-ed-dark-ink/70' : 'text-ed-muted';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        // Transparent over the hero, then an opaque bar so content never reads
        // through the links as it scrolls past.
        scrolled
          ? onDark
            ? 'bg-ed-dark/90 backdrop-blur-md'
            : 'bg-ed-paper/90 backdrop-blur-md'
          : ''
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6 sm:px-10"
      >
        {/* Mark only. The name stays in the DOM but visually hidden, so the
            link keeps its accessible name without a duplicate aria-label that
            could drift from the copy in data/content.ts. */}
        <a href="#top" className={`flex items-center transition-colors ${tone}`}>
          {/* The mark is wider than it is tall, so it is sized by height. */}
          <BwMark className="h-9 w-auto shrink-0" />
          <span className="sr-only">{nav.brand}</span>
        </a>

        <ul className="flex flex-1 items-center gap-5 text-xs sm:justify-end sm:gap-7 sm:text-sm">
          {nav.links.map((link) => {
            const id = link.href.replace('#', '');
            const isActive = active === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative py-1 transition-colors ${isActive ? tone : muted}`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-left transition-transform duration-300 ${
                      onDark ? 'bg-ed-accent-dark' : 'bg-ed-accent'
                    } ${isActive ? 'scale-x-100' : 'scale-x-0'}`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
