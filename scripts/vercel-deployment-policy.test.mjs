import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'))
const deploymentEnabled = config?.git?.deploymentEnabled

assert.equal(typeof deploymentEnabled, 'object', 'vercel.json must define git.deploymentEnabled rules')
assert.equal(deploymentEnabled['*'], false, 'all non-main branches must have Git deployments disabled')
assert.equal(deploymentEnabled.main, true, 'main must remain deployment-enabled')
assert.equal(config.ignoreCommand, 'node scripts/vercel-ignore-build.mjs', 'runtime change classifier must remain enabled')

console.log('Vercel deployment policy verified: previews disabled, main enabled.')
