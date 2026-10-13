import { Check } from 'lucide-react'
import { blogPath } from '../data/blogs'
import type { Game } from '../data/games'
import { PRODUCT_PRICE_USD, SITE_HOST, SITE_NAME } from '../data/site'

const MODULE_HIGHLIGHTS = [
  'Silent-aim Aimbot — FOV, smoothing and bone options',
  'Player ESP / wallhack — distance, health and gear readouts',
  '2D radar for off-screen PMCs on raid maps',
  'Loot and quest markers when the build supports them',
] as const

type ProductCheckoutDetailsProps = {
  game: Game
}

/** Visible product facts for buyers and crawlers (matches Offer / Product JSON-LD). */
export function ProductCheckoutDetails({ game }: ProductCheckoutDetailsProps) {
  return (
    <div className="page-card mt-6 rounded-2xl p-5 sm:mt-8 sm:p-6">
      <h2 className="text-base font-semibold tracking-tight text-white sm:text-lg">
        EFT Hack product summary
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-white/50">
        Escape From Tarkov hack for Windows PC on {SITE_HOST} — price, BattlEye status and what the
        license includes before you open checkout.
      </p>

      <dl className="mt-5 grid gap-x-6 gap-y-4 border-t border-white/10 pt-5 sm:grid-cols-2">
        <div>
          <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">Price</dt>
          <dd className="mt-1 text-sm font-semibold text-white">
            From ${PRODUCT_PRICE_USD} USD
            <span className="mt-0.5 block text-xs font-normal text-white/45">
              One digital license · taxes may apply at checkout
            </span>
          </dd>
        </div>
        <div>
          <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
            Anti-cheat status
          </dt>
          <dd className="mt-1 text-sm font-semibold text-white">{game.status}</dd>
          <dd className="mt-1 text-xs leading-relaxed text-white/45">
            BattlEye on Escape From Tarkov — we label clear to load or Updating after patches.{' '}
            <a
              href={blogPath('anti-cheat-status')}
              className="text-white/70 underline-offset-2 hover:text-white hover:underline"
            >
              Status guide
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
            Platform
          </dt>
          <dd className="mt-1 text-sm text-white/80">Windows 10 and 11 (64-bit)</dd>
        </div>
        <div>
          <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
            Delivery
          </dt>
          <dd className="mt-1 text-sm text-white/80">
            Instant digital delivery worldwide after checkout
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
            Game modes
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-white/80">
            PMC raids, SCAV runs and offline practice when the current build supports them — official
            Escape From Tarkov matchmaking only.
          </dd>
        </div>
      </dl>

      <h3 className="mt-6 text-sm font-semibold text-white">Core modules in this EFT hack</h3>
      <ul className="mt-3 space-y-2.5">
        {MODULE_HIGHLIGHTS.map((line) => (
          <li key={line} className="flex items-start gap-2.5 text-sm text-white/55">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-z-accent/20">
              <Check className="h-3 w-3 text-z-soft" strokeWidth={2.5} />
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-sm leading-relaxed text-white/45">
        {SITE_NAME} does not guarantee permanent undetected status — load only when status matches
        your risk tolerance. Compare{' '}
        <a href="/reviews" className="text-white/70 underline-offset-2 hover:text-white hover:underline">
          buyer reviews
        </a>
        , read the{' '}
        <a
          href={blogPath('complete-setup')}
          className="text-white/70 underline-offset-2 hover:text-white hover:underline"
        >
          setup guide
        </a>
        , or open{' '}
        <a href="/faq" className="text-white/70 underline-offset-2 hover:text-white hover:underline">
          FAQ
        </a>{' '}
        before purchase.
      </p>
    </div>
  )
}
