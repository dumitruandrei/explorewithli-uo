import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { ContactFooter } from '@/components/contact-footer'
import {
  getDestinationNav,
  getJournalPostsByTag,
  getAllJournalTags,
} from '@/sanity/lib/fetch'

export async function generateStaticParams() {
  const tags = await getAllJournalTags()
  return tags.map((tag) => ({ tag: encodeURIComponent(tag) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  return {
    title: `Posts tagged "${decodedTag}" — Explore with Li Journal`,
    description: `Explore all blog posts tagged with "${decodedTag}"`,
  }
}

export default async function JournalTagPage({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)

  const [posts, destinations] = await Promise.all([
    getJournalPostsByTag(decodedTag),
    getDestinationNav(),
  ])

  return (
    <>
      <SiteHeader solid destinations={destinations} />
      <main>
        {/* Page header */}
        <section className="bg-background pb-12 pt-32 sm:pt-36">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Link
              href="/journal"
              className="mb-6 inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80"
            >
              <ArrowLeft className="size-4" />
              Back to Journal
            </Link>
            <div>
              <div className="inline-block rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-sm font-medium text-primary mb-3">
                Tag
              </div>
              <h1 className="font-serif text-4xl leading-tight text-foreground text-balance sm:text-6xl">
                {decodedTag}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with &quot;{decodedTag}&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Posts grid */}
        {posts.length > 0 ? (
          <section className="bg-secondary py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
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
                      {post.tags && post.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {post.tags.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="inline-block rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                            >
                              {t}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="inline-block text-xs text-muted-foreground">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
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
        ) : (
          <section className="bg-secondary py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
              <p className="text-base text-muted-foreground mb-6">
                No posts found with this tag yet.
              </p>
              <Link
                href="/journal"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <ArrowLeft className="size-4" />
                Back to all posts
              </Link>
            </div>
          </section>
        )}
      </main>
      <ContactFooter />
    </>
  )
}
