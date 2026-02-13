import { getTransporter } from "../config/mail.js";

export const sendMail = async ({ to, subject, html }) => {
  try {
    const transporter = getTransporter();
    
    // Check if transporter is configured
    if (!transporter) {
      console.log("⚠️  Email not sent - mail server not configured");
      throw new Error("Email service not configured. Please set EMAIL_USER and EMAIL_PASS in .env");
    }

    const info = await transporter.sendMail({
      from: `"Instant Service Booking" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email failed:", error.message);
    throw new Error("Email could not be sent");
  }
};