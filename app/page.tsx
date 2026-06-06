import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { DestinationsGrid } from '@/components/destinations-grid'
import { ReviewsSection } from '@/components/reviews-section'
import { BlogSection } from '@/components/blog-section'
import { ContactFooter } from '@/components/contact-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
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
