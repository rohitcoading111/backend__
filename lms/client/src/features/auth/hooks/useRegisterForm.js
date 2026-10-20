
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../authThunk/authThunks.js";

function useRegisterForm() {
  const dispatch = useDispatch();
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
      const result = await dispatch(registerUser(data)).unwrap();
      console.log("Registration successful:", result);
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
