import { useForm } from "react-hook-form";

function useRegisterForm() {
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
    console.log("Register form data:", data);
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
