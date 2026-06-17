import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { ContactFooter } from '@/components/contact-footer'
import { PackageCard } from '@/components/package-card'
import { ContactForm } from '@/components/contact-form'
import {
  getDestinationBySlug,
  getDestinationNav,
  getDestinationSlugs,
} from '@/sanity/lib/fetch'

export async function generateStaticParams() {
  const slugs = await getDestinationSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const destination = await getDestinationBySlug(slug)
  if (!destination) return {}
  return {
    title: `${destination.name} — Explore with Li`,
    description: destination.description,
  }
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [destination, destinations] = await Promise.all([
    getDestinationBySlug(slug),
    getDestinationNav(),
  ])

  if (!destination) notFound()

  return (
    <>
      <SiteHeader destinations={destinations} />
      <main>
        <section className="relative flex min-h-[70svh] items-end overflow-hidden">
          <Image
            src={destination.heroImageUrl}
            alt={`${destination.name}, ${destination.region}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-foreground/30" />
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-32 sm:px-8">
            <Link
              href="/#destinations"
              className="mb-6 inline-flex items-center gap-2 text-sm text-background/80 transition-colors hover:text-background"
            >
              <ArrowLeft className="size-4" />
              All destinations
            </Link>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-background/80">
              {destination.region}
            </p>
            <h1 className="mt-2 font-serif text-4xl text-background text-balance sm:text-6xl">
              {destination.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-background/85 sm:text-lg">
              {destination.longDescription}
            </p>
          </div>
        </section>

        <section className="bg-secondary py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Travel packages
              </p>
              <h2 className="font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl">
                Curated journeys through {destination.name}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Prices shown are per person based on a group of four. Tap any
                journey for the full itinerary and to enquire.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {destination.packages.map((pkg) => (
                <PackageCard
                  key={pkg.slug}
                  pkg={pkg}
                  destinationName={destination.name}
                />
              ))}
            </div>

            <div className="mt-10 rounded-md border border-border bg-card p-5 text-center text-sm leading-relaxed text-muted-foreground">
              Everything is flexible — the group size, trip duration and
              activities included can all be tailored to you. Pricing may change
              accordingly.
            </div>
          </div>
        </section>

        <section className="bg-background py-16 sm:py-24">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Enquire
              </p>
              <h2 className="font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl">
                Design your {destination.name} journey
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Share your travel dates, group size and the experiences you’d
                love. A local specialist will craft a flexible itinerary built
                around you.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
              <ContactForm context={`a trip to ${destination.name}`} />
            </div>
          </div>
        </section>
      </main>
      <ContactFooter />
    </>
  )
}
