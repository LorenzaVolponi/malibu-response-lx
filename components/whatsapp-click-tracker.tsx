'use client'

import { useEffect } from 'react'
import { pushDataLayerEvent } from '@/lib/analytics'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const

function getIntent(anchor: HTMLAnchorElement) {
  const explicit = anchor.dataset.whatsappIntent
  if (explicit) return explicit

  const label = `${anchor.textContent ?? ''} ${decodeURIComponent(anchor.href)}`.toLowerCase()
  if (label.includes('motor') || label.includes('manutenção') || label.includes('manutencao')) return 'motor_manutencao'
  if (label.includes('agendar') || label.includes('avaliar') || label.includes('visitar')) return 'agendar_avaliacao'
  if (label.includes('vídeo') || label.includes('video') || label.includes('document')) return 'video_documentacao'
  return 'whatsapp_generico'
}

function getAttribution() {
  const params = new URLSearchParams(window.location.search)
  const attribution = Object.fromEntries(
    UTM_KEYS.map((key) => [key, params.get(key) ?? window.localStorage.getItem(key) ?? '']).filter(([, value]) => value),
  )

  UTM_KEYS.forEach((key) => {
    const value = params.get(key)
    if (value) window.localStorage.setItem(key, value)
  })

  return attribution
}

export function WhatsAppClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.('a[href*="wa.me"]') as HTMLAnchorElement | null
      if (!anchor) return

      const intent = getIntent(anchor)
      const attribution = getAttribution()
      const payload = {
        event: 'whatsapp_click',
        cta_intent: intent,
        cta_label: anchor.textContent?.trim() ?? '',
        destination_url: anchor.href,
        ...attribution,
      }

      pushDataLayerEvent(payload)
      window.localStorage.setItem('last_whatsapp_click', JSON.stringify({ ...payload, clicked_at: new Date().toISOString() }))
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
