import { cinematic, features, frames360, gallery, journey } from '@/lib/boat-data'
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
  const allImages = [
    ...gallery.map(({ src, alt }) => ({ src, alt })),
    ...features.map(({ image: src, alt }) => ({ src, alt })),
    ...journey.map(({ image: src, alt }) => ({ src, alt })),
    ...cinematic.map(({ image: src, alt }) => ({ src, alt })),
    ...frames360.map(({ src, alt }) => ({ src, alt })),
  ]

  const uniqueImages = Array.from(new Map(allImages.map((image) => [image.src, image])).values())

  const images = uniqueImages
    .map((image) => {
      const title = `${siteConfig.listingName} — ${image.alt}`
      const caption = `Fotografia publicada da embarcação anunciada: ${image.alt}.`

      return `
    <image:image>
      <image:loc>${escapeXml(`${siteConfig.url}${image.src}`)}</image:loc>
      <image:title>${escapeXml(title)}</image:title>
      <image:caption>${escapeXml(caption)}</image:caption>
    </image:image>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${escapeXml(siteConfig.url)}</loc>
    <lastmod>${escapeXml(siteConfig.updatedAt)}</lastmod>${images}
  </url>
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}
