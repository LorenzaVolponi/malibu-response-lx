import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: 'Malibu LX',
    description: `Landing page canônica para comprar ${siteConfig.listingName} com fotos reais, ficha técnica e contato direto.`,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0b1526',
    theme_color: '#0b1526',
    lang: 'pt-BR',
    categories: ['business', 'shopping', 'sports'],
    icons: [
      { src: '/images/hero-side.jpeg', sizes: '1600x900', type: 'image/jpeg', purpose: 'any' },
    ],
  }
}
