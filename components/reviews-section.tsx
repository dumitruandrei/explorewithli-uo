import { getReviews } from '@/sanity/lib/fetch'
import { ReviewsCarousel } from '@/components/reviews-carousel'

export async function ReviewsSection() {
  const reviews = await getReviews()

  return (
    <section id="reviews" className="border-t border-border py-20">
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

        <div className="px-4 sm:px-8">
          <ReviewsCarousel reviews={reviews} />
        </div>
      </div>
    </section>
  )
}
