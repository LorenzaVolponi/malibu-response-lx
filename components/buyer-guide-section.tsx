'use client'

import { useRef } from 'react'
import { CheckCircle2, HelpCircle, MessageCircle } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { boat } from '@/lib/boat-data'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const confirmed = ['Ano 2013', '940 horas de motor', 'Motor Indmar Monsoon 350 SS', 'Zero Off GPS', 'Bimini e carreta inclusos']
const toConfirm = ['Local de visita', 'Documentação', 'Histórico de manutenção', 'Condições para teste na água']

const wa = `https://wa.me/${boat.whatsapp}?text=${encodeURIComponent(
  `Olá! Tenho interesse na ${boat.brand} ${boat.model} anunciada por ${boat.priceLabel}. Gostaria de confirmar os detalhes de visita, documentação e agendar uma visita.`,
)}`

export function BuyerGuideSection() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-buyer-guide]', {
          y: 34,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: 'top 74%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="guia" className="relative bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div data-buyer-guide className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs tracking-luxe text-gold uppercase">Guia do comprador</p>
          <h2 className="text-balance font-serif text-4xl leading-tight text-cream sm:text-5xl">
            O essencial para decidir sem ruído
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Uma única área para separar o que já está claro do que vale confirmar antes da visita.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <article data-buyer-guide className="rounded-3xl glass p-6">
            <div className="mb-6 grid size-12 place-items-center rounded-2xl bg-gold/12 text-gold">
              <CheckCircle2 className="size-6" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-2xl text-cream">Confirmado</h3>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {confirmed.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>

          <article data-buyer-guide className="rounded-3xl glass p-6">
            <div className="mb-6 grid size-12 place-items-center rounded-2xl bg-cream/7 text-cream/75">
              <HelpCircle className="size-6" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-2xl text-cream">A confirmar</h3>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {toConfirm.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>

          <article data-buyer-guide className="rounded-3xl border border-gold/25 bg-gold/10 p-6">
            <div className="mb-6 grid size-12 place-items-center rounded-2xl bg-gold/15 text-gold">
              <MessageCircle className="size-6" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-2xl text-cream">Próximo passo</h3>
            <p className="mt-5 text-sm leading-relaxed text-cream/75">
              Peça os detalhes de visita, documentação, combine visita e tire dúvidas diretamente com o vendedor.
            </p>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]">
              Chamar no WhatsApp
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}
