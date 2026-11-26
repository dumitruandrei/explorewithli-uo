import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, Clock, MapPin, X } from 'lucide-react'
import { PackagePhotoCarousel } from '@/components/package-photo-carousel'
import { SiteHeader } from '@/components/site-header'
import { ContactFooter } from '@/components/contact-footer'
import { ContactForm } from '@/components/contact-form'
import { JsonLd } from '@/components/json-ld'
import { getDestinationNav, getPackage, getPackageParams } from '@/sanity/lib/fetch'
import { SITE_URL, absoluteUrl, breadcrumbJsonLd, buildPageMetadata } from '@/lib/seo'

type Params = Promise<{ slug: string; packageSlug: string }>

export async function generateStaticParams() {
  return getPackageParams()
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug, packageSlug } = await params
  const result = await getPackage(slug, packageSlug)
  if (!result) return {}
  const { destination, pkg } = result
  return buildPageMetadata({
    title:
      pkg.seo.metaTitle ??
      `${pkg.title}: ${pkg.durationDays}-day ${destination.name} trip — Explore with Li`,
    description: pkg.seo.metaDescription ?? pkg.highlights ?? pkg.description,
    path: `/destinations/${destination.slug}/${pkg.urlSlug}`,
    image: pkg.seo.ogImageUrl ?? pkg.ogImageUrl,
    imageAlt: pkg.seo.ogImageAlt ?? pkg.imageAlt,
    noIndex: pkg.seo.noIndex,
  })
}

export default async function PackagePage({ params }: { params: Params }) {
  const { slug, packageSlug } = await params
  const [result, destinations] = await Promise.all([
    getPackage(slug, packageSlug),
    getDestinationNav(),
  ])
  if (!result) notFound()

  const { destination, pkg } = result
  const destinationPath = `/destinations/${destination.slug}`
  const pagePath = `${destinationPath}/${pkg.urlSlug}`
  const [hero] = pkg.gallery

  const tripJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: pkg.title,
    description: pkg.description,
    url: absoluteUrl(pagePath),
    image: pkg.gallery.map((img) => absoluteUrl(img.src)),
    touristType: 'Small group',
    provider: { '@type': 'TravelAgency', name: 'Explore with Li', url: SITE_URL },
    itinerary: {
      '@type': 'ItemList',
      itemListElement: pkg.itinerary.map((day, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `Day ${day.day}: ${day.title}`,
        description: day.description,
      })),
    },
    ...(pkg.groupPrice > 0 && {
      offers: {
        '@type': 'Offer',
        price: pkg.groupPrice,
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: absoluteUrl(pagePath),
        description: `Per person, based on a group of four. ${pkg.durationDays} days.`,
      },
    }),
  }

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Destinations', path: '/#destinations' },
            { name: destination.name, path: destinationPath },
            { name: pkg.title, path: pagePath },
          ]),
          tripJsonLd,
        ]}
      />
      <SiteHeader destinations={destinations} />
      <main>
        <section className="relative flex min-h-[60svh] items-end overflow-hidden">
          <Image
            src={hero?.src || '/placeholder.svg'}
            alt={hero?.alt ?? pkg.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30" />
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-32 sm:px-8">
            <Link
              href={destinationPath}
              className="mb-6 inline-flex items-center gap-2 text-sm text-background/80 transition-colors hover:text-background"
            >
              <ArrowLeft className="size-4" />
              All {destination.name} journeys
            </Link>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-background/80">
              {destination.name}, {destination.region}
            </p>
            <h1 className="mt-2 font-serif text-4xl text-background text-balance sm:text-6xl">
              {pkg.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-background/90">
              <span className="inline-flex items-center gap-2 rounded-full bg-black/25 px-4 py-2 backdrop-blur-sm">
                <Clock className="size-4" aria-hidden />
                {pkg.durationDays} {pkg.durationDays === 1 ? 'day' : 'days'}
              </span>
              {pkg.groupPrice > 0 && (
                <span className="inline-flex items-baseline gap-2 rounded-full bg-background px-4 py-2 text-foreground shadow-lg">
                  <span className="text-sm text-muted-foreground">From</span>
                  <strong className="font-serif text-2xl font-semibold">€{pkg.groupPrice.toLocaleString('en-GB')}</strong>
                  <span className="text-sm text-muted-foreground">/ person</span>
                </span>
              )}
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-14">
            <section aria-labelledby="overview">
              <h2 id="overview" className="font-serif text-3xl text-foreground">
                Overview
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {pkg.description}
              </p>
              {pkg.tripHighlights.length > 0 && (
                <ul className="mt-6 flex flex-col gap-2">
                  {pkg.tripHighlights.map((h) => (
                    <li key={h} className="flex gap-3 text-foreground">
                      <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {pkg.itinerary.length > 0 && (
              <section aria-labelledby="itinerary">
                <h2 id="itinerary" className="font-serif text-3xl text-foreground">
                  Day-by-day itinerary
                </h2>
                <ol className="mt-6 flex flex-col gap-6 border-l border-border pl-6">
                  {pkg.itinerary.map((day) => (
                    <li key={day.day}>
                      <h3 className="font-serif text-xl text-foreground">
                        Day {day.day}: {day.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        {day.description}
                      </p>
                      {day.activities.length > 0 && (
                        <ul className="mt-3 flex flex-col gap-2">
                          {day.activities.map((activity) => (
                            <li key={activity} className="flex items-start gap-2 text-foreground">
                              <MapPin className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {pkg.gallery.length > 0 && (
              <section aria-labelledby="gallery">
                <h2 id="gallery" className="font-serif text-3xl text-foreground">
                  Photos from this journey
                </h2>
                <PackagePhotoCarousel photos={pkg.gallery} title={pkg.title} />
              </section>
            )}

            {(pkg.included?.length || pkg.notIncluded?.length) && (
              <section aria-labelledby="inclusions" className="grid gap-8 sm:grid-cols-2">
                <h2 id="inclusions" className="sr-only">
                  What is included
                </h2>
                {pkg.included && pkg.included.length > 0 && (
                  <div>
                    <h3 className="font-serif text-xl text-foreground">Included</h3>
                    <ul className="mt-3 flex flex-col gap-2">
                      {pkg.included.map((item) => (
                        <li key={item} className="flex gap-3 text-muted-foreground">
                          <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {pkg.notIncluded && pkg.notIncluded.length > 0 && (
                  <div>
                    <h3 className="font-serif text-xl text-foreground">Not included</h3>
                    <ul className="mt-3 flex flex-col gap-2">
                      {pkg.notIncluded.map((item) => (
                        <li key={item} className="flex gap-3 text-muted-foreground">
                          <X className="mt-1 size-4 shrink-0" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-md border border-border bg-card p-6">
              {pkg.groupPrice > 0 && (
                <div className="mb-6 rounded-md bg-secondary/70 p-4">
                  <p className="text-sm text-muted-foreground">Starting price per person</p>
                  <p className="mt-1 font-serif text-3xl font-semibold text-foreground">
                    €{pkg.groupPrice.toLocaleString('en-GB')}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Based on a group of four</p>
                </div>
              )}
              <h2 className="font-serif text-2xl text-card-foreground">Enquire about this journey</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Group size, duration and activities can all be tailored to you.
              </p>
              <div className="mt-6">
                <ContactForm context={pkg.title} compact />
              </div>
              <p className="mt-6 rounded-md bg-secondary p-4 text-sm leading-relaxed text-secondary-foreground">
                Everything about this trip is flexible — the group size, duration and activities can all be tailored to you. Pricing may change accordingly.
              </p>
            </div>
          </aside>
        </div>
      </main>
      <ContactFooter />
    </>
  )
}
