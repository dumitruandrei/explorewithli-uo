import { SiteHeader } from '@/components/site-header'
import { GroupTourBanner } from '@/components/group-tour-banner'
import { Hero } from '@/components/hero'
import { DestinationsGrid } from '@/components/destinations-grid'
import { ReviewsSection } from '@/components/reviews-section'
import { BlogSection } from '@/components/blog-section'
import { ContactFooter } from '@/components/contact-footer'
import { JsonLd } from '@/components/json-ld'
import { getDestinationNav, getReviews } from '@/sanity/lib/fetch'
import { SITE_NAME, SITE_URL, absoluteUrl, buildPageMetadata } from '@/lib/seo'

export const metadata = buildPageMetadata({
  title: 'Explore with Li — Boutique Journeys Through China',
  description:
    'Explore with Li crafts bespoke, flexible journeys through Sichuan, Yunnan and Chongqing. Tailor your group size, duration and experiences with our local specialists.',
  path: '/',
})

export default async function Page() {
  const [destinations, reviews] = await Promise.all([
    getDestinationNav(),
    getReviews(),
  ])

  const ratedReviews = reviews.filter((r) => r.stars > 0)
  const averageRating =
    ratedReviews.reduce((sum, r) => sum + r.stars, 0) / (ratedReviews.length || 1)

  const travelAgency = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/images/logo.png'),
    image: absoluteUrl('/images/hero-china.png'),
    description:
      'Bespoke, flexible journeys through Chongqing, Sichuan and Yunnan, designed by local specialists.',
    email: 'info@explorechongqingwithli.com',
    telephone: '+41763752691',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Zürich',
      addressCountry: 'CH',
    },
    areaServed: { '@type': 'Country', name: 'China' },
    makesOffer: destinations.map((d) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'TouristTrip',
        name: `${d.name} tours`,
        url: absoluteUrl(`/destinations/${d.slug}`),
      },
    })),
    ...(ratedReviews.length > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: Number(averageRating.toFixed(1)),
        reviewCount: ratedReviews.length,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
  }

  return (
    <>
      <JsonLd data={[travelAgency, website]} />
      <SiteHeader destinations={destinations} />
      <main>
        <Hero />
        <GroupTourBanner />
        <DestinationsGrid />
        <ReviewsSection />
        <BlogSection />
      </main>
      <ContactFooter />
    </>
  )
}
