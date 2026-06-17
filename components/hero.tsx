'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      {/* Animated image base layer (always visible, cinematic loop) */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-china.png"
          alt="Misty layered mountains and terraced valleys of southwest China at golden hour"
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover"
        />
      </div>

      {/* Loopable background videos, responsive to screen size */}
      <video
        key="desktop-video"
        className="absolute inset-0 hidden h-full w-full object-cover sm:block"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-china.png"
      >
        <source src="/videos/hero-desktop.webm" type="video/webm" />
      </video>
      <video
        key="mobile-video"
        className="absolute inset-0 block h-full w-full object-cover sm:hidden"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-china.png"
      >
        <source src="/videos/hero-mobile.webm" type="video/webm" />
      </video>

      {/* Gradient scrims for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/35" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-background/80">
            Boutique journeys · Southwest China
          </p>
          <h1 className="font-serif text-4xl leading-[1.05] text-background text-balance sm:text-6xl lg:text-7xl">
            Travel China slowly, deeply, and entirely on your own terms.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-background/85 sm:text-lg text-pretty">
            From the panda forests of Sichuan to the snow peaks of Yunnan and
            the river gorges of Chongqing — every Explore with Li journey is shaped
            around you. Flexible group size, duration and experiences.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="#destinations" />}
            >
              Explore destinations
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="border-background/40 bg-background/10 text-background backdrop-blur hover:bg-background/20 hover:text-background"
              render={<Link href="#contact" />}
            >
              Plan your trip
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
