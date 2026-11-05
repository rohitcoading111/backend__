import { Link } from "react-router-dom";

function AuthNavbar() {
  return (
    <header className="auth-topbar">
      <nav className="auth-topbar-inner" aria-label="Main navigation">
        <Link to="/" className="auth-topbar-brand">
          LearnHub
        </Link>

        <div className="auth-topbar-links">
          <Link to="/" className="auth-topbar-link">
            Home
          </Link>
          <Link to="/about" className="auth-topbar-link">
            About
          </Link>
          <Link to="/contact" className="auth-topbar-link">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default AuthNavbar;
