import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { destinations } from '@/lib/destinations'
import { ContactForm } from '@/components/contact-form'

export function ContactFooter() {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: details */}
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Plan your journey
            </p>
            <h2 className="font-serif text-3xl leading-tight text-balance sm:text-5xl">
              Let’s shape a journey that’s entirely yours
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-background/75">
              Tell us how you like to travel and our specialists will design a
              flexible itinerary across Sichuan, Yunnan and Chongqing. Group
              size, duration and activities are always adjustable.
            </p>

            <div className="mt-10 space-y-5">
              <a
                href="mailto:hello@horizon.travel"
                className="flex items-center gap-4 text-background/90 transition-colors hover:text-background"
              >
                <span className="flex size-10 items-center justify-center rounded-full border border-background/25">
                  <Mail className="size-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-background/60">
                    Email
                  </span>
                  hello@horizon.travel
                </span>
              </a>
              <a
                href="tel:+862812345678"
                className="flex items-center gap-4 text-background/90 transition-colors hover:text-background"
              >
                <span className="flex size-10 items-center justify-center rounded-full border border-background/25">
                  <Phone className="size-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-background/60">
                    Call
                  </span>
                  +86 28 1234 5678
                </span>
              </a>
              <div className="flex items-center gap-4 text-background/90">
                <span className="flex size-10 items-center justify-center rounded-full border border-background/25">
                  <MapPin className="size-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-background/60">
                    Studio
                  </span>
                  Jinjiang District, Chengdu, China
                </span>
              </div>
            </div>
          </div>

          {/* Right: form */}
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

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-6 border-t border-background/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="font-serif text-xl">
            Horizon<span className="text-primary">.</span>Travel
          </Link>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-background/70">
            {destinations.map((d) => (
              <Link
                key={d.slug}
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
          <p className="text-xs text-background/50">
            © {new Date().getFullYear()} Horizon Travel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
