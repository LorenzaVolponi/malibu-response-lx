import type { Metadata } from 'next'
import Link from 'next/link'
import { boat, conditionItems, features, gallery, specs } from '@/lib/boat-data'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `Dossiê técnico da ${siteConfig.listingName} ${boat.year}`,
  description: `Ficha técnica, evidências visuais, itens informados e checklist de validação da ${siteConfig.listingName} ${boat.year} anunciada por ${boat.priceLabel}.`,
  alternates: { canonical: '/dossie-tecnico' },
  openGraph: {
    type: 'article',
    url: `${siteConfig.url}/dossie-tecnico`,
    title: `Dossiê técnico — ${siteConfig.listingName} ${boat.year}`,
    description: 'Dados objetivos do anúncio, evidências visuais e pontos que devem ser confirmados antes da compra.',
    images: ['/images/hero-side.jpeg'],
  },
}

const dossierJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  '@id': `${siteConfig.url}/dossie-tecnico#article`,
  headline: `Dossiê técnico da ${siteConfig.listingName} ${boat.year}`,
  description: 'Consolidação dos dados publicados no anúncio, evidências visuais e checklist de diligência para o comprador.',
  dateModified: siteConfig.updatedAt,
  inLanguage: 'pt-BR',
  mainEntityOfPage: `${siteConfig.url}/dossie-tecnico`,
  image: gallery.map((item) => `${siteConfig.url}${item.src}`),
  about: { '@id': `${siteConfig.url}/#product` },
}

export default function TechnicalDossierPage() {
  return (
    <main className="min-h-screen bg-[#08111f] px-6 py-16 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dossierJsonLd) }} />
      <article className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-amber-300 hover:underline">← Voltar ao anúncio</Link>

        <header className="mt-8 border-b border-white/15 pb-10">
          <p className="text-sm uppercase tracking-[0.28em] text-amber-300">Dossiê técnico do anúncio</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">{siteConfig.listingName} {boat.year}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">
            Consolidação transparente dos dados publicados, das evidências visuais disponíveis e dos pontos que devem ser confirmados diretamente com o vendedor antes da compra.
          </p>
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

        <section className="my-10 rounded-3xl border border-amber-300/25 bg-amber-300/[0.06] p-7 md:p-10">
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
          <Link href="/comprar-barco-malibu-response-lx" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#08111f]">Guia completo de compra</Link>
          <Link href="/boat.json" className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold">Dados em JSON</Link>
          <Link href="/" className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold">Ver anúncio principal</Link>
        </nav>
      </article>
    </main>
  )
}
