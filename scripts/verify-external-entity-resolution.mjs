import assert from 'node:assert/strict'

const SITE_URL = (process.env.SITE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '')
const CANONICAL_URL = (process.env.CANONICAL_URL || 'https://malibu-response-lx.vercel.app').replace(/\/$/, '')

async function fetchText(path) {
  const response = await fetch(`${SITE_URL}${path}`, {
    headers: { 'User-Agent': 'malibu-external-entity-resolution-health/1.0' },
    cache: 'no-store',
  })
  assert.equal(response.ok, true, `${path} should return 2xx, got ${response.status}`)
  return response.text()
}

async function fetchJson(path) {
  const response = await fetch(`${SITE_URL}${path}`, {
    headers: { 'User-Agent': 'malibu-external-entity-resolution-health/1.0' },
    cache: 'no-store',
  })
  assert.equal(response.ok, true, `${path} should return 2xx, got ${response.status}`)
  return response.json()
}

function jsonLdDocuments(html) {
  return [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match, index) => {
    try {
      return JSON.parse(match[1])
    } catch (error) {
      throw new Error(`JSON-LD script ${index + 1} is invalid: ${error.message}`)
    }
  })
}

function collectById(documents) {
  const byId = new Map()
  function visit(value) {
    if (Array.isArray(value)) {
      value.forEach(visit)
      return
    }
    if (!value || typeof value !== 'object') return

    if (typeof value['@id'] === 'string' && Object.keys(value).some((key) => key !== '@id')) {
      const entries = byId.get(value['@id']) || []
      entries.push(value)
      byId.set(value['@id'], entries)
    }

    Object.values(value).forEach(visit)
  }

  documents.forEach(visit)
  return byId
}

function findDefinition(byId, id, type) {
  const matches = byId.get(id) || []
  const definition = matches.find((entry) => {
    const entryType = entry['@type']
    return Array.isArray(entryType) ? entryType.includes(type) : entryType === type
  })
  assert.ok(definition, `${id} must resolve to ${type}`)
  return definition
}

const [html, authority, citation] = await Promise.all([
  fetchText('/'),
  fetchJson('/authority.json'),
  fetchJson('/citation.json'),
])

assert.equal(authority.schemaVersion, '1.4', 'authority schema must remain at 1.4')
assert.ok(authority.externalIdentityReferences, 'authority.json must publish externalIdentityReferences')

const expectedIdentities = {
  malibuBoats: {
    id: `${CANONICAL_URL}/#malibu-boats`,
    officialUrl: 'https://www.malibuboats.com/',
    role: 'boat-brand-identity',
  },
  indmarMarineEngines: {
    id: `${CANONICAL_URL}/#indmar-marine-engines`,
    officialUrl: 'https://indmar.com/',
    role: 'engine-manufacturer-identity',
  },
  zeroOff: {
    id: `${CANONICAL_URL}/#zero-off-gps`,
    officialUrl: 'https://www.zerogps.com/',
    role: 'speed-control-technology-identity',
  },
}

for (const [key, expected] of Object.entries(expectedIdentities)) {
  const identity = authority.externalIdentityReferences[key]
  assert.ok(identity, `authority.json must publish ${key}`)
  assert.equal(identity.localEntityId, expected.id, `${key} localEntityId must stay canonical`)
  assert.equal(identity.officialUrl, expected.officialUrl, `${key} officialUrl must stay canonical`)
  assert.equal(identity.role, expected.role, `${key} role must stay scoped`)
  assert.equal(identity.unitConditionProof, false, `${key} must never be treated as proof of individual-unit condition`)
}

const indmarOfficial = authority.officialReferenceSources.find((source) => source.url === 'https://indmar.com/')
assert.ok(indmarOfficial, 'authority.json must retain the official Indmar identity reference')
assert.equal(indmarOfficial.publisher, 'Indmar Marine Engines')
assert.match(indmarOfficial.scope, /not archival proof|not .*proof/i, 'Indmar source must remain context-only, not unit proof')

const indmarCitation = citation.sourceRegistry.find((source) => source.id === 'indmar-marine-engines')
assert.ok(indmarCitation, 'citation.json must retain Indmar as manufacturer identity context')
assert.equal(indmarCitation.sourceType, 'official-manufacturer-identity-reference')
assert.equal(indmarCitation.url, 'https://indmar.com/')
assert.equal(indmarCitation.publisher, 'Indmar Marine Engines')
assert.equal(indmarCitation.unitConditionProof, false, 'Indmar citation source must never become proof of individual-unit condition')
assert.match(indmarCitation.scope, /not archival proof/i, 'Indmar citation source must explicitly reject archival-spec proof')
assert.match(indmarCitation.scope, /350 HP/i, 'Indmar citation scope must explicitly reject use as proof of the 350 HP rating')

const engineModelClaim = citation.publishedClaims.find((claim) => claim.claimId === 'engine-model')
assert.ok(engineModelClaim, 'citation.json must retain the engine-model claim')
assert.ok(
  engineModelClaim.evidence.some((evidence) => evidence.sourceId === 'indmar-marine-engines' && evidence.role === 'manufacturer-identity-context'),
  'engine-model claim must link Indmar only as manufacturer-identity-context',
)
assert.ok(
  engineModelClaim.evidence.some((evidence) => evidence.role === 'unit-claim' && evidence.sourceId !== 'indmar-marine-engines'),
  'engine-model claim must retain separate first-party unit evidence',
)

const enginePowerClaim = citation.publishedClaims.find((claim) => claim.claimId === 'engine-power')
assert.ok(enginePowerClaim, 'citation.json must retain the engine-power claim')
assert.equal(
  enginePowerClaim.evidence.some((evidence) => evidence.sourceId === 'indmar-marine-engines'),
  false,
  'Current Indmar identity page must not be cited as proof or context for the published 350 HP rating',
)

const documents = jsonLdDocuments(html)
assert.ok(documents.length >= 2, 'Expected global and page JSON-LD documents')
const byId = collectById(documents)

const ids = {
  brand: `${CANONICAL_URL}/#malibu-boats`,
  engine: `${CANONICAL_URL}/#indmar-monsoon-350-ss`,
  indmar: `${CANONICAL_URL}/#indmar-marine-engines`,
  zeroOff: `${CANONICAL_URL}/#zero-off-gps`,
}

const brand = findDefinition(byId, ids.brand, 'Brand')
assert.equal(brand.url, 'https://www.malibuboats.com/', 'Malibu brand must resolve to its official site')

const indmar = findDefinition(byId, ids.indmar, 'Organization')
assert.equal(indmar.name, 'Indmar Marine Engines')
assert.equal(indmar.url, 'https://indmar.com/', 'Indmar organization must resolve to its official site')

const engine = findDefinition(byId, ids.engine, 'Product')
assert.equal(engine.manufacturer?.['@id'], ids.indmar, 'Engine manufacturer must resolve through the Indmar organization node')

const zeroOffDefinitions = byId.get(ids.zeroOff) || []
const zeroOff = zeroOffDefinitions.find((entry) => entry.url === 'https://www.zerogps.com/')
assert.ok(zeroOff, 'Zero Off entity must resolve to its official site')
assert.ok(Array.isArray(zeroOff.sameAs) && zeroOff.sameAs.includes('https://www.zerogps.com/about/'), 'Zero Off entity must retain its official About identity reference')

console.log('External entity resolution verified: Malibu Boats, Indmar Marine Engines and Zero Off resolve to scoped official identities; citation provenance keeps Indmar as manufacturer context only, never unit/spec proof.')
