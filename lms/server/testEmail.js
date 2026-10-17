import "dotenv/config";
import transporter from "./src/config/mailer.js";
import config from "./src/config/config.js";

const testEmail = async () => {
  try {
    // Check configuration
    console.log(
      "EMAIL_USER configured:",
      Boolean(config.EMAIL_USER)
    );

    console.log(
      "EMAIL_APP_PASSWORD configured:",
      Boolean(config.EMAIL_APP_PASSWORD)
    );

    // Verify Gmail SMTP connection
    await transporter.verify();

    console.log("Gmail SMTP connection successful!");

    // Send test email
    const info = await transporter.sendMail({
      from: config.EMAIL_USER,
      to: config.EMAIL_USER,
      subject: "Test Email - Registration OTP Setup",
      text: "Bhai, Nodemailer setup successful hai. Ab email OTP integrate kar sakte hain.",
    });

    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
  console.error("Message:", error.message);
  console.error("Code:", error.code);
  console.error("Command:", error.command);
  console.error("Response code:", error.responseCode);
}
};

testEmail();
