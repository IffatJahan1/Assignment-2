import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      pathname === path
        ? "bg-primary text-white"
        : "text-gray-300 hover:text-white hover:bg-white/10"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🎬</span>
            <span className="text-xl font-bold">
              Movie<span className="text-primary">Explorer</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/" className={linkClass("/")}>Home</Link>
            <Link to="/movies" className={linkClass("/movies")}>Movies</Link>
            <Link
              to="/movies"
              className="ml-2 px-4 py-2 bg-primary hover:bg-red-700 rounded-md text-sm font-semibold"
            >
              Browse Now
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl"
            aria-label="menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-2">
            <Link to="/" className={linkClass("/")} onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link to="/movies" className={linkClass("/movies")} onClick={() => setOpen(false)}>
              Movies
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}