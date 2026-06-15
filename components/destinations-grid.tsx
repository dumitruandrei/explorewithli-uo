import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { destinations, formatPrice, getDestinationStartingPrice } from '@/lib/destinations'

export function DestinationsGrid() {
  return (
    <section id="destinations" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Destinations
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance sm:text-5xl">
              Three regions, endless ways to wander
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Each destination is a starting point. Choose a region, then shape
            the journey — group size, duration and activities are always yours
            to decide.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <Link
              key={d.slug}
              href={`/destinations/${d.slug}`}
              className="group relative flex flex-col justify-end overflow-hidden rounded-lg border border-border"
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={d.heroImage || '/placeholder.svg'}
                  alt={`${d.name}, ${d.region}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-background/75">
                      {d.region}
                    </p>
                    <h3 className="mt-1 font-serif text-2xl text-background">
                      {d.name}
                    </h3>
                  </div>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background/90 text-foreground transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
                <p className="mt-2 text-sm leading-snug text-background/85">
                  {d.tagline}
                </p>
                <p className="mt-4 text-sm text-background/90">
                  From{' '}
                  <span className="font-serif text-lg text-background">
                    {formatPrice(getDestinationStartingPrice(d))}
                  </span>{' '}
                  / person
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
