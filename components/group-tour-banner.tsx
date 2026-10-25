import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CalendarDays, Users } from 'lucide-react'
import { groupTour } from '@/lib/group-tour-content'

export function GroupTourBanner() {
  return (
    <section
      aria-label="Group tours 2027"
      className="px-5 pb-0 pt-10 sm:px-8 sm:pt-14"
    >
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[oklch(0.24_0.042_148)] text-white shadow-2xl shadow-black/25 ring-1 ring-white/10">
        <Image
          src="/images/group-tour/rice-terraces-sunset.jpg"
          alt=""
          fill
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="object-cover object-right"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[oklch(0.2_0.045_148)] via-[oklch(0.2_0.045_148)]/90 to-[oklch(0.2_0.045_148)]/30 max-sm:from-[oklch(0.2_0.045_148)]/95 max-sm:via-[oklch(0.2_0.045_148)]/90 max-sm:to-[oklch(0.2_0.045_148)]/80"
        />

        <div className="relative flex flex-col gap-8 px-6 py-9 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-14 lg:py-14">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.8_0.12_148)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[oklch(0.2_0.045_148)]">
              <CalendarDays className="size-3.5" />
              Group tours 2027
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-balance sm:text-4xl lg:text-5xl">
              Join us on {groupTour.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
              14 days through Southwest China, with four departures in spring
              and autumn.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[oklch(0.88_0.1_148)] sm:text-base">
              <Users className="size-5" />
              Small groups of 14 guests at most
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-5 lg:items-end">
            <p className="flex flex-col lg:items-end">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                Starting from
              </span>
              <span className="mt-1 font-serif text-4xl leading-none text-white sm:text-5xl">
                {groupTour.priceEur}
              </span>
              <span className="mt-1.5 text-sm text-white/70">per person</span>
            </p>
            <Link
              href="/group-tour"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-md bg-[oklch(0.975_0.002_90)] px-8 text-base font-semibold text-[oklch(0.24_0.042_148)] shadow-lg transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.24_0.042_148)]"
            >
              Discover our group tours
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
