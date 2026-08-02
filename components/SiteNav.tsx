'use client';

import { useEffect, useState } from 'react';
import { content } from '@/data/content';
import ThemeToggle from './ThemeToggle';

const { nav } = content;
const sectionIds = nav.links.map((link) => link.href.replace('#', ''));

export default function SiteNav() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      // Only count a section as active once it reaches the upper third.
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-paper/85 backdrop-blur-md transition-colors duration-300 ${
        scrolled ? 'border-rule' : 'border-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-5xl items-center gap-4 px-5 sm:px-8"
      >
        <a
          href="#top"
          className="hidden font-serif text-lg tracking-tight text-ink sm:block"
        >
          {nav.brand}
        </a>

        <ul className="flex flex-1 items-center gap-5 text-sm sm:justify-end sm:gap-7">
          {nav.links.map((link) => {
            const id = link.href.replace('#', '');
            const isActive = active === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative py-1 transition-colors ${
                    isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <ThemeToggle />
      </nav>
    </header>
  );
}
