import Link from 'next/link'
import {
  Lightbulb,
  Shuffle,
  MessageCircle,
  FileText,
  Handshake,
  Plane,
  Mail,
  MessageSquare,
  ArrowRight,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { ContactFooter } from '@/components/contact-footer'
import { getDestinationNav } from '@/sanity/lib/fetch'

export const metadata = {
  title: 'How It Works | Explore with Li',
  description:
    'From inspiration to takeoff: the six simple steps to planning your private, fully custom trip to China with Explore with Li.',
}

const steps = [
  {
    title: 'Get Inspired',
    icon: Lightbulb,
    body: "Explore our sample itineraries online to see what's possible! Every tour we offer is 100% private and fully custom, so feel free to use these samples—and their reference pricing for groups of four—as a starting point for your own ideas.",
    link: { label: 'Browse sample itineraries', href: '/#destinations' },
  },
  {
    title: 'Make It Yours',
    icon: Shuffle,
    body: 'Mix and match your favorite routes, add a destination on your wishlist, or adjust the pace. If there is anything you would like to tweak, just let us know and we will handle the rest.',
  },
  {
    title: 'Tell Us What You Need',
    icon: MessageCircle,
    body: 'Share your travel dates and group size with us. Whether you need help securing train tickets, finding the right hotels, or designing a complete multi-city itinerary across China, we are here to handle every detail.',
  },
  {
    title: 'Review Your Personal Proposal',
    icon: FileText,
    body: 'We will put together a custom trip proposal just for you, complete with day-by-day details, included services, and clear, transparent pricing.',
  },
  {
    title: 'Lock In Your Journey',
    icon: Handshake,
    body: 'Once you are completely happy with the plan, we will finalize the agreement. A 50% deposit within 3 days of signing secures your bookings and gets everything officially moving.',
  },
  {
    title: 'Count Down to Takeoff',
    icon: Plane,
    body: 'The final balance is due 30 days before your journey begins. After that, all that is left to do is pack your bags and get ready for an unforgettable adventure!',
  },
]

export default async function HowItWorksPage() {
  const destinations = await getDestinationNav()

  return (
    <>
      <SiteHeader solid destinations={destinations} />
      <main className="bg-background">
        <section className="border-b border-border pb-16 pt-24 sm:pb-24 sm:pt-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                How It Works
              </p>
              <h1 className="mt-4 font-serif text-4xl leading-tight text-foreground text-balance sm:text-6xl">
                Your dream trip, in six simple steps
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Planning your dream trip to China should be just as exciting as
                the journey itself. Here is how we bring your ideal travel
                experience to life:
              </p>
            </div>
          </div>

          <ol className="mx-auto mt-12 grid max-w-6xl gap-6 px-4 sm:mt-16 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:px-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <li
                  key={step.title}
                  className="group relative flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-primary/10">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <span
                      className="font-serif text-4xl leading-none text-primary/20 transition-colors group-hover:text-primary/40"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h2 className="mt-5 font-serif text-2xl text-foreground transition-colors group-hover:text-primary">
                    <span className="sr-only">{`Step ${index + 1}: `}</span>
                    {step.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                  {step.link && (
                    <Link
                      href={step.link.href}
                      className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-base font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      {step.link.label}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  )}
                </li>
              )
            })}
          </ol>
        </section>

        <section className="border-b border-border bg-secondary py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Ready to start?
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl">
              Let&apos;s plan your personalized China adventure
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted-foreground">
              If this sounds like a plan, send us an email or drop us a message
              on WhatsApp—we can&apos;t wait to start planning your
              personalized China adventure!
            </p>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <a
                href="mailto:info@explorechongqingwithli.com"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Mail className="size-5" aria-hidden="true" />
                Send us an email
              </a>
              <a
                href="https://wa.me/41763752691"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-primary bg-background px-6 text-base font-medium text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <MessageSquare className="size-5" aria-hidden="true" />
                Message us on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <ContactFooter />
    </>
  )
}
