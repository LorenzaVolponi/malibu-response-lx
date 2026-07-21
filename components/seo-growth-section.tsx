import { MessageCircle } from 'lucide-react'
import { boat } from '@/lib/boat-data'
import { seoKeywordClusters, trustSignals } from '@/lib/seo-data'

const wa = `https://wa.me/${boat.whatsapp}?text=${encodeURIComponent(
  `Olá! Vim pela página da Malibu Response LX 2013 anunciada por ${boat.priceLabel}. Quero receber os próximos passos para avaliar e negociar.`,
)}`

export function SeoGrowthSection() {
  return (
    <section id="comprar-barco-malibu" className="bg-background px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-4xl border border-gold/20 bg-gold/[0.06] p-6 sm:p-9">
          <p className="text-xs tracking-luxe text-gold uppercase">Comprar barco Malibu</p>
          <div className="mt-3 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h2 className="font-serif text-3xl leading-tight text-cream sm:text-5xl">
                Malibu Response LX 2013 à venda para quem procura uma lancha esportiva pronta para avaliar
              </h2>
              <p className="mt-5 max-w-3xl text-pretty text-sm leading-relaxed text-cream/75 sm:text-base">
                Aqui você encontra preço, ano, horas, motor, transmissão, fotos reais, itens inclusos e WhatsApp do vendedor em uma jornada única.
              </p>
            </div>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Receber detalhes no WhatsApp
            </a>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {seoKeywordClusters.map((cluster) => (
            <article key={cluster.title} className="rounded-3xl glass p-6">
              <h3 className="font-serif text-2xl text-cream">{cluster.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cluster.intent}</p>
            </article>
          ))}
        </div>

        <aside className="rounded-3xl border border-cream/10 bg-navy-deep/50 p-6">
          <p className="text-xs tracking-luxe text-gold uppercase">Sinais de confiança</p>
          <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-cream/78 sm:grid-cols-2 lg:grid-cols-3">
            {trustSignals.map((signal) => (
              <li key={signal}>• {signal}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}
