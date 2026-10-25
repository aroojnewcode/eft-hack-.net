import { CheckoutLink } from './CheckoutLink'

type BlogPostCtaProps = {
  siteHost: string
}

export function BlogPostCta({ siteHost }: BlogPostCtaProps) {
  return (
    <div className="page-card mt-12 rounded-2xl p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-white">Ready for EFT Hack?</h2>
      <p className="mt-2 text-sm leading-relaxed text-white/55">
        Check live anti-cheat status, then buy ESP, wallhack, radar hack and silent aim for Escape
        From Tarkov on {siteHost}. Need help? Read{' '}
        <a href="/support" className="text-white/80 underline-offset-2 hover:underline">
          EFT Hack support
        </a>{' '}
        or{' '}
        <a href="/reviews" className="text-white/80 underline-offset-2 hover:underline">
          player reviews
        </a>
        . Own the game via{' '}
        <a
          href="https://www.escapefromtarkov.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/80 underline-offset-2 hover:underline"
        >
          Battlestate
        </a>
        .
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href="/eft-hack"
          className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/5"
        >
          Product details
        </a>
        <a
          href="/support"
          className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/5"
        >
          Support
        </a>
        <CheckoutLink className="cta-gradient inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-white">
          Buy EFT Hack
        </CheckoutLink>
      </div>
    </div>
  )
}
