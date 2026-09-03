import { NextResponse } from 'next/server'
import { z } from 'zod'
import { whatsappUrl, type ContactIntent } from '@/lib/contact'

const intentSchema = z.enum(['primary', 'secondary', 'technical', 'documents', 'test', 'offer']).catch('primary')
const PAID_CLICK_KEYS = ['gclid', 'gbraid', 'wbraid', 'msclkid', 'fbclid'] as const
const LEDGER_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'source_group',
  'channel_group',
  'referrer_host',
  'landing_path',
] as const
const MESSAGE_CONTEXT_KEYS = [
  'channel_group',
  'source_group',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'landing_path',
] as const

function safeParam(reqUrl: URL, key: string, maxLength = 250) {
  const value = reqUrl.searchParams.get(key)?.trim()
  if (!value) return undefined
  return value.replace(/[\r\n\t|]+/g, ' ').replace(/\s{2,}/g, ' ').slice(0, maxLength)
}

function createLeadRef() {
  return crypto.randomUUID().replaceAll('-', '').slice(0, 10).toUpperCase()
}

function withAttribution(url: string, reqUrl: URL, intent: ContactIntent, leadRef: string) {
  const destination = new URL(url)
  const currentText = destination.searchParams.get('text') ?? ''
  const attribution = MESSAGE_CONTEXT_KEYS
    .map((key) => [key, safeParam(reqUrl, key)] as const)
    .filter(([, value]) => value)

  const context: string[] = [`lead_ref: ${leadRef}`, `intenção: ${intent}`]
  if (attribution.length > 0) {
    context.push(...attribution.map(([key, value]) => `${key}: ${value}`))
  }

  if (!currentText.includes('Contexto do lead:')) {
    destination.searchParams.set('text', `${currentText}\n\nContexto do lead: ${context.join(' | ')}`)
  }

  return destination
}

function logLeadRedirect(reqUrl: URL, intent: ContactIntent, leadRef: string) {
  const attribution = Object.fromEntries(
    LEDGER_KEYS
      .map((key) => [key, safeParam(reqUrl, key)] as const)
      .filter(([, value]) => value),
  )

  const event = {
    event: 'whatsapp_lead_redirect',
    lead_ref: leadRef,
    occurred_at: new Date().toISOString(),
    intent,
    ...attribution,
    has_paid_click_id: PAID_CLICK_KEYS.some((key) => Boolean(reqUrl.searchParams.get(key))),
  }

  // First-party conversion ledger only. Deliberately excludes IP address,
  // phone number, user agent and raw advertising click IDs.
  console.info('[whatsapp-lead]', JSON.stringify(event))
}

export function GET(req: Request) {
  const reqUrl = new URL(req.url)
  const intent = intentSchema.parse(reqUrl.searchParams.get('intent')) as ContactIntent
  const leadRef = createLeadRef()
  const destination = withAttribution(whatsappUrl(intent), reqUrl, intent, leadRef)

  logLeadRedirect(reqUrl, intent, leadRef)

  const response = NextResponse.redirect(destination, 302)
  response.headers.set('Cache-Control', 'private, no-store, max-age=0')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
  response.headers.set('X-Lead-Reference', leadRef)
  return response
}
