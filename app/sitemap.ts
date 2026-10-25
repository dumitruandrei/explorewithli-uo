import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/seo'
import { getSitemapEntries } from '@/sanity/lib/fetch'

export const revalidate = 3600

const staticPages: { path: string; priority: number }[] = [
  { path: '/', priority: 1 },
  { path: '/group-tour', priority: 0.9 },
  { path: '/how-it-works', priority: 0.7 },
  { path: '/journal', priority: 0.8 },
  { path: '/about', priority: 0.6 },
  { path: '/privacy', priority: 0.2 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { destinations, posts } = await getSitemapEntries()

  const latestContentUpdate = [...destinations, ...posts]
    .map((entry) => entry.updatedAt)
    .sort()
    .at(-1)

  return [
    ...staticPages.map(({ path, priority }) => ({
      url: absoluteUrl(path),
      lastModified:
        path === '/' || path === '/journal' ? latestContentUpdate : undefined,
      priority,
    })),
    ...destinations.map((d) => ({
      url: absoluteUrl(`/destinations/${d.slug}`),
      lastModified: d.updatedAt,
      priority: 0.9,
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/journal/${p.slug}`),
      lastModified: p.updatedAt,
      priority: 0.7,
    })),
  ]
}
