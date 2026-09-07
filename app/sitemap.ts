import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { seoIntentPages } from '@/lib/seo-pages'
import { isIndexableGuideSlug } from '@/lib/search-index-policy.mjs'

// Search policy can change independently of page content. Next.js caches
// sitemap.ts metadata routes by default, so render this route on demand to
// prevent a previous release's URL set from surviving a production deploy.
export const revalidate = 0

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
