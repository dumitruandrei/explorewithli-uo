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
        {/* Hero & Core Values Section (Continuous) */}
        <section className="border-b border-border pb-16 pt-24 sm:pb-20 sm:pt-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Our Mission
              </p>
              <h1 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-6xl text-balance">
                Travel that Changes You
              </h1>
              <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground text-lg">
                Information is now universal, but connection is becoming rare. In a world increasingly mediated by AI, our mission at Explore with Li is to anchor your journey in the tangible. We move beyond the sights to design experiences centered on authentic human exchange and the quiet, everyday moments that define a culture. We bridge the gap between &quot;seeing a place&quot; and &quot;belonging to it&quot; through intentional, human-led travel design.
              </p>
            </div>
          </div>

        </section>

        {/* Team section */}
        <section className="border-b border-border py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
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
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
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
      </main>
      <ContactFooter />
    </>
  )
}
