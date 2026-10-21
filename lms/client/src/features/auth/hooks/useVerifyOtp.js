
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  verifyEmailLoginOtp,
  verifyMobileLoginOtp,
} from "../authThunk/authThunks.js";

function useVerifyOtp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Login page se aayi hui information
  const { flow, method, identifier } = location.state || {};

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const { status, error: serverError } = useSelector(
    (state) => state.auth
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      let result;

      if (flow === "login" && method === "email") {
        result = await dispatch(
          verifyEmailLoginOtp({
            email: identifier,
            code: otp,
          })
        ).unwrap();
      } else if (flow === "login" && method === "mobile") {
        result = await dispatch(
          verifyMobileLoginOtp({
            mobile: identifier,
            code: otp,
          })
        ).unwrap();
      } else {
        setError("Invalid verification flow. Please login again.");
        return;
      }

      const response = result?.data ?? result;

      if (response?.user) {
        navigate("/dashboard", { replace: true });
      } else {
        setError("OTP verified, but user details were not returned.");
      }
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : "OTP verification failed. Please try again."
      );
    }
  };

  return {
    flow,
    method,
    identifier,
    otp,
    setOtp,
    onSubmit,
    isSubmitting: status === "loading",
    error: error || serverError,
  };
}

export default useVerifyOtp;
