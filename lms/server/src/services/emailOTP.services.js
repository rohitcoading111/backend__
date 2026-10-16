import transporter from "../config/mailer.js";
import config from "../config/config.js";
import crypto from "node:crypto";

export const generateEmailOTP = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

export const sendEmailOTP = async (email, otp) => {
  const info = await transporter.sendMail({
    from: config.EMAIL_USER,
    to: email,
    subject: "Verify your email address",
    text: `Your verification code is ${otp}. It expires in 10 minutes.`,
    html: `
      <h2>Email Verification</h2>
      <p>Your verification code is:</p>
      <h1>${otp}</h1>
      <p>This code expires in 10 minutes.</p>
      <p>If you did not request this, you can ignore this email.</p>
    `,
  });

  return info.messageId;
};
