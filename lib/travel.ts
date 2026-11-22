export type ItineraryDay = {
  day: number
  title: string
  description: string
  activities: string[]
}

export type ImageWithAlt = { src: string; alt: string }

export type SeoOverrides = {
  metaTitle?: string
  metaDescription?: string
  ogImageUrl?: string
  ogImageAlt?: string
  noIndex: boolean
}

export type TravelPackage = {
  slug: string
  /** Normalised, URL-safe version of `slug` used in /destinations/<dest>/<urlSlug>. */
  urlSlug: string
  title: string
  image: string
  imageAlt: string
  ogImageUrl: string
  /** Main image first, then the additional gallery images. */
  gallery: ImageWithAlt[]
  seo: SeoOverrides
  description: string
  itinerary: ItineraryDay[]
  durationDays: number
  groupPrice: number
  highlights: string
  tripHighlights: string[]
  included?: string[]
  notIncluded?: string[]
}

export type DestinationPricing = {
  packages: { groupPrice: number }[]
}

/** Unique activities across all itinerary days, in first-seen order. */
export function getPackageActivities(
  pkg: Pick<TravelPackage, 'itinerary'>,
): string[] {
  const seen = new Set<string>()
  const activities: string[] = []
  for (const day of pkg.itinerary) {
    for (const activity of day.activities) {
      if (!seen.has(activity)) {
        seen.add(activity)
        activities.push(activity)
      }
    }
  }
  return activities
}

export function getDestinationStartingPrice(
  destination: DestinationPricing,
): number {
  if (!destination.packages?.length) return 0
  return Math.min(...destination.packages.map((pkg) => pkg.groupPrice))
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount)
}
