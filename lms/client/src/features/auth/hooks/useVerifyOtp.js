
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  verifyEmailLoginOtp,
  verifyMobileLoginOtp,
  verifyEmailRegistrationOtp,
  verifyMobileRegistrationOtp
} from "../authThunk/authThunks.js";

function useVerifyOtp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { flow, method, identifier } = location.state || {};

  const [otp, setOtp] = useState("");
  const [localError, setLocalError] = useState("");

  const { status, error: serverError } = useSelector(
    (state) => state.auth
  );


const onSubmit = async (event) => {
  event.preventDefault();
  setLocalError("");

  if (!/^\d{6}$/.test(otp)) {
    setLocalError("Please enter a valid 6-digit OTP.");
    return;
  }

  if (!flow || !method || !identifier) {
    setLocalError("Verification session not found. Please try again.");
    return;
  }

  try {
    let result;

    if (flow === "register" && method === "email") {
      result = await dispatch(
        verifyEmailRegistrationOtp({
          email: identifier,
          code: otp,
        })
      ).unwrap();
    } else if (flow === "register" && method === "mobile") {
      result = await dispatch(
        verifyMobileRegistrationOtp({
          mobile: identifier,
          code: otp,
        })
      ).unwrap();
    } else if (flow === "login" && method === "email") {
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
      setLocalError("Unsupported verification method.");
      return;
    }

    const response = result?.data ?? result;

    if (response?.user) {
      const role = response.user.role;

      if (role === "STUDENT") {
        navigate("/courses", { replace: true });
      } else if (role === "INSTRUCTOR") {
        navigate("/instructor-dashboard", { replace: true });
      } else {
        setLocalError("Unsupported user role.");
      }
    } else if (flow === "register") {
      setLocalError(
        "Registration verified, but user details were not returned."
      );
    } else {
      setLocalError(
        "Verification succeeded, but user details were not returned."
      );
    }
  } catch (error) {
    setLocalError(
      typeof error === "string"
        ? error
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
    error: localError || serverError,
  };
}

export default useVerifyOtp;
