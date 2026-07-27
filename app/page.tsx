import { SmoothScroll } from '@/components/smooth-scroll'
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
const entityIds = {
  website: `${SITE_URL}/#website`,
  webpage: `${SITE_URL}/#webpage`,
  product: `${SITE_URL}/#product`,
  offer: `${SITE_URL}/#offer`,
  seller: `${SITE_URL}/#seller`,
  brand: `${SITE_URL}/#malibu-boats`,
  manufacturer: `${SITE_URL}/#malibu-boats-manufacturer`,
  model: `${SITE_URL}/#response-lx`,
  engine: `${SITE_URL}/#indmar-monsoon-350-ss`,
  engineManufacturer: `${SITE_URL}/#indmar-marine-engines`,
  zeroOff: `${SITE_URL}/#zero-off-gps`,
  directDrive: `${SITE_URL}/#direct-drive`,
  skiBoat: `${SITE_URL}/#ski-boat`,
  slalom: `${SITE_URL}/#slalom-water-skiing`,
  wakeboard: `${SITE_URL}/#wakeboard`,
  glossary: `${SITE_URL}/#nautical-glossary`,
  evidenceProfile: `${SITE_URL}/#evidence-profile`,
}

const imageObjects = gallery.map((image, index) => ({
  '@type': 'ImageObject',
  '@id': `${SITE_URL}/#image-${index + 1}`,
  contentUrl: `${SITE_URL}${image.src}`,
  url: `${SITE_URL}${image.src}`,
  caption: image.alt,
  name: image.alt,
  representativeOfPage: index === 0,
  inLanguage: 'pt-BR',
  about: { '@id': entityIds.product },
  creditText: 'Fotografia real publicada no anúncio da embarcação',
}))

const definedTerms = [
  {
    '@type': 'DefinedTerm',
    '@id': entityIds.skiBoat,
    name: 'Ski boat',
    alternateName: ['Lancha de esqui aquático', 'Competition ski boat'],
    description: 'Categoria de embarcação esportiva otimizada para rebocar praticantes de esqui aquático.',
    inDefinedTermSet: { '@id': entityIds.glossary },
  },
  {
    '@type': 'DefinedTerm',
    '@id': entityIds.slalom,
    name: 'Esqui aquático slalom',
    alternateName: 'Slalom water skiing',
    description: 'Modalidade de esqui aquático associada a velocidade constante, resposta previsível e esteira controlada.',
    inDefinedTermSet: { '@id': entityIds.glossary },
  },
  {
    '@type': 'DefinedTerm',
    '@id': entityIds.wakeboard,
    name: 'Wakeboard',
    description: 'Esporte náutico de prancha rebocado por embarcação, relacionado ao uso recreativo desta lancha.',
    inDefinedTermSet: { '@id': entityIds.glossary },
  },
  {
    '@type': 'DefinedTerm',
    '@id': entityIds.directDrive,
    name: 'Direct Drive',
    alternateName: 'Transmissão direct drive',
    description: 'Configuração de transmissão com motor central e eixo direto, comum em embarcações de esqui aquático.',
    inDefinedTermSet: { '@id': entityIds.glossary },
  },
  {
    '@type': 'DefinedTerm',
    '@id': entityIds.zeroOff,
    name: 'Zero Off GPS',
    description: 'Sistema de controle de velocidade por GPS utilizado em embarcações de esqui aquático.',
    inDefinedTermSet: { '@id': entityIds.glossary },
  },
]

const glossaryJsonLd = {
  '@type': 'DefinedTermSet',
  '@id': entityIds.glossary,
  name: 'Glossário técnico da Malibu Response LX',
  description: 'Conjunto de termos técnicos e esportivos relacionados à embarcação anunciada.',
  inLanguage: 'pt-BR',
  hasDefinedTerm: definedTerms.map((term) => ({ '@id': term['@id'] })),
}

const manufacturerEntities = [
  {
    '@type': 'Organization',
    '@id': entityIds.manufacturer,
    name: 'Malibu Boats',
    url: 'https://www.malibuboats.com/',
  },
  {
    '@type': 'Organization',
    '@id': entityIds.engineManufacturer,
    name: 'Indmar Marine Engines',
    url: 'https://www.indmar.com/',
  },
]

const productJsonLd = {
  '@type': 'Product',
  '@id': entityIds.product,
  additionalType: ['https://schema.org/Boat', entityIds.skiBoat],
  name: `${boat.brand} ${boat.model} ${boat.year}`,
  alternateName: ['Malibu Response LX à venda', 'Lancha Malibu Response LX 2013', boat.name],
  description: 'Malibu Response LX 2013 à venda, com motor Indmar Monsoon 350 SS V8 de 350 HP, transmissão direct drive, Zero Off GPS, bimini e carreta rodoviária inclusa.',
  brand: { '@id': entityIds.brand },
  manufacturer: { '@id': entityIds.manufacturer },
  model: { '@id': entityIds.model },
  category: 'Competition ski boat usada',
  image: imageObjects.map((image) => ({ '@id': image['@id'] })),
  offers: {
    '@type': 'Offer',
    '@id': entityIds.offer,
    priceCurrency: boat.currency,
    price: boat.price,
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/UsedCondition',
    areaServed: { '@type': 'Country', name: 'Brasil' },
    url: SITE_URL,
    seller: { '@id': entityIds.seller },
    itemOffered: { '@id': entityIds.product },
  },
  sku: `malibu-response-lx-${boat.year}-${boat.engineHours}h`,
  mpn: 'Response LX',
  mainEntityOfPage: { '@id': entityIds.webpage },
  subjectOf: { '@id': entityIds.evidenceProfile },
  isRelatedTo: [
    { '@id': entityIds.engine },
    { '@id': entityIds.zeroOff },
    { '@id': entityIds.directDrive },
    { '@id': entityIds.skiBoat },
    { '@id': entityIds.slalom },
    { '@id': entityIds.wakeboard },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Compradores de embarcações esportivas, praticantes de esqui aquático e wakeboard',
  },
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Motor', value: 'Indmar Monsoon 350 SS' },
    { '@type': 'PropertyValue', name: 'Fabricante do motor', value: 'Indmar Marine Engines' },
    { '@type': 'PropertyValue', name: 'Potência', value: '350 HP' },
    { '@type': 'PropertyValue', name: 'Transmissão', value: 'Direct Drive' },
    { '@type': 'PropertyValue', name: 'Comprimento', value: 'Aproximadamente 6,1 m' },
    { '@type': 'PropertyValue', name: 'Ano', value: String(boat.year) },
    { '@type': 'PropertyValue', name: 'Horas de motor', value: `${boat.engineHours} h` },
    { '@type': 'PropertyValue', name: 'Controle de velocidade', value: 'Zero Off GPS' },
    { '@type': 'PropertyValue', name: 'Itens inclusos', value: 'Carreta rodoviária galvanizada e toldo bimini' },
    { '@type': 'PropertyValue', name: 'Base de evidência', value: 'Fotos reais e ficha técnica do anúncio' },
    { '@type': 'PropertyValue', name: 'Validação pendente', value: 'Documentação, histórico de manutenção, inspeção e teste na água' },
  ],
}

const evidenceProfileJsonLd = {
  '@type': 'CreativeWork',
  '@id': entityIds.evidenceProfile,
  name: 'Perfil de evidências e autenticidade do anúncio',
  description: 'Registro estruturado das evidências publicadas, das limitações do anúncio e dos itens que exigem validação independente.',
  about: { '@id': entityIds.product },
  isPartOf: { '@id': entityIds.webpage },
  dateModified: siteConfig.updatedAt,
  inLanguage: 'pt-BR',
  citation: imageObjects.map((image) => ({ '@id': image['@id'] })),
  keywords: [
    'fotos reais da embarcação',
    'ficha técnica',
    'proveniência dos dados',
    'inspeção independente recomendada',
  ],
}

const webPageJsonLd = {
  '@type': 'WebPage',
  '@id': entityIds.webpage,
  url: SITE_URL,
  name: `Comprar ${boat.brand} ${boat.model} ${boat.year}`,
  description: `Página de venda da ${boat.brand} ${boat.model} ${boat.year}, com fotos reais, ficha técnica, preço, motor, horas, prova de autenticidade e dados estruturados.`,
  inLanguage: 'pt-BR',
  isPartOf: { '@id': entityIds.website },
  primaryImageOfPage: { '@id': `${SITE_URL}/#image-1` },
  mainEntity: { '@id': entityIds.product },
  breadcrumb: { '@id': `${SITE_URL}/#breadcrumb` },
  about: [
    { '@id': entityIds.product },
    { '@id': entityIds.model },
    { '@id': entityIds.engine },
    { '@id': entityIds.zeroOff },
    { '@id': entityIds.directDrive },
    { '@id': entityIds.skiBoat },
  ],
  mentions: [
    { '@id': entityIds.brand },
    { '@id': entityIds.engineManufacturer },
    { '@id': entityIds.slalom },
    { '@id': entityIds.wakeboard },
  ],
  dateModified: siteConfig.updatedAt,
  relatedLink: [
    `${SITE_URL}/dossie-tecnico`,
    `${SITE_URL}${siteConfig.guidePath}`,
    `${SITE_URL}/guias`,
    `${SITE_URL}/boat.json`,
  ],
}

const videoJsonLd = {
  '@type': 'VideoObject',
  '@id': `${SITE_URL}/#engine-video`,
  name: 'Vídeo de referência do motor e da Malibu Response LX',
  description: 'Vídeo externo de referência associado ao conjunto Malibu Response LX. Confirme quais imagens correspondem especificamente à embarcação anunciada.',
  url: siteConfig.engineVideo.url,
  embedUrl: siteConfig.engineVideo.embedUrl,
  thumbnailUrl: [siteConfig.engineVideo.thumbnailUrl],
  inLanguage: 'pt-BR',
  isFamilyFriendly: true,
  about: { '@id': entityIds.product },
}

const galleryJsonLd = {
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
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  isPartOf: { '@id': entityIds.webpage },
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

const breadcrumbJsonLd = {
  '@type': 'BreadcrumbList',
  '@id': `${SITE_URL}/#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
  ],
}

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd,
      productJsonLd,
      evidenceProfileJsonLd,
      galleryJsonLd,
      videoJsonLd,
      faqJsonLd,
      breadcrumbJsonLd,
      glossaryJsonLd,
      ...manufacturerEntities,
      ...definedTerms,
      ...imageObjects,
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
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
