import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../authThunks/authThunks";

function useLoginForm() {
  const dispatch = useDispatch();
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
      const result = await dispatch(
        loginUser({ ...data, rememberMe })
      ).unwrap();

      console.log("Login successful:", result);
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
