import twilio from "twilio";
import config from "./config.js";

// Central config se Twilio credentials lo
const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_VERIFY_SERVICE_SID,
} = config;

// Check karo ki saari required keys available hain
if (
    !TWILIO_ACCOUNT_SID ||
    !TWILIO_AUTH_TOKEN ||
    !TWILIO_VERIFY_SERVICE_SID
) {
    throw new Error("Twilio credentials missing in environment configuration");
}

// Twilio client initialize karo
const twilioClient = twilio(
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN
);

// OTP service mein use karne ke liye export karo
export { twilioClient, TWILIO_VERIFY_SERVICE_SID };
