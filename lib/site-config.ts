import { boat } from '@/lib/boat-data'

/**
 * Single source of truth for every canonical, sitemap, structured-data and AI citation URL.
 * Do not replace this with Vercel preview URLs or environment-dependent hosts.
 */
export const CANONICAL_SITE_URL = 'https://malibu-response-lx.vercel.app'

export const siteConfig = {
  name: 'Malibu Response LX',
  listingName: `${boat.brand} ${boat.model} ${boat.year}`,
  url: CANONICAL_SITE_URL,
  guidePath: '/comprar-barco-malibu-response-lx',
  updatedAt: '2026-09-03',
  mobileCtaLabel: `Tenho interesse · ${boat.priceLabel}`,
  searchConsoleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  bingVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
  engineVideo: {
    url: 'https://www.youtube.com/watch?v=DvjVs6ifb7Y',
    embedUrl: 'https://www.youtube.com/embed/DvjVs6ifb7Y',
    thumbnailUrl: 'https://i.ytimg.com/vi/DvjVs6ifb7Y/hqdefault.jpg',
  },
} as const
