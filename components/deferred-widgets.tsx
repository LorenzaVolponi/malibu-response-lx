'use client'

import { useState, type ComponentType } from 'react'
import { pushDataLayerEvent } from '@/lib/analytics'

type ChatEngine = ComponentType<{ initialOpen?: boolean }>
type ChatModule = typeof import('@/components/ai-chat-widget')

let chatModulePromise: Promise<ChatModule> | null = null

function loadChatModule() {
  chatModulePromise ??= import('@/components/ai-chat-widget')
  return chatModulePromise
}

export function DeferredWidgets() {
  const [Chat, setChat] = useState<ChatEngine | null>(null)
  const [loading, setLoading] = useState(false)

  const activate = async () => {
    if (loading || Chat) return
    setLoading(true)
    pushDataLayerEvent({ event: 'chat_open' })

    try {
      const module = await loadChatModule()
      setChat(() => module.AiChatWidget)
    } finally {
      setLoading(false)
    }
  }

  if (Chat) return <Chat initialOpen />

  return (
    <button
      type="button"
      onClick={() => void activate()}
      onPointerEnter={() => void loadChatModule()}
      onFocus={() => void loadChatModule()}
      aria-label="Abrir assistente virtual"
      aria-expanded="false"
      aria-busy={loading}
      className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-navy-deep/50 transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <ChatIcon />
      <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cream opacity-70" />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-cream" />
      </span>
    </button>
  )
}

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}
