'use client'

import { useEffect, useRef, useState } from 'react'
import { boat } from '@/lib/boat-data'

const PRELOADER_KEY = 'malibu-preloader-seen'

export function Preloader() {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(true)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const alreadySeen = window.sessionStorage.getItem(PRELOADER_KEY) === '1'

    if (reducedMotion || alreadySeen) {
      setPct(100)
      setDone(true)
      window.dispatchEvent(new Event('preloader:done'))
      return
    }

    setDone(false)
    document.body.style.overflow = 'hidden'
    const start = performance.now()
    const duration = 850
    let raf = 0
    let finishTimer = 0

    const finish = () => {
      window.sessionStorage.setItem(PRELOADER_KEY, '1')
      document.body.style.overflow = ''
      window.dispatchEvent(new Event('preloader:done'))
      setDone(true)
    }

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setPct(Math.round(eased * 100))

      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        finishTimer = window.setTimeout(finish, 120)
      }
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(finishTimer)
      document.body.style.overflow = ''
    }
  }, [])

  if (done) return null

  return (
    <div
      ref={rootRef}
      data-site-preloader="active"
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-deep transition-opacity duration-300"
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <span className="font-serif text-sm uppercase tracking-luxe text-primary/80">{boat.brand}</span>
        <span className="font-serif text-3xl text-cream sm:text-4xl">{boat.model}</span>
        <div className="mt-2 h-px w-40 overflow-hidden bg-cream/15">
          <div
            className="h-full bg-primary transition-[width] duration-75 ease-out"
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
