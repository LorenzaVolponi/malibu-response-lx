import { INDEXABLE_GUIDE_SLUGS, SUPPORT_ONLY_GUIDE_SLUGS } from './lib/search-index-policy.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      { source: '/guias/', destination: '/guias', permanent: true },
      { source: '/dossie-tecnico/', destination: '/dossie-tecnico', permanent: true },
      { source: '/comprar-barco-malibu-response-lx/', destination: '/comprar-barco-malibu-response-lx', permanent: true },
    ]
  },
  async headers() {
    const indexableHeaders = [
      { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
    ]

    const supportOnlyHeaders = [
      { key: 'X-Robots-Tag', value: 'noindex, follow' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
    ]

    const machineHeaders = (contentType) => [
      { key: 'Content-Type', value: contentType },
      { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800' },
      { key: 'X-Robots-Tag', value: 'noindex, follow' },
    ]

    return [
      {
        // Child guides are classified explicitly below. All other human HTML
        // routes remain indexable by default.
        source: '/((?!_next/|api/|boat\\.json$|citation\\.json$|authority\\.json$|llms\\.txt$|ai\\.txt$|feed\\.xml$|guias/).*)',
        headers: indexableHeaders,
      },
      ...INDEXABLE_GUIDE_SLUGS.map((slug) => ({
        source: `/guias/${slug}`,
        headers: indexableHeaders,
      })),
      ...SUPPORT_ONLY_GUIDE_SLUGS.map((slug) => ({
        source: `/guias/${slug}`,
        headers: supportOnlyHeaders,
      })),
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value: '<https://malibu-response-lx.vercel.app/boat.json>; rel="alternate"; type="application/json", <https://malibu-response-lx.vercel.app/citation.json>; rel="describedby"; type="application/json", <https://malibu-response-lx.vercel.app/authority.json>; rel="describedby"; type="application/json", <https://malibu-response-lx.vercel.app/llms.txt>; rel="alternate"; type="text/plain", <https://malibu-response-lx.vercel.app/feed.xml>; rel="alternate"; type="application/rss+xml"',
          },
        ],
      },
      { source: '/_next/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }, { key: 'X-Content-Type-Options', value: 'nosniff' }] },
      { source: '/api/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, nosnippet' }, { key: 'X-Content-Type-Options', value: 'nosniff' }] },
      { source: '/sitemap.xml', headers: [{ key: 'Cache-Control', value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' }] },
      { source: '/sitemap-images.xml', headers: [{ key: 'Cache-Control', value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' }] },
      { source: '/robots.txt', headers: [{ key: 'Cache-Control', value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' }] },
      { source: '/feed.xml', headers: machineHeaders('application/rss+xml; charset=utf-8') },
      { source: '/boat.json', headers: machineHeaders('application/json; charset=utf-8') },
      { source: '/citation.json', headers: machineHeaders('application/json; charset=utf-8') },
      { source: '/authority.json', headers: machineHeaders('application/json; charset=utf-8') },
      { source: '/llms.txt', headers: machineHeaders('text/plain; charset=utf-8') },
      { source: '/ai.txt', headers: machineHeaders('text/plain; charset=utf-8') },
    ]
  },
}

export default nextConfig
