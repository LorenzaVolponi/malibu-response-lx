'use client'

import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { boat } from '@/lib/boat-data'
import { whatsappUrl } from '@/lib/contact'

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={whatsappUrl('primary')}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-3 right-[5.25rem] z-40 flex items-center justify-between gap-3 rounded-full border border-gold/30 bg-navy-deep/85 px-4 py-3 text-cream shadow-2xl shadow-black/35 backdrop-blur-xl transition-all duration-300 sm:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
      aria-label="Vídeos e docs pelo WhatsApp"
    >
      <span className="min-w-0">
        <span className="block text-[10px] tracking-[0.2em] text-gold uppercase">Vídeos e docs</span>
        <span className="block truncate font-serif text-lg">{boat.priceLabel}</span>
      </span>
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold text-primary-foreground">
        <MessageCircle className="size-5" aria-hidden="true" />
      </span>
    </a>
  )
}
