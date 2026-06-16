import {existsSync, readFileSync} from 'fs'
import {join} from 'path'
import {getCliClient} from 'sanity/cli'

import type { TravelPackage } from '../lib/travel'
import {
  blogPosts,
  destinations,
  reviews,
} from './seed-data'

function loadEnvFile() {
  const envPath = join(process.cwd(), '.env.local')
  if (!existsSync(envPath)) return

  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = value
  }
}

loadEnvFile()

const client = getCliClient({apiVersion: '2026-06-15'})

type SanityImageField = {
  _type: 'image'
  asset: {
    _type: 'reference'
    _ref: string
  }
}

const imageCache = new Map<string, SanityImageField>()

async function uploadImage(
  source: string,
  filename: string,
): Promise<SanityImageField> {
  const cacheKey = `${source}::${filename}`
  const cached = imageCache.get(cacheKey)
  if (cached) return cached

  let buffer: Buffer
  let contentType = 'image/png'

  if (source.startsWith('http://') || source.startsWith('https://')) {
    const response = await fetch(source)
    if (!response.ok) {
      throw new Error(`Failed to fetch image ${source}: ${response.status}`)
    }
    buffer = Buffer.from(await response.arrayBuffer())
    contentType = response.headers.get('content-type') || contentType
  } else {
    const localPath = join(process.cwd(), 'public', source.replace(/^\//, ''))
    if (existsSync(localPath)) {
      buffer = readFileSync(localPath)
    } else {
      const seed = filename.replace(/\.[^.]+$/, '') || 'explore-with-li'
      console.warn(`  ↳ local image missing (${source}), using placeholder for ${filename}`)
      const response = await fetch(
        `https://picsum.photos/seed/${encodeURIComponent(seed)}/1600/900`,
      )
      if (!response.ok) {
        throw new Error(`Failed to fetch placeholder for ${filename}`)
      }
      buffer = Buffer.from(await response.arrayBuffer())
      contentType = response.headers.get('content-type') || 'image/jpeg'
    }
  }

  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType,
  })

  const image: SanityImageField = {
    _type: 'image' as const,
    asset: {
      _type: 'reference' as const,
      _ref: asset._id,
    },
  }

  imageCache.set(cacheKey, image)
  return image
}

function parsePublishedAt(date: string) {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid date: ${date}`)
  }
  return parsed.toISOString()
}

async function mapPackage(pkg: TravelPackage) {
  const images = pkg.images
    ? await Promise.all(
        pkg.images.map((img, i) =>
          uploadImage(img, `${pkg.slug}-gallery-${i}.png`),
        ),
      )
    : undefined

  return {
    _type: 'travelPackage' as const,
    _key: pkg.slug,
    title: pkg.title,
    slug: {_type: 'slug' as const, current: pkg.slug},
    image: await uploadImage(pkg.image, `${pkg.slug}.png`),
    images,
    description: pkg.description,
    itinerary: pkg.itinerary.map((day) => ({
      _type: 'itineraryDay' as const,
      _key: `day-${day.day}`,
      day: day.day,
      title: day.title,
      description: day.description,
      activities: day.activities,
    })),
    durationDays: pkg.durationDays,
    groupPrice: pkg.groupPrice,
    highlights: pkg.highlights,
    tripHighlights: pkg.tripHighlights,
  }
}

async function seedDestinations() {
  console.log(`Seeding ${destinations.length} destinations…`)

  for (const [index, destination] of destinations.entries()) {
    console.log(`  • ${destination.name}`)
    const packages = await Promise.all(destination.packages.map(mapPackage))

    await client.createOrReplace({
      _id: `destination-${destination.slug}`,
      _type: 'destination',
      name: destination.name,
      slug: {_type: 'slug', current: destination.slug},
      region: destination.region,
      tagline: destination.tagline,
      heroImage: await uploadImage(
        destination.heroImage,
        `${destination.slug}-hero.png`,
      ),
      description: destination.description,
      longDescription: destination.longDescription,
      packages,
      order: index,
    })
  }
}

async function seedReviews() {
  console.log(`Seeding ${reviews.length} reviews…`)

  for (const [index, review] of reviews.entries()) {
    console.log(`  • ${review.travelerName}`)
    await client.createOrReplace({
      _id: review.id,
      _type: 'review',
      travelerName: review.travelerName,
      avatar: await uploadImage(review.avatar, `${review.id}-avatar.svg`),
      stars: review.stars,
      comment: review.comment,
      googleReviewUrl: review.googleReviewUrl,
      order: index,
    })
  }
}

async function seedJournalPosts() {
  console.log(`Seeding ${blogPosts.length} journal posts…`)

  for (const [index, post] of blogPosts.entries()) {
    console.log(`  • ${post.title}`)
    await client.createOrReplace({
      _id: `journalPost-${post.slug}`,
      _type: 'journalPost',
      title: post.title,
      slug: {_type: 'slug', current: post.slug},
      excerpt: post.excerpt,
      image: await uploadImage(post.image, `${post.slug}-cover.png`),
      category: post.category,
      readTime: post.readTime,
      author: post.author,
      publishedAt: parsePublishedAt(post.date),
      intro: post.intro,
      content: post.content.map((section, sectionIndex) => ({
        _type: 'journalSection' as const,
        _key: `section-${sectionIndex}`,
        heading: section.heading,
        paragraphs: section.paragraphs,
      })),
      featured: index === 0,
    })
  }
}

async function seed() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local')
  }
  if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET in .env.local')
  }

  console.log('Seeding Sanity dataset…')
  await seedDestinations()
  await seedReviews()
  await seedJournalPosts()
  console.log('Done.')
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
