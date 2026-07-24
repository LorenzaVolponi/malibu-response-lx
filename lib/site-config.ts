import { boat } from '@/lib/boat-data'

const DEFAULT_SITE_URL = 'https://malibu-response-lx.vercel.app'
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')

export const siteConfig = {
  name: 'Malibu Response LX',
  listingName: `${boat.brand} ${boat.model} ${boat.year}`,
  url: configuredSiteUrl || DEFAULT_SITE_URL,
  guidePath: '/comprar-barco-malibu-response-lx',
  updatedAt: '2026-07-24',
  mobileCtaLabel: 'Vídeos + docs',
  searchConsoleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  bingVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
} as const
