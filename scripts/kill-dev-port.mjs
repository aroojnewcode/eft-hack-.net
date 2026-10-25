/**
 * Free the Astro dev port when a previous `npm run dev` was killed without exiting Vite.
 * Windows-focused (netstat + taskkill); no-op elsewhere if netstat fails.
 */
import { execSync } from 'node:child_process'

const port = String(process.env.DEV_PORT || 5174)

function killOnWindows() {
  let out = ''
  try {
    out = execSync(`netstat -ano | findstr ":${port}"`, {
      encoding: 'utf8',
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 8000,
    })
  } catch {
    console.warn(`Could not scan port ${port} (timeout or no listeners). Try Task Manager → end Node.js, then npm run dev.`)
    return
  }

  const pids = new Set()
  for (const line of out.split(/\r?\n/)) {
    if (!line.includes(`:${port}`)) continue
    const m = line.trim().match(/(\d+)\s*$/)
    if (m && m[1] !== '0') pids.add(m[1])
  }

  for (const pid of pids) {
    try {
      execSync(`taskkill /F /PID ${pid}`, { windowsHide: true, stdio: 'ignore' })
      console.log(`Freed port ${port} (stopped PID ${pid})`)
    } catch {
      /* already gone */
    }
  }
}

if (process.platform === 'win32') killOnWindows()
