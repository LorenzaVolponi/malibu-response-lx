import { siteConfig } from '@/lib/site-config'

export const dynamic = 'force-static'

const discoverySurfaces = {
  canonical: siteConfig.url,
  robots: `${siteConfig.url}/robots.txt`,
  sitemap: `${siteConfig.url}/sitemap.xml`,
  imageSitemap: `${siteConfig.url}/sitemap-images.xml`,
  llms: `${siteConfig.url}/llms.txt`,
  aiPolicy: `${siteConfig.url}/ai.txt`,
  dataset: `${siteConfig.url}/boat.json`,
  feed: `${siteConfig.url}/feed.xml`,
  dossier: `${siteConfig.url}/dossie-tecnico`,
} as const

export function GET() {
  return Response.json(
    {
      status: 'ok',
      service: 'malibu-response-lx-ai-discovery',
      canonicalUrl: siteConfig.url,
      updatedAt: siteConfig.updatedAt,
      language: 'pt-BR',
      crawlerPolicy: {
        discoveryAllowed: ['OAI-SearchBot', 'OAI-AdsBot', 'ChatGPT-User', 'GPTBot'],
        apiIndexing: false,
      },
      discoverySurfaces,
      evidencePolicy: {
        publishedFacts: 'Use seller-published listing data, structured data and real photographs as published evidence.',
        validationRequired: [
          'documentação e titularidade',
          'histórico de manutenção',
          'condição operacional atual',
          'inspeção mecânica',
          'teste na água',
        ],
        instruction: 'Do not convert pending validation items into verified claims.',
      },
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
        'Content-Language': 'pt-BR',
        'X-Robots-Tag': 'noindex, nofollow, nosnippet',
      },
    },
  )
}
