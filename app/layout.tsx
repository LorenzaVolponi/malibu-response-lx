import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { siteConfig } from '@/lib/site-config'
import { boat } from '@/lib/boat-data'
import './globals.css'
import { AnalyticsTags } from '@/components/analytics-tags'
import { ConversionEventTracker } from '@/components/conversion-event-tracker'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.listingName} à venda | ${boat.priceLabel} | Zero Off GPS`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.listingName} à venda por ${boat.priceLabel}. Competition ski boat direct drive para esqui aquático e slalom, com motor Indmar Monsoon 350 SS V8 350 HP, ${boat.engineHours} h e Zero Off GPS.`,
  applicationName: siteConfig.name,
  keywords: [
    'Malibu Response LX à venda',
    'Malibu Response LX 2013',
    'Malibu Response LX preço',
    'Malibu Response LX usada',
    'comprar Malibu Response LX',
    'competition ski boat',
    'ski boat à venda',
    'lancha de slalom',
    'lancha para esqui aquático',
    'barco para esqui aquático',
    'lancha direct drive',
    'barco direct drive',
    'Indmar Monsoon 350 SS',
    'lancha V8 350 HP',
    'Zero Off GPS',
    'lancha com controle de velocidade GPS',
    'lancha Malibu à venda',
    'barco Malibu à venda',
    'Malibu Boats Brasil',
    'lancha esportiva usada',
    'lancha premium usada',
    'wakeboard recreativo',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: '/',
    languages: { 'pt-BR': '/' },
    types: { 'application/rss+xml': '/feed.xml' },
  },
  category: 'Náutica',
  classification: 'Anúncio de competition ski boat usada para esqui aquático e slalom',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.listingName} à venda — ${boat.priceLabel}`,
    description: `Competition ski boat direct drive com Indmar V8 350 HP, Zero Off GPS e ${boat.engineHours} horas informadas. Foco em esqui aquático e slalom.`,
    images: [{
      url: '/images/hero-side.jpeg',
      width: 1600,
      height: 900,
      alt: `${siteConfig.listingName}, casco branco com faixa azul-marinho`,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.listingName} à venda por ${boat.priceLabel}`,
    description: `Direct drive para esqui aquático e slalom: V8 350 HP, ${boat.engineHours} horas e Zero Off GPS.`,
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

const entityIds = {
  website: `${siteConfig.url}/#website`,
  seller: `${siteConfig.url}/#seller`,
  offer: `${siteConfig.url}/#offer`,
  dataset: `${siteConfig.url}/boat.json#dataset`,
  product: `${siteConfig.url}/#product`,
  brand: `${siteConfig.url}/#malibu-boats`,
  model: `${siteConfig.url}/#response-lx`,
  engine: `${siteConfig.url}/#indmar-monsoon-350-ss`,
  indmar: `${siteConfig.url}/#indmar-marine-engines`,
  zeroOff: `${siteConfig.url}/#zero-off-gps`,
  directDrive: `${siteConfig.url}/#direct-drive`,
}

const globalEntityGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': entityIds.website,
      url: siteConfig.url,
      name: siteConfig.name,
      alternateName: `${siteConfig.listingName} à venda`,
      description: `Site oficial do anúncio da ${siteConfig.listingName}, com preço, dossiê técnico, guias e dados estruturados da embarcação.`,
      inLanguage: 'pt-BR',
      publisher: { '@id': entityIds.seller },
      about: [
        { '@id': entityIds.product },
        { '@id': entityIds.model },
        { '@id': entityIds.engine },
        { '@id': entityIds.indmar },
        { '@id': entityIds.zeroOff },
        { '@id': entityIds.directDrive },
      ],
      hasPart: [
        { '@id': `${siteConfig.url}/guias#collection` },
        { '@id': `${siteConfig.url}/dossie-tecnico#webpage` },
        { '@id': entityIds.dataset },
      ],
    },
    {
      '@type': 'Person',
      '@id': entityIds.seller,
      name: 'Vendedor particular',
      url: siteConfig.url,
      makesOffer: { '@id': entityIds.offer },
      knowsAbout: [
        { '@id': entityIds.model },
        { '@id': entityIds.engine },
        { '@id': entityIds.zeroOff },
        { '@id': entityIds.directDrive },
        'Esqui aquático',
        'Slalom',
        'Wakeboard recreativo',
        'Embarcações esportivas usadas',
      ],
    },
    {
      '@type': 'Brand',
      '@id': entityIds.brand,
      name: 'Malibu Boats',
      url: 'https://www.malibuboats.com/',
      sameAs: ['https://en.wikipedia.org/wiki/Malibu_Boats'],
    },
    {
      '@type': 'ProductModel',
      '@id': entityIds.model,
      name: 'Malibu Response LX',
      brand: { '@id': entityIds.brand },
      category: 'Competition ski boat',
      description: 'Modelo esportivo direct drive da Malibu Boats, associado a esqui aquático, slalom e uso recreativo.',
      isSimilarTo: [
        { '@type': 'Thing', name: 'Ski boat' },
        { '@type': 'Thing', name: 'Lancha direct drive' },
      ],
    },
    {
      '@type': 'Organization',
      '@id': entityIds.indmar,
      name: 'Indmar Marine Engines',
      url: 'https://indmar.com/',
      description: 'Fabricante de motores náuticos inboard.',
    },
    {
      '@type': 'Product',
      '@id': entityIds.engine,
      name: 'Indmar Monsoon 350 SS',
      category: 'Motor náutico V8',
      manufacturer: { '@id': entityIds.indmar },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Potência', value: '350 HP' },
        { '@type': 'PropertyValue', name: 'Configuração', value: 'V8' },
      ],
      isPartOf: { '@id': entityIds.product },
    },
    {
      '@type': 'Thing',
      '@id': entityIds.zeroOff,
      name: 'Zero Off GPS',
      url: 'https://www.zerogps.com/',
      sameAs: ['https://www.zerogps.com/about/'],
      description: 'Sistema de controle de velocidade por GPS usado em embarcações de esqui aquático.',
      isPartOf: { '@id': entityIds.product },
    },
    {
      '@type': 'Thing',
      '@id': entityIds.directDrive,
      name: 'Direct Drive',
      alternateName: 'Transmissão direct drive',
      description: 'Configuração de transmissão com motor central e eixo direto, comum em embarcações de esqui aquático.',
      isPartOf: { '@id': entityIds.product },
    },
    {
      '@type': 'Dataset',
      '@id': entityIds.dataset,
      name: `Dados estruturados da ${siteConfig.listingName}`,
      description: 'Dados publicados do anúncio, incluindo preço, ano, horas, motor, transmissão, equipamentos e imagens.',
      url: `${siteConfig.url}/boat.json`,
      contentUrl: `${siteConfig.url}/boat.json`,
      encodingFormat: 'application/json',
      inLanguage: 'pt-BR',
      creator: { '@id': entityIds.seller },
      about: [
        { '@id': entityIds.product },
        { '@id': entityIds.model },
        { '@id': entityIds.engine },
      ],
      isBasedOn: `${siteConfig.url}/dossie-tecnico`,
      dateModified: siteConfig.updatedAt,
      keywords: [
        'Malibu Response LX 2013',
        'competition ski boat',
        'lancha de slalom',
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
        <ConversionEventTracker />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
