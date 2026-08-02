'use client';

import { useEffect, useRef } from 'react';
import { content } from '@/data/content';

const STORAGE_KEY = 'analytics-consent';

/**
 * Cookie consent for Google Analytics.
 *
 * Consent Mode v2 does the real work: an inline script in layout.tsx denies
 * every storage type before the GA tag loads, so GA sets no cookies unless
 * someone accepts here. Declining is therefore not a special case, it is simply
 * the state the page already starts in.
 *
 * Deliberately stateless. Visibility is toggled through a ref rather than React
 * state so the markup is identical on server and client, with nothing to
 * hydrate-mismatch and no setState inside an effect.
 */
export default function ConsentBanner() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY) && ref.current) {
        ref.current.hidden = false;
      }
    } catch {
      // Storage blocked. Stay hidden, consent stays denied.
    }
  }, []);

  // GA disabled means nothing to ask about: the Vercel analytics is cookieless.
  if (!content.site.gaMeasurementId) return null;

  function decide(granted: boolean) {
    try {
      localStorage.setItem(STORAGE_KEY, granted ? 'granted' : 'denied');
    } catch {
      // Failing to remember the choice is survivable; ignoring it now is not.
    }
    if (granted) {
      window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    }
    if (ref.current) ref.current.hidden = true;
  }

  return (
    <div
      ref={ref}
      hidden
      role="dialog"
      aria-label={content.consent.ariaLabel}
      className="border-rule bg-paper-raised fixed inset-x-3 bottom-3 z-90 rounded-lg border p-4 shadow-lg sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-sm sm:p-5"
    >
      <p className="text-ink-muted text-sm leading-relaxed">{content.consent.message}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => decide(true)}
          className="bg-accent text-paper-raised hover:bg-accent-strong rounded-full px-4 py-2 text-sm font-medium transition-colors dark:text-[#0f1214]"
        >
          {content.consent.accept}
        </button>
        <button
          type="button"
          onClick={() => decide(false)}
          className="border-rule-strong text-ink hover:border-accent hover:text-accent rounded-full border px-4 py-2 text-sm font-medium transition-colors"
        >
          {content.consent.decline}
        </button>
      </div>
    </div>
  );
}
