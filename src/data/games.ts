export type GameStatus = 'Undetected' | 'Updating' | 'Use with caution'

export type Game = {
  slug: string
  name: string
  status: GameStatus
  popular?: boolean
}

/** Site is an Escape From Tarkov hack only — no other titles in the catalog. */
export const GAMES: Game[] = [
  { slug: 'eft', name: 'Escape From Tarkov', status: 'Undetected', popular: true },
]

export function getGame(slug: string) {
  return GAMES.find((g) => g.slug === slug)
}

export function guidePath(slug: string) {
  return `/${slug.toLowerCase()}-hack`
}

export function parseGuideSlug(param: string) {
  const lower = param.toLowerCase()
  if (lower.endsWith('-cheats')) return lower.slice(0, -7)
  if (lower.endsWith('-hack')) return lower.slice(0, -5)
  return lower
}

export const GUIDE_FEATURES = [
  {
    name: 'EFT Aimbot (silent aim)',
    text: 'Silent-aim tracking with FOV, smoothing and bone selection — fire near an enemy and still land the shot, so it reads as tracking even on a demo review.',
  },
  {
    name: 'Player ESP / Wallhack',
    text: 'See players through walls and cover with distance, health and ability information when the build supports it — call pushes before you swing.',
  },
  {
    name: 'Radar',
    text: '2D radar for off-screen PMCs on Customs, Woods, Interchange and other raid maps — spot the flank before it hits your squad.',
  },
  {
    name: 'Triggerbot',
    text: 'Optional fire assist when the crosshair is already on a target. Leave it off if you only want information.',
  },
  {
    name: 'Loot and quest awareness',
    text: 'Loot value tags and quest markers so firefights and extractions are readable without staring at the default HUD.',
  },
  {
    name: 'PMC raids, SCAV runs and offline',
    text: 'Built for Escape From Tarkov on official Escape From Tarkov matchmaking.',
  },
  {
    name: 'Stream-proof overlay',
    text: 'Keep supported overlays off OBS and common capture tools while you still see them locally.',
  },
  {
    name: 'anti-cheat status + support',
    text: 'Live clear-to-load or Updating status is reviewed after anti-cheat and Escape From Tarkov patches before you open the menu.',
  },
] as const

/** @deprecated use PRODUCT_PAGE_FAQS from faqs.ts — kept as alias */
export { PRODUCT_PAGE_FAQS as PRODUCT_FAQS } from './faqs'
