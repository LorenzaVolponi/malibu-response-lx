import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { seoIntentPages } from '@/lib/seo-pages'
import { isIndexableGuideSlug } from '@/lib/search-index-policy.mjs'

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
      priority: 0.95,
    },
    {
      url: `${siteConfig.url}/dossie-tecnico`,
      lastModified: updatedAt,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/guias`,
      lastModified: updatedAt,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  const intentPages: MetadataRoute.Sitemap = seoIntentPages
    .filter((page) => isIndexableGuideSlug(page.slug))
    .map((page) => ({
      url: `${siteConfig.url}/guias/${page.slug}`,
      lastModified: updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  // Search indexing is deliberately curated: only guides with strong,
  // unit-relevant buyer value are listed here. Support-only guides remain
  // accessible and followable but are excluded from the human search sitemap.
  // Machine-readable discovery surfaces are also intentionally excluded.
  return [...corePages, ...intentPages]
}
