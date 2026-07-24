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
import { FaqSection } from '@/components/faq-section'
import { BuyerConfidenceSection } from '@/components/buyer-confidence-section'
import { ValueProofSection } from '@/components/value-proof-section'
import { SiteFooter } from '@/components/site-footer'
import { AiChatWidget } from '@/components/ai-chat-widget'
import { StickyMobileCta } from '@/components/sticky-mobile-cta'
import { MarketProofSection } from '@/components/market-proof-section'
import { EngineSound } from '@/components/engine-sound'
import { boat, cinematic, faqs, gallery } from '@/lib/boat-data'
import { siteConfig } from '@/lib/site-config'

const SITE_URL = siteConfig.url

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `${SITE_URL}/#product`,
  additionalType: 'https://schema.org/Boat',
  name: `${boat.brand} ${boat.model} ${boat.year}`,
  alternateName: ['Malibu Response LX à venda', 'Lancha Malibu Response LX 2013'],
  description:
    'Malibu Response LX 2013 à venda, com motor Indmar Monsoon 350 SS V8 de 350 HP, transmissão direct drive, Zero Off GPS, bimini e carreta rodoviária inclusa.',
  brand: { '@type': 'Brand', name: boat.brand },
  category: 'Embarcação esportiva usada',
  image: gallery.map((image) => `${SITE_URL}${image.src}`),
  offers: {
    '@type': 'Offer',
    priceCurrency: boat.currency,
    price: boat.price,
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/UsedCondition',
    areaServed: { '@type': 'Country', name: 'Brasil' },
    url: SITE_URL,
    seller: { '@type': 'Person', name: 'Vendedor particular' },
  },
  sku: `malibu-response-lx-${boat.year}-${boat.engineHours}h`,
  mpn: 'Response LX',
  mainEntityOfPage: { '@id': `${SITE_URL}/#webpage` },
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Motor', value: 'Indmar Monsoon 350 SS' },
    { '@type': 'PropertyValue', name: 'Potência', value: '350 HP' },
    { '@type': 'PropertyValue', name: 'Transmissão', value: 'Direct Drive' },
    { '@type': 'PropertyValue', name: 'Comprimento', value: 'Aproximadamente 6,1 m' },
    { '@type': 'PropertyValue', name: 'Ano', value: String(boat.year) },
    { '@type': 'PropertyValue', name: 'Horas de motor', value: `${boat.engineHours} h` },
    { '@type': 'PropertyValue', name: 'Controle de velocidade', value: 'Zero Off GPS' },
    { '@type': 'PropertyValue', name: 'Itens inclusos', value: 'Carreta rodoviária galvanizada e toldo bimini' },
  ],
}

const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: `Comprar ${boat.brand} ${boat.model} ${boat.year}`,
  description: `Página de venda da ${boat.brand} ${boat.model} ${boat.year}, com fotos reais, ficha técnica, preço, motor, horas, vídeo, FAQ e contato direto pelo WhatsApp.`,
  inLanguage: 'pt-BR',
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/hero-side.jpeg`,
  },
  mainEntity: { '@id': `${SITE_URL}/#product` },
}

const videoJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  '@id': `${SITE_URL}/#engine-video`,
  name: 'Motor da Malibu Response LX 2013',
  description: 'Vídeo associado ao motor Indmar Monsoon 350 SS da Malibu Response LX anunciada.',
  url: siteConfig.engineVideo.url,
  embedUrl: siteConfig.engineVideo.embedUrl,
  thumbnailUrl: [siteConfig.engineVideo.thumbnailUrl],
  inLanguage: 'pt-BR',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: `${boat.brand} ${boat.model} ${boat.year}`, item: SITE_URL },
  ],
}

export default function Page() {
  const structuredData = [productJsonLd, webPageJsonLd, videoJsonLd, faqJsonLd, breadcrumbJsonLd]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Preloader />
      <SmoothScroll>
        <ScrollProgress />
        <SiteNav />
        <main id="conteudo">
          <Hero />
          <BrandStorySection />
          <CinematicSection {...cinematic[0]} priority />
          <JourneyScroll />
          <CinematicSection {...cinematic[1]} />
          <Boat360 />
          <SpecsSection />
          <FeaturesSection />
          <ConditionSection />
          <ValueProofSection />
          <CinematicSection {...cinematic[2]} />
          <GallerySection />
          <BuyerGuideSection />
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
