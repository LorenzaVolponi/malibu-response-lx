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

type Attribution = Partial<Record<
  | (typeof ATTRIBUTION_KEYS)[number]
  | 'source_group'
  | 'channel_group'
  | 'landing_path'
  | 'referrer_host',
  string
>>

function referrerHost() {
  if (!document.referrer) return ''
  try {
    return new URL(document.referrer).hostname.toLowerCase().replace(/^www\./, '')
  } catch {
    return ''
  }
}

function detectReferrerSource(host: string) {
  if (!host) return 'direct'
  if (host.includes('google.')) return 'google'
  if (host.includes('bing.')) return 'bing'
  if (host.includes('duckduckgo.com')) return 'duckduckgo'
  if (host.includes('search.yahoo.')) return 'yahoo'
  if (host.includes('ecosia.org')) return 'ecosia'
  if (host.includes('brave.com')) return 'brave'
  if (host.includes('chatgpt.com') || host.includes('openai.com')) return 'chatgpt'
  if (host.includes('perplexity.ai')) return 'perplexity'
  if (host.includes('gemini.google.com')) return 'gemini'
  if (host.includes('claude.ai')) return 'claude'
  if (host.includes('copilot.microsoft.com')) return 'copilot'
  if (host.includes('grok.com') || host.includes('x.ai')) return 'grok'
  if (host.includes('linkedin.com')) return 'linkedin'
  if (host.includes('reddit.com')) return 'reddit'
  if (host.includes('facebook.com') || host.includes('instagram.com')) return 'meta'
  if (host.includes('youtube.com') || host.includes('youtu.be')) return 'youtube'
  return 'referral'
}

function sourceFromCampaign(params: URLSearchParams) {
  const utmSource = params.get('utm_source')?.trim().toLowerCase()
  if (utmSource) return utmSource.slice(0, 80)
  if (params.has('gclid') || params.has('gbraid') || params.has('wbraid')) return 'google_ads'
  if (params.has('msclkid')) return 'microsoft_ads'
  if (params.has('fbclid')) return 'meta'
  return ''
}

function channelFromAttribution(params: URLSearchParams, source: string) {
  const medium = params.get('utm_medium')?.trim().toLowerCase() || ''
  const paidByClickId = params.has('gclid') || params.has('gbraid') || params.has('wbraid') || params.has('msclkid') || params.has('fbclid')

  if (paidByClickId || /(cpc|ppc|paid|display|remarketing|retargeting)/.test(medium)) return 'paid_media'
  if (/(email|newsletter)/.test(medium)) return 'email'

  const aiSources = new Set(['chatgpt', 'openai', 'perplexity', 'gemini', 'claude', 'copilot', 'grok', 'xai'])
  if (aiSources.has(source)) return 'ai_referral'

  const searchSources = new Set(['google', 'bing', 'duckduckgo', 'yahoo', 'ecosia', 'brave'])
  if (searchSources.has(source)) return 'organic_search'

  const socialSources = new Set(['linkedin', 'reddit', 'meta', 'facebook', 'instagram', 'youtube', 'x', 'twitter'])
  if (socialSources.has(source)) return 'social_referral'

  if (source === 'direct') return 'direct'
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

  const host = referrerHost()
  const detectedReferrerSource = detectReferrerSource(host)
  const campaignSource = sourceFromCampaign(params)
  const source = campaignSource || attribution.source_group || detectedReferrerSource

  attribution.source_group = source
  attribution.channel_group = attribution.channel_group || channelFromAttribution(params, source)
  attribution.referrer_host = attribution.referrer_host || host || 'direct'
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
      acquisition_channel: attribution.channel_group,
      landing_path: attribution.landing_path,
      referrer_host: attribution.referrer_host,
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
