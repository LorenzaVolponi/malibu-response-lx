'use client'

import { useEffect, useRef, useState } from 'react'
import { boat } from '@/lib/boat-data'

export function Preloader() {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Trava o scroll enquanto carrega
    document.body.style.overflow = 'hidden'
    const start = performance.now()
    const duration = 1900
    let raf = 0

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      // ease-out
      const eased = 1 - Math.pow(1 - t, 3)
      setPct(Math.round(eased * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setDone(true)
          document.body.style.overflow = ''
          window.dispatchEvent(new Event('preloader:done'))
        }, 320)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div
      ref={rootRef}
      aria-hidden={done}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-deep transition-[opacity,visibility] duration-700 ${
        done ? 'pointer-events-none invisible opacity-0' : 'visible opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <span className="font-serif text-sm uppercase tracking-luxe text-primary/80">{boat.brand}</span>
        <span className="font-serif text-3xl text-cream sm:text-4xl">{boat.model}</span>
        <div className="mt-2 h-px w-40 overflow-hidden bg-cream/15">
          <div
            className="h-full bg-primary transition-[width] duration-100 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <div className="absolute bottom-10 flex items-baseline gap-1 font-serif text-cream/90">
        <span className="text-6xl tabular-nums sm:text-7xl">{pct}</span>
        <span className="text-xl text-primary">%</span>
      </div>
    </div>
  )
}
