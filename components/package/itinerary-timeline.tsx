import { MapPin } from 'lucide-react'
import type { ItineraryDay } from '@/lib/travel'

export function ItineraryTimeline({ days }: { days: ItineraryDay[] }) {
  return (
    <ol className="mt-8 flex flex-col">
      {days.map((day, i) => {
        const isLast = i === days.length - 1
        return (
          <li key={day.day} className="flex gap-3 sm:gap-5">
            <div className="flex flex-col items-center">
              <span className="flex size-12 shrink-0 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/20 sm:size-14">
                <span className="text-[0.65rem] font-medium uppercase leading-none tracking-wider opacity-80">
                  Day
                </span>
                <span className="font-serif text-lg font-semibold leading-none sm:text-xl">
                  {day.day}
                </span>
              </span>
              {!isLast && (
                <span
                  aria-hidden
                  className="my-2 w-0 flex-1 border-l-2 border-dashed border-primary/30"
                />
              )}
            </div>

            <div
              className={`min-w-0 flex-1 rounded-[1.25rem] border border-border bg-card p-4 sm:p-6 ${
                isLast ? '' : 'mb-4'
              }`}
            >
              <h3 className="font-serif text-xl leading-snug text-foreground text-balance sm:text-2xl">
                {day.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{day.description}</p>
              {day.activities.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {day.activities.map((activity) => (
                    <li
                      key={activity}
                      className="inline-flex items-start gap-1.5 rounded-2xl bg-secondary px-3 py-1.5 text-sm leading-snug text-secondary-foreground"
                    >
                      <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
