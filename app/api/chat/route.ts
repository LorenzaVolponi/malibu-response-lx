import { createUIMessageStream, createUIMessageStreamResponse, type UIMessage } from 'ai'
import { boat, conditionItems, specs } from '@/lib/boat-data'

export const maxDuration = 10

type IncomingMessage = UIMessage & { content?: string }

const contactUrl = `https://wa.me/${boat.whatsapp}?text=${encodeURIComponent('Oi vim do site, tenho interesse no barco')}`

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

  return (partsText || lastUser?.content || '').trim()
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
  if (/motor|v8|indmar|monsoon|potencia|hp|ronco/.test(q)) sections.push(facts.motor)
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
