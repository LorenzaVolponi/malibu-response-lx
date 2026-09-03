'use client'

import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      const progress = max > 0 ? el.scrollTop / max : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
    }

    const scheduleUpdate = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate, { passive: true })

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent">
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-gold"
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}
