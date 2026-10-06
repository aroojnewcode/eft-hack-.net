/**
 * Homepage hero loop from YouTube — middle segment, purple grade, web H.264.
 *
 *   npm run generate:hero-loop
 *   HERO_YT_URL=https://youtu.be/... npm run generate:hero-loop
 *
 * Requires yt-dlp + ffmpeg on PATH.
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const tmp = join(root, '.tmp-hero-video')
const source = join(tmp, 'source.mp4')
const outVideo = join(root, 'public', 'videos', 'eft-hero-loop.mp4')
const outPoster = join(root, 'public', 'media', 'eft-hero-poster.jpg')

const url =
  process.env.HERO_YT_URL || 'https://youtu.be/onhHHhAVKW8?si=A1454PrM7_CvH95E'
/** Short loop (6–10s) keeps hero background light for LCP/bandwidth. */
const loopSec = Number(process.env.HERO_LOOP_SEC || 8)
const cropTop = Number(process.env.HERO_CROP_TOP || 0.04)
const cropHeight = Number(process.env.HERO_CROP_HEIGHT || 0.88)

const OUT_W = 1152
const OUT_H = 648

const vf = [
  `crop=iw:ih*${cropHeight}:0:ih*${cropTop}`,
  `scale=${OUT_W}:${OUT_H}:force_original_aspect_ratio=increase:flags=lanczos`,
  `crop=${OUT_W}:${OUT_H}:(iw-${OUT_W})/2:(ih-${OUT_H})/2`,
  'fps=24',
  'eq=saturation=1.12:brightness=-0.03:contrast=1.03',
  'colorbalance=rs=0.14:gs=-0.06:bs=0.2',
  'unsharp=3:3:0.4:3:3:0.0',
  'format=yuv420p',
].join(',')

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: 'inherit', windowsHide: true })
}

mkdirSync(tmp, { recursive: true })

run('yt-dlp', [
  '-f',
  'bv*[height<=1080]+ba/b[height<=1080]/bv*[height<=720]/b',
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

const start = Math.max(0, (duration - loopSec) / 2)

run('ffmpeg', [
  '-y',
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
  'slow',
  '-crf',
  '21',
  '-maxrate',
  '2200k',
  '-bufsize',
  '4400k',
  '-tune',
  'film',
  '-profile:v',
  'main',
  '-movflags',
  '+faststart',
  '-tag:v',
  'avc1',
  outVideo,
])

run('ffmpeg', [
  '-y',
  '-ss',
  String(start + loopSec / 2),
  '-i',
  source,
  '-frames:v',
  '1',
  '-update',
  '1',
  '-vf',
  vf,
  '-q:v',
  '2',
  outPoster,
])

if (process.env.KEEP_HERO_SOURCE !== '1') {
  try {
    rmSync(tmp, { recursive: true, force: true })
  } catch {
    /* ignore */
  }
}

console.log(
  `Hero loop: ${outVideo} (${loopSec}s centered at t=${start.toFixed(1)}s, ${OUT_W}×${OUT_H}, CRF 21)`,
)
console.log(`Poster: ${outPoster}`)
