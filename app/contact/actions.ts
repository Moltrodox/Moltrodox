'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: FormData) {
  const firstName = formData.get('first-name') as string
  const lastName = formData.get('last-name') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  try {
    await resend.emails.send({
      from: 'Moltrodox Contact Form <onboarding@resend.dev>',
      to: 'moltrodox@gmail.com',
      subject: `Contact Form: ${subject}`,
      text: `
Name: ${firstName} ${lastName}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `
    })
    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { error: 'Failed to send email' }
  }
}
