import type { Metadata } from 'next'
import Link from 'next/link'
import { boat, conditionItems, features, gallery, specs } from '@/lib/boat-data'
import { siteConfig } from '@/lib/site-config'

const dossierUrl = `${siteConfig.url}/dossie-tecnico`
const updatedLabel = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: 'America/Sao_Paulo',
}).format(new Date(siteConfig.updatedAt))

export const metadata: Metadata = {
  title: `Dossiê técnico da ${siteConfig.listingName} ${boat.year}`,
  description: `Ficha técnica, evidências visuais, itens informados e checklist de validação da ${siteConfig.listingName} ${boat.year} anunciada por ${boat.priceLabel}.`,
  alternates: { canonical: '/dossie-tecnico' },
  authors: [{ name: siteConfig.name }],
  category: 'Náutica e diligência de compra',
  openGraph: {
    type: 'article',
    locale: 'pt_BR',
    url: dossierUrl,
    siteName: siteConfig.name,
    title: `Dossiê técnico — ${siteConfig.listingName} ${boat.year}`,
    description: 'Dados objetivos do anúncio, evidências visuais, metodologia de conferência e pontos que devem ser confirmados antes da compra.',
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
    title: `Dossiê técnico — ${siteConfig.listingName} ${boat.year}`,
    description: 'Ficha técnica, evidências visuais e checklist independente para avaliar a embarcação anunciada.',
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

const dossierJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${dossierUrl}#webpage`,
      url: dossierUrl,
      name: `Dossiê técnico da ${siteConfig.listingName} ${boat.year}`,
      description: 'Consolidação dos dados publicados no anúncio, evidências visuais, metodologia de conferência e checklist de diligência para o comprador.',
      inLanguage: 'pt-BR',
      datePublished: siteConfig.updatedAt,
      dateModified: siteConfig.updatedAt,
      isPartOf: { '@id': `${siteConfig.url}/#website` },
      breadcrumb: { '@id': `${dossierUrl}#breadcrumb` },
      primaryImageOfPage: { '@id': `${siteConfig.url}/images/hero-side.jpeg#image` },
      mainEntity: { '@id': `${dossierUrl}#article` },
      relatedLink: [
        `${siteConfig.url}/boat.json`,
        `${siteConfig.url}/guias`,
        `${siteConfig.url}${siteConfig.guidePath}`,
      ],
    },
    {
      '@type': 'TechArticle',
      '@id': `${dossierUrl}#article`,
      headline: `Dossiê técnico da ${siteConfig.listingName} ${boat.year}`,
      description: 'Consolidação dos dados publicados no anúncio, evidências visuais e checklist de diligência para o comprador.',
      datePublished: siteConfig.updatedAt,
      dateModified: siteConfig.updatedAt,
      inLanguage: 'pt-BR',
      mainEntityOfPage: { '@id': `${dossierUrl}#webpage` },
      author: { '@id': `${siteConfig.url}/#seller` },
      publisher: { '@id': `${siteConfig.url}/#seller` },
      image: gallery.map((item, index) => ({ '@id': `${siteConfig.url}/#image-${index + 1}` })),
      about: { '@id': `${siteConfig.url}/#product` },
      isBasedOn: { '@id': `${siteConfig.url}/boat.json#dataset` },
      mentions: [
        { '@id': `${siteConfig.url}/#malibu-boats` },
        { '@id': `${siteConfig.url}/#response-lx` },
        { '@id': `${siteConfig.url}/#indmar-monsoon-350-ss` },
        { '@id': `${siteConfig.url}/#zero-off-gps` },
        { '@id': `${siteConfig.url}/#direct-drive` },
      ],
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '#resumo-dossie', '#metodologia-dossie', '#validacao-dossie'],
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
      '@id': `${dossierUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: siteConfig.listingName, item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Dossiê técnico', item: dossierUrl },
      ],
    },
  ],
}

export default function TechnicalDossierPage() {
  return (
    <main id="conteudo" className="min-h-screen bg-[#08111f] px-6 py-16 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dossierJsonLd) }} />
      <article className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-amber-300 hover:underline">← Voltar ao anúncio</Link>

        <header className="mt-8 border-b border-white/15 pb-10">
          <p className="text-sm uppercase tracking-[0.28em] text-amber-300">Dossiê técnico do anúncio</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">{siteConfig.listingName} {boat.year}</h1>
          <p id="resumo-dossie" className="mt-5 max-w-3xl text-lg leading-8 text-white/75">
            Consolidação transparente dos dados publicados, das evidências visuais disponíveis e dos pontos que devem ser confirmados diretamente com o vendedor antes da compra.
          </p>
          <p className="mt-4 text-sm text-white/45">Última atualização editorial: {updatedLabel}.</p>
        </header>

        <section className="grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-4" aria-label="Resumo do anúncio">
          {[
            ['Preço anunciado', boat.priceLabel],
            ['Ano informado', String(boat.year)],
            ['Horas informadas', `${boat.engineHours} h`],
            ['Localização publicada', boat.location],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-white/55">{label}</p>
              <p className="mt-2 text-xl font-medium">{value}</p>
            </div>
          ))}
        </section>

        <section id="metodologia-dossie" className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 md:p-9">
          <p className="text-sm uppercase tracking-[0.22em] text-amber-300">Metodologia e transparência</p>
          <h2 className="mt-3 text-3xl font-semibold">Como este dossiê foi organizado</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ['Dados declarados', 'Preço, ano, horas, localização, equipamentos e especificações são apresentados como informações publicadas no anúncio.'],
              ['Evidência visual', 'As fotografias são usadas para contextualizar casco, interior, painel, motor, acessórios e carreta, sem substituir inspeção.'],
              ['Validação independente', 'Documentação, mecânica, titularidade, histórico e condição atual devem ser confirmados pelo comprador e por profissionais de sua confiança.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-white/10 p-5">
                <h3 className="font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8">
          <h2 className="text-3xl font-semibold">Ficha técnica publicada</h2>
          <dl className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] px-6">
            {specs.map((item) => (
              <div key={item.label} className="grid gap-2 py-5 md:grid-cols-[220px_1fr]">
                <dt className="text-white/55">{item.label}</dt>
                <dd><span className="font-medium">{item.value}</span><span className="ml-2 text-sm text-white/50">{item.note}</span></dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="py-8">
          <h2 className="text-3xl font-semibold">Evidências e itens apresentados</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {conditionItems.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 p-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-medium">{item.label}</h3>
                  <span className="rounded-full bg-amber-300/10 px-3 py-1 text-xs text-amber-200">{item.status}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/65">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8">
          <h2 className="text-3xl font-semibold">Destaques informados</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-xl font-medium">{feature.title}</h3>
                <p className="mt-3 leading-7 text-white/65">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="validacao-dossie" className="my-10 rounded-3xl border border-amber-300/25 bg-amber-300/[0.06] p-7 md:p-10">
          <h2 className="text-3xl font-semibold">O que validar antes de fechar</h2>
          <ul className="mt-6 space-y-3 text-white/75">
            <li>• Disponibilidade atual, documentação e titularidade.</li>
            <li>• Registros de manutenção, revisões, fluidos e sistema de arrefecimento.</li>
            <li>• Leitura do horímetro, partida a frio e funcionamento do Zero Off.</li>
            <li>• Inspeção de casco, estofamento, elétrica, carreta e acessórios.</li>
            <li>• Teste presencial na água e avaliação técnica independente.</li>
          </ul>
          <p className="mt-6 text-sm leading-6 text-white/55">
            Esta página organiza as informações do anúncio; não substitui laudo, inspeção mecânica, consulta documental ou confirmação do vendedor.
          </p>
        </section>

        <nav className="flex flex-wrap gap-4 border-t border-white/15 pt-8" aria-label="Recursos relacionados">
          <Link href="/guias" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#08111f]">Central de guias</Link>
          <Link href="/comprar-barco-malibu-response-lx" className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold">Guia completo de compra</Link>
          <Link href="/boat.json" className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold">Dados em JSON</Link>
          <Link href="/" className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold">Ver anúncio principal</Link>
        </nav>
      </article>
    </main>
  )
}
