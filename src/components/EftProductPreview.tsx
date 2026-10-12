import { FeaturePreviewShowcase } from './FeaturePreviewShowcase'

type EftProductPreviewProps = {
  className?: string
  priority?: boolean
}

/** Product-page live preview — carousel + info card (same as homepage). */
export function EftProductPreview({ className = '', priority = false }: EftProductPreviewProps) {
  return <FeaturePreviewShowcase className={className} priority={priority} />
}
