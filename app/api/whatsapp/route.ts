import { NextResponse } from 'next/server'
import { z } from 'zod'
import { whatsappUrl, type ContactIntent } from '@/lib/contact'

const intentSchema = z.enum(['primary', 'secondary', 'technical', 'documents', 'test', 'offer']).catch('primary')
const ATTRIBUTION_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid', 'msclkid'] as const

function withAttribution(url: string, reqUrl: URL) {
  const destination = new URL(url)
  const currentText = destination.searchParams.get('text') ?? ''
  const attribution = ATTRIBUTION_KEYS
    .map((key) => [key, reqUrl.searchParams.get(key)] as const)
    .filter(([, value]) => value)

  if (attribution.length > 0 && !currentText.includes('Origem do clique:')) {
    const attributionText = attribution.map(([key, value]) => `${key}: ${value}`).join(' | ')
    destination.searchParams.set('text', `${currentText}\n\nOrigem do clique: ${attributionText}`)
  }

  return destination
}

export function GET(req: Request) {
  const reqUrl = new URL(req.url)
  const intent = intentSchema.parse(reqUrl.searchParams.get('intent')) as ContactIntent

  return NextResponse.redirect(withAttribution(whatsappUrl(intent), reqUrl), 302)
}
