
import { GraduationCap, Check } from "lucide-react";
import "./auth.css";
function AuthLayout({ eyebrow, title, description, children }) {
  const features = [
    "Learn at your own pace",
    "Access your enrolled courses",
    "Connect with instructors",
  ];

  return (
    <main className="auth-page">

      {/* Ambient Background Glow */}
      <div className="auth-ambient-glow" />

      {/* Main Glass Card */}
      <div className="auth-main-card">

        {/* Left Branding */}
        <section className="auth-branding">

          <div className="auth-logo">
            <div className="auth-logo-icon">
              <GraduationCap size={27} />
            </div>
            <span>LearnHub</span>
          </div>

          <div className="auth-brand-content">

            <span className="auth-tagline">
              LEARN. BUILD. GROW.
            </span>

            <h1>
              Your future
              <br />
              starts here.
            </h1>

            <p>
              Continue learning, explore new skills, and
              keep moving towards your goals.
            </p>

            <div className="auth-features">
              {features.map((feature) => (
                <div key={feature} className="auth-feature">
                  <span className="auth-check">
                    <Check size={15} />
                  </span>
                  {feature}
                </div>
              ))}
            </div>

          </div>

          <p className="auth-footer">
            © 2026 LearnHub. All rights reserved.
          </p>

        </section>

        {/* Right Dynamic Content */}
        <section className="auth-content">

          <div className="auth-mobile-logo">
            <GraduationCap size={25} />
            <span>LearnHub</span>
          </div>

          <div className="auth-heading">
            <span>{eyebrow}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>

          {children}

        </section>

      </div>
    </main>
  );
}

export default AuthLayout;
