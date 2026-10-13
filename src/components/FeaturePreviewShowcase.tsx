import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Play, Target } from 'lucide-react'
import {
  EFT_HOME_VIDEO,
  FEATURE_PREVIEW_SCENES,
  type FeaturePreviewScene,
} from '../data/feature-preview'

type FeaturePreviewShowcaseProps = {
  className?: string
  /** Product page: load video sooner when above the fold */
  priority?: boolean
}

export function FeaturePreviewShowcase({
  className = '',
  priority = false,
}: FeaturePreviewShowcaseProps) {
  const scenes = FEATURE_PREVIEW_SCENES
  const [index, setIndex] = useState(0)
  const [videoMode, setVideoMode] = useState(false)
  const [videoActive, setVideoActive] = useState(priority)
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const scene = scenes[index] ?? scenes[0]

  useEffect(() => {
    if (priority) return
    const root = rootRef.current
    if (!root || typeof IntersectionObserver === 'undefined') {
      setVideoActive(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVideoActive(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 },
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [priority])

  useEffect(() => {
    const video = videoRef.current
    if (!videoActive || !video || !videoMode) return
    video.load()
  }, [videoActive, videoMode])

  const go = useCallback(
    (delta: number) => {
      setVideoMode(false)
      setIndex((i) => (i + delta + scenes.length) % scenes.length)
    },
    [scenes.length],
  )

  const selectScene = (next: FeaturePreviewScene) => {
    const i = scenes.findIndex((s) => s.id === next.id)
    if (i >= 0) {
      setVideoMode(false)
      setIndex(i)
    }
  }

  const openVideo = () => setVideoMode(true)

  return (
    <div
      ref={rootRef}
      className={`grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-5 ${className}`.trim()}
    >
      {/* Media stage */}
      <div className="relative min-h-[220px] overflow-hidden rounded-2xl border border-white/10 bg-black sm:min-h-[280px] lg:min-h-0 lg:aspect-[16/10]">
        {videoMode ? (
          <video
            ref={videoRef}
            className="feature-preview-video__player feature-preview-video__player--interactive absolute inset-0 z-[1] h-full w-full object-cover"
            muted
            loop
            playsInline
            controls
            controlsList="nodownload noplaybackrate"
            preload={priority ? 'auto' : 'metadata'}
            width={1280}
            height={720}
            poster={EFT_HOME_VIDEO.poster}
            aria-label={EFT_HOME_VIDEO.title}
          >
            {videoActive ? <source src={EFT_HOME_VIDEO.src} type="video/mp4" /> : null}
          </video>
        ) : (
          <img
            src={scene.image}
            alt={scene.imageAlt}
            width={1280}
            height={720}
            loading={priority && index === 0 && !videoMode ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority && index === 0 && !videoMode ? 'high' : 'low'}
            className="absolute inset-0 z-[1] h-full w-full object-cover"
          />
        )}

        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-z-bg/70 via-transparent to-z-bg/25"
          aria-hidden
        />

        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75"
          aria-label="Previous preview"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75"
          aria-label="Next preview"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2} />
        </button>

        <div className="absolute bottom-3 left-3 z-10 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm sm:text-[11px]">
            <Target className="h-3.5 w-3.5 text-z-soft" strokeWidth={2} />
            Gameplay preview
          </span>
        </div>
        <div className="absolute bottom-3 right-3 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-z-soft/30 bg-z-accent/25 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {videoMode ? (
              <>
                <Play className="h-3.5 w-3.5" strokeWidth={2} />
                Video
              </>
            ) : (
              <>
                <scene.icon className="h-3.5 w-3.5" strokeWidth={2} />
                {scene.tab}
              </>
            )}
          </span>
        </div>
      </div>

      {/* Info card */}
      <div className="flex flex-col rounded-2xl border border-white/10 bg-[rgba(18,14,28,0.92)] p-5 sm:p-6 lg:min-h-[280px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-z-soft">
          Live preview
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
          {videoMode ? 'In-raid feature clip' : scene.title}
        </h3>
        <p className="mt-1.5 text-sm text-white/50">
          {videoMode ? 'ESP · Wallhack · Raid gameplay' : scene.subtitle}
        </p>

        <ul className="mt-5 space-y-2.5 text-sm text-white/75">
          {(videoMode
            ? ['Player ESP', 'Wallhack overlays', 'Scrub timeline controls']
            : scene.bullets
          ).map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-z-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {scenes.map((s) => {
            const Icon = s.icon
            const active = !videoMode && s.id === scene.id
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => selectScene(s)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'border-z-accent/50 bg-z-accent/30 text-white'
                    : 'border-white/12 bg-white/5 text-white/65 hover:border-white/25 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                {s.tab}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={openVideo}
          className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors sm:w-auto ${
            videoMode
              ? 'border-z-accent/50 bg-z-accent/20 text-white'
              : 'border-white/15 bg-white/5 text-white/80 hover:border-white/30 hover:text-white'
          }`}
        >
          <Play className="h-4 w-4" strokeWidth={2} />
          Video
        </button>

        <p className="mt-4 text-[11px] leading-relaxed text-white/40">
          Screenshots and clip are from Escape From Tarkov raids — for feature illustration, not a
          promise about match outcome.
        </p>
      </div>
    </div>
  )
}
