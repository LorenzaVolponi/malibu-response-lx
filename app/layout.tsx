import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { siteConfig } from '@/lib/site-config'
import { boat } from '@/lib/boat-data'
import './globals.css'
import { WhatsAppClickTracker } from '@/components/whatsapp-click-tracker'
import { AnalyticsTags } from '@/components/analytics-tags'
import { ConversionEventTracker } from '@/components/conversion-event-tracker'


export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Comprar Barco ${siteConfig.listingName} | Lancha V8 350HP à Venda`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    `Comprar barco ${siteConfig.listingName} à venda no Brasil por ${boat.priceLabel}. Lancha de esqui/wakeboard com ${boat.engineHours} horas de motor, Indmar Monsoon 350 SS V8 350 HP, direct drive, Zero Off GPS, bimini e carreta inclusa. Agende visita pelo WhatsApp.`,
  applicationName: siteConfig.name,
  keywords: [
    'Malibu Response LX à venda',
    'lancha à venda',
    'barco à venda',
    'barcos à venda',
    'lancha usada',
    'barco usado',
    'lancha de esqui aquático',
    'barco de wakeboard',
    'Malibu boats Brasil',
    'lancha Monsoon 350',
    'lancha direct drive',
    'comprar lancha São Paulo',
    'comprar barco',
    'comprar barco Malibu',
    'comprar lancha Malibu',
    'barco Malibu Response LX',
    'Malibu Response LX 2013',
    'lancha 350 HP usada',
    'lancha esqui aquático à venda',
    'Malibu Response LX preço',
    'Malibu Response LX horas de motor',
    'comprar barco wakeboard',
    'barco para esqui aquático',
    'lancha represa Guarapiranga',
    'venda de barcos',
    'lancha seminova',
    'Malibu Response LX preço',
    'lancha V8 350 HP',
    'Zero Off GPS lancha',
    'carreta rodoviária lancha',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
    },
  },
  category: 'Náutica',
  classification: 'Classificado náutico premium',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `Comprar Barco ${siteConfig.listingName} — V8 350HP, Direct Drive`,
    description:
      `Lancha ${boat.brand} ${boat.model} por ${boat.priceLabel}. ${boat.year}, ${boat.engineHours} horas, motor Monsoon 350 SS V8, Zero Off, bimini e carreta inclusa. Esqui e wakeboard de alto nível.`,
    images: [
      {
        url: '/images/hero-side.jpeg',
        width: 1600,
        height: 900,
        alt: 'Malibu Response LX na água, casco branco com faixa azul-marinho',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Comprar ${siteConfig.listingName} — V8 350HP`,
    description:
      `Lancha ${boat.brand} ${boat.model} por ${boat.priceLabel}. ${boat.year}, ${boat.engineHours} horas, Motor Monsoon 350 SS, Zero Off, bimini e carreta inclusa.`,
    images: ['/images/hero-side.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'BR',
    'geo.placename': 'Brasil',
    'product:brand': 'Malibu',
    'product:condition': 'used',
    'product:price:amount': String(boat.price),
    'product:price:currency': boat.currency,
    'og:see_also': `${siteConfig.url}${siteConfig.guidePath}`,
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b1526',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        <AnalyticsTags />
        <WhatsAppClickTracker />
        <ConversionEventTracker />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
