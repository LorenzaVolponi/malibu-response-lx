'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { features } from '@/lib/boat-data'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export function FeaturesSection() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const rows = gsap.utils.toArray<HTMLElement>('[data-feature-row]')
        rows.forEach((row) => {
          const img = row.querySelector('[data-feature-img]')
          const text = row.querySelectorAll('[data-feature-text]')

          gsap.from(text, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: row, start: 'top 72%' },
          })

          gsap.fromTo(
            img,
            { yPercent: -8, scale: 1.12 },
            {
              yPercent: 8,
              scale: 1.12,
              ease: 'none',
              scrollTrigger: {
                trigger: row,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          )
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="destaques" className="relative bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-xs tracking-luxe text-gold uppercase">
            Destaques
          </p>
          <h2 className="text-balance font-serif text-4xl leading-tight text-cream sm:text-5xl">
            Cada detalhe pensado para performance e conforto
          </h2>
        </div>

        <div className="flex flex-col gap-16 sm:gap-28">
          {features.map((f, i) => {
            const reverse = i % 2 === 1
            return (
              <article
                key={f.title}
                data-feature-row
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                  reverse ? 'lg:[direction:rtl]' : ''
                }`}
              >
                <div
                  data-feature-img-wrap
                  className="relative aspect-[4/3] overflow-hidden rounded-3xl [direction:ltr] sm:rounded-4xl"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    data-feature-img
                    src={f.image || '/placeholder.svg'}
                    alt={f.alt}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover will-change-transform"
                  />
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-cream/10 sm:rounded-4xl" />
                </div>

                <div className="[direction:ltr]">
                  <span
                    data-feature-text
                    className="font-serif text-5xl text-cream/10 sm:text-6xl"
                  >
                    0{i + 1}
                  </span>
                  <h3
                    data-feature-text
                    className="-mt-4 text-balance font-serif text-3xl text-cream sm:text-4xl"
                  >
                    {f.title}
                  </h3>
                  <p
                    data-feature-text
                    className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground"
                  >
                    {f.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
