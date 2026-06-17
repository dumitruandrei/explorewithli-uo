import { getReviews } from '@/sanity/lib/fetch'
import { ReviewsCarousel } from '@/components/reviews-carousel'

export async function ReviewsSection() {
  const reviews = await getReviews()

  return (
    <section id="reviews" className="border-t border-border py-20">
      {/* Header container kept at max-w-6xl for consistent text alignment */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            Traveller Stories
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl text-balance">
            What Our Guests Say
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground">
            Real stories from travellers who&apos;ve journeyed with us through
            southwest China. Read more on Google.
          </p>
        </div>
      </div>

      {/* Carousel container made wider on desktop for a more immersive marquee feel */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:max-w-[1400px] 2xl:max-w-[1600px]">
        <ReviewsCarousel reviews={reviews} />
      </div>
    </section>
  )
}
