import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const authoritySource = await readFile(new URL('../app/authority.json/route.ts', import.meta.url), 'utf8')
const healthWorkflow = await readFile(new URL('../.github/workflows/official-source-health.yml', import.meta.url), 'utf8')

function extractBlock(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker)
  assert.notEqual(start, -1, `Missing source block: ${startMarker}`)

  const end = source.indexOf(endMarker, start)
  assert.notEqual(end, -1, `Missing end marker ${endMarker} after ${startMarker}`)

  return source.slice(start, end)
}

function extractUrls(source) {
  return [...source.matchAll(/https:\/\/[^'"`\s,]+/g)].map((match) => match[0])
}

const identityBlock = extractBlock(authoritySource, 'externalIdentityReferences:', 'queryPortfolio,')
const officialReferenceBlock = extractBlock(authoritySource, 'officialReferenceSources:', 'evidenceSurfaces:')

const publishedOfficialUrls = [...new Set([
  ...extractUrls(identityBlock),
  ...extractUrls(officialReferenceBlock),
])]

assert.ok(publishedOfficialUrls.length > 0, 'authority.json must publish official identity/reference URLs')

for (const url of publishedOfficialUrls) {
  assert.equal(
    healthWorkflow.includes(url),
    true,
    `Official Source Health must monitor published authority URL: ${url}`,
  )
}

const requiredIdentityRoots = [
  'https://www.malibuboats.com/',
  'https://indmar.com/',
  'https://www.zerogps.com/',
]

for (const url of requiredIdentityRoots) {
  assert.equal(publishedOfficialUrls.includes(url), true, `authority.json must retain identity root ${url}`)
  assert.equal(healthWorkflow.includes(url), true, `Official Source Health must retain identity root ${url}`)
}

assert.match(healthWorkflow, /Indmar Marine Engines/, 'Indmar health check must validate an explicit manufacturer identity marker')
assert.match(healthWorkflow, /2013 Malibu Owners Manual/, 'Malibu manual health check must retain the 2013 marker')
assert.match(healthWorkflow, /application\/pdf/, 'Malibu advisory health check must validate PDF content type')
assert.match(healthWorkflow, /GPS speed control\|speed control/, 'Zero Off health check must retain a technology marker')

console.log(`Official source monitoring coverage verified: ${publishedOfficialUrls.length} published authority URLs are represented in Official Source Health.`)
