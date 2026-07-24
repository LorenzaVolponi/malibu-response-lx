import { Anchor, Camera, SearchCheck, Share2 } from 'lucide-react'
import { mobileSeoChecklist, offPageChannels, offPagePlaybook, trendResearchTopics } from '@/lib/seo-data'

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
    copy: 'Motor, acessórios inclusos, itens a confirmar e perguntas frequentes reduzem atrito antes do contato pelo WhatsApp.',
  },
  {
    icon: Share2,
    title: 'Pronto para off-page',
    copy: 'Título, descrição, Open Graph, canonical, sitemap, UTMs e dados estruturados melhoram compartilhamento em redes, classificados e links externos.',
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
              Visibilidade orgânica e off-page
            </p>
            <h2 className="text-balance font-serif text-4xl leading-tight text-cream sm:text-5xl">
              Anúncio preparado para compradores, buscadores e tráfego pago
            </h2>
          </div>
          <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            A página combina UX premium, SEO on-page, plano de distribuição externa e marcação de conversão para captar intenção de compra antes do clique direto no WhatsApp.
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

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-3xl border border-cream/10 bg-cream/[0.035] p-6">
            <p className="text-xs tracking-luxe text-gold uppercase">Checklist off-page</p>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {offPagePlaybook.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border border-gold/20 bg-gold/[0.06] p-6">
            <p className="text-xs tracking-luxe text-gold uppercase">Canais com UTM</p>
            <div className="mt-5 grid gap-3">
              {offPageChannels.map((channel) => (
                <div key={channel.channel} className="rounded-2xl bg-navy-deep/35 p-4">
                  <p className="font-serif text-lg text-cream">{channel.channel}</p>
                  <p className="mt-1 text-xs text-gold">utm_source={channel.utm_source} · utm_medium={channel.utm_medium}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{channel.action}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-3xl border border-cream/10 bg-cream/[0.035] p-6">
            <p className="text-xs tracking-luxe text-gold uppercase">Mobile-first</p>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {mobileSeoChecklist.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border border-cream/10 bg-navy-deep/45 p-6">
            <p className="text-xs tracking-luxe text-gold uppercase">Pesquisa e tendências</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {trendResearchTopics.map((item) => (
                <div key={item.topic} className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-4">
                  <h3 className="font-serif text-lg text-cream">{item.topic}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.angle}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
