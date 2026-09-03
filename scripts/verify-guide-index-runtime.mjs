import {
  INDEXABLE_GUIDE_SLUGS,
  SUPPORT_ONLY_GUIDE_SLUGS,
} from '../lib/search-index-policy.mjs'

const baseUrl = (process.env.SITE_URL || process.argv[2] || 'http://127.0.0.1:3000').replace(/\/$/, '')

async function fetchOk(path, init) {
  const response = await fetch(`${baseUrl}${path}`, init)
  if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`)
  return response
}

const sitemap = await (await fetchOk('/sitemap.xml')).text()

for (const slug of INDEXABLE_GUIDE_SLUGS) {
  const path = `/guias/${slug}`
  const response = await fetchOk(path, { method: 'HEAD', redirect: 'follow' })
  const robots = response.headers.get('x-robots-tag') || ''
  if (/noindex/i.test(robots)) throw new Error(`Indexable guide unexpectedly noindex: ${path} (${robots})`)
  if (!sitemap.includes(`<loc>${baseUrl}${path}</loc>`)) throw new Error(`Indexable guide missing from sitemap: ${path}`)
}

for (const slug of SUPPORT_ONLY_GUIDE_SLUGS) {
  const path = `/guias/${slug}`
  const response = await fetchOk(path, { method: 'HEAD', redirect: 'follow' })
  const robots = response.headers.get('x-robots-tag') || ''
  if (!/noindex/i.test(robots) || !/follow/i.test(robots)) {
    throw new Error(`Support-only guide must expose noindex, follow: ${path} (${robots || 'missing'})`)
  }
  if (sitemap.includes(`/guias/${slug}`)) throw new Error(`Support-only guide leaked into sitemap: ${path}`)
}

const authority = await (await fetchOk('/authority.json')).json()
const indexed = authority?.cannibalizationPolicy?.curatedIndexableGuides || []
const support = authority?.cannibalizationPolicy?.supportOnlyNoindex || []

for (const slug of INDEXABLE_GUIDE_SLUGS) {
  const url = `${baseUrl}/guias/${slug}`
  if (!indexed.includes(url)) throw new Error(`authority.json missing curated indexable guide: ${url}`)
}

for (const slug of SUPPORT_ONLY_GUIDE_SLUGS) {
  const url = `${baseUrl}/guias/${slug}`
  if (!support.includes(url)) throw new Error(`authority.json missing support-only guide: ${url}`)
}

console.log(`Runtime search policy verified at ${baseUrl}.`)
console.log(`Indexable: ${INDEXABLE_GUIDE_SLUGS.length}; support-only noindex: ${SUPPORT_ONLY_GUIDE_SLUGS.length}.`)
