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
    let cancelled = false
    const show = () => {
      if (!cancelled) setReady(true)
    }
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    const onFirstIntent = () => show()
    window.addEventListener('pointerdown', onFirstIntent, { once: true, passive: true })
    window.addEventListener('keydown', onFirstIntent, { once: true })

    if (idleWindow.requestIdleCallback) {
      const id = idleWindow.requestIdleCallback(show, { timeout: 3500 })
      return () => {
        cancelled = true
        idleWindow.cancelIdleCallback?.(id)
        window.removeEventListener('pointerdown', onFirstIntent)
        window.removeEventListener('keydown', onFirstIntent)
      }
    }

    const timer = window.setTimeout(show, 2500)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
      window.removeEventListener('pointerdown', onFirstIntent)
      window.removeEventListener('keydown', onFirstIntent)
    }
  }, [])

  if (!ready) return null

  return <AiChatWidget />
}
