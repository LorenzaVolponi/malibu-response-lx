'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { specs } from '@/lib/boat-data'
import { Gauge, Cog, Waves, Ship, Ruler, Satellite } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const icons = [Cog, Gauge, Waves, Ship, Ruler, Satellite]

export function SpecsSection() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-spec-head]', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
      gsap.from('[data-spec-card]', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '[data-spec-grid]', start: 'top 80%' },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="ficha" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-14 max-w-2xl" data-spec-head>
          <p className="mb-3 text-xs tracking-luxe text-gold uppercase">
            Ficha técnica
          </p>
          <h2 className="text-balance font-serif text-4xl leading-tight text-cream sm:text-5xl">
            Engenharia Malibu, feita para a água
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Especificações confirmadas pelas fotos da embarcação. Números
            aproximados seguem a ficha oficial do modelo Response LX.
          </p>
        </div>

        <div data-spec-grid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {specs.map((spec, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div
                key={spec.label}
                data-spec-card
                className="group relative overflow-hidden rounded-3xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40"
              >
                <div className="mb-8 flex size-12 items-center justify-center rounded-2xl bg-gold/12 text-gold">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <p className="text-xs tracking-luxe text-muted-foreground uppercase">
                  {spec.label}
                </p>
                <p className="mt-1 font-serif text-2xl text-cream">
                  {spec.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{spec.note}</p>
                <div className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-gold/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
