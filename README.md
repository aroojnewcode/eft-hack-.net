# EFT Hack (efthack.net)

Static Astro site for Escape From Tarkov — Aimbot, ESP, wallhack, radar — deployed with Cloudflare Workers.

```bash
npm install
npm run dev
npm run build
npx wrangler deploy
```

## Cloudflare deploy: Error 100117 / Error 1000 (DNS)

If **`wrangler deploy`** fails with *Hostname already has externally managed DNS records* **\[100117]**, or the site shows **Error 1000** (*DNS points to prohibited IP*):

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **efthack.net** → **DNS** → **Records**.
2. For **`@`** and **`www`**, **delete** manual **A/AAAA** records that point at Cloudflare IPs (`104.*`, `172.67.*`) or other wrong origins.
3. Keep the zone **proxied** (orange cloud). Use **Workers & Pages** → worker **`eft-hack--net`** → **Settings** → **Domains & Routes** and confirm **`efthack.net`** / **`www.efthack.net`** routes exist (or add **Custom Domains** after DNS is clean).
4. Redeploy from **Workers Builds** or push to the connected Git branch.

`wrangler.toml` uses **zone routes** (not `custom_domain = true`) so deploy does not fight existing DNS rows.

## Cloudflare: “repository no longer exists”

Cloudflare still points at an old GitHub repo. Fix it in the dashboard (not in code):

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → your worker (`eft-hack--net`).
2. **Settings** → **Builds** → **Disconnect** the broken Git repository.
3. Either **Connect** again and choose **`aroojnewcode/eft-hack-net`** / branch **`main`**, or leave Git disconnected and use **GitHub Actions** (`.github/workflows/deploy.yml`).
4. On GitHub: **Settings → Secrets and variables → Actions** — add `CLOUDFLARE_API_TOKEN` (Workers edit) and `CLOUDFLARE_ACCOUNT_ID` (dashboard URL).
5. On GitHub: **Settings → Applications** → Cloudflare Workers & Pages → grant access to **`eft-hack-net`** if you reconnect Git in Cloudflare.
