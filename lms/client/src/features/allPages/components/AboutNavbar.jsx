
import { Link } from "react-router-dom";

export default function AboutNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080d18]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="text-2xl font-bold">
          Learn<span className="text-cyan-400">Hub</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <Link to="/" className="hover:text-cyan-400">
            Home
          </Link>

          <Link to="/about" className="text-cyan-400">
            About
          </Link>

          <Link to="/contact" className="hover:text-cyan-400">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden text-sm text-slate-300 hover:text-cyan-400 sm:block"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-300"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
