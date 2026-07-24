'use client'

import { useRef, useState } from 'react'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { boat, faqs } from '@/lib/boat-data'
import { whatsappLeadUrl } from '@/lib/contact'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const wa = whatsappLeadUrl('primary')

export function FaqSection() {
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(0)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-faq-reveal]', {
          y: 34,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: root.current, start: 'top 74%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="duvidas" className="relative bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div data-faq-reveal>
          <p className="mb-3 text-xs tracking-luxe text-gold uppercase">Perguntas frequentes</p>
          <h2 className="text-balance font-serif text-4xl leading-tight text-cream sm:text-5xl">
            Tire as dúvidas antes de chamar no WhatsApp
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            Respostas objetivas para acelerar a decisão e deixar claro o que já está confirmado e o que deve ser validado com o vendedor.
          </p>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]">
            <MessageCircle className="size-4" aria-hidden="true" />
            Receber vídeos e documentação
          </a>
        </div>

        <div className="space-y-3">
          {faqs.map((item, index) => {
            const expanded = open === index
            return (
              <div key={item.question} data-faq-reveal className="overflow-hidden rounded-3xl glass">
                <button type="button" onClick={() => setOpen(expanded ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left" aria-expanded={expanded}>
                  <span className="font-serif text-xl text-cream">{item.question}</span>
                  <ChevronDown className={`size-5 shrink-0 text-gold transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                <div className={`grid transition-all duration-300 ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
