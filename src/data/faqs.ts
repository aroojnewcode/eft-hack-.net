export type FaqItem = {
  q: string
  a: string
}

/** Master FAQ — visible on /faq and reused in sections. */
export const SITE_FAQS: FaqItem[] = [
  {
    q: 'What is EFT Hack?',
    a: 'EFT Hack is an Escape From Tarkov tool on efthack.net — silent-aim Aimbot, player ESP, wallhack and a 2D radar — with live anti-cheat status after game patches.',
  },
  {
    q: 'How much does the EFT hack cost?',
    a: 'The EFT hack starts from $35 for short access. Longer licenses cost more. Always confirm live anti-cheat status and the price on efthack.net before checkout.',
  },
  {
    q: 'Do you sell hacks for other games?',
    a: 'No. efthack.net sells an Escape From Tarkov hack only — one product, no multi-game catalog.',
  },
  {
    q: 'Is Aimbot the main feature?',
    a: 'Aimbot is optional. Most buyers lead with EFT ESP and radar, then enable silent aim only if they want it.',
  },
  {
    q: 'How do you handle anti-cheat updates?',
    a: 'We publish live clear-to-load or Updating labels after Escape From Tarkov and Escape From Tarkov patches. Always check status on efthack.net before you open the menu.',
  },
  {
    q: 'What is EFT ESP / wallhack?',
    a: 'EFT ESP and wallhack show players through walls and smokes with distance and health when supported, so you can read a site before you peek.',
  },
  {
    q: 'What is the EFT radar?',
    a: "The radar is a 2D overlay for off-screen players — useful for flanks on Customs, Woods, Interchange and the rest of the Active Duty maps.",
  },
  {
    q: 'What features are included?',
    a: 'EFT Aimbot with silent aim, player ESP, wallhack, radar, triggerbot, loot and quest tracking, and stream-proof options — Escape From Tarkov on Windows PC only. See the Features Checklist guide for the full list.',
  },
  {
    q: 'Does the EFT hack work in PMC raids and SCAV runs?',
    a: 'Yes. It is built for official Battlestate modes, including PMC raids, SCAV runs and offline. Custom games with extra admin tools can behave differently — ask support before you buy if that is your only queue.',
  },
  {
    q: 'How do I buy the EFT hack?',
    a: 'Start on the homepage, confirm live anti-cheat status and review the price from $35. Open Product details for compatibility and features, then continue to checkout for digital delivery.',
  },
  {
    q: 'How do I open the EFT hack menu?',
    a: 'After checkout, follow the Complete Setup forum thread and the steps in your delivery email. If status is Updating, wait rather than forcing an outdated build.',
  },
  {
    q: 'Where do I get EFT Hack support?',
    a: 'Use the Support page and your checkout order channel. Include current anti-cheat status and whether you need menu, setup or delivery help.',
  },
  {
    q: 'Where can I read EFT Hack reviews?',
    a: 'Player reviews with ratings are on the Reviews page. They cover ESP usefulness, status honesty and patch survival before you buy.',
  },
  {
    q: 'What is your refund policy?',
    a: 'Digital licenses follow the Refunds page — delivery failures and extended Updating windows can qualify; change of mind after a working key does not.',
  },
  {
    q: 'Is this the official Tarkov site?',
    a: 'No. We sell an EFT hack only. Buy and play the game through the official Battlestate launcher. We are not affiliated with Battlestate Games or Escape From Tarkov.',
  },
]

/** Commercial questions shown on the homepage; FAQ schema lives on /faq only. */
export const HOME_FAQS: FaqItem[] = [
  SITE_FAQS[1],
  SITE_FAQS[4],
  SITE_FAQS[5],
  SITE_FAQS[9],
]

export const PRODUCT_PAGE_FAQS: FaqItem[] = [
  SITE_FAQS[1],
  SITE_FAQS[4],
  SITE_FAQS[5],
  SITE_FAQS[6],
  SITE_FAQS[9],
  SITE_FAQS[11],
]
