import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { ContactFooter } from '@/components/contact-footer'
import { teamMembers, collaborators } from '@/lib/about-content'
import { getDestinationNav } from '@/sanity/lib/fetch'

export const metadata = {
  title: 'About Us | Explore with Li',
  description:
    'Meet the Explore with Li team. We reimagine how people connect with southwest China through meaningful, slow travel.',
}

export default async function AboutPage() {
  const destinations = await getDestinationNav()

  return (
    <>
      <SiteHeader solid destinations={destinations} />
      <main className="bg-background">
        {/* Hero section */}
        <section className="border-b border-border pb-16 pt-32 sm:pb-24 sm:pt-40">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-widest text-primary">
                Our Story
              </p>
              <h1 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-6xl text-balance">
                Travel that Changes You
              </h1>
              <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-muted-foreground text-lg">
                Explore with Li exists to prove that meaningful tourism is
                possible. We move slowly through southwest China, spend time
                with real people, and leave places better than we found them.
              </p>
            </div>
          </div>
        </section>

        {/* Company story section */}
        <section className="border-b border-border py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="font-serif text-3xl leading-tight text-foreground text-balance">
                  How It Started
                </h2>
                <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                  <p>
                    It started with a realization that cold blueprints couldn't
                    match the warmth of human connection. After years working as a
                    civil engineer in America and Switzerland, Hanghang Li knew
                    that standard, rushed tourism was missing the true depth of
                    China. He wanted to combine engineering precision with a deep,
                    authentic love for slow travel.
                  </p>
                  <p>
                    In Zurich, Hanghang founded Explore with Li. He was soon joined
                    by Shu Chen, a Guilin native with deep roots in the Chinese
                    travel industry and a master's degree from Spain, and Nadja
                    Spillmann, a Swiss local with a Thai heart and a master's
                    specializing in linguistic and cultural diversity.
                  </p>
                  <p>
                    Together, they set out to bridge the gap between Western
                    expectations and the vibrant, complex soul of the East. Today,
                    they design worry-free, culture-rich journeys that look beyond
                    standard guidebooks—focusing on fewer guests, longer stays,
                    and real relationships.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-card p-6">
                  <h3 className="font-serif text-lg text-foreground">
                    Our Values
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="font-medium text-primary">→</span>
                      <span>
                        <strong>Slow travel:</strong> We spend time, not miles.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-medium text-primary">→</span>
                      <span>
                        <strong>Authenticity:</strong> Real encounters over
                        orchestrated experiences.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-medium text-primary">→</span>
                      <span>
                        <strong>Sustainability:</strong> Travel that gives back
                        more than it takes.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-medium text-primary">→</span>
                      <span>
                        <strong>Trust:</strong> Full transparency in pricing,
                        logistics, and impact.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-medium text-primary">→</span>
                      <span>
                        <strong>Curiosity:</strong> Always learning from our
                        guests and partners.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team section */}
        <section className="border-b border-border py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <p className="text-xs font-medium uppercase tracking-widest text-primary">
                Meet The Team
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl">
                The people behind Explore with Li
              </h2>
            </div>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl text-foreground transition-colors group-hover:text-primary">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {member.role}
                  </p>

                  {/* Languages Spoken Badges */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {member.speaks.map((lang) => (
                      <span
                        key={lang}
                        className="inline-flex items-center rounded-full bg-primary/5 px-2.5 py-0.5 text-[11px] font-medium text-primary border border-primary/10"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Collaborators section */}
        <section className="border-b border-border py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <p className="text-xs font-medium uppercase tracking-widest text-primary">
                Our Partners
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl">
                Collaborators in Responsible Travel
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
                We work with organizations that share our commitment to
                sustainability, cultural respect, and community benefit.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {collaborators.map((collab) => (
                <div
                  key={collab.name}
                  className="flex items-center justify-center rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/30 hover:bg-secondary"
                >
                  <div className="relative h-12 w-full">
                    <Image
                      src={collab.logo}
                      alt={collab.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance">
              Ready to join us?
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Start with a conversation. We&apos;ll help you find the journey
              that matches your curiosity.
            </p>
            <a
              href="/#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get In Touch
            </a>
          </div>
        </section>
      </main>
      <ContactFooter />
    </>
  )
}
