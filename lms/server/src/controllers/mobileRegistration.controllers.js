import {
  startMobileRegistration,
  completeMobileRegistration,
} from "../services/mobileRegistration.services.js";

export const startMobileRegistrationController = async (
  req,
  res
) => {
  try {
    const result = await startMobileRegistration({
      name: req.body.name,
      mobile: req.body.mobile,
      password: req.body.password,
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Mobile registration error:", error.message);

    const knownErrors = [
      "Name, mobile and password are required",
      "Enter mobile number with country code, e.g. +919876543210",
      "Mobile number is already registered",
    ];

    if (knownErrors.includes(error.message)) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to start mobile registration. Please try again.",
    });
  }
};


export const verifyMobileRegistrationController = async (
  req,
  res
) => {
  try {
    const result = await completeMobileRegistration({
      mobile: req.body.mobile,
      code: req.body.code,
    });

    return res.status(201).json({
      success: true,
      ...result,
    });
  } catch (error) {
    const knownErrors = [
      "Mobile number and OTP are required",
      "No pending registration found",
      "Registration expired. Please register again",
      "Invalid or expired OTP",
      "Mobile number is already registered",
    ];

    if (knownErrors.includes(error.message)) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("OTP verification error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to verify OTP. Please try again.",
    });
  }
};
