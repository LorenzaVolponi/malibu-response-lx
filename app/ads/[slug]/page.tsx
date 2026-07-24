import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MessageCircle } from 'lucide-react'
import { boat } from '@/lib/boat-data'
import { adsLandingPageUrl, adsLandingPages, getAdsLandingPage, seoLeadHref } from '@/lib/seo-pages'
import { googleAdsConversionPlan, googleAdsKeywordGroups, googleAdsNegativeKeywords } from '@/lib/ads-data'
import { siteConfig } from '@/lib/site-config'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return adsLandingPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getAdsLandingPage(slug)
  if (!page) return {}

  return {
    title: page.title,
    description: page.description,
    robots: { index: false, follow: true },
    alternates: { canonical: `/ads/${page.slug}` },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: adsLandingPageUrl(page.slug),
      title: page.title,
      description: page.description,
      images: ['/images/hero-side.jpeg'],
    },
  }
}

export default async function AdsLandingPage({ params }: Props) {
  const { slug } = await params
  const page = getAdsLandingPage(slug)
  if (!page) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${adsLandingPageUrl(page.slug)}/#product`,
    name: siteConfig.listingName,
    description: page.description,
    brand: { '@type': 'Brand', name: boat.brand },
    offers: {
      '@type': 'Offer',
      price: boat.price,
      priceCurrency: boat.currency,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/UsedCondition',
      url: siteConfig.url,
    },
  }

  return (
    <main id="conteudo" className="min-h-screen bg-background text-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mx-auto grid min-h-screen max-w-6xl gap-8 px-5 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-xs tracking-luxe text-gold uppercase">Landing de campanha</p>
          <h1 className="mt-4 text-balance font-serif text-5xl leading-tight sm:text-7xl">{page.h1}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{page.description}</p>
          <a href={seoLeadHref} target="_blank" rel="noopener noreferrer" data-whatsapp-intent="ads_landing_primary" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 py-3 font-semibold text-primary-foreground">
            <MessageCircle className="size-5" aria-hidden="true" />
            Receber vídeos e documentação
          </a>
        </div>
        <aside className="rounded-4xl border border-gold/20 bg-gold/[0.06] p-6 sm:p-8">
          <p className="text-xs tracking-luxe text-gold uppercase">Argumentos de conversão</p>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-cream/80">
            {page.bullets.map((bullet) => <li key={bullet}>• {bullet}</li>)}
          </ul>
          <div className="mt-8 rounded-3xl border border-cream/10 bg-navy-deep/45 p-5">
            <p className="text-xs tracking-luxe text-gold uppercase">Plano Google Ads</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Conversão primária: {googleAdsConversionPlan.at(-1)?.event}. Negativas críticas: {googleAdsNegativeKeywords.slice(0, 5).join(', ')}.</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Grupo exato: {googleAdsKeywordGroups.exactModel.slice(0, 3).join(' · ')}.</p>
          </div>
        </aside>
      </section>
    </main>
  )
}
