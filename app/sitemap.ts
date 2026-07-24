import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { seoIntentPages } from '@/lib/seo-pages'

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date(siteConfig.updatedAt)

  return [
    {
      url: siteConfig.url,
      lastModified: updatedAt,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}${siteConfig.guidePath}`,
      lastModified: updatedAt,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...seoIntentPages.map((page, index) => ({
      url: `${siteConfig.url}/guias/${page.slug}`,
      lastModified: updatedAt,
      changeFrequency: 'monthly' as const,
      priority: Math.max(0.72, 0.86 - index * 0.02),
    })),
  ]
}
