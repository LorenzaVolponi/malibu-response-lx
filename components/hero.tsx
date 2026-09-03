'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { boat } from '@/lib/boat-data'
import { ChevronDown, MessageCircle, Waves } from 'lucide-react'
import { whatsappLeadUrl } from '@/lib/contact'

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
    let started = false

    const startParallax = async () => {
      if (started || cancelled || !root.current || !imgRef.current) return
      started = true
      window.removeEventListener('scroll', onFirstScroll)

      const [gsapModule, scrollTriggerModule] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      if (cancelled || !root.current || !imgRef.current) return

      const gsap = gsapModule.gsap
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      const context = gsap.context(() => {
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
          yPercent: -24,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
        ScrollTrigger.refresh()
      }, root)

      cleanup = () => context.revert()
    }

    const onFirstScroll = () => {
      void startParallax()
    }

    window.addEventListener('scroll', onFirstScroll, { once: true, passive: true })

    if (window.scrollY > 1) void startParallax()

    return () => {
      cancelled = true
      window.removeEventListener('scroll', onFirstScroll)
      cleanup?.()
    }
  }, [])

  return (
    <section ref={root} id="topo" className="relative water-surface flex min-h-[100svh] items-center justify-center overflow-hidden py-24 sm:py-0">
      <div ref={imgRef} className="absolute inset-0 z-0 md:will-change-transform">
        <Image
          src="/images/hero-side.jpeg"
          alt="Lancha Malibu Response LX de perfil na represa, casco branco com faixa azul-marinho"
          fill
          sizes="100vw"
          preload
          className="object-cover object-center saturate-110 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/75 via-navy-deep/35 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/65 to-transparent" />
      </div>

      <div data-hero-content className="relative mx-auto max-w-5xl px-5 text-center md:will-change-transform">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs tracking-luxe text-gold uppercase">À venda no Brasil · venda particular · sem intermediário</p>
        <h1 className="text-balance font-serif text-4xl leading-[0.95] text-cream sm:text-7xl lg:text-8xl">
          Malibu <span className="block text-gradient-gold">Response LX</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-cream/80 sm:text-lg">
          Competition ski boat direct drive para esqui aquático e slalom. Indmar V8 350 HP, Zero Off GPS, {boat.year} e {boat.engineHours} horas informadas.
        </p>

        <div className="mt-7">
          <p className="text-xs tracking-[0.22em] text-cream/50 uppercase">Valor anunciado</p>
          <p className="mt-1 font-serif text-4xl text-gold sm:text-5xl">{boat.priceLabel}</p>
        </div>

        <div className="mx-auto mt-7 flex max-w-2xl flex-col justify-center gap-3 sm:flex-row">
          <a href={whatsappLeadUrl('primary')} target="_blank" rel="noopener noreferrer" data-whatsapp-intent="hero_primary" className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-gold/10 transition hover:scale-[1.02]">
            <MessageCircle className="size-4" aria-hidden="true" /> Tenho interesse nesta Malibu
          </a>
          <a href={whatsappLeadUrl('test')} target="_blank" rel="noopener noreferrer" data-whatsapp-intent="hero_test" className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-cream/20 bg-navy-deep/45 px-7 py-3 text-sm font-semibold text-cream backdrop-blur transition hover:border-gold/50 hover:text-gold">
            <Waves className="size-4" aria-hidden="true" /> Agendar avaliação / teste
          </a>
        </div>

        <p className="mt-4 text-xs text-cream/55">Fotos reais · negociação direta · vídeos e documentação disponível podem ser solicitados ao vendedor</p>

        <div className="mx-auto mt-7 grid max-w-4xl grid-cols-2 overflow-hidden rounded-3xl border border-cream/10 bg-navy-deep/35 text-left backdrop-blur-md sm:grid-cols-3 lg:grid-cols-6">
          {heroFacts.map(([label, value]) => (
            <div key={label} className="border-b border-cream/10 p-3 last:border-b-0 sm:border-b-0 sm:border-r sm:p-4 sm:last:border-r-0">
              <p className="text-[10px] tracking-[0.24em] text-gold uppercase">{label}</p>
              <p className="mt-1 font-serif text-lg text-cream">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <a href="#experiencia" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/60 sm:flex" aria-label="Explorar a embarcação">
        <span className="text-[11px] tracking-luxe uppercase">Como avançar</span>
        <ChevronDown className="size-5 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}
