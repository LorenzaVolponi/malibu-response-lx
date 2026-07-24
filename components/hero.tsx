'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { boat } from '@/lib/boat-data'
import { whatsappLeadUrl } from '@/lib/contact'
import { ChevronDown, MessageCircle } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const mobileTrust = ['Fotos reais', 'WhatsApp rastreável', 'Dados objetivos'] as const

const heroFacts = [
  ['Motor', 'Indmar Monsoon 350 SS'],
  ['Potência', '350 HP'],
  ['Ano', String(boat.year)],
  ['Horas', `${boat.engineHours} h`],
] as const

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-hero-reveal]', {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.2,
        })

        gsap.to(imgRef.current, {
          yPercent: 18,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })

        gsap.to('[data-hero-content]', {
          yPercent: -30,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="topo"
      className="relative water-surface flex min-h-[100svh] items-center justify-center overflow-hidden pb-32 pt-[calc(7rem+env(safe-area-inset-top))] sm:py-0"
    >
      <div ref={imgRef} className="absolute inset-0 z-0 will-change-transform">
        <Image
          src="/images/hero-side.jpeg"
          alt="Lancha Malibu Response LX de perfil na represa, casco branco com faixa azul-marinho"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center saturate-110 contrast-105"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/60 to-transparent" />
      </div>

      <div
        data-hero-content
        className="relative mx-auto max-w-4xl px-4 text-center will-change-transform sm:px-5"
      >
        <p
          data-hero-reveal
          className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs tracking-luxe text-gold uppercase"
        >
          Malibu Response LX · Direct Drive V8
        </p>
        <h1
          data-hero-reveal
          className="text-balance font-serif text-5xl leading-[0.92] text-cream min-[390px]:text-6xl sm:text-7xl lg:text-8xl"
        >
          Malibu
          <span className="block text-gradient-gold">Response LX</span>
        </h1>
        <p
          data-hero-reveal
          className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-cream/80 sm:mt-6 sm:text-lg"
        >
          {boat.tagline}
        </p>


        <div data-hero-reveal className="mx-auto mt-5 flex max-w-sm snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:hidden">
          {mobileTrust.map((item) => (
            <span key={item} className="shrink-0 snap-center rounded-full border border-cream/10 bg-navy-deep/45 px-3 py-2 text-[11px] font-medium text-cream/80 backdrop-blur-md">{item}</span>
          ))}
        </div>

        <div
          data-hero-reveal
          className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
        >
          <a
            href="#experiencia"
            className="inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-full bg-gold px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-gold/10 transition-all hover:scale-[1.04] hover:shadow-gold/20 sm:w-auto"
          >
            Explorar embarcação
          </a>
          <a
            href={whatsappLeadUrl('secondary')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-2 rounded-full border border-cream/20 bg-navy-deep/25 px-7 py-3 text-sm font-semibold text-cream backdrop-blur-sm transition-colors hover:bg-white/5 sm:w-auto"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Agendar avaliação
          </a>
        </div>

        <p
          data-hero-reveal
          className="mt-6 text-xs tracking-[0.24em] text-cream/55 uppercase"
        >
          Disponível para venda · {boat.priceLabel}
        </p>
        <div
          data-hero-reveal
          className="mx-auto mt-7 grid max-w-xl grid-cols-2 overflow-hidden rounded-3xl border border-cream/10 bg-navy-deep/45 text-left backdrop-blur-md sm:mt-8 sm:grid-cols-4"
        >
          {heroFacts.map(([label, value]) => (
            <div key={label} className="border-b border-cream/10 p-3 last:border-b-0 sm:border-b-0 sm:border-r sm:p-4 sm:last:border-r-0">
              <p className="text-[10px] tracking-[0.24em] text-gold uppercase">{label}</p>
              <p className="mt-1 font-serif text-lg text-cream">{value}</p>
            </div>
          ))}
        </div>

      </div>

      <a
        href="#experiencia"
        data-hero-reveal
        className="absolute bottom-[calc(5.5rem+env(safe-area-inset-bottom))] left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/60 sm:flex sm:bottom-8"
        aria-label="Role para explorar"
      >
        <span className="text-[11px] tracking-luxe uppercase">Role</span>
        <ChevronDown className="size-5 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}
