import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { ContactFooter } from '@/components/contact-footer'
import { getDestinationNav } from '@/sanity/lib/fetch'

export const metadata: Metadata = {
  title: 'Page not found — Explore with Li',
  robots: { index: false, follow: true },
}

export default async function NotFound() {
  const destinations = await getDestinationNav()

  return (
    <>
      <SiteHeader solid destinations={destinations} />
      <main className="bg-background pb-24 pt-32 sm:pt-40">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-5 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">404</p>
          <h1 className="font-serif text-4xl text-foreground sm:text-5xl text-balance">
            This page took a different route
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
            {"The page you're looking for doesn't exist or has moved. Try one of our destinations or the journal instead."}
          </p>

          {destinations.length > 0 && (
            <nav aria-label="Destinations" className="w-full">
              <ul className="flex flex-wrap gap-3">
                {destinations.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/destinations/${d.slug}`}
                      className="inline-flex rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Back to home
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Read the journal
            </Link>
          </div>
        </div>
      </main>
      <ContactFooter />
    </>
  )
}
