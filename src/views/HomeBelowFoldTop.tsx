import { Crosshair, Eye, Radar, Sparkles } from 'lucide-react'
import { HOME_HEADINGS } from '../data/site'

const FEATURES = [
  {
    icon: Crosshair,
    label: 'EFT Aimbot',
    desc: 'Silent aim with FOV, smoothing and bone selection — shots land near an enemy and still look legit.',
  },
  {
    icon: Eye,
    label: 'ESP / Wallhack',
    desc: 'Player boxes, distance and health through walls — loot value and quest markers when supported.',
  },
  {
    icon: Radar,
    label: 'Radar hack',
    desc: '2D radar for off-screen PMCs so flanks stop ending your raids on Customs and Woods.',
  },
  {
    icon: Sparkles,
    label: 'anti-cheat status',
    desc: 'We publish live anti-cheat status after Tarkov patches — clear to load, or wait.',
  },
] as const

export function HomeBelowFoldTop() {
  return (
    <div className="page-body relative z-10 text-white">
      <section className="page-band page-x border-t border-z-soft/15 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {HOME_HEADINGS.h2Features}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="page-card flex h-full min-h-[168px] flex-col rounded-2xl p-5"
              >
                <div className="icon-well mb-4">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
