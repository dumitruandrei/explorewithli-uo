'use client'

import { useState, useRef, useEffect } from 'react'
import { Mail, X } from 'lucide-react'
import { NewsletterForm } from '@/components/newsletter-form'

export function NewsletterSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const expandRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (expandRef.current && !expandRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <>
      {/* Fixed sidebar button */}
      <div className="fixed right-6 bottom-6 sm:right-8 sm:bottom-8 z-40">
        {isOpen && (
          <div
            ref={expandRef}
            className="absolute bottom-0 right-0 mb-16 w-80 rounded-lg border border-border bg-card shadow-lg p-6 animate-in fade-in slide-in-from-bottom-4 duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Mail className="size-5 text-primary" />
                <h3 className="font-serif text-lg text-foreground">Get the next article</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to receive fresh travel stories and insights delivered to your inbox.
            </p>
            <NewsletterForm variant="light" compact />
          </div>
        )}

        {/* Envelope button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center size-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 group relative"
          aria-label="Newsletter signup"
        >
          <Mail className="size-6 group-hover:scale-110 transition-transform" />
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
          )}
        </button>
      </div>
    </>
  )
}
