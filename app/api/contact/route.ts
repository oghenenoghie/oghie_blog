import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // If Resend is configured, send the email
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "hello@oghieblog.com";

    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Oghie Blog Contact <contact@oghieblog.com>",
          to: [CONTACT_EMAIL],
          reply_to: email,
          subject: `[Contact] ${subject} — from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr />
            <p>${message.replace(/\n/g, "<br/>")}</p>
          `,
        }),
      });

      if (!res.ok) {
        console.error("Resend error:", await res.text());
        return NextResponse.json(
          { error: "Failed to send email" },
          { status: 500 }
        );
      }
    } else {
      // Development: just log it
      console.log("[Contact form]", { name, email, subject, message });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/contact]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
