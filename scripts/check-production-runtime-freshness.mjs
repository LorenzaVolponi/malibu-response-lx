import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { changesRequireBuild } from './vercel-ignore-build.mjs'

const SITE_URL = (process.env.PRODUCTION_SITE_URL || 'https://malibu-response-lx.vercel.app').replace(/\/$/, '')
const expectedOnly = process.argv.includes('--expected-only')
const maxAttempts = Math.max(1, Number.parseInt(process.env.FRESHNESS_ATTEMPTS || '1', 10) || 1)
const intervalMs = Math.max(1000, Number.parseInt(process.env.FRESHNESS_INTERVAL_MS || '10000', 10) || 10000)

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

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

function commitExists(commit) {
  if (!commit) return false
  try {
    execFileSync('git', ['cat-file', '-e', `${commit}^{commit}`], { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

function refreshMainHistory() {
  try {
    execFileSync('git', ['fetch', '--quiet', '--no-tags', 'origin', 'main'], { stdio: 'ignore' })
  } catch {
    // Freshness checks remain fail-closed if the remote cannot be refreshed.
  }
}

export function productionContainsRuntime(expectedRuntimeCommit, productionCommit) {
  if (!productionCommit) return false
  if (productionCommit === expectedRuntimeCommit) return true

  if (!commitExists(productionCommit)) refreshMainHistory()
  if (!commitExists(productionCommit)) return false

  try {
    execFileSync('git', ['merge-base', '--is-ancestor', expectedRuntimeCommit, productionCommit], {
      stdio: 'ignore',
    })
    return true
  } catch {
    return false
  }
}

async function readProductionBuildInfo() {
  const response = await fetch(`${SITE_URL}/api/build-info`, {
    cache: 'no-store',
    headers: { 'User-Agent': 'malibu-production-freshness-health/1.0' },
  })

  if (!response.ok) {
    throw new Error(`Production build info returned HTTP ${response.status}`)
  }

  const data = await response.json()
  return {
    commit: typeof data.commit === 'string' ? data.commit : '',
    environment: typeof data.environment === 'string' ? data.environment : 'unknown',
  }
}

async function main() {
  const expected = latestRuntimeCommit()

  if (expectedOnly) {
    console.log(expected.commit)
    return
  }

  console.log(`Latest runtime commit on main: ${expected.commit}`)
  console.log(`Runtime paths in that release: ${expected.files.join(', ')}`)

  let latestProduction = { commit: '', environment: 'unknown' }
  let latestError = ''

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      latestProduction = await readProductionBuildInfo()
      latestError = ''
      console.log(`Freshness check ${attempt}/${maxAttempts}: production=${latestProduction.commit || 'unknown'} env=${latestProduction.environment}`)

      if (productionContainsRuntime(expected.commit, latestProduction.commit)) {
        console.log('Production contains the latest runtime-impacting main release.')
        return
      }
    } catch (error) {
      latestError = error instanceof Error ? error.message : String(error)
      console.log(`Freshness check ${attempt}/${maxAttempts} failed to read production: ${latestError}`)
    }

    if (attempt < maxAttempts) await sleep(intervalMs)
  }

  if (latestError) {
    throw new Error(`Could not validate production freshness: ${latestError}`)
  }

  throw new Error(
    `Production is stale for runtime: expected ${expected.commit} or a descendant containing it, got ${latestProduction.commit || 'unknown'}.`,
  )
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : ''
if (invokedPath && fileURLToPath(import.meta.url) === invokedPath) {
  await main()
}
