import { BadgeCheck, Camera, FileCheck2, Gauge, ShipWheel, Truck } from 'lucide-react'
import { boat } from '@/lib/boat-data'

const valuePoints = [
  {
    icon: Gauge,
    title: 'Conjunto mecânico identificado',
    copy: 'Motor Indmar Monsoon 350 SS V8 de 350 HP, transmissão direct drive e controle Zero Off por GPS.',
  },
  {
    icon: ShipWheel,
    title: 'Vocação esportiva verificável',
    copy: 'Arquitetura associada ao esqui aquático, com resposta previsível e controle preciso de velocidade.',
  },
  {
    icon: Truck,
    title: 'Carreta e bimini inclusos',
    copy: 'O conjunto apresentado inclui carreta rodoviária galvanizada e toldo bimini.',
  },
  {
    icon: Camera,
    title: 'Registro visual real',
    copy: 'Casco, painel, interior, motor e acessórios são apresentados com fotografias reais da embarcação.',
  },
] as const

const authenticityEvidence = [
  { label: 'Ano informado', value: String(boat.year) },
  { label: 'Horas de motor', value: `${boat.engineHours} h` },
  { label: 'Motor identificado', value: 'Indmar Monsoon 350 SS' },
  { label: 'Potência', value: '350 HP' },
  { label: 'Transmissão', value: 'Direct Drive' },
  { label: 'Controle de velocidade', value: 'Zero Off GPS' },
  { label: 'Itens visíveis', value: 'Bimini e carreta galvanizada' },
  { label: 'Base de evidência', value: 'Fotos e ficha técnica do anúncio' },
] as const

const dueDiligenceItems = [
  'Documentação e titularidade devem ser confirmadas antes da compra.',
  'Histórico de revisões e manutenções deve ser solicitado quando disponível.',
  'Casco, eixo, hélice e carreta devem passar por inspeção presencial.',
  'Teste de funcionamento e avaliação na água são recomendados.',
] as const

export function ValueProofSection() {
  return (
    <section id="valor" className="relative bg-background px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs tracking-luxe text-gold uppercase">Prova de autenticidade</p>
            <h2 className="max-w-4xl text-balance font-serif text-4xl leading-tight text-cream sm:text-5xl">
              Evidências que sustentam o anúncio de {boat.priceLabel}
            </h2>
            <p className="mt-5 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              O anúncio reúne dados técnicos consistentes, fotografias reais e identificação visual dos principais componentes. Isso aumenta a transparência, mas não substitui documentação, inspeção independente e teste presencial.
            </p>
          </div>

          <div className="rounded-3xl border border-gold/20 bg-gold/[0.06] p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gold/12 text-gold">
                <BadgeCheck className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs tracking-luxe text-gold uppercase">Transparência do anúncio</p>
                <p className="mt-3 text-sm leading-relaxed text-cream/75">
                  Ano, horas, motor, transmissão, Zero Off, carreta e bimini aparecem de forma consistente na ficha, nas imagens e nos dados estruturados.
                </p>
              </div>
            </div>
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

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {authenticityEvidence.map((item) => (
            <article key={item.label} className="rounded-2xl border border-cream/10 bg-navy-deep/45 p-5">
              <p className="text-[10px] tracking-[0.2em] text-gold uppercase">{item.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-cream/85">{item.value}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-cream/10 bg-navy-deep/45 p-6 sm:p-8">
          <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="mb-4 grid size-12 place-items-center rounded-2xl bg-gold/12 text-gold">
                <FileCheck2 className="size-6" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl text-cream">O que ainda exige validação</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A prova de autenticidade do anúncio organiza o que já está documentado, mas mantém explícitos os limites das informações publicadas.
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
