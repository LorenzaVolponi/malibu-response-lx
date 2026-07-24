import type { Metadata } from 'next'
import Link from 'next/link'
import { boat } from '@/lib/boat-data'
import { seoIntentPages } from '@/lib/seo-pages'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Guias sobre Malibu Response LX, direct drive e compra de lancha usada',
  description: 'Central de conteúdo sobre Malibu Response LX, motor Indmar Monsoon, Zero Off GPS, direct drive, preço, documentação, horas de motor e compra segura de lancha usada.',
  alternates: { canonical: '/guias' },
  keywords: [
    'Malibu Response LX',
    'Malibu Response LX à venda',
    'lancha direct drive',
    'Indmar Monsoon 350 SS',
    'Zero Off GPS',
    'comprar lancha usada',
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${siteConfig.url}/guias`,
    siteName: siteConfig.name,
    title: 'Guias da Malibu Response LX',
    description: 'Conteúdo técnico para pesquisar, comparar e validar a compra de uma Malibu Response LX usada.',
    images: [{ url: '/images/hero-side.jpeg', width: 1600, height: 900, alt: `${siteConfig.listingName} ${boat.year}` }],
  },
}

export default function GuidesHubPage() {
  const url = `${siteConfig.url}/guias`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#webpage`,
        url,
        name: 'Guias sobre Malibu Response LX e compra de lancha usada',
        description: 'Central de conteúdos técnicos relacionados à embarcação anunciada e à diligência de compra.',
        inLanguage: 'pt-BR',
        isPartOf: { '@id': `${siteConfig.url}/#website` },
        mainEntity: { '@id': `${url}#guides` },
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#guides`,
        name: 'Guias técnicos e de compra',
        numberOfItems: seoIntentPages.length,
        itemListElement: seoIntentPages.map((page, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${siteConfig.url}/guias/${page.slug}`,
          name: page.h1,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: siteConfig.listingName, item: siteConfig.url },
          { '@type': 'ListItem', position: 2, name: 'Guias', item: url },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen bg-background px-5 py-16 text-cream sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm font-semibold text-gold hover:text-gold-soft">← Voltar ao anúncio</Link>
        <header className="mt-10 max-w-4xl">
          <p className="text-xs tracking-luxe text-gold uppercase">Central de conhecimento</p>
          <h1 className="mt-4 text-balance font-serif text-4xl leading-tight sm:text-6xl">Guias sobre Malibu Response LX e compra de lancha usada</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Conteúdo técnico para entender motor, transmissão, controle de velocidade, preço, horas de uso, documentação e os principais cuidados antes de comprar uma embarcação esportiva usada.
          </p>
        </header>

        <section className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Guias disponíveis">
          {seoIntentPages.map((page) => (
            <article key={page.slug} className="flex h-full flex-col rounded-3xl border border-cream/10 bg-cream/[0.035] p-6">
              <p className="text-xs tracking-luxe text-gold uppercase">Guia técnico</p>
              <h2 className="mt-3 font-serif text-2xl leading-tight">{page.h1}</h2>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{page.description}</p>
              <Link href={`/guias/${page.slug}`} className="mt-6 inline-flex text-sm font-semibold text-gold-soft hover:text-gold">Ler guia completo →</Link>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-3xl border border-gold/20 bg-gold/[0.06] p-7">
          <h2 className="font-serif text-3xl">Fontes principais do anúncio</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">Consulte os dados consolidados e confirme com o vendedor tudo o que não estiver comprovado nas páginas oficiais.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/dossie-tecnico" className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-primary-foreground">Dossiê técnico</Link>
            <Link href="/comprar-barco-malibu-response-lx" className="rounded-full border border-cream/15 px-5 py-3 text-sm font-semibold">Guia de compra</Link>
            <Link href="/boat.json" className="rounded-full border border-cream/15 px-5 py-3 text-sm font-semibold">Dados estruturados</Link>
          </div>
        </section>
      </div>
    </main>
  )
}
