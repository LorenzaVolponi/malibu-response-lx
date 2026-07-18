import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const SITE_URL = 'https://malibu-response-lx.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Malibu Response LX à Venda | Lancha Esqui/Wakeboard V8 350HP',
    template: '%s | Malibu Response LX',
  },
  description:
    'Lancha Malibu Response LX à venda no Brasil por R$ 150.000. Motor Indmar Monsoon 350 SS V8 (350 HP), transmissão direct drive, controle Zero Off, toldo bimini e carreta rodoviária inclusa. Ideal para esqui aquático e wakeboard. Agende sua visita.',
  applicationName: 'Malibu Response LX',
  keywords: [
    'Malibu Response LX à venda',
    'lancha à venda',
    'barco à venda',
    'lancha usada',
    'barco usado',
    'lancha de esqui aquático',
    'barco de wakeboard',
    'Malibu boats Brasil',
    'lancha Monsoon 350',
    'lancha direct drive',
    'comprar lancha São Paulo',
    'lancha represa Guarapiranga',
    'venda de barcos',
    'lancha seminova',
  ],
  authors: [{ name: 'Malibu Response LX' }],
  creator: 'Malibu Response LX',
  alternates: {
    canonical: '/',
  },
  category: 'Náutica',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'Malibu Response LX',
    title: 'Malibu Response LX à Venda — V8 350HP, Direct Drive',
    description:
      'Lancha Malibu Response LX por R$ 150.000. Motor Monsoon 350 SS V8, Zero Off, bimini e carreta inclusa. Esqui e wakeboard de alto nível.',
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
    title: 'Malibu Response LX à Venda — V8 350HP',
    description:
      'Lancha Malibu Response LX por R$ 150.000. Motor Monsoon 350 SS, Zero Off, bimini e carreta inclusa.',
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
    },
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
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
