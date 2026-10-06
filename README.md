# EFT Hack (efthack.net)

Static Astro site for Escape From Tarkov — Aimbot, ESP, wallhack, radar — deployed with Cloudflare Workers.

```bash
npm install
npm run dev
npm run build
npx wrangler deploy
```

## Cloudflare: “repository no longer exists”

Cloudflare still points at an old GitHub repo. Fix it in the dashboard (not in code):

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → your worker (`eftqrh`).
2. **Settings** → **Builds** → **Disconnect** the broken Git repository.
3. Either **Connect** again and choose **`aroojnewcode/eft-hack-net`** / branch **`main`**, or leave Git disconnected and use **GitHub Actions** (`.github/workflows/deploy.yml`).
4. On GitHub: **Settings → Secrets and variables → Actions** — add `CLOUDFLARE_API_TOKEN` (Workers edit) and `CLOUDFLARE_ACCOUNT_ID` (dashboard URL).
5. On GitHub: **Settings → Applications** → Cloudflare Workers & Pages → grant access to **`eft-hack-net`** if you reconnect Git in Cloudflare.
