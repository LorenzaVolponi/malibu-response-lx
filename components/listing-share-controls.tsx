'use client'

import { MessageCircle, Share2 } from 'lucide-react'
import { boat } from '@/lib/boat-data'
import { siteConfig } from '@/lib/site-config'
import { pushDataLayerEvent } from '@/lib/analytics'

const shareText = `${boat.brand} ${boat.model} ${boat.year} à venda por ${boat.priceLabel} — V8 350 HP, Direct Drive e Zero Off GPS.`

function attributedShareUrl(content: 'native_share' | 'whatsapp_share') {
  const url = new URL(siteConfig.url)
  url.searchParams.set('utm_source', 'site_share')
  url.searchParams.set('utm_medium', 'referral')
  url.searchParams.set('utm_campaign', 'malibu_listing_share')
  url.searchParams.set('utm_content', content)
  return url.toString()
}

const nativeShareUrl = attributedShareUrl('native_share')
const whatsappListingUrl = attributedShareUrl('whatsapp_share')
const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${whatsappListingUrl}`)}`

export function ListingShareControls() {
  const shareListing = async () => {
    pushDataLayerEvent({
      event: 'listing_share_click',
      share_surface: 'native',
      share_attribution_source: 'site_share',
      share_attribution_campaign: 'malibu_listing_share',
    })

    if (navigator.share) {
      await navigator.share({
        title: `${boat.brand} ${boat.model} ${boat.year}`,
        text: shareText,
        url: nativeShareUrl,
      }).catch(() => undefined)
      return
    }

    window.open(whatsappShareUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className="grid grid-cols-1 gap-2 sm:grid-cols-2"
      data-share-attribution="site_share"
      data-native-share-url={nativeShareUrl}
      data-whatsapp-listing-url={whatsappListingUrl}
    >
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
        onClick={() => pushDataLayerEvent({
          event: 'listing_share_click',
          share_surface: 'whatsapp',
          share_attribution_source: 'site_share',
          share_attribution_campaign: 'malibu_listing_share',
        })}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cream/10 px-4 py-2 text-xs font-semibold text-cream/75 transition hover:border-gold/35 hover:text-gold"
      >
        <MessageCircle className="size-4" aria-hidden="true" /> Enviar a alguém
      </a>
    </div>
  )
}
