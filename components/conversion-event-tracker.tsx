'use client'

import { useEffect } from 'react'
import { pushDataLayerEvent } from '@/lib/analytics'

const SECTION_EVENTS = [
  { selector: '#negociar', event: 'pricing_section_view' },
  { selector: '#galeria', event: 'gallery_section_view' },
  { selector: '#guia', event: 'buyer_guide_view' },
] as const

export function ConversionEventTracker() {
  useEffect(() => {
    const path = window.location.pathname
    pushDataLayerEvent({
      event: path.startsWith('/guias/') ? 'seo_intent_page_view' : path.startsWith('/ads/') ? 'ads_landing_page_view' : 'page_intent_view',
      page_type: path.startsWith('/guias/') ? 'seo_intent' : path.startsWith('/ads/') ? 'ads_landing' : 'landing_page',
    })

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
          pushDataLayerEvent({ event: item.event })
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
