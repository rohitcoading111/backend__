import "./auth.css";

function SkeletonBlock({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`auth-skeleton-block ${className}`}
    />
  );
}

function AuthPageSkeleton({ variant = "login" }) {
  const isRegister = variant === "register";
  const fieldCount = isRegister ? 5 : 2;

  return (
    <main
      className="auth-page"
      aria-busy="true"
      aria-label={`Loading ${isRegister ? "registration" : "login"} page`}
    >
      <div className="auth-main-card auth-skeleton-card">
        <section className="auth-branding" aria-hidden="true">
          <div className="auth-skeleton-brand">
            <SkeletonBlock className="auth-skeleton-logo" />
            <SkeletonBlock className="auth-skeleton-tagline" />
            <SkeletonBlock className="auth-skeleton-title" />
            <SkeletonBlock className="auth-skeleton-copy" />
            <SkeletonBlock className="auth-skeleton-copy auth-skeleton-copy-short" />
          </div>
          <SkeletonBlock className="auth-skeleton-footer" />
        </section>

        <section className="auth-content auth-skeleton-content">
          <div className="auth-skeleton-heading">
            <SkeletonBlock className="auth-skeleton-logo auth-skeleton-mobile-logo" />
            <SkeletonBlock className="auth-skeleton-eyebrow" />
            <SkeletonBlock className="auth-skeleton-heading-title" />
            <SkeletonBlock className="auth-skeleton-description" />
          </div>

          <div className="auth-skeleton-fields">
            {Array.from({ length: fieldCount }, (_, index) => (
              <div className="auth-skeleton-field-group" key={index}>
                <SkeletonBlock className="auth-skeleton-label" />
                <SkeletonBlock className="auth-skeleton-input" />
              </div>
            ))}
          </div>

          {!isRegister && (
            <div className="auth-skeleton-options">
              <SkeletonBlock className="auth-skeleton-option" />
              <SkeletonBlock className="auth-skeleton-option auth-skeleton-option-wide" />
            </div>
          )}

          <SkeletonBlock className="auth-skeleton-button" />
          {!isRegister && (
            <>
              <SkeletonBlock className="auth-skeleton-divider" />
              <SkeletonBlock className="auth-skeleton-google" />
            </>
          )}
          <SkeletonBlock className="auth-skeleton-bottom-link" />
        </section>
      </div>
      <span className="sr-only" role="status">
        Checking your session…
      </span>
    </main>
  );
}

export default AuthPageSkeleton;
