/**
 * Worker entry for Astro static output in ./dist.
 * IMPORTANT: Always fetch assets via https://assets.local — never the request
 * hostname — or Cloudflare returns HTTP 522 on custom domains.
 *
 * Canonical host is apex (no www). Always 301 www → apex so crawlers never
 * see duplicate content or mismatched canonical/hreflang on www.
 */
const CANONICAL_ORIGIN = 'https://efthack.net'

/** Legacy split sitemap URLs → single canonical sitemap (one hop for Googlebot). */
const LEGACY_SITEMAP_PATHS = new Set([
  '/sitemap-pages.xml',
  '/sitemap-products.xml',
  '/sitemap-forums.xml',
  '/sitemap-images.xml',
  '/sitemap-blogs.xml',
  '/sitemap-regions.xml',
  '/sitemap_index.xml',
])

/** Sitemap + robots must return 200 on www and apex (GSC property host must match). */
function isSeoCrawlerFile(pathname) {
  return (
    pathname === '/sitemap.xml' ||
    pathname === '/sitemap-index.xml' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.css'
  )
}

function redirectToCanonicalSitemap(url) {
  const pathname = url.pathname
  if (pathname === '/sitemap.xml/' || LEGACY_SITEMAP_PATHS.has(pathname)) {
    const target = new URL('/sitemap.xml', url.origin)
    target.protocol = 'https:'
    return Response.redirect(target.toString(), 301)
  }
  return null
}

function assetsFetch(env, request, pathname) {
  return env.ASSETS.fetch(new Request(new URL(pathname, 'https://assets.local'), request))
}

/**
 * Astro static output uses `/path/index.html` for clean URLs (`trailingSlash: never`).
 * ASSETS.fetch(`/eft-hack`) returns 404 unless we resolve to `/eft-hack/index.html`.
 */
function assetPathCandidates(pathname) {
  const path = pathname || '/'
  if (path === '/') return ['/index.html', '/']

  const hasExtension = /\.[a-z0-9]+$/i.test(path.replace(/\/$/, ''))
  if (hasExtension) return [path]

  const base = path.endsWith('/') ? path.slice(0, -1) : path
  return [`${base}/index.html`, path, `${path}/index.html`]
}

async function fetchAsset(env, request, pathname) {
  const candidates = assetPathCandidates(pathname)
  let last = null
  for (const candidate of candidates) {
    const response = await assetsFetch(env, request, candidate)
    last = response
    if (response.status !== 404) return response
  }
  return last || assetsFetch(env, request, pathname)
}

function withHtmlCharset(response) {
  const contentType = response.headers.get('content-type') || ''
  const primary = contentType.split(',')[0].trim()
  if (!primary.toLowerCase().startsWith('text/html')) return response
  if (/charset=/i.test(primary)) {
    if (contentType.includes(',')) {
      const headers = new Headers(response.headers)
      headers.set('content-type', primary)
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      })
    }
    return response
  }
  const headers = new Headers(response.headers)
  headers.set('content-type', 'text/html; charset=utf-8')
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

/** Prefer apex: https://www.example.com/path → https://example.com/path */
function toApexUrl(url) {
  const host = url.hostname.toLowerCase()
  if (!host.startsWith('www.')) return null
  const next = new URL(url.toString())
  next.hostname = host.slice(4)
  next.protocol = 'https:'
  return next
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.protocol === 'http:') {
      url.protocol = 'https:'
      const legacySitemap =
        url.pathname === '/sitemap.xml/' || LEGACY_SITEMAP_PATHS.has(url.pathname)
      if (!isSeoCrawlerFile(url.pathname) && !legacySitemap) {
        const apex = toApexUrl(url)
        return Response.redirect((apex || url).toString(), 301)
      }
      return Response.redirect(url.toString(), 301)
    }

    const sitemapRedirect = redirectToCanonicalSitemap(url)
    if (sitemapRedirect) return sitemapRedirect

    if (!isSeoCrawlerFile(url.pathname)) {
      const apex = toApexUrl(url)
      if (apex) {
        return Response.redirect(apex.toString(), 301)
      }
    }

    const assetResponse = await fetchAsset(env, request, url.pathname)
    const response = withHtmlCharset(assetResponse)

    // Help crawlers + Seobility: advertise preferred host + self-canonical
    const headers = new Headers(response.headers)
    if (!headers.has('Strict-Transport-Security')) {
      headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    }
    if (url.pathname === '/sitemap.xml' || url.pathname === '/sitemap-index.xml') {
      headers.set('content-type', 'application/xml; charset=utf-8')
    }
    const contentType = headers.get('content-type') || ''
    if (contentType.includes('text/html')) {
      const canonical = `https://${url.hostname}${url.pathname === '/' ? '/' : url.pathname.replace(/\/$/, '') || '/'}`
      const existing = headers.get('Link')
      const linkCanonical = `<${canonical}>; rel="canonical"`
      headers.set('Link', existing ? `${existing}, ${linkCanonical}` : linkCanonical)
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  },
}
