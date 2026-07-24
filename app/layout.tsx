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
    default: `${siteConfig.listingName} à venda | V8 350 HP, Direct Drive e Zero Off`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.listingName} ${boat.year} à venda por ${boat.priceLabel}. Lancha esportiva com ${boat.engineHours} horas, motor Indmar Monsoon 350 SS V8 350 HP, direct drive, Zero Off GPS, bimini e carreta inclusa. Fale diretamente pelo WhatsApp.`,
  applicationName: siteConfig.name,
  keywords: [
    'Malibu Response LX à venda',
    'Malibu Response LX 2013',
    'Malibu Response LX preço',
    'Malibu Response LX usada',
    'comprar Malibu Response LX',
    'lancha Malibu à venda',
    'barco Malibu à venda',
    'Malibu Boats Brasil',
    'lancha esportiva usada',
    'lancha para esqui aquático',
    'barco para esqui aquático',
    'lancha para wakeboard',
    'ski boat usada',
    'wake boat usada',
    'lancha direct drive',
    'barco direct drive',
    'Indmar Monsoon 350 SS',
    'lancha V8 350 HP',
    'Zero Off GPS',
    'lancha com carreta',
    'lancha premium usada',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: '/',
    languages: { 'pt-BR': '/' },
  },
  category: 'Náutica',
  classification: 'Anúncio de embarcação esportiva usada',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.listingName} ${boat.year} à venda — V8 350 HP`,
    description: `${boat.engineHours} horas, Indmar Monsoon 350 SS, direct drive, Zero Off GPS, bimini e carreta inclusa. Veja fotos reais e fale pelo WhatsApp.`,
    images: [{
      url: '/images/hero-side.jpeg',
      width: 1600,
      height: 900,
      alt: `${siteConfig.listingName} ${boat.year}, casco branco com faixa azul-marinho`,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.listingName} ${boat.year} à venda`,
    description: `V8 350 HP, ${boat.engineHours} horas, direct drive, Zero Off, bimini e carreta inclusa.`,
    images: ['/images/hero-side.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: siteConfig.searchConsoleVerification,
    other: {
      ...(siteConfig.bingVerification ? { 'msvalidate.01': siteConfig.bingVerification } : {}),
    },
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: 'black-translucent',
  },
  formatDetection: { telephone: false },
  other: {
    'geo.region': 'BR',
    'product:brand': boat.brand,
    'product:condition': 'used',
    'product:price:amount': String(boat.price),
    'product:price:currency': boat.currency,
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b1526',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

const globalEntityGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      alternateName: `${siteConfig.listingName} à venda`,
      description: `Site oficial do anúncio da ${siteConfig.listingName} ${boat.year}.`,
      inLanguage: 'pt-BR',
      publisher: { '@id': `${siteConfig.url}/#seller` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteConfig.url}/guias?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#seller`,
      name: 'Vendedor particular',
      url: siteConfig.url,
      knowsAbout: [
        'Malibu Response LX',
        'Lancha direct drive',
        'Esqui aquático',
        'Indmar Monsoon 350 SS',
        'Zero Off GPS',
      ],
    },
    {
      '@type': 'Dataset',
      '@id': `${siteConfig.url}/boat.json#dataset`,
      name: `Dados estruturados da ${siteConfig.listingName} ${boat.year}`,
      description: 'Dados publicados do anúncio, incluindo preço, ano, horas, motor, transmissão, equipamentos e imagens.',
      url: `${siteConfig.url}/boat.json`,
      contentUrl: `${siteConfig.url}/boat.json`,
      encodingFormat: 'application/json',
      inLanguage: 'pt-BR',
      creator: { '@id': `${siteConfig.url}/#seller` },
      isBasedOn: `${siteConfig.url}/dossie-tecnico`,
      dateModified: siteConfig.updatedAt,
      license: `${siteConfig.url}/dossie-tecnico`,
      keywords: [
        'Malibu Response LX 2013',
        'Indmar Monsoon 350 SS',
        'Zero Off GPS',
        'lancha direct drive',
        'lancha usada à venda',
      ],
    },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(globalEntityGraph) }} />
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground">
          Pular para o conteúdo
        </a>
        {children}
        <AnalyticsTags />
        <WhatsAppClickTracker />
        <ConversionEventTracker />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
