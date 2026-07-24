'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const AiChatWidget = dynamic(
  () => import('@/components/ai-chat-widget').then((module) => module.AiChatWidget),
  { ssr: false },
)

export function DeferredWidgets() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const show = () => setReady(true)
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    if (idleWindow.requestIdleCallback) {
      const id = idleWindow.requestIdleCallback(show, { timeout: 2500 })
      return () => idleWindow.cancelIdleCallback?.(id)
    }

    const timer = window.setTimeout(show, 1800)
    return () => window.clearTimeout(timer)
  }, [])

  if (!ready) return null

  return <AiChatWidget />
}
