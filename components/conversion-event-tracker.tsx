'use client'

import { useEffect } from 'react'
import { pushDataLayerEvent } from '@/lib/analytics'

const SECTION_EVENTS = [
  { selector: '#negociar', event: 'pricing_section_view' },
  { selector: '#galeria', event: 'gallery_section_view' },
  { selector: '#especificacoes', event: 'technical_specs_read' },
  { selector: '#valor', event: 'value_proof_view' },
  { selector: '#faq', event: 'faq_section_view' },
] as const

const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'gbraid',
  'wbraid',
  'msclkid',
  'fbclid',
] as const

const ATTRIBUTION_STORAGE_KEY = 'malibu_attribution_v1'

type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number] | 'source_group' | 'landing_path', string>>

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

function readStoredAttribution(): Attribution {
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Attribution) : {}
  } catch {
    return {}
  }
}

function buildAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search)
  const stored = readStoredAttribution()
  const attribution: Attribution = { ...stored }

  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key)
    if (value) attribution[key] = value.slice(0, 250)
  }

  attribution.source_group = attribution.source_group || detectTrafficSource()
  attribution.landing_path = attribution.landing_path || `${window.location.pathname}${window.location.search}`.slice(0, 500)

  try {
    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution))
  } catch {
    // Attribution is best-effort and must never block conversion.
  }

  return attribution
}

function appendAttributionToWhatsAppLinks(attribution: Attribution) {
  const onClick = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return
    const anchor = event.target.closest<HTMLAnchorElement>('a[href*="/api/whatsapp"]')
    if (!anchor) return

    const rawHref = anchor.getAttribute('href')
    if (!rawHref) return

    const destination = new URL(rawHref, window.location.origin)
    if (destination.pathname !== '/api/whatsapp') return

    for (const [key, value] of Object.entries(attribution)) {
      if (value && !destination.searchParams.has(key)) destination.searchParams.set(key, value)
    }

    anchor.setAttribute('href', `${destination.pathname}${destination.search}`)
  }

  document.addEventListener('click', onClick, true)
  return () => document.removeEventListener('click', onClick, true)
}

export function ConversionEventTracker() {
  useEffect(() => {
    const attribution = buildAttribution()

    pushDataLayerEvent({
      event: 'page_intent_view',
      traffic_source_group: attribution.source_group,
      landing_path: attribution.landing_path,
      referrer: document.referrer || 'direct',
      ...attribution,
    })

    const removeAttributionListener = appendAttributionToWhatsAppLinks(attribution)

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
        removeAttributionListener()
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
      removeAttributionListener()
      window.removeEventListener('scroll', onScroll)
      window.clearInterval(engagementTimer)
    }
  }, [])

  return null
}
