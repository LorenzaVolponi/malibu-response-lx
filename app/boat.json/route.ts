import { boat, features, gallery, specs } from '@/lib/boat-data'
import { seoIntentPages } from '@/lib/seo-pages'
import { siteConfig } from '@/lib/site-config'

export const dynamic = 'force-static'

export function GET() {
  const payload = {
    schemaVersion: '1.2',
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
        'Competition ski boat Malibu',
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
      useCases: ['esqui aquático', 'slalom', 'wakeboard recreativo', 'lazer náutico'],
    },
    powertrain: {
      engine: 'Indmar Monsoon 350 SS V8',
      powerHp: 350,
      transmission: 'Direct Drive',
      speedControl: 'Zero Off GPS',
    },
    semanticEntities: [
      {
        id: `${siteConfig.url}/#malibu-boats`,
        type: 'Brand',
        name: 'Malibu Boats',
        relation: 'brand-of',
      },
      {
        id: `${siteConfig.url}/#response-lx`,
        type: 'ProductModel',
        name: 'Malibu Response LX',
        relation: 'model-of',
      },
      {
        id: `${siteConfig.url}/#indmar-monsoon-350-ss`,
        type: 'Product',
        name: 'Indmar Monsoon 350 SS',
        relation: 'engine-of',
      },
      {
        id: `${siteConfig.url}/#zero-off-gps`,
        type: 'Thing',
        name: 'Zero Off GPS',
        relation: 'speed-control-of',
      },
      {
        id: `${siteConfig.url}/#direct-drive`,
        type: 'Thing',
        name: 'Direct Drive',
        relation: 'transmission-of',
      },
      {
        id: `${siteConfig.url}/#ski-boat`,
        type: 'Thing',
        name: 'Ski boat',
        relation: 'category-of',
      },
      {
        id: `${siteConfig.url}/#slalom-water-skiing`,
        type: 'Thing',
        name: 'Esqui aquático slalom',
        relation: 'intended-use',
      },
      {
        id: `${siteConfig.url}/#wakeboard`,
        type: 'Thing',
        name: 'Wakeboard',
        relation: 'related-use',
      },
    ],
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
      evidenceFor: ['condition', 'equipment', 'identity'],
    })),
    authenticity: {
      status: 'seller-published-evidence',
      verifiedFacts: [
        { name: 'Ano', value: String(boat.year), evidence: 'listing-data' },
        { name: 'Horas de motor', value: `${boat.engineHours} h`, evidence: 'listing-data' },
        { name: 'Motor', value: 'Indmar Monsoon 350 SS', evidence: 'photograph-and-listing-data' },
        { name: 'Potência', value: '350 HP', evidence: 'technical-identification' },
        { name: 'Transmissão', value: 'Direct Drive', evidence: 'model-configuration' },
        { name: 'Controle de velocidade', value: 'Zero Off GPS', evidence: 'dashboard-photograph' },
        { name: 'Acessórios', value: 'Bimini e carreta galvanizada', evidence: 'photographs' },
      ],
      pendingIndependentValidation: [
        'documentação e titularidade',
        'histórico de manutenção',
        'inspeção de casco, eixo e hélice',
        'teste na água',
      ],
    },
    knowledgeGraph: {
      website: `${siteConfig.url}/#website`,
      seller: `${siteConfig.url}/#seller`,
      product: `${siteConfig.url}/#product`,
      brand: `${siteConfig.url}/#malibu-boats`,
      model: `${siteConfig.url}/#response-lx`,
      engine: `${siteConfig.url}/#indmar-monsoon-350-ss`,
      speedControl: `${siteConfig.url}/#zero-off-gps`,
      transmission: `${siteConfig.url}/#direct-drive`,
      skiBoat: `${siteConfig.url}/#ski-boat`,
      slalom: `${siteConfig.url}/#slalom-water-skiing`,
      wakeboard: `${siteConfig.url}/#wakeboard`,
    },
    relatedContent: seoIntentPages.map((page) => ({
      title: page.title,
      url: `${siteConfig.url}/guias/${page.slug}`,
      description: page.description,
      keywords: page.keywords,
    })),
    provenance: {
      sourceType: 'seller-published-listing',
      evidenceTypes: ['listing data', 'real photographs', 'technical specifications'],
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
