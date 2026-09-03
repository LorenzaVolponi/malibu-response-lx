'use client'

import { useEffect } from 'react'
import { pushDataLayerEvent } from '@/lib/analytics'

const SECTION_EVENTS = [
  { selector: '#comprar', event: 'buyer_intent_hub_view' },
  { selector: '#evidencias', event: 'purchase_evidence_view' },
  { selector: '#negociar', event: 'pricing_section_view' },
  { selector: '#galeria', event: 'gallery_section_view' },
  { selector: '#guia', event: 'buyer_guide_view' },
  { selector: '#especificacoes', event: 'technical_specs_read' },
  { selector: '#valor', event: 'value_proof_view' },
  { selector: '#faq', event: 'faq_section_view' },
] as const

function detectTrafficSource() {
  const referrer = document.referrer.toLowerCase()
  if (!referrer) return 'direct'
  if (referrer.includes('google.')) return 'google'
  if (referrer.includes('bing.')) return 'bing'
  if (referrer.includes('chatgpt.com') || referrer.includes('openai.com')) return 'chatgpt'
  if (referrer.includes('perplexity.ai')) return 'perplexity'
  if (referrer.includes('gemini.google.com')) return 'gemini'
  if (referrer.includes('claude.ai')) return 'claude'
  if (referrer.includes('linkedin.com')) return 'linkedin'
  if (referrer.includes('reddit.com')) return 'reddit'
  if (referrer.includes('facebook.com') || referrer.includes('instagram.com')) return 'meta'
  return 'referral'
}

function readCampaign() {
  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_content: params.get('utm_content') || undefined,
  }
}

export function ConversionEventTracker() {
  useEffect(() => {
    pushDataLayerEvent({
      event: 'page_intent_view',
      traffic_source_group: detectTrafficSource(),
      landing_path: window.location.pathname,
      referrer: document.referrer || 'direct',
      ...readCampaign(),
    })

    const observed = SECTION_EVENTS.flatMap(({ selector, event }) => {
      const element = document.querySelector(selector)
      return element ? [{ element, event }] : []
    })

    const viewedDepths = new Set<number>()
    const startedAt = Date.now()
    const milestones = new Set<number>()

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      const depth = Math.round((window.scrollY / scrollable) * 100)

      for (const threshold of [25, 50, 75, 90]) {
        if (depth >= threshold && !viewedDepths.has(threshold)) {
          viewedDepths.add(threshold)
          pushDataLayerEvent({ event: 'scroll_depth', percent_scrolled: threshold })
        }
      }
    }

    const engagementTimer = window.setInterval(() => {
      const seconds = Math.floor((Date.now() - startedAt) / 1000)
      for (const threshold of [30, 60, 120]) {
        if (seconds >= threshold && !milestones.has(threshold)) {
          milestones.add(threshold)
          pushDataLayerEvent({ event: 'engaged_time', engaged_seconds: threshold })
        }
      }
      if (milestones.has(120)) window.clearInterval(engagementTimer)
    }, 5000)

    window.addEventListener('scroll', onScroll, { passive: true })

    if (observed.length === 0) {
      return () => {
        window.removeEventListener('scroll', onScroll)
        window.clearInterval(engagementTimer)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const item = observed.find(({ element }) => element === entry.target)
          if (!item) continue
          pushDataLayerEvent({ event: item.event })
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.45 },
    )

    observed.forEach(({ element }) => observer.observe(element))

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.clearInterval(engagementTimer)
    }
  }, [])

  return null
}
