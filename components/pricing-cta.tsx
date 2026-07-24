'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { boat } from '@/lib/boat-data'
import { whatsappUrl } from '@/lib/contact'
import { MessageCircle, Check } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const includes = [
  'Motor Indmar Monsoon 350 SS (V8 350 HP)',
  'Transmissão direct drive',
  'Controle de velocidade Zero Off GPS',
  'Toldo bimini',
  'Carreta rodoviária galvanizada inclusa',
  `Ano de fabricação ${boat.year}`,
  `${boat.engineHours} horas de motor`,
  'Estofamento conservado creme/azul',
]


export function PricingCta() {
  const root = useRef<HTMLElement>(null)
  const bg = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.to(bg.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
        gsap.from('[data-cta-reveal]', {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: 'top 70%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="negociar"
      className="relative overflow-hidden py-28 sm:py-36"
    >
      <div ref={bg} className="absolute inset-0 -z-10 will-change-transform">
        <Image
          src="/images/exterior-front.jpeg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          loading="lazy"
          decoding="async"
          className="scale-110 object-cover"
        />
        <div className="absolute inset-0 bg-navy-deep/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="mx-auto max-w-5xl px-5">
        <div className="overflow-hidden rounded-4xl glass-strong p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p
                data-cta-reveal
                className="mb-3 text-xs tracking-luxe text-gold uppercase"
              >
                Concierge de venda
              </p>
              <h2
                data-cta-reveal
                className="text-balance font-serif text-4xl leading-tight text-cream sm:text-5xl"
              >
                Agende uma avaliação privada da embarcação
              </h2>
              <div data-cta-reveal className="mt-8 flex items-end gap-3">
                <span className="text-sm text-muted-foreground">Valor</span>
                <span className="font-serif text-5xl text-gradient-gold">
                  {boat.priceLabel}
                </span>
              </div>

              <div
                data-cta-reveal
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <a
                  href={whatsappUrl('primary')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-center text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] sm:w-auto"
                >
                  <MessageCircle className="size-5" aria-hidden="true" />
                  Receber vídeos e documentação
                </a>
                <a
                  href={whatsappUrl('technical')}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-whatsapp-intent="motor_manutencao"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-cream/20 px-7 py-3.5 text-center text-sm font-semibold text-cream transition-colors hover:bg-white/5 sm:w-auto"
                >
                  <MessageCircle className="size-5" aria-hidden="true" />
                  Falar sobre motor e manutenção
                </a>
              </div>
              <p data-cta-reveal className="mt-4 text-xs text-muted-foreground">
                Atendimento direto com o vendedor. Propostas, troca, documentação e teste sob consulta.
              </p>
            </div>

            <div data-cta-reveal className="lg:border-l lg:border-cream/10 lg:pl-10">
              <p className="mb-5 text-sm font-medium text-cream">
                Incluso no conjunto
              </p>
              <ul className="flex flex-col gap-3">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-cream/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
