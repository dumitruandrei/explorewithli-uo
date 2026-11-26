import { ArrowRight, Clock, MapPin, Sparkles, Users } from 'lucide-react'

const TWEAKS = [
  { icon: Users, label: 'Group size' },
  { icon: Clock, label: 'Trip length' },
  { icon: MapPin, label: 'Activities' },
]

export function FlexibilityCallout() {
  return (
    <aside
      aria-labelledby="make-it-yours"
      className="relative overflow-hidden rounded-[1.75rem] bg-secondary p-6 sm:p-8"
    >
      <Sparkles
        aria-hidden
        className="absolute -right-4 -top-4 size-28 rotate-12 text-primary/10"
      />
      <div className="relative">
        <h2 id="make-it-yours" className="font-serif text-2xl text-foreground sm:text-3xl">
          Make it yours
        </h2>
        <p className="mt-2 max-w-xl leading-relaxed text-secondary-foreground/80">
          Nothing here is set in stone. Tell us what you&apos;d love to change and
          we&apos;ll shape the trip around you. Pricing adapts accordingly.
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {TWEAKS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground"
            >
              <Icon className="size-4 text-primary" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
        <a
          href="#enquire"
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Tell us what you&apos;d change
          <ArrowRight className="size-4" aria-hidden />
        </a>
      </div>
    </aside>
  )
}
