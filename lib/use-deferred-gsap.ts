'use client'

import { useEffect, useRef, type RefObject } from 'react'

type Gsap = (typeof import('gsap'))['gsap']
type Cleanup = void | (() => void)
type Setup = (gsap: Gsap) => Cleanup

type Options = {
  rootMargin?: string
  mediaQuery?: string
}

/**
 * Keeps section markup rendered immediately, but moves GSAP + ScrollTrigger
 * off the initial JS path until the section is close to the viewport.
 */
export function useDeferredGsap<T extends Element>(
  root: RefObject<T | null>,
  setup: Setup,
  {
    rootMargin = '120px 0px',
    mediaQuery = '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
  }: Options = {},
) {
  const setupRef = useRef(setup)
  setupRef.current = setup

  useEffect(() => {
    const element = root.current
    if (!element) return

    const media = window.matchMedia(mediaQuery)
    if (!media.matches) return

    let cancelled = false
    let started = false
    let context: { revert: () => void } | undefined
    let setupCleanup: Cleanup
    let observer: IntersectionObserver | undefined

    const start = async () => {
      if (cancelled || started) return
      started = true

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      context = gsap.context(() => {
        setupCleanup = setupRef.current(gsap)
      }, element)
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return
          observer?.disconnect()
          void start()
        },
        { rootMargin },
      )
      observer.observe(element)
    } else {
      void start()
    }

    const onMediaChange = (event: MediaQueryListEvent) => {
      if (event.matches) void start()
    }
    media.addEventListener('change', onMediaChange)

    return () => {
      cancelled = true
      observer?.disconnect()
      media.removeEventListener('change', onMediaChange)
      if (typeof setupCleanup === 'function') setupCleanup()
      context?.revert()
    }
  }, [root, rootMargin, mediaQuery])
}
