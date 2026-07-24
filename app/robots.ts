import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: ['Googlebot', 'Googlebot-Image', 'Bingbot'],
        allow: ['/', '/images/', '/_next/static/', '/_next/image'],
        disallow: ['/api/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot'],
        allow: [
          '/',
          '/llms.txt',
          '/ai.txt',
          '/boat.json',
          '/feed.xml',
          '/sitemap.xml',
          '/sitemap-images.xml',
          '/dossie-tecnico',
          '/comprar-barco-malibu-response-lx',
          '/guias',
          '/guias/',
          '/images/',
        ],
        disallow: ['/api/'],
      },
    ],
    sitemap: [
      `${siteConfig.url}/sitemap.xml`,
      `${siteConfig.url}/sitemap-images.xml`,
    ],
    host: siteConfig.url,
  }
}
