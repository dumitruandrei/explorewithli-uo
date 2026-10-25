import type { Metadata } from 'next'

export const SITE_URL = 'https://www.explorechongqingwithli.com'
export const SITE_NAME = 'Explore with Li'
export const DEFAULT_OG_IMAGE = '/images/hero-china.png'

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

type PageMetadataInput = {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
}

// Next.js replaces (not merges) the parent openGraph object, so every page
// rebuilds the full set of social tags through this helper.
export function buildPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
}: PageMetadataInput): Metadata {
  const images = [{ url: image, width: 1200, height: 630, alt: imageAlt ?? title }]

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_GB',
      images,
      ...(type === 'article'
        ? { type: 'article', publishedTime, modifiedTime, authors }
        : { type: 'website' }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export type BreadcrumbItem = { name: string; path: string }

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
