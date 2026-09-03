import { execFileSync } from 'node:child_process'
import { changesRequireBuild } from './vercel-ignore-build.mjs'

const SITE_URL = (process.env.PRODUCTION_SITE_URL || 'https://malibu-response-lx.vercel.app').replace(/\/$/, '')
const expectedOnly = process.argv.includes('--expected-only')

function git(args, options = {}) {
  return execFileSync('git', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options,
  }).trim()
}

function changedFilesForCommit(commit) {
  let parent = ''
  try {
    parent = git(['rev-parse', `${commit}^1`])
  } catch {
    // Root commit: diff against the empty tree.
  }

  const output = parent
    ? git(['diff', '--name-only', parent, commit])
    : git(['diff-tree', '--root', '--no-commit-id', '--name-only', '-r', commit])

  return output
    .split('\n')
    .map((value) => value.trim())
    .filter(Boolean)
}

export function latestRuntimeCommit() {
  const commits = git(['rev-list', '--first-parent', 'HEAD'])
    .split('\n')
    .map((value) => value.trim())
    .filter(Boolean)

  for (const commit of commits) {
    const files = changedFilesForCommit(commit)
    if (changesRequireBuild(files)) return { commit, files }
  }

  throw new Error('Could not find a runtime-impacting commit on the first-parent history.')
}

function productionContainsRuntime(expectedRuntimeCommit, productionCommit) {
  if (!productionCommit) return false
  if (productionCommit === expectedRuntimeCommit) return true

  try {
    execFileSync('git', ['merge-base', '--is-ancestor', expectedRuntimeCommit, productionCommit], {
      stdio: 'ignore',
    })
    return true
  } catch {
    return false
  }
}

async function main() {
  const expected = latestRuntimeCommit()

  if (expectedOnly) {
    console.log(expected.commit)
    return
  }

  const response = await fetch(`${SITE_URL}/api/build-info`, {
    cache: 'no-store',
    headers: { 'User-Agent': 'malibu-production-freshness-health/1.0' },
  })

  if (!response.ok) {
    throw new Error(`Production build info returned HTTP ${response.status}`)
  }

  const data = await response.json()
  const productionCommit = typeof data.commit === 'string' ? data.commit : ''
  const environment = typeof data.environment === 'string' ? data.environment : 'unknown'

  console.log(`Latest runtime commit on main: ${expected.commit}`)
  console.log(`Runtime paths in that release: ${expected.files.join(', ')}`)
  console.log(`Production reports commit: ${productionCommit || 'unknown'}`)
  console.log(`Production environment: ${environment}`)

  if (!productionContainsRuntime(expected.commit, productionCommit)) {
    throw new Error(
      `Production is stale for runtime: expected ${expected.commit} or a descendant containing it, got ${productionCommit || 'unknown'}.`,
    )
  }

  console.log('Production contains the latest runtime-impacting main release.')
}

await main()
