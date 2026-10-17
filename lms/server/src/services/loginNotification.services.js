import transporter from "../config/mailer.js";
import config from "../config/config.js";
import { twilioClient } from "../config/twilio.js";


export const sendLoginNotification = async ({
  email,
  name,
  loginMethod,
}) => {
  if (!email) return;

  try {
    await transporter.sendMail({
      from: config.EMAIL_USER,
      to: email,
      subject: "New Login Alert",
      text: `
Hi ${name || "User"},

Your account has been logged in successfully.

Login method: ${loginMethod}
Time: ${new Date().toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata",
})}

If this wasn't you, please reset your password and secure your account.

Regards,
Support Team
      `.trim(),
      html: `
        <h2>New Login Alert</h2>
        <p>Hi ${name || "User"},</p>
        <p>Your account has been logged in successfully.</p>
        <p><strong>Login method:</strong> ${loginMethod}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}</p>
        <p>If this wasn't you, please reset your password and secure your account.</p>
        <p>Regards,<br/>Support Team</p>
      `,
    });

    console.log("Login notification email sent");
  } catch (error) {
    // Notification failure should not break login.
    console.error("Login notification email failed:", error.message);
  }
};


export const sendMobileLoginNotification = async ({ mobile, name }) => {
  if (!mobile) return;

  try {
    const message = await twilioClient.messages.create({
      from: config.WHATSAPP_FROM,
      to: `whatsapp:${mobile}`,
      contentSid: config.APPOINTMENT_TEMPLATE_SID,
      contentVariables: JSON.stringify({
        "1": name || "User",
        "2": "now",
      }),
    });

    console.log("WhatsApp login notification sent:", message.sid);
  } catch (error) {
    console.error(
      "WhatsApp login notification failed:",
      error.message
    );
  }
};