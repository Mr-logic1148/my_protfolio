import nodemailer from 'nodemailer'

type ContactPayload = {
  email: string
  message: string
}

function isValidEmail(email: string) {
  // simple + safe email check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload
    const email = (body.email || '').trim()
    const message = (body.message || '').trim()

    if (!email || !message) {
      return Response.json({ success: false, error: 'Missing fields' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return Response.json({ success: false, error: 'Invalid email' }, { status: 400 })
    }

    const user = process.env.EMAIL_USER
    const pass = process.env.EMAIL_PASS

    if (!user || !pass) {
      return Response.json(
        { success: false, error: 'Server email env vars not set' },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    })

    // 1) Email to YOU
    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to: 'mehrajgaud1148@gmail.com',
      subject: 'New Portfolio Message 🚀',
      replyTo: email,
      text: `From: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New message from your portfolio</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        </div>
      `,
    })

    // 2) Auto-reply to SENDER
    await transporter.sendMail({
      from: `"Mehraj Gaud" <${user}>`,
      to: email,
      subject: "✅ Got it — thanks for reaching out!",
      text:
        `Hi there,\n\nThanks for contacting me — I’ve received your message and will get back to you soon.\n\n` +
        `— Mehraj\n\n(Your message copy)\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7;">
          <h2 style="margin:0 0 8px;">Thanks for reaching out 👋</h2>
          <p style="margin:0 0 12px;">
            I’ve received your message and will reply as soon as possible.
          </p>
          <p style="margin:0 0 18px;">— Mehraj</p>
          <hr style="border:none;border-top:1px solid #eee;margin:18px 0;" />
          <p style="margin:0 0 8px;"><strong>Your message:</strong></p>
          <div style="white-space: pre-wrap; background:#f7f7f7; padding:12px; border-radius:10px;">
            ${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
          </div>
        </div>
      `,
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error(err)
    return Response.json({ success: false, error: 'Failed to send' }, { status: 500 })
  }
}
