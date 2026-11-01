import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../authThunk/authThunks.js";
import { getDashboardPath } from "../utils/getDashboardPath.js";

function useRegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error: serverError } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      identifier: "",
      password: "",
      role: "STUDENT",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      const identifier = data.identifier.trim();

      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

      const digits = identifier.replace(/\D/g, "");

      const isMobile = /^\+?[0-9]{10,15}$/.test(
        identifier.replace(/\s/g, "")
      );

      if (!isEmail && !isMobile) {
        throw new Error("Enter a valid email or mobile number.");
      }

      const normalizedMobile = digits.startsWith("91") &&
        digits.length === 12
          ? `+${digits}`
          : `+91${digits}`;

      const payload = {
        name: data.name.trim(),
        password: data.password,
        role: String(data.role).toUpperCase(),

        ...(isEmail
          ? { email: identifier.toLowerCase() }
          : { mobile: normalizedMobile }),
      };

      const result = await dispatch(registerUser(payload)).unwrap();

      const response = result?.data ?? result;

      if (response?.otpRequired) {
        navigate("/verify-otp", {
          state: {
            flow: "register",
            method: isEmail ? "email" : "mobile",
            identifier: isEmail
              ? response.email || identifier.toLowerCase()
              : response.mobile || normalizedMobile,
            role: data.role,
          },
        });

        return;
      }

      // Handles registration responses that authenticate immediately.
      if (response?.user) {
        navigate(getDashboardPath(response.user), {
          replace: true,
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
  };
}

export default useRegisterForm;