import transporter from "../config/mailer.js";
import config from "../config/config.js";
import { twilioClient } from "../config/twilio.js";


export const sendRegistrationNotification = async ({
  email,
  name,
}) => {
  try {
    if (!email) {
      console.error("Registration notification skipped: Email missing");
      return false;
    }

    await transporter.sendMail({
      from: config.EMAIL_USER,
      to: email,
      subject: "Registration Successful",
      text: `Hi ${name || "User"},

Your registration has been completed successfully!

You can now log in to your account.

If you did not create this account, please contact our support team.

Regards,
Team`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
          <h2>Registration Successful!</h2>
          <p>Hi ${name || "User"},</p>
          <p>Your registration has been completed successfully.</p>
          <p>You can now log in to your account.</p>
          <p>If you did not create this account, please contact our support team.</p>
          <br />
          <p>Regards,<br />Team</p>
        </div>
      `,
    });

    console.log("Registration notification sent to:", email);
    return true;
  } catch (error) {
    console.error(
      "Registration notification failed:",
      error.message
    );
    return false;
  }
};


export const sendMobileRegistrationNotification = async ({ mobile, name }) => {
  if (!mobile) return;

  try {
    const message = await twilioClient.messages.create({
      from: config.WHATSAPP_FROM,
      to: `whatsapp:${mobile}`,
      contentSid: config.APPOINTMENT_TEMPLATE_SID,
      contentVariables: JSON.stringify({
        "1": name || "User",
        "2": "tomorrow",
      }),
    });

    console.log("WhatsApp registration test message sent:", message.sid);
  } catch (error) {
    console.error(
      "WhatsApp registration notification failed:",
      error.message
    );
  }
};
