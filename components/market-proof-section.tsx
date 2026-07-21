import { MessageCircle } from 'lucide-react'
import { boat } from '@/lib/boat-data'

const decisionBlocks = [
  {
    title: 'Para quem busca comprar barco agora',
    copy: 'A página responde rápido: preço, ano, horas, motor, transmissão, itens inclusos, fotos reais e WhatsApp direto. O objetivo é reduzir atrito entre descoberta, confiança e contato.',
  },
  {
    title: 'Para quem compara Malibu usada',
    copy: 'A Response LX 2013 combina motor Indmar Monsoon 350 SS V8 350 HP, eixo direto, Zero Off GPS e conjunto com bimini e carreta galvanizada — dados importantes para comparar antes da visita.',
  },
  {
    title: 'Para quem procura esqui e wakeboard',
    copy: 'Termos técnicos como direct drive, controle de velocidade, lancha de esqui aquático e barco de wakeboard aparecem com contexto real, não como lista artificial de palavras-chave.',
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
          <p className="mb-3 text-xs tracking-luxe text-gold uppercase">Intenção de compra real</p>
          <h2 className="font-serif text-4xl leading-tight text-cream sm:text-5xl">
            Conteúdo feito para ranquear porque ajuda o comprador a decidir
          </h2>
          <p className="mt-5 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            Em vez de esconder informação ou repetir termos sem contexto, a página organiza sinais que importam para busca e conversão: dados verificáveis, fotos, estrutura semântica, perguntas frequentes e chamada direta para negociação.
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
        </div>
      </div>
    </section>
  )
}
