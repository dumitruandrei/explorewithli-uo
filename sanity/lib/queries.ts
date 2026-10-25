import { groq } from 'next-sanity'

export const destinationsQuery = groq`
  *[_type == "destination"] | order(order asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    region,
    tagline,
    heroImage,
    packages[]{
      groupPrice
    }
  }
`

export const destinationSlugsQuery = groq`
  *[_type == "destination"]{ "slug": slug.current }
`

export const destinationBySlugQuery = groq`
  *[_type == "destination" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    region,
    tagline,
    heroImage,
    description,
    longDescription,
    _updatedAt,
    packages[]{
      title,
      "slug": slug.current,
      image,
      images,
      description,
      itinerary[]{
        day,
        title,
        description,
        activities
      },
      durationDays,
      groupPrice,
      highlights,
      tripHighlights,
      included,
      notIncluded
    }
  }
`

export const reviewsQuery = groq`
  *[_type == "review"] | order(order asc) {
    _id,
    travelerName,
    avatar,
    stars,
    comment,
    googleReviewUrl
  }
`

export const journalPostsQuery = groq`
  *[_type == "journalPost"] | order(featured desc, publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    image,
    category,
    readTime,
    author,
    publishedAt,
    featured,
    tags
  }
`

export const journalPostSlugsQuery = groq`
  *[_type == "journalPost"]{ "slug": slug.current }
`

export const journalPostBySlugQuery = groq`
  *[_type == "journalPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    image,
    category,
    readTime,
    author,
    publishedAt,
    _updatedAt,
    intro,
    content[],
    tags
  }
`

export const sitemapQuery = groq`{
  "destinations": *[_type == "destination" && defined(slug.current)]{
    "slug": slug.current,
    "updatedAt": _updatedAt
  },
  "posts": *[_type == "journalPost" && defined(slug.current)]{
    "slug": slug.current,
    "updatedAt": _updatedAt
  }
}`

export const journalPostsByTagQuery = groq`
  *[_type == "journalPost" && $tagName in tags] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    image,
    category,
    readTime,
    author,
    publishedAt,
    featured,
    tags
  }
`

export const journalTagsQuery = groq`
  array::unique(
    *[_type == "journalPost"].tags[defined(@) && @ != ""]
  )
`
