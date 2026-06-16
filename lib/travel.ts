export type ItineraryDay = {
  day: number
  title: string
  description: string
  activities: string[]
}

export type TravelPackage = {
  slug: string
  title: string
  image: string
  description: string
  itinerary: ItineraryDay[]
  durationDays: number
  groupPrice: number
  highlights: string
  tripHighlights: string[]
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
