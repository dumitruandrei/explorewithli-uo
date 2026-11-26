'use client'

import { useEffect, useState } from 'react'

export function MobileEnquireBar({
  priceLabel,
  targetId = 'enquire',
}: {
  priceLabel: string | null
  targetId?: string
}) {
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    const candidates: (Element | null)[] = [
      document.getElementById(targetId),
      document.querySelector('footer'),
    ]
    const targets = candidates.filter((el): el is Element => el !== null)
    if (targets.length === 0) return
    const visibleTargets = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleTargets.add(entry.target)
          else visibleTargets.delete(entry.target)
        }
        setFormVisible(visibleTargets.size > 0)
      },
      { threshold: 0.1 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [targetId])

  return (
    <div
      aria-hidden={formVisible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        formVisible ? 'pointer-events-none translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
        <p className="min-w-0 leading-tight">
          {priceLabel ? (
            <>
              <span className="block text-xs text-muted-foreground">From, per person</span>
              <span className="font-serif text-xl font-semibold text-foreground">{priceLabel}</span>
            </>
          ) : (
            <span className="font-serif text-lg text-foreground">Tailor-made trip</span>
          )}
        </p>
        <a
          href={`#${targetId}`}
          tabIndex={formVisible ? -1 : 0}
          className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Enquire
        </a>
      </div>
    </div>
  )
}
