import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { WhatsAppClickTracker } from '@/components/whatsapp-click-tracker'
import { AnalyticsTags } from '@/components/analytics-tags'

const SITE_URL = 'https://malibu-response-lx.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Comprar Barco Malibu Response LX 2013 | Lancha V8 350HP à Venda',
    template: '%s | Malibu Response LX',
  },
  description:
    'Comprar barco Malibu Response LX 2013 à venda no Brasil por R$ 175.000. Lancha de esqui/wakeboard com 940 horas de motor, Indmar Monsoon 350 SS V8 350 HP, direct drive, Zero Off GPS, bimini e carreta inclusa. Agende visita pelo WhatsApp.',
  applicationName: 'Malibu Response LX',
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
  ],
  authors: [{ name: 'Malibu Response LX' }],
  creator: 'Malibu Response LX',
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
    },
  },
  classification: 'classified listing, boat listing, nautical sales',
  category: 'Náutica',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'Malibu Response LX',
    title: 'Comprar Barco Malibu Response LX 2013 — V8 350HP, Direct Drive',
    description:
      'Lancha Malibu Response LX por R$ 175.000. 2013, 940 horas, motor Monsoon 350 SS V8, Zero Off, bimini e carreta inclusa. Esqui e wakeboard de alto nível.',
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
    title: 'Comprar Malibu Response LX 2013 — V8 350HP',
    description:
      'Lancha Malibu Response LX por R$ 175.000. 2013, 940 horas, Motor Monsoon 350 SS, Zero Off, bimini e carreta inclusa.',
    images: ['/images/hero-side.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  other: {
    'geo.region': 'BR',
    'geo.placename': 'Brasil',
    'product:brand': 'Malibu',
    'product:condition': 'used',
    'product:price:amount': '175000',
    'product:price:currency': 'BRL',
    'og:see_also': 'https://wa.me/5531998654328',
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
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
