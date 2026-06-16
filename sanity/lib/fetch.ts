import { cache } from 'react'
import type { SanityImageSource } from '@sanity/image-url'

import type { TravelPackage } from '@/lib/travel'

import { client } from './client'
import { sanityImageUrl } from './image'
import {
  destinationBySlugQuery,
  destinationSlugsQuery,
  destinationsQuery,
  journalPostBySlugQuery,
  journalPostSlugsQuery,
  journalPostsQuery,
  reviewsQuery,
} from './queries'

const fetchOptions = { next: { revalidate: 60 } as const }

export type DestinationNav = {
  slug: string
  name: string
  tagline: string
}

export type DestinationCard = DestinationNav & {
  _id: string
  region: string
  heroImage: SanityImageSource
  packages: { groupPrice: number }[]
}

export type DestinationDetail = {
  slug: string
  name: string
  region: string
  tagline: string
  heroImageUrl: string
  description: string
  longDescription: string
  packages: TravelPackage[]
}

export type Review = {
  id: string
  travelerName: string
  avatarUrl: string
  stars: number
  comment: string
  googleReviewUrl: string
}

export type JournalPostCard = {
  id: string
  slug: string
  title: string
  excerpt: string
  imageUrl: string
  category: string
  readTime: string
  author: string
  publishedAt: string
  featured: boolean
}

export type JournalPostDetail = JournalPostCard & {
  intro: string
  content: any[]
}

type RawDestinationDetail = {
  slug: string
  name: string
  region: string
  tagline: string
  heroImage: SanityImageSource
  description: string
  longDescription: string
    packages: {
      title: string
      slug: string
      image: SanityImageSource
      images?: SanityImageSource[]
      description: string
      itinerary: TravelPackage['itinerary']
      durationDays: number
      groupPrice: number
      highlights: string
      tripHighlights: string[]
      included?: string[]
      notIncluded?: string[]
    }[]
}

type RawReview = {
  _id: string
  travelerName: string
  avatar: SanityImageSource
  stars: number
  comment: string
  googleReviewUrl: string
}

type RawJournalPostCard = {
  _id: string
  slug: string
  title: string
  excerpt: string
  image: SanityImageSource
  category: string
  readTime: string
  author: string
  publishedAt: string
  featured: boolean
}

type RawJournalPostDetail = RawJournalPostCard & {
  intro: string
  content: JournalPostDetail['content']
}

function mapDestinationDetail(raw: RawDestinationDetail): DestinationDetail {
  return {
    slug: raw.slug,
    name: raw.name,
    region: raw.region,
    tagline: raw.tagline,
    heroImageUrl: sanityImageUrl(raw.heroImage, { width: 1920, height: 1080 }),
    description: raw.description,
    longDescription: raw.longDescription,
    packages: raw.packages.map((pkg) => ({
      slug: pkg.slug,
      title: pkg.title,
      image: sanityImageUrl(pkg.image, { width: 1200, height: 900 }),
      images: pkg.images ? pkg.images.map((img) => sanityImageUrl(img, { width: 1200, height: 900 })) : [],
      description: pkg.description,
      itinerary: pkg.itinerary,
      durationDays: pkg.durationDays,
      groupPrice: pkg.groupPrice,
      highlights: pkg.highlights,
      tripHighlights: pkg.tripHighlights,
      included: pkg.included || [],
      notIncluded: pkg.notIncluded || [],
    })),
  }
}

function mapReview(raw: RawReview): Review {
  return {
    id: raw._id,
    travelerName: raw.travelerName,
    avatarUrl: sanityImageUrl(raw.avatar, { width: 80, height: 80 }),
    stars: raw.stars,
    comment: raw.comment,
    googleReviewUrl: raw.googleReviewUrl,
  }
}

function mapJournalPostCard(raw: RawJournalPostCard): JournalPostCard {
  return {
    id: raw._id,
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    imageUrl: sanityImageUrl(raw.image, { width: 1200, height: 750 }),
    category: raw.category,
    readTime: raw.readTime,
    author: raw.author,
    publishedAt: raw.publishedAt,
    featured: raw.featured,
  }
}

function mapJournalPostDetail(raw: RawJournalPostDetail): JournalPostDetail {
  return {
    ...mapJournalPostCard(raw),
    intro: raw.intro,
    content: raw.content,
  }
}

export function formatJournalDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(isoDate))
}

export const getDestinations = cache(async (): Promise<DestinationCard[]> => {
  return client.fetch<DestinationCard[]>(
    destinationsQuery,
    {},
    fetchOptions,
  )
})

export const getDestinationNav = cache(async (): Promise<DestinationNav[]> => {
  const destinations = await getDestinations()
  return destinations.map(({ slug, name, tagline }) => ({
    slug,
    name,
    tagline,
  }))
})

export const getDestinationSlugs = cache(
  async (): Promise<{ slug: string }[]> => {
    return client.fetch<{ slug: string }[]>(
      destinationSlugsQuery,
      {},
      fetchOptions,
    )
  },
)

export const getDestinationBySlug = cache(
  async (slug: string): Promise<DestinationDetail | null> => {
    const raw = await client.fetch<RawDestinationDetail | null>(
      destinationBySlugQuery,
      { slug },
      fetchOptions,
    )
    return raw ? mapDestinationDetail(raw) : null
  },
)

export const getReviews = cache(async (): Promise<Review[]> => {
  const raw = await client.fetch<RawReview[]>(reviewsQuery, {}, fetchOptions)
  return raw.map(mapReview)
})

export const getJournalPosts = cache(async (): Promise<JournalPostCard[]> => {
  const raw = await client.fetch<RawJournalPostCard[]>(
    journalPostsQuery,
    {},
    fetchOptions,
  )
  return raw.map(mapJournalPostCard)
})

export const getJournalPostSlugs = cache(
  async (): Promise<{ slug: string }[]> => {
    return client.fetch<{ slug: string }[]>(
      journalPostSlugsQuery,
      {},
      fetchOptions,
    )
  },
)

export const getJournalPostBySlug = cache(
  async (slug: string): Promise<JournalPostDetail | null> => {
    const raw = await client.fetch<RawJournalPostDetail | null>(
      journalPostBySlugQuery,
      { slug },
      fetchOptions,
    )
    return raw ? mapJournalPostDetail(raw) : null
  },
)
