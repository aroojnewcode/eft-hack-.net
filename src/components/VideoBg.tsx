import { useEffect, useRef, useState } from 'react'
import { EFT_HERO } from '../data/media'

type VideoBgProps = {
  /** Poster and fallback still. Shown immediately, and to crawlers. */
  image?: string
  imageAlt?: string
  /** Short muted loop. Loaded after first paint to protect LCP. */
  video?: string
}

/** Full-bleed hero. Poster paints first; optional loop loads when in view. */
export function VideoBg({
  image = EFT_HERO,
  imageAlt = 'Escape From Tarkov hero gameplay preview on the homepage background',
  video,
}: VideoBgProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [playVideo, setPlayVideo] = useState(false)

  useEffect(() => {
    if (!video) return
    const el = wrapRef.current
    if (!el) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const narrowViewport =
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 768px)').matches

    if (prefersReduced || narrowViewport) return

    let cancelled = false
    const enable = () => {
      if (!cancelled) setPlayVideo(true)
    }

    const startWhenReady = () => {
      if (typeof IntersectionObserver === 'undefined') {
        enable()
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            enable()
            observer.disconnect()
          }
        },
        { rootMargin: '0px', threshold: 0.01 },
      )
      observer.observe(el)
      return () => observer.disconnect()
    }

    let disconnectObserver: (() => void) | undefined
    const onLoad = () => {
      disconnectObserver = startWhenReady()
    }

    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad, { once: true })

    return () => {
      cancelled = true
      window.removeEventListener('load', onLoad)
      disconnectObserver?.()
    }
  }, [video])

  return (
    <div
      ref={wrapRef}
      className="hero-video-wrap absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
    >
      <div className="absolute inset-0 z-0 bg-z-bg" aria-hidden />
      <img
        src={image}
        alt={imageAlt}
        width={1920}
        height={1080}
        decoding="async"
        fetchPriority="high"
        className="hero-video-bg absolute inset-0 z-[1] h-full w-full object-cover object-center"
      />
      {video && playVideo ? (
        <video
          className="hero-video-bg absolute inset-0 z-[1] h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={image}
          aria-hidden
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : null}
      <div className="hero-video-tint pointer-events-none absolute inset-0 z-[2]" aria-hidden />
      <div className="hero-video-tint-glow pointer-events-none absolute inset-0 z-[2]" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 z-[3] h-40 bg-gradient-to-t from-z-bg via-z-bg/80 to-transparent" />
      <div className="absolute inset-x-0 top-0 z-[3] h-24 bg-gradient-to-b from-z-bg/70 to-transparent" />
    </div>
  )
}
