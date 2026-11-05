
import { Link } from "react-router-dom";

export default function ContactFooter() {
  return (
    <footer className="border-t border-white/10 px-5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
        <Link to="/" className="text-xl font-bold">
          Learn<span className="text-cyan-400">Hub</span>
        </Link>

        <p className="text-center text-sm text-slate-500">
          © {new Date().getFullYear()} LearnHub. All rights reserved.
        </p>

        <div className="flex gap-5 text-sm text-slate-400">
          <Link to="/" className="transition hover:text-cyan-400">
            Home
          </Link>

          <Link to="/about" className="transition hover:text-cyan-400">
            About
          </Link>

          <Link to="/login" className="transition hover:text-cyan-400">
            Login
          </Link>

          <Link to="/register" className="transition hover:text-cyan-400">
            Register
          </Link>
        </div>
      </div>
    </footer>
  );
}
