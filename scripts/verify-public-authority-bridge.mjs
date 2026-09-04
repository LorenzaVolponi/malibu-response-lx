import assert from 'node:assert/strict'

const SITE_URL = (process.env.SITE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '')

async function get(path, as = 'text') {
  const response = await fetch(`${SITE_URL}${path}`, {
    headers: { 'User-Agent': 'malibu-public-authority-bridge-health/1.0' },
    cache: 'no-store',
  })
  assert.equal(response.ok, true, `${path} should return 2xx, got ${response.status}`)
  return as === 'json' ? response.json() : response.text()
}

function extractJsonLd(source) {
  return [...source.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match, index) => {
      try {
        return JSON.parse(match[1])
      } catch (error) {
        throw new Error(`Invalid JSON-LD block ${index + 1}: ${error.message}`)
      }
    })
}

function flattenGraph(documents) {
  return documents.flatMap((document) => Array.isArray(document?.['@graph']) ? document['@graph'] : [document])
}

const [dossierHtml, authority] = await Promise.all([
  get('/dossie-tecnico'),
  get('/authority.json', 'json'),
])

const officialSources = authority.officialReferenceSources || []
assert.ok(officialSources.length >= 4, 'authority.json must expose at least four official reference sources')

const dossierJsonLd = flattenGraph(extractJsonLd(dossierHtml))
const techArticle = dossierJsonLd.find((node) => {
  const type = node?.['@type']
  return type === 'TechArticle' || (Array.isArray(type) && type.includes('TechArticle'))
})
assert.ok(techArticle, 'dossie-tecnico must expose a TechArticle JSON-LD node')

const citations = new Set(Array.isArray(techArticle.citation) ? techArticle.citation : techArticle.citation ? [techArticle.citation] : [])

for (const source of officialSources) {
  assert.ok(source.url, 'Every official source must expose a URL')
  assert.equal(dossierHtml.includes(`href=\"${source.url}\"`) || dossierHtml.includes(`href="${source.url}"`) || dossierHtml.includes(source.url), true, `Dossier must visibly link official source ${source.url}`)
  assert.equal(citations.has(source.url), true, `TechArticle.citation must include official source ${source.url}`)
}

assert.match(dossierHtml, /não (comprova|substitui|é histórico|é.*prova)|devem ser testados independentemente/i, 'Dossier must retain a visible scope disclaimer for official references')
assert.ok(dossierHtml.includes('Fontes oficiais para conferência'), 'Dossier must retain the public authority section heading')

console.log(`Public authority bridge verified: ${officialSources.length} authority.json sources are visible and cited by the technical dossier.`)
