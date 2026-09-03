import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { seoIntentPages } from '@/lib/seo-pages'

const SUPPORT_ONLY_GUIDE_SLUGS = new Set([
  // The canonical homepage is the primary commercial target for the exact
  // "Malibu Response LX à venda" intent. This guide remains accessible as
  // supporting content but is intentionally kept out of the search sitemap.
  'malibu-response-lx-a-venda',
])

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
    .filter((page) => !SUPPORT_ONLY_GUIDE_SLUGS.has(page.slug))
    .map((page) => ({
      url: `${siteConfig.url}/guias/${page.slug}`,
      lastModified: updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  // Machine-readable discovery surfaces are intentionally excluded from the
  // human search sitemap. They are advertised through robots.txt and HTTP Link
  // headers and carry noindex directives so they support GEO without competing
  // with the buyer-facing HTML pages in search results.
  return [...corePages, ...intentPages]
}
