import { ArrowRight } from 'lucide-react'
import { SiteFooter } from '../components/SiteFooter'
import { HeroSearch } from '../components/HeroSearch'
import { FaqSection } from '../components/FaqSection'
import { guidePath } from '../data/games'
import { CheckoutLink } from '../components/CheckoutLink'
import { HOME_FAQS } from '../data/faqs'
import { HOME_HEADINGS, PRODUCT_PATH, SITE_NAME, SITE_PURPOSE } from '../data/site'
import { BLOGS, blogPath } from '../data/blogs'

export function HomeBelowFoldBottom() {
  return (
    <div className="page-body relative z-10 text-white">
      <section id="picks" className="page-x py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                Forums
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                EFT Hack guides
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                Bigger setup library — Aimbot, ESP, radar hack, raid settings, anti-cheat status and
                loader fixes before you buy.
              </p>
            </div>
            <a
              href="/forums"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white"
            >
              All forums
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </div>

          <div className="relative z-20 mt-8 max-w-xl">
            <HeroSearch placeholder="Search EFT hack guides…" />
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BLOGS.slice(0, 6).map((post) => (
              <a
                key={post.slug}
                href={blogPath(post.slug)}
                className="page-card group flex h-full flex-col rounded-2xl p-5 sm:p-6"
              >
                <p className="text-xs uppercase tracking-wider text-white/45">{post.tag}</p>
                <p className="mt-2 text-lg font-semibold tracking-tight text-white">
                  {post.title}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors group-hover:text-white/80">
                  Read guide
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={1.75}
                  />
                </span>
              </a>
            ))}
          </div>

          <div className="page-card mt-8 flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-lg font-semibold text-white">EFT Hack product</p>
              <p className="mt-1 text-sm text-white/55">
                Detailed features · anti-cheat status · price · checkout
              </p>
            </div>
            <a
              href={guidePath('eft')}
              className="cta-gradient inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white"
            >
              View product details
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="page-band page-x border-t border-white/10 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-2">
          <div className="page-card flex h-full min-h-[240px] flex-col justify-between rounded-2xl p-6 sm:rounded-3xl sm:p-8 lg:p-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                About {SITE_NAME}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {HOME_HEADINGS.h2About}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
                {SITE_PURPOSE} Clear features, honest status labels, and deep forums for setup. Then
                check{' '}
                <a href={PRODUCT_PATH} className="text-white/80 underline-offset-2 hover:underline">
                  the EFT feature list
                </a>
                ,{' '}
                <a href="/reviews" className="text-white/80 underline-offset-2 hover:underline">
                  reviews
                </a>
                , or{' '}
                <a href="/support" className="text-white/80 underline-offset-2 hover:underline">
                  loader help
                </a>
                .
              </p>
            </div>
            <a
              href={guidePath('eft')}
              className="mt-8 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-white hover:text-white/80"
            >
              See EFT product details
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </div>

          <div
            id="access"
            className="page-card flex h-full min-h-[240px] flex-col justify-between rounded-2xl p-6 sm:rounded-3xl sm:p-8 lg:p-10"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                Checkout
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {HOME_HEADINGS.h2Access}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
                Confirm EFT Hack anti-cheat status is clear to load, then checkout for digital delivery
                on supported Windows builds — worldwide.
              </p>
            </div>
            <CheckoutLink className="cta-gradient mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:w-fit">
              Get EFT Hack license
            </CheckoutLink>
          </div>
        </div>
      </section>

      <FaqSection
        id="faq"
        heading={HOME_HEADINGS.h2Faq}
        intro="anti-cheat status, Aimbot and ESP, servers, delivery and checkout — before you buy."
        items={HOME_FAQS}
        moreHref="/faq"
        moreLabel="Full FAQ →"
      />

      <SiteFooter currentPath="/" />
    </div>
  )
}
