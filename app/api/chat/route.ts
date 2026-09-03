import { createUIMessageStream, createUIMessageStreamResponse, type UIMessage } from 'ai'
import { boat, conditionItems, specs } from '@/lib/boat-data'
import { whatsappLeadUrl } from '@/lib/contact'
import { siteConfig } from '@/lib/site-config'

export const maxDuration = 10

const MAX_MESSAGE_LENGTH = 500
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 20
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

const MALIBU_SAFETY_ADVISORY_URL = 'https://cdn.malibuboats.com/safety/20230718-Service-Advisory.pdf'

type IncomingMessage = UIMessage & { content?: string }

type LeadIntent = 'primary' | 'documents' | 'test' | 'offer' | 'technical'

const facts = {
  price: `Preço anunciado: ${boat.priceLabel}. Propostas e condições devem ser tratadas diretamente com o vendedor.`,
  yearHours: `Ano de fabricação: ${boat.year}. Horas de motor informadas: ${boat.engineHours} h.`,
  motor: 'Motor: Indmar Monsoon 350 SS, V8 5.7L, 350 HP, identificado na tampa do motor.',
  transmission: 'Transmissão: Direct Drive / eixo direto, configuração associada ao esqui aquático.',
  zeroOff: 'Controle de velocidade: Zero Off GPS integrado ao painel, recurso usado para manter ritmo consistente em esportes náuticos.',
  includes: 'Inclui toldo bimini. A embarcação não acompanha carreta.',
  safety: `Segurança do modelo: a Malibu Boats publicou um Service Advisory oficial sobre risco na área da proa que inclui Response LX dos anos 1995 a 2014. Como esta unidade é ${boat.year}, o ano está dentro da faixa indicada. A orientação da fabricante é não permitir passageiros na área da proa enquanto a embarcação estiver em movimento e obter as etiquetas atualizadas de capacidade/advertência conforme o programa da Malibu. Fonte oficial: ${MALIBU_SAFETY_ADVISORY_URL}. Isso é uma orientação de segurança do modelo, não uma inspeção desta unidade.`,
  condition: conditionItems.map((item) => `${item.label}: ${item.status} (${item.note})`).join('\n'),
  specs: specs.map((item) => `${item.label}: ${item.value} — ${item.note}`).join('\n'),
}

const unknownDetails = 'Documentação, histórico de manutenção, local exato de visita, laudos e condição operacional atual precisam ser validados diretamente com o vendedor.'

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
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

function getLastUserText(messages: IncomingMessage[]) {
  const lastUser = [...messages].reverse().find((message) => message.role === 'user')
  const partsText = lastUser?.parts?.filter((part) => part.type === 'text').map((part) => part.text).join(' ')
  return (partsText || lastUser?.content || '').trim().slice(0, MAX_MESSAGE_LENGTH)
}

function detectIntent(q: string): LeadIntent | null {
  if (/proposta|oferta|fechar|negociar|negociacao/.test(q)) return 'offer'
  if (/teste|testar|visita|agendar|avaliacao|ver pessoalmente/.test(q)) return 'test'
  if (/document|historico|manutenc|laudo|vistoria|registro|marinha|debito|video/.test(q)) return 'documents'
  if (/motor|v8|indmar|monsoon|potencia|hp|horimetro|tecnic/.test(q)) return 'technical'
  if (/whats|zap|contato|telefone|comprar|interesse/.test(q)) return 'primary'
  return null
}

function contactUrl(intent: LeadIntent) {
  return `${siteConfig.url}${whatsappLeadUrl(intent)}`
}

function formatAnswer(sections: string[], intent: LeadIntent | null, includeUnknowns: boolean) {
  const lines = [...new Set(sections)].map((section) => `• ${section}`)
  if (includeUnknowns) lines.push(`• ${unknownDetails}`)
  if (intent) {
    const labels: Record<LeadIntent, string> = {
      primary: 'Falar com o vendedor',
      documents: 'Pedir vídeos, documentação e manutenção',
      test: 'Agendar visita / teste',
      offer: 'Fazer uma proposta',
      technical: 'Falar sobre motor e dados técnicos',
    }
    lines.push(`• Próximo passo — ${labels[intent]}: ${contactUrl(intent)}`)
  }
  return lines.join('\n')
}

function answerWithBoatFacts(question: string) {
  const q = normalize(question)
  const intent = detectIntent(q)
  const asksUnknowns = /document|historico|manutenc|local|laudo|vistoria|registro|marinha|debito|operacional/.test(q)
  const sections: string[] = []

  if (/preco|valor|quanto|negoci/.test(q)) sections.push(facts.price)
  if (/ano|fabric|hora|horimetro/.test(q)) sections.push(facts.yearHours)
  if (/motor|v8|indmar|monsoon|potencia|hp/.test(q)) sections.push(facts.motor)
  if (/direct|eixo|transmiss|esqui|ski|wake|wakeboard/.test(q)) sections.push(facts.transmission, facts.zeroOff)
  if (/zero|gps|controle|velocidade/.test(q)) sections.push(facts.zeroOff)
  if (/carreta|bimini|toldo|acompanha|inclus/.test(q)) sections.push(facts.includes)
  if (/seguran|proa|passageir|capacidade|advisory|alerta|bow/.test(q)) sections.push(facts.safety)
  if (/estado|conserv|casco|estof|painel|condi/.test(q)) sections.push(facts.condition)
  if (/ficha|especific|comprimento|dados|info|informac/.test(q)) sections.push(facts.specs)
  if (asksUnknowns) sections.push(unknownDetails)

  if (sections.length === 0) {
    sections.push(`${boat.brand} ${boat.model} "${boat.name}" à venda por ${boat.priceLabel}, ano ${boat.year}, ${boat.engineHours} h informadas, motor Indmar Monsoon 350 SS V8 350 HP, Direct Drive, Zero Off GPS e bimini incluso; não acompanha carreta.`)
  }

  return formatAnswer(sections, intent, asksUnknowns && !sections.includes(unknownDetails))
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
    onError: () => `O assistente não conseguiu responder agora. Fale diretamente com o vendedor: ${contactUrl('primary')}`,
  })

  return createUIMessageStreamResponse({ stream })
}
