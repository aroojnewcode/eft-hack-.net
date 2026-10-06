import { EFT_OG } from './images'
import { PAGE_OG } from './og'

export const SITE_URL = 'https://efthack.net'
export const SITE_NAME = 'EFT Hack'
export const SITE_HOST = 'efthack.net'
export const PRODUCT_PATH = '/eft-hack'

/**
 * Sole purpose — used in schema + about copy.
 * Single-product site: Escape From Tarkov hack for PC (worldwide).
 * Canonical host is apex https://efthack.net (www 301s to apex in the Worker).
 */
export const SITE_PURPOSE =
  'Buy an Escape From Tarkov hack for Windows PC — silent-aim Aimbot, player ESP, wallhack, radar and live anti-cheat status with instant digital delivery.'

export const SITE_ABOUT = [
  'eft hack',
  'eft hacks',
  'escape from tarkov hack',
  'eft cheats',
  'eft aimbot',
  'eft esp',
  'eft wallhack',
  'eft radar',
  'escape from tarkov aimbot',
  'efthack.net',
] as const

/** Meta keywords for search engines (eft hack, eft cheat, Escape From Tarkov hacks). */
export const SITE_META_KEYWORDS = [
  ...new Set([
    ...SITE_ABOUT,
    'escape from tarkov hacks',
    'escape from tarkov cheat',
    'escape from tarkov cheats',
    'eft cheat menu',
    'anti-cheat status eft',
    'battleye status eft',
    'tarkov hack',
    'tarkov cheats',
    'escape from tarkov aimbot',
  ]),
].join(', ')

/** Offer price shown on product schema + purchase UI. */
export const PRODUCT_PRICE_USD = '35'

export const SEO_REGIONS = [
  { hreflang: 'en', label: 'English' },
  { hreflang: 'x-default', label: 'Default' },
] as const

export const OG_IMAGE = EFT_OG

export type PageSeo = {
  title: string
  description: string
  path: string
  ogType?: 'website' | 'article' | 'product'
  /** Prefer /og/*.jpg (1200x630) for Google SERP thumbnails */
  image?: string
  imageAlt?: string
  robots?: string
}

const INDEX_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

export const SEO = {
  home: {
    title: 'EFT Hack | Escape From Tarkov Aimbot, ESP & Wallhack',
    description:
      'Escape From Tarkov cheats for Windows 10/11 — EFT hack with Aimbot, ESP, wallhack and radar from $35. Check live anti-cheat status, then checkout.',
    path: '/',
    ogType: 'website',
    image: PAGE_OG.home,
    imageAlt: 'EFT Hack — Escape From Tarkov Aimbot, ESP and radar for PC',
    robots: INDEX_ROBOTS,
  },
  forums: {
    title: 'EFT Hack Guides | Aimbot, ESP, Radar & Anti-cheat Status',
    description:
      'EFT hack guides — silent aim, player ESP, radar, antivirus exclusions, menu setup and anti-cheat status articles before you buy.',
    path: '/forums',
    ogType: 'website',
    image: PAGE_OG.forums,
    imageAlt: 'EFT Hack setup guides for Aimbot, ESP and anti-cheat status',
    robots: INDEX_ROBOTS,
  },
  reviews: {
    title: 'EFT Hack Reviews | Buyer Feedback on Escape From Tarkov',
    description:
      'Read EFT hack reviews covering silent aim, player ESP and anti-cheat rebuilds before you buy an Escape From Tarkov license for PC.',
    path: '/reviews',
    ogType: 'website',
    image: PAGE_OG.reviews,
    imageAlt: 'EFT Hack buyer reviews for Escape From Tarkov',
    robots: INDEX_ROBOTS,
  },
  faq: {
    title: 'EFT Hack FAQ | Price, Anti-cheat Status & Setup',
    description:
      'FAQ for buying an EFT hack on Windows PC — price, Aimbot and ESP features, anti-cheat status, PMC raids and SCAV runs, setup and delivery.',
    path: '/faq',
    ogType: 'website',
    image: PAGE_OG.faq,
    imageAlt: 'EFT Hack FAQ — price, anti-cheat status and setup',
    robots: INDEX_ROBOTS,
  },
  support: {
    title: 'EFT Hack Support | Menu, Delivery & Setup Help',
    description:
      'Get help buying and opening the EFT hack — delivery email, Windows setup, antivirus exclusions, menu errors and anti-cheat status updates.',
    path: '/support',
    ogType: 'website',
    image: PAGE_OG.support,
    imageAlt: 'EFT Hack support for menu and delivery help',
    robots: INDEX_ROBOTS,
  },
  product: {
    title: 'EFT Hack Price & Checkout | Aimbot, ESP, Radar',
    description:
      'EFT hack price and checkout on efthack.net — silent aim Aimbot, player ESP, wallhack, radar and live BattlEye anti-cheat status from $35.',
    path: PRODUCT_PATH,
    ogType: 'product',
    image: PAGE_OG.product,
    imageAlt: 'Escape From Tarkov Aimbot, ESP and radar product details',
    robots: INDEX_ROBOTS,
  },
} as const satisfies Record<string, PageSeo>

export const HOME_HEADINGS = {
  h1: 'EFT Hack — Escape From Tarkov Aimbot, ESP & Wallhack',
  h2Features: 'EFT Aimbot, ESP, wallhack & radar',
  h2Featured: 'EFT ESP and silent aim Aimbot',
  h2About: 'Check anti-cheat status before you buy an EFT hack',
  h2Access: 'Buy EFT Hack',
  h2Faq: 'EFT Hack FAQ',
} as const

export function absoluteUrl(path: string) {
  if (!path || path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
