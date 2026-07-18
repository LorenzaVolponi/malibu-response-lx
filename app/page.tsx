import { SmoothScroll } from '@/components/smooth-scroll'
import { ScrollProgress } from '@/components/scroll-progress'
import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { JourneyScroll } from '@/components/journey-scroll'
import { SpecsSection } from '@/components/specs-section'
import { FeaturesSection } from '@/components/features-section'
import { GallerySection } from '@/components/gallery-section'
import { PricingCta } from '@/components/pricing-cta'
import { SiteFooter } from '@/components/site-footer'
import { boat } from '@/lib/boat-data'

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
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SmoothScroll>
        <ScrollProgress />
        <SiteNav />
        <main>
          <Hero />
          <JourneyScroll />
          <SpecsSection />
          <FeaturesSection />
          <GallerySection />
          <PricingCta />
        </main>
        <SiteFooter />
      </SmoothScroll>
    </>
  )
}
