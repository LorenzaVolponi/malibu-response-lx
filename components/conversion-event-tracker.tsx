'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

const SECTION_EVENTS = [
  { selector: '#negociar', event: 'pricing_section_view' },
  { selector: '#galeria', event: 'gallery_section_view' },
  { selector: '#guia', event: 'buyer_guide_view' },
] as const

function pushEvent(payload: Record<string, unknown>) {
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ page_path: window.location.pathname, ...payload })
}

export function ConversionEventTracker() {
  useEffect(() => {
    pushEvent({ event: 'page_intent_view' })

    const observed = SECTION_EVENTS
      .map(({ selector, event }) => {
        const element = document.querySelector(selector)
        return element ? { element, event } : null
      })
      .filter(Boolean) as Array<{ element: Element; event: string }>

    if (observed.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const item = observed.find(({ element }) => element === entry.target)
          if (!item) return
          pushEvent({ event: item.event })
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.45 },
    )

    observed.forEach(({ element }) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return null
}
