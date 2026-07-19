'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { boat } from '@/lib/boat-data'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Entrada
      gsap.from('[data-hero-reveal]', {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.2,
      })

      // Parallax da imagem de fundo ao rolar
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

      // Conteúdo sobe mais rápido (parallax de camadas)
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
          Oportunidade única · À venda
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
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <span className="font-serif text-3xl text-cream sm:text-4xl">
            {boat.priceLabel}
          </span>
          <a
            href="#experiencia"
            className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.04]"
          >
            Entrar a bordo
          </a>
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
