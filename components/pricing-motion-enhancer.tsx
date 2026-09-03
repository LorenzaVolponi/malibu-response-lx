'use client'

import { useEffect } from 'react'

export function PricingMotionEnhancer() {
  useEffect(() => {
    const element = document.getElementById('negociar')
    if (!element) return

    const media = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)')
    if (!media.matches) return

    let cancelled = false
    let observer: IntersectionObserver | undefined
    let context: { revert: () => void } | undefined

    const start = async () => {
      if (cancelled || context) return
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      context = gsap.context(() => {
        gsap.to('[data-cta-bg]', {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: true },
        })
        gsap.from('[data-cta-reveal]', {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: element, start: 'top 70%' },
        })
      }, element)
      ScrollTrigger.refresh()
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer?.disconnect()
        void start()
      },
      { rootMargin: '160px 0px' },
    )
    observer.observe(element)

    return () => {
      cancelled = true
      observer?.disconnect()
      context?.revert()
    }
  }, [])

  return null
}
