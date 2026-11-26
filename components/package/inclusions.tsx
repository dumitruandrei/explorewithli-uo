import { Check, X } from 'lucide-react'

export function Inclusions({
  included = [],
  notIncluded = [],
}: {
  included?: string[]
  notIncluded?: string[]
}) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      {included.length > 0 && (
        <div className="rounded-[1.5rem] border border-primary/20 bg-primary/5 p-5 sm:p-6">
          <h3 className="flex items-center gap-3 font-serif text-xl text-foreground">
            <span
              aria-hidden
              className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              <Check className="size-5" />
            </span>
            What&apos;s included
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 leading-snug text-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {notIncluded.length > 0 && (
        <div className="rounded-[1.5rem] border border-border bg-muted/50 p-5 sm:p-6">
          <h3 className="flex items-center gap-3 font-serif text-xl text-foreground">
            <span
              aria-hidden
              className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground"
            >
              <X className="size-5" />
            </span>
            Not included
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {notIncluded.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 leading-snug text-muted-foreground"
              >
                <X className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
