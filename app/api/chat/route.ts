import { createUIMessageStream, createUIMessageStreamResponse, type UIMessage } from 'ai'
import { boat, conditionItems, specs } from '@/lib/boat-data'

export const maxDuration = 10

const facts = {
  price: `${boat.priceLabel} — propostas e condições devem ser tratadas diretamente pelo WhatsApp do vendedor.`,
  yearHours: `Ano de fabricação: ${boat.year}. Horas de motor: ${boat.engineHours} h.`,
  motor: 'Motor Indmar Monsoon 350 SS, V8 5.7L, 350 HP, identificado na tampa do motor.',
  transmission: 'Transmissão Direct Drive / eixo direto, configuração consagrada para esqui aquático.',
  zeroOff: 'Controle de velocidade Zero Off GPS integrado ao painel, útil para manter ritmo consistente em esportes náuticos.',
  includes: 'Acompanha toldo bimini e carreta rodoviária galvanizada.',
  condition: conditionItems.map((item) => `${item.label}: ${item.status} (${item.note})`).join('\n'),
  specs: specs.map((item) => `${item.label}: ${item.value} — ${item.note}`).join('\n'),
}

function getLastUserText(messages: UIMessage[]) {
  const lastUser = [...messages].reverse().find((message) => message.role === 'user')
  return lastUser?.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join(' ')
    .trim() ?? ''
}

function answerWithBoatFacts(question: string) {
  const q = question.toLowerCase()
  const wantsContact = /whats|zap|contato|telefone|visita|agendar|ver|teste|comprar|negociar|proposta|documenta/.test(q)
  const sections: string[] = []

  if (/preço|preco|valor|quanto|negoci/.test(q)) sections.push(facts.price)
  if (/ano|fabrica|horas|motor hora|horímetro|horimetro/.test(q)) sections.push(facts.yearHours)
  if (/motor|v8|indmar|monsoon|potência|potencia|hp|ronco/.test(q)) sections.push(facts.motor)
  if (/direct|eixo|transmiss|esqui|wake|wakeboard/.test(q)) sections.push(facts.transmission, facts.zeroOff)
  if (/zero|gps|controle|velocidade/.test(q)) sections.push(facts.zeroOff)
  if (/carreta|bimini|toldo|acompanha|inclus/.test(q)) sections.push(facts.includes)
  if (/estado|conserv|casco|estof|painel|condi/.test(q)) sections.push(facts.condition)
  if (/ficha|especific|comprimento|dados|info|informações|informacoes/.test(q)) sections.push(facts.specs)

  if (sections.length === 0) {
    sections.push(
      `Resumo real desta embarcação: ${boat.brand} ${boat.model} "${boat.name}", ${boat.priceLabel}, ano ${boat.year}, ${boat.engineHours} h, motor Indmar Monsoon 350 SS V8 350 HP, Direct Drive, Zero Off GPS, bimini e carreta inclusos.`,
    )
  }

  const uniqueSections = [...new Set(sections)]
  const contact = `\n\nPara visita, proposta, documentação, vídeos adicionais ou teste na água, fale direto no WhatsApp: https://wa.me/${boat.whatsapp}`
  const guardrail = '\n\nNão tenho dados confirmados sobre documentação, histórico de manutenção, local exato de visita ou laudos. Esses pontos precisam ser validados com o vendedor.'

  return `${uniqueSections.join('\n\n')}${wantsContact ? contact : ''}${guardrail}`
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()
  const text = answerWithBoatFacts(getLastUserText(messages))

  const stream = createUIMessageStream<UIMessage>({
    originalMessages: messages,
    execute: ({ writer }) => {
      const id = 'boat-facts'
      writer.write({ type: 'text-start', id })
      writer.write({ type: 'text-delta', id, delta: text })
      writer.write({ type: 'text-end', id })
    },
    onError: () => 'O assistente não conseguiu responder agora. Fale diretamente pelo WhatsApp do vendedor.',
  })

  return createUIMessageStreamResponse({ stream })
}
