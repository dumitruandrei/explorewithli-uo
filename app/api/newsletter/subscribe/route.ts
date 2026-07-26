import { NextResponse } from 'next/server'
import { subscribeToNewsletter } from '@/lib/newsletter'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, firstName, lastName } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    // Validate names
    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'First name and last name are required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.warn('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Newsletter service is not configured' },
        { status: 500 }
      )
    }

    const result = await subscribeToNewsletter(email, firstName, lastName)

    return NextResponse.json({
      success: true,
      message: result.isDuplicate
        ? 'You are already subscribed to our newsletter'
        : 'Successfully subscribed to our newsletter',
    })
  } catch (err: any) {
    console.error('Newsletter subscription error:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}
