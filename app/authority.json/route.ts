import { boat } from '@/lib/boat-data'
import { machineSurfaceHeaders } from '@/lib/machine-surface'
import { INDEXABLE_GUIDE_SLUGS, SUPPORT_ONLY_GUIDE_SLUGS } from '@/lib/search-index-policy.mjs'
import { siteConfig } from '@/lib/site-config'

export const dynamic = 'force-static'

const queryPortfolio = {
  ptBR: [
    'Malibu Response LX à venda',
    `Malibu Response LX ${boat.year}`,
    'Malibu Response LX preço',
    `Malibu Response LX ${boat.engineHours} horas`,
    'Malibu Response LX slalom',
    'Malibu Response LX Zero Off',
    'barco de esqui náutico Malibu',
    'lancha para esqui aquático direct drive',
    'lancha para ski aquático direct drive',
    'lancha Zero Off GPS',
    'Malibu usada para esqui aquático',
    'competition ski boat Brasil',
  ],
  en: [
    'Malibu Response LX for sale Brazil',
    `Malibu Response LX ${boat.year} for sale`,
    'Malibu Response LX direct drive Zero Off',
    'Malibu Response LX slalom boat',
    'competition ski boat Brazil',
  ],
} as const

export function GET() {
  const manifestUrl = `${siteConfig.url}/authority.json`

  const primarySearchTargets = {
    listing: {
      intents: ['Malibu Response LX à venda', 'comprar Malibu Response LX', `Malibu Response LX ${boat.year}`],
      primaryUrl: siteConfig.url,
      supportingUrls: [
        `${siteConfig.url}${siteConfig.guidePath}`,
        `${siteConfig.url}/guias/malibu-response-lx-a-venda`,
      ],
      policy: 'The canonical listing owns the exact sale intent. The exact-sale support guide is accessible but noindex to avoid competing with the listing.',
    },
    price: {
      intents: ['Malibu Response LX preço', 'Malibu Response LX valor', `Malibu Response LX ${boat.year} preço`],
      primaryUrl: `${siteConfig.url}/guias/malibu-response-lx-preco`,
    },
    specification: {
      intents: ['Malibu Response LX ficha técnica', 'Malibu Response LX especificações', `Malibu Response LX ${boat.year} ficha técnica`],
      primaryUrl: `${siteConfig.url}/guias/malibu-response-lx-2013-ficha-tecnica`,
      evidenceUrl: `${siteConfig.url}/dossie-tecnico`,
    },
    zeroOff: {
      intents: ['Malibu Response LX Zero Off', 'Zero Off GPS lancha', 'Zero Off esqui aquático'],
      primaryUrl: `${siteConfig.url}/guias/zero-off-gps-como-funciona`,
    },
    directDriveSki: {
      intents: ['lancha para esqui aquático direct drive', 'lancha para ski aquático', 'barco de esqui náutico direct drive'],
      primaryUrl: `${siteConfig.url}/guias/lancha-direct-drive-esqui-aquatico`,
    },
    engine: {
      intents: ['Indmar Monsoon 350 SS', 'motor Malibu Response LX', 'Malibu V8 350 HP'],
      primaryUrl: `${siteConfig.url}/guias/indmar-monsoon-350-ss-v8`,
    },
    engineHours: {
      intents: [`Malibu Response LX ${boat.engineHours} horas`, 'horas motor lancha usada', 'horímetro lancha usada'],
      primaryUrl: `${siteConfig.url}/guias/quantas-horas-motor-lancha-usada`,
    },
    documentation: {
      intents: ['documentação lancha usada', 'transferência embarcação usada', 'checklist compra barco usado'],
      primaryUrl: `${siteConfig.url}/guias/checklist-documentacao-lancha-usada`,
    },
    inspection: {
      intents: ['inspeção pré-compra lancha', 'avaliar lancha usada', 'vistoria embarcação usada'],
      primaryUrl: `${siteConfig.url}/guias/checklist-inspecao-pre-compra-lancha`,
    },
    buyerFit: {
      intents: ['Malibu Response LX vale a pena', 'comprar Malibu Response LX usada'],
      primaryUrl: `${siteConfig.url}/guias/malibu-response-lx-vale-a-pena`,
    },
  } as const

  const payload = {
    schemaVersion: '1.3',
    manifestType: 'listing-organic-authority',
    canonical: siteConfig.url,
    machineReadable: manifestUrl,
    entity: {
      id: `${siteConfig.url}/#product`,
      type: 'Vehicle',
      commercialType: 'Product',
      category: 'competition-ski-boat',
      name: `${boat.brand} ${boat.model} ${boat.year}`,
      brand: boat.brand,
      model: boat.model,
      year: boat.year,
      market: 'Brasil',
      language: 'pt-BR',
    },
    queryPortfolio,
    primarySearchTargets,
    cannibalizationPolicy: {
      principle: 'A small set of buyer-relevant pages may be indexed. Supporting pages stay accessible and followable but must not dilute the canonical listing or create search-variation sprawl.',
      exactSaleIntentOwner: siteConfig.url,
      curatedIndexableGuides: INDEXABLE_GUIDE_SLUGS.map((slug) => `${siteConfig.url}/guias/${slug}`),
      supportOnlyNoindex: SUPPORT_ONLY_GUIDE_SLUGS.map((slug) => `${siteConfig.url}/guias/${slug}`),
      evidencePagesRemainDistinct: [`${siteConfig.url}/dossie-tecnico`],
    },
    semanticClusters: {
      transactional: ['Malibu Response LX à venda', 'Malibu Response LX preço', 'comprar Malibu Response LX'],
      technical: ['Direct Drive', 'Zero Off GPS', 'Indmar Monsoon 350 SS', '350 HP', `${boat.engineHours} horas`],
      sportUse: ['esqui aquático', 'ski aquático', 'esqui náutico', 'slalom', 'wakeboard recreativo', 'competition ski boat'],
      dueDiligence: ['documentação', 'histórico de manutenção', 'inspeção', 'teste na água'],
    },
    authorityPipeline: [
      { stage: 'listing-source', evidence: 'seller-published listing data and real photographs', automatic: false },
      { stage: 'owned-authority', evidence: 'canonical page, structured data, dossier, curated search guides, support guides and machine-readable evidence surfaces', automatic: true },
      { stage: 'official-reference', evidence: 'scoped manufacturer and technology sources linked below', automatic: false, unitConditionClaim: false },
      { stage: 'crawler-discovery', evidence: 'robots, curated human sitemap, image sitemap, llms.txt, ai.txt and HTTP Link relations', automatic: true },
      { stage: 'organic-search', evidence: 'external search-engine measurement required', automatic: false, rankingClaim: false },
      { stage: 'ai-referral', evidence: 'referrer and lead attribution when available', automatic: true, rankingClaim: false },
      { stage: 'lead', evidence: 'WhatsApp intent plus preserved acquisition context', automatic: true },
    ],
    officialReferenceSources: [
      {
        publisher: 'Malibu Boats',
        url: 'https://www.malibuboats.com/owner-manuals',
        subject: `Owner manuals, including model year ${boat.year}`,
        scope: 'manufacturer model/year reference; not evidence of this unit condition',
      },
      {
        publisher: 'Malibu Boats, LLC',
        url: 'https://cdn.malibuboats.com/safety/20230718-Service-Advisory.pdf',
        subject: 'Service Advisory — Bow Seating Hazard',
        appliesTo: 'Response LX model years 1995-2014',
        listingYearWithinRange: boat.year >= 1995 && boat.year <= 2014,
        scope: 'manufacturer model safety advisory; not an inspection of this individual unit',
      },
      {
        publisher: 'Zero Off GPS Speed Control',
        url: 'https://www.zerogps.com/about/',
        subject: 'GPS speed-control technology',
        scope: 'technology reference; operation on this unit requires independent test',
      },
      {
        publisher: 'Zero Off GPS Speed Control',
        url: 'https://www.zerogps.com/faqs/',
        subject: 'Zero Off technical FAQ and general compatibility guidance',
        scope: 'technology reference; not a compatibility certification for this individual unit',
      },
    ],
    evidenceSurfaces: {
      canonical: siteConfig.url,
      dataset: `${siteConfig.url}/boat.json`,
      citation: `${siteConfig.url}/citation.json`,
      dossier: `${siteConfig.url}/dossie-tecnico`,
      guides: `${siteConfig.url}/guias`,
      llms: `${siteConfig.url}/llms.txt`,
      aiPolicy: `${siteConfig.url}/ai.txt`,
      rss: `${siteConfig.url}/feed.xml`,
      sitemap: `${siteConfig.url}/sitemap.xml`,
      imageSitemap: `${siteConfig.url}/sitemap-images.xml`,
    },
    salesMeasurement: {
      funnel: ['discovery', 'landing', 'engagement', 'intent', 'whatsapp-lead'],
      channelGroups: ['organic_search', 'ai_referral', 'social_referral', 'paid_media', 'email', 'referral', 'direct'],
      principle: 'Visibility, visit, engagement, lead, proposal and sale are separate evidence states.',
    },
    boundaries: [
      'No organic ranking position is claimed without verifiable external measurement.',
      'No AI citation or referral is claimed without observable evidence.',
      'Published listing facts remain separate from documentation, maintenance and mechanical validation.',
      'Official manufacturer references describe model, year range or technology only within their stated scope and do not prove this unit condition.',
      'Search intent clusters describe this site semantic architecture and are not search-engine ranking scores.',
      'Support-only guides may inform buyers and AI systems but are deliberately noindex so page volume is not treated as a quality strategy.',
      'The canonical listing URL is the preferred destination for buyer-facing sale answers.',
    ],
    updatedAt: siteConfig.updatedAt,
  }

  return Response.json(payload, {
    headers: machineSurfaceHeaders({
      contentType: 'application/json; charset=utf-8',
      canonical: manifestUrl,
      etagKey: 'authority-manifest-v1-3',
      robots: 'noindex, follow',
      links: [
        `<${siteConfig.url}>; rel="describedby"`,
        `<${siteConfig.url}/boat.json>; rel="related"; type="application/json"`,
        `<${siteConfig.url}/citation.json>; rel="related"; type="application/json"`,
      ],
    }),
  })
}
