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
import { boat, cinematic, faqs } from '@/lib/boat-data'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: `${boat.brand} ${boat.model}`,
  description:
    'Lancha Malibu Response LX à venda. Motor Indmar Monsoon 350 SS V8 (350 HP), transmissão direct drive, controle Zero Off GPS, toldo bimini e carreta rodoviária inclusa. Ideal para esqui aquático e wakeboard.',
  brand: { '@type': 'Brand', name: 'Malibu' },
  category: 'Lancha / Embarcação esportiva',
  image: [
    '/images/hero-side.jpeg',
    '/images/exterior-front.jpeg',
    '/images/engine.jpeg',
    '/images/cockpit-dash.jpeg',
  ],
  offers: {
    '@type': 'Offer',
    priceCurrency: 'BRL',
    price: boat.price,
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/UsedCondition',
    areaServed: 'BR',
  },
  url: '/',
  sku: 'malibu-response-lx-wonder-women',
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Motor', value: 'Indmar Monsoon 350 SS' },
    { '@type': 'PropertyValue', name: 'Potência', value: '350 HP' },
    { '@type': 'PropertyValue', name: 'Transmissão', value: 'Direct Drive' },
    { '@type': 'PropertyValue', name: 'Comprimento', value: 'Aprox. 6,1 m' },
  ],
}



const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Malibu Response LX à Venda',
  url: 'https://malibu-response-lx.vercel.app',
  inLanguage: 'pt-BR',
  potentialAction: {
    '@type': 'ContactAction',
    target: `https://wa.me/${boat.whatsapp}`,
    name: 'Agendar visita pelo WhatsApp',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Início',
      item: 'https://malibu-response-lx.vercel.app',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Malibu Response LX à venda',
      item: 'https://malibu-response-lx.vercel.app/#negociar',
    },
  ],
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
          <SeoTrustSection />
          <PricingCta />
        </main>
        <SiteFooter />
      </SmoothScroll>
      <StickyMobileCta />
      <AiChatWidget />
    </>
  )
}
