export type DataLayerEvent = Record<string, unknown> & { event: string }

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

export function pushDataLayerEvent(event: DataLayerEvent) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ page_path: window.location.pathname, ...event })

  if (event.event === 'generate_lead') {
    window.dispatchEvent(new CustomEvent('whatsapp_conversion', { detail: event }))
  }
}
