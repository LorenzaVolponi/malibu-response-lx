import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const SITE_URL = (process.env.SITE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '')
const siteConfigSource = await readFile(new URL('../lib/site-config.ts', import.meta.url), 'utf8')
const updatedAtMatch = siteConfigSource.match(/updatedAt:\s*'(\d{4}-\d{2}-\d{2})'/)

assert.ok(updatedAtMatch, 'lib/site-config.ts must expose updatedAt as YYYY-MM-DD')
const expectedUpdatedAt = updatedAtMatch[1]
const expectedLastModified = new Date(`${expectedUpdatedAt}T12:00:00Z`).toUTCString()

const machineSurfaces = [
  { path: '/boat.json', contentType: 'application/json', etagKey: 'boat-dataset-v2-1' },
  { path: '/citation.json', contentType: 'application/json', etagKey: 'citation-manifest-v1-1' },
  { path: '/authority.json', contentType: 'application/json', etagKey: 'authority-manifest-v1-4' },
  { path: '/llms.txt', contentType: 'text/plain', etagKey: 'llms-index-v2' },
  { path: '/ai.txt', contentType: 'text/plain', etagKey: 'ai-policy' },
]

function includesHeader(headers, name, expected, label) {
  const value = headers.get(name) || ''
  assert.equal(
    value.toLowerCase().includes(expected.toLowerCase()),
    true,
    `${label} ${name} should include ${expected}; received ${value || '<missing>'}`,
  )
}

async function fetchChecked(path) {
  const response = await fetch(`${SITE_URL}${path}`, {
    headers: { 'User-Agent': 'malibu-machine-freshness-health/1.0' },
    cache: 'no-store',
  })
  assert.equal(response.ok, true, `${path} should return 2xx, got ${response.status}`)
  return response
}

for (const surface of machineSurfaces) {
  const response = await fetchChecked(surface.path)
  includesHeader(response.headers, 'content-type', surface.contentType, surface.path)
  includesHeader(response.headers, 'content-language', 'pt-BR', surface.path)
  includesHeader(response.headers, 'x-robots-tag', 'noindex, follow', surface.path)
  includesHeader(response.headers, 'cache-control', 's-maxage=86400', surface.path)
  includesHeader(response.headers, 'cache-control', 'stale-while-revalidate=604800', surface.path)
  assert.equal(response.headers.get('last-modified'), expectedLastModified, `${surface.path} Last-Modified must match siteConfig.updatedAt`)
  includesHeader(response.headers, 'etag', `malibu-${surface.etagKey}-${expectedUpdatedAt}`, surface.path)
}

const [homeResponse, sitemapResponse, citationResponse, authorityResponse] = await Promise.all([
  fetchChecked('/'),
  fetchChecked('/sitemap.xml'),
  fetchChecked('/citation.json'),
  fetchChecked('/authority.json'),
])

const [homeHtml, sitemapXml, citation, authority] = await Promise.all([
  homeResponse.text(),
  sitemapResponse.text(),
  citationResponse.json(),
  authorityResponse.json(),
])

assert.equal(homeHtml.includes(`\"dateModified\":\"${expectedUpdatedAt}\"`), true, 'Canonical JSON-LD dateModified must match siteConfig.updatedAt')
assert.equal(sitemapXml.includes(expectedUpdatedAt), true, 'sitemap.xml must expose the current semantic freshness date')
assert.equal(citation.updatedAt, expectedUpdatedAt, 'citation.json updatedAt must match siteConfig.updatedAt')
assert.equal(authority.updatedAt, expectedUpdatedAt, 'authority.json updatedAt must match siteConfig.updatedAt')

console.log(`Machine freshness verified at ${SITE_URL}: updatedAt=${expectedUpdatedAt}, Last-Modified=${expectedLastModified}, ETags/cache coherent across ${machineSurfaces.length} machine surfaces.`)
