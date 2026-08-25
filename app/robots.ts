import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

const aiDiscoveryPaths = [
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
]

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
        userAgent: ['OAI-SearchBot', 'OAI-AdsBot', 'ChatGPT-User'],
        allow: aiDiscoveryPaths,
        disallow: ['/api/'],
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot'],
        allow: aiDiscoveryPaths,
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
