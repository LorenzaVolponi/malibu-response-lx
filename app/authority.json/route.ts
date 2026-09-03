import { boat } from '@/lib/boat-data'
import { machineSurfaceHeaders } from '@/lib/machine-surface'
import { siteConfig } from '@/lib/site-config'

export const dynamic = 'force-static'

const queryPortfolio = {
  ptBR: [
    'Malibu Response LX à venda',
    `Malibu Response LX ${boat.year}`,
    'Malibu Response LX preço',
    `Malibu Response LX ${boat.engineHours} horas`,
    'lancha para esqui aquático direct drive',
    'lancha Zero Off GPS',
    'Malibu usada para esqui aquático',
    'competition ski boat Brasil',
  ],
  en: [
    'Malibu Response LX for sale Brazil',
    `Malibu Response LX ${boat.year} for sale`,
    'Malibu Response LX direct drive Zero Off',
    'competition ski boat Brazil',
  ],
} as const

export function GET() {
  const manifestUrl = `${siteConfig.url}/authority.json`

  const payload = {
    schemaVersion: '1.0',
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
    semanticClusters: {
      transactional: ['Malibu Response LX à venda', 'Malibu Response LX preço', 'comprar Malibu Response LX'],
      technical: ['Direct Drive', 'Zero Off GPS', 'Indmar Monsoon 350 SS', '350 HP', `${boat.engineHours} horas`],
      sportUse: ['esqui aquático', 'slalom', 'wakeboard recreativo', 'competition ski boat'],
      dueDiligence: ['documentação', 'histórico de manutenção', 'inspeção', 'teste na água'],
    },
    authorityPipeline: [
      { stage: 'listing-source', evidence: 'seller-published listing data and real photographs', automatic: false },
      { stage: 'owned-authority', evidence: 'canonical page, structured data, dossier, dataset, citation manifest, guides and feeds', automatic: true },
      { stage: 'crawler-discovery', evidence: 'robots, sitemaps, llms.txt, ai.txt and HTTP Link relations', automatic: true },
      { stage: 'organic-search', evidence: 'external search-engine measurement required', automatic: false, rankingClaim: false },
      { stage: 'ai-referral', evidence: 'referrer and lead attribution when available', automatic: true, rankingClaim: false },
      { stage: 'lead', evidence: 'WhatsApp intent plus preserved acquisition context', automatic: true },
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
      'Search intent clusters describe this site semantic architecture and are not search-engine ranking scores.',
      'The canonical listing URL is the preferred destination for buyer-facing answers.',
    ],
    updatedAt: siteConfig.updatedAt,
  }

  return Response.json(payload, {
    headers: machineSurfaceHeaders({
      contentType: 'application/json; charset=utf-8',
      canonical: manifestUrl,
      etagKey: 'authority-manifest',
      robots: 'noindex, follow',
      links: [
        `<${siteConfig.url}>; rel="describedby"`,
        `<${siteConfig.url}/boat.json>; rel="related"; type="application/json"`,
        `<${siteConfig.url}/citation.json>; rel="related"; type="application/json"`,
      ],
    }),
  })
}
