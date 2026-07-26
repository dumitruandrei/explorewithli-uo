import { Resend } from 'resend'

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set')
  }
  return new Resend(apiKey)
}

export async function subscribeToNewsletter(email: string, firstName: string, lastName: string) {
  try {
    const resend = getResendClient()
    // Add contact to the newsletter segment
    const response = await resend.contacts.create({
      email,
      firstName,
      lastName,
      segmentId: process.env.RESEND_NEWSLETTER_LIST_ID,
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
