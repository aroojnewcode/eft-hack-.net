/**
 * Feature preview loop (home + product page) from YouTube.
 * Crops burned-in subtitle band, purple grade, web H.264.
 *
 *   npm run generate:product-loop
 *   PREVIEW_YT_URL=https://youtu.be/... npm run generate:product-loop
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const tmp = join(root, '.tmp-product-video')
const source = join(tmp, 'source.mp4')
const outVideo = join(root, 'public', 'videos', 'eft-product-loop.mp4')
const outPoster = join(root, 'public', 'media', 'eft-product-poster.jpg')

const url =
  process.env.PREVIEW_YT_URL || 'https://youtu.be/zCT2V7tz3fQ?si=Y_TrggPNLjYr1i2a'
const loopSec = Number(process.env.PREVIEW_LOOP_SEC || 12)
/** Fixed start (seconds) — skips intro sticker; avoids end outro when set. */
const startAt = Number(process.env.PREVIEW_START_SEC ?? 40)
/** Vertical crop: drop top cheat HUD + bottom watermark/subtitle band. */
const cropTop = Number(process.env.PREVIEW_CROP_TOP || 0.14)
const cropHeight = Number(process.env.PREVIEW_CROP_HEIGHT || 0.66)

const vf = [
  `crop=iw:ih*${cropHeight}:0:ih*${cropTop}`,
  'scale=1152:648:force_original_aspect_ratio=increase',
  'crop=1152:648:(iw-1152)/2:(ih-648)/2',
  'fps=24',
  'eq=saturation=1.12:brightness=-0.03:contrast=1.03',
  'colorbalance=rs=0.14:gs=-0.06:bs=0.2',
  'format=yuv420p',
].join(',')

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: 'inherit', windowsHide: true })
}

mkdirSync(tmp, { recursive: true })

run('yt-dlp', [
  '-f',
  'bv*[height<=1080][ext=mp4]/bv*[height<=1080]/b',
  '--merge-output-format',
  'mp4',
  '--no-write-subs',
  '--no-write-auto-subs',
  '-o',
  source,
  url,
])

const duration = Number(
  execFileSync(
    'ffprobe',
    [
      '-v',
      'error',
      '-show_entries',
      'format=duration',
      '-of',
      'default=noprint_wrappers=1:nokey=1',
      source,
    ],
    { encoding: 'utf8' },
  ).trim(),
)

const start = Math.min(
  Math.max(0, Number.isNaN(startAt) ? (duration - loopSec) / 2 : startAt),
  Math.max(0, duration - loopSec - 0.5),
)
  '-ss',
  String(start),
  '-t',
  String(loopSec),
  '-i',
  source,
  '-an',
  '-sn',
  '-vf',
  vf,
  '-c:v',
  'libx264',
  '-preset',
  'medium',
  '-crf',
  '24',
  '-profile:v',
  'main',
  '22',
  '-maxrate',
  '2800k',
  '-bufsize',
  '5600k',
  '+faststart',
  '-tag:v',
  'avc1',
  outVideo,
])

run('ffmpeg', [
  '-y',
  '-ss',
  String(start + 3),
  '-i',
  source,
  '-frames:v',
  '1',
  '-update',
  '1',
  '-vf',
  vf,
  '-q:v',
  '3',
  outPoster,
])

if (process.env.KEEP_PREVIEW_SOURCE !== '1') {
  try {
    rmSync(tmp, { recursive: true, force: true })
  } catch {
    /* ignore */
  }
}

console.log(`Product loop: ${outVideo} (${loopSec}s from t=${start.toFixed(1)}s, ~${cropRatio * 100}% height crop)`)
console.log(`Poster: ${outPoster}`)
