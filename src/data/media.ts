export type SeoMediaItem = {
  image: string
  video?: string
  alt: string
  title: string
  caption: string
  videoTitle?: string
  videoDescription?: string
}

/** One gameplay screenshot per slot. Each keeps its own alt text. */
/** WebP for fast LCP/gallery; PNG kept for OG generation in scripts/generate-seo-assets.mjs */
export const EFT_SHOT_WALLHACK = '/media/eft-wallhack-players.webp'
export const EFT_SHOT_ESP_STREET = '/media/eft-esp-street.webp'
export const EFT_SHOT_RADAR = '/media/eft-radar-esp.webp'
export const EFT_SHOT_ESP_AIMBOT = '/media/eft-esp-aimbot.webp'
export const EFT_PRODUCT_COVER = '/media/eft-product-cover.webp'
export const EFT_SHOT_INDOOR_ESP = '/media/eft-radar-skeleton.webp'

export const EFT_HERO = EFT_SHOT_WALLHACK
export const EFT_SOLDIER = EFT_SHOT_WALLHACK
export const EFT_COVER = EFT_PRODUCT_COVER
export const EFT_BOX = EFT_SHOT_ESP_AIMBOT
export const EFT_ESP = EFT_SHOT_ESP_AIMBOT
export const EFT_MENU = EFT_SHOT_INDOOR_ESP
export const EFT_GAMEPLAY = EFT_SHOT_ESP_STREET
export const EFT_HOME_ART = EFT_SHOT_WALLHACK
export const EFT_CONTROL = EFT_SHOT_ESP_STREET
export const EFT_TACTICAL = EFT_SHOT_RADAR
export const EFT_VIDEO_THUMB = EFT_SHOT_ESP_AIMBOT

export const EFT_HOME_VIDEO = {
  id: 'eft-product-loop',
  src: '/videos/eft-product-loop.mp4',
  poster: '/media/eft-product-poster.jpg',
  title: 'Escape From Tarkov feature preview — ESP and raid gameplay',
  caption:
    'Escape From Tarkov feature preview — in-raid ESP and wallhack gameplay (cropped, no burned-in captions or cheat HUD).',
} as const

const SHOT_WALLHACK: SeoMediaItem = {
  image: EFT_SHOT_WALLHACK,
  alt:
    'Escape From Tarkov wallhack gameplay in a dark building with bright pink enemy ESP silhouettes visible through walls and doors',
  title: 'EFT wallhack ESP through interior walls',
  caption: 'Player ESP showing pink chams on PMCs behind cover inside a raid building.',
}

const SHOT_ESP_STREET: SeoMediaItem = {
  image: EFT_SHOT_ESP_STREET,
  alt:
    'Escape From Tarkov ESP chams at TerraGroup containers — green and magenta player highlights visible through a building corner',
  title: 'EFT ESP chams at TerraGroup yard',
  caption: 'Colored player chams through cover in an outdoor industrial loot area.',
}

const SHOT_RADAR: SeoMediaItem = {
  image: EFT_SHOT_RADAR,
  alt:
    'Escape From Tarkov night raid ESP with glowing green player chams visible through rain and darkness in an industrial zone',
  title: 'EFT ESP on a rainy night raid',
  caption: 'High-visibility chams help track PMCs through low light and weather.',
}

const SHOT_ESP_AIMBOT: SeoMediaItem = {
  image: EFT_SHOT_ESP_AIMBOT,
  alt:
    'Escape From Tarkov warehouse raid with pink and green ESP silhouettes of players visible through blue shipping containers',
  title: 'EFT ESP in an industrial warehouse',
  caption: 'Wallhack silhouettes show enemy positions behind containers and crates.',
}

const SHOT_INDOOR_ESP: SeoMediaItem = {
  image: EFT_SHOT_INDOOR_ESP,
  alt:
    'Escape From Tarkov indoor ESP screenshot with pink player chams through furniture and doorways in a looted room',
  title: 'EFT indoor player ESP',
  caption: 'Pink chams mark players behind doors and debris before you push the room.',
}

const SHOT_PRODUCT: SeoMediaItem = {
  image: EFT_PRODUCT_COVER,
  alt:
    'Escape From Tarkov aimbot and ESP through a sniper scope — pink and green enemy chams with a red FOV ring on Customs',
  title: 'Buy EFT Hack — scope aimbot and ESP preview',
  caption: 'Product screenshot: scoped aim assist with colored ESP on enemy PMCs.',
}

export const PAGE_MEDIA = {
  home: SHOT_WALLHACK,
  product: {
    ...SHOT_PRODUCT,
    video: EFT_HOME_VIDEO.src,
    videoTitle: EFT_HOME_VIDEO.title,
    videoDescription: EFT_HOME_VIDEO.caption,
  },
  forums: SHOT_ESP_STREET,
  reviews: SHOT_ESP_AIMBOT,
  faq: SHOT_INDOOR_ESP,
  support: SHOT_RADAR,
} as const satisfies Record<string, SeoMediaItem>

const FORUM_MEDIA: Record<string, SeoMediaItem> = {
  'features-list': SHOT_WALLHACK,
  hotkeys: SHOT_INDOOR_ESP,
  'complete-setup': SHOT_ESP_STREET,
  'disable-antivirus': SHOT_INDOOR_ESP,
  'undetected-status': SHOT_RADAR,
  'aimbot-settings': SHOT_PRODUCT,
  'esp-wallhack-guide': SHOT_WALLHACK,
  'radar-hack-guide': SHOT_RADAR,
  'stream-proof-setup': SHOT_ESP_AIMBOT,
  'anti-cheat-status': SHOT_RADAR,
  'windows-setup': SHOT_ESP_STREET,
  'match-play-guide': SHOT_ESP_AIMBOT,
  'loader-errors': SHOT_INDOOR_ESP,
}

export function getForumMedia(slug: string): SeoMediaItem {
  return FORUM_MEDIA[slug] || PAGE_MEDIA.forums
}
