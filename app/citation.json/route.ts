import { boat } from '@/lib/boat-data'
import { machineSurfaceHeaders } from '@/lib/machine-surface'
import { siteConfig } from '@/lib/site-config'

export const dynamic = 'force-static'

export function GET() {
  const manifestUrl = `${siteConfig.url}/citation.json`

  const payload = {
    schemaVersion: '1.0',
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
    publishedClaims: [
      { claim: 'Ano', value: String(boat.year), status: 'published', sourceClass: 'listing-data' },
      { claim: 'Preço anunciado', value: boat.priceLabel, status: 'published', sourceClass: 'listing-data' },
      { claim: 'Horas de motor informadas', value: `${boat.engineHours} h`, status: 'published', sourceClass: 'listing-data' },
      { claim: 'Motor', value: 'Indmar Monsoon 350 SS V8', status: 'published', sourceClass: 'listing-data-and-photograph' },
      { claim: 'Potência', value: '350 HP', status: 'published', sourceClass: 'technical-identification' },
      { claim: 'Transmissão', value: 'Direct Drive', status: 'published', sourceClass: 'model-configuration' },
      { claim: 'Controle de velocidade', value: 'Zero Off GPS', status: 'published', sourceClass: 'dashboard-photograph' },
      { claim: 'Item incluso', value: 'Toldo bimini', status: 'published', sourceClass: 'listing-data-and-photograph' },
      { claim: 'Carreta rodoviária', value: 'Não inclusa', status: 'published', sourceClass: 'listing-data' },
    ],
    evidencePolicy: {
      published: 'Fato informado no anúncio ou suportado pelas fotografias publicadas.',
      observed: 'Elemento visível em fotografia real publicada da embarcação.',
      technical: 'Identificação técnica associada ao conjunto/modelo informado.',
      unverified: 'Item que exige documento, inspeção, teste ou confirmação independente.',
    },
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
      etagKey: 'citation-manifest',
      robots: 'noindex, follow',
      links: [
        `<${siteConfig.url}>; rel="describedby"`,
        `<${siteConfig.url}/boat.json>; rel="related"; type="application/json"`,
        `<${siteConfig.url}/authority.json>; rel="related"; type="application/json"`,
      ],
    }),
  })
}
