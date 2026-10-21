
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
      const email = data.identifier.trim().toLowerCase();

      const result = await dispatch(
        registerUser({
          name: data.name.trim(),
          email,
          password: data.password,
        })
      ).unwrap();

      const response = result?.data ?? result;

      if (response?.otpRequired) {
        navigate("/verify-otp", {
          state: {
            flow: "register",
            method: "email",
            identifier: response.email || email,
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
