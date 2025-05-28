import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend('re_ZH3qkay2_9MSaUfSDtk232TAqqghzsahs');

export async function POST(request: Request) {
  try {
    const { to, subject, message } = await request.json();

    console.log('Attempting to send email with data:', { to, subject });

    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: 'To, subject, and message are required' },
        { status: 400 }
      );
    }

    // Make sure the "from" email is properly verified in your Resend account
    const data = await resend.emails.send({
      from: 'Keyboard Store <onboarding@resend.dev>', // This must be a verified domain or the default Resend address
      to: [to],
      subject: subject,
      text: message,
      // You can also add HTML content
      html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>${subject}</h2>
        <p>${message.replace(/\n/g, '<br/>')}</p>
        <hr/>
        <p>Sent from Keyboard Store</p>
      </div>`,
    });

    console.log('Email sent successfully:', data);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      data: data
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ 
      success: false,
      error: (error as Error).message 
    }, { 
      status: 500 
    });
  }
} 