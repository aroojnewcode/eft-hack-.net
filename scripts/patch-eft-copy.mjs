import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'src')
const EXT = new Set(['.ts', '.tsx'])

const REPLACEMENTS = [
  ['ultimate and ability awareness', 'loot and quest tracking'],
  ['ultimate and ability ESP', 'loot and quest ESP'],
  ['Ultimate and ability ESP', 'Loot and quest ESP'],
  ['ultimate awareness', 'loot awareness'],
  ['Hero info — names, health and ultimate readouts on enemies', 'Player info — names, health and gear readouts on PMCs'],
  ['Hero boxes, distance and health through walls — ultimate and ability info when supported.', 'Player boxes, distance and health through walls — loot value and quest markers when supported.'],
  ['hero names and health show through cover', 'player names and health show through cover'],
  ['heroes and ability cooldowns through walls and smokes before you wide-swing a choke', 'players and gear through walls and smoke before you wide-swing a doorway'],
  ['hero names, health bars and ultimate tags', 'player names, health bars and loot tags'],
  ['Competitive and Quick Play', 'PMC raids and SCAV runs'],
  ['Quick Play, Competitive and Arcade', 'PMC raids, SCAV runs and offline raids'],
  ['Quick Play, Competitive and most Arcade modes', 'PMC raids, SCAV runs and offline raids'],
  ['Quick Play, Competitive, Arcade, Deathmatch and Custom Games', 'PMC raids, SCAV runs, offline raids and co-op'],
  ['In Quick Play or Arcade, do one short test session before a long Competitive block.', 'In a short SCAV or offline test raid, confirm ESP and radar before a long PMC run.'],
  ['Does the EFT hack work in Competitive and Quick Play?', 'Does the EFT hack work in PMC and SCAV raids?'],
  ['Competitive & anti-cheat', 'Raids & BattlEye'],
  ['Competitive nights', 'Late-night raids'],
  ["role: 'Quick Play'", "role: 'SCAV runs'"],
  ['Worked in Quick Play and the feature list matched the menu.', 'Worked in SCAV raids and the feature list matched the menu.'],
  ['Tarkov-only shop is a plus.', 'EFT-only shop is a plus.'],
  ['on official official matchmaking and Arcade modes.', 'on official Escape From Tarkov matchmaking.'],
  ['Circuit Royal payload', 'Customs raid'],
  ['payload or point is contested', 'extract or objective is contested'],
  ['retakes — know where utility landed', 're-engagements — know where grenades landed'],
  ['push point pushes', 'contested choke pushes'],
  ['stagger or regroup phases', 'looting or repositioning'],
  ['Early fight and poke phases: short-range ESP and utility tracking while you build ultimate. Mid and point fights:', 'Early raid contact: short-range ESP and gear tracking while you loot. Mid-raid CQB fights:'],
  ['report in Competitive — replay', 'report in ranked raids — replay'],
  ['long sightlines or mid', 'long hallways or open yards'],
  ['utility ESP, ultimate and ability ESP', 'gear ESP, loot and quest ESP'],
  ['Live anti-cheat status on Quick Play,', 'Live BattlEye status on PMC raids,'],
  ['Competitive and Arcade.', 'SCAV runs and offline raids.'],
  ['Blatant Aimbot is the fastest report in Competitive', 'Blatant Aimbot is the fastest report in ranked raids'],
]

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) walk(path, files)
    else if (EXT.has(extname(name))) files.push(path)
  }
  return files
}

let n = 0
for (const file of walk(root)) {
  if (file.endsWith('HeroSearch.tsx')) continue
  const before = readFileSync(file, 'utf8')
  let text = before
  for (const [from, to] of REPLACEMENTS) text = text.split(from).join(to)
  if (text !== before) {
    writeFileSync(file, text, 'utf8')
    n++
  }
}
console.log(`Patched ${n} files.`)
