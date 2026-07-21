import { Anchor, Camera, SearchCheck, Share2 } from 'lucide-react'

const seoHighlights = [
  {
    icon: SearchCheck,
    title: 'Conteúdo rastreável',
    copy: 'Termos de busca como lancha Malibu Response LX, lancha de esqui aquático, wakeboard e direct drive aparecem em contexto real, sem repetição artificial.',
  },
  {
    icon: Camera,
    title: 'Imagens com intenção',
    copy: 'Fotos reais, textos alternativos descritivos e galeria ampliável ajudam compradores e mecanismos de busca a entenderem cada detalhe do anúncio.',
  },
  {
    icon: Anchor,
    title: 'Confiança para visita',
    copy: 'Motor, acessórios inclusos, itens a confirmar e perguntas frequentes reduzem atrito antes do contato com o vendedor.',
  },
  {
    icon: Share2,
    title: 'Pronto para off-page',
    copy: 'Título, descrição, Open Graph, canonical, sitemap e dados estruturados melhoram o compartilhamento em redes, classificados e links externos.',
  },
] as const

export function SeoTrustSection() {
  return (
    <section id="seo" className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs tracking-luxe text-gold uppercase">
              Visibilidade orgânica
            </p>
            <h2 className="text-balance font-serif text-4xl leading-tight text-cream sm:text-5xl">
              Anúncio preparado para compradores e buscadores
            </h2>
          </div>
          <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            A página combina UX premium com SEO on-page para captar intenção de compra: quem procura uma lancha Malibu Response LX à venda, uma embarcação direct drive para esqui aquático ou uma lancha V8 com carreta encontra informações claras antes de chamar no WhatsApp.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {seoHighlights.map(({ icon: Icon, title, copy }) => (
            <article key={title} className="rounded-3xl glass p-5">
              <div className="mb-5 grid size-11 place-items-center rounded-2xl bg-gold/12 text-gold">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl text-cream">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
