import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MessageCircle } from 'lucide-react'
import { boat } from '@/lib/boat-data'
import { knowledgeEntities, knowledgeGraphForText } from '@/lib/knowledge-graph'
import { getSeoIntentPage, seoIntentPages, seoIntentPageUrl, seoLeadHref } from '@/lib/seo-pages'
import { siteConfig } from '@/lib/site-config'

type Props = {
  params: Promise<{ slug: string }>
}

type SeoIntentPage = (typeof seoIntentPages)[number]

const entityIds = {
  website: `${siteConfig.url}/#website`,
  seller: `${siteConfig.url}/#seller`,
  product: `${siteConfig.url}/#product`,
  brand: knowledgeEntities.malibuBoats.id,
  model: knowledgeEntities.responseLx.id,
  engine: knowledgeEntities.monsoon350.id,
  zeroOff: knowledgeEntities.zeroOff.id,
  directDrive: knowledgeEntities.directDrive.id,
  guides: `${siteConfig.url}/guias#webpage`,
}

const normalizeTerms = (values: readonly string[]) =>
  values
    .flatMap((value) => value.toLocaleLowerCase('pt-BR').split(/[^a-z0-9áàâãéèêíïóôõöúç]+/i))
    .filter((value) => value.length > 3)

const relatedGuides = (page: SeoIntentPage) => {
  const sourceTerms = new Set(normalizeTerms([page.title, page.h1, page.description, ...page.keywords]))

  return seoIntentPages
    .filter((candidate) => candidate.slug !== page.slug)
    .map((candidate) => {
      const candidateTerms = normalizeTerms([candidate.title, candidate.h1, candidate.description, ...candidate.keywords])
      const score = candidateTerms.reduce((total, term) => total + (sourceTerms.has(term) ? 1 : 0), 0)
      return { candidate, score }
    })
    .sort((a, b) => b.score - a.score || a.candidate.h1.localeCompare(b.candidate.h1, 'pt-BR'))
    .slice(0, 8)
    .map(({ candidate }) => candidate)
}

const summarizeSection = (text: string) => {
  const firstSentence = text.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim()
  return firstSentence || text
}

export function generateStaticParams() {
  return seoIntentPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getSeoIntentPage(slug)
  if (!page) return {}

  const pageUrl = seoIntentPageUrl(page.slug)

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: pageUrl,
      languages: { 'pt-BR': pageUrl },
    },
    keywords: [...page.keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: 'Náutica e compra de embarcações',
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      url: pageUrl,
      siteName: siteConfig.name,
      title: page.title,
      description: page.description,
      publishedTime: siteConfig.updatedAt,
      modifiedTime: siteConfig.updatedAt,
      images: [{
        url: `${siteConfig.url}/images/hero-side.jpeg`,
        width: 1600,
        height: 900,
        alt: `${siteConfig.listingName} ${boat.year} de perfil na água`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [`${siteConfig.url}/images/hero-side.jpeg`],
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
  const recommendations = relatedGuides(page)
  const imageId = `${pageUrl}#primary-image`
  const answerSummary = summarizeSection(page.intro)
  const faqItems = page.sections.map((section) => ({
    question: section.heading,
    answer: section.text,
  }))
  const knowledgeNodes = knowledgeGraphForText([
    page.title,
    page.h1,
    page.description,
    page.intro,
    ...page.keywords,
    ...page.sections.flatMap((section) => [section.heading, section.text]),
  ])
  const contextualEntityRefs = knowledgeNodes.map((node) => ({ '@id': node['@id'] }))
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      ...knowledgeNodes,
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.title,
        description: page.description,
        inLanguage: 'pt-BR',
        datePublished: siteConfig.updatedAt,
        dateModified: siteConfig.updatedAt,
        isPartOf: { '@id': entityIds.guides },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        primaryImageOfPage: { '@id': imageId },
        mainEntity: [
          { '@id': `${pageUrl}#article` },
          { '@id': `${pageUrl}#faq` },
        ],
        about: [
          { '@id': entityIds.product },
          { '@id': entityIds.model },
          ...contextualEntityRefs,
        ],
        relatedLink: recommendations.map((item) => seoIntentPageUrl(item.slug)),
      },
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        url: pageUrl,
        headline: page.title,
        description: page.description,
        abstract: answerSummary,
        datePublished: siteConfig.updatedAt,
        dateModified: siteConfig.updatedAt,
        inLanguage: 'pt-BR',
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
        isPartOf: { '@id': entityIds.guides },
        author: { '@id': entityIds.seller },
        publisher: { '@id': entityIds.seller },
        image: { '@id': imageId },
        about: { '@id': entityIds.product },
        mentions: contextualEntityRefs.length > 0 ? contextualEntityRefs : [
          { '@id': entityIds.brand },
          { '@id': entityIds.model },
          { '@id': entityIds.engine },
          { '@id': entityIds.zeroOff },
          { '@id': entityIds.directDrive },
        ],
        keywords: [...page.keywords],
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', '#resposta-direta', 'article section h2', 'article section p'],
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        inLanguage: 'pt-BR',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#related-guides`,
        name: `Guias relacionados a ${page.h1}`,
        numberOfItems: recommendations.length,
        itemListElement: recommendations.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.h1,
          url: seoIntentPageUrl(item.slug),
        })),
      },
      {
        '@type': 'ImageObject',
        '@id': imageId,
        url: `${siteConfig.url}/images/hero-side.jpeg`,
        contentUrl: `${siteConfig.url}/images/hero-side.jpeg`,
        caption: `${siteConfig.listingName} ${boat.year} de perfil na água`,
        representativeOfPage: true,
        inLanguage: 'pt-BR',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Malibu Response LX', item: siteConfig.url },
          { '@type': 'ListItem', position: 2, name: 'Guias', item: `${siteConfig.url}/guias` },
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

        <section id="resposta-direta" className="mt-8 rounded-3xl border border-gold/25 bg-gold/[0.08] p-6" aria-labelledby="resposta-direta-titulo">
          <p className="text-xs tracking-luxe text-gold uppercase">Resposta direta</p>
          <h2 id="resposta-direta-titulo" className="mt-3 font-serif text-2xl text-cream">Resumo em 30 segundos</h2>
          <p className="mt-3 text-sm leading-relaxed text-cream/80">{answerSummary}</p>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
            {page.sections.slice(0, 3).map((section) => (
              <li key={section.heading}>• <strong className="text-cream/90">{section.heading}:</strong> {summarizeSection(section.text)}</li>
            ))}
          </ul>
        </section>

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
            <a href="/boat.json" className="rounded-full border border-cream/10 px-4 py-2 text-xs text-cream/75 hover:border-gold/40">Ficha em JSON</a>
            <Link href="/comprar-barco-malibu-response-lx" className="rounded-full border border-cream/10 px-4 py-2 text-xs text-cream/75 hover:border-gold/40">Guia completo</Link>
          </div>
        </aside>

        <nav aria-label="Guias relacionados" className="mt-10 rounded-3xl border border-cream/10 bg-navy-deep/45 p-6">
          <p className="text-xs tracking-luxe text-gold uppercase">Continue por temas relacionados</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {recommendations.map((item) => (
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
