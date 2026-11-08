
import { useState } from "react";

// Replace this with your actual official support email.
const CONTACT_EMAIL = "";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function useContactPage() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Please enter a subject.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must contain at least 10 characters.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);
    setStatus("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (!CONTACT_EMAIL) {
      setStatus(
        "Please configure the official LearnHub support email before submitting."
      );
      return;
    }

    const subject = encodeURIComponent(formData.subject);

    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );

    const mailtoLink =
      `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    setStatus(
      "Your email application should open with your message draft."
    );
  };

  const resetForm = () => {
    setFormData(initialForm);
    setErrors({});
    setStatus("");
  };

  return {
    formData,
    errors,
    status,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
