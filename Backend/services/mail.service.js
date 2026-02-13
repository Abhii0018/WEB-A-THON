import { getTransporter } from "../config/mail.js";

export const sendMail = async ({ to, subject, html }) => {
  try {
    const transporter = getTransporter();
    
    // Check if transporter is configured
    if (!transporter) {
      console.log("⚠️  Email not sent - mail server not configured");
      throw new Error("Email service not configured. Please set EMAIL_USER and EMAIL_PASS in .env");
    }

    const fromAddress = process.env.EMAIL_USER?.trim();

    const info = await transporter.sendMail({
      from: `"Instant Service Booking" <${fromAddress}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent successfully:", info.messageId);
    console.log("   To:", to);
    console.log("   Subject:", subject);
    return info;
  } catch (error) {
    // Log detailed error information
    console.error("❌ Email sending failed:");
    console.error("   Message:", error.message);
    console.error("   Code:", error.code);
    if (error.response) {
      console.error("   Response:", error.response);
    }
    if (error.responseCode) {
      console.error("   Response Code:", error.responseCode);
    }
    if (error.command) {
      console.error("   Command:", error.command);
    }
    
    // Throw error with more details in development
    if (process.env.NODE_ENV === "development") {
      throw new Error(`Email could not be sent: ${error.message}`);
    }
    
    throw new Error("Email could not be sent");
  }
};