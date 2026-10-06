export type Review = {
  id: string
  author: string
  role: string
  game: string
  rating: number
  /** ISO date — required for Review schema */
  datePublished: string
  body: string
}

/**
 * Buyer reviews shown on /reviews and emitted as Review + AggregateRating schema.
 */
export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'jayk',
    role: 'Premier player',
    game: 'Escape From Tarkov',
    rating: 5,
    datePublished: '2026-09-14',
    body: 'Status on the product page matched what I got in game. Player ESP held after the first anti-cheat note — glad I waited for a clear status before opening the menu.',
  },
  {
    id: '2',
    author: 'nova',
    role: "Customs regular",
    game: 'Escape From Tarkov',
    rating: 5,
    datePublished: '2026-09-13',
    body: 'Bought it for ESP and leave the aimbot off. Reading mid and connector without dry-peeking changes how the round feels.',
  },
  {
    id: '3',
    author: 'rift',
    role: 'IGL',
    game: 'Escape From Tarkov',
    rating: 4,
    datePublished: '2026-09-13',
    body: 'No fake multi-game catalog. Radar plus honest Updating vs clear-to-load flips are what I wanted before buying an EFT Hack.',
  },
  {
    id: '4',
    author: 'kiln',
    role: 'Duo queue',
    game: 'Escape From Tarkov',
    rating: 5,
    datePublished: '2026-09-12',
    body: 'They rebuilt when other sellers still pushed dead builds. We check status, then checkout — ESP held on Inferno and Ancient.',
  },
  {
    id: '5',
    author: 'moss',
    role: 'Late-night raids',
    game: 'Escape From Tarkov',
    rating: 5,
    datePublished: '2026-09-12',
    body: 'Menu was easy. Stream-proof on, radar on. Setup guides covered antivirus so we did not burn the first launch.',
  },
  {
    id: '6',
    author: 'vale',
    role: 'New buyer',
    game: 'Escape From Tarkov',
    rating: 5,
    datePublished: '2026-09-11',
    body: 'Weekly key first was the right call. Instant delivery and live anti-cheat status sold me before I took the monthly plan.',
  },
  {
    id: '7',
    author: 'drake',
    role: 'Solo queue',
    game: 'Escape From Tarkov',
    rating: 4,
    datePublished: '2026-09-11',
    body: 'Player ESP distance readouts were solid. Radar helped when a lurk wrapped from apps. Silent aim took ten minutes to dial in.',
  },
  {
    id: '8',
    author: 'echo',
    role: 'Woods regular',
    game: 'Escape From Tarkov',
    rating: 5,
    datePublished: '2026-09-14',
    body: 'Wallhack through smoke on long is the feature I actually use. Nothing like the free junk I tried first.',
  },
  {
    id: '9',
    author: 'prism',
    role: 'AWP player',
    game: 'Escape From Tarkov',
    rating: 4,
    datePublished: '2026-09-15',
    body: 'Silent aim looks natural on a demo as long as FOV and smoothing stay conservative. I still check status after every anti-cheat note.',
  },
  {
    id: '10',
    author: 'blade',
    role: 'Five-stack',
    game: 'Escape From Tarkov',
    rating: 5,
    datePublished: '2026-09-15',
    body: 'One license, full menu. ESP plus radar covered our executes. Support answered with the order ID the same day.',
  },
  {
    id: '11',
    author: 'orio',
    role: 'Windows 11',
    game: 'Escape From Tarkov',
    rating: 3,
    datePublished: '2026-09-12',
    body: 'Menu opened fine after exclusions. Wish the first-run docs called out overlay conflicts earlier — lost an hour to Discord overlay.',
  },
  {
    id: '12',
    author: 'sage',
    role: 'SCAV runs',
    game: 'Escape From Tarkov',
    rating: 5,
    datePublished: '2026-09-14',
    body: 'EFT-only shop is a plus. No random filler titles. Worked in SCAV raids and the feature list matched the menu.',
  },
]

export function getReviewsAggregate() {
  const count = REVIEWS.length
  const ratingValue = (
    REVIEWS.reduce((sum, review) => sum + review.rating, 0) / count
  ).toFixed(1)
  return { ratingValue, reviewCount: count, bestRating: '5', worstRating: '1' }
}
