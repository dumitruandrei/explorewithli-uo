import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { groupTour } from '@/lib/group-tour-content'

export function GroupTourBanner() {
  return (
    <section
      aria-label="Group tours 2027"
      className="bg-[oklch(0.24_0.042_148)] pt-24 text-white sm:pt-[104px]"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 pb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 sm:pb-7">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative hidden size-16 shrink-0 overflow-hidden rounded-md sm:block">
            <Image
              src="/images/group-tour/tea-terraces.png"
              alt=""
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.8_0.12_148)]">
              Group tours 2027
            </p>
            <h2 className="mt-1 font-serif text-xl leading-snug text-balance sm:text-2xl">
              Join us on {groupTour.title}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-white/75">
              14 days through Southwest China with a small group. Four
              departures in spring and autumn.
            </p>
          </div>
        </div>

        <Link
          href="/group-tour"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-md bg-[oklch(0.975_0.002_90)] px-5 text-sm font-medium text-[oklch(0.24_0.042_148)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.24_0.042_148)] sm:self-auto"
        >
          Discover our group tours
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  )
}
