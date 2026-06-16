'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Star, ExternalLink } from 'lucide-react'
import type { Review } from '@/sanity/lib/fetch'

export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Dragging state
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const scrollLeftStartRef = useRef(0)
  const wasMovedRef = useRef(false)
  const dragDistanceRef = useRef(0)

  // Hover and pause state
  const [isHovered, setIsPaused] = useState(false)

  // Speed of auto scrolling (smaller is slower and more relaxed)
  // e.g., 0.35px per frame provides a very comfortable, non-intrusive drift
  const speed = 0.35

  // Triple the array to guarantee seamless wrapping under all screen resolutions
  const marqueeItems = [...reviews, ...reviews, ...reviews]

  // Setup loop and initial scroll to the middle copy
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Position initial scroll in the middle (the second copy)
    const oneSetWidth = container.scrollWidth / 3
    container.scrollLeft = oneSetWidth

    let animationFrameId: number

    const updateScroll = () => {
      // Don't auto-scroll while dragging
      if (container && !isDragging && !isHovered) {
        container.scrollLeft += speed

        const currentScroll = container.scrollLeft
        const widthOfOneSet = container.scrollWidth / 3

        // Right side wrapping check
        if (currentScroll >= widthOfOneSet * 2) {
          container.scrollLeft = currentScroll - widthOfOneSet
        }
        // Left side wrapping check (important for manual backward dragging)
        else if (currentScroll <= widthOfOneSet) {
          container.scrollLeft = currentScroll + widthOfOneSet
        }
      }

      animationFrameId = requestAnimationFrame(updateScroll)
    }

    animationFrameId = requestAnimationFrame(updateScroll)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isDragging, isHovered, speed])

  // Mouse Drag Event Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current
    if (!container) return

    setIsDragging(true)
    wasMovedRef.current = false
    dragDistanceRef.current = 0
    startXRef.current = e.pageX - container.offsetLeft
    scrollLeftStartRef.current = container.scrollLeft
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const container = containerRef.current
    if (!container) return

    e.preventDefault()
    const x = e.pageX - container.offsetLeft
    const distanceMoved = x - startXRef.current
    dragDistanceRef.current = Math.abs(distanceMoved)

    if (dragDistanceRef.current > 5) {
      wasMovedRef.current = true
    }

    // Direct scroll modification
    container.scrollLeft = scrollLeftStartRef.current - distanceMoved

    // Boundary wrapping on-the-fly while dragging
    const currentScroll = container.scrollLeft
    const oneSetWidth = container.scrollWidth / 3
    if (currentScroll >= oneSetWidth * 2) {
      container.scrollLeft = currentScroll - oneSetWidth
      scrollLeftStartRef.current -= oneSetWidth
      startXRef.current = x // Reset tracking origin
    } else if (currentScroll <= oneSetWidth) {
      container.scrollLeft = currentScroll + oneSetWidth
      scrollLeftStartRef.current += oneSetWidth
      startXRef.current = x // Reset tracking origin
    }
  }

  const handleMouseUpOrLeave = () => {
    setIsDragging(false)
  }

  // Prevent link navigation if drag took place
  const handleLinkClick = (e: React.MouseEvent) => {
    if (wasMovedRef.current) {
      e.preventDefault()
    }
  }

  // Touch Event Handlers to pause auto-scroll during swipe gestures
  const handleTouchStart = () => {
    setIsPaused(true)
  }

  const handleTouchEnd = () => {
    setIsPaused(false)
  }

  if (!reviews || reviews.length === 0) return null

  return (
    <div className="relative w-full overflow-hidden py-4 select-none">
      {/* Subtle fade effect on the left and right edges for a premium look */}
      <div className="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none sm:w-32" />
      <div className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none sm:w-32" />

      {/* Scrolling Belt */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-6 overflow-x-auto scrollbar-none py-4 cursor-grab active:cursor-grabbing active:scale-[0.995] transition-transform duration-200"
      >
        {marqueeItems.map((review, index) => (
          <a
            key={`${review.id}-${index}`}
            href={review.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="group flex w-[280px] shrink-0 flex-col justify-between rounded-lg border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40 sm:w-[320px] pointer-events-auto"
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
              <p className="mt-3 text-xs text-foreground/90 leading-relaxed sm:text-sm line-clamp-4 italic select-none">
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
                    className="object-cover pointer-events-none"
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
