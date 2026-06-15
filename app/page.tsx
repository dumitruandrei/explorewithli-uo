import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { DestinationsGrid } from '@/components/destinations-grid'
import { ReviewsSection } from '@/components/reviews-section'
import { BlogSection } from '@/components/blog-section'
import { ContactFooter } from '@/components/contact-footer'
import { getDestinationNav } from '@/sanity/lib/fetch'

export default async function Page() {
  const destinations = await getDestinationNav()

  return (
    <>
      <SiteHeader destinations={destinations} />
      <main>
        <Hero />
        <DestinationsGrid />
        <ReviewsSection />
        <BlogSection />
      </main>
      <ContactFooter />
    </>
  )
}
