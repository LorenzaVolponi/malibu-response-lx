import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { seoIntentPages } from '@/lib/seo-pages'


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
    ...seoIntentPages.map((page) => ({
      url: `${siteConfig.url}/guias/${page.slug}`,
      lastModified: new Date(siteConfig.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: page.priority,
    })),
  ]
}
