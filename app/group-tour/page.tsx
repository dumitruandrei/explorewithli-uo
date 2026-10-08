import {
  CalendarDays,
  Check,
  Download,
  Mail,
  MessageSquare,
  Users,
  X,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { ContactFooter } from '@/components/contact-footer'
import { ContactAnchor } from '@/components/contact-anchor'
import { GroupTourSectionNav } from '@/components/group-tour-section-nav'
import { GroupTourCarousel } from '@/components/group-tour-carousel'
import { getDestinationNav } from '@/sanity/lib/fetch'
import {
  groupTour,
  departures,
  highlights,
  itinerary,
  included,
  notIncluded,
  bookingSteps,
} from '@/lib/group-tour-content'

export const metadata = {
  title: 'Group Tour 2027: Spices, Peaks & Tea Leaves | Explore with Li',
  description:
    'Join a small-group, 14-day journey from Chongqing through Yunnan to Shanghai in 2027. Maximum 14 travellers, from 2,780 CHF per person.',
}

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'departures', label: 'Departure dates' },
  { id: 'why-join', label: 'Why join' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'details', label: 'Details & pricing' },
  { id: 'booking', label: 'Booking' },
  { id: 'contact', label: 'Contact' },
]

export default async function GroupTourPage() {
  const destinations = await getDestinationNav()

  return (
    <>
      <SiteHeader solid destinations={destinations} />
      <GroupTourSectionNav sections={navSections} />
      <main className="bg-background">
        {/* Hero */}
        <section
          id="overview"
          className="scroll-mt-24 border-b border-border pb-10 pt-24 sm:pb-12 sm:pt-28"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Group Tour 2027
              </p>
              <h1 className="mt-4 text-balance font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                {groupTour.title}
              </h1>
              <p className="mt-2 font-serif text-xl text-primary">
                {groupTour.subtitle}
              </p>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Join us on a personal journey through one of China&apos;s most
                breathtaking, vibrant, and diverse regions. Over 14 days, we
                travel from the futuristic, multi-dimensional river metropolis
                of Chongqing to the quiet mountain valleys, ancient tea towns,
                and snow-capped peaks of Yunnan, finishing among the dazzling
                skyscrapers of Shanghai.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                This trip is designed around intimate experiences, local
                encounters, and incredible food—from spicy hillside hotpot
                feasts to tranquil cycling trips along alpine lakes. Because we
                keep the group small, our journey feels less like a tourist bus
                and more like a road trip with close friends.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ContactAnchor className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  Reserve your spot
                </ContactAnchor>
                <a
                  href={groupTour.flyers.eng}
                  download
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
                >
                  <Download className="size-4" />
                  Flyer (ENG)
                </a>
                <a
                  href={groupTour.flyers.deu}
                  download
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
                >
                  <Download className="size-4" />
                  Flyer (DEU)
                </a>
              </div>
            </div>

            <GroupTourCarousel
              slides={[
                {
                  src: '/images/group-tour/chongqing-night.jpg',
                  alt: 'Hongyadong in Chongqing lit up in gold against the night sky',
                },
                {
                  src: '/images/group-tour/hotpot.jpg',
                  alt: 'A Chongqing hotpot feast with a bubbling chilli broth and many side dishes',
                },
                {
                  src: '/images/group-tour/dragon-procession.jpg',
                  alt: 'A dragon procession in an old Yunnan town with locals in red costumes',
                },
                {
                  src: '/images/group-tour/rice-terraces-sunset.jpg',
                  alt: 'Rice terraces glowing in the valley at sunset',
                },
                {
                  src: '/images/group-tour/tea-terraces.png',
                  alt: 'Tea pickers working on terraced tea hills',
                },
              ]}
            />
          </div>

          {/* Key facts */}
          <div className="mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-4 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
            {[
              { label: 'Duration', value: '14 days / 13 nights' },
              {
                label: 'Group size',
                value: `${groupTour.minGroup}–${groupTour.maxGroup} travellers`,
              },
              { label: 'Price from (CHF)', value: groupTour.priceChf },
              { label: 'Price from (EUR)', value: groupTour.priceEur },
            ].map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-border bg-card p-5 text-center shadow-sm"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {fact.label}
                </p>
                <p className="mt-2 font-serif text-xl text-foreground sm:text-2xl">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-4 max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
            Per person, excluding international long-haul flights.
          </p>
        </section>

        {/* Departures */}
        <section
          id="departures"
          className="scroll-mt-24 border-b border-border py-10 sm:py-14"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Departure Dates
              </p>
              <h2 className="mt-3 text-balance font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                Choose the travel period that suits you
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {departures.map((d) => (
                <div
                  key={d.name}
                  className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <CalendarDays className="size-5" />
                  </div>
                  <h3 className="mt-4 font-serif text-2xl text-foreground">
                    {d.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {d.dates}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{d.note}</p>
                  <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                    <Users className="size-3.5" />
                    {d.seats} seats left
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section
          id="why-join"
          className="scroll-mt-24 border-b border-border py-10 sm:py-14"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Why Join
              </p>
              <h2 className="mt-3 text-balance font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                What makes this trip special
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md sm:p-8"
                >
                  <h3 className="font-serif text-2xl text-foreground transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Itinerary */}
        <section
          id="itinerary"
          className="scroll-mt-24 border-b border-border py-10 sm:py-14"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Itinerary
              </p>
              <h2 className="mt-3 text-balance font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                Your 14 days, day by day
              </h2>
            </div>

            <div className="space-y-12">
              {itinerary.map((stage) => (
                <div key={stage.region}>
                  <h3 className="mb-5 font-serif text-xl text-primary sm:text-2xl">
                    {stage.region}
                  </h3>
                  <ol className="space-y-4 border-l border-border pl-6">
                    {stage.days.map((d) => (
                      <li key={d.title} className="relative">
                        <span className="absolute -left-[29px] top-2 size-2.5 rounded-full bg-primary ring-4 ring-background" />
                        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                          <p className="text-xs font-medium uppercase tracking-wider text-primary">
                            {d.day}
                          </p>
                          <h4 className="mt-1 font-serif text-lg text-foreground">
                            {d.title}
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {d.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Included / Not included */}
        <section
          id="details"
          className="scroll-mt-24 border-b border-border py-10 sm:py-14"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Tour Details & Pricing
              </p>
              <h2 className="mt-3 text-balance font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                Transparent from the start
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <h3 className="font-serif text-2xl text-foreground">
                  What&apos;s included
                </h3>
                <ul className="mt-5 space-y-3">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <h3 className="font-serif text-2xl text-foreground">
                  Not included
                </h3>
                <ul className="mt-5 space-y-3">
                  {notIncluded.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <X className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        <strong className="font-medium text-foreground">
                          {item.label}:
                        </strong>{' '}
                        {item.body}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Booking */}
        <section
          id="booking"
          className="scroll-mt-24 border-b border-border py-10 sm:py-14"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Secure Your Spot
              </p>
              <h2 className="mt-3 text-balance font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                Easy and completely risk-free booking
              </h2>
            </div>
            <ol className="space-y-4">
              {bookingSteps.map((step, i) => (
                <li
                  key={step.label}
                  className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/5 font-serif text-lg text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-foreground">
                      {step.label}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="scroll-mt-24 py-10 sm:py-14">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Ready to Explore Together?
            </p>
            <h2 className="mt-3 text-balance font-serif text-3xl leading-tight text-foreground sm:text-4xl">
              Every journey starts with a simple conversation
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted-foreground">
              Whether you have questions about the itinerary, want to see if
              this trip matches your travel style, or wish to reserve a spot,
              we&apos;re always here to help. Feel free to reach out via the
              contact form, WhatsApp or email anytime—we&apos;d love to welcome
              you on board!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ContactAnchor className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Contact form
              </ContactAnchor>
              <a
                href="https://wa.me/41763752691"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
              >
                <MessageSquare className="size-4" />
                WhatsApp
              </a>
              <a
                href="mailto:info@explorechongqingwithli.com"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
              >
                <Mail className="size-4" />
                Email
              </a>
            </div>
          </div>
        </section>
      </main>
      <ContactFooter />
    </>
  )
}
