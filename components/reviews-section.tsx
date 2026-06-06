'use client'

import Image from 'next/image'
import { Star, ExternalLink } from 'lucide-react'
import { reviews } from '@/lib/destinations'

export function ReviewsSection() {
  return (
    <section id="reviews" className="border-t border-border py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
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

        {/* Reviews grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {reviews.map((review) => (
            <a
              key={review.id}
              href={review.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${
                      i < review.stars
                        ? 'fill-primary text-primary'
                        : 'text-border'
                    }`}
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="mt-4 flex-1 leading-relaxed text-foreground">
                {review.comment}
              </p>

              {/* Traveler info */}
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="relative size-10 overflow-hidden rounded-full bg-secondary">
                    <Image
                      src={review.avatar}
                      alt={review.travelerName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {review.travelerName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Google Review
                    </p>
                  </div>
                </div>
                <ExternalLink className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
