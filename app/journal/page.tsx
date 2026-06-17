import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { ContactFooter } from '@/components/contact-footer'
import { getDestinationNav, getJournalPosts } from '@/sanity/lib/fetch'

export const metadata: Metadata = {
  title: 'Journal — Explore with Li',
  description:
    'Stories, insights, and travel knowledge from our local specialists to inspire your next journey through China.',
}

export default async function JournalIndexPage() {
  const [posts, destinations] = await Promise.all([
    getJournalPosts(),
    getDestinationNav(),
  ])

  const feature = posts.find((post) => post.featured) ?? posts[0]
  const rest = posts.filter((post) => post.slug !== feature?.slug)

  return (
    <>
      <SiteHeader solid destinations={destinations} />
      <main>
        {/* Page header */}
        <section className="bg-background pb-12 pt-32 sm:pt-36">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              The Journal
            </p>
            <h1 className="font-serif text-4xl leading-tight text-foreground text-balance sm:text-6xl">
              Stories & knowledge from the road
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Insights from our local specialists to inspire your next journey
              through China.
            </p>
          </div>
        </section>

        {/* Featured post */}
        {feature && (
          <section className="bg-background pb-16 sm:pb-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <Link
                href={`/journal/${feature.slug}`}
                className="group grid overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-xl lg:grid-cols-2"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto lg:min-h-[400px]">
                  <Image
                    src={feature.imageUrl}
                    alt={feature.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-10">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-full bg-secondary px-2.5 py-1 font-medium text-secondary-foreground">
                      {feature.category}
                    </span>
                    <span>{feature.readTime}</span>
                  </div>
                  <h2 className="mt-4 font-serif text-2xl leading-tight text-card-foreground text-balance sm:text-4xl">
                    {feature.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {feature.excerpt}
                  </p>
                  <span className="mt-6 flex items-center gap-1 text-sm font-medium text-primary">
                    Read article
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* All other posts */}
        {rest.length > 0 && (
          <section className="bg-secondary py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <h2 className="font-serif text-2xl leading-tight text-foreground text-balance sm:text-3xl">
                All articles
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/journal/${post.slug}`}
                    className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium text-primary">
                          {post.category}
                        </span>
                        <span aria-hidden>·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="mt-2 font-serif text-lg leading-tight text-card-foreground text-balance">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-primary">
                        Read article
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <ContactFooter />
    </>
  )
}
