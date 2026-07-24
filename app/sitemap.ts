import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'


export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(siteConfig.updatedAt),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}${siteConfig.guidePath}`,
      lastModified: new Date(siteConfig.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]
}
