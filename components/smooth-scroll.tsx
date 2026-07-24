'use client'

import { useEffect } from 'react'

type ScrollTarget = HTMLElement | string | number

type LenisInstance = {
  raf: (time: number) => void
  on: (event: 'scroll', callback: () => void) => void
  scrollTo: (target: ScrollTarget, options?: { offset?: number; duration?: number }) => void
  start: () => void
  stop: () => void
  destroy: () => void
}

type IdleWindow = Window & {
  __malibuLenis?: LenisInstance
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
  cancelIdleCallback?: (handle: number) => void
}

const PRELOADER_KEY = 'malibu-preloader-seen'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const browserWindow = window as IdleWindow
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches

    const onAnchorClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!target) return

      const id = target.getAttribute('href')
      if (!id || id === '#') return

      const element = document.querySelector(id)
      if (!element) return

      event.preventDefault()

      if (browserWindow.__malibuLenis) {
        browserWindow.__malibuLenis.scrollTo(element as HTMLElement, { offset: 0, duration: 1.05 })
      } else {
        element.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' })
      }
    }

    document.addEventListener('click', onAnchorClick)

    // Native scrolling is faster and more predictable on touch devices and for
    // visitors who explicitly request reduced motion.
    if (prefersReduced || coarsePointer) {
      return () => document.removeEventListener('click', onAnchorClick)
    }

    let cancelled = false
    let animationFrame = 0
    let idleHandle = 0
    let fallbackTimer = 0
    let lenis: LenisInstance | undefined
    let removePreloaderListener: (() => void) | undefined
    let removeLoadListener: (() => void) | undefined

    const boot = async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)

      lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1,
      }) as LenisInstance

      browserWindow.__malibuLenis = lenis
      lenis.on('scroll', ScrollTrigger.update)

      const frame = (time: number) => {
        lenis?.raf(time)
        animationFrame = window.requestAnimationFrame(frame)
      }
      animationFrame = window.requestAnimationFrame(frame)

      const startScroll = () => {
        lenis?.start()
        ScrollTrigger.refresh()
      }

      const preloaderAlreadyFinished =
        window.sessionStorage.getItem(PRELOADER_KEY) === '1' ||
        !document.querySelector('[data-site-preloader="active"]')

      if (preloaderAlreadyFinished) {
        startScroll()
      } else {
        lenis.stop()
        window.addEventListener('preloader:done', startScroll, { once: true })
        removePreloaderListener = () => window.removeEventListener('preloader:done', startScroll)
      }

      const onLoad = () => ScrollTrigger.refresh()
      window.addEventListener('load', onLoad, { once: true })
      removeLoadListener = () => window.removeEventListener('load', onLoad)
    }

    if (browserWindow.requestIdleCallback) {
      idleHandle = browserWindow.requestIdleCallback(boot, { timeout: 900 })
    } else {
      fallbackTimer = window.setTimeout(boot, 250)
    }

    return () => {
      cancelled = true
      document.removeEventListener('click', onAnchorClick)
      removePreloaderListener?.()
      removeLoadListener?.()
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(fallbackTimer)
      if (idleHandle && browserWindow.cancelIdleCallback) browserWindow.cancelIdleCallback(idleHandle)
      lenis?.destroy()
      delete browserWindow.__malibuLenis
    }
  }, [])

  return <>{children}</>
}
