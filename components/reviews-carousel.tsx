'use client'

import Image from 'next/image'
import { Star, ExternalLink } from 'lucide-react'
import type { Review } from '@/sanity/lib/fetch'

export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) return null

  // Duplicate the array to ensure seamless, continuous wrapping in the marquee
  const marqueeItems = [...reviews, ...reviews]

  return (
    <div className="relative w-full overflow-hidden py-4 select-none">
      {/* Subtle fade effect on the left and right edges for a premium look, optimized for mobile readability */}
      <div className="absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none sm:w-24 md:w-32" />
      <div className="absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none sm:w-24 md:w-32" />

      {/* Scrolling Belt - Uses highly performant hardware-accelerated CSS marquee */}
      <div 
        className="flex w-max animate-marquee pause-hover gap-6 py-4"
        style={{ animationDuration: '60s' }} // Very comfortable, slow and highly readable pace
      >
        {marqueeItems.map((review, index) => (
          <a
            key={`${review.id}-${index}`}
            href={review.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-[280px] shrink-0 flex-col justify-between rounded-lg border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md sm:w-[320px]"
          >
            <div>
              {/* Star Rating & Quote Mark */}
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-3.5 ${
                        i < review.stars
                          ? 'fill-primary text-primary'
                          : 'text-border'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-serif text-3xl leading-none text-primary/10 select-none">&ldquo;</span>
              </div>

              {/* Compact Review Content */}
              <p className="mt-3 text-xs text-foreground/90 leading-relaxed sm:text-sm line-clamp-4 italic">
                {review.comment}
              </p>
            </div>

            {/* Compact Reviewer Profile Footer */}
            <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3">
              <div className="flex items-center gap-2.5">
                <div className="relative size-8 overflow-hidden rounded-full bg-secondary border border-border/40">
                  <Image
                    src={review.avatarUrl}
                    alt={review.travelerName}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                    {review.travelerName}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Google Review
                  </p>
                </div>
              </div>
              <ExternalLink className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
