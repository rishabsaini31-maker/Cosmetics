const nodemailer = require('nodemailer');

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOtpEmail(toEmail, otp, purpose = 'Verification') {
  console.log(`\n==================================================`);
  console.log(`[VĀNYA AUTH MAIL] OTP for ${toEmail} (${purpose}): [ ${otp} ]`);
  console.log(`==================================================\n`);

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT || 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort),
        secure: Number(smtpPort) === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"VĀNYA Haute Parfumerie" <${smtpUser}>`,
        to: toEmail,
        subject: `Your VĀNYA Security OTP: ${otp}`,
        html: `
          <div style="font-family: 'Times New Roman', serif; background-color: #fbf9f5; padding: 40px; color: #1b1c1a;">
            <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 30px; border: 1px solid #eae8e4;">
              <h2 style="font-size: 24px; letter-spacing: 0.25em; text-transform: uppercase; text-align: center; color: #161616; margin-bottom: 5px;">VĀNYA</h2>
              <p style="font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; text-align: center; color: #725b33; margin-top: 0; margin-bottom: 30px;">Haute Parfumerie</p>
              
              <h3 style="font-size: 18px; font-weight: normal; margin-bottom: 10px;">Security ${purpose} OTP</h3>
              <p style="font-size: 14px; color: #444748; line-height: 1.6;">
                Please use the 6-digit one-time passcode below to complete your authentication with VĀNYA:
              </p>
              
              <div style="background-color: #f5f3ef; border: 1px solid #eae8e4; text-align: center; padding: 20px; margin: 25px 0;">
                <span style="font-family: monospace; font-size: 32px; letter-spacing: 0.3em; font-weight: bold; color: #725b33;">${otp}</span>
              </div>
              
              <p style="font-size: 12px; color: #747878;">
                This code is valid for 10 minutes. If you did not request this OTP, please ignore this email.
              </p>
              
              <div style="border-t: 1px solid #eae8e4; margin-top: 30px; padding-top: 15px; font-size: 10px; color: #747878; text-align: center; letter-spacing: 0.1em; text-transform: uppercase;">
                © VĀNYA Haute Parfumerie • All Rights Reserved
              </div>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      return { success: true, delivered: 'email' };
    } catch (err) {
      console.error('[VĀNYA EMAIL SERVICE ERROR]', err.message);
      return { success: true, delivered: 'console_fallback', note: 'Email delivery failed, logged to console.' };
    }
  }

  return { success: true, delivered: 'console_simulated' };
}

module.exports = {
  generateOtp,
  sendOtpEmail,
};
