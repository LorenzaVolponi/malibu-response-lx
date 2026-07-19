'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Rolagem suave para âncoras (funciona com e sem Lenis)
    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!target) return
      const id = target.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      const lenis = (window as unknown as { lenis?: Lenis }).lenis
      if (lenis) {
        lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.2 })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
    document.addEventListener('click', onAnchorClick)

    if (prefersReduced) {
      const refresh = () => ScrollTrigger.refresh()
      window.addEventListener('preloader:done', refresh)
      window.addEventListener('load', refresh)
      return () => {
        document.removeEventListener('click', onAnchorClick)
        window.removeEventListener('preloader:done', refresh)
        window.removeEventListener('load', refresh)
      }
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })
    ;(window as unknown as { lenis?: Lenis }).lenis = lenis

    // Pausa enquanto o preloader está ativo
    lenis.stop()
    const startScroll = () => {
      lenis.start()
      ScrollTrigger.refresh()
    }
    window.addEventListener('preloader:done', startScroll)

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Recalcula quando tudo (fontes/imagens) carregar
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      document.removeEventListener('click', onAnchorClick)
      window.removeEventListener('preloader:done', startScroll)
      window.removeEventListener('load', onLoad)
      gsap.ticker.remove(raf)
      lenis.destroy()
      delete (window as unknown as { lenis?: Lenis }).lenis
    }
  }, [])

  return <>{children}</>
}
