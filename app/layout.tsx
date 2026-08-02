import type { Metadata } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { content } from '@/data/content';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  display: 'swap',
  // Display serif: we only ever set it large, so skip the optical sizes we
  // never render.
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

const { site } = content;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.title,
  authors: [{ name: content.hero.name, url: site.url }],
  creator: content.hero.name,
  keywords: [
    'engineering manager',
    'platform engineering',
    'partner integrations',
    'engineering leadership',
    content.hero.name,
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.title,
    title: site.title,
    description: site.description,
    locale: site.locale,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${content.hero.name}, ${content.hero.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    // TODO: swap public/icon.svg for real artwork if you want something custom.
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/icon.svg',
  },
};

/**
 * Applies the stored (or system) theme before first paint so the page never
 * flashes the wrong background. Kept tiny and inline on purpose.
 */
const noFlashTheme = `
(function(){try{
  var s=localStorage.getItem('theme');
  var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark',d);
}catch(e){}})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${newsreader.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashTheme }} />
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        {/* Cookieless and first party, so no consent banner and no third party
            script domain. Both are served from /_vercel/* by the platform. */}
        <Analytics />
        <SpeedInsights />
        {/* GA4, loaded after hydration by next/third-parties so it does not
            block the first paint. Custom events are mirrored here from
            lib/analytics.ts. Unlike the two above, this one sets cookies. */}
        {site.gaMeasurementId && <GoogleAnalytics gaId={site.gaMeasurementId} />}
      </body>
    </html>
  );
}
