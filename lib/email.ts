import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM ?? "Oghie Blog <hello@oghieblog.com>";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oghieblog.com";

export interface ConfirmationEmailArgs {
  name:  string;
  email: string;
  token: string;
}

export async function sendConfirmationEmail({ name, email, token }: ConfirmationEmailArgs) {
  const confirmUrl = `${BASE_URL}/api/newsletter/confirm?token=${token}`;

  return resend.emails.send({
    from: FROM,
    to:   email,
    subject: "Confirm your subscription to Oghie Blog",
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #0F172A;">
          <h1 style="font-size: 28px; font-weight: 900; color: #0F172A; margin-bottom: 8px;">Hi ${name} 👋</h1>
          <p style="font-size: 16px; line-height: 1.7; color: #334155; margin-bottom: 24px;">
            Thanks for subscribing to Oghie Blog! Click the button below to confirm your email address and start receiving weekly digital marketing insights.
          </p>
          <a href="${confirmUrl}" style="display: inline-block; background: #EF9F27; color: #fff; font-weight: 700; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 16px; margin-bottom: 24px;">
            Confirm my subscription →
          </a>
          <p style="font-size: 13px; color: #94A3B8; line-height: 1.6;">
            If you didn't sign up, you can safely ignore this email. This link expires in 7 days.<br>
            <a href="${confirmUrl}" style="color: #185FA5; word-break: break-all;">${confirmUrl}</a>
          </p>
        </body>
      </html>
    `,
  });
}

export interface DigestEmailArgs {
  name:  string;
  email: string;
  posts: { title: string; excerpt: string; slug: string }[];
}

export async function sendWeeklyDigest({ name, email, posts }: DigestEmailArgs) {
  const postsHtml = posts.map((p) => `
    <div style="margin-bottom: 28px; padding-bottom: 28px; border-bottom: 1px solid #E2E8F0;">
      <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 8px; color: #0F172A;">
        <a href="${BASE_URL}/blog/${p.slug}" style="color: #185FA5; text-decoration: none;">${p.title}</a>
      </h2>
      <p style="font-size: 15px; color: #475569; line-height: 1.65; margin: 0 0 10px;">${p.excerpt}</p>
      <a href="${BASE_URL}/blog/${p.slug}" style="font-size: 14px; color: #185FA5; font-weight: 600; text-decoration: none;">Read more →</a>
    </div>
  `).join("");

  return resend.emails.send({
    from: FROM,
    to:   email,
    subject: `📈 This week on Oghie Blog`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #0F172A;">
          <h1 style="font-size: 26px; font-weight: 900; color: #0F172A; margin-bottom: 4px;">Hi ${name},</h1>
          <p style="font-size: 15px; color: #475569; margin-bottom: 32px;">Here's what's fresh on Oghie Blog this week.</p>
          ${postsHtml}
          <p style="font-size: 12px; color: #94A3B8; margin-top: 40px; line-height: 1.6;">
            You're receiving this because you subscribed at oghieblog.com.<br>
            <a href="${BASE_URL}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #94A3B8;">Unsubscribe</a>
          </p>
        </body>
      </html>
    `,
  });
}
