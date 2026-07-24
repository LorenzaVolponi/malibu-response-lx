import { createUIMessageStream, createUIMessageStreamResponse, type UIMessage } from 'ai'
import { boat, conditionItems, specs } from '@/lib/boat-data'
import { contactMessages, whatsappLeadUrl } from '@/lib/contact'
import { siteConfig } from '@/lib/site-config'

export const maxDuration = 10

const MAX_MESSAGE_LENGTH = 500
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 20
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

type IncomingMessage = UIMessage & { content?: string }

const contactUrl = `${siteConfig.url}${whatsappLeadUrl('primary')}`

const facts = {
  price: `Preço: ${boat.priceLabel}. Propostas e condições devem ser tratadas diretamente pelo WhatsApp do vendedor.`,
  yearHours: `Ano de fabricação: ${boat.year}. Horas de motor: ${boat.engineHours} h.`,
  motor: 'Motor: Indmar Monsoon 350 SS, V8 5.7L, 350 HP, identificado na tampa do motor.',
  transmission: 'Transmissão: Direct Drive / eixo direto, configuração consagrada para esqui aquático.',
  zeroOff: 'Controle de velocidade: Zero Off GPS integrado ao painel, útil para manter ritmo consistente em esportes náuticos.',
  includes: 'Inclusos: toldo bimini e carreta rodoviária galvanizada.',
  condition: conditionItems.map((item) => `${item.label}: ${item.status} (${item.note})`).join('\n'),
  specs: specs.map((item) => `${item.label}: ${item.value} — ${item.note}`).join('\n'),
}

const unknownDetails = 'Documentação, histórico de manutenção, local exato de visita e laudos precisam ser validados diretamente com o vendedor.'

function getClientKey(req: Request) {
  const forwardedFor = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwardedFor || req.headers.get('x-real-ip') || 'anonymous'
}

function pruneExpiredRateLimitEntries(now: number) {
  rateLimitStore.forEach((entry, key) => {
    if (entry.resetAt <= now) rateLimitStore.delete(key)
  })
}

function isRateLimited(key: string) {
  const now = Date.now()
  pruneExpiredRateLimitEntries(now)
  const current = rateLimitStore.get(key)

  if (!current) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  current.count += 1
  return current.count > RATE_LIMIT_MAX_REQUESTS
}

function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function getLastUserText(messages: IncomingMessage[]) {
  const lastUser = [...messages].reverse().find((message) => message.role === 'user')
  const partsText = lastUser?.parts
    ?.filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join(' ')

  return (partsText || lastUser?.content || '').trim().slice(0, MAX_MESSAGE_LENGTH)
}

function formatAnswer(sections: string[], includeContact: boolean, includeUnknowns: boolean) {
  const uniqueSections = [...new Set(sections)]
  const lines = uniqueSections.map((section) => `• ${section}`)

  if (includeUnknowns) lines.push(`• ${unknownDetails}`)
  if (includeContact) lines.push(`• WhatsApp direto: ${contactUrl}`)

  return lines.join('\n')
}

function answerWithBoatFacts(question: string) {
  const q = normalize(question)
  const wantsContact = /whats|zap|contato|telefone|visita|agendar|ver|teste|comprar|negociar|proposta|document/.test(q)
  const asksUnknowns = /document|historico|manutenc|local|laudo|vistoria|registro|marinha|ipva|debito/.test(q)
  const sections: string[] = []

  if (/preco|valor|quanto|negoci/.test(q)) sections.push(facts.price)
  if (/ano|fabric|hora|horimetro/.test(q)) sections.push(facts.yearHours)
  if (/motor|v8|indmar|monsoon|potencia|hp/.test(q)) sections.push(facts.motor)
  if (/direct|eixo|transmiss|esqui|wake|wakeboard/.test(q)) sections.push(facts.transmission, facts.zeroOff)
  if (/zero|gps|controle|velocidade/.test(q)) sections.push(facts.zeroOff)
  if (/carreta|bimini|toldo|acompanha|inclus/.test(q)) sections.push(facts.includes)
  if (/estado|conserv|casco|estof|painel|condi/.test(q)) sections.push(facts.condition)
  if (/ficha|especific|comprimento|dados|info|informac/.test(q)) sections.push(facts.specs)
  if (asksUnknowns) sections.push(unknownDetails)

  if (sections.length === 0) {
    sections.push(
      `${boat.brand} ${boat.model} "${boat.name}" à venda por ${boat.priceLabel}, ano ${boat.year}, ${boat.engineHours} h, motor Indmar Monsoon 350 SS V8 350 HP, Direct Drive, Zero Off GPS, bimini e carreta inclusos.`,
    )
  }

  return formatAnswer(sections, wantsContact, asksUnknowns && !sections.includes(unknownDetails))
}

export async function POST(req: Request) {
  if (isRateLimited(getClientKey(req))) {
    return new Response('Muitas mensagens em pouco tempo. Tente novamente em instantes.', { status: 429 })
  }

  const body = await req.json().catch(() => ({ messages: [] }))
  const messages = Array.isArray(body.messages) ? body.messages as IncomingMessage[] : []
  const text = answerWithBoatFacts(getLastUserText(messages))

  const stream = createUIMessageStream<UIMessage>({
    originalMessages: messages,
    execute: ({ writer }) => {
      const id = `boat-facts-${Date.now()}`
      writer.write({ type: 'text-start', id })
      writer.write({ type: 'text-delta', id, delta: text })
      writer.write({ type: 'text-end', id })
    },
    onError: () => `O assistente não conseguiu responder agora. Fale diretamente pelo WhatsApp do vendedor: ${contactUrl}`,
  })

  return createUIMessageStreamResponse({ stream })
}
