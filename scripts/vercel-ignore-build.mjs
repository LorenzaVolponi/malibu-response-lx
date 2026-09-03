import { execFileSync } from 'node:child_process'

const previousSha = process.env.VERCEL_GIT_PREVIOUS_SHA
const currentSha = process.env.VERCEL_GIT_COMMIT_SHA || 'HEAD'

if (!previousSha) {
  console.log('No VERCEL_GIT_PREVIOUS_SHA available; build will proceed safely.')
  process.exit(1)
}

let changedFiles = []
try {
  const output = execFileSync('git', ['diff', '--name-only', previousSha, currentSha], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  changedFiles = output
    .split('\n')
    .map((value) => value.trim())
    .filter(Boolean)
} catch (error) {
  console.log(`Could not inspect Git diff; build will proceed safely: ${error instanceof Error ? error.message : String(error)}`)
  process.exit(1)
}

const runtimePatterns = [
  /^app\//,
  /^components\//,
  /^lib\//,
  /^public\//,
  /^styles\//,
  /^middleware\.(?:ts|js|mjs|cjs)$/,
  /^instrumentation\.(?:ts|js|mjs|cjs)$/,
  /^package\.json$/,
  /^pnpm-lock\.yaml$/,
  /^next\.config\.(?:js|mjs|ts)$/,
  /^postcss\.config\.(?:js|mjs|cjs)$/,
  /^tailwind\.config\.(?:js|mjs|ts|cjs)$/,
  /^tsconfig\.json$/,
  /^vercel\.json$/,
]

const runtimeChanges = changedFiles.filter((file) => runtimePatterns.some((pattern) => pattern.test(file)))

if (runtimeChanges.length > 0) {
  console.log('Runtime/build-impacting changes detected; Vercel build will proceed:')
  console.log(runtimeChanges.join('\n'))
  process.exit(1)
}

console.log('Only non-runtime files changed; Vercel build can be skipped safely:')
console.log(changedFiles.length > 0 ? changedFiles.join('\n') : '(no changed files detected)')
process.exit(0)
