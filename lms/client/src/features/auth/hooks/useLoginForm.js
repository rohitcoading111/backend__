import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../authThunks/authThunks";

function useLoginForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();

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
    isSubmitting,
  };
}

export default useLoginForm;
