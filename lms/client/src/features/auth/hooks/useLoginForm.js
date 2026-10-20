import { useForm } from "react-hook-form";

function useLoginForm() {
  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data) => {
    // Abhi sirf testing; baad mein Redux thunk call karenge.
    console.log("Login form data:", data);
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
