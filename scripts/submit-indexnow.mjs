import { latestRuntimeCommit, productionContainsRuntime } from './check-production-runtime-freshness.mjs'

const SITE_URL = (process.env.INDEXNOW_SITE_URL || 'https://malibu-response-lx.vercel.app').replace(/\/$/, '')
const INDEXNOW_KEY = process.env.INDEXNOW_KEY
const EXPECTED_RUNTIME_COMMIT = process.env.EXPECTED_RUNTIME_COMMIT || latestRuntimeCommit().commit

if (!INDEXNOW_KEY) {
  throw new Error('INDEXNOW_KEY is required')
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function waitForProductionRuntime() {
  const buildInfoUrl = `${SITE_URL}/api/build-info`
  const maxAttempts = 30

  console.log(`IndexNow expects runtime release ${EXPECTED_RUNTIME_COMMIT}.`)

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetch(buildInfoUrl, {
        cache: 'no-store',
        headers: { 'User-Agent': 'malibu-indexnow-deploy-check/1.0' },
      })

      if (response.ok) {
        const data = await response.json()
        const productionCommit = typeof data.commit === 'string' ? data.commit : ''

        if (productionContainsRuntime(EXPECTED_RUNTIME_COMMIT, productionCommit)) {
          console.log(`Production commit ${productionCommit} contains runtime release ${EXPECTED_RUNTIME_COMMIT}.`)
          return true
        }

        console.log(`Deploy check ${attempt}/${maxAttempts}: production commit is ${productionCommit || 'unknown'}.`)
      } else {
        console.log(`Deploy check ${attempt}/${maxAttempts}: ${response.status} from ${buildInfoUrl}.`)
      }
    } catch (error) {
      console.log(`Deploy check ${attempt}/${maxAttempts} failed: ${error instanceof Error ? error.message : String(error)}`)
    }

    if (attempt < maxAttempts) await sleep(10000)
  }

  console.log(`IndexNow deferred: production does not contain runtime release ${EXPECTED_RUNTIME_COMMIT} within the deploy check window.`)
  return false
}

async function verifyKey() {
  const keyLocation = `${SITE_URL}/${INDEXNOW_KEY}.txt`
  const response = await fetch(keyLocation, { cache: 'no-store' })

  if (!response.ok) {
    throw new Error(`IndexNow key file returned ${response.status}: ${keyLocation}`)
  }

  const body = (await response.text()).trim()
  if (body !== INDEXNOW_KEY) {
    throw new Error('IndexNow key file content does not match INDEXNOW_KEY')
  }

  return keyLocation
}

async function getIndexableUrls() {
  const sitemapUrl = `${SITE_URL}/sitemap.xml`
  const response = await fetch(sitemapUrl, { cache: 'no-store' })

  if (!response.ok) {
    throw new Error(`Sitemap returned ${response.status}: ${sitemapUrl}`)
  }

  const xml = await response.text()
  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim())
  const siteHost = new URL(SITE_URL).host

  const urls = locations.filter((value) => {
    try {
      const url = new URL(value)
      if (url.host !== siteHost) return false
      return !/\.(?:json|xml|txt)$/i.test(url.pathname)
    } catch {
      return false
    }
  })

  if (urls.length === 0) {
    throw new Error('No indexable HTML URLs were found in sitemap.xml')
  }

  if (urls.length > 10000) {
    throw new Error(`IndexNow supports at most 10,000 URLs per batch; found ${urls.length}`)
  }

  return [...new Set(urls)]
}

async function submitIndexNow() {
  const productionReady = await waitForProductionRuntime()
  if (!productionReady) {
    console.log('No stale URLs were submitted. A later scheduled or manual run can retry after production catches up.')
    return
  }

  const keyLocation = await verifyKey()
  const urlList = await getIndexableUrls()
  const host = new URL(SITE_URL).host

  const response = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'User-Agent': 'malibu-response-lx-indexnow/1.0',
    },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation,
      urlList,
    }),
  })

  const responseBody = await response.text()

  if (!response.ok) {
    throw new Error(`IndexNow returned ${response.status}: ${responseBody || response.statusText}`)
  }

  console.log(`IndexNow accepted ${urlList.length} URL(s) for ${host}.`)
  console.log(urlList.join('\n'))
}

await submitIndexNow()
