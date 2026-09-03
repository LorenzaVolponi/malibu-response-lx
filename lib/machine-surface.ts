import { siteConfig } from '@/lib/site-config'

type MachineSurfaceOptions = {
  contentType: string
  canonical?: string
  etagKey: string
  robots?: string
  links?: string[]
  cacheControl?: string
}

export function machineSurfaceHeaders({
  contentType,
  canonical = siteConfig.url,
  etagKey,
  robots = 'noindex, follow',
  links = [],
  cacheControl = 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
}: MachineSurfaceOptions) {
  const lastModified = new Date(`${siteConfig.updatedAt}T12:00:00Z`).toUTCString()
  const linkValues = [`<${canonical}>; rel="canonical"`, ...links]

  return {
    'Content-Type': contentType,
    'Cache-Control': cacheControl,
    'Content-Language': 'pt-BR',
    'Last-Modified': lastModified,
    ETag: `W/"malibu-${etagKey}-${siteConfig.updatedAt}"`,
    'X-Robots-Tag': robots,
    Link: linkValues.join(', '),
  }
}
