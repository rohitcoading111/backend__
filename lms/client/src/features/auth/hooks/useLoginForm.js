import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { loginUser } from "../authThunk/authThunks.js";
import { getDashboardPath } from "../utils/getDashboardPath.js";

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

      const digits = identifier.replace(/\D/g, "");

      const normalizedMobile =
        digits.startsWith("91") && digits.length === 12
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

      // Existing OTP flow preserved.
      if (response?.otpRequired || response?.mobile) {
        navigate("/verify-otp", {
          state: {
            flow: "login",
            method: isEmail ? "email" : "mobile",
            identifier: isEmail
              ? identifier.toLowerCase()
              : normalizedMobile,
          },
        });

        return;
      }

      // Direct login, when OTP is not required.
      if (response?.user) {
        navigate(getDashboardPath(response.user), {
          replace: true,
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