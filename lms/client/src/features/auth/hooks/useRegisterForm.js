
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../authThunks/authThunks";

function useRegisterForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
    isSubmitting,
  };
}

export default useRegisterForm;
