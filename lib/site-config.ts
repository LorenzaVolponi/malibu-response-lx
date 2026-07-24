import { boat } from '@/lib/boat-data'

const DEFAULT_SITE_URL = 'https://malibu-response-lx.vercel.app'
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')

export const siteConfig = {
  name: 'Malibu Response LX',
  listingName: `${boat.brand} ${boat.model} ${boat.year}`,
  url: configuredSiteUrl || DEFAULT_SITE_URL,
  guidePath: '/comprar-barco-malibu-response-lx',
  updatedAt: '2026-07-24',
  engineVideo: {
    url: 'https://www.youtube.com/watch?v=DvjVs6ifb7Y',
    embedUrl: 'https://www.youtube.com/embed/DvjVs6ifb7Y',
    thumbnailUrl: 'https://i.ytimg.com/vi/DvjVs6ifb7Y/hqdefault.jpg',
  },
} as const
