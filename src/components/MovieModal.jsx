import { useEffect } from "react";

export default function MovieModal({ movie, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!movie) return null;

  const image =
    movie.image?.original ||
    movie.image?.medium ||
    "https://via.placeholder.com/400x600/1a1a1a/666666?text=No+Image";

  const summary =
    movie.summary?.replace(/<[^>]*>/g, "") || "No description available.";

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="grid md:grid-cols-[300px_1fr] gap-6 p-6">
          <img src={image} alt={movie.name} className="w-full rounded-xl object-cover" />

          <div>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl md:text-3xl font-bold">{movie.name}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-2xl"
                aria-label="close"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {movie.rating?.average && (
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                  ★ {movie.rating.average}
                </span>
              )}
              {movie.premiered && (
                <span className="px-2 py-1 bg-white/10 text-xs rounded">
                  📅 {movie.premiered}
                </span>
              )}
              {movie.status && (
                <span className="px-2 py-1 bg-white/10 text-xs rounded">
                  {movie.status}
                </span>
              )}
              {movie.runtime && (
                <span className="px-2 py-1 bg-white/10 text-xs rounded">
                  ⏱ {movie.runtime} min
                </span>
              )}
            </div>

            {movie.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-300 text-sm leading-relaxed mb-4">{summary}</p>

            {movie.network && (
              <p className="text-sm text-gray-400">
                <strong className="text-white">Network:</strong> {movie.network.name}
              </p>
            )}

            {movie.officialSite && (
              <a
                href={movie.officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-primary hover:bg-red-700 rounded-lg text-sm font-semibold"
              >
                Visit Official Site →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}