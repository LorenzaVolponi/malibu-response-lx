'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const AiChatWidget = dynamic(
  () => import('@/components/ai-chat-widget').then((module) => module.AiChatWidget),
  { ssr: false },
)

const EngineSound = dynamic(
  () => import('@/components/engine-sound').then((module) => module.EngineSound),
  { ssr: false },
)
