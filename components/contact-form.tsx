'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

type ContactFormProps = {
  context?: string
  variant?: 'light' | 'dark'
  compact?: boolean
}

export function ContactForm({
  context,
  variant = 'light',
  compact = false,
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isDark = variant === 'dark'
  const labelClass = `mb-1.5 block text-xs font-medium uppercase tracking-wider ${
    isDark ? 'text-background/70' : 'text-muted-foreground'
  }`
  const fieldClass = `w-full rounded-sm border bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:ring-1 ${
    isDark
      ? 'border-background/25 text-background placeholder:text-background/40 focus:border-background/60 focus:ring-background/40'
      : 'border-border text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary/40'
  }`

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      travelDate: formData.get('travelDate'),
      duration: formData.get('duration'),
      people: formData.get('people'),
      message: formData.get('message'),
      context: context || null,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error || 'Something went wrong. Please try again.')
      }

      setSubmitted(true)
    } catch (err: any) {
      console.error('Submission error:', err)
      setError(err.message || 'Failed to send enquiry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div
        className={`rounded-md border p-6 text-center ${
          isDark
            ? 'border-background/20 text-background'
            : 'border-border bg-card text-foreground'
        }`}
      >
        <h4 className="font-serif text-xl">Thank you</h4>
        <p
          className={`mt-2 text-sm leading-relaxed ${
            isDark ? 'text-background/70' : 'text-muted-foreground'
          }`}
        >
          {context
            ? `We received your enquiry about ${context}.`
            : 'We received your enquiry.'}{' '}
          A travel specialist will be in touch within 24 hours to shape your
          journey.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div className={compact ? '' : 'sm:col-span-1'}>
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="Your name"
            className={fieldClass}
          />
        </div>

        <div className={compact ? '' : 'sm:col-span-1'}>
          <label htmlFor="email" className={labelClass}>
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="travelDate" className={labelClass}>
            Travel date
          </label>
          <input
            id="travelDate"
            name="travelDate"
            type="date"
            required
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="duration" className={labelClass}>
            Trip duration (days)
          </label>
          <input
            id="duration"
            name="duration"
            type="number"
            min={1}
            required
            placeholder="Number of days"
            className={fieldClass}
          />
        </div>

        <div className={compact ? '' : 'sm:col-span-2'}>
          <label htmlFor="people" className={labelClass}>
            Number of travellers
          </label>
          <input
            id="people"
            name="people"
            type="number"
            min={1}
            defaultValue={4}
            required
            className={fieldClass}
          />
        </div>

        <div className={compact ? '' : 'sm:col-span-2'}>
          <label htmlFor="message" className={labelClass}>
            Tell us about your dream trip
          </label>
          <textarea
            id="message"
            name="message"
            rows={compact ? 3 : 4}
            placeholder="Interests, pace, must-sees, special occasions…"
            className={`${fieldClass} resize-none`}
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-center text-sm font-medium text-red-500">
          {error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className={`mt-5 w-full ${
          isDark
            ? 'bg-background text-foreground hover:bg-background/90'
            : ''
        }`}
      >
        {loading ? 'Sending enquiry...' : 'Request your tailored itinerary'}
      </Button>
      <p
        className={`mt-3 text-center text-xs leading-relaxed ${
          isDark ? 'text-background/60' : 'text-muted-foreground'
        }`}
      >
        Everything is flexible — group size, duration and activities can all be
        adjusted. Pricing will adapt accordingly.
      </p>
    </form>
  )
}
