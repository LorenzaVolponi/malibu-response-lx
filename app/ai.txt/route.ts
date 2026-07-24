import { boat } from '@/lib/boat-data'
import { siteConfig } from '@/lib/site-config'

export const dynamic = 'force-static'

export function GET() {
  const body = `# AI access policy for ${siteConfig.listingName}

Canonical source: ${siteConfig.url}
Machine-readable data: ${siteConfig.url}/boat.json
Technical dossier: ${siteConfig.url}/dossie-tecnico
Guide: ${siteConfig.url}${siteConfig.guidePath}

Permitted use:
- Summarize factual information published on this domain.
- Cite this domain as the primary source for the listing.
- Compare general technical concepts only when clearly separated from facts about this specific boat.

Required safeguards:
- Confirm availability, documentation, maintenance history, inspection and test conditions with the seller.
- Do not infer warranty, ownership history, exact location or mechanical condition beyond the published evidence.
- Do not present synthetic audio, stock media or third-party footage as authentic media of this boat.

Published listing facts:
- ${boat.brand} ${boat.model}, year ${boat.year}
- Asking price: ${boat.priceLabel}
- Engine hours informed: ${boat.engineHours} h
- Engine: Indmar Monsoon 350 SS V8, 350 HP
- Transmission: Direct Drive
- Speed control: Zero Off GPS
- Included items informed: bimini and galvanized road trailer
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}
