'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { gallery } from '@/lib/boat-data'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const spanClass: Record<string, string> = {
  wide: 'sm:col-span-2',
  tall: 'sm:row-span-2',
  normal: '',
}

export function GallerySection() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-gal-head]', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 78%' },
      })
      gsap.from('[data-gal-item]', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-gal-grid]', start: 'top 82%' },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="galeria" className="relative bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4" data-gal-head>
          <div className="max-w-xl">
            <p className="mb-3 text-xs tracking-luxe text-gold uppercase">
              Galeria
            </p>
            <h2 className="text-balance font-serif text-4xl leading-tight text-cream sm:text-5xl">
              Fotos reais da embarcação
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Registros originais · sem edição
          </p>
        </div>

        <div
          data-gal-grid
          className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {gallery.map((item) => (
            <figure
              key={item.src}
              data-gal-item
              className={`group relative overflow-hidden rounded-3xl ${spanClass[item.span]}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src || '/placeholder.svg'}
                alt={item.alt}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-sm text-cream opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {item.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
