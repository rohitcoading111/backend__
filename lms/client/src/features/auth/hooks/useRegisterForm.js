
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../authThunk/authThunks.js";

function useRegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error: serverError } = useSelector(
    (state) => state.auth
  );

  const [identifierType, setIdentifierType] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      identifier: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      // Added: Identify whether the input is email or mobile
      const identifier = data.identifier.trim();

      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

      const normalizedMobile = identifier.replace(/\s/g, "");

      const isMobile = /^\+?[0-9]{10,15}$/.test(normalizedMobile);

      if (!isEmail && !isMobile) {
        return;
      }

      // Added: Send the correct field according to identifier type
      const payload = {
        name: data.name.trim(),
        password: data.password,
        ...(isEmail
          ? { email: identifier.toLowerCase() }
          : { mobile: normalizedMobile }),
      };

      const result = await dispatch(registerUser(payload)).unwrap();

      const response = result?.data ?? result;

      // Added: Keep the selected registration method for OTP verification
      if (response?.otpRequired) {
        navigate("/verify-otp", {
          state: {
            flow: "register",
            method: isEmail ? "email" : "mobile",
            identifier: isEmail
              ? response.email || identifier.toLowerCase()
              : response.mobile || normalizedMobile,
          },
        });
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting: status === "loading",
    serverError,
    identifierType,
    setIdentifierType,
  };
}

export default useRegisterForm;
