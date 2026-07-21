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
import { SiteFooter } from '@/components/site-footer'
import { AiChatWidget } from '@/components/ai-chat-widget'
import { StickyMobileCta } from '@/components/sticky-mobile-cta'
import { EngineSound } from '@/components/engine-sound'
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
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Motor', value: 'Indmar Monsoon 350 SS' },
    { '@type': 'PropertyValue', name: 'Potência', value: '350 HP' },
    { '@type': 'PropertyValue', name: 'Transmissão', value: 'Direct Drive' },
    { '@type': 'PropertyValue', name: 'Comprimento', value: 'Aprox. 6,1 m' },
    { '@type': 'PropertyValue', name: 'Ano de fabricação', value: '2013' },
    { '@type': 'PropertyValue', name: 'Horas de motor', value: '940 h' },
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

          <section id="comprar-barco-malibu" className="bg-background px-5 py-16">
            <div className="mx-auto max-w-6xl rounded-4xl border border-gold/20 bg-gold/[0.06] p-6 sm:p-9">
              <p className="text-xs tracking-luxe text-gold uppercase">Comprar barco Malibu</p>
              <h2 className="mt-3 font-serif text-3xl text-cream sm:text-4xl">
                Malibu Response LX 2013 à venda: resposta rápida para quem procura lancha esportiva premium
              </h2>
              <div className="mt-6 grid gap-4 text-sm leading-relaxed text-cream/75 md:grid-cols-3">
                <p>
                  Para buscas como comprar barco, comprar lancha, Malibu à venda, lancha de esqui aquático e barco de wakeboard, esta página reúne preço, fotos reais, ficha técnica e contato direto em um único lugar.
                </p>
                <p>
                  O conjunto anunciado traz motor Indmar Monsoon 350 SS V8 de 350 HP, transmissão direct drive, Zero Off GPS, ano de fabricação 2013, 940 horas de motor, bimini e carreta rodoviária galvanizada inclusa.
                </p>
                <p>
                  Se a intenção é decidir rápido, chame no WhatsApp, peça documentação, combine visita e avalie a sensação do V8 na água com o vendedor.
                </p>
              </div>
            </div>
          </section>
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
