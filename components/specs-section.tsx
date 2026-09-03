import { specs } from '@/lib/boat-data'
import { Gauge, Cog, Waves, Ship, Ruler, Satellite, Clock, MapPin, Wrench } from 'lucide-react'
import { SectionMotionEnhancer } from '@/components/section-motion-enhancer'

const icons = [Cog, Gauge, Waves, Ship, Ruler, Satellite, Clock, Gauge]

const toConfirm = [
  { label: 'Local de visita', value: 'Sob consulta', icon: MapPin },
  { label: 'Histórico de manutenção', value: 'Sob consulta', icon: Wrench },
] as const

export function SpecsSection() {
  return (
    <section id="especificacoes" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end" data-spec-head>
          <div>
            <p className="mb-3 text-xs tracking-luxe text-gold uppercase">
              Ficha técnica
            </p>
            <h2 className="text-balance font-serif text-4xl leading-tight text-cream sm:text-5xl">
              Dados de catálogo, leitura rápida e sem exagero
            </h2>
          </div>
          <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground lg:justify-self-end">
            Informações técnicas e comerciais da Malibu Response LX, lancha ideal para esqui aquático e wakeboard recreativo, com controle de velocidade Zero Off GPS.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div data-spec-grid className="rounded-3xl glass-strong p-4 sm:rounded-4xl sm:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 sm:mb-6 sm:gap-4">
              <p className="text-xs tracking-luxe text-gold uppercase">Confirmado</p>
              <span className="rounded-full border border-cream/10 px-3 py-1 text-xs text-cream/60">Malibu Response LX</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {specs.map((spec, i) => {
                const Icon = icons[i % icons.length]
                return (
                  <div key={spec.label} data-spec-card className="group rounded-2xl border border-cream/10 bg-cream/[0.035] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 sm:rounded-3xl sm:p-5">
                    <div className="mb-4 flex items-center justify-between gap-4 sm:mb-5">
                      <span className="grid size-10 place-items-center rounded-2xl bg-gold/12 text-gold">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="text-[10px] tracking-[0.22em] text-cream/35 uppercase">0{i + 1}</span>
                    </div>
                    <p className="text-xs tracking-luxe text-muted-foreground uppercase">{spec.label}</p>
                    <p className="mt-1 font-serif text-xl leading-tight text-cream sm:text-2xl">{spec.value}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{spec.note}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <aside className="rounded-3xl border border-cream/10 bg-navy-deep/50 p-5 sm:rounded-4xl sm:p-7">
            <p data-spec-card className="text-xs tracking-luxe text-gold uppercase">Complementar</p>
            <div className="mt-6 divide-y divide-cream/10">
              {toConfirm.map(({ label, value, icon: Icon }) => (
                <div key={label} data-spec-card className="flex items-center gap-4 py-5 first:pt-0 last:pb-0">
                  <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-cream/7 text-cream/75">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="font-serif text-xl text-cream">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <p data-spec-card className="mt-6 rounded-3xl bg-gold/10 p-4 text-sm leading-relaxed text-cream/75">
              Informações complementares devem ser confirmadas antes da visita, do teste na água e da análise documental.
            </p>
          </aside>
        </div>
      </div>
      <SectionMotionEnhancer sectionId="especificacoes" kind="specs" />
    </section>
  )
}
