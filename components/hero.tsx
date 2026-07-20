'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { boat } from '@/lib/boat-data'
import { ChevronDown, MessageCircle } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const heroFacts = [
  ['Motor', 'Indmar Monsoon 350 SS'],
  ['Potência', '350 HP'],
  ['Inclui', 'Bimini + carreta'],
] as const

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
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
      className="relative flex h-[100svh] items-center justify-center overflow-hidden"
    >
      <div ref={imgRef} className="absolute inset-0 z-0 will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-side.jpeg"
          alt="Lancha Malibu Response LX de perfil na represa, casco branco com faixa azul-marinho"
          className="size-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/60 to-transparent" />
      </div>

      <div
        data-hero-content
        className="relative mx-auto max-w-4xl px-4 text-center will-change-transform"
      >
        <p
          data-hero-reveal
          className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs tracking-luxe text-gold uppercase"
        >
          Malibu Response LX · Direct Drive V8
        </p>
        <h1
          data-hero-reveal
          className="text-balance font-serif text-5xl leading-[0.95] text-cream sm:text-7xl lg:text-8xl"
        >
          Malibu
          <span className="block text-gradient-gold">Response LX</span>
        </h1>
        <p
          data-hero-reveal
          className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-cream/75 sm:text-lg"
        >
          {boat.tagline}
        </p>

        <div
          data-hero-reveal
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#experiencia"
            className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-gold/10 transition-all hover:scale-[1.04] hover:shadow-gold/20"
          >
            Explorar embarcação
          </a>
          <a
            href={`https://wa.me/${boat.whatsapp}?text=${encodeURIComponent(
              `Olá! Tenho interesse na ${boat.brand} ${boat.model} anunciada por ${boat.priceLabel}. Gostaria de agendar uma visita.`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-7 py-3 text-sm font-semibold text-cream transition-colors hover:bg-white/5"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Agendar visita
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
          className="mx-auto mt-10 grid max-w-2xl grid-cols-1 overflow-hidden rounded-3xl border border-cream/10 bg-navy-deep/35 text-left backdrop-blur-md sm:grid-cols-3"
        >
          {heroFacts.map(([label, value]) => (
            <div key={label} className="border-b border-cream/10 p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
              <p className="text-[10px] tracking-[0.24em] text-gold uppercase">{label}</p>
              <p className="mt-1 font-serif text-lg text-cream">{value}</p>
            </div>
          ))}
        </div>

      </div>

      <a
        href="#experiencia"
        data-hero-reveal
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/60"
        aria-label="Role para explorar"
      >
        <span className="text-[11px] tracking-luxe uppercase">Role</span>
        <ChevronDown className="size-5 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}
