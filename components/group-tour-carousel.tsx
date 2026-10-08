'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Slide = { src: string; alt: string }

export function GroupTourCarousel({ slides }: { slides: Slide[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  const goTo = useCallback(
    (next: number) => {
      const track = trackRef.current
      if (!track) return
      const target = (next + slides.length) % slides.length
      track.scrollTo({ left: target * track.clientWidth, behavior: 'smooth' })
    },
    [slides.length],
  )

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      setIndex(Math.round(track.scrollLeft / track.clientWidth))
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  const arrowClass =
    'absolute top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex'

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Tour photos"
      className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border shadow-sm"
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') goTo(index - 1)
        if (event.key === 'ArrowRight') goTo(index + 1)
      }}
    >
      <div
        ref={trackRef}
        className="flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            className="relative h-full w-full shrink-0 snap-center"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Previous photo"
        className={cn(arrowClass, 'left-3')}
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Next photo"
        className={cn(arrowClass, 'right-3')}
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center">
        <div className="flex items-center gap-1 rounded-full bg-background/70 px-2 py-1 backdrop-blur">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === index}
              className="flex size-5 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                className={cn(
                  'block h-1.5 rounded-full transition-all',
                  i === index
                    ? 'w-5 bg-primary'
                    : 'w-1.5 bg-foreground/40',
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
