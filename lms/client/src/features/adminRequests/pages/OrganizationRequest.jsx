
import { Link } from "react-router-dom";
import {
  GraduationCap,
  ArrowLeft,
  ShieldCheck,
  Building2,
  Users,
  BookOpen,
  ChartNoAxesCombined,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import OrganizationRequestForm from "../components/OrganizationRequestForm.jsx";
import "../../../features/auth/components/auth.css";

function OrganizationRequest() {
  const benefits = [
    {
      icon: Users,
      title: "Team Management",
      description: "Manage instructors and your organization members.",
    },
    {
      icon: BookOpen,
      title: "Course Management",
      description: "Organize courses and learning programs.",
    },
    {
      icon: ChartNoAxesCombined,
      title: "Learning Insights",
      description: "Keep track of your learning activities.",
    },
  ];

  return (
    <main className="auth-org-page">

      <div className="auth-org-wrapper">

        {/* Back Navigation */}
        <Link to="/login" className="auth-org-back">
          <ArrowLeft size={15} />
          Back to Login
        </Link>

        {/* Main Card */}
        <div className="auth-org-card">

          {/* LEFT BRANDING */}
          <section className="auth-org-branding">

            <div className="auth-org-brand-glow" />

            {/* Logo */}
            <div className="auth-org-logo">
              <div className="auth-org-logo-icon">
                <GraduationCap size={25} />
              </div>

              <div>
                <h2>LearnHub</h2>
                <span>ORGANIZATION PORTAL</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="auth-org-brand-content">

              <div className="auth-org-eyebrow">
                <Sparkles size={14} />
                ORGANIZATION PARTNERSHIP
              </div>

              <h1>
                Build a better
                <br />
                learning
                <br />
                <span>ecosystem.</span>
              </h1>

              <p className="auth-org-description">
                Bring your organization to LearnHub.
                Empower your instructors, manage your courses,
                and create a smarter learning experience.
              </p>

              {/* Benefits */}
              <div className="auth-org-benefits">
                {benefits.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div className="auth-org-benefit" key={item.title}>
                      <div className="auth-org-benefit-icon">
                        <Icon size={18} />
                      </div>

                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>

                      <ArrowUpRight
                        size={15}
                        className="auth-org-benefit-arrow"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Process Information */}
              <div className="auth-org-process">
                <div className="auth-org-process-heading">
                  <ShieldCheck size={16} />
                  HOW IT WORKS
                </div>

                <div className="auth-org-steps">
                  <div>
                    <span>01</span>
                    <p>Apply</p>
                  </div>

                  <div className="auth-org-step-line" />

                  <div>
                    <span>02</span>
                    <p>Review</p>
                  </div>

                  <div className="auth-org-step-line" />

                  <div>
                    <span>03</span>
                    <p>Get Started</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="auth-org-brand-footer">
              <span>LEARNHUB</span>
              <span>LEARN. BUILD. GROW.</span>
            </div>

          </section>

          {/* RIGHT FORM */}
          <section className="auth-org-content">

            {/* Mobile Branding */}
            <div className="auth-org-mobile-logo">
              <GraduationCap size={25} />
              <span>LearnHub</span>
            </div>

            {/* Heading */}
            <div className="auth-org-heading">
              <div className="auth-org-form-label">
                <Building2 size={14} />
                GET STARTED
              </div>

              <h2>
                Register your
                <br />
                organization.
              </h2>

              <p>
                Submit your application to become an
                Organization Admin on LearnHub.
              </p>
            </div>

            {/* Form */}
            <OrganizationRequestForm />

            {/* Footer */}
            <div className="auth-org-form-footer">
              <p>
                Already have an approved account?{" "}
                <Link to="/login">
                  Login here <ArrowUpRight size={13} />
                </Link>
              </p>

              <span>
                <CheckCircle2 size={13} />
                Your application will be reviewed by our team.
              </span>
            </div>

          </section>

        </div>

        {/* Bottom Footer */}
        <p className="auth-org-copyright">
          © 2026 LearnHub. All rights reserved.
        </p>

      </div>
    </main>
  );
}

export default OrganizationRequest;
