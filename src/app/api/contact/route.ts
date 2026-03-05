import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, phone, projectType, budget, timeline, message } = await req.json();

  const { error } = await resend.emails.send({
    from: 'Duffy Construction <onboarding@resend.dev>',
    to: 'vecheva@gmail.com',
    replyTo: email,
    subject: `New Inquiry: ${projectType} from ${name}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; color: #1c1917;">
        <h2 style="margin-bottom: 4px;">New Project Inquiry</h2>
        <p style="color: #78716c; font-size: 13px; margin-top: 0;">Submitted via duffyconstruction.vercel.app</p>
        <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 20px 0;" />

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #78716c; width: 140px;">Name</td><td style="padding: 8px 0;"><strong>${name}</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #78716c;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #b45309;">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding: 8px 0; color: #78716c;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>` : ''}
          <tr><td style="padding: 8px 0; color: #78716c;">Project Type</td><td style="padding: 8px 0;">${projectType}</td></tr>
          ${budget ? `<tr><td style="padding: 8px 0; color: #78716c;">Budget</td><td style="padding: 8px 0;">${budget}</td></tr>` : ''}
          ${timeline ? `<tr><td style="padding: 8px 0; color: #78716c;">Start Timeline</td><td style="padding: 8px 0;">${timeline}</td></tr>` : ''}
        </table>

        <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 20px 0;" />

        <p style="color: #78716c; font-size: 13px; margin-bottom: 6px;">Message</p>
        <p style="font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
