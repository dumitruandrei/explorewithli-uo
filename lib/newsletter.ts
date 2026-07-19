import { Resend } from 'resend'

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set')
  }
  return new Resend(apiKey)
}

export async function subscribeToNewsletter(email: string) {
  try {
    const resend = getResendClient()
    // Add contact to the existing newsletter list
    const response = await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_NEWSLETTER_LIST_ID || 'Newsletter',
    })

    return { success: true, data: response }
  } catch (error: any) {
    // Handle duplicate email gracefully
    if (error.message?.includes('already exists')) {
      return { success: true, isDuplicate: true }
    }
    throw error
  }
}
