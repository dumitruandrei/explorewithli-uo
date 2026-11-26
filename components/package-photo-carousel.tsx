'use client'

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { ImageWithAlt } from '@/lib/travel'

export function PackagePhotoCarousel({
  photos,
  title,
}: {
  photos: ImageWithAlt[]
  title: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const activePhoto = photos[activeIndex]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  function showPrevious() {
    setActiveIndex((index) => (index === 0 ? photos.length - 1 : index - 1))
  }

  function showNext() {
    setActiveIndex((index) => (index + 1) % photos.length)
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDialogElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      showPrevious()
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      showNext()
    }
  }

  if (photos.length === 0) return null

  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((photo, index) => (
          <button
            key={`${photo.src}-${index}`}
            type="button"
            onClick={() => {
              setActiveIndex(index)
              setIsOpen(true)
            }}
            aria-label={`Open photo ${index + 1} of ${photos.length}: ${photo.alt}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-md bg-muted text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Image
              src={photo.src || '/placeholder.svg'}
              alt={photo.alt}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="sr-only">Open photo in carousel</span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="package-photo-viewer-title"
        onCancel={(event) => {
          event.preventDefault()
          setIsOpen(false)
        }}
        onClose={() => setIsOpen(false)}
        onKeyDown={handleKeyDown}
        className="fixed inset-0 m-0 h-dvh w-full max-h-none max-w-none overflow-hidden border-0 bg-transparent p-0 text-foreground backdrop:bg-black/90"
      >
        <div
          className="flex h-full flex-col bg-black/90 p-4 text-white sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false)
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 id="package-photo-viewer-title" className="text-sm font-medium sm:text-base">
                {title}
              </h2>
              <p className="mt-1 text-xs text-white/70" aria-live="polite">
                Photo {activeIndex + 1} of {photos.length}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close photo viewer"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <div className="relative my-4 min-h-0 flex-1">
            <Image
              src={activePhoto.src || '/placeholder.svg'}
              alt={activePhoto.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4"
                >
                  <ChevronLeft className="size-6" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4"
                >
                  <ChevronRight className="size-6" aria-hidden />
                </button>
              </>
            )}
          </div>

          <p className="min-h-5 text-center text-sm text-white/80">{activePhoto.alt}</p>
        </div>
      </dialog>
    </>
  )
}
