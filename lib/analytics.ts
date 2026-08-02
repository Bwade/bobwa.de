import { track } from '@vercel/analytics';

declare global {
  interface Window {
    /** Present only once the GA4 tag has loaded. */
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

/**
 * Every custom event the site can emit, and the shape of its properties.
 *
 * Keeping the map here means event names are autocompleted and typo-proof at
 * the call site, and there is one place to look to know what the site reports.
 * Vercel Web Analytics only accepts string, number, boolean, or null values,
 * and GA4 is happy with the same, so one shape serves both.
 */
export type EventMap = {
  /** Someone pulled down a copy of the resume. */
  resume_download: { variant: 'designed' | 'ats'; location: 'hero' | 'footer' };
  /** Clicked a mailto link. The strongest intent signal on the page. */
  email_click: { location: 'hero' | 'footer' };
  /** Clicked out to a profile. */
  social_click: { network: string; location: 'hero' | 'footer' };
  /** Clicked through to a project in Selected work. */
  project_click: { project: string };
  /** Flipped the theme. Tells you whether the dark palette earns its keep. */
  theme_change: { theme: 'dark' | 'light' };
  /** A section scrolled into view. Fires at most once per page load. */
  section_view: { section: string };
};

export type EventName = keyof EventMap;
export type EventProps<K extends EventName> = EventMap[K];

/**
 * Reports to both analytics backends from one call.
 *
 * Vercel Web Analytics is the cookieless first-party one; GA4 is the second
 * opinion. GA is addressed through `window.gtag` rather than an import so that
 * removing the tag (set site.gaMeasurementId to null) needs no code change:
 * the guard simply stops finding it.
 */
export function trackEvent<K extends EventName>(name: K, props: EventProps<K>) {
  track(name, props);

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, props);
  }
}
