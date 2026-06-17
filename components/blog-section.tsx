import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getJournalPosts } from '@/sanity/lib/fetch'

const HOMEPAGE_PREVIEW_COUNT = 2

export async function BlogSection() {
  const posts = await getJournalPosts()
  const feature = posts.find((post) => post.featured) ?? posts[0]
  const rest = posts
    .filter((post) => post.slug !== feature?.slug)
    .slice(0, HOMEPAGE_PREVIEW_COUNT)

  if (!feature) return null

  return (
    <section id="journal" className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              The Journal
            </p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance sm:text-5xl">
              Stories & knowledge from the road
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Insights from our local specialists to inspire your next journey
              through China.
            </p>
          </div>
          <Link
            href="/journal"
            className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            View all articles
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Link
            href={`/journal/${feature.slug}`}
            className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-xl"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={feature.imageUrl}
                alt={feature.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-full bg-secondary px-2.5 py-1 font-medium text-secondary-foreground">
                  {feature.category}
                </span>
                <span>{feature.readTime}</span>
              </div>
              <h3 className="mt-4 font-serif text-2xl leading-tight text-card-foreground text-balance sm:text-3xl">
                {feature.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {feature.excerpt}
              </p>
              <span className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium text-primary">
                Read article
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/journal/${post.slug}`}
                className="group flex gap-4 overflow-hidden rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-lg sm:flex-col sm:p-0 lg:flex-row"
              >
                <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-md sm:aspect-[16/10] sm:w-full lg:aspect-square lg:w-40">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 160px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col py-1 sm:p-4 lg:py-3 lg:pr-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-primary">
                      {post.category}
                    </span>
                    <span aria-hidden>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mt-1.5 font-serif text-lg leading-tight text-card-foreground text-balance">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
