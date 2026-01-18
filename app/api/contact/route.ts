import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { RateLimiterMemory } from "rate-limiter-flexible";

const resend = new Resend(process.env.RESEND_API_KEY);

const ContactSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  orgName: z.string().min(1, "Organization name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
});

const rateLimiter = new RateLimiterMemory({
  points: 5, // Allow 5 requests
  duration: 60, // per 60 seconds
});

export async function POST(request: NextRequest) {
  try {
    await rateLimiter.consume(
      request.headers.get("x-forwarded-for") || "unknown",
    );

    const body = await request.json();
    const result = ContactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message || "Invalid form data" },
        { status: 400 },
      );
    }

    const { fullName, orgName, phone, email } = result.data;

    // Send notification email to admin
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "karan.kendre@keizerworks.com",
      to: process.env.RESEND_TO_EMAIL || "karankendreg@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p>A new user has submitted the contact form:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold; width: 150px;">Full Name:</td>
              <td style="padding: 10px;">${fullName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold;">Organization:</td>
              <td style="padding: 10px;">${orgName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold;">Phone:</td>
              <td style="padding: 10px;">${phone}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold;">Email:</td>
              <td style="padding: 10px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Date:</td>
              <td style="padding: 10px;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 },
      );
    }

    console.log("Contact form submission successful:", data);

    return NextResponse.json(
      { message: "Thank you! We'll get back to you within 24-48 hours." },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error && error.name === "RateLimiterError") {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
