export const otpTemplate = (otp) => `
    <div style="font-family: Arial;">
        <h2>Verify your Account</h2>
        <p>Your OTP:</p>
        <h1 style="letter-spacing: 4px;">${otp}</h1>
        <p>Valid for 5 minutes.</p>
    </div>
`;

export const resetPasswordTemplate = (resetUrl, name) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .button { 
            display: inline-block; 
            padding: 12px 24px; 
            background-color: #4CAF50; 
            color: white !important; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0; 
        }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset Request</h1>
        </div>
        <div class="content">
            <p>Hi ${name || "there"},</p>
            <p>You requested to reset your password. Click the button below to proceed:</p>
            <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            <p><strong>This link is valid for 10 minutes only.</strong></p>
            <p>If you didn't request this, please ignore this email.</p>
            <p>Or copy this link:</p>
            <p style="word-break: break-all; background: #eee; padding: 10px;">${resetUrl}</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Instant Service Booking System. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;