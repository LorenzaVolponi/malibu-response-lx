import { boat, features, gallery, specs } from '@/lib/boat-data'
import { seoIntentPages } from '@/lib/seo-pages'
import { siteConfig } from '@/lib/site-config'

export const dynamic = 'force-static'

export function GET() {
  const payload = {
    schemaVersion: '1.1',
    datasetId: `${siteConfig.url}/boat.json#dataset`,
    canonicalUrl: siteConfig.url,
    dossierUrl: `${siteConfig.url}/dossie-tecnico`,
    guidesUrl: `${siteConfig.url}/guias`,
    updatedAt: siteConfig.updatedAt,
    language: 'pt-BR',
    listing: {
      entityId: `${siteConfig.url}/#product`,
      brand: boat.brand,
      model: boat.model,
      name: boat.name,
      alternateNames: [
        'Malibu Response LX à venda',
        `Malibu Response LX ${boat.year}`,
        'Lancha Malibu direct drive',
      ],
      year: boat.year,
      price: boat.price,
      priceCurrency: boat.currency,
      priceLabel: boat.priceLabel,
      engineHours: boat.engineHours,
      location: boat.location,
      availability: 'confirm-with-seller',
      condition: 'used',
      category: 'competition-ski-boat',
      useCases: ['esqui aquático', 'wakeboard recreativo', 'lazer náutico'],
    },
    powertrain: {
      engine: 'Indmar Monsoon 350 SS V8',
      powerHp: 350,
      transmission: 'Direct Drive',
      speedControl: 'Zero Off GPS',
    },
    specifications: specs.map(({ label, value, note }) => ({ label, value, note })),
    features: features.map(({ title, description, image, alt }) => ({
      title,
      description,
      image: `${siteConfig.url}${image}`,
      alt,
    })),
    images: gallery.map(({ src, alt }, index) => ({
      id: `${siteConfig.url}/#image-${index + 1}`,
      url: `${siteConfig.url}${src}`,
      alt,
      position: index + 1,
      representative: index === 0,
    })),
    knowledgeGraph: {
      website: `${siteConfig.url}/#website`,
      seller: `${siteConfig.url}/#seller`,
      product: `${siteConfig.url}/#product`,
      brand: `${siteConfig.url}/#malibu-boats`,
      model: `${siteConfig.url}/#response-lx`,
      engine: `${siteConfig.url}/#indmar-monsoon-350-ss`,
      speedControl: `${siteConfig.url}/#zero-off-gps`,
      transmission: `${siteConfig.url}/#direct-drive`,
    },
    relatedContent: seoIntentPages.map((page) => ({
      title: page.title,
      url: `${siteConfig.url}/guias/${page.slug}`,
      description: page.description,
      keywords: page.keywords,
    })),
    contact: {
      channel: 'WhatsApp',
      url: `https://wa.me/${boat.whatsapp}`,
      intent: 'request-current-availability-and-inspection-details',
    },
    provenance: {
      sourceType: 'seller-published-listing',
      evidenceTypes: ['listing data', 'photographs', 'technical specifications'],
      methodologyUrl: `${siteConfig.url}/dossie-tecnico#metodologia-dossie`,
      limitations: [
        'Dados dependem de confirmação direta com o vendedor.',
        'Fotografias não substituem inspeção presencial.',
        'Informações mecânicas e documentais devem ser validadas de forma independente.',
      ],
    },
    buyerSafety: [
      'Confirmar disponibilidade e condições diretamente com o vendedor.',
      'Solicitar documentação e registros de manutenção disponíveis.',
      'Realizar inspeção presencial e teste na água antes da compra.',
      'Validar horímetro, partida a frio e funcionamento do Zero Off.',
      'Não considerar áudio sintetizado como som real da embarcação.',
    ],
  }

  return Response.json(payload, {
    headers: {
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
      'Content-Language': 'pt-BR',
      Link: [
        `<${siteConfig.url}>; rel="canonical"`,
        `<${siteConfig.url}/dossie-tecnico>; rel="describedby"`,
        `<${siteConfig.url}/feed.xml>; rel="alternate"; type="application/rss+xml"`,
      ].join(', '),
    },
  })
}
