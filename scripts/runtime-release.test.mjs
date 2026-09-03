import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { latestRuntimeCommit, productionContainsRuntime } from './check-production-runtime-freshness.mjs'

const git = (args) => execFileSync('git', args, { encoding: 'utf8' }).trim()
const runtime = latestRuntimeCommit().commit
const runtimeParent = git(['rev-parse', `${runtime}^1`])
const head = git(['rev-parse', 'HEAD'])

assert.match(runtime, /^[a-f0-9]{40}$/)
assert.equal(
  productionContainsRuntime(runtimeParent, runtime),
  true,
  'A newer commit must contain its first-parent ancestor.',
)
assert.equal(
  productionContainsRuntime(runtime, runtimeParent),
  false,
  'An older commit must not satisfy a newer expected runtime release.',
)
assert.notEqual(
  runtime,
  head,
  'This operational-only branch should resolve an earlier runtime release instead of treating HEAD as runtime.',
)

console.log(`Runtime release ancestry tests passed. expected_runtime=${runtime} head=${head}`)
