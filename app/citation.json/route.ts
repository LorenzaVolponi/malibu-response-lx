import { boat } from '@/lib/boat-data'
import { machineSurfaceHeaders } from '@/lib/machine-surface'
import { siteConfig } from '@/lib/site-config'

export const dynamic = 'force-static'

export function GET() {
  const manifestUrl = `${siteConfig.url}/citation.json`
  const sourceRegistry = [
    {
      id: 'canonical-listing',
      sourceType: 'first-party-listing',
      url: siteConfig.url,
      publisher: 'Vendedor particular',
      scope: 'Seller-published commercial facts for this individual unit.',
      unitConditionProof: false,
    },
    {
      id: 'boat-dataset',
      sourceType: 'first-party-structured-data',
      url: `${siteConfig.url}/boat.json`,
      publisher: siteConfig.name,
      scope: 'Structured restatement of the facts published for this individual unit.',
      unitConditionProof: false,
    },
    {
      id: 'published-photo-gallery',
      sourceType: 'first-party-photograph',
      url: `${siteConfig.url}/#gallery`,
      publisher: 'Vendedor particular',
      scope: 'Real photographs published in the listing; supports only visually observable characteristics.',
      unitConditionProof: false,
    },
    {
      id: 'technical-dossier',
      sourceType: 'first-party-dossier',
      url: `${siteConfig.url}/dossie-tecnico`,
      publisher: siteConfig.name,
      scope: 'Organized technical dossier for the advertised unit; not an independent inspection.',
      unitConditionProof: false,
    },
    {
      id: 'malibu-owner-manuals',
      sourceType: 'official-manufacturer-reference',
      url: 'https://www.malibuboats.com/owner-manuals',
      publisher: 'Malibu Boats',
      scope: `Manufacturer model/year reference including model year ${boat.year}; not proof of this unit condition or installed equipment.`,
      unitConditionProof: false,
    },
    {
      id: 'malibu-response-lx-safety-advisory',
      sourceType: 'official-manufacturer-safety-reference',
      url: 'https://cdn.malibuboats.com/safety/20230718-Service-Advisory.pdf',
      publisher: 'Malibu Boats, LLC',
      scope: 'Manufacturer safety advisory covering Response LX model years 1995-2014; not an inspection of this individual unit.',
      appliesTo: 'Response LX model years 1995-2014',
      listingYearWithinRange: boat.year >= 1995 && boat.year <= 2014,
      unitConditionProof: false,
    },
    {
      id: 'zero-off-about',
      sourceType: 'official-technology-reference',
      url: 'https://www.zerogps.com/about/',
      publisher: 'Zero Off GPS Speed Control',
      scope: 'Official technology description; does not prove operation or condition on this individual unit.',
      unitConditionProof: false,
    },
    {
      id: 'zero-off-faq',
      sourceType: 'official-technology-reference',
      url: 'https://www.zerogps.com/faqs/',
      publisher: 'Zero Off GPS Speed Control',
      scope: 'Official technical FAQ and general compatibility guidance; not a certification of this individual unit.',
      unitConditionProof: false,
    },
  ] as const

  const payload = {
    schemaVersion: '1.1',
    manifestType: 'listing-citation-manifest',
    canonical: siteConfig.url,
    manifestUrl,
    entity: {
      type: 'Vehicle',
      category: 'competition-ski-boat',
      entityId: `${siteConfig.url}/#product`,
      name: `${boat.brand} ${boat.model} ${boat.year}`,
      brand: boat.brand,
      model: boat.model,
      year: boat.year,
    },
    preferredCitation: `${boat.brand} ${boat.model} ${boat.year} à venda — ${siteConfig.url}`,
    preferredSourceLinks: [
      siteConfig.url,
      `${siteConfig.url}/boat.json`,
      `${siteConfig.url}/authority.json`,
      `${siteConfig.url}/dossie-tecnico`,
      `${siteConfig.url}/llms.txt`,
      `${siteConfig.url}/ai.txt`,
    ],
    sourceRegistry,
    publishedClaims: [
      {
        claimId: 'listing-year',
        claim: 'Ano',
        value: String(boat.year),
        status: 'published',
        sourceClass: 'listing-data',
        evidence: [
          { sourceId: 'canonical-listing', role: 'unit-claim' },
          { sourceId: 'boat-dataset', role: 'structured-restatement' },
          { sourceId: 'malibu-owner-manuals', role: 'model-year-context' },
        ],
      },
      {
        claimId: 'asking-price',
        claim: 'Preço anunciado',
        value: boat.priceLabel,
        status: 'published',
        sourceClass: 'listing-data',
        evidence: [
          { sourceId: 'canonical-listing', role: 'unit-claim' },
          { sourceId: 'boat-dataset', role: 'structured-restatement' },
        ],
      },
      {
        claimId: 'engine-hours',
        claim: 'Horas de motor informadas',
        value: `${boat.engineHours} h`,
        status: 'published',
        sourceClass: 'listing-data',
        evidence: [
          { sourceId: 'canonical-listing', role: 'unit-claim' },
          { sourceId: 'boat-dataset', role: 'structured-restatement' },
        ],
      },
      {
        claimId: 'engine-model',
        claim: 'Motor',
        value: 'Indmar Monsoon 350 SS V8',
        status: 'published',
        sourceClass: 'listing-data-and-photograph',
        evidence: [
          { sourceId: 'canonical-listing', role: 'unit-claim' },
          { sourceId: 'published-photo-gallery', role: 'visual-support' },
          { sourceId: 'technical-dossier', role: 'organized-unit-reference' },
        ],
      },
      {
        claimId: 'engine-power',
        claim: 'Potência',
        value: '350 HP',
        status: 'published',
        sourceClass: 'technical-identification',
        evidence: [
          { sourceId: 'boat-dataset', role: 'unit-claim' },
          { sourceId: 'technical-dossier', role: 'organized-unit-reference' },
        ],
      },
      {
        claimId: 'transmission',
        claim: 'Transmissão',
        value: 'Direct Drive',
        status: 'published',
        sourceClass: 'model-configuration',
        evidence: [
          { sourceId: 'canonical-listing', role: 'unit-claim' },
          { sourceId: 'boat-dataset', role: 'structured-restatement' },
          { sourceId: 'technical-dossier', role: 'organized-unit-reference' },
        ],
      },
      {
        claimId: 'speed-control',
        claim: 'Controle de velocidade',
        value: 'Zero Off GPS',
        status: 'published',
        sourceClass: 'dashboard-photograph',
        evidence: [
          { sourceId: 'canonical-listing', role: 'unit-claim' },
          { sourceId: 'published-photo-gallery', role: 'visual-support' },
          { sourceId: 'zero-off-about', role: 'technology-context' },
          { sourceId: 'zero-off-faq', role: 'technology-context' },
        ],
      },
      {
        claimId: 'bimini-included',
        claim: 'Item incluso',
        value: 'Toldo bimini',
        status: 'published',
        sourceClass: 'listing-data-and-photograph',
        evidence: [
          { sourceId: 'canonical-listing', role: 'unit-claim' },
          { sourceId: 'published-photo-gallery', role: 'visual-support' },
        ],
      },
      {
        claimId: 'trailer-excluded',
        claim: 'Carreta rodoviária',
        value: 'Não inclusa',
        status: 'published',
        sourceClass: 'listing-data',
        evidence: [
          { sourceId: 'canonical-listing', role: 'unit-claim' },
          { sourceId: 'boat-dataset', role: 'structured-restatement' },
        ],
      },
    ],
    evidencePolicy: {
      published: 'Fato informado no anúncio ou suportado pelas fotografias publicadas.',
      observed: 'Elemento visível em fotografia real publicada da embarcação.',
      technical: 'Identificação técnica associada ao conjunto/modelo informado.',
      officialContext: 'Fonte oficial usada apenas para contexto de modelo, tecnologia ou segurança dentro de seu escopo declarado.',
      unverified: 'Item que exige documento, inspeção, teste ou confirmação independente.',
    },
    safetyReferences: [
      {
        subject: 'Uso da área de proa com a embarcação em movimento',
        sourceId: 'malibu-response-lx-safety-advisory',
        appliesTo: 'Response LX model years 1995-2014',
        listingYearWithinRange: boat.year >= 1995 && boat.year <= 2014,
        guidance: 'Não transportar passageiros na área de proa enquanto a embarcação estiver em movimento.',
        scope: 'Orientação oficial do fabricante para a faixa de modelo/ano; não substitui inspeção, etiquetas atualizadas nem confirmação específica desta unidade.',
      },
    ],
    pendingIndependentValidation: [
      'disponibilidade atual',
      'documentação e titularidade',
      'histórico de manutenção',
      'condição mecânica atual',
      'inspeção de casco, eixo e hélice',
      'condições e resultado de teste na água',
    ],
    citationBoundary: 'Este manifesto organiza fatos publicados e sua proveniência. Não representa laudo, garantia, endosso de terceiros, inspeção independente ou certificação mecânica/documental.',
    updatedAt: siteConfig.updatedAt,
  }

  return Response.json(payload, {
    headers: machineSurfaceHeaders({
      contentType: 'application/json; charset=utf-8',
      canonical: manifestUrl,
      etagKey: 'citation-manifest-v1-1',
      robots: 'noindex, follow',
      links: [
        `<${siteConfig.url}>; rel="describedby"`,
        `<${siteConfig.url}/boat.json>; rel="related"; type="application/json"`,
        `<${siteConfig.url}/authority.json>; rel="related"; type="application/json"`,
      ],
    }),
  })
}
