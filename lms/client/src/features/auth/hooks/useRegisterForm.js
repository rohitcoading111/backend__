
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
      const identifier = data.identifier.trim();

      // Backend registration service expects email.
      const result = await dispatch(
        registerUser({
          name: data.name.trim(),
          email: identifier,
          password: data.password,
        })
      ).unwrap();

      console.log("Registration response:", result);

      const response = result?.data ?? result;

      if (response?.otpRequired) {
        navigate("/verify-otp", {
          state: {
            flow: "register",
            method: "email",
            identifier: response.email || identifier,
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
  };
}

export default useRegisterForm;
