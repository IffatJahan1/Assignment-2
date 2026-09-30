import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";

const API = "https://api.tvmaze.com";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);
  const [mode, setMode] = useState("browse");

  const loadShows = async (pageNum = 0) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/shows?page=${pageNum}`);
      if (!res.ok) throw new Error("Failed to fetch shows");
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchShows = async (q) => {
    if (!q.trim()) {
      setMode("browse");
      loadShows(0);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/search/shows?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setMovies(data.map((item) => item.show));
      setMode("search");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShows(0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchShows(query);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    loadShows(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
        {mode === "search" ? `Results for "${query}"` : "Browse Movies & TV Shows"}
      </h1>
      <p className="text-gray-400 text-center mb-8">{movies.length} titles</p>

      <div className="mb-10">
        <SearchBar value={query} onChange={setQuery} onSubmit={handleSubmit} />
        {mode === "search" && (
          <div className="text-center mt-4">
            <button
              onClick={() => {
                setQuery("");
                setMode("browse");
                setPage(0);
                loadShows(0);
              }}
              className="text-sm text-primary hover:underline"
            >
              ← Back to browse
            </button>
          </div>
        )}
      </div>

      {loading && (
        <div className="text-center py-20">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-20 text-red-500">
          <p>⚠️ {error}</p>
          <button
            onClick={() => loadShows(page)}
            className="mt-4 px-4 py-2 bg-primary rounded-lg"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-2xl mb-2">🎬</p>
          <p>No results found.</p>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} onClick={setSelected} />
          ))}
        </div>
      )}

      {!loading && !error && mode === "browse" && movies.length > 0 && (
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => handlePageChange(Math.max(0, page - 1))}
            disabled={page === 0}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg disabled:opacity-30"
          >
            ← Prev
          </button>
          <span className="px-4 py-2 text-gray-400">Page {page + 1}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-6 py-2 bg-primary hover:bg-red-700 rounded-lg"
          >
            Next →
          </button>
        </div>
      )}

      {selected && <MovieModal movie={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}