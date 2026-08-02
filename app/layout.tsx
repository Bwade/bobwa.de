import type { Metadata } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import ConsentBanner from '@/components/ConsentBanner';
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
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    // Safari ignores SVG here, so the touch icon is a rasterised copy.
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

// The editorial variant commits to one palette: alternating light and near-black
// panels are the design. There is no theme toggle here, so no no-flash script.

/**
 * Google Consent Mode v2 defaults. Runs before the GA tag, denying every
 * storage type, so GA sets no cookies until ConsentBanner grants permission.
 * A previously stored "granted" choice is reapplied here so returning visitors
 * are not asked twice.
 */
const consentDefaults = `
(function(){
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  window.gtag=window.gtag||gtag;
  gtag('consent','default',{
    ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',
    analytics_storage:'denied',wait_for_update:500
  });
  try{
    if(localStorage.getItem('analytics-consent')==='granted'){
      gtag('consent','update',{analytics_storage:'granted'});
    }
  }catch(e){}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable} h-full`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: consentDefaults }} />
      </head>
      <body className="bg-ed-paper flex min-h-full flex-col">
        {children}
        <ConsentBanner />
        {/* Cookieless and first party, so these need no consent and carry no
            third party script domain. Served from /_vercel/* by the platform. */}
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
