'use client'

import { useEffect } from 'react'

type MotionKind = 'brand-story' | 'cinematic' | 'journey' | 'specs' | 'features' | 'condition' | 'buyer-confidence'

type Props = {
  sectionId: string
  kind: MotionKind
}

/**
 * Progressive enhancement only: the full section HTML is rendered by Server
 * Components. This tiny island loads GSAP/ScrollTrigger only when a desktop
 * section approaches the viewport, so mobile and initial hydration do not pay
 * for the section's static markup.
 */
export function SectionMotionEnhancer({ sectionId, kind }: Props) {
  useEffect(() => {
    const element = document.getElementById(sectionId)
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
        if (kind === 'brand-story') {
          gsap.from('[data-story-reveal]', {
            y: 36,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: element, start: 'top 72%' },
          })
          gsap.fromTo(
            '[data-story-img]',
            { scale: 1.08, yPercent: -5 },
            {
              scale: 1.02,
              yPercent: 5,
              ease: 'none',
              scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        }

        if (kind === 'cinematic') {
          gsap.fromTo(
            '.cine-img',
            { scale: 1.18, yPercent: -4 },
            {
              scale: 1,
              yPercent: 4,
              ease: 'none',
              scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
          gsap.fromTo(
            '.cine-word',
            { yPercent: 120, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              ease: 'power3.out',
              stagger: 0.12,
              scrollTrigger: { trigger: element, start: 'top 62%', end: 'top 18%', scrub: 0.6 },
            },
          )
          gsap.fromTo(
            '.cine-caption',
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: { trigger: element, start: 'top 42%', end: 'top 22%', scrub: 0.6 },
            },
          )
        }

        if (kind === 'journey') {
          const slides = gsap.utils.toArray<HTMLElement>('[data-slide]')
          const pin = element.querySelector<HTMLElement>('[data-journey-pin]')
          const total = slides.length

          slides.forEach((slide, index) => {
            gsap.set(slide, { opacity: index === 0 ? 1 : 0, scale: index === 0 ? 1 : 1.08 })
            gsap.set(slide.querySelectorAll('[data-slide-text]'), {
              opacity: index === 0 ? 1 : 0,
              y: index === 0 ? 0 : 30,
            })
          })

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top top',
              end: () => `+=${total * 90}%`,
              scrub: 1,
              pin,
              anticipatePin: 1,
            },
          })

          for (let index = 1; index < total; index++) {
            const previous = slides[index - 1]
            const current = slides[index]
            timeline
              .to(previous, { opacity: 0, scale: 1.06, duration: 0.5, ease: 'power2.inOut' }, index)
              .to(previous.querySelectorAll('[data-slide-text]'), { opacity: 0, y: -20, duration: 0.35 }, index)
              .fromTo(current, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.inOut' }, index)
              .fromTo(
                current.querySelectorAll('[data-slide-text]'),
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
                index + 0.2,
              )
          }
        }

        if (kind === 'specs') {
          gsap.from('[data-spec-head]', {
            y: 30,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 75%' },
          })
          gsap.from('[data-spec-card]', {
            y: 44,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: element.querySelector('[data-spec-grid]'), start: 'top 80%' },
          })
        }

        if (kind === 'features') {
          const rows = gsap.utils.toArray<HTMLElement>('[data-feature-row]')
          rows.forEach((row) => {
            const image = row.querySelector('[data-feature-img]')
            const text = row.querySelectorAll('[data-feature-text]')
            gsap.from(text, {
              y: 40,
              opacity: 0,
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.1,
              scrollTrigger: { trigger: row, start: 'top 72%' },
            })
            gsap.fromTo(
              image,
              { yPercent: -8, scale: 1.12 },
              {
                yPercent: 8,
                scale: 1.12,
                ease: 'none',
                scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true },
              },
            )
          })
        }

        if (kind === 'condition') {
          gsap.from('[data-condition-reveal]', {
            y: 36,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: element, start: 'top 72%' },
          })
        }

        if (kind === 'buyer-confidence') {
          gsap.from('[data-confidence-reveal]', {
            y: 34,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: element, start: 'top 74%' },
          })
        }
      }, element)

      ScrollTrigger.refresh()
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return
          observer?.disconnect()
          void start()
        },
        { rootMargin: '160px 0px' },
      )
      observer.observe(element)
    } else {
      void start()
    }

    return () => {
      cancelled = true
      observer?.disconnect()
      context?.revert()
    }
  }, [kind, sectionId])

  return null
}
