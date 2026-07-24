import { BadgeCheck, FileCheck2, Gauge, MessageCircle, ShipWheel, Truck } from 'lucide-react'
import { boat } from '@/lib/boat-data'
import { whatsappLeadUrl } from '@/lib/contact'

const valuePoints = [
  {
    icon: Gauge,
    title: 'Conjunto mecânico desejado',
    copy: 'Motor Indmar Monsoon 350 SS V8 de 350 HP, transmissão direct drive e controle Zero Off por GPS.',
  },
  {
    icon: ShipWheel,
    title: 'Vocação esportiva real',
    copy: 'Arquitetura consagrada para esqui aquático, com resposta previsível e controle preciso de velocidade.',
  },
  {
    icon: Truck,
    title: 'Carreta e bimini inclusos',
    copy: 'O conjunto acompanha carreta rodoviária galvanizada e toldo bimini, reduzindo custos adicionais de entrada.',
  },
  {
    icon: BadgeCheck,
    title: 'Características verificáveis',
    copy: 'Ano, horas, motor, painel, acabamento e acessórios são apresentados com fotos reais da embarcação.',
  },
] as const

const dueDiligenceItems = [
  'Documentação e titularidade',
  'Histórico de revisões e manutenções',
  'Condição de casco, eixo, hélice e carreta',
  'Teste de funcionamento e avaliação na água',
] as const

export function ValueProofSection() {
  return (
    <section id="valor" className="relative bg-background px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs tracking-luxe text-gold uppercase">Valor do conjunto</p>
            <h2 className="max-w-4xl text-balance font-serif text-4xl leading-tight text-cream sm:text-5xl">
              O que sustenta o valor de {boat.priceLabel}
            </h2>
            <p className="mt-5 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Mais do que ano e aparência, esta Malibu reúne motorização V8, direct drive, Zero Off, carreta e configuração esportiva em um único conjunto. A decisão final deve ser apoiada por visita, documentos e avaliação técnica.
            </p>
          </div>

          <div className="rounded-3xl border border-gold/20 bg-gold/[0.06] p-6 sm:p-7">
            <p className="text-xs tracking-luxe text-gold uppercase">Próximo passo recomendado</p>
            <p className="mt-3 text-sm leading-relaxed text-cream/75">
              Solicite vídeos complementares, informações documentais e condições para visita antes de apresentar sua proposta.
            </p>
            <a
              href={whatsappLeadUrl('documents')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Receber vídeos e documentação
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {valuePoints.map(({ icon: Icon, title, copy }) => (
            <article key={title} className="rounded-3xl glass p-6">
              <div className="mb-6 grid size-11 place-items-center rounded-2xl bg-gold/12 text-gold">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl text-cream">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-cream/10 bg-navy-deep/45 p-6 sm:p-8">
          <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="mb-4 grid size-12 place-items-center rounded-2xl bg-gold/12 text-gold">
                <FileCheck2 className="size-6" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl text-cream">Checklist antes da compra</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Estes pontos devem ser confirmados diretamente com o vendedor e, quando possível, com apoio de um profissional náutico independente.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {dueDiligenceItems.map((item) => (
                <li key={item} className="rounded-2xl border border-cream/10 bg-cream/[0.035] px-4 py-4 text-sm leading-relaxed text-cream/80">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
