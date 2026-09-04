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
assertIncludes(html, `\"price\":${expected.price}`, 'HTML JSON-LD')
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

console.log(`Semantic consistency verified across canonical HTML + 6 machine surfaces (${INDEXABLE_GUIDE_SLUGS.length} indexable guides, ${SUPPORT_ONLY_GUIDE_SLUGS.length} support-only guides).`)
