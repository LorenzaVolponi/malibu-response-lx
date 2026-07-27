'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { gallery } from '@/lib/boat-data'
import { pushDataLayerEvent } from '@/lib/analytics'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const spanClass: Record<string, string> = {
  wide: 'sm:col-span-2',
  tall: 'sm:row-span-2',
  normal: '',
}

export function GallerySection() {
  const root = useRef<HTMLElement>(null)
  const viewedImages = useRef(new Set<number>())
  const [selected, setSelected] = useState<number | null>(null)

  const registerView = useCallback((index: number) => {
    viewedImages.current.add(index)
    pushDataLayerEvent({
      event: 'gallery_image_view',
      image_position: index + 1,
      image_count: gallery.length,
      viewed_unique_images: viewedImages.current.size,
    })
    if (viewedImages.current.size === gallery.length) {
      pushDataLayerEvent({ event: 'gallery_completed', image_count: gallery.length })
    }
  }, [])

  const open = useCallback((index: number) => {
    setSelected(index)
    registerView(index)
  }, [registerView])

  const close = useCallback(() => setSelected(null), [])
  const move = useCallback((dir: number) => {
    setSelected((current) => {
      if (current === null) return current
      const next = (current + dir + gallery.length) % gallery.length
      registerView(next)
      return next
    })
  }, [registerView])

  useEffect(() => {
    if (selected === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') move(-1)
      if (event.key === 'ArrowRight') move(1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [close, move, selected])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
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
      })
    },
    { scope: root },
  )

  const current = selected === null ? null : gallery[selected]

  return (
    <section ref={root} id="galeria" className="relative bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4" data-gal-head>
          <div className="max-w-xl">
            <p className="mb-3 text-xs tracking-luxe text-gold uppercase">
              Galeria privada
            </p>
            <h2 className="text-balance font-serif text-4xl leading-tight text-cream sm:text-5xl">
              Fotos reais em tela cheia
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Clique para ampliar · navegue pelos detalhes
          </p>
        </div>

        <div
          data-gal-grid
          className="grid auto-rows-[180px] grid-cols-1 gap-4 sm:auto-rows-[220px] sm:grid-cols-3"
        >
          {gallery.map((item, index) => (
            <button
              key={item.src}
              type="button"
              data-gal-item
              onClick={() => open(index)}
              className={`group relative overflow-hidden rounded-3xl text-left outline-none ring-gold/0 transition-all duration-300 hover:-translate-y-1 focus-visible:ring-2 ${spanClass[item.span]}`}
              aria-label={`Ampliar foto: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) calc(100vw - 2.5rem), (max-width: 1024px) 33vw, 360px"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-sm text-cream opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {item.alt}
              </span>
            </button>
          ))}
        </div>
      </div>

      {current && (
        <div className="fixed inset-0 z-[60] bg-navy-deep/95 p-4 backdrop-blur-xl sm:p-8" role="dialog" aria-modal="true" aria-label="Foto ampliada da galeria">
          <button type="button" onClick={close} className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full glass-strong text-cream transition-transform hover:scale-105" aria-label="Fechar galeria">
            <X className="size-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => move(-1)} className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full glass-strong p-3 text-cream transition-transform hover:scale-105 sm:block" aria-label="Foto anterior">
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => move(1)} className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full glass-strong p-3 text-cream transition-transform hover:scale-105 sm:block" aria-label="Próxima foto">
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-center gap-5">
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-4xl border border-cream/10 bg-black/20">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                quality={90}
                className="object-contain"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-cream/75">
              <p>{current.alt}</p>
              <p className="tracking-[0.24em] uppercase">{selected! + 1} / {gallery.length}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
