import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import type { TravelPackage } from '@/lib/travel'
import { formatPrice } from '@/lib/travel'

export function PackageCard({
  pkg,
  destinationSlug,
}: {
  pkg: TravelPackage
  destinationName?: string
  destinationSlug: string
}) {
  const packageHref = `/destinations/${destinationSlug}/${pkg.urlSlug}`
  const highlights = pkg.tripHighlights || []

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-md border border-border bg-card transition-shadow focus-within:shadow-xl hover:shadow-xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={pkg.image || '/placeholder.svg'}
          alt={pkg.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-sm font-medium text-foreground backdrop-blur">
          {pkg.durationDays} {pkg.durationDays === 1 ? 'day' : 'days'}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl leading-tight text-card-foreground text-balance">
          <Link
            href={packageHref}
            className="underline-offset-4 outline-none after:absolute after:inset-0 after:content-[''] hover:underline focus-visible:underline"
          >
            {pkg.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {pkg.description}
        </p>

        <ul className="mt-4 space-y-1.5">
          {highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2 text-base text-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <span className="leading-snug">{h}</span>
            </li>
          ))}
          {highlights.length > 3 && (
            <li className="pl-6 text-sm text-muted-foreground">
              + {highlights.length - 3} more highlights
            </li>
          )}
        </ul>

        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between border-t border-border pt-4">
            <p className="font-serif text-2xl text-card-foreground">
              <span className="text-sm text-muted-foreground">From </span>
              {formatPrice(pkg.groupPrice)}
              <span className="text-sm text-muted-foreground"> / person</span>
            </p>
            <span className="flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
              Details
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
