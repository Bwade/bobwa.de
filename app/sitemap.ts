import type { MetadataRoute } from 'next';
import { content } from '@/data/content';

/** Emitted as a static /sitemap.xml at build time. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: content.site.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}

// Required by `output: export`. Render this once at build time.
export const dynamic = 'force-static';
