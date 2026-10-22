
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../authThunk/authThunks.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function useLoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error: serverError } = useSelector(
    (state) => state.auth
  );

  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      const identifier = data.identifier.trim();

      const isEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

      // Added: normalize Indian mobile number
      const digits = identifier.replace(/\D/g, "");

      const normalizedMobile = digits.startsWith("91")
        ? `+${digits}`
        : `+91${digits}`;

      const credentials = {
        password: data.password,
        ...(isEmail
          ? { email: identifier.toLowerCase() }
          : { mobile: normalizedMobile }),
      };

      const result = await dispatch(
        loginUser(credentials)
      ).unwrap();

      const response = result?.data ?? result;

      if (response?.otpRequired || response?.mobile) {
        navigate("/verify-otp", {
          state: {
            flow: "login",
            method: isEmail ? "email" : "mobile",
            // Added: pass normalized number to OTP page too
            identifier: isEmail
              ? identifier.toLowerCase()
              : normalizedMobile,
          },
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting: status === "loading",
    serverError,
    rememberMe,
    setRememberMe,
  };
}

export default useLoginForm;
