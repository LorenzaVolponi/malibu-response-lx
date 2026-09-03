'use client'

import { MessageCircle, Share2 } from 'lucide-react'
import { boat } from '@/lib/boat-data'
import { siteConfig } from '@/lib/site-config'
import { pushDataLayerEvent } from '@/lib/analytics'

const shareText = `${boat.brand} ${boat.model} ${boat.year} à venda por ${boat.priceLabel} — V8 350 HP, Direct Drive e Zero Off GPS.`
const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${siteConfig.url}`)}`

export function ListingShareControls() {
  const shareListing = async () => {
    pushDataLayerEvent({ event: 'listing_share_click', share_surface: 'native' })
    if (navigator.share) {
      await navigator.share({
        title: `${boat.brand} ${boat.model} ${boat.year}`,
        text: shareText,
        url: siteConfig.url,
      }).catch(() => undefined)
      return
    }
    window.open(whatsappShareUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <button
        type="button"
        onClick={shareListing}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cream/10 px-4 py-2 text-xs font-semibold text-cream/75 transition hover:border-gold/35 hover:text-gold"
      >
        <Share2 className="size-4" aria-hidden="true" /> Compartilhar anúncio
      </button>
      <a
        href={whatsappShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => pushDataLayerEvent({ event: 'listing_share_click', share_surface: 'whatsapp' })}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cream/10 px-4 py-2 text-xs font-semibold text-cream/75 transition hover:border-gold/35 hover:text-gold"
      >
        <MessageCircle className="size-4" aria-hidden="true" /> Enviar a alguém
      </a>
    </div>
  )
}
