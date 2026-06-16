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
      tripHighlights
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
    featured
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
    intro,
    content[]{
      heading,
      paragraphs
    }
  }
`
