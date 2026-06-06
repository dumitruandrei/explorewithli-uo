import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { blogPosts, getBlogPost } from '@/lib/destinations'
import { SiteHeader } from '@/components/site-header'
import { ContactFooter } from '@/components/contact-footer'

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Horizon Travel Journal`,
    description: post.excerpt,
  }
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative flex min-h-[60svh] items-end overflow-hidden">
          <Image
            src={post.image || '/placeholder.svg'}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-foreground/30" />
          <div className="relative mx-auto w-full max-w-3xl px-5 pb-14 pt-32 sm:px-8">
            <Link
              href="/#journal"
              className="mb-6 inline-flex items-center gap-2 text-sm text-background/80 transition-colors hover:text-background"
            >
              <ArrowLeft className="size-4" />
              The Journal
            </Link>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-background/80">
              {post.category}
            </p>
            <h1 className="mt-2 font-serif text-3xl text-background text-balance sm:text-5xl">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-background/80">
              <span>By {post.author}</span>
              <span aria-hidden>·</span>
              <span>{post.date}</span>
              <span aria-hidden>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </section>

        {/* Article body */}
        <article className="bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <p className="font-serif text-xl leading-relaxed text-foreground text-pretty sm:text-2xl">
              {post.intro}
            </p>

            <div className="mt-12 flex flex-col gap-10">
              {post.content.map((section, i) => (
                <section key={i}>
                  {section.heading && (
                    <h2 className="font-serif text-2xl leading-tight text-foreground text-balance sm:text-3xl">
                      {section.heading}
                    </h2>
                  )}
                  <div className="mt-4 flex flex-col gap-4">
                    {section.paragraphs.map((p, j) => (
                      <p
                        key={j}
                        className="leading-relaxed text-foreground/80 text-pretty"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-14 rounded-lg border border-border bg-secondary p-6 text-center sm:p-8">
              <h3 className="font-serif text-xl text-secondary-foreground text-balance sm:text-2xl">
                Inspired to experience this for yourself?
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Our local specialists craft flexible, tailor-made journeys
                across southwest China.
              </p>
              <Link
                href="/#contact"
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Plan your trip
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </article>

        {/* Related articles */}
        <section className="bg-secondary py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="font-serif text-2xl leading-tight text-foreground text-balance sm:text-3xl">
              More from the Journal
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/journal/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={p.image || '/placeholder.svg'}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium text-primary">
                        {p.category}
                      </span>
                      <span aria-hidden>·</span>
                      <span>{p.readTime}</span>
                    </div>
                    <h3 className="mt-2 font-serif text-lg leading-tight text-card-foreground text-balance">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <ContactFooter />
    </>
  )
}
