/**
 * Rebrand: Overwatch Hack / overwatchhack.net → EFT Hack / efthack.net
 */
import { readFileSync, writeFileSync, readdirSync, statSync, renameSync } from 'node:fs'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git'])
const EXT = new Set([
  '.ts',
  '.tsx',
  '.astro',
  '.mjs',
  '.js',
  '.json',
  '.md',
  '.toml',
  '.txt',
  '.xml',
  '.css',
])

/** Longest / most specific replacements first. */
const REPLACEMENTS = [
  ['https://overwatchhack.net', 'https://efthack.net'],
  ['overwatchhack.net', 'efthack.net'],
  ['https://overwatch.blizzard.com/', 'https://www.escapefromtarkov.com/'],
  ['https://battle.net/shop/en-us/product/overwatch', 'https://www.escapefromtarkov.com/preorder-page'],
  ['https://support.blizzard.com/', 'https://www.escapefromtarkov.com/support'],
  ['Overwatch Hack', 'EFT Hack'],
  ['Overwatch Hacks', 'EFT Hacks'],
  ['Overwatch 2', 'Escape From Tarkov'],
  ['overwatch 2', 'escape from tarkov'],
  ['Overwatch', 'Tarkov'],
  ['overwatch', 'eft'],
  ['/overwatch-2-hack', '/eft-hack'],
  ['/overwatch-cheats', '/eft-cheats'],
  ['/overwatch-hacks', '/eft-hacks'],
  ['/overwatch-hack', '/eft-hack'],
  ['overwatch-2-hack', 'eft-hack'],
  ['overwatch-cheats', 'eft-cheats'],
  ['overwatch-hacks', 'eft-hacks'],
  ['overwatch-hack', 'eft-hack'],
  ["getGame('eft')", "getGame('eft')"],
  ["slug: 'eft'", "slug: 'eft'"],
  ['guideSlug="eft-hack"', 'guideSlug="eft-hack"'],
  ['OFFICIAL_TARKOV_LINKS', 'OFFICIAL_EFT_LINKS'],
  ['OFFICIAL_OVERWATCH_LINKS', 'OFFICIAL_EFT_LINKS'],
  ['OverwatchProductPreview', 'EftProductPreview'],
  ['OVERWATCH_OG', 'EFT_OG'],
  ['OVERWATCH_', 'EFT_'],
  ['requiredOverwatchMedia', 'requiredEftMedia'],
  ['Missing Tarkov media', 'Missing EFT media'],
  ['Missing Overwatch media', 'Missing EFT media'],
  ['official Tarkov links', 'official EFT links'],
  ['official Overwatch links', 'official EFT links'],
  ['Tarkov media asset', 'EFT media asset'],
  ['Overwatch media asset', 'EFT media asset'],
  ['overwatchhack-net', 'efthack-net'],
  ['pattern = "overwatchhack.net"', 'pattern = "efthack.net"'],
  ['pattern = "www.overwatchhack.net"', 'pattern = "www.efthack.net"'],
  ["CANONICAL_ORIGIN = 'https://overwatchhack.net'", "CANONICAL_ORIGIN = 'https://efthack.net'"],
  ["SITE_URL || 'https://overwatchhack.net'", "SITE_URL || 'https://efthack.net'"],
  ['under overwatchhack.net', 'under efthack.net'],
  ['on overwatchhack.net', 'on efthack.net'],
  ['· overwatchhack.net', '· efthack.net'],
  ['How overwatchhack.net handles', 'How efthack.net handles'],
  ['King\'s Row, Busan, Midtown', 'Customs, Woods, Interchange'],
  ["King's Row, Busan, Midtown", 'Customs, Woods, Interchange'],
  ["King's Row", 'Customs'],
  ['Busan', 'Woods'],
  ['Midtown', 'Interchange'],
  ['enemy hero', 'enemy PMC'],
  ['enemy heroes', 'enemy PMCs'],
  ['hero outline', 'player outline'],
  ['hero tracking', 'player tracking'],
  ['heroes through', 'players through'],
  ['off-screen heroes', 'off-screen PMCs'],
  ['Orisa gameplay', 'PMC raid gameplay'],
  ['Mercy gameplay', 'SCAV raid gameplay'],
  ['payload map', 'raid map'],
  ['payload defense', 'raid extraction'],
  ['Blizzard matchmaking', 'official matchmaking'],
  ['Blizzard modes', 'Battlestate modes'],
  ['Battle.net account', 'Battlestate account'],
  ['Battle.net Support', 'Battlestate Support'],
  ['Tarkov 2 on Battle.net', 'Escape From Tarkov on Battlestate'],
  ['Tarkov on Battle.net', 'Escape From Tarkov'],
  ['Blizzard', 'Battlestate'],
  ['Quick Play, Competitive and Arcade', 'PMC raids, SCAV runs and offline'],
  ['Quick Play and Competitive', 'PMC raids and SCAV runs'],
  ['Competitive, Quick Play', 'PMC raids, SCAV runs'],
  ['Ultimate and ability awareness', 'Loot and quest awareness'],
  ['Ultimate timers and ability markers', 'Loot value tags and quest markers'],
  ['team fights and retakes', 'firefights and extractions'],
  ['backline', 'squad'],
  ['DEFEND markers', 'quest markers'],
  ['objective tags', 'loot tags'],
  ['name = "dayzqrh"', 'name = "efthack-net"'],
  ['/products/eft-hack', '/products/eft-hack'],
  ['/products/tarkov-2-hack', '/products/eft-hack'],
  ['file: \'eft-hack.jpg\'', "file: 'eft-hack.jpg'"],
  ['/og/eft-hack.jpg', '/og/eft-hack.jpg'],
  ['Tarkov Aimbot', 'EFT Aimbot'],
  ['Tarkov ESP', 'EFT ESP'],
  ['Tarkov GUIDE', 'EFT GUIDE'],
  ['Tarkov HACK', 'EFT HACK'],
  ['Tarkov hack', 'EFT hack'],
  ['Tarkov cheats', 'EFT cheats'],
  ['Tarkov cheat', 'EFT cheat'],
  ['Tarkov aimbot', 'EFT aimbot'],
  ['Tarkov esp', 'EFT esp'],
  ['Tarkov wallhack', 'EFT wallhack'],
  ['Tarkov radar', 'EFT radar'],
  ['Buy Tarkov', 'Buy EFT'],
  ['Search Tarkov', 'Search EFT'],
  ['for Tarkov', 'for Escape From Tarkov'],
  ['on Tarkov', 'on Escape From Tarkov'],
  ['Tarkov · Worldwide', 'Escape From Tarkov · Worldwide'],
  ['Tarkov Hack —', 'EFT Hack —'],
  ['Tarkov Hack |', 'EFT Hack |'],
  ['Tarkov Hack,', 'EFT Hack,'],
  ['Tarkov Hack.', 'EFT Hack.'],
  ['Tarkov Hack ', 'EFT Hack '],
  ['>Tarkov Hack<', '>EFT Hack<'],
  ['aria-label="Buy Tarkov Hack"', 'aria-label="Buy EFT Hack"'],
  ['Buy Tarkov Hack', 'Buy EFT Hack'],
  ['License rules for Tarkov Hack', 'License rules for EFT Hack'],
  ['for Tarkov Hack', 'for EFT Hack'],
  ['rebrand-to-overwatch.mjs', 'rebrand-to-overwatch.mjs'],
  ['Overwatch feature preview', 'EFT feature preview'],
  ['Tarkov feature preview', 'EFT feature preview'],
  ['Tarkov 2 feature preview', 'EFT feature preview'],
  ['Tarkov 2 ·', 'Escape From Tarkov ·'],
  ['Tarkov 2.', 'Escape From Tarkov.'],
  ['Tarkov 2 hacks', 'EFT hacks'],
  ['Tarkov 2 cheat', 'EFT cheat'],
  ['Tarkov 2 cheats', 'EFT cheats'],
  ['Tarkov 2 aimbot', 'EFT aimbot'],
  ['anti-cheat and Tarkov 2 patches', 'anti-cheat and Escape From Tarkov patches'],
  ['Tarkov 2 patches', 'Escape From Tarkov patches'],
  ['Tarkov 2 on', 'Escape From Tarkov on'],
  ['Tarkov 2 —', 'Escape From Tarkov —'],
  ['Tarkov 2 wallhack', 'EFT wallhack'],
  ['Tarkov 2 ESP', 'EFT ESP'],
  ['Tarkov 2 aimbot', 'EFT aimbot'],
  ['Tarkov 2 buy card', 'EFT buy card'],
  ['Tarkov 2 product', 'EFT product'],
  ['Tarkov 2 cheat', 'EFT cheat'],
  ['Tarkov 2 cheats', 'EFT cheats'],
  ['Tarkov 2 license', 'EFT license'],
  ['Tarkov buyer', 'EFT buyer'],
  ['Tarkov player', 'EFT player'],
  ['Tarkov product', 'EFT product'],
  ['Tarkov preview', 'EFT preview'],
  ['Tarkov feature', 'EFT feature'],
  ['Official Tarkov 2 site', 'Official Escape From Tarkov site'],
  ['Official Tarkov site', 'Official Escape From Tarkov site'],
  ['Tarkov 2', 'Escape From Tarkov'],
  ['tarkov 2', 'escape from tarkov'],
  ['vac-status', 'battleye-status'],
  ['forums-vac-status', 'forums-battleye-status'],
  ['VAC status', 'BattlEye status'],
  ['VAC Status', 'BattlEye Status'],
  ['vac cs2', 'eft'],
  ['cs2hack', 'efthack'],
  ['cs2-hack', 'eft-hack'],
  ['CS2', 'EFT'],
  ['Counter-Strike', 'Escape From Tarkov'],
  ['counter-strike', 'escape from tarkov'],
  ['DayZ', 'EFT'],
  ['dayz', 'eft'],
  ['DAYZ', 'EFT'],
]

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (SKIP_DIRS.has(name)) continue
    const st = statSync(path)
    if (st.isDirectory()) walk(path, files)
    else if (EXT.has(extname(name))) files.push(path)
  }
  return files
}

function apply(content) {
  let out = content
  for (const [from, to] of REPLACEMENTS) {
    out = out.split(from).join(to)
  }
  return out
}

const files = walk(root).filter(
  (f) =>
    !f.includes('rebrand-to-eft.mjs') &&
    !f.includes('rebrand-to-overwatch.mjs') &&
    !f.includes('rebrand-blogs-only.mjs'),
)
let changed = 0
for (const file of files) {
  const before = readFileSync(file, 'utf8')
  const after = apply(before)
  if (after !== before) {
    writeFileSync(file, after, 'utf8')
    changed++
  }
}

const renames = [
  ['src/pages/overwatch-hack.astro', 'src/pages/eft-hack.astro'],
  ['src/components/OverwatchProductPreview.tsx', 'src/components/EftProductPreview.tsx'],
  ['public/og/overwatch-hack.jpg', 'public/og/eft-hack.jpg'],
  ['public/media/overwatch-wallhack-players.png', 'public/media/eft-wallhack-players.png'],
  ['public/media/overwatch-esp-street.png', 'public/media/eft-esp-street.png'],
  ['public/media/overwatch-radar-esp.png', 'public/media/eft-radar-esp.png'],
  ['public/media/overwatch-esp-aimbot.png', 'public/media/eft-esp-aimbot.png'],
  ['public/media/overwatch-product-cover.png', 'public/media/eft-product-cover.png'],
  ['public/media/overwatch-hero-poster.jpg', 'public/media/eft-hero-poster.jpg'],
  ['public/media/overwatch-product-poster.jpg', 'public/media/eft-product-poster.jpg'],
  ['public/media/overwatch-radar-skeleton.png', 'public/media/eft-radar-skeleton.png'],
  ['public/videos/overwatch-hero-loop.mp4', 'public/videos/eft-hero-loop.mp4'],
  ['public/videos/overwatch-product-loop.mp4', 'public/videos/eft-product-loop.mp4'],
]

for (const [fromRel, toRel] of renames) {
  const from = join(root, fromRel)
  const to = join(root, toRel)
  try {
    if (statSync(from).isFile()) renameSync(from, to)
  } catch {
    /* already renamed or missing */
  }
}

console.log(`EFT rebrand applied to ${changed} text files.`)
