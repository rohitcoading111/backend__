
import { Link } from "react-router-dom";

export default function AboutNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080d18]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="text-2xl font-bold">
          Learn<span className="text-cyan-400">Hub</span>
        </Link>

        <div className="hidden items-center gap-2 text-sm text-slate-300 md:flex">
          <Link to="/" className="learnhub-about-link">
            Home
          </Link>

          <Link to="/contact" className="learnhub-about-link">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="learnhub-about-link hidden sm:block"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="learnhub-about-link"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
