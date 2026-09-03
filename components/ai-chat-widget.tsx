'use client'

import { useEffect, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { boat } from '@/lib/boat-data'
import { whatsappLeadUrl } from '@/lib/contact'
import { pushDataLayerEvent } from '@/lib/analytics'

const SUGGESTIONS = [
  'Quero agendar uma visita',
  'O preço é negociável?',
  'Ano e horas de motor?',
  'É ideal para esqui e wakeboard?',
  'Quero falar sobre motor e manutenção',
  'Quais dados preciso confirmar?',
]

export function AiChatWidget({ initialOpen = false }: { initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen)
  const [input, setInput] = useState('')
  const { messages, sendMessage, status, error } = useChat()
  const scrollRef = useRef<HTMLDivElement>(null)
  const busy = status === 'submitted' || status === 'streaming'
  const wa = whatsappLeadUrl('primary')

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  const submit = (text: string) => {
    const value = text.trim().slice(0, 500)
    if (!value || busy) return
    pushDataLayerEvent({
      event: 'chat_message_submit',
      chat_suggestion: SUGGESTIONS.includes(value),
    })
    sendMessage({ text: value })
    setInput('')
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          const nextOpen = !open
          pushDataLayerEvent({ event: nextOpen ? 'chat_open' : 'chat_close' })
          setOpen(nextOpen)
        }}
        aria-label={open ? 'Fechar assistente' : 'Abrir assistente virtual'}
        aria-expanded={open}
        className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-navy-deep/50 transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
      >
        {open ? <CloseIcon /> : <ChatIcon />}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cream opacity-70" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-cream" />
          </span>
        )}
      </button>

      <div
        className={`fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] inset-x-3 z-50 flex max-w-none origin-bottom-right flex-col overflow-hidden rounded-3xl transition-all duration-300 sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[calc(100vw-2rem)] sm:max-w-sm ${
          open ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0'
        }`}
        style={{ height: 'min(70dvh, 560px)', maxHeight: 'calc(100dvh - 7rem - env(safe-area-inset-bottom))' }}
        role="dialog"
        aria-label="Assistente virtual do barco"
      >
        <div className="glass-strong flex h-full flex-col">
          <header className="flex items-center gap-3 border-b border-cream/10 px-5 py-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
              <ChatIcon small />
            </span>
            <div className="min-w-0">
              <p className="font-serif text-sm text-cream">Consultor Malibu</p>
              <p className="flex items-center gap-1.5 text-xs text-cream/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Responde só com dados reais
              </p>
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-cream/10 px-4 py-3 text-sm leading-relaxed text-cream">
                  Olá! Sou o consultor virtual desta {boat.brand} {boat.model}. Posso ajudar com
                  preço, ano, horas, motor, inclusos, visita e negociação — sem inventar dados não confirmados.
                </div>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => submit(s)}
                      className="rounded-full border border-primary/40 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary/10"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'rounded-tr-sm bg-primary text-primary-foreground'
                      : 'rounded-tl-sm bg-cream/10 text-cream'
                  }`}
                >
                  {m.parts.map((part, i) =>
                    part.type === 'text' ? <span key={i}>{part.text}</span> : null,
                  )}
                </div>
              </div>
            ))}

            {busy && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex justify-start">
                <div className="flex gap-1.5 rounded-2xl rounded-tl-sm bg-cream/10 px-4 py-4">
                  <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm leading-relaxed text-cream">
                O assistente está indisponível no momento. Fale direto com o vendedor pelo{' '}
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary underline underline-offset-2"
                >
                  WhatsApp
                </a>
                .
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              submit(input)
            }}
            className="border-t border-cream/10 p-3"
          >
            <div className="flex items-center gap-2 rounded-full border border-cream/15 bg-navy-deep/40 pl-4 pr-1.5">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                    e.preventDefault()
                    submit(input)
                  }
                }}
                maxLength={500}
                placeholder="Escreva sua pergunta..."
                className="min-w-0 flex-1 bg-transparent py-3 text-base text-cream sm:text-sm placeholder:text-cream/40 focus:outline-none"
                aria-label="Sua pergunta"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Enviar"
                className="flex h-11 w-11 flex-shrink-0 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
              >
                <SendIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

function Dot({ delay = '0ms' }: { delay?: string }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-cream/60"
      style={{ animationDelay: delay }}
    />
  )
}

function ChatIcon({ small }: { small?: boolean }) {
  const s = small ? 18 : 24
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z" />
    </svg>
  )
}
