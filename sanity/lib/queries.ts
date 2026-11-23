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
    seo{metaTitle, metaDescription, ogImage, noIndex},
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
      notIncluded,
      seo{metaTitle, metaDescription, ogImage, noIndex}
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
    "category": coalesce(categoryRef->title, category),
    readTime,
    "author": coalesce(authorRef->name, author),
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
    "category": coalesce(categoryRef->title, category),
    readTime,
    "author": coalesce(authorRef->name, author),
    publishedAt,
    _updatedAt,
    intro,
    "content": coalesce(body, content),
    tags,
    seo{metaTitle, metaDescription, ogImage, noIndex}
  }
`

export const sitemapQuery = groq`{
  "destinations": *[_type == "destination" && defined(slug.current) && seo.noIndex != true]{
    "slug": slug.current,
    "updatedAt": _updatedAt,
    "packages": packages[seo.noIndex != true]{ "slug": slug.current, title }
  },
  "posts": *[_type == "journalPost" && defined(slug.current) && seo.noIndex != true]{
    "slug": slug.current,
    "updatedAt": _updatedAt,
    tags
  }
}`

export const journalPostsByTagQuery = groq`
  *[_type == "journalPost" && $tagName in tags] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    image,
    "category": coalesce(categoryRef->title, category),
    readTime,
    "author": coalesce(authorRef->name, author),
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

export const packageParamsQuery = groq`
  *[_type == "destination" && defined(slug.current)]{
    "slug": slug.current,
    "packages": packages[]{ "slug": slug.current, title }
  }
`
