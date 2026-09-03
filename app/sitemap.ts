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

  const intentPages: MetadataRoute.Sitemap = seoIntentPages.map((page) => ({
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
