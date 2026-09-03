'use client'

import { FileCheck2, MessageCircle, Send } from 'lucide-react'
import { boat } from '@/lib/boat-data'
import { whatsappLeadUrl } from '@/lib/contact'
import { pushDataLayerEvent } from '@/lib/analytics'

const actions = [
  {
    label: 'Tenho interesse',
    href: whatsappLeadUrl('primary'),
    intent: 'primary',
    icon: MessageCircle,
    primary: true,
  },
  {
    label: 'Validar antes',
    href: whatsappLeadUrl('documents'),
    intent: 'documents',
    icon: FileCheck2,
    primary: false,
  },
  {
    label: 'Fazer proposta',
    href: whatsappLeadUrl('offer'),
    intent: 'offer',
    icon: Send,
    primary: false,
  },
] as const

export function DesktopSalesDock() {
  return (
    <aside
      aria-label="Ações rápidas de compra"
      className="fixed bottom-5 left-1/2 z-40 hidden w-[min(920px,calc(100vw-2rem))] -translate-x-1/2 items-center gap-3 rounded-2xl border border-cream/10 bg-navy-deep/92 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl lg:flex"
    >
      <div className="min-w-0 flex-1 px-2">
        <p className="truncate text-xs font-semibold text-cream">{boat.brand} {boat.model} {boat.year}</p>
        <p className="mt-0.5 text-[11px] text-cream/55">{boat.priceLabel} · {boat.engineHours} h informadas · V8 350 HP · Zero Off GPS</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {actions.map(({ label, href, intent, icon: Icon, primary }) => (
          <a
            key={intent}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-whatsapp-intent={`desktop_dock_${intent}`}
            onClick={() => pushDataLayerEvent({ event: 'desktop_sales_dock_click', lead_intent: intent })}
            className={primary
              ? 'inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold text-primary-foreground transition hover:scale-[1.02]'
              : 'inline-flex min-h-11 items-center gap-2 rounded-full border border-cream/15 px-4 py-2 text-xs font-semibold text-cream transition hover:border-gold/40 hover:text-gold-soft'}
          >
            <Icon className="size-4" aria-hidden="true" />
            {label}
          </a>
        ))}
      </div>
    </aside>
  )
}
