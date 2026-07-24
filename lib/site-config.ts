import { boat } from '@/lib/boat-data'

export const siteConfig = {
  name: 'Malibu Response LX',
  listingName: `${boat.brand} ${boat.model} ${boat.year}`,
  url: 'https://malibu-response-lx.vercel.app',
  guidePath: '/comprar-barco-malibu-response-lx',
  updatedAt: '2026-07-24',
  engineVideo: {
    url: 'https://www.youtube.com/watch?v=DvjVs6ifb7Y',
    embedUrl: 'https://www.youtube.com/embed/DvjVs6ifb7Y',
    thumbnailUrl: 'https://i.ytimg.com/vi/DvjVs6ifb7Y/hqdefault.jpg',
  },
} as const
