import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Sparkles } from 'lucide-react'
import { PackagePhotoCarousel } from '@/components/package-photo-carousel'
import { PackageCard } from '@/components/package-card'
import { SiteHeader } from '@/components/site-header'
import { ContactFooter } from '@/components/contact-footer'
import { ContactForm } from '@/components/contact-form'
import { JsonLd } from '@/components/json-ld'
import { KeyFacts } from '@/components/package/key-facts'
import { FlexibilityCallout } from '@/components/package/flexibility-callout'
import { ItineraryTimeline } from '@/components/package/itinerary-timeline'
import { Inclusions } from '@/components/package/inclusions'
import { MobileEnquireBar } from '@/components/package/mobile-enquire-bar'
import { getDestinationNav, getPackage, getPackageParams } from '@/sanity/lib/fetch'
import { formatPrice } from '@/lib/travel'
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

function SectionHeading({ id, eyebrow, children }: { id: string; eyebrow: string; children: string }) {
  return (
    <>
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 id={id} className="mt-2 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl">
        {children}
      </h2>
    </>
  )
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
  const otherPackages = destination.packages.filter((p) => p.urlSlug !== pkg.urlSlug).slice(0, 3)
  const hasMosaic = pkg.gallery.length > 1
  const hasInclusions = Boolean(pkg.included?.length || pkg.notIncluded?.length)

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
      <main className="pb-24 lg:pb-0">
        <section className="relative flex min-h-[52svh] items-end overflow-hidden sm:min-h-[60svh]">
          <Image
            src={hero?.src || '/placeholder.svg'}
            alt={hero?.alt ?? pkg.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30" />
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-28 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-1 text-sm text-background/80">
                <li>
                  <Link href="/" className="transition-colors hover:text-background">
                    Home
                  </Link>
                </li>
                <ChevronRight className="size-3.5" aria-hidden />
                <li>
                  <Link href={destinationPath} className="transition-colors hover:text-background">
                    {destination.name}
                  </Link>
                </li>
              </ol>
            </nav>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-background/80">
              {destination.name}, {destination.region}
            </p>
            <h1 className="mt-2 max-w-4xl font-serif text-4xl text-background text-balance sm:text-6xl">
              {pkg.title}
            </h1>
          </div>
        </section>

        <div className="relative z-10 mx-auto -mt-20 max-w-7xl px-5 sm:-mt-24 sm:px-8">
          <KeyFacts price={pkg.groupPrice} durationDays={pkg.durationDays} />
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="flex min-w-0 flex-col gap-16 sm:gap-20">
            <section aria-labelledby="overview">
              <SectionHeading id="overview" eyebrow="The journey">
                Overview
              </SectionHeading>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{pkg.description}</p>
              {pkg.tripHighlights.length > 0 && (
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {pkg.tripHighlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 rounded-[1.25rem] bg-secondary/70 p-4 leading-snug text-foreground"
                    >
                      <span
                        aria-hidden
                        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-background text-primary"
                      >
                        <Sparkles className="size-4" />
                      </span>
                      <span className="pt-1">{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <FlexibilityCallout />

            {hasMosaic && (
              <section aria-labelledby="gallery">
                <SectionHeading id="gallery" eyebrow="A little preview">
                  Photos from this journey
                </SectionHeading>
                <PackagePhotoCarousel photos={pkg.gallery} title={pkg.title} startIndex={1} />
              </section>
            )}

            {pkg.itinerary.length > 0 && (
              <section aria-labelledby="itinerary">
                <SectionHeading id="itinerary" eyebrow="Day by day">
                  Your itinerary
                </SectionHeading>
                <ItineraryTimeline days={pkg.itinerary} />
              </section>
            )}

            {hasInclusions && (
              <section aria-labelledby="inclusions">
                <SectionHeading id="inclusions" eyebrow="Good to know">
                  What&apos;s in the price
                </SectionHeading>
                <Inclusions included={pkg.included} notIncluded={pkg.notIncluded} />
              </section>
            )}
          </div>

          <aside id="enquire" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.75rem] border border-border bg-card p-6 shadow-lg shadow-foreground/5 sm:p-8">
              {pkg.groupPrice > 0 && (
                <div className="mb-6 rounded-[1.25rem] bg-secondary/70 p-4">
                  <p className="text-sm text-muted-foreground">From, per person</p>
                  <p className="mt-1 font-serif text-3xl font-semibold text-foreground">
                    {formatPrice(pkg.groupPrice)}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Priced for a group of four · {pkg.durationDays}{' '}
                    {pkg.durationDays === 1 ? 'day' : 'days'}
                  </p>
                </div>
              )}
              <h2 className="font-serif text-2xl text-card-foreground">Enquire about this journey</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Share a few details and a specialist will craft your tailored itinerary. Group
                size, duration and activities are all flexible.
              </p>
              <div className="mt-6">
                <ContactForm context={pkg.title} compact />
              </div>
            </div>
          </aside>
        </div>

        {otherPackages.length > 0 && (
          <section className="bg-secondary py-14 sm:py-20" aria-labelledby="more-journeys">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <SectionHeading id="more-journeys" eyebrow={destination.name}>
                {`More journeys in ${destination.name}`}
              </SectionHeading>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {otherPackages.map((other) => (
                  <PackageCard key={other.slug} pkg={other} destinationSlug={destination.slug} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <MobileEnquireBar priceLabel={pkg.groupPrice > 0 ? formatPrice(pkg.groupPrice) : null} />
      <ContactFooter />
    </>
  )
}
