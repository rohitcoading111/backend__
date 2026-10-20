
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

      const credentials = {
        password: data.password,
        ...(isEmail
          ? { email: identifier }
          : { mobile: identifier }),
      };

      const result = await dispatch(
        loginUser(credentials)
      ).unwrap();

      console.log("Login response:", result);

      const response = result?.data ?? result;

      if (response?.otpRequired || response?.mobile) {
        navigate("/verify-otp", {
          state: {
            flow: "login",
            method: isEmail ? "email" : "mobile",
            identifier,
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
