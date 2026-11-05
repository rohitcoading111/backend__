
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const previousTitle = document.title;

    document.title = "Contact LearnHub | Get in Touch";

    const description =
      "Contact LearnHub for questions about online courses, student accounts, instructors, organizations and platform support.";

    const updateMeta = (selector, attribute, key, content) => {
      let element = document.querySelector(selector);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    updateMeta(
      'meta[name="description"]',
      "name",
      "description",
      description
    );

    updateMeta(
      'meta[property="og:title"]',
      "property",
      "og:title",
      "Contact LearnHub"
    );

    updateMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      description
    );

    let canonical = document.querySelector('link[rel="canonical"]');

    const previousCanonical = canonical?.href;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = "https://learnhubcloud.in/contact";

    return () => {
      document.title = previousTitle;

      if (canonical && previousCanonical) {
        canonical.href = previousCanonical;
      }
    };
  }, []);

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
