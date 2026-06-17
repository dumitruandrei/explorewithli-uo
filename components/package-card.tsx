'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Check, X, Clock, Users, ArrowRight, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import type { TravelPackage } from '@/lib/travel'
import { formatPrice } from '@/lib/travel'
import { ContactForm } from '@/components/contact-form'

export function PackageCard({
  pkg,
  destinationName,
}: {
  pkg: TravelPackage
  destinationName: string
}) {
  const [open, setOpen] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)

  const gallery = [pkg.image, ...(pkg.images || [])].filter(Boolean)

  useEffect(() => {
    if (!open) {
      setImgIndex(0)
    }
  }, [open])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-md border border-border bg-card transition-shadow hover:shadow-xl">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative block aspect-[4/3] w-full overflow-hidden text-left"
          aria-label={`View details for ${pkg.title}`}
        >
          <Image
            src={pkg.image || '/placeholder.svg'}
            alt={pkg.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
            {pkg.durationDays} {pkg.durationDays === 1 ? 'day' : 'days'}
          </span>
        </button>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-serif text-xl leading-tight text-card-foreground text-balance">
            {pkg.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {pkg.description}
          </p>

          <ul className="mt-4 space-y-1.5">
            {(pkg.tripHighlights || []).slice(0, 3).map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                <span className="leading-snug">{h}</span>
              </li>
            ))}
            {(pkg.tripHighlights || []).length > 3 && (
              <li className="pl-6 text-xs text-muted-foreground">
                + {(pkg.tripHighlights || []).length - 3} more highlights
              </li>
            )}
          </ul>

          <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
            <div>
              <p className="text-xs text-muted-foreground">From, group of 4</p>
              <p className="font-serif text-2xl text-card-foreground">
                {formatPrice(pkg.groupPrice)}
                <span className="text-sm text-muted-foreground"> / person</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Details
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </article>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-foreground/60 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={pkg.title}
        >
          <div
            className="relative my-auto w-full max-w-3xl overflow-hidden rounded-lg bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full group/hero">
              <Image
                src={gallery[imgIndex] || '/placeholder.svg'}
                alt={`${pkg.title} - Image ${imgIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              
              {gallery.length > 1 && (
                <>
                  {/* Left arrow */}
                  <button
                    type="button"
                    onClick={() => setImgIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))}
                    aria-label="Previous image"
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-all hover:bg-background hover:scale-105 opacity-0 group-hover/hero:opacity-100 focus:opacity-100"
                  >
                    <ChevronLeft className="size-6" />
                  </button>

                  {/* Right arrow */}
                  <button
                    type="button"
                    onClick={() => setImgIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1))}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-all hover:bg-background hover:scale-105 opacity-0 group-hover/hero:opacity-100 focus:opacity-100"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground transition-colors hover:bg-background z-10"
              >
                <X className="size-5" />
              </button>
              <div className="absolute bottom-0 left-0 p-6 z-10">
                <p className="text-xs font-medium uppercase tracking-wider text-background/80">
                  {destinationName}
                </p>
                <h2 className="mt-1 font-serif text-2xl text-background sm:text-3xl text-balance">
                  {pkg.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-foreground/80">
                  <Clock className="size-4 text-primary" />
                  {pkg.durationDays} {pkg.durationDays === 1 ? 'day' : 'days'} (flexible)
                </span>
                <span className="flex items-center gap-1.5 text-foreground/80">
                  <Users className="size-4 text-primary" />
                  Priced for a group of 4
                </span>
                <span className="flex items-center gap-1.5 font-medium text-foreground">
                  {formatPrice(pkg.groupPrice)} / person
                </span>
              </div>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                {pkg.description} {pkg.highlights}
              </p>

              <h4 className="mt-6 font-serif text-lg text-card-foreground">
                Trip Highlights
              </h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {(pkg.tripHighlights || []).map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span className="leading-snug">{h}</span>
                  </li>
                ))}
              </ul>

              {/* Day-by-day itinerary */}
              <h4 className="mt-8 font-serif text-lg text-card-foreground">
                Your day-by-day itinerary
              </h4>
              <ol className="mt-4 flex flex-col">
                {pkg.itinerary.map((day, i) => (
                  <li key={day.day} className="flex gap-4">
                    {/* Timeline marker */}
                    <div className="flex flex-col items-center">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                        {day.day}
                      </span>
                      {i < pkg.itinerary.length - 1 && (
                        <span
                          aria-hidden
                          className="my-1 w-px flex-1 bg-border"
                        />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="text-xs font-medium uppercase tracking-wider text-primary">
                        Day {day.day}
                      </p>
                      <h5 className="mt-0.5 font-serif text-base text-card-foreground text-balance">
                        {day.title}
                      </h5>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {day.description}
                      </p>
                      <ul className="mt-3 flex flex-col gap-1.5">
                        {day.activities.map((a) => (
                          <li
                            key={a}
                            className="flex items-start gap-2 text-sm text-foreground/80"
                          >
                            <MapPin className="mt-0.5 size-3.5 shrink-0 text-accent" />
                            <span className="leading-snug">{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>

              {/* What's Included & Not Included */}
              {((pkg.included && pkg.included.length > 0) || (pkg.notIncluded && pkg.notIncluded.length > 0)) && (
                <div className="mt-10 border-t border-border pt-8">
                  <h4 className="font-serif text-lg text-card-foreground mb-6">
                    Pricing details & inclusions
                  </h4>
                  <div className="grid gap-8 sm:grid-cols-2">
                    {pkg.included && pkg.included.length > 0 && (
                      <div className="rounded-lg border border-emerald-100 bg-emerald-50/20 p-5 dark:border-emerald-950/30 dark:bg-emerald-950/5">
                        <h5 className="font-medium text-emerald-800 dark:text-emerald-400 flex items-center gap-2 mb-3">
                          <Check className="size-5 shrink-0 text-emerald-600 dark:text-emerald-500" />
                          What’s Included
                        </h5>
                        <ul className="space-y-2.5">
                          {pkg.included.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-foreground/80 leading-relaxed">
                              <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-500/60" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pkg.notIncluded && pkg.notIncluded.length > 0 && (
                      <div className="rounded-lg border border-red-100 bg-red-50/10 p-5 dark:border-red-950/20 dark:bg-red-950/5">
                        <h5 className="font-medium text-red-800 dark:text-red-400 flex items-center gap-2 mb-3">
                          <X className="size-5 shrink-0 text-red-600 dark:text-red-500" />
                          What’s Not Included
                        </h5>
                        <ul className="space-y-2.5">
                          {pkg.notIncluded.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-foreground/80 leading-relaxed">
                              <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-red-400/50" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-6 rounded-md bg-secondary p-4 text-sm leading-relaxed text-secondary-foreground">
                Everything about this trip is flexible — the group size, the
                duration and the activities included can all be tailored to you.
                Pricing may change accordingly.
              </div>

              <div className="mt-8 border-t border-border pt-6">
                <h4 className="font-serif text-xl text-card-foreground">
                  Enquire about this journey
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Share a few details and a specialist will craft your
                  itinerary.
                </p>
                <div className="mt-5">
                  <ContactForm context={pkg.title} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
