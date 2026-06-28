import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, travelDate, duration, people, message, context } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !travelDate || !duration || !people) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const name = `${firstName} ${lastName}`

    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.CONTACT_EMAIL || 'info@explorechongqingwithli.com'
    const fromEmail = process.env.FROM_EMAIL || 'Explore with Li <onboarding@resend.dev>'

    if (!apiKey) {
      console.warn(
        'RESEND_API_KEY is not configured. Logging contact form submission instead:',
        body
      )
      // Return a simulated success in development so the UI doesn't break
      return NextResponse.json({
        success: true,
        message: 'Form received (Simulation mode: RESEND_API_KEY is missing)',
      })
    }

    const resend = new Resend(apiKey)

    // Format a beautiful, premium HTML email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Enquiry - Explore with Li</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              line-height: 1.6;
              color: #1a1a1a;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
              border: 1px solid #eaeaea;
            }
            .header {
              background-color: #0f172a; /* Dark premium background matching site */
              padding: 32px;
              text-align: center;
              border-bottom: 3px solid #854d0e; /* Accent border */
            }
            .header h1 {
              color: #ffffff;
              font-family: Georgia, serif;
              font-size: 24px;
              margin: 0;
              letter-spacing: 0.05em;
            }
            .header p {
              color: #94a3b8;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.2em;
              margin: 8px 0 0 0;
            }
            .content {
              padding: 40px 32px;
            }
            .intro {
              font-size: 16px;
              color: #334155;
              margin-bottom: 24px;
            }
            .details-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 32px;
            }
            .details-table th, .details-table td {
              padding: 12px 16px;
              text-align: left;
              border-bottom: 1px solid #f1f5f9;
            }
            .details-table th {
              background-color: #f8fafc;
              color: #475569;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              width: 35%;
            }
            .details-table td {
              color: #0f172a;
              font-size: 14px;
            }
            .message-box {
              background-color: #f8fafc;
              border-left: 4px solid #854d0e;
              padding: 20px;
              border-radius: 4px;
              margin-top: 24px;
            }
            .message-box h3 {
              margin-top: 0;
              font-family: Georgia, serif;
              color: #0f172a;
              font-size: 16px;
            }
            .message-box p {
              margin: 0;
              font-size: 14px;
              color: #334155;
              white-space: pre-wrap;
              font-style: italic;
            }
            .footer {
              background-color: #f8fafc;
              padding: 24px;
              text-align: center;
              font-size: 12px;
              color: #64748b;
              border-top: 1px solid #eaeaea;
            }
            .footer p {
              margin: 4px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Explore with Li</h1>
              <p>New Journey Enquiry</p>
            </div>
            <div class="content">
              <p class="intro">
                You have received a new trip enquiry from <strong>${name}</strong>${context ? ` regarding <strong>${context}</strong>` : ''}.
              </p>
              
              <table class="details-table">
                <tr>
                  <th>First Name</th>
                  <td>${firstName}</td>
                </tr>
                <tr>
                  <th>Last Name</th>
                  <td>${lastName}</td>
                </tr>
                <tr>
                  <th>Email Address</th>
                  <td><a href="mailto:${email}" style="color: #854d0e; text-decoration: none; font-weight: 500;">${email}</a></td>
                </tr>
                <tr>
                  <th>Travel Date</th>
                  <td>${travelDate}</td>
                </tr>
                <tr>
                  <th>Trip Duration</th>
                  <td>${duration}</td>
                </tr>
                <tr>
                  <th>Travellers</th>
                  <td>${people} ${parseInt(people) === 1 ? 'person' : 'people'}</td>
                </tr>
                ${context ? `
                <tr>
                  <th>Enquiry Context</th>
                  <td>${context}</td>
                </tr>` : ''}
              </table>

              ${message ? `
              <div class="message-box">
                <h3>Dream Trip Details</h3>
                <p>"${message}"</p>
              </div>` : ''}
            </div>
            <div class="footer">
              <p>This email was sent from the Explore with Li contact form.</p>
              <p>&copy; ${new Date().getFullYear()} Explore with Li. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: `${name} <${email}>`, // Allows Hanghang to reply directly to the customer
      subject: `New Enquiry from ${name}${context ? ` (${context})` : ''}`,
      html: htmlContent,
    })

    if (error) {
      console.error('Resend API error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}
