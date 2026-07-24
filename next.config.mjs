/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/guias/',
        destination: '/guias',
        permanent: true,
      },
      {
        source: '/dossie-tecnico/',
        destination: '/dossie-tecnico',
        permanent: true,
      },
      {
        source: '/comprar-barco-malibu-response-lx/',
        destination: '/comprar-barco-malibu-response-lx',
        permanent: true,
      },
    ]
  },
  async headers() {
    const indexableHeaders = [
      { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
    ]

    return [
      {
        source: '/((?!_next/|api/).*)',
        headers: indexableHeaders,
      },
      {
        source: '/_next/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, nosnippet' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' }],
      },
      {
        source: '/sitemap-images.xml',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' }],
      },
      {
        source: '/robots.txt',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' }],
      },
      {
        source: '/feed.xml',
        headers: [
          { key: 'Content-Type', value: 'application/rss+xml; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
      {
        source: '/boat.json',
        headers: [
          { key: 'Content-Type', value: 'application/json; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800' },
        ],
      },
      {
        source: '/llms.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800' },
        ],
      },
      {
        source: '/ai.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800' },
        ],
      },
    ]
  },
}

export default nextConfig
