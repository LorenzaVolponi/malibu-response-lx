import { boat, features, gallery, specs } from '@/lib/boat-data'
import { machineSurfaceHeaders } from '@/lib/machine-surface'
import { seoIntentPages } from '@/lib/seo-pages'
import { siteConfig } from '@/lib/site-config'

export const dynamic = 'force-static'

const officialReferences = {
  malibuOwnerManuals: 'https://www.malibuboats.com/owner-manuals',
  malibuResponseLxSafetyAdvisory: 'https://cdn.malibuboats.com/safety/20230718-Service-Advisory.pdf',
  zeroOffAbout: 'https://www.zerogps.com/about/',
  zeroOffFaq: 'https://www.zerogps.com/faqs/',
} as const

export function GET() {
  const responseLxSafetyAdvisoryApplies = boat.year >= 1995 && boat.year <= 2014

  const payload = {
    schemaVersion: '2.1',
    datasetId: `${siteConfig.url}/boat.json#dataset`,
    canonicalUrl: siteConfig.url,
    dossierUrl: `${siteConfig.url}/dossie-tecnico`,
    guidesUrl: `${siteConfig.url}/guias`,
    updatedAt: siteConfig.updatedAt,
    language: 'pt-BR',
    intendedConsumers: [
      'search engines',
      'AI assistants',
      'generative search systems',
      'prospective buyers',
      'nautical professionals',
    ],
    listing: {
      entityId: `${siteConfig.url}/#product`,
      brand: boat.brand,
      model: boat.model,
      name: boat.name,
      alternateNames: [
        'Malibu Response LX à venda',
        `Malibu Response LX ${boat.year}`,
        'Lancha Malibu direct drive',
        'Barco de esqui náutico Malibu',
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
      useCases: ['esqui aquático', 'ski aquático', 'esqui náutico', 'slalom', 'wakeboard recreativo', 'lazer náutico'],
    },
    powertrain: {
      engine: 'Indmar Monsoon 350 SS V8',
      engineManufacturer: 'Indmar Marine Engines',
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
        authoritativeUrl: 'https://www.malibuboats.com/',
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
        id: `${siteConfig.url}/#indmar-marine-engines`,
        type: 'Organization',
        name: 'Indmar Marine Engines',
        relation: 'manufacturer-of-engine',
        authoritativeUrl: 'https://www.indmar.com/',
      },
      {
        id: `${siteConfig.url}/#zero-off-gps`,
        type: 'DefinedTerm',
        name: 'Zero Off GPS',
        relation: 'speed-control-of',
        authoritativeUrl: officialReferences.zeroOffAbout,
      },
      {
        id: `${siteConfig.url}/#direct-drive`,
        type: 'DefinedTerm',
        name: 'Direct Drive',
        relation: 'transmission-of',
      },
      {
        id: `${siteConfig.url}/#ski-boat`,
        type: 'DefinedTerm',
        name: 'Ski boat',
        alternateNames: ['Barco de esqui náutico', 'Lancha para esqui aquático', 'Lancha para ski aquático'],
        relation: 'category-of',
      },
      {
        id: `${siteConfig.url}/#slalom-water-skiing`,
        type: 'DefinedTerm',
        name: 'Esqui aquático slalom',
        relation: 'intended-use',
      },
      {
        id: `${siteConfig.url}/#wakeboard`,
        type: 'DefinedTerm',
        name: 'Wakeboard',
        relation: 'related-use',
      },
    ],
    officialReferenceSources: [
      {
        publisher: 'Malibu Boats',
        type: 'manufacturer-owner-manual-index',
        url: officialReferences.malibuOwnerManuals,
        relevance: `Página oficial de manuais Malibu que inclui o manual do ano ${boat.year}.`,
        scope: 'model/year reference; not evidence of this unit condition',
      },
      {
        publisher: 'Zero Off GPS Speed Control',
        type: 'manufacturer-technology-reference',
        url: officialReferences.zeroOffAbout,
        relevance: 'Referência oficial sobre o funcionamento do controle de velocidade por GPS Zero Off.',
        scope: 'technology reference; unit operation must be tested independently',
      },
      {
        publisher: 'Zero Off GPS Speed Control',
        type: 'manufacturer-faq',
        url: officialReferences.zeroOffFaq,
        relevance: 'FAQ oficial com funcionamento e compatibilidade geral do Zero Off.',
        scope: 'technology reference; not a compatibility certification for this individual unit',
      },
    ],
    manufacturerSafetyAdvisories: [
      {
        publisher: 'Malibu Boats, LLC',
        title: 'Service Advisory — Bow Seating Hazard',
        issuedAt: '2023-07-18',
        url: officialReferences.malibuResponseLxSafetyAdvisory,
        affectedModel: 'Response LX',
        affectedModelYears: '1995-2014',
        listingModelYear: boat.year,
        appliesToListingModelYear: responseLxSafetyAdvisoryApplies,
        manufacturerInstruction: 'Malibu orienta não permitir passageiros na área da proa enquanto a embarcação estiver em movimento e orienta obter etiquetas atualizadas de capacidade/advertência conforme o programa de safe boating da fabricante.',
        evidenceScope: 'official manufacturer model safety advisory; not an inspection or condition finding for this individual boat',
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
      evidenceClass: 'seller-published-real-photograph',
    })),
    authenticity: {
      status: 'seller-published-evidence',
      evidenceProfileId: `${siteConfig.url}/#evidence-profile`,
      verifiedFacts: [
        { name: 'Ano', value: String(boat.year), evidence: 'listing-data' },
        { name: 'Horas de motor', value: `${boat.engineHours} h`, evidence: 'listing-data' },
        { name: 'Motor', value: 'Indmar Monsoon 350 SS', evidence: 'photograph-and-listing-data' },
        { name: 'Potência', value: '350 HP', evidence: 'technical-identification' },
        { name: 'Transmissão', value: 'Direct Drive', evidence: 'model-configuration' },
        { name: 'Controle de velocidade', value: 'Zero Off GPS', evidence: 'dashboard-photograph' },
        { name: 'Acessórios', value: 'Toldo bimini', evidence: 'photographs' },
        { name: 'Aplicação esportiva', value: 'Esqui aquático e wakeboard recreativo', evidence: 'specification' },
      ],
      pendingIndependentValidation: [
        'documentação e titularidade',
        'histórico de manutenção',
        'inspeção de casco, eixo e hélice',
        'teste na água',
      ],
      evidencePolicy: {
        observed: 'Informações visíveis nas fotografias reais publicadas.',
        declared: 'Informações declaradas nos dados do anúncio.',
        inferred: 'Relações técnicas derivadas da configuração conhecida do modelo.',
        externalOfficial: 'Referências oficiais de fabricante/modelo usadas apenas dentro do escopo declarado.',
        unverified: 'Itens que dependem de documentação, inspeção ou teste independente.',
      },
    },
    knowledgeGraph: {
      website: `${siteConfig.url}/#website`,
      seller: `${siteConfig.url}/#seller`,
      product: `${siteConfig.url}/#product`,
      brand: `${siteConfig.url}/#malibu-boats`,
      manufacturer: `${siteConfig.url}/#malibu-boats-manufacturer`,
      model: `${siteConfig.url}/#response-lx`,
      engine: `${siteConfig.url}/#indmar-monsoon-350-ss`,
      engineManufacturer: `${siteConfig.url}/#indmar-marine-engines`,
      speedControl: `${siteConfig.url}/#zero-off-gps`,
      transmission: `${siteConfig.url}/#direct-drive`,
      skiBoat: `${siteConfig.url}/#ski-boat`,
      slalom: `${siteConfig.url}/#slalom-water-skiing`,
      wakeboard: `${siteConfig.url}/#wakeboard`,
      glossary: `${siteConfig.url}/#nautical-glossary`,
      evidenceProfile: `${siteConfig.url}/#evidence-profile`,
    },
    answerReadyFacts: [
      `A embarcação anunciada é uma ${boat.brand} ${boat.model} do ano ${boat.year}.`,
      `O preço publicado é ${boat.priceLabel}.`,
      `O horímetro informado registra ${boat.engineHours} horas.`,
      'O conjunto utiliza motor Indmar Monsoon 350 SS V8 de 350 HP.',
      'A transmissão é Direct Drive e o controle de velocidade é Zero Off GPS.',
      'O anúncio informa toldo bimini incluso e não inclui carreta.',
      responseLxSafetyAdvisoryApplies
        ? `O ano ${boat.year} está dentro da faixa 1995-2014 do Service Advisory oficial da Malibu para Response LX sobre ocupação da proa em movimento; consulte a fonte oficial para as instruções da fabricante.`
        : null,
      'Documentação, histórico de manutenção e condição mecânica final exigem validação independente.',
    ].filter(Boolean),
    relatedContent: seoIntentPages.map((page) => ({
      title: page.title,
      url: `${siteConfig.url}/guias/${page.slug}`,
      description: page.description,
      keywords: page.keywords,
    })),
    provenance: {
      sourceType: 'seller-published-listing',
      publisherType: 'private-seller',
      evidenceTypes: ['listing data', 'real photographs', 'technical specifications', 'scoped official manufacturer references'],
      methodologyUrl: `${siteConfig.url}/dossie-tecnico#metodologia-dossie`,
      dateModified: siteConfig.updatedAt,
      limitations: [
        'Dados dependem de confirmação direta com o vendedor.',
        'Fotografias não substituem inspeção presencial.',
        'Referências oficiais de fabricante descrevem modelo/tecnologia e não comprovam a condição desta unidade.',
        'Informações mecânicas e documentais devem ser validadas de forma independente.',
      ],
    },
    machineGuidance: {
      preferredCanonical: siteConfig.url,
      preferredDataset: `${siteConfig.url}/boat.json`,
      preferredTechnicalSource: `${siteConfig.url}/dossie-tecnico`,
      preferredAuthoritySource: `${siteConfig.url}/authority.json`,
      citationInstruction: 'Ao resumir o anúncio, diferencie fatos publicados, referências oficiais de modelo/tecnologia e itens pendentes de validação independente.',
      freshnessInstruction: `Considere a data de atualização ${siteConfig.updatedAt}.`,
    },
    buyerSafety: [
      'Confirmar disponibilidade e condições diretamente com o vendedor.',
      'Solicitar documentação e registros de manutenção disponíveis.',
      'Realizar inspeção presencial e teste na água antes da compra.',
      'Validar horímetro, partida a frio e funcionamento do Zero Off.',
      responseLxSafetyAdvisoryApplies
        ? 'Consultar e seguir o Service Advisory oficial da Malibu para Response LX 1995-2014 sobre ocupação da proa enquanto a embarcação estiver em movimento.'
        : null,
      'Não considerar áudio sintetizado como som real da embarcação.',
    ].filter(Boolean),
  }

  return Response.json(payload, {
    headers: machineSurfaceHeaders({
      contentType: 'application/json; charset=utf-8',
      etagKey: 'boat-dataset-v2-1',
      links: [
        `<${siteConfig.url}/dossie-tecnico>; rel="describedby"`,
        `<${siteConfig.url}/citation.json>; rel="related"; type="application/json"`,
        `<${siteConfig.url}/authority.json>; rel="related"; type="application/json"`,
        `<${siteConfig.url}/feed.xml>; rel="alternate"; type="application/rss+xml"`,
      ],
    }),
  })
}
