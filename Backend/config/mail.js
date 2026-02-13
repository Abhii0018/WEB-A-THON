import nodemailer from "nodemailer";

// Lazy-load transporter to ensure env vars are loaded
let _transporter = null;

const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER?.trim();
  const emailPass = process.env.EMAIL_PASS?.trim();

  if (!emailUser || !emailPass) {
    console.log("📧 Email disabled: EMAIL_USER or EMAIL_PASS missing in .env");
    return null;
  }

  // Use port 465 with secure: true for better Gmail compatibility
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for port 587
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
};

// Getter for transporter (lazy initialization)
export const getTransporter = () => {
  if (!_transporter) {
    _transporter = createTransporter();
  }
  return _transporter;
};

// For backward compatibility
export const transporter = {
  get sendMail() {
    const t = getTransporter();
    return t ? t.sendMail.bind(t) : null;
  },
  get verify() {
    const t = getTransporter();
    return t ? t.verify.bind(t) : null;
  }
};

// For verification - completely optional, won't break the app
export const verifyMail = async () => {
  try {
    const t = getTransporter();
    
    if (!t) {
      console.log("📧 Email not configured (optional) - password reset disabled");
      return;
    }

    await t.verify();
    console.log("✅ Email server connected successfully");
  } catch (error) {
    // Email error is non-critical
    console.log("📧 Email verification failed (optional) - password reset disabled");
    console.log("   Error:", error.message);
    console.log("");
    console.log("   To enable password reset emails:");
    console.log("   1. Enable 2-Factor Authentication on your Gmail account");
    console.log("   2. Generate App Password at: https://myaccount.google.com/apppasswords");
    console.log("   3. Use the 16-character password (no spaces) in .env");
    console.log("   4. Set EMAIL_USER and EMAIL_PASS in .env");
    console.log("");
  }
};