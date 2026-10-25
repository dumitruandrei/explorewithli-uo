import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { ContactFooter } from '@/components/contact-footer'
import { PackageCard } from '@/components/package-card'
import { JsonLd } from '@/components/json-ld'
import {
  getDestinationBySlug,
  getDestinations,
  getDestinationSlugs,
  getJournalPosts,
  type JournalPostCard,
} from '@/sanity/lib/fetch'
import { sanityImageUrl } from '@/sanity/lib/image'
import { SITE_URL, absoluteUrl, breadcrumbJsonLd, buildPageMetadata } from '@/lib/seo'

function relatedPostsFor(destinationName: string, posts: JournalPostCard[]) {
  const needle = destinationName.toLowerCase()
  const matches = posts.filter((p) =>
    [p.title, p.excerpt, ...p.tags].some((text) => text?.toLowerCase().includes(needle)),
  )
  return (matches.length > 0 ? matches : posts).slice(0, 3)
}

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
  return buildPageMetadata({
    title: `${destination.name} — Explore with Li`,
    description: destination.description,
    path: `/destinations/${destination.slug}`,
    image: destination.ogImageUrl,
    imageAlt: `${destination.name}, ${destination.region}`,
  })
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [destination, allDestinations, posts] = await Promise.all([
    getDestinationBySlug(slug),
    getDestinations(),
    getJournalPosts(),
  ])

  if (!destination) notFound()

  const destinations = allDestinations.map(({ slug, name, tagline }) => ({
    slug,
    name,
    tagline,
  }))
  const otherDestinations = allDestinations.filter((d) => d.slug !== destination.slug)
  const relatedPosts = relatedPostsFor(destination.name, posts)
  const pagePath = `/destinations/${destination.slug}`

  const tripsJsonLd = destination.packages.map((pkg) => ({
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: pkg.title,
    description: pkg.description,
    image: pkg.image.startsWith('/') ? absoluteUrl(pkg.image) : pkg.image,
    url: absoluteUrl(pagePath),
    touristType: ['Cultural tourism', 'Food tourism', 'Nature tourism'],
    provider: { '@id': `${SITE_URL}/#organization` },
    ...(pkg.itinerary?.length > 0 && {
      itinerary: {
        '@type': 'ItemList',
        numberOfItems: pkg.itinerary.length,
        itemListElement: pkg.itinerary.map((day, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'TouristAttraction',
            name: `Day ${day.day}: ${day.title}`,
            description: day.description,
          },
        })),
      },
    }),
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
  }))

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Destinations', path: '/#destinations' },
            { name: destination.name, path: pagePath },
          ]),
          ...tripsJsonLd,
        ]}
      />
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30" />
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
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
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

        {relatedPosts.length > 0 && (
          <section className="bg-background py-16 sm:py-24" aria-labelledby="related-articles">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                    From the Journal
                  </p>
                  <h2
                    id="related-articles"
                    className="font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl"
                  >
                    Read before you go to {destination.name}
                  </h2>
                </div>
                <Link
                  href="/journal"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  All articles
                  <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/journal/${post.slug}`}
                    className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        sizes="(min-width: 640px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-xs font-medium uppercase tracking-wider text-primary">
                        {post.category}
                      </p>
                      <h3 className="mt-2 font-serif text-lg leading-snug text-card-foreground text-balance">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {otherDestinations.length > 0 && (
          <section className="bg-secondary py-16 sm:py-24" aria-labelledby="other-destinations">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Keep exploring
              </p>
              <h2
                id="other-destinations"
                className="font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl"
              >
                More destinations in China
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {otherDestinations.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/destinations/${d.slug}`}
                    className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-lg"
                  >
                    <Image
                      src={sanityImageUrl(d.heroImage, { width: 900, height: 675 })}
                      alt={`${d.name}, ${d.region}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="relative p-5">
                      <p className="text-xs font-medium uppercase tracking-wider text-background/80">
                        {d.region}
                      </p>
                      <h3 className="mt-1 font-serif text-2xl text-background">{d.name}</h3>
                      <p className="mt-1 text-sm text-background/85">{d.tagline}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <ContactFooter />
    </>
  )
}
