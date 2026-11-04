
import { useState } from "react";
import {
  UserRound,
  Mail,
  Smartphone,
  Lock,
  ArrowRight,
  GraduationCap,
  ChevronDown,
  Check,
} from "lucide-react";

import "./auth.css";
import useRegisterForm from "../hooks/useRegisterForm";

function RegisterForm() {
  const [identifier, setIdentifier] = useState("");
  const [roleOpen, setRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("STUDENT");

  const isPhone =
    /^[0-9+ ]*$/.test(identifier) && identifier.length > 0;

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    serverError,
  } = useRegisterForm();

  const phoneIdentifierField = register("identifier", {
    required: "Mobile number is required",
    validate: (value) =>
      /^[6-9]\d{9}$/.test(value) ||
      "Enter a valid 10-digit Indian mobile number",
  });

  const emailIdentifierField = register("identifier", {
    required: "Email or mobile number is required",
    validate: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ||
      /^[6-9]\d{9}$/.test(value.trim()) ||
      "Enter a valid email or 10-digit mobile number",
  });

  const roles = [
    { value: "STUDENT", label: "Student" },
    { value: "INSTRUCTOR", label: "Instructor" },
  ];

  const handleRoleSelect = (value) => {
    setSelectedRole(value);
    setRoleOpen(false);
  };

  const handleFormSubmit = (data) => {
    onSubmit({
      ...data,
      name: data.name.trim(),
      identifier: data.identifier.trim(),
      role: selectedRole,
    });
  };

  return (
    <form
      className="auth-form"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
    >
      {/* Name */}
      <div className="auth-form-group">
        <label htmlFor="name" className="auth-label">
          Full Name
        </label>

        <div className="auth-field">
          <UserRound className="auth-icon" size={18} />

          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            {...register("name", {
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            className="auth-input"
          />
        </div>

        {errors.name && (
          <p className="auth-error">{errors.name.message}</p>
        )}
      </div>

      {/* Custom Role Dropdown */}
      <div className="auth-form-group">
        <label className="auth-label">
          I want to join as
        </label>

        <input
          type="hidden"
          {...register("role")}
          value={selectedRole}
          readOnly
        />

        <div className="auth-dropdown">
          <button
            type="button"
            className={`auth-dropdown-trigger ${
              roleOpen ? "is-open" : ""
            }`}
            aria-haspopup="listbox"
            aria-expanded={roleOpen}
            onClick={() => setRoleOpen((previous) => !previous)}
          >
            <GraduationCap size={19} className="auth-icon" />

            <span>
              {roles.find((role) => role.value === selectedRole)?.label}
            </span>

            <ChevronDown
              size={19}
              className={`auth-chevron ${
                roleOpen ? "rotate" : ""
              }`}
            />
          </button>

          {roleOpen && (
            <div className="auth-dropdown-menu" role="listbox">
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  role="option"
                  aria-selected={selectedRole === role.value}
                  className={`auth-dropdown-option ${
                    selectedRole === role.value ? "selected" : ""
                  }`}
                  onClick={() => handleRoleSelect(role.value)}
                >
                  <GraduationCap size={17} />

                  <span>{role.label}</span>

                  {selectedRole === role.value && (
                    <Check size={16} className="auth-option-check" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedRole === "INSTRUCTOR" && (
          <p className="auth-hint">
            Independent instructors can use their account directly. Organization access requires assignment by an Organization Admin.
          </p>
        )}
      </div>

      {/* Email / Mobile */}
      <div className="auth-form-group">
        <label htmlFor="identifier" className="auth-label">
          Email or Mobile Number
        </label>

        <div className="auth-field">
          {isPhone ? (
            <Smartphone size={18} className="auth-icon" />
          ) : (
            <Mail size={18} className="auth-icon" />
          )}

          {isPhone ? (
            <>
              <span className="auth-prefix">+91</span>

              <input
                id="identifier"
                type="tel"
                autoComplete="tel-national"
                placeholder="10-digit mobile number"
                maxLength={10}
                {...phoneIdentifierField}
                onChange={(event) => {
                  const value = event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

                  event.target.value = value;
                  phoneIdentifierField.onChange(event);
                  setIdentifier(value);
                }}
                className="auth-input"
              />
            </>
          ) : (
            <input
              id="identifier"
              type="text"
              autoComplete="email"
              placeholder="Email or mobile number"
              {...emailIdentifierField}
              onChange={(event) => {
                emailIdentifierField.onChange(event);
                setIdentifier(event.target.value);
              }}
              className="auth-input"
            />
          )}
        </div>

        {errors.identifier && (
          <p className="auth-error">
            {errors.identifier.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="auth-form-group">
        <label htmlFor="password" className="auth-label">
          Password
        </label>

        <div className="auth-field">
          <Lock size={18} className="auth-icon" />

          <input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="Create a strong password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className="auth-input"
          />
        </div>

        {errors.password && (
          <p className="auth-error">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Backend Error */}
      {serverError && (
        <p role="alert" className="auth-error">
          {typeof serverError === "string"
            ? serverError
            : "Registration failed. Please try again."}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="auth-submit"
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}

        {!isSubmitting && <ArrowRight size={17} />}
      </button>
    </form>
  );
}

export default RegisterForm;
