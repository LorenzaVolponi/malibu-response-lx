import { NextResponse } from 'next/server'
import { z } from 'zod'
import { whatsappUrl, type ContactIntent } from '@/lib/contact'

const intentSchema = z.enum(['primary', 'secondary', 'technical', 'documents', 'test', 'offer']).catch('primary')
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
  'source_group',
  'landing_path',
] as const

function withAttribution(url: string, reqUrl: URL, intent: ContactIntent) {
  const destination = new URL(url)
  const currentText = destination.searchParams.get('text') ?? ''
  const attribution = ATTRIBUTION_KEYS
    .map((key) => [key, reqUrl.searchParams.get(key)?.slice(0, 500)] as const)
    .filter(([, value]) => value)

  const context: string[] = [`intenção: ${intent}`]
  if (attribution.length > 0) {
    context.push(...attribution.map(([key, value]) => `${key}: ${value}`))
  }

  if (!currentText.includes('Contexto do lead:')) {
    destination.searchParams.set('text', `${currentText}\n\nContexto do lead: ${context.join(' | ')}`)
  }

  return destination
}

export function GET(req: Request) {
  const reqUrl = new URL(req.url)
  const intent = intentSchema.parse(reqUrl.searchParams.get('intent')) as ContactIntent

  return NextResponse.redirect(withAttribution(whatsappUrl(intent), reqUrl, intent), 302)
}
