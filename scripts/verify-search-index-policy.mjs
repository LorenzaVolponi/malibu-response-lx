import fs from 'node:fs'
import {
  ALL_CLASSIFIED_GUIDE_SLUGS,
  INDEXABLE_GUIDE_SLUGS,
  SUPPORT_ONLY_GUIDE_SLUGS,
} from '../lib/search-index-policy.mjs'

const source = fs.readFileSync(new URL('../lib/seo-pages.ts', import.meta.url), 'utf8')
const sourceSlugs = [...source.matchAll(/\bslug:\s*'([^']+)'/g)].map((match) => match[1])

const unique = (values) => [...new Set(values)]
const duplicates = (values) => values.filter((value, index) => values.indexOf(value) !== index)
const diff = (left, right) => left.filter((value) => !right.includes(value))

const duplicateSource = unique(duplicates(sourceSlugs))
const duplicatePolicy = unique(duplicates(ALL_CLASSIFIED_GUIDE_SLUGS))
const missingFromPolicy = diff(sourceSlugs, ALL_CLASSIFIED_GUIDE_SLUGS)
const stalePolicyEntries = diff(ALL_CLASSIFIED_GUIDE_SLUGS, sourceSlugs)
const overlap = INDEXABLE_GUIDE_SLUGS.filter((slug) => SUPPORT_ONLY_GUIDE_SLUGS.includes(slug))

const failures = []
if (duplicateSource.length) failures.push(`Duplicate guide slugs in seo-pages.ts: ${duplicateSource.join(', ')}`)
if (duplicatePolicy.length) failures.push(`Duplicate guide slugs in index policy: ${duplicatePolicy.join(', ')}`)
if (missingFromPolicy.length) failures.push(`Unclassified guide slugs: ${missingFromPolicy.join(', ')}`)
if (stalePolicyEntries.length) failures.push(`Policy entries with no guide: ${stalePolicyEntries.join(', ')}`)
if (overlap.length) failures.push(`Guide slugs classified both indexable and support-only: ${overlap.join(', ')}`)
if (INDEXABLE_GUIDE_SLUGS.length !== 9) failures.push(`Expected 9 curated indexable guides, found ${INDEXABLE_GUIDE_SLUGS.length}`)

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Search index policy covers ${sourceSlugs.length} guides.`)
console.log(`Indexable guides: ${INDEXABLE_GUIDE_SLUGS.length}`)
console.log(`Support-only noindex guides: ${SUPPORT_ONLY_GUIDE_SLUGS.length}`)
