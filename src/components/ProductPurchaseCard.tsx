import { GameCover } from './GameCover'
import { CheckoutLink } from './CheckoutLink'
import type { Game } from '../data/games'
import { PRODUCT_PRICE_USD } from '../data/site'

type ProductPurchaseCardProps = {
  game: Game
}

export function ProductPurchaseCard({ game }: ProductPurchaseCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-z-soft/15 bg-[rgba(20,16,31,0.95)] sm:rounded-3xl">
      <CheckoutLink className="block" aria-label="Buy EFT Hack">
        <GameCover
          slug={game.slug}
          name={game.name}
          aspect="square"
          variant="product"
          className="rounded-none"
        />
      </CheckoutLink>
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="icon-well shrink-0 text-sm font-bold">EFT</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">EFT Hack</p>
            <p className="text-xs text-white/45">
              {game.status} · From ${PRODUCT_PRICE_USD}
            </p>
          </div>
        </div>

        <CheckoutLink className="cta-gradient mt-5 block w-full rounded-full py-3.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90">
          Buy EFT Hack
        </CheckoutLink>
        <p className="mt-3 text-center text-[11px] text-white/40">
          Instant delivery · Check anti-cheat status first
        </p>
      </div>
    </div>
  )
}
