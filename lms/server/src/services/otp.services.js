import {
  twilioClient,
  TWILIO_VERIFY_SERVICE_SID,
} from "../config/twilio.js";

// User ke mobile number par OTP SMS bhejna
export const sendMobileOTP = async (mobile) => {
  const result = await twilioClient.verify.v2
    .services(TWILIO_VERIFY_SERVICE_SID)
    .verifications.create({
      to: mobile,
      channel: "sms",
    });

  return result.status;
};

// User ke enter kiye hue OTP ko verify karna
export const verifyMobileOTP = async (mobile, code) => {
  const result = await twilioClient.verify.v2
    .services(TWILIO_VERIFY_SERVICE_SID)
    .verificationChecks.create({
      to: mobile,
      code,
    });

  return result.status === "approved";
};
