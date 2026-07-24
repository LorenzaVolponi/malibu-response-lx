import { boat, features, gallery, specs } from '@/lib/boat-data'
import { siteConfig } from '@/lib/site-config'

export const dynamic = 'force-static'

export function GET() {
  const payload = {
    schemaVersion: '1.0',
    canonicalUrl: siteConfig.url,
    updatedAt: siteConfig.updatedAt,
    listing: {
      brand: boat.brand,
      model: boat.model,
      name: boat.name,
      year: boat.year,
      price: boat.price,
      priceCurrency: boat.currency,
      priceLabel: boat.priceLabel,
      engineHours: boat.engineHours,
      location: boat.location,
      availability: 'confirm-with-seller',
    },
    specifications: specs,
    features: features.map(({ title, description, image, alt }) => ({ title, description, image: `${siteConfig.url}${image}`, alt })),
    images: gallery.map(({ src, alt }) => ({ url: `${siteConfig.url}${src}`, alt })),
    contact: {
      channel: 'WhatsApp',
      url: `https://wa.me/${boat.whatsapp}`,
    },
    buyerSafety: [
      'Confirmar disponibilidade e condições diretamente com o vendedor.',
      'Solicitar documentação e registros de manutenção disponíveis.',
      'Realizar inspeção presencial e teste na água antes da compra.',
      'Não considerar áudio sintetizado como som real da embarcação.',
    ],
  }

  return Response.json(payload, {
    headers: { 'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800' },
  })
}
