import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function subscribeToNewsletter(email: string) {
  try {
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
