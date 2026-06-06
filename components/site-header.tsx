'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'
import { destinations } from '@/lib/destinations'
import { Button } from '@/components/ui/button'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [destOpen, setDestOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Journeys', href: '/#destinations' },
    { label: 'Journal', href: '/#journal' },
    { label: 'Contact', href: '/#contact' },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border bg-background/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className={`font-serif text-xl tracking-tight transition-colors sm:text-2xl ${
            scrolled ? 'text-foreground' : 'text-background'
          }`}
        >
          Horizon<span className="text-primary">.</span>Travel
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setDestOpen(true)}
            onMouseLeave={() => setDestOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDestOpen((v) => !v)}
              aria-expanded={destOpen}
              className={`flex items-center gap-1 rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
                scrolled
                  ? 'text-foreground hover:text-primary'
                  : 'text-background hover:text-background/80'
              }`}
            >
              Destinations
              <ChevronDown
                className={`size-4 transition-transform ${destOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {destOpen && (
              <div className="absolute left-0 top-full w-64 pt-2">
                <div className="overflow-hidden rounded-md border border-border bg-popover shadow-xl">
                  {destinations.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/destinations/${d.slug}`}
                      className="block border-b border-border px-4 py-3 last:border-0 transition-colors hover:bg-secondary"
                    >
                      <span className="block font-serif text-base text-popover-foreground">
                        {d.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {d.tagline}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
                scrolled
                  ? 'text-foreground hover:text-primary'
                  : 'text-background hover:text-background/80'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Button size="sm" className="ml-2" render={<Link href="/#contact" />}>
            Plan your trip
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className={`lg:hidden ${scrolled ? 'text-foreground' : 'text-background'}`}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-5 py-4 lg:hidden">
          <p className="px-1 pb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Destinations
          </p>
          {destinations.map((d) => (
            <Link
              key={d.slug}
              href={`/destinations/${d.slug}`}
              onClick={() => setMobileOpen(false)}
              className="block rounded-sm px-1 py-2 font-serif text-lg text-foreground"
            >
              {d.name}
            </Link>
          ))}
          <div className="my-3 h-px bg-border" />
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-sm px-1 py-2 text-base text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Button
            className="mt-3 w-full"
            render={
              <Link href="/#contact" onClick={() => setMobileOpen(false)} />
            }
          >
            Plan your trip
          </Button>
        </div>
      )}
    </header>
  )
}
