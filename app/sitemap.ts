import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { seoIntentPages } from '@/lib/seo-pages'

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date(siteConfig.updatedAt)

  const corePages: MetadataRoute.Sitemap = [
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
      priority: 0.92,
    },
    {
      url: `${siteConfig.url}/dossie-tecnico`,
      lastModified: updatedAt,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  const intentPages: MetadataRoute.Sitemap = seoIntentPages.map((page, index) => ({
    url: `${siteConfig.url}/guias/${page.slug}`,
    lastModified: updatedAt,
    changeFrequency: 'monthly' as const,
    priority: Math.max(0.7, 0.88 - index * 0.015),
  }))

  return [...corePages, ...intentPages]
}
