import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { ContactFooter } from '@/components/contact-footer'
import { getDestinationNav } from '@/sanity/lib/fetch'
import { ShieldCheck, Cookie, Eye, Users, Scale, Mail } from 'lucide-react'

export const metadata = {
  title: 'Privacy & Cookie Policy | Explore with Li',
  description:
    'Learn how Explore with Li handles your data. We use only strictly necessary cookies and collect only what you voluntarily share with us.',
}

export default async function PrivacyPage() {
  const destinations = await getDestinationNav()

  return (
    <>
      <SiteHeader solid destinations={destinations} />
      <main className="bg-background">
        {/* Hero */}
        <section className="border-b border-border pb-12 pt-24 sm:pb-16 sm:pt-32">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              Legal
            </p>
            <h1 className="mt-4 text-balance font-serif text-4xl leading-tight text-foreground sm:text-5xl">
              Privacy &amp; Cookie Policy
            </h1>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted-foreground">
              Welcome to Explore with Li. Your privacy is incredibly important
              to us. We have designed our travel website to respect your data —
              no invasive advertising trackers, no behavioral profiling, no
              unnecessary third-party cookies.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-14">

              {/* Section 1 — Cookies */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <Cookie className="size-5" />
                  </div>
                  <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
                    1. Cookies and Tracking Technologies
                  </h2>
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  Under global privacy frameworks (including the EU GDPR and
                  California&apos;s CPRA), cookies are categorized by their
                  purpose. Our website only uses cookies that are{' '}
                  <strong className="text-foreground">Strictly Necessary</strong>.
                  Because we do not use marketing, advertising, or non-essential
                  tracking cookies, you will not see a disruptive cookie consent
                  banner on our site.
                </p>

                {/* Strictly Necessary */}
                <div className="mt-8 rounded-xl border border-border bg-card p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck className="size-5 text-primary shrink-0" />
                    <h3 className="font-serif text-xl text-foreground">
                      Strictly Necessary Cookies
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-5">
                    These are technical cookies required for our website to
                    function safely, securely, and properly. They are allowed by
                    law without prior consent because the website cannot operate
                    without them.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-primary translate-y-2" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Sanity CMS</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                          Our Content Management System uses minimal, encrypted
                          cookies solely to securely fetch and display our
                          travel content, images, and itineraries. If you are an
                          administrator, it also uses cookies to manage
                          &ldquo;Preview&rdquo; drafts of our pages.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-primary translate-y-2" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Vercel Hosting</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                          Our hosting provider utilizes transient infrastructure
                          cookies to safely route web traffic, optimize loading
                          speeds, and defend our website against malicious bot
                          attacks.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Privacy-First Analytics */}
                <div className="mt-6 rounded-xl border border-border bg-card p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="size-5 text-primary shrink-0" />
                    <h3 className="font-serif text-xl text-foreground">
                      Privacy-First Analytics
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                    We like to know which of our travel itineraries and
                    destinations are popular, but we don&apos;t believe in
                    tracking you to find out.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        We use{' '}
                        <strong className="text-foreground">Vercel Web Analytics</strong>{' '}
                        to view aggregate, anonymous traffic trends (such as counting how many people visit our tour pages).
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        This service is entirely cookieless, collects no personally identifiable information, and cannot track your behavior across other websites.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Section 2 — Information We Collect */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <Users className="size-5" />
                  </div>
                  <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
                    2. Information We Collect
                  </h2>
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  Because you browse our site anonymously, we only collect
                  personal information that you{' '}
                  <strong className="text-foreground">voluntarily provide</strong>{' '}
                  to us. This happens if you:
                </p>
                <ul className="mt-5 space-y-3">
                  {[
                    'Send us an email or use a contact form.',
                    'Inquire about booking a custom travel itinerary.',
                    'Sign up for a travel newsletter.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  This data typically includes your name, email address, and any
                  specific travel preferences or details you choose to share with
                  us so we can help plan your trip. We only use this information
                  to respond to your request and provide our travel services.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Section 3 — Data Sharing */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <ShieldCheck className="size-5" />
                  </div>
                  <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
                    3. Data Sharing and Third Parties
                  </h2>
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  We do not sell, rent, or trade your personal data to
                  third-party advertisers or data brokers. We will only share
                  information with trusted travel providers (such as hotels,
                  tour operators, or transport companies) when it is strictly
                  necessary to secure a travel booking you have explicitly
                  requested.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Section 4 — Your Rights */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <Scale className="size-5" />
                  </div>
                  <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
                    4. Your Rights
                  </h2>
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  Depending on where you live in the world (such as the UK,
                  European Union, or various US states), you have legal rights
                  regarding your personal data, including:
                </p>
                <ul className="mt-5 space-y-3">
                  {[
                    'The right to access the personal information we hold about you.',
                    'The right to request that we correct or update any inaccurate information.',
                    'The right to request that we completely delete your personal data from our records.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  If you wish to exercise any of these rights, please contact us
                  using the information below.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Section 5 — Contact */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <Mail className="size-5" />
                  </div>
                  <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
                    5. Contact Us
                  </h2>
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  If you have any questions about this policy or how we handle
                  your travel inquiries, please reach out to us:
                </p>
                <div className="mt-6 rounded-xl border border-border bg-card p-6 sm:p-8">
                  <p className="font-serif text-lg text-foreground">Explore with Li</p>
                  <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">Email: </span>
                      <a
                        href="mailto:info@explorechongqingwithli.com"
                        className="text-primary hover:underline"
                      >
                        info@explorechongqingwithli.com
                      </a>
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Website: </span>
                      <a
                        href="https://www.explorechongqingwithli.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        www.explorechongqingwithli.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <ContactFooter />
    </>
  )
}
