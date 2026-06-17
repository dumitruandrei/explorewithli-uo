import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PortableText, type PortableTextComponents } from 'next-sanity'
import { SiteHeader } from '@/components/site-header'
import { ContactFooter } from '@/components/contact-footer'
import {
  formatJournalDate,
  getDestinationNav,
  getJournalPostBySlug,
  getJournalPosts,
  getJournalPostSlugs,
} from '@/sanity/lib/fetch'

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-serif text-3xl mt-8 mb-4 text-foreground leading-tight sm:text-4xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl mt-8 mb-4 text-foreground leading-tight sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl mt-6 mb-3 text-foreground leading-tight sm:text-2xl">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="leading-relaxed text-foreground/80 text-pretty mb-4">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/40 pl-4 italic text-foreground/90 my-6 bg-secondary/30 py-2 pr-2 rounded-r-md">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 my-4 flex flex-col gap-2 text-foreground/80 leading-relaxed">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-6 my-4 flex flex-col gap-2 text-foreground/80 leading-relaxed">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const rel = !value.href?.startsWith('/') ? 'noreferrer noopener' : undefined
      const target = !value.href?.startsWith('/') ? '_blank' : undefined
      return (
        <a
          href={value.href}
          target={target}
          rel={rel}
          className="underline text-primary font-medium hover:text-primary/80 transition-colors"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    richTableBlock: ({ value }: { value: any }) => {
      if (!value || !value.rows) return null

      const { rows, columnHeaders, hasColumnTitles, hasRowTitles } = value

      return (
        <div className="my-8 w-full overflow-x-auto rounded-lg border border-border bg-card shadow-sm scrollbar-none">
          <table className="w-full border-collapse text-left text-sm">
            {hasColumnTitles && columnHeaders && (
              <thead className="border-b border-border bg-muted/60 font-medium text-foreground select-none">
                <tr>
                  {hasRowTitles && rows.some((r: any) => r.title) && <th className="p-3" />}
                  {columnHeaders.map((header: any, index: number) => (
                    <th key={index} className="p-3 border-r border-border last:border-r-0">
                      {header.title || ''}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-border">
              {rows.map((row: any, rowIndex: number) => (
                <tr key={rowIndex} className="transition-colors hover:bg-muted/30">
                  {hasRowTitles && row.title && (
                    <td className="border-r border-border bg-muted/20 p-3 font-semibold text-foreground select-none">
                      {row.title}
                    </td>
                  )}
                  {row.cells?.map((cell: any, cellIndex: number) => (
                    <td key={cellIndex} className="p-3 border-r border-border last:border-r-0 text-foreground/80 leading-relaxed">
                      {cell.content ? (
                        <div className="prose prose-sm max-w-none prose-p:my-0">
                          <PortableText value={cell.content} />
                        </div>
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }
}

export async function generateStaticParams() {
  const slugs = await getJournalPostSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getJournalPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Explore with Li Journal`,
    description: post.excerpt,
  }
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [post, allPosts, destinations] = await Promise.all([
    getJournalPostBySlug(slug),
    getJournalPosts(),
    getDestinationNav(),
  ])

  if (!post) notFound()

  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <SiteHeader destinations={destinations} />
      <main>
        <section className="relative flex min-h-[60svh] items-end overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/25" />
          <div className="relative mx-auto w-full max-w-3xl px-5 pb-14 pt-32 sm:px-8">
            <Link
              href="/journal"
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
              <span>{formatJournalDate(post.publishedAt)}</span>
              <span aria-hidden>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </section>

        <article className="bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <p className="font-serif text-xl leading-relaxed text-foreground text-pretty sm:text-2xl">
              {post.intro}
            </p>

            <div className="mt-12 flex flex-col gap-10">
              {post.content.map((item: any, i: number) => {
                if (item._type === 'journalSection') {
                  return (
                    <section key={i}>
                      {item.heading && (
                        <h2 className="font-serif text-2xl leading-tight text-foreground text-balance sm:text-3xl">
                          {item.heading}
                        </h2>
                      )}
                      <div className="mt-4 flex flex-col gap-4">
                        {item.paragraphs?.map((p: string, j: number) => (
                          <p
                            key={j}
                            className="leading-relaxed text-foreground/80 text-pretty"
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    </section>
                  )
                }

                return (
                  <div key={i}>
                    <PortableText value={[item]} components={portableTextComponents} />
                  </div>
                )
              })}
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
                      src={p.imageUrl}
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
