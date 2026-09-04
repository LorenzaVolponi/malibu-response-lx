import assert from 'node:assert/strict'
import { INDEXABLE_GUIDE_SLUGS, SUPPORT_ONLY_GUIDE_SLUGS } from '../lib/search-index-policy.mjs'

const SITE_URL = (process.env.SITE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '')
const CANONICAL_URL = (process.env.CANONICAL_URL || 'https://malibu-response-lx.vercel.app').replace(/\/$/, '')

const expected = {
  year: 2013,
  price: 165000,
  priceLabel: 'R$ 165.000',
  engineHours: 940,
  engine: 'Indmar Monsoon 350 SS',
  transmission: 'Direct Drive',
  speedControl: 'Zero Off GPS',
}

async function get(path, as = 'text') {
  const response = await fetch(`${SITE_URL}${path}`, {
    headers: { 'User-Agent': 'malibu-semantic-consistency-health/1.0' },
    cache: 'no-store',
  })

  assert.equal(response.ok, true, `${path} should return 2xx, got ${response.status}`)
  return as === 'json' ? response.json() : response.text()
}

function assertIncludes(haystack, needle, label) {
  assert.equal(haystack.includes(needle), true, `${label} should include ${needle}`)
}

function asTypes(value) {
  const type = value?.['@type']
  return Array.isArray(type) ? type : type ? [type] : []
}

function extractJsonLdDocuments(source) {
  const documents = [...source.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match, index) => {
      try {
        return JSON.parse(match[1])
      } catch (error) {
        throw new Error(`JSON-LD script ${index + 1} is not valid JSON: ${error.message}`)
      }
    })

  assert.ok(documents.length >= 2, `Expected at least global + page JSON-LD scripts, found ${documents.length}`)
  return documents
}

function collectGraphFacts(documents) {
  const definitionsById = new Map()
  const references = []

  function visit(value) {
    if (Array.isArray(value)) {
      for (const item of value) visit(item)
      return
    }
    if (!value || typeof value !== 'object') return

    const id = value['@id']
    if (typeof id === 'string') {
      const definitionKeys = Object.keys(value).filter((key) => key !== '@id')
      if (definitionKeys.length > 0) {
        const definitions = definitionsById.get(id) || []
        definitions.push(value)
        definitionsById.set(id, definitions)
      } else {
        references.push(id)
      }
    }

    for (const nested of Object.values(value)) visit(nested)
  }

  for (const document of documents) visit(document)
  return { definitionsById, references }
}

function definitionWithType(definitionsById, id, type) {
  const definitions = definitionsById.get(id) || []
  const match = definitions.find((definition) => asTypes(definition).includes(type))
  assert.ok(match, `${id} must resolve to a ${type} definition`)
  return match
}

function assertRef(value, expectedId, label) {
  assert.equal(value?.['@id'], expectedId, `${label} must reference ${expectedId}`)
}

const [html, boatData, citation, authority, llms, aiPolicy, sitemap] = await Promise.all([
  get('/'),
  get('/boat.json', 'json'),
  get('/citation.json', 'json'),
  get('/authority.json', 'json'),
  get('/llms.txt'),
  get('/ai.txt'),
  get('/sitemap.xml'),
])

for (const [label, surface] of [
  ['HTML', html],
  ['llms.txt', llms],
  ['ai.txt', aiPolicy],
  ['sitemap.xml', sitemap],
]) {
  assertIncludes(surface, CANONICAL_URL, label)
}
assert.equal(boatData.canonicalUrl, CANONICAL_URL, 'boat.json canonicalUrl must match canonical')
assert.equal(citation.canonical, CANONICAL_URL, 'citation.json canonical must match canonical')
assert.equal(authority.canonical, CANONICAL_URL, 'authority.json canonical must match canonical')

assert.equal(boatData.listing.year, expected.year)
assert.equal(boatData.listing.price, expected.price)
assert.equal(boatData.listing.priceLabel, expected.priceLabel)
assert.equal(boatData.listing.engineHours, expected.engineHours)
assert.equal(boatData.powertrain.engine, `${expected.engine} V8`)
assert.equal(boatData.powertrain.powerHp, 350)
assert.equal(boatData.powertrain.transmission, expected.transmission)
assert.equal(boatData.powertrain.speedControl, expected.speedControl)

for (const [label, surface] of [
  ['HTML', html],
  ['llms.txt', llms],
  ['ai.txt', aiPolicy],
  ['citation.json', JSON.stringify(citation)],
  ['authority.json', JSON.stringify(authority)],
]) {
  assertIncludes(surface, String(expected.year), label)
  assertIncludes(surface, String(expected.engineHours), label)
  assertIncludes(surface, expected.engine, label)
  assertIncludes(surface, expected.transmission, label)
  assertIncludes(surface, expected.speedControl, label)
}
assertIncludes(html, `"price":${expected.price}`, 'HTML JSON-LD')
assertIncludes(llms, expected.priceLabel, 'llms.txt')
assertIncludes(aiPolicy, expected.priceLabel, 'ai.txt')
assertIncludes(JSON.stringify(citation), expected.priceLabel, 'citation.json')

assert.equal(authority.cannibalizationPolicy.curatedIndexableGuides.length, INDEXABLE_GUIDE_SLUGS.length)
assert.equal(authority.cannibalizationPolicy.supportOnlyNoindex.length, SUPPORT_ONLY_GUIDE_SLUGS.length)
assertIncludes(llms, '## Guias promovidos ao índice', 'llms.txt')
assertIncludes(llms, '## Guias de apoio (noindex, follow)', 'llms.txt')

const relatedSlugs = new Set(boatData.relatedContent.map((item) => item.url.split('/').pop()))

for (const slug of INDEXABLE_GUIDE_SLUGS) {
  const url = `${CANONICAL_URL}/guias/${slug}`
  assertIncludes(sitemap, `<loc>${url}</loc>`, 'sitemap.xml')
  assertIncludes(llms, `- ${url}`, 'llms.txt promoted guide list')
  assert.equal(relatedSlugs.has(slug), true, `boat.json relatedContent must include ${slug}`)
  assertIncludes(JSON.stringify(authority.cannibalizationPolicy.curatedIndexableGuides), url, 'authority.json curated index list')
}

for (const slug of SUPPORT_ONLY_GUIDE_SLUGS) {
  const url = `${CANONICAL_URL}/guias/${slug}`
  assert.equal(sitemap.includes(`<loc>${url}</loc>`), false, `${slug} must stay out of sitemap.xml`)
  assertIncludes(llms, `- ${url}`, 'llms.txt support guide list')
  assert.equal(relatedSlugs.has(slug), true, `boat.json relatedContent must include ${slug}`)
  assertIncludes(JSON.stringify(authority.cannibalizationPolicy.supportOnlyNoindex), url, 'authority.json support-only list')
}

// JSON-LD graph integrity: all home-fragment references must resolve and core commerce relations must be reciprocal.
const jsonLdDocuments = extractJsonLdDocuments(html)
const { definitionsById, references } = collectGraphFacts(jsonLdDocuments)
const homeEntityPrefix = `${CANONICAL_URL}/#`

for (const id of new Set(references.filter((reference) => reference.startsWith(homeEntityPrefix)))) {
  assert.ok(definitionsById.has(id), `Dangling same-page JSON-LD @id reference: ${id}`)
}

for (const [id, definitions] of definitionsById) {
  if (definitions.length < 2) continue
  const names = new Set(definitions.map((definition) => definition.name).filter(Boolean))
  assert.ok(names.size <= 1, `Conflicting JSON-LD names for shared @id ${id}: ${[...names].join(' | ')}`)
}

const ids = {
  website: `${CANONICAL_URL}/#website`,
  webpage: `${CANONICAL_URL}/#webpage`,
  product: `${CANONICAL_URL}/#product`,
  offer: `${CANONICAL_URL}/#offer`,
  seller: `${CANONICAL_URL}/#seller`,
  brand: `${CANONICAL_URL}/#malibu-boats`,
  model: `${CANONICAL_URL}/#response-lx`,
  engine: `${CANONICAL_URL}/#indmar-monsoon-350-ss`,
  zeroOff: `${CANONICAL_URL}/#zero-off-gps`,
  directDrive: `${CANONICAL_URL}/#direct-drive`,
  evidenceProfile: `${CANONICAL_URL}/#evidence-profile`,
}

const website = definitionWithType(definitionsById, ids.website, 'WebSite')
const webpage = definitionWithType(definitionsById, ids.webpage, 'ItemPage')
const product = definitionWithType(definitionsById, ids.product, 'Product')
const offer = definitionWithType(definitionsById, ids.offer, 'Offer')
const seller = definitionWithType(definitionsById, ids.seller, 'Person')
const brand = definitionWithType(definitionsById, ids.brand, 'Brand')
const model = definitionWithType(definitionsById, ids.model, 'ProductModel')
const engine = definitionWithType(definitionsById, ids.engine, 'Product')
definitionWithType(definitionsById, ids.evidenceProfile, 'CreativeWork')

assertRef(website.publisher, ids.seller, 'WebSite.publisher')
assertRef(webpage.mainEntity, ids.product, 'ItemPage.mainEntity')
assertRef(product.mainEntityOfPage, ids.webpage, 'Product.mainEntityOfPage')
assertRef(product.brand, ids.brand, 'Product.brand')
assertRef(product.model, ids.model, 'Product.model')
assertRef(product.offers, ids.offer, 'Product.offers')
assertRef(offer.seller, ids.seller, 'Offer.seller')
assertRef(offer.itemOffered, ids.product, 'Offer.itemOffered')
assertRef(seller.makesOffer, ids.offer, 'Seller.makesOffer')
assertRef(model.brand, ids.brand, 'ProductModel.brand')
assertRef(engine.isPartOf, ids.product, 'Engine.isPartOf')
assert.equal(brand.name, 'Malibu Boats', 'Brand identity must remain Malibu Boats')

const relatedIds = new Set((product.isRelatedTo || []).map((item) => item?.['@id']).filter(Boolean))
for (const relatedId of [ids.engine, ids.zeroOff, ids.directDrive]) {
  assert.equal(relatedIds.has(relatedId), true, `Product.isRelatedTo must include ${relatedId}`)
}

for (const [id, type] of [
  [ids.zeroOff, 'DefinedTerm'],
  [ids.directDrive, 'DefinedTerm'],
]) {
  definitionWithType(definitionsById, id, type)
  const physicalDefinition = (definitionsById.get(id) || []).find((definition) => definition.isPartOf)
  assert.ok(physicalDefinition, `${id} must also have a product relationship definition`)
  assertRef(physicalDefinition.isPartOf, ids.product, `${id}.isPartOf`)
}

console.log(`Semantic consistency verified across canonical HTML + 6 machine surfaces (${INDEXABLE_GUIDE_SLUGS.length} indexable guides, ${SUPPORT_ONLY_GUIDE_SLUGS.length} support-only guides).`)
console.log(`JSON-LD entity graph verified: ${definitionsById.size} defined @id nodes; all same-page references resolve and core commerce relations are reciprocal.`)
