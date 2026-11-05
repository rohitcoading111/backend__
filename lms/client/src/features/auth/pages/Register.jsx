
import { Link } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import RegisterForm from "../components/RegisterForm";

function Register() {
  return (
    <AuthLayout
      navbarPage="register"
      eyebrow="Get started"
      title="Create your account"
      description="Join LearnHub, explore new skills, and build your future."
    >
      <RegisterForm />

      {/* Login Link */}
      <p className="mt-7 text-center text-sm text-neutral-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-white underline-offset-4 hover:underline"
        >
          Login
        </Link>
      </p>

      <p className="mt-6 text-center text-[11px] text-neutral-600">
        © 2026 LearnHub. All rights reserved.
      </p>
    </AuthLayout>
  );
}

export default Register;
