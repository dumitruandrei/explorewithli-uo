'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type NavSection = { id: string; label: string }

export function GroupTourSectionNav({ sections }: { sections: NavSection[] }) {
  const [activeId, setActiveId] = useState(sections[0].id)
  const [labelVisible, setLabelVisible] = useState(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    for (const { id } of sections) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [sections])

  // Briefly reveal the current section name on change so touch users get feedback without hover.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setLabelVisible(true)
    if (hideTimer.current) clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setLabelVisible(false), 1800)
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  }, [activeId])

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const el = document.getElementById(id)
    if (!el) return
    event.preventDefault()
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    el.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
    history.replaceState(null, '', `#${id}`)
    setActiveId(id)
  }

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-0 top-1/2 z-30 -translate-y-1/2"
    >
      <ul className="flex flex-col">
        {sections.map(({ id, label }) => {
          const active = id === activeId
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                aria-current={active ? 'location' : undefined}
                aria-label={label}
                className="group relative flex h-8 w-5 items-center justify-center focus-visible:outline-none sm:w-6"
              >
                <span
                  className={cn(
                    'pointer-events-none absolute right-full mr-1 whitespace-nowrap rounded-full border border-border bg-card/90 px-2.5 py-1 text-xs font-medium text-foreground opacity-0 shadow-sm backdrop-blur transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100',
                    active && labelVisible && 'opacity-100',
                  )}
                >
                  {label}
                </span>
                <span
                  className={cn(
                    'block rounded-full transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background',
                    active
                      ? 'h-4 w-1.5 bg-primary'
                      : 'size-1.5 bg-muted-foreground/50 group-hover:bg-primary/70',
                  )}
                />
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
