import {
  EFT_PRODUCT_COVER,
  EFT_MENU,
  EFT_SHOT_WALLHACK,
  EFT_SHOT_ESP_STREET,
  EFT_SHOT_ESP_AIMBOT,
  EFT_SHOT_RADAR,
} from './media'
import { EFT_OG, getOgImageForPath, PAGE_OG } from './og'

export { EFT_OG, getOgImageForPath, PAGE_OG }
export { forumOgImage } from './og'

export const EFT_PRODUCT_HERO = EFT_PRODUCT_COVER

export type ImageSeoFields = {
  alt: string
  title: string
  caption: string
}

export const IMAGE_SEO: Record<
  string,
  ImageSeoFields & {
    heroAlt: string
    heroTitle: string
    heroCaption: string
  }
> = {
  eft: {
    alt:
      'Escape From Tarkov cheat gameplay with pink ESP chams showing enemy players through interior walls',
    title: 'EFT hack ESP product screenshot',
    caption: 'Product artwork showing wallhack ESP through walls on a Tarkov raid map.',
    heroAlt:
      'Escape From Tarkov buy card — scoped aimbot with pink and green enemy ESP chams and red FOV ring on Customs',
    heroTitle: 'Buy EFT Hack — scope aimbot and ESP screenshot',
    heroCaption: 'Checkout card art with aim assist and colored player chams through cover.',
  },
}

type PageImage = ImageSeoFields & { src: string; og: string }

/** On-page media + dedicated OG JPEG for Google SERP thumbnails. */
export const PAGE_IMAGES: Record<
  'home' | 'forums' | 'reviews' | 'faq' | 'support' | 'product',
  PageImage
> = {
  home: {
    src: EFT_SHOT_WALLHACK,
    og: PAGE_OG.home,
    alt:
      'Escape From Tarkov wallhack gameplay in a dark building with pink enemy ESP silhouettes through walls',
    title: 'EFT wallhack through walls',
    caption: 'Wallhack ESP showing enemy PMC outlines through solid cover.',
  },
  forums: {
    src: EFT_SHOT_ESP_STREET,
    og: PAGE_OG.forums,
    alt:
      'Escape From Tarkov ESP chams at TerraGroup containers with green and magenta players through a corner',
    title: 'EFT ESP chams outdoors',
    caption: 'Player chams through cover in an industrial yard.',
  },
  reviews: {
    src: EFT_SHOT_ESP_AIMBOT,
    og: PAGE_OG.reviews,
    alt:
      'Escape From Tarkov warehouse ESP with pink and green player silhouettes through shipping containers',
    title: 'EFT ESP in a warehouse raid',
    caption: 'Colored silhouettes behind containers during a PMC raid.',
  },
  faq: {
    src: EFT_MENU,
    og: PAGE_OG.faq,
    alt:
      'Escape From Tarkov indoor ESP with pink player chams visible through doorways and furniture',
    title: 'EFT indoor ESP',
    caption: 'Player ESP with chams through interior cover.',
  },
  support: {
    src: EFT_SHOT_RADAR,
    og: PAGE_OG.support,
    alt:
      'Escape From Tarkov night raid ESP with glowing green player chams in rain at an industrial site',
    title: 'EFT ESP on a night raid',
    caption: 'Night-vision style chams for tracking PMCs in low light.',
  },
  product: {
    src: EFT_PRODUCT_COVER,
    og: PAGE_OG.product,
    alt:
      'Escape From Tarkov aimbot and ESP through a sniper scope with pink and green enemy chams and red FOV ring',
    title: 'EFT Hack buy card — scope aimbot gameplay',
    caption: 'Product image with scoped aim assist and ESP on enemy PMCs.',
  },
}

export function getGameImage(_slug: string): string {
  return EFT_PRODUCT_COVER
}

export function getProductHeroImage(_slug: string): string {
  return EFT_PRODUCT_COVER
}

export function getOgImage(path?: string): string {
  return getOgImageForPath(path)
}

export function getPageImage(key: keyof typeof PAGE_IMAGES) {
  return PAGE_IMAGES[key]
}

export function getImageAlt(
  slug: string,
  name: string,
  variant: 'catalog' | 'product' = 'catalog',
): string {
  const seo = IMAGE_SEO[slug]
  if (seo) return variant === 'product' ? seo.heroAlt : seo.alt
  return variant === 'product' ? `${name} product details` : `${name} product artwork`
}

export function getImageTitle(
  slug: string,
  name: string,
  variant: 'catalog' | 'product' = 'catalog',
): string {
  const seo = IMAGE_SEO[slug]
  if (seo) return variant === 'product' ? seo.heroTitle : seo.title
  return `${name} product`
}
