import { MessageCircle } from 'lucide-react'
import { boat } from '@/lib/boat-data'
import { siteConfig } from '@/lib/site-config'

const decisionBlocks = [
  {
    title: 'Para avaliação imediata',
    copy: 'A página responde rápido: preço, ano, horas, motor, transmissão, itens inclusos, fotos reais e WhatsApp direto para reduzir atrito até a visita.',
  },
  {
    title: 'Para quem compara Malibu usada',
    copy: 'A Response LX 2013 combina motor Indmar Monsoon 350 SS V8 350 HP, eixo direto, Zero Off GPS e conjunto com bimini e carreta galvanizada — dados importantes para comparar antes da visita.',
  },
  {
    title: 'Para quem procura esqui e wakeboard',
    copy: 'Direct drive, controle de velocidade, casco, motor e itens inclusos aparecem em contexto prático para quem quer entender se a lancha combina com o uso na água.',
  },
] as const

const wa = `https://wa.me/${boat.whatsapp}?text=${encodeURIComponent(
  `Olá! Estou comparando barcos e quero avaliar a Malibu Response LX ${boat.year} com ${boat.engineHours} horas por ${boat.priceLabel}.`,
)}`

export function MarketProofSection() {
  return (
    <section id="comparar-malibu-response-lx" className="bg-background px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs tracking-luxe text-gold uppercase">Comparação clara</p>
          <h2 className="font-serif text-4xl leading-tight text-cream sm:text-5xl">
            Informações organizadas para o comprador decidir com segurança
          </h2>
          <p className="mt-5 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            A página organiza dados verificáveis, fotos, ficha técnica, perguntas frequentes e chamada direta para negociação em uma experiência simples para o comprador.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {decisionBlocks.map((block) => (
            <article key={block.title} className="rounded-3xl glass p-6">
              <h3 className="font-serif text-2xl text-cream">{block.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{block.copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-3xl border border-gold/20 bg-gold/[0.06] p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs tracking-luxe text-gold uppercase">Próximo clique</p>
            <p className="mt-2 font-serif text-2xl text-cream">Quer comparar com clareza? Peça os detalhes no WhatsApp.</p>
          </div>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Comparar agora
          </a>
          <a
            href={siteConfig.guidePath}
            className="inline-flex shrink-0 items-center rounded-full border border-cream/20 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-white/5"
          >
            Abrir guia de compra
          </a>
        </div>
      </div>
    </section>
  )
}
