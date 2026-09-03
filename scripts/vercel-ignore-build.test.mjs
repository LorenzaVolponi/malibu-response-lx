import assert from 'node:assert/strict'
import { changesRequireBuild } from './vercel-ignore-build.mjs'

const runtimeCases = [
  ['app/page.tsx'],
  ['components/hero.tsx'],
  ['lib/site-config.ts'],
  ['public/images/hero-side.jpeg'],
  ['package.json'],
  ['pnpm-lock.yaml'],
  ['next.config.mjs'],
  ['vercel.json'],
  ['README.md', 'app/api/whatsapp/route.ts'],
]

for (const files of runtimeCases) {
  assert.equal(changesRequireBuild(files), true, `Expected runtime build for: ${files.join(', ')}`)
}

const nonRuntimeCases = [
  ['README.md'],
  ['docs/organic-baseline.md'],
  ['.github/workflows/search-organic-health.yml'],
  ['.github/workflows/ci.yml', 'README.md'],
]

for (const files of nonRuntimeCases) {
  assert.equal(changesRequireBuild(files), false, `Expected Vercel skip for: ${files.join(', ')}`)
}

console.log('Vercel ignored-build classifier tests passed.')
