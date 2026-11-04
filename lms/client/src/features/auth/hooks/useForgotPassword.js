
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  forgotPassword,
  verifyResetOtp,
  resetPassword,
} from "../authThunk/authThunks.js";

export default function useForgotPassword() {
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);

  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [resetToken, setResetToken] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // STEP 1: Request OTP
  const handleRequestOtp = async (event) => {
    event.preventDefault();

    if (!identifier.trim()) {
      setError("Please enter your registered email or identifier.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const result = await dispatch(
        forgotPassword({
          identifier: identifier.trim(),
        })
      ).unwrap();

      setMessage(
        result.message || "OTP sent successfully."
      );

      setStep(2);
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : err.message || "Unable to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = async (event) => {
    event.preventDefault();

    if (!code.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const result = await dispatch(
        verifyResetOtp({
          identifier: identifier.trim(),
          code: code.trim(),
        })
      ).unwrap();

      const token = result?.data?.resetToken;

      if (!token) {
        throw new Error("Reset token was not received.");
      }

      // Keep reset token in memory, not localStorage.
      setResetToken(token);

      setMessage("OTP verified successfully.");
      setStep(3);
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : err.message || "OTP verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: Reset Password
  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Please enter both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!resetToken) {
      setError("Reset session is missing. Please verify OTP again.");
      setStep(2);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const result = await dispatch(
        resetPassword({
          resetToken,
          newPassword,
          confirmPassword,
        })
      ).unwrap();

      setMessage(
        result.message || "Password reset successfully."
      );

      setResetToken("");
      setCode("");
      setNewPassword("");
      setConfirmPassword("");

      setStep(4);
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : err.message || "Password reset failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // Request OTP again
  const handleResendOtp = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const result = await dispatch(
        forgotPassword({
          identifier: identifier.trim(),
        })
      ).unwrap();

      setCode("");
      setMessage(result.message || "New OTP requested.");
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : err.message || "Unable to resend OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const goBackToOtp = () => {
    setError("");
    setMessage("");
    setStep(2);
  };

  return {
    step,
    identifier,
    setIdentifier,
    code,
    setCode,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    message,
    handleRequestOtp,
    handleVerifyOtp,
    handleResetPassword,
    handleResendOtp,
    goBackToOtp,
  };
}
