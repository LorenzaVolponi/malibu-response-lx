'use client'

import { MessageCircle, Send } from 'lucide-react'
import { whatsappLeadUrl } from '@/lib/contact'
import { boat } from '@/lib/boat-data'
import { pushDataLayerEvent } from '@/lib/analytics'

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] border-t border-cream/10 bg-navy-deep/94 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] tracking-[0.16em] text-cream/50 uppercase">Malibu Response LX · {boat.year}</p>
          <p className="font-serif text-lg leading-tight text-cream">{boat.priceLabel}</p>
        </div>
        <a
          href={whatsappLeadUrl('primary')}
          target="_blank"
          rel="noopener noreferrer"
          data-whatsapp-intent="sticky_mobile_primary"
          onClick={() => pushDataLayerEvent({ event: 'mobile_sales_dock_click', lead_intent: 'primary' })}
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-black/20"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          Tenho interesse
        </a>
        <a
          href={whatsappLeadUrl('offer')}
          target="_blank"
          rel="noopener noreferrer"
          data-whatsapp-intent="sticky_mobile_offer"
          onClick={() => pushDataLayerEvent({ event: 'mobile_sales_dock_click', lead_intent: 'offer' })}
          aria-label="Fazer proposta"
          className="grid min-h-12 min-w-12 shrink-0 place-items-center rounded-full border border-cream/15 text-cream transition hover:border-gold/40 hover:text-gold"
        >
          <Send className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
