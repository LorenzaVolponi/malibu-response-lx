import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/images/', '/llms.txt', '/ai.txt', '/boat.json'],
        disallow: ['/api/', '/_next/static/chunks/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/images/', '/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot'],
        allow: ['/', '/llms.txt', '/ai.txt', '/boat.json', '/dossie-tecnico', '/guias/'],
      },
    ],
    sitemap: [
      `${siteConfig.url}/sitemap.xml`,
      `${siteConfig.url}/sitemap-images.xml`,
    ],
    host: siteConfig.url,
  }
}
