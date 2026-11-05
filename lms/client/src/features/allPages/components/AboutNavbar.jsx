
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function AboutNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080d18]/90 backdrop-blur-xl">
      <nav aria-label="Main navigation" className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="text-2xl font-bold" onClick={() => setMobileMenuOpen(false)}>
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

        <div className="hidden items-center gap-3 md:flex">
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

        <button
          type="button"
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileMenuOpen}
          aria-controls="about-mobile-navigation"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-white md:hidden"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {mobileMenuOpen && (
          <div
            id="about-mobile-navigation"
            className="absolute left-4 right-4 top-full z-50 grid gap-2 rounded-2xl border border-white/10 bg-[#101010] p-3 shadow-2xl md:hidden"
          >
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="learnhub-about-link">
              Home
            </Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="learnhub-about-link">
              Contact
            </Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="learnhub-about-link">
              Login
            </Link>
            <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="learnhub-about-link">
              Get Started
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
