'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: FormData) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set')
  }

  const firstName = formData.get('first-name')
  const lastName = formData.get('last-name')
  const email = formData.get('email')
  const subject = formData.get('subject')
  const message = formData.get('message')

  if (!firstName || !lastName || !email || !subject || !message) {
    throw new Error('Missing required fields')
  }

  try {
    const result = await resend.emails.send({
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

    if (result.error) {
      throw new Error(result.error.message)
    }

    return { success: true }
  } catch (error: any) {
    throw new Error(error.message)
  }
}
