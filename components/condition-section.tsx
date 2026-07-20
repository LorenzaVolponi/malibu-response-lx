'use client'

import { useRef } from 'react'
import { CheckCircle2, ShieldCheck } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { conditionItems } from '@/lib/boat-data'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export function ConditionSection() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-condition-reveal]', {
          y: 36,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: 'top 72%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="estado" className="relative bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end" data-condition-reveal>
          <div>
            <p className="mb-3 text-xs tracking-luxe text-gold uppercase">Estado da embarcação</p>
            <h2 className="text-balance font-serif text-4xl leading-tight text-cream sm:text-5xl">
              Conservação apresentada com transparência
            </h2>
          </div>
          <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground lg:justify-self-end">
            Um resumo objetivo dos pontos que merecem atenção na visita presencial, sem inventar dados que ainda precisam ser confirmados.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {conditionItems.map((item) => (
            <article key={item.label} data-condition-reveal className="group rounded-3xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/35">
              <div className="mb-7 flex items-center justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-gold/12 text-gold transition-transform duration-300 group-hover:scale-105">
                  <CheckCircle2 className="size-6" aria-hidden="true" />
                </span>
                <span className="rounded-full border border-cream/10 px-3 py-1 text-[10px] tracking-[0.18em] text-cream/45 uppercase">
                  {item.status}
                </span>
              </div>
              <h3 className="font-serif text-2xl text-cream">{item.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
            </article>
          ))}
        </div>

        <div data-condition-reveal className="mt-6 flex flex-col gap-4 rounded-4xl border border-gold/20 bg-gold/10 p-5 text-sm leading-relaxed text-cream/80 sm:flex-row sm:items-center sm:p-6">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gold/15 text-gold">
            <ShieldCheck className="size-6" aria-hidden="true" />
          </span>
          <p>
            Recomendação: use este checklist para orientar a visita, solicitar vídeo complementar e combinar um teste na água diretamente com o vendedor.
          </p>
        </div>
      </div>
    </section>
  )
}
