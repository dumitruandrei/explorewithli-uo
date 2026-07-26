'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

type NewsletterFormProps = {
  variant?: 'light' | 'dark'
  compact?: boolean
  showPrivacy?: boolean
}

export function NewsletterForm({ variant = 'light', compact = false, showPrivacy = true }: NewsletterFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [privacyConsent, setPrivacyConsent] = useState(false)

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

    if (showPrivacy && !privacyConsent) {
      setError('Please agree to receive communications to continue.')
      setLoading(false)
      return
    }

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, firstName, lastName }),
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
        {/* Name fields */}
        {!compact && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="newsletter-firstName" className={labelClass}>
                First name
              </label>
              <input
                id="newsletter-firstName"
                name="firstName"
                type="text"
                required
                placeholder="John"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="newsletter-lastName" className={labelClass}>
                Last name
              </label>
              <input
                id="newsletter-lastName"
                name="lastName"
                type="text"
                required
                placeholder="Doe"
                className={fieldClass}
              />
            </div>
          </div>
        )}

        {/* Email field */}
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
            size={compact ? 'sm' : 'lg'}
            disabled={loading || (showPrivacy && !privacyConsent)}
            className={`shrink-0 whitespace-nowrap px-6 h-[42px] ${isDark ? 'bg-background text-foreground hover:bg-background/90' : ''}`}
          >
            {loading ? '...' : 'Subscribe'}
          </Button>
        </div>
      </div>

      {/* Privacy consent checkbox */}
      {showPrivacy && (
        <div className={`mt-3 flex items-start gap-2 ${compact ? 'text-xs' : ''}`}>
          <input
            id="newsletter-privacy"
            type="checkbox"
            checked={privacyConsent}
            onChange={(e) => setPrivacyConsent(e.target.checked)}
            className={`mt-1 rounded border ${
              isDark
                ? 'border-background/25 bg-transparent accent-background'
                : 'border-border bg-background accent-primary'
            }`}
          />
          <label
            htmlFor="newsletter-privacy"
            className={`leading-relaxed ${
              isDark ? 'text-background/70 text-xs' : 'text-muted-foreground text-xs'
            }`}
          >
            I agree to receive travel stories and updates. You can unsubscribe at any time by clicking the unsubscribe link in any email.
          </label>
        </div>
      )}

      {error && (
        <p className="mt-2 text-xs font-medium text-red-500">{error}</p>
      )}
    </form>
  )
}
