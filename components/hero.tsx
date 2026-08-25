'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { boat } from '@/lib/boat-data'
import { ChevronDown } from 'lucide-react'

const heroFacts = [
  ['Motor', 'Indmar Monsoon 350 SS'],
  ['Potência', '350 HP'],
  ['Controle', 'Zero Off GPS'],
  ['Vocação', 'Slalom · Esqui'],
  ['Ano', String(boat.year)],
  ['Horas', `${boat.engineHours} h`],
] as const

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)')
    if (!media.matches || !root.current || !imgRef.current) return

    let cleanup: (() => void) | undefined
    let cancelled = false

    void Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([gsapModule, scrollTriggerModule]) => {
      if (cancelled || !root.current || !imgRef.current) return

      const gsap = gsapModule.gsap
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      const context = gsap.context(() => {
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
      }, root)

      cleanup = () => context.revert()
    })

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return (
    <section
      ref={root}
      id="topo"
      className="relative water-surface flex min-h-[100svh] items-center justify-center overflow-hidden py-24 sm:py-0"
    >
      <div ref={imgRef} className="absolute inset-0 z-0 md:will-change-transform">
        <Image
          src="/images/hero-side.jpeg"
          alt="Lancha Malibu Response LX de perfil na represa, casco branco com faixa azul-marinho"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center saturate-110 contrast-105"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/60 to-transparent" />
      </div>

      <div
        data-hero-content
        className="relative mx-auto max-w-4xl px-5 text-center md:will-change-transform"
      >
        <p
          data-hero-reveal
          className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs tracking-luxe text-gold uppercase"
        >
          Competition ski boat · Slalom · Direct Drive V8
        </p>
        <h1
          data-hero-reveal
          className="text-balance font-serif text-4xl leading-[0.95] text-cream sm:text-7xl lg:text-8xl"
        >
          Malibu
          <span className="block text-gradient-gold">Response LX</span>
        </h1>
        <p
          data-hero-reveal
          className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-cream/75 sm:text-lg"
        >
          Direct drive de performance para esqui aquático e slalom, com motor Indmar V8 350 HP e controle de velocidade Zero Off GPS. Wakeboard recreativo como uso complementar.
        </p>

        <div
          data-hero-reveal
          className="mt-8 flex justify-center sm:mt-10"
        >
          <a
            href="#experiencia"
            className="w-full max-w-xs rounded-full bg-gold px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-gold/10 transition-all hover:scale-[1.04] hover:shadow-gold/20 sm:w-auto"
          >
            Explorar embarcação
          </a>
        </div>

        <p
          data-hero-reveal
          className="mt-6 text-xs tracking-[0.24em] text-cream/55 uppercase"
        >
          {boat.year} · {boat.engineHours} h · {boat.priceLabel} · disponível para venda
        </p>
        <div
          data-hero-reveal
          className="mx-auto mt-8 grid max-w-4xl grid-cols-2 overflow-hidden rounded-3xl border border-cream/10 bg-navy-deep/35 text-left backdrop-blur-md sm:grid-cols-3 lg:grid-cols-6"
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
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/60"
        aria-label="Role para explorar"
      >
        <span className="text-[11px] tracking-luxe uppercase">Role</span>
        <ChevronDown className="size-5 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}
