import { FeaturePreviewVideo } from './FeaturePreviewVideo'

type EftProductPreviewProps = {
  className?: string
  wide?: boolean
  interactive?: boolean
  priority?: boolean
}

/** Product-page feature preview (same file as homepage inline block). */
export function EftProductPreview({
  className = '',
  wide = false,
  interactive = false,
  priority = false,
}: EftProductPreviewProps) {
  return (
    <FeaturePreviewVideo
      className={className}
      variant="product"
      wide={wide}
      interactive={interactive}
      priority={priority}
    />
  )
}
