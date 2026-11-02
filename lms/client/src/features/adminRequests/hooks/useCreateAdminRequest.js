import { useState } from "react";
import { useForm } from "react-hook-form";

import { createAdminRequest } from "../../admin/services/adminRequestService.js";

function useCreateAdminRequest() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      organizationName: "",
      organizationType: "",
      description: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const password = watch("password");

  // Mobile validation and input handling
  const mobileField = register("mobile", {
    required: "Mobile number is required",
    validate: (value) =>
      /^[6-9]\d{9}$/.test(value) ||
      "Enter a valid 10-digit Indian mobile number",
  });

  // Form submission
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setError("");
      setSuccessData(null);
      setIsCopied(false);

      const payload = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),

        // Indian mobile number in E.164 format
        mobile: `+91${data.mobile}`,

        organizationName: data.organizationName.trim(),
        organizationType: data.organizationType,
        description: data.description.trim(),

        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      const response = await createAdminRequest(payload);

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to submit organization request"
        );
      }

      setSuccessData(response.data);

      // Clear form after successful submission
      reset();

    } catch (err) {
      const validationErrors = err?.response?.data?.errors;

      const validationMessage = Array.isArray(validationErrors)
        ? validationErrors.map((item) => item.msg).join(", ")
        : "";

      setError(
        validationMessage ||
          err?.response?.data?.message ||
          err?.message ||
          "Unable to submit organization request"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Copy request ID
  const handleCopyRequestId = async () => {
    const requestId = successData?.requestId;

    if (!requestId) return;

    try {
      await navigator.clipboard.writeText(String(requestId));
      setIsCopied(true);
    } catch {
      setError("Unable to copy request ID. Please copy it manually.");
    }
  };

  // Reset success screen and errors
  const resetRequest = () => {
    setSuccessData(null);
    setError("");
    setIsCopied(false);
    reset();
  };

  return {
    register,
    handleSubmit,
    errors,
    password,
    mobileField,

    isSubmitting,
    error,
    successData,
    isCopied,

    onSubmit,
    handleCopyRequestId,
    resetRequest,
  };
}

export default useCreateAdminRequest;