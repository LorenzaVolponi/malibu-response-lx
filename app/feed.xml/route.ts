import { seoIntentPages } from '@/lib/seo-pages'
import { siteConfig } from '@/lib/site-config'

export const dynamic = 'force-static'

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export function GET() {
  const items = seoIntentPages.map((page) => {
    const url = `${siteConfig.url}/guias/${page.slug}`

    return `
    <item>
      <title>${escapeXml(page.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(page.description)}</description>
      <pubDate>${new Date(siteConfig.updatedAt).toUTCString()}</pubDate>
    </item>`
  }).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${siteConfig.name} — Guias`)}</title>
    <link>${escapeXml(`${siteConfig.url}/guias`)}</link>
    <description>${escapeXml('Guias técnicos sobre Malibu Response LX, direct drive, Zero Off GPS, motor Indmar e compra segura de lancha usada.')}</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date(siteConfig.updatedAt).toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(`${siteConfig.url}/feed.xml`)}" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}
