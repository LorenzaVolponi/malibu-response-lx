import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MessageCircle } from 'lucide-react'
import { boat } from '@/lib/boat-data'
import { getSeoIntentPage, seoIntentPages, seoIntentPageUrl, seoLeadHref } from '@/lib/seo-pages'
import { siteConfig } from '@/lib/site-config'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return seoIntentPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getSeoIntentPage(slug)
  if (!page) return {}

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/guias/${page.slug}` },
    keywords: [...page.keywords],
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      url: seoIntentPageUrl(page.slug),
      title: page.title,
      description: page.description,
      images: ['/images/hero-side.jpeg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: ['/images/hero-side.jpeg'],
    },
  }
}

export default async function SeoIntentPage({ params }: Props) {
  const { slug } = await params
  const page = getSeoIntentPage(slug)
  if (!page) notFound()

  const pageUrl = seoIntentPageUrl(page.slug)
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${pageUrl}/#article`,
      headline: page.title,
      description: page.description,
      inLanguage: 'pt-BR',
      mainEntityOfPage: pageUrl,
      about: {
        '@type': 'Product',
        name: siteConfig.listingName,
        brand: { '@type': 'Brand', name: boat.brand },
        offers: {
          '@type': 'Offer',
          price: boat.price,
          priceCurrency: boat.currency,
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/UsedCondition',
          url: siteConfig.url,
        },
      },
      keywords: [...page.keywords],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Malibu Response LX', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Guias de compra', item: `${siteConfig.url}${siteConfig.guidePath}` },
        { '@type': 'ListItem', position: 3, name: page.h1, item: pageUrl },
      ],
    },
  ]

  return (
    <main id="conteudo" className="min-h-screen bg-background px-5 py-16 text-cream sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-5xl">
        <a href="/" className="text-sm font-semibold text-gold hover:text-gold-soft">← Voltar para o anúncio principal</a>
        <p className="mt-10 text-xs tracking-luxe text-gold uppercase">Guia do comprador</p>
        <h1 className="mt-4 max-w-4xl text-balance font-serif text-4xl leading-tight sm:text-6xl">{page.h1}</h1>
        <p className="mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">{page.intro}</p>

        <div className="mt-10 flex flex-col gap-3 rounded-4xl border border-gold/20 bg-gold/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div>
            <p className="text-xs tracking-luxe text-gold uppercase">Fale diretamente pelo WhatsApp</p>
            <p className="mt-2 text-sm text-cream/75">Solicite vídeos, documentação disponível, histórico informado e condições para avaliação.</p>
          </div>
          <a href={seoLeadHref} target="_blank" rel="noopener noreferrer" data-whatsapp-intent={`guia_${page.slug}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground">
            <MessageCircle className="size-4" aria-hidden="true" />
            Falar com vendedor
          </a>
        </div>

        <div className="mt-10 grid gap-5">
          {page.sections.map((section) => (
            <section key={section.heading} className="rounded-3xl border border-cream/10 bg-cream/[0.035] p-6">
              <h2 className="font-serif text-2xl text-cream">{section.heading}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{section.text}</p>
            </section>
          ))}
        </div>

        <nav aria-label="Outros guias" className="mt-10 rounded-3xl border border-cream/10 bg-navy-deep/45 p-6">
          <p className="text-xs tracking-luxe text-gold uppercase">Continue pesquisando</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {seoIntentPages
              .filter((item) => item.slug !== page.slug)
              .slice(0, 4)
              .map((item) => (
                <a key={item.slug} href={`/guias/${item.slug}`} className="rounded-full border border-cream/10 px-3 py-2 text-xs text-cream/75 transition-colors hover:border-gold/40 hover:text-gold-soft">
                  {item.h1}
                </a>
              ))}
          </div>
        </nav>
      </article>
    </main>
  )
}
