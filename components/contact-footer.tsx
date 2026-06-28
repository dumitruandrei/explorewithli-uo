import Link from 'next/link'
import Image from 'next/image'
import { Mail, MessageSquare, MapPin } from 'lucide-react'
import { getDestinations } from '@/sanity/lib/fetch'
import { ContactForm } from '@/components/contact-form'

export async function ContactFooter() {
  const destinations = await getDestinations()

  return (
    <footer id="contact" className="bg-[oklch(0.28_0.07_148)] text-[oklch(0.94_0.012_88)]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[oklch(0.72_0.13_148)]">
              Plan your journey
            </p>
            <h2 className="font-serif text-3xl leading-tight text-balance sm:text-5xl">
              Let&apos;s shape a journey that&apos;s entirely yours
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-background/75">
              Tell us how you like to travel and our specialists will design a
              flexible itinerary across southwest China. Group size, duration
              and activities are always adjustable.
            </p>

            <div className="mt-10 space-y-5">
              <a
                href="mailto:info@explorechongqingwithli.com"
                className="flex items-center gap-4 text-background/90 transition-colors hover:text-background"
              >
                <span className="flex size-10 items-center justify-center rounded-full border border-background/25">
                  <Mail className="size-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-background/60">
                    Email
                  </span>
                  info@explorechongqingwithli.com
                </span>
              </a>
              <a
                href="https://wa.me/41763752691"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-background/90 transition-colors hover:text-background"
              >
                <span className="flex size-10 items-center justify-center rounded-full border border-background/25">
                  <MessageSquare className="size-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-background/60">
                    WhatsApp
                  </span>
                  +41 76 375 26 91
                </span>
              </a>
              <div className="flex items-center gap-4 text-background/90">
                <span className="flex size-10 items-center justify-center rounded-full border border-background/25">
                  <MapPin className="size-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-background/60">
                    Location
                  </span>
                  Zürich, Switzerland
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-background/15 bg-background/5 p-6 sm:p-8">
            <h3 className="font-serif text-2xl">Request a tailored itinerary</h3>
            <p className="mt-1 text-sm text-background/70">
              We reply within 24 hours.
            </p>
            <div className="mt-6">
              <ContactForm variant="dark" />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-background/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 font-serif text-xl"
          >
            <img
              src="/images/logo-white.png"
              alt="Explore with Li logo"
              className="h-20 w-auto object-contain"
            />
            <span>
              Explore with <span className="text-[oklch(0.72_0.13_148)]">Li</span>
            </span>
          </Link>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-background/70">
            {destinations.map((d) => (
              <Link
                key={d._id}
                href={`/destinations/${d.slug}`}
                className="transition-colors hover:text-background"
              >
                {d.name}
              </Link>
            ))}
            <Link href="/#journal" className="transition-colors hover:text-background">
              Journal
            </Link>
          </nav>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p className="text-xs text-background/50">
              © {new Date().getFullYear()} Explore with Li. All rights reserved.
            </p>
            <Link
              href="/privacy"
              className="text-xs text-background/50 transition-colors hover:text-background/80"
            >
              Privacy &amp; Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
