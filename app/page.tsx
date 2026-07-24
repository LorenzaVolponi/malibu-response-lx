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
import { StickyMobileCta } from '@/components/sticky-mobile-cta'
import { MarketProofSection } from '@/components/market-proof-section'
import { DeferredWidgets } from '@/components/deferred-widgets'
import { boat, cinematic, faqs, gallery } from '@/lib/boat-data'
import { siteConfig } from '@/lib/site-config'

const SITE_URL = siteConfig.url

const imageObjects = gallery.map((image, index) => ({
  '@type': 'ImageObject',
  '@id': `${SITE_URL}/#image-${index + 1}`,
  contentUrl: `${SITE_URL}${image.src}`,
  url: `${SITE_URL}${image.src}`,
  caption: image.alt,
  name: image.alt,
  representativeOfPage: index === 0,
  inLanguage: 'pt-BR',
}))

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `${SITE_URL}/#product`,
  additionalType: 'https://schema.org/Boat',
  name: `${boat.brand} ${boat.model} ${boat.year}`,
  alternateName: ['Malibu Response LX à venda', 'Lancha Malibu Response LX 2013', boat.name],
  description: 'Malibu Response LX 2013 à venda, com motor Indmar Monsoon 350 SS V8 de 350 HP, transmissão direct drive, Zero Off GPS, bimini e carreta rodoviária inclusa.',
  brand: { '@type': 'Brand', name: boat.brand },
  category: 'Embarcação esportiva usada',
  image: imageObjects.map((image) => ({ '@id': image['@id'] })),
  offers: {
    '@type': 'Offer',
    '@id': `${SITE_URL}/#offer`,
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

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: siteConfig.name,
  alternateName: `${siteConfig.listingName} à venda`,
  inLanguage: 'pt-BR',
  publisher: { '@type': 'Person', name: 'Vendedor particular' },
}

const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: `Comprar ${boat.brand} ${boat.model} ${boat.year}`,
  description: `Página de venda da ${boat.brand} ${boat.model} ${boat.year}, com fotos reais, ficha técnica, preço, motor, horas, FAQ e contato direto pelo WhatsApp.`,
  inLanguage: 'pt-BR',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  primaryImageOfPage: { '@id': `${SITE_URL}/#image-1` },
  mainEntity: { '@id': `${SITE_URL}/#product` },
  dateModified: siteConfig.updatedAt,
  relatedLink: [
    `${SITE_URL}/dossie-tecnico`,
    `${SITE_URL}${siteConfig.guidePath}`,
    `${SITE_URL}/boat.json`,
  ],
}

const videoJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  '@id': `${SITE_URL}/#engine-video`,
  name: 'Vídeo de referência do motor e da Malibu Response LX',
  description: 'Vídeo externo de referência associado ao conjunto Malibu Response LX. Confirme com o vendedor quais imagens correspondem especificamente à embarcação anunciada.',
  url: siteConfig.engineVideo.url,
  embedUrl: siteConfig.engineVideo.embedUrl,
  thumbnailUrl: [siteConfig.engineVideo.thumbnailUrl],
  inLanguage: 'pt-BR',
  isFamilyFriendly: true,
}

const galleryJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/#gallery`,
  name: `Galeria da ${siteConfig.listingName} ${boat.year}`,
  numberOfItems: imageObjects.length,
  itemListElement: imageObjects.map((image, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: image,
  })),
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${SITE_URL}/#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: `${boat.brand} ${boat.model} ${boat.year}`, item: SITE_URL },
  ],
}

export default function Page() {
  const structuredData = [websiteJsonLd, webPageJsonLd, productJsonLd, galleryJsonLd, videoJsonLd, faqJsonLd, breadcrumbJsonLd]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
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
      <DeferredWidgets />
    </>
  )
}
