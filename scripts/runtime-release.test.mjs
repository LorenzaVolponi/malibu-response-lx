import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { latestRuntimeCommit, productionContainsRuntime } from './check-production-runtime-freshness.mjs'

const git = (args) => execFileSync('git', args, { encoding: 'utf8' }).trim()
const runtime = latestRuntimeCommit().commit
const head = git(['rev-parse', 'HEAD'])
const headParent = git(['rev-parse', `${head}^1`])

assert.match(runtime, /^[a-f0-9]{40}$/)
assert.match(head, /^[a-f0-9]{40}$/)

assert.equal(
  productionContainsRuntime(headParent, head),
  true,
  'A newer commit must contain its first-parent ancestor.',
)
assert.equal(
  productionContainsRuntime(head, headParent),
  false,
  'An older commit must not satisfy a newer expected release.',
)
assert.equal(
  productionContainsRuntime(runtime, head),
  true,
  'The resolved runtime release must be HEAD itself or an ancestor contained by HEAD.',
)

console.log(`Runtime release ancestry tests passed. expected_runtime=${runtime} head=${head}`)
