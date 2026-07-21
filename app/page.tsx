import { SmoothScroll } from '@/components/smooth-scroll'
import { Preloader } from '@/components/preloader'
import { ScrollProgress } from '@/components/scroll-progress'
import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { CinematicSection } from '@/components/cinematic-section'
import { BrandStorySection } from '@/components/brand-story-section'
import { JourneyScroll } from '@/components/journey-scroll'
import { Boat360 } from '@/components/boat-360'
import { SpecsSection } from '@/components/specs-section'
import { FeaturesSection } from '@/components/features-section'
import { ConditionSection } from '@/components/condition-section'
import { GallerySection } from '@/components/gallery-section'
import { BuyerGuideSection } from '@/components/buyer-guide-section'
import { PricingCta } from '@/components/pricing-cta'
import { SeoTrustSection } from '@/components/seo-trust-section'
import { FaqSection } from '@/components/faq-section'
import { BuyerConfidenceSection } from '@/components/buyer-confidence-section'
import { SiteFooter } from '@/components/site-footer'
import { AiChatWidget } from '@/components/ai-chat-widget'
import { StickyMobileCta } from '@/components/sticky-mobile-cta'
import { EngineSound } from '@/components/engine-sound'
import { SeoGrowthSection } from '@/components/seo-growth-section'
import { MarketProofSection } from '@/components/market-proof-section'
import { boat, cinematic, faqs, gallery } from '@/lib/boat-data'

const SITE_URL = 'https://malibu-response-lx.vercel.app'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `${SITE_URL}/#product`,
  additionalType: 'https://schema.org/Boat',
  name: `${boat.brand} ${boat.model} ${boat.year}`,
  alternateName: ['Malibu Response LX à venda', 'Lancha Malibu Response LX 2013', 'Comprar barco Malibu'],
  description:
    'Lancha Malibu Response LX à venda. Motor Indmar Monsoon 350 SS V8 (350 HP), transmissão direct drive, controle Zero Off GPS, toldo bimini e carreta rodoviária inclusa. Ideal para esqui aquático e wakeboard.',
  brand: { '@type': 'Brand', name: 'Malibu' },
  category: 'Lancha / Embarcação esportiva',
  image: [
    `${SITE_URL}/images/hero-side.jpeg`,
    `${SITE_URL}/images/exterior-front.jpeg`,
    `${SITE_URL}/images/engine.jpeg`,
    `${SITE_URL}/images/cockpit-dash.jpeg`,
  ],
  offers: {
    '@type': 'Offer',
    priceCurrency: 'BRL',
    price: boat.price,
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/UsedCondition',
    areaServed: 'BR',
    url: SITE_URL,
    seller: { '@type': 'Organization', name: 'Malibu Response LX Brasil' },
  },
  sku: `malibu-response-lx-${boat.year}-${boat.engineHours}h`,
  mpn: 'Response LX',
  mainEntityOfPage: SITE_URL,
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Motor', value: 'Indmar Monsoon 350 SS' },
    { '@type': 'PropertyValue', name: 'Potência', value: '350 HP' },
    { '@type': 'PropertyValue', name: 'Transmissão', value: 'Direct Drive' },
    { '@type': 'PropertyValue', name: 'Comprimento', value: 'Aprox. 6,1 m' },
    { '@type': 'PropertyValue', name: 'Ano de fabricação', value: '2013' },
    { '@type': 'PropertyValue', name: 'Horas de motor', value: '940 h' },
  ],
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#seller`,
  name: 'Malibu Response LX Brasil',
  url: SITE_URL,
  telephone: '+55 31 99865-4328',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+55 31 99865-4328',
    contactType: 'sales',
    availableLanguage: 'Portuguese',
    areaServed: 'BR',
  },
}


const imageGalleryJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  '@id': `${SITE_URL}/#gallery`,
  name: 'Fotos reais da Malibu Response LX 2013',
  associatedMedia: gallery.map((image) => ({
    '@type': 'ImageObject',
    contentUrl: `${SITE_URL}${image.src}`,
    caption: image.alt,
    representativeOfPage: image.src === '/images/hero-side.jpeg',
  })),
}


const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Malibu Response LX à venda',
  url: SITE_URL,
  inLanguage: 'pt-BR',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Barcos à venda', item: `${SITE_URL}/#comprar-barco-malibu` },
    { '@type': 'ListItem', position: 3, name: `${boat.brand} ${boat.model} ${boat.year}`, item: `${SITE_URL}/#product` },
  ],
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#seller`,
  name: 'Malibu Response LX Brasil',
  url: SITE_URL,
  telephone: '+55 31 99865-4328',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+55 31 99865-4328',
    contactType: 'sales',
    availableLanguage: 'Portuguese',
    areaServed: 'BR',
  },
}


const imageGalleryJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  '@id': `${SITE_URL}/#gallery`,
  name: 'Fotos reais da Malibu Response LX 2013',
  associatedMedia: gallery.map((image) => ({
    '@type': 'ImageObject',
    contentUrl: `${SITE_URL}${image.src}`,
    caption: image.alt,
    representativeOfPage: image.src === '/images/hero-side.jpeg',
  })),
}


const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Malibu Response LX à venda',
  url: SITE_URL,
  inLanguage: 'pt-BR',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Barcos à venda', item: `${SITE_URL}/#comprar-barco-malibu` },
    { '@type': 'ListItem', position: 3, name: `${boat.brand} ${boat.model} ${boat.year}`, item: `${SITE_URL}/#product` },
  ],
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#seller`,
  name: 'Malibu Response LX Brasil',
  url: SITE_URL,
  telephone: '+55 31 99865-4328',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+55 31 99865-4328',
    contactType: 'sales',
    availableLanguage: 'Portuguese',
    areaServed: 'BR',
  },
}


const imageGalleryJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  '@id': `${SITE_URL}/#gallery`,
  name: 'Fotos reais da Malibu Response LX 2013',
  associatedMedia: gallery.map((image) => ({
    '@type': 'ImageObject',
    contentUrl: `${SITE_URL}${image.src}`,
    caption: image.alt,
    representativeOfPage: image.src === '/images/hero-side.jpeg',
  })),
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGalleryJsonLd) }}
      />
      <Preloader />
      <SmoothScroll>
        <ScrollProgress />
        <SiteNav />
        <main>
          <Hero />
          <BrandStorySection />
          <CinematicSection {...cinematic[0]} priority />
          <JourneyScroll />
          <CinematicSection {...cinematic[1]} />
          <Boat360 />
          <SpecsSection />
          <FeaturesSection />
          <ConditionSection />
          <CinematicSection {...cinematic[2]} />
          <GallerySection />
          <BuyerGuideSection />

          <SeoGrowthSection />
          <MarketProofSection />
          <FaqSection />
          <BuyerConfidenceSection />
          <PricingCta />
        </main>
        <SiteFooter />
      </SmoothScroll>
      <StickyMobileCta />
      <EngineSound />
      <AiChatWidget />
    </>
  )
}
