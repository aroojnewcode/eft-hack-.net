import type { LucideIcon } from 'lucide-react'
import { Box, Crosshair, Eye } from 'lucide-react'
import {
  EFT_HOME_VIDEO,
  EFT_PRODUCT_COVER,
  EFT_SHOT_ESP_STREET,
  EFT_SHOT_WALLHACK,
} from './media'

export type FeaturePreviewScene = {
  id: string
  tab: string
  icon: LucideIcon
  title: string
  subtitle: string
  bullets: string[]
  image: string
  imageAlt: string
}

export const FEATURE_PREVIEW_SCENES: FeaturePreviewScene[] = [
  {
    id: 'match',
    tab: 'Match',
    icon: Eye,
    title: 'Wallhack and FOV in a raid',
    subtitle: 'Wallhack · Player ESP',
    bullets: ['Wallhack', 'Player ESP', 'Skeleton ESP'],
    image: EFT_SHOT_WALLHACK,
    imageAlt:
      'Escape From Tarkov wallhack with pink enemy silhouettes visible through interior walls and doors',
  },
  {
    id: 'combat',
    tab: 'Combat',
    icon: Crosshair,
    title: 'Silent aim and scoped ESP',
    subtitle: 'Aimbot FOV · Chams',
    bullets: ['Aimbot FOV', 'Scoped overlay', 'Health readouts'],
    image: EFT_PRODUCT_COVER,
    imageAlt:
      'Escape From Tarkov aimbot and ESP through a sniper scope with colored enemy chams and FOV ring',
  },
  {
    id: 'push',
    tab: 'Push',
    icon: Box,
    title: 'ESP on an industrial push',
    subtitle: 'Chams · Corner clears',
    bullets: ['Colored chams', 'Distance tags', 'Loot awareness'],
    image: EFT_SHOT_ESP_STREET,
    imageAlt:
      'Escape From Tarkov ESP at TerraGroup yard with green and magenta players through a building corner',
  },
]

export { EFT_HOME_VIDEO }
