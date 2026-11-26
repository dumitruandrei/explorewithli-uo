import { CalendarDays, Sparkles, Users, Wallet } from 'lucide-react'
import { formatPrice } from '@/lib/travel'

export function KeyFacts({
  price,
  durationDays,
}: {
  price: number
  durationDays: number
}) {
  const dayLabel = durationDays === 1 ? 'day' : 'days'

  return (
    <section aria-label="Trip at a glance">
      <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className="relative col-span-2 flex items-center gap-4 overflow-hidden rounded-[1.5rem] bg-primary p-5 text-primary-foreground shadow-xl shadow-primary/20 sm:p-6 lg:col-span-1 lg:flex-col lg:items-start lg:gap-3">
          <span
            aria-hidden
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15"
          >
            <Wallet className="size-5" />
          </span>
          <div>
            <dt className="text-sm font-medium uppercase tracking-wider text-primary-foreground/80">
              {price > 0 ? 'From' : 'Price'}
            </dt>
            <dd className="mt-0.5">
              {price > 0 ? (
                <>
                  <span className="font-serif text-4xl font-semibold leading-none sm:text-5xl">
                    {formatPrice(price)}
                  </span>
                  <span className="mt-1 block text-sm text-primary-foreground/80">
                    per person · priced for a group of 4
                  </span>
                </>
              ) : (
                <>
                  <span className="font-serif text-3xl font-semibold leading-none">
                    On request
                  </span>
                  <span className="mt-1 block text-sm text-primary-foreground/80">
                    Tailored to your group
                  </span>
                </>
              )}
            </dd>
          </div>
        </div>

        <Fact
          icon={<CalendarDays className="size-5" />}
          label="Duration"
          value={`${durationDays} ${dayLabel}`}
          note="Shorter or longer on request"
        />
        <Fact
          icon={<Users className="size-5" />}
          label="Group size"
          value="Priced for 4"
          note="Fewer or more? No problem"
        />
        <Fact
          className="col-span-2 lg:col-span-1"
          icon={<Sparkles className="size-5" />}
          label="Flexibility"
          value="Tailor-made"
          note="Swap activities, change pace"
        />
      </dl>
    </section>
  )
}

function Fact({
  icon,
  label,
  value,
  note,
  className = '',
}: {
  icon: React.ReactNode
  label: string
  value: string
  note: string
  className?: string
}) {
  return (
    <div
      className={`flex flex-col gap-3 rounded-[1.5rem] border border-border bg-card p-4 shadow-lg shadow-foreground/5 sm:p-6 ${className}`}
    >
      <span
        aria-hidden
        className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary"
      >
        {icon}
      </span>
      <div>
        <dt className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </dt>
        <dd className="mt-0.5">
          <span className="font-serif text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
            {value}
          </span>
          <span className="mt-1 block text-sm leading-snug text-muted-foreground">{note}</span>
        </dd>
      </div>
    </div>
  )
}
