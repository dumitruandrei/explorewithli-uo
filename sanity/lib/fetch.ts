import { cache } from 'react'
import type { SanityImageSource } from '@sanity/image-url'

import { toUrlSlug } from '@/lib/slug'
import type { SeoOverrides, TravelPackage } from '@/lib/travel'

import { client } from './client'
import { sanityImageUrl } from './image'
import {
  destinationBySlugQuery,
  destinationSlugsQuery,
  destinationsQuery,
  journalPostBySlugQuery,
  journalPostsQuery,
  journalPostSlugsQuery,
  journalPostsByTagQuery,
  journalTagsQuery,
  packageParamsQuery,
  reviewsQuery,
  sitemapQuery,
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
  heroImageAlt: string
  packages: { groupPrice: number }[]
}

export type DestinationDetail = {
  slug: string
  name: string
  region: string
  tagline: string
  heroImageUrl: string
  heroImageAlt: string
  ogImageUrl: string
  description: string
  longDescription: string
  updatedAt: string
  seo: SeoOverrides
  packages: TravelPackage[]
}

export type SitemapEntries = {
  destinations: {
    slug: string
    updatedAt: string
    packages: { urlSlug: string }[]
  }[]
  posts: { slug: string; updatedAt: string; tags: string[] }[]
}

type RawImage = SanityImageSource & { alt?: string | null }

type RawSeo = {
  metaTitle?: string | null
  metaDescription?: string | null
  ogImage?: RawImage | null
  noIndex?: boolean | null
} | null

type RawPackageRef = { slug?: string | null; title?: string | null }

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
  imageAlt: string
  category: string
  readTime: string
  author: string
  publishedAt: string
  featured: boolean
  tags: string[]
}

export type JournalPostDetail = JournalPostCard & {
  ogImageUrl: string
  updatedAt: string
  intro: string
  content: any[]
  seo: SeoOverrides
}

type RawDestinationDetail = {
  slug: string
  name: string
  region: string
  tagline: string
  heroImage: RawImage
  description: string
  longDescription: string
  _updatedAt: string
  seo?: RawSeo
    packages: {
      title: string
      slug: string
      image: RawImage
      images?: RawImage[]
      seo?: RawSeo
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
  image: RawImage
  category: string
  readTime: string
  author: string
  publishedAt: string
  featured: boolean
  tags?: string[]
}

type RawJournalPostDetail = RawJournalPostCard & {
  _updatedAt: string
  intro: string
  content: JournalPostDetail['content']
  seo?: RawSeo
}

function altOf(image: RawImage | null | undefined): string | undefined {
  const alt = (image as { alt?: string | null } | null | undefined)?.alt
  return isNonEmptyString(alt) ? alt.trim() : undefined
}

function mapSeo(raw: RawSeo | undefined): SeoOverrides {
  return {
    metaTitle: isNonEmptyString(raw?.metaTitle) ? raw.metaTitle.trim() : undefined,
    metaDescription: isNonEmptyString(raw?.metaDescription)
      ? raw.metaDescription.trim()
      : undefined,
    ogImageUrl: raw?.ogImage
      ? sanityImageUrl(raw.ogImage, { width: 1200, height: 630 })
      : undefined,
    ogImageAlt: altOf(raw?.ogImage),
    noIndex: raw?.noIndex === true,
  }
}

function packageUrlSlug(pkg: RawPackageRef): string {
  return toUrlSlug(pkg.slug || pkg.title || '')
}

function mapDestinationDetail(raw: RawDestinationDetail): DestinationDetail {
  return {
    slug: raw.slug,
    name: raw.name,
    region: raw.region,
    tagline: raw.tagline,
    heroImageUrl: sanityImageUrl(raw.heroImage, { width: 1920, height: 1080 }),
    heroImageAlt: altOf(raw.heroImage) ?? `${raw.name}, ${raw.region}`,
    ogImageUrl: sanityImageUrl(raw.heroImage, { width: 1200, height: 630 }),
    description: raw.description,
    longDescription: raw.longDescription,
    updatedAt: raw._updatedAt,
    seo: mapSeo(raw.seo),
    packages: raw.packages.map((pkg) => ({
      slug: pkg.slug,
      urlSlug: packageUrlSlug(pkg),
      title: pkg.title,
      image: sanityImageUrl(pkg.image, { width: 1200, height: 900 }),
      imageAlt: altOf(pkg.image) ?? `${pkg.title}, ${raw.name}`,
      ogImageUrl: sanityImageUrl(pkg.image, { width: 1200, height: 630 }),
      gallery: [pkg.image, ...(pkg.images ?? [])]
        .filter(Boolean)
        .map((img, i) => ({
          src: sanityImageUrl(img, { width: 1200, height: 900 }),
          alt:
            altOf(img) ??
            (i === 0 ? `${pkg.title}, ${raw.name}` : `${pkg.title}, photo ${i + 1}`),
        })),
      seo: mapSeo(pkg.seo),
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
    imageAlt: altOf(raw.image) ?? raw.title,
    category: raw.category,
    readTime: raw.readTime,
    author: raw.author?.trim(),
    publishedAt: raw.publishedAt,
    featured: raw.featured,
    tags: (raw.tags ?? []).filter(isNonEmptyString),
  }
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== ''
}

function mapJournalPostDetail(raw: RawJournalPostDetail): JournalPostDetail {
  return {
    ...mapJournalPostCard(raw),
    ogImageUrl: sanityImageUrl(raw.image, { width: 1200, height: 630 }),
    updatedAt: raw._updatedAt,
    intro: raw.intro,
    content: raw.content,
    seo: mapSeo(raw.seo),
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
  const raw = await client.fetch<Omit<DestinationCard, 'heroImageAlt'>[]>(
    destinationsQuery,
    {},
    fetchOptions,
  )
  return raw.map((d) => ({
    ...d,
    heroImageAlt: altOf(d.heroImage as RawImage) ?? `${d.name}, ${d.region}`,
  }))
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

export const getJournalPostsByTag = cache(
  async (tag: string): Promise<JournalPostCard[]> => {
    const raw = await client.fetch<RawJournalPostCard[]>(
      journalPostsByTagQuery,
      { tagName: tag },
      fetchOptions,
    )
    return raw.map(mapJournalPostCard)
  },
)

export const getAllJournalTags = cache(async (): Promise<string[]> => {
  const tags = await client.fetch<(string | null)[]>(journalTagsQuery, {}, fetchOptions)
  return tags.filter(isNonEmptyString)
})

export const getPackage = cache(
  async (
    destinationSlug: string,
    packageSlug: string,
  ): Promise<{ destination: DestinationDetail; pkg: TravelPackage } | null> => {
    const destination = await getDestinationBySlug(destinationSlug)
    const pkg = destination?.packages.find((p) => p.urlSlug === packageSlug)
    return destination && pkg ? { destination, pkg } : null
  },
)

export const getPackageParams = cache(
  async (): Promise<{ slug: string; packageSlug: string }[]> => {
    const raw = await client.fetch<{ slug: string; packages: RawPackageRef[] | null }[]>(
      packageParamsQuery,
      {},
      fetchOptions,
    )
    return raw.flatMap((d) =>
      (d.packages ?? [])
        .map((p) => ({ slug: d.slug, packageSlug: packageUrlSlug(p) }))
        .filter((p) => p.packageSlug !== ''),
    )
  },
)

export const getSitemapEntries = cache(async (): Promise<SitemapEntries> => {
  const raw = await client.fetch<{
    destinations: { slug: string; updatedAt: string; packages: RawPackageRef[] | null }[]
    posts: { slug: string; updatedAt: string; tags: (string | null)[] | null }[]
  }>(sitemapQuery, {}, fetchOptions)
  return {
    destinations: raw.destinations.map((d) => ({
      slug: d.slug,
      updatedAt: d.updatedAt,
      packages: (d.packages ?? [])
        .map((p) => ({ urlSlug: packageUrlSlug(p) }))
        .filter((p) => p.urlSlug !== ''),
    })),
    posts: raw.posts.map((p) => ({
      slug: p.slug,
      updatedAt: p.updatedAt,
      tags: (p.tags ?? []).filter(isNonEmptyString),
    })),
  }
})
