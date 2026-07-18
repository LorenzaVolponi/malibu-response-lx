'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { journey } from '@/lib/boat-data'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function JourneyScroll() {
  const root = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const slides = gsap.utils.toArray<HTMLElement>('[data-slide]')
      const total = slides.length

      // estado inicial
      slides.forEach((s, i) => {
        gsap.set(s, {
          opacity: i === 0 ? 1 : 0,
          scale: i === 0 ? 1 : 1.08,
        })
        gsap.set(s.querySelectorAll('[data-slide-text]'), {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 30,
        })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${total * 90}%`,
          scrub: 1,
          pin: pin.current,
          anticipatePin: 1,
        },
      })

      // Zoom lento contínuo no slide ativo entre transições
      for (let i = 1; i < total; i++) {
        const prev = slides[i - 1]
        const curr = slides[i]

        tl.to(prev, { opacity: 0, scale: 1.06, duration: 0.5, ease: 'power2.inOut' }, i)
          .to(prev.querySelectorAll('[data-slide-text]'), { opacity: 0, y: -20, duration: 0.35 }, i)
          .fromTo(
            curr,
            { opacity: 0, scale: 1.1 },
            { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.inOut' },
            i,
          )
          .fromTo(
            curr.querySelectorAll('[data-slide-text]'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
            i + 0.2,
          )
      }
    },
    { scope: root },
  )

  return (
    <section ref={root} id="experiencia" className="relative">
      <div
        ref={pin}
        className="relative h-[100svh] w-full overflow-hidden bg-navy-deep"
      >
        {journey.map((step, i) => (
          <article
            key={step.id}
            data-slide
            className="absolute inset-0 will-change-transform"
            aria-hidden={i === 0 ? undefined : 'true'}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={step.image || '/placeholder.svg'}
              alt={step.alt}
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-navy-deep/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/70 to-transparent" />

            <div className="absolute inset-0 flex items-end">
              <div className="mx-auto w-full max-w-6xl px-5 pb-16 sm:pb-24">
                <div className="max-w-xl">
                  <p
                    data-slide-text
                    className="mb-3 inline-flex rounded-full glass px-3 py-1 text-xs tracking-luxe text-gold uppercase"
                  >
                    {step.kicker}
                  </p>
                  <h2
                    data-slide-text
                    className="text-balance font-serif text-4xl leading-tight text-cream sm:text-6xl"
                  >
                    {step.title}
                  </h2>
                  <p
                    data-slide-text
                    className="mt-4 max-w-md text-pretty text-base leading-relaxed text-cream/75 sm:text-lg"
                  >
                    {step.copy}
                  </p>
                </div>
              </div>
            </div>

            {/* Indicador de etapa */}
            <div
              data-slide-text
              className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-2 sm:flex"
            >
              {journey.map((_, j) => (
                <span
                  key={j}
                  className={`h-8 w-0.5 rounded-full transition-colors ${
                    j === i ? 'bg-gold' : 'bg-cream/20'
                  }`}
                />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
