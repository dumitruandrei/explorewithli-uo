'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

type NewsletterFormProps = {
  variant?: 'light' | 'dark'
  compact?: boolean
}

export function NewsletterForm({ variant = 'light', compact = false }: NewsletterFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isDark = variant === 'dark'
  const labelClass = `mb-2 block text-xs font-medium uppercase tracking-wider ${
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
    const email = formData.get('email') as string

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error || 'Something went wrong. Please try again.')
      }

      setSubmitted(true)
      e.currentTarget.reset()

      // Reset the form after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (err: any) {
      console.error('Newsletter subscription error:', err)
      setError(err.message || 'Failed to subscribe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div
        className={`rounded-md border p-4 text-center ${
          isDark
            ? 'border-background/20 text-background'
            : 'border-border bg-card text-foreground'
        }`}
      >
        <p className="font-serif text-lg">Thank you for subscribing!</p>
        <p
          className={`mt-1 text-xs leading-relaxed ${
            isDark ? 'text-background/70' : 'text-muted-foreground'
          }`}
        >
          Check your inbox for the next article.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={compact ? 'space-y-2' : 'space-y-3'}>
        {!compact && (
          <label htmlFor="newsletter-email" className={labelClass}>
            Email address
          </label>
        )}
        <div className="flex gap-2">
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder={compact ? 'your@email.com' : 'your@email.com'}
            className={fieldClass}
          />
          <Button
            type="submit"
            size={compact ? 'sm' : 'md'}
            disabled={loading}
            className={isDark ? 'bg-background text-foreground hover:bg-background/90' : ''}
          >
            {loading ? '...' : compact ? 'Join' : 'Subscribe'}
          </Button>
        </div>
      </div>

      {error && (
        <p className="mt-2 text-xs font-medium text-red-500">{error}</p>
      )}
    </form>
  )
}
