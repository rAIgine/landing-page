import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  console.log("=== Contact API Called ===");

  try {
    console.log("Environment check:", {
      hasUser: !!process.env.SMTP_USER,
      hasPass: !!process.env.SMTP_PASS,
      hasHost: !!process.env.SMTP_HOST,
    });
    const { email, contact, message } = await request.json();
    console.log("Request data received:", {
      email,
      contact: !!contact,
      message: !!message,
    });

    if (!email || !message || !contact) {
      console.log("Validation failed - missing fields");
      return NextResponse.json(
        { error: "Email, contact, and message are required" },
        { status: 400 }
      );
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("Missing SMTP credentials in environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    console.log("Creating transporter...");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: false,
      logger: false,
    });
    console.log("Transporter created, preparing mail options...");
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: "Form Submission - Raigine",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 100%; margin: 0 auto;">
          <h2 style="color: #0047D9;">New Contact Form Submission</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${email}</p>
            <p><strong>Contact:</strong> ${contact || "No contact provided"}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #0047D9;">
              ${message.replace(/\n/g, "<br>")}
            </p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            This message was sent from the Raigine landing page contact form.
          </p>
        </div>
      `,
      text: `
        Form Submission
        
        From: ${email}
        Message: ${message}
        
        This message was sent from the Raigine landing page contact form.
      `,
    };

    console.log("Sending email...");
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("=== ERROR OCCURRED ===");
    console.error("Error sending email:", error);

    let errorMessage = "Failed to send email";
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });

      if (error.message.includes("Invalid login")) {
        errorMessage =
          "SMTP authentication failed. Please check your email credentials.";
      } else if (
        error.message.includes("ENOTFOUND") ||
        error.message.includes("ECONNREFUSED")
      ) {
        errorMessage =
          "Could not connect to SMTP server. Please check your SMTP host and port.";
      } else if (error.message.includes("self signed certificate")) {
        errorMessage =
          "SSL certificate error. Please check your SMTP configuration.";
      } else if (error.message.includes("ETIMEDOUT")) {
        errorMessage = "Connection timeout. Please try again.";
      }
    }
    console.error("=== END ERROR ===");
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
