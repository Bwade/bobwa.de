'use client';

import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

/**
 * Deliberately stateless. The inline script in layout.tsx already put the right
 * class on <html> before first paint, and the sun/moon swap is pure CSS, so
 * there is no React state to get out of sync or to mismatch during hydration.
 */
export default function ThemeToggle() {
  // Keep following the OS until the visitor makes an explicit choice.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem('theme')) return;
      document.documentElement.classList.toggle('dark', event.matches);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  function toggle() {
    const nowDark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', nowDark);
    localStorage.setItem('theme', nowDark ? 'dark' : 'light');
    trackEvent('theme_change', { theme: nowDark ? 'dark' : 'light' });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-rule text-ink-muted transition-colors hover:border-rule-strong hover:text-ink"
    >
      <Sun aria-hidden="true" className="size-4 dark:hidden" strokeWidth={1.5} />
      <Moon aria-hidden="true" className="hidden size-4 dark:block" strokeWidth={1.5} />
    </button>
  );
}
