import type { MetadataRoute } from 'next';
import { content } from '@/data/content';

/** Emitted as a static /robots.txt at build time. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${content.site.url}/sitemap.xml`,
  };
}

// Required by `output: export`. Render this once at build time.
export const dynamic = 'force-static';
