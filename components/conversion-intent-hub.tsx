import { ArrowRight, CheckCircle2, FileCheck2, Gauge, MessageCircle, Waves } from 'lucide-react'
import { whatsappLeadUrl } from '@/lib/contact'
import { boat } from '@/lib/boat-data'

const intents = [
  {
    title: 'Quero comprar',
    description: `Fale direto sobre a ${boat.brand} ${boat.model} ${boat.year} e avance para negociação.`,
    href: whatsappLeadUrl('primary'),
    icon: MessageCircle,
    cta: 'Falar com o vendedor',
  },
  {
    title: 'Quero validar antes',
    description: 'Peça vídeos complementares, documentação disponível e informações de manutenção.',
    href: whatsappLeadUrl('documents'),
    icon: FileCheck2,
    cta: 'Solicitar evidências',
  },
  {
    title: 'Quero testar',
    description: 'Combine visita, avaliação presencial e condições para teste na água.',
    href: whatsappLeadUrl('test'),
    icon: Waves,
    cta: 'Agendar avaliação',
  },
  {
    title: 'Quero fazer proposta',
    description: `O valor anunciado é ${boat.priceLabel}. Se já avaliou o conjunto, abra a conversa de proposta.`,
    href: whatsappLeadUrl('offer'),
    icon: Gauge,
    cta: 'Fazer proposta',
  },
] as const

const proof = [
  `${boat.year} · ${boat.engineHours} h informadas`,
  'Indmar Monsoon 350 SS · V8 350 HP',
  'Direct Drive · Zero Off GPS',
  'Fotos reais da embarcação anunciada',
] as const

export function ConversionIntentHub() {
  return (
    <section id="comprar" className="relative border-y border-cream/10 bg-navy-deep/45 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-end">
          <div>
            <p className="text-xs tracking-luxe text-gold uppercase">Decisão de compra</p>
            <h2 className="mt-3 text-balance font-serif text-4xl leading-tight text-cream sm:text-5xl">
              Você não precisa percorrer o site inteiro para avançar.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-cream/65">
              Escolha em que ponto da decisão você está. Cada caminho abre a conversa certa, sem formulário e sem intermediário.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {proof.map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-2xl border border-cream/10 bg-background/25 px-4 py-3 text-sm text-cream/80">
                <CheckCircle2 className="size-4 shrink-0 text-gold" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {intents.map(({ title, description, href, icon: Icon, cta }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-whatsapp-intent={`intent_hub_${title.toLowerCase().replaceAll(' ', '_')}`}
              className="group flex min-h-64 flex-col rounded-3xl border border-cream/10 bg-background/45 p-6 transition hover:-translate-y-1 hover:border-gold/35 hover:bg-background/70"
            >
              <div className="grid size-11 place-items-center rounded-2xl bg-gold/12 text-gold">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-7 font-serif text-2xl text-cream">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-cream/60">{description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                {cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
