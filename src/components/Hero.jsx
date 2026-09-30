import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="relative h-[85vh] min-h-[500px] flex items-center justify-center text-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.7), rgba(15,15,15,1)), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-3xl px-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-6">
          Discover Your Next <span className="text-primary">Favorite</span> Movie
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8">
          Explore thousands of movies and TV shows. Search, filter, and dive into details.
        </p>
        <Link
          to="/movies"
          className="inline-block px-8 py-4 bg-primary hover:bg-red-700 rounded-lg font-semibold text-lg transition hover:scale-105"
        >
          Explore Movies →
        </Link>
      </div>
    </section>
  );
}