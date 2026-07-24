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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${pageUrl}/#article`,
    headline: page.title,
    description: page.description,
    dateModified: siteConfig.updatedAt,
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
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Guias', item: `${siteConfig.url}/guias` },
      { '@type': 'ListItem', position: 3, name: page.h1, item: pageUrl },
    ],
  }

  return (
    <main id="conteudo" className="min-h-screen bg-background px-5 py-16 text-cream sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <article className="mx-auto max-w-5xl">
        <a href="/" className="text-sm font-semibold text-gold hover:text-gold-soft">← Voltar para o anúncio principal</a>
        <p className="mt-10 text-xs tracking-luxe text-gold uppercase">Guia SEO de compra</p>
        <h1 className="mt-4 max-w-4xl text-balance font-serif text-4xl leading-tight sm:text-6xl">{page.h1}</h1>
        <p className="mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">{page.intro}</p>

        <div className="mt-10 flex flex-col gap-3 rounded-4xl border border-gold/20 bg-gold/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div>
            <p className="text-xs tracking-luxe text-gold uppercase">Contato qualificado</p>
            <p className="mt-2 text-sm text-cream/75">Peça vídeos, documentação, localização e condições de visita pelo WhatsApp.</p>
          </div>
          <a href={seoLeadHref} target="_blank" rel="noopener noreferrer" data-whatsapp-intent="seo_intent_page" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground">
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



        <section className="mt-10 rounded-3xl border border-cream/10 bg-cream/[0.035] p-6">
          <p className="text-xs tracking-luxe text-gold uppercase">Perguntas frequentes</p>
          <div className="mt-5 grid gap-4">
            {page.faqs.map((faq) => (
              <details key={faq.question} className="rounded-2xl border border-cream/10 bg-navy-deep/35 p-4">
                <summary className="cursor-pointer font-serif text-lg text-cream">{faq.question}</summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-cream/10 bg-navy-deep/45 p-6">
          <p className="text-xs tracking-luxe text-gold uppercase">Termos cobertos</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {page.keywords.map((keyword) => (
              <li key={keyword} className="rounded-full border border-cream/10 px-3 py-1 text-xs text-cream/75">{keyword}</li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  )
}
