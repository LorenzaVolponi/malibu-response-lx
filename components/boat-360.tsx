'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { frames360 } from '@/lib/boat-data'

export function Boat360() {
  const [index, setIndex] = useState(0)
  const [hint, setHint] = useState(true)
  const dragging = useRef(false)
  const lastX = useRef(0)
  const accum = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const total = frames360.length
  const step = useCallback(
    (dir: number) => {
      setIndex((i) => (i + dir + total) % total)
    },
    [total],
  )

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    lastX.current = e.clientX
    accum.current = 0
    setHint(false)
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - lastX.current
    lastX.current = e.clientX
    accum.current += dx
    const threshold = 42 // px por quadro
    while (Math.abs(accum.current) >= threshold) {
      if (accum.current > 0) {
        step(-1)
        accum.current -= threshold
      } else {
        step(1)
        accum.current += threshold
      }
    }
  }

  const endDrag = () => {
    dragging.current = false
  }

  // Teclado
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'ArrowRight') step(1)
    }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [step])

  return (
    <section id="tour360" className="relative bg-navy-deep py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <span className="font-serif text-sm uppercase tracking-luxe text-primary">Tour por ângulos</span>
          <h2 className="mt-3 font-serif text-3xl text-cream text-balance sm:text-5xl">
            Explore os principais ângulos
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-cream/70">
            Navegue pelos ângulos externos e internos da embarcação, com detalhes de casco, proa, cockpit e popa.
          </p>
        </div>

        <div
          ref={containerRef}
          role="slider"
          aria-label="Navegar pelos ângulos da lancha"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={index + 1}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          className="group relative aspect-[16/10] w-full cursor-grab touch-pan-y select-none overflow-hidden rounded-3xl border border-cream/10 bg-navy active:cursor-grabbing sm:aspect-[16/9]"
        >
          {frames360.map((f, i) => (
            <Image
              key={f.src}
              src={f.src || '/placeholder.svg'}
              alt={f.alt}
              fill
              priority={i === 0}
              draggable={false}
              sizes="(max-width: 768px) 100vw, 1152px"
              className={`pointer-events-none object-cover transition-opacity duration-300 ${
                i === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          {/* Hint de arraste */}
          <div
            className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
              hint ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="glass-strong flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-cream">
              <ArrowsIcon />
              Arraste para navegar
            </span>
          </div>

          {/* Rótulo do ângulo */}
          <div className="pointer-events-none absolute left-4 top-4">
            <span className="glass rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-cream">
              {frames360[index].label}
            </span>
          </div>

          {/* Setas */}
          <button
            type="button"
            aria-label="Ângulo anterior"
            onClick={() => step(-1)}
            className="glass-strong absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full p-3 text-cream opacity-0 transition-opacity group-hover:opacity-100 sm:block"
          >
            <ChevronIcon dir="left" />
          </button>
          <button
            type="button"
            aria-label="Próximo ângulo"
            onClick={() => step(1)}
            className="glass-strong absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full p-3 text-cream opacity-0 transition-opacity group-hover:opacity-100 sm:block"
          >
            <ChevronIcon dir="right" />
          </button>
        </div>

        {/* Indicadores */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {frames360.map((f, i) => (
            <button
              key={f.src}
              type="button"
              aria-label={`Ver ${f.label}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-8 bg-primary' : 'w-2.5 bg-cream/25 hover:bg-cream/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ArrowsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 7-5 5 5 5" />
      <path d="m15 7 5 5-5 5" />
      <path d="M4 12h16" />
    </svg>
  )
}

function ChevronIcon({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: dir === 'right' ? 'rotate(180deg)' : undefined }}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}
