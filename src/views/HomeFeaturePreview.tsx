import { FeaturePreviewShowcase } from '../components/FeaturePreviewShowcase'
import { HOME_HEADINGS } from '../data/site'

/** Below-the-fold island — defers JS until near viewport (Lighthouse). */
export function HomeFeaturePreview() {
  return (
    <div className="page-body relative z-10 text-white">
      <section className="page-x pb-4 pt-16 sm:pt-20" aria-labelledby="feature-preview-heading">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
            Feature preview
          </p>
          <h2
            id="feature-preview-heading"
            className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            {HOME_HEADINGS.h2Featured}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
            Browse wallhack, combat and push screenshots — then open the video for the full in-raid
            clip with player ESP and wallhack overlays.
          </p>
          <FeaturePreviewShowcase className="mt-8" />
        </div>
      </section>
    </div>
  )
}
