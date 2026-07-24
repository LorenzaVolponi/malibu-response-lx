import type { Metadata } from 'next'
import Link from 'next/link'
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
    authors: [{ name: siteConfig.name }],
    category: 'Náutica e compra de embarcações',
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      url: seoIntentPageUrl(page.slug),
      siteName: siteConfig.name,
      title: page.title,
      description: page.description,
      publishedTime: siteConfig.updatedAt,
      modifiedTime: siteConfig.updatedAt,
      images: [{
        url: '/images/hero-side.jpeg',
        width: 1600,
        height: 900,
        alt: `${siteConfig.listingName} ${boat.year} de perfil na água`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: ['/images/hero-side.jpeg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
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
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.title,
        description: page.description,
        inLanguage: 'pt-BR',
        datePublished: siteConfig.updatedAt,
        dateModified: siteConfig.updatedAt,
        isPartOf: { '@id': `${siteConfig.url}/#website` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        primaryImageOfPage: { '@id': `${siteConfig.url}/images/hero-side.jpeg#image` },
        mainEntity: { '@id': `${pageUrl}#article` },
      },
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: page.title,
        description: page.description,
        datePublished: siteConfig.updatedAt,
        dateModified: siteConfig.updatedAt,
        inLanguage: 'pt-BR',
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
        author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
        publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
        image: { '@id': `${siteConfig.url}/images/hero-side.jpeg#image` },
        about: { '@id': `${siteConfig.url}/#product` },
        keywords: [...page.keywords],
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'article > p', 'article section h2', 'article section p'],
        },
      },
      {
        '@type': 'ImageObject',
        '@id': `${siteConfig.url}/images/hero-side.jpeg#image`,
        url: `${siteConfig.url}/images/hero-side.jpeg`,
        contentUrl: `${siteConfig.url}/images/hero-side.jpeg`,
        caption: `${siteConfig.listingName} ${boat.year} de perfil na água`,
        representativeOfPage: true,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Malibu Response LX', item: siteConfig.url },
          { '@type': 'ListItem', position: 2, name: 'Guia de compra', item: `${siteConfig.url}${siteConfig.guidePath}` },
          { '@type': 'ListItem', position: 3, name: page.h1, item: pageUrl },
        ],
      },
    ],
  }

  return (
    <main id="conteudo" className="min-h-screen bg-background px-5 py-16 text-cream sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-semibold text-gold hover:text-gold-soft">← Voltar para o anúncio principal</Link>
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

        <aside className="mt-10 rounded-3xl border border-gold/20 bg-gold/[0.05] p-6" aria-label="Fontes técnicas do anúncio">
          <p className="text-xs tracking-luxe text-gold uppercase">Dados verificáveis do anúncio</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/dossie-tecnico" className="rounded-full border border-gold/30 px-4 py-2 text-xs text-gold-soft hover:border-gold">Dossiê técnico</Link>
            <Link href="/boat.json" className="rounded-full border border-cream/10 px-4 py-2 text-xs text-cream/75 hover:border-gold/40">Ficha em JSON</Link>
            <Link href="/comprar-barco-malibu-response-lx" className="rounded-full border border-cream/10 px-4 py-2 text-xs text-cream/75 hover:border-gold/40">Guia completo</Link>
          </div>
        </aside>

        <nav aria-label="Outros guias" className="mt-10 rounded-3xl border border-cream/10 bg-navy-deep/45 p-6">
          <p className="text-xs tracking-luxe text-gold uppercase">Continue pesquisando</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {seoIntentPages
              .filter((item) => item.slug !== page.slug)
              .slice(0, 8)
              .map((item) => (
                <Link key={item.slug} href={`/guias/${item.slug}`} className="rounded-full border border-cream/10 px-3 py-2 text-xs text-cream/75 transition-colors hover:border-gold/40 hover:text-gold-soft">
                  {item.h1}
                </Link>
              ))}
          </div>
        </nav>
      </article>
    </main>
  )
}
